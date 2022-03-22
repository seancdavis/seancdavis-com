# GitHub Action Dispatch Netlify Plugin

This plugin triggers a GitHub Action that is using `manifest_dispatch` after a successful Netlify build.

This is opinionated and catered to this project specifically. I recommend using [the official plugin](https://github.com/bahmutov/netlify-plugin-github-dispatch).

## Installation

Install the package from NPM:

    npm install -D @seancdavis/netlify-plugin-github-dispatch

Then add the configuration to your `netlify.toml` file.

```toml
[[plugins]]
  package = "@seancdavis/netlify-plugin-github-dispatch"
```
