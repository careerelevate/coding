var AUTH_SHEET_NAME = "Users";
var CODE_TTL_SECONDS = 600;
var EMAIL_RESEND_SECONDS = 60;
var MAX_CODE_ATTEMPTS = 5;

function setupAuth() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("Open this script from the Google Sheet using Extensions > Apps Script.");
  }

  PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID", spreadsheet.getId());
  var usersSheet = spreadsheet.getSheetByName(AUTH_SHEET_NAME);
  if (!usersSheet) {
    usersSheet = spreadsheet.insertSheet(AUTH_SHEET_NAME);
  }
  if (usersSheet.getLastRow() === 0) {
    usersSheet.appendRow(["Email", "Name", "Provider", "Created At"]);
    usersSheet.setFrozenRows(1);
  }
}

function doPost(event) {
  var request = event && event.parameter ? event.parameter : {};
  var requestId = String(request.requestId || "").slice(0, 100);
  try {
    var response;
    if (request.action === "sendCode") {
      response = sendVerificationCode_(request);
    } else if (request.action === "verifyCode") {
      response = verifyCode_(request);
    } else if (request.action === "googleSignIn") {
      response = signInWithGoogle_(request);
    } else {
      throw new Error("Unknown sign-in request.");
    }
    response.requestId = requestId;
    return renderResponse_(response);
  } catch (error) {
    return renderResponse_({
      kind: "coding-practice-auth",
      requestId: requestId,
      status: "error",
      message: error && error.message
        ? error.message
        : "The sign-in request could not be completed. Please try again."
    });
  }
}

function sendVerificationCode_(request) {
  var email = normalizeEmail_(request.email);
  var mode = String(request.mode || "");
  var name = String(request.name || "").trim();
  if (!isValidEmail_(email)) {
    throw new Error("Enter a valid email address.");
  }
  if (mode !== "signup" && mode !== "signin") {
    throw new Error("Choose sign in or sign up.");
  }
  if (mode === "signup") {
    var nameLength = Array.from(name).length;
    if (nameLength < 3 || nameLength > 15) {
      throw new Error("Name must be between 3 and 15 characters.");
    }
    if (findUser_(email)) {
      return { kind: "coding-practice-auth", status: "duplicate" };
    }
  } else if (!findUser_(email)) {
    return {
      kind: "coding-practice-auth",
      status: "new-user"
    };
  }

  var cache = CacheService.getScriptCache();
  var key = emailKey_(email);
  var rateKey = "rate:" + key;
  if (cache.get(rateKey)) {
    throw new Error("A verification code was sent recently. Please wait a minute before requesting another.");
  }
  cache.put(rateKey, "1", EMAIL_RESEND_SECONDS);

  var randomHex = Utilities.getUuid().replace(/-/g, "").slice(0, 8);
  var code = String(parseInt(randomHex, 16) % 1000000).padStart(6, "0");
  cache.put("code:" + key, JSON.stringify({
    code: code,
    mode: mode,
    name: name
  }), CODE_TTL_SECONDS);
  cache.put("attempts:" + key, "0", CODE_TTL_SECONDS);
  try {
    MailApp.sendEmail({
      to: email,
      subject: "Your Coding Practice verification code",
      body: "Your verification code is " + code + ". It expires in 10 minutes. If you did not request this code, you can ignore this email."
    });
  } catch (error) {
    cache.remove("code:" + key);
    cache.remove("attempts:" + key);
    cache.remove(rateKey);
    throw new Error("The verification email could not be sent. Please try again later.");
  }

  return {
    kind: "coding-practice-auth",
    status: "code-sent",
    email: email
  };
}

function verifyCode_(request) {
  var email = normalizeEmail_(request.email);
  var mode = String(request.mode || "");
  var submittedCode = String(request.code || "");
  if (!isValidEmail_(email) || !/^\d{6}$/.test(submittedCode)) {
    throw new Error("Enter the six-digit code sent to your email.");
  }
  if (mode !== "signup" && mode !== "signin") {
    throw new Error("Choose sign in or sign up.");
  }

  var cache = CacheService.getScriptCache();
  var key = emailKey_(email);
  var cachedCode = cache.get("code:" + key);
  if (!cachedCode) {
    throw new Error("The code expired. Request a new verification code.");
  }
  var codeData = JSON.parse(cachedCode);
  if (codeData.mode !== mode) {
    throw new Error("This verification code is not valid for the selected action.");
  }
  if (codeData.code !== submittedCode) {
    var attempts = Number(cache.get("attempts:" + key) || "0") + 1;
    if (attempts >= MAX_CODE_ATTEMPTS) {
      cache.remove("code:" + key);
      cache.remove("attempts:" + key);
      throw new Error("Too many incorrect attempts. Request a new verification code.");
    }
    cache.put("attempts:" + key, String(attempts), CODE_TTL_SECONDS);
    throw new Error("That verification code is incorrect. Please try again.");
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var user = findUser_(email);
    if (mode === "signup") {
      if (user) {
        cache.remove("code:" + key);
        cache.remove("attempts:" + key);
        return { kind: "coding-practice-auth", status: "duplicate" };
      }
      addUser_(email, codeData.name, "email");
      user = { email: email, name: codeData.name };
    } else if (!user) {
      cache.remove("code:" + key);
      cache.remove("attempts:" + key);
      return { kind: "coding-practice-auth", status: "new-user" };
    }
    cache.remove("code:" + key);
    cache.remove("attempts:" + key);
    return {
      kind: "coding-practice-auth",
      status: "signed-in",
      user: { email: user.email, name: user.name }
    };
  } finally {
    lock.releaseLock();
  }
}

function signInWithGoogle_(request) {
  var idToken = String(request.idToken || "");
  var nonce = String(request.nonce || "");
  var clientId = PropertiesService.getScriptProperties().getProperty("GOOGLE_CLIENT_ID");
  if (!clientId) {
    throw new Error("Google sign-in is not configured yet.");
  }
  if (!idToken || idToken.length > 10000 || !/^[a-f0-9]{48}$/i.test(nonce)) {
    throw new Error("Google did not provide a valid sign-in credential.");
  }

  var tokenResponse = UrlFetchApp.fetch(
    "https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(idToken),
    { muteHttpExceptions: true }
  );
  if (tokenResponse.getResponseCode() !== 200) {
    throw new Error("Google could not verify this sign-in. Please try again.");
  }
  var identity = JSON.parse(tokenResponse.getContentText());
  if (
    identity.aud !== clientId ||
    (identity.iss !== "accounts.google.com" && identity.iss !== "https://accounts.google.com") ||
    identity.nonce !== nonce ||
    String(identity.email_verified) !== "true" ||
    !isValidEmail_(normalizeEmail_(identity.email))
  ) {
    throw new Error("Google could not verify this email address for this site.");
  }

  var email = normalizeEmail_(identity.email);
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var user = findUser_(email);
    if (!user) {
      var name = String(identity.name || email.split("@")[0]).trim();
      addUser_(email, name, "google");
      user = { email: email, name: name };
    }
    return {
      kind: "coding-practice-auth",
      status: "signed-in",
      user: { email: user.email, name: user.name }
    };
  } finally {
    lock.releaseLock();
  }
}

function findUser_(email) {
  var sheet = getUsersSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return null;
  }
  var rows = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  for (var i = 0; i < rows.length; i++) {
    if (normalizeEmail_(unescapeSheetText_(rows[i][0])) === email) {
      return { email: email, name: unescapeSheetText_(rows[i][1]) };
    }
  }
  return null;
}

function addUser_(email, name, provider) {
  getUsersSheet_().appendRow([
    escapeSheetText_(email),
    escapeSheetText_(name),
    provider,
    new Date()
  ]);
}

function getUsersSheet_() {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) {
    throw new Error("Run setupAuth from the Apps Script editor before deploying the sign-in service.");
  }
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(AUTH_SHEET_NAME);
  if (!sheet) {
    throw new Error("The Users tab is missing. Run setupAuth from the Apps Script editor.");
  }
  return sheet;
}

function normalizeEmail_(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail_(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function emailKey_(email) {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email);
  return Utilities.base64EncodeWebSafe(digest).replace(/=+$/, "");
}

function escapeSheetText_(value) {
  var text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function unescapeSheetText_(value) {
  var text = String(value);
  return /^'[=+\-@]/.test(text) ? text.slice(1) : text;
}

function renderResponse_(response) {
  response.kind = "coding-practice-auth";
  var targetOrigin = PropertiesService.getScriptProperties().getProperty("SITE_ORIGIN") ||
    "https://careerelevate.github.io";
  if (
    !/^https:\/\/[a-z0-9.-]+$/i.test(targetOrigin) &&
    !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(targetOrigin)
  ) {
    throw new Error("Set SITE_ORIGIN to the exact HTTPS origin of the site.");
  }
  var serialized = JSON.stringify(response)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  var html = "<!doctype html><meta charset=\"utf-8\"><script>" +
    "window.parent.postMessage(" + serialized + ", " + JSON.stringify(targetOrigin) + ");" +
    "</script><p>Sign-in request complete. You can close this window.</p>";
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
