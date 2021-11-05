The alert is a bit of a goofy component. Here's how it works:

- `head.njk` renders a blank alert component. This puts **a single instance** of the alert on every page.
- `index.js` (main JS file) instantiates a single instance of `alert.controller.js`, so that there is a maintained state when working with alerts, through `App.Alert`.
- `App.Alert` controls the showing, hiding, and adjusting of text for the alert.
