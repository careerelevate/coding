# Sign-in setup

The site is hosted on GitHub Pages, so it cannot safely access the user spreadsheet directly. Sign-in uses a Google Apps Script web app as a small server-side bridge. The script only reads and writes the spreadsheet's `Users` tab; it does not expose the sheet to site visitors.

## 1. Set up the spreadsheet service

1. Open the Google spreadsheet linked to the feedback form.
2. Choose **Extensions > Apps Script**.
3. Replace the editor's `Code.gs` content with [`google-apps-script/Code.gs`](./google-apps-script/Code.gs), then save.
4. In the Apps Script editor, select `setupAuth` and click **Run**. Review and grant the requested spreadsheet permissions. This creates a `Users` tab in the same spreadsheet.
5. In Apps Script, open **Project Settings > Script Properties** and add:
   - `SITE_ORIGIN` = `https://careerelevate.github.io`
   - `GOOGLE_CLIENT_ID` = the OAuth client ID created below
6. Choose **Deploy > New deployment > Web app**. Set **Execute as** to your account and **Who has access** to **Anyone**, then deploy and approve the requested permissions. Copy the URL ending in `/exec`.

The web app must be public so the GitHub Pages site can call it. Its code only exposes the registration and sign-in actions; never add a handler that returns the spreadsheet's rows or contents.

## 2. Configure Google sign-in

1. In [Google Cloud Console](https://console.cloud.google.com/), select or create a project and configure the OAuth consent screen.
2. Create an OAuth client ID of type **Web application**.
3. Add `https://careerelevate.github.io` under **Authorized JavaScript origins**. Add your localhost origin only if testing from a local web server.
4. Copy the client ID. In Apps Script **Project Settings > Script Properties**, set `GOOGLE_CLIENT_ID` to this value.

Google sign-in verifies the returned ID token on the Apps Script server, checks its audience against this client ID, and stores the verified user in the `Users` tab.

`SITE_ORIGIN` is also used as the exact `postMessage` target origin, so sign-in responses containing account information are not sent to arbitrary sites embedding the public web app. For local HTTP testing only, temporarily set it to your exact localhost origin (for example, `http://127.0.0.1:8784`) and restore the GitHub Pages origin before publishing.

## 3. Connect the site

Edit [`auth-config.js`](./auth-config.js):

```js
window.codingPracticeAuthConfig = {
    appsScriptUrl: "YOUR_DEPLOYED_WEB_APP_URL_ENDING_IN_EXEC",
    googleClientId: "YOUR_WEB_APPLICATION_CLIENT_ID"
};
```

Commit and publish the configuration. For later Apps Script code changes, create a new deployment version and update the URL in `auth-config.js` if the deployment URL changed.

## Sign-in behavior

- Google sign-in verifies the Google account and adds it to `Users` the first time it is used.
- Email signup asks for a 3–15 character name and email, checks for duplicates, and sends a six-digit code before saving the account.
- Email sign-in checks whether the account exists before sending a code. Unknown addresses are directed to signup. The code expires after 10 minutes and is limited to five attempts.
- Email codes are sent by the Google account that owns the Apps Script deployment, subject to Google's sending quotas.

The current site does not restrict the public practice questions or code editor by account. Sign-in verifies the user's identity and records the account; do not treat the client-side signed-in display as authorization for private features.
