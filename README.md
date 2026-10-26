# javacode.github.io
Page link - https://careerelevate.github.io/coding/

The **Current Openings** card on the home page links to [current-openings.html](./current-openings.html).

## Job openings

Each opening is an `<article class="job-opening">` inside `#jobOpeningsList` in [current-openings.html](./current-openings.html). Copy an existing card to keep the template consistent.

The collapsed card shows the Role, Experience, Posted date, and Location. Set `data-role` to `software-developer`, `tester`, or `performance-testing` so it matches a filter button, show the matching label in the Role field, and wrap the posted date in a `<time datetime="YYYY-MM-DD">` element. The full details live inside the `<details class="job-opening-details">` block: description, education, skills, preferred qualifications, contact information, and any other sections the feed provides.

Show optional sections only when the feed has that information. If the feed contains extra details that do not fit the standard sections, add them to the optional `.job-opening-additional` section inside the details body. The page sorts openings newest first and uses the `data-role` value for the filter buttons. To add a new role bucket, add a filter button with a matching `data-role-filter` value.

## Feedback form

The **Give feedback** button opens a form inside the page instead of navigating to Google Forms. On submit, the email address and feedback are posted to the Google Form's `formResponse` endpoint in a hidden iframe, so the Google Form itself is never shown.

Submitted email addresses are remembered in the browser's `localStorage`; a second submission from the same email address shows an "already given" message. If the Google Form questions change, update the `entry.` IDs in `feedbackConfig` near the top of the inline script in [index.html](./index.html).

For Google and email sign-in setup, see [AUTH_SETUP.md](./AUTH_SETUP.md).
