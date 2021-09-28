# PNPM Netlify Plugin

This plugin installs PNPM and then uses PNPM to install dependencies before Netlify build.

## Installation

Install the package from NPM:

    npm install -D @seancdavis/netlify-plugin-pnpm

Then add the configuration to your `netlify.toml` file.

```toml
[[plugins]]
  package = "@seancdavis/netlify-plugin-pnpm"
```
