# Jest Netlify Plugin

This is a super simple plugin that runs `npm test --ci` prior to a build on Netlify.

## Installation

Install the package from NPM:

    npm install -D @seancdavis/netlify-plugin-jest

Then add the configuration to your `netlify.toml` file.

```toml
[[plugins]]
  package = "@seancdavis/netlify-plugin-jest"
```
