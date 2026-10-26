# javacode.github.io
Page link - https://careerelevate.github.io/coding/

The **Current Openings** card on the home page links to [current-openings.html](./current-openings.html).

## Feedback form

The **Give feedback** button opens a form inside the page instead of navigating to Google Forms. On submit, the email address and feedback are posted to the Google Form's `formResponse` endpoint in a hidden iframe, so the Google Form itself is never shown.

Submitted email addresses are remembered in the browser's `localStorage`; a second submission from the same email address shows an "already given" message. If the Google Form questions change, update the `entry.` IDs in `feedbackConfig` near the top of the inline script in [index.html](./index.html).

For Google and email sign-in setup, see [AUTH_SETUP.md](./AUTH_SETUP.md).
