---
title: Run JavaScript Script Before Another Script
description: Automatically run scripts with NPM/Yarn before or after another script.
tags:
  - javascript
image: /posts/220509/run-javascript-script-before-another-script-lvMfPnUi.png
seo:
  image: /posts/220509/run-javascript-script-before-another-script-JDCWraiR--meta.png
---

If you want to run a script before another one completes, you can do this by prepending `pre` to the script name. NPM (or Yarn) will [automatically run the script](https://docs.npmjs.com/cli/v8/using-npm/scripts#pre--post-scripts).

Suppose I have a script called `test` that runs my test suite. But before I do that, I want to make sure a script called `build` runs first. I could have a configuration like this:

`pacakge.json` {.filename}

```json
{
  "scripts": {
    "build": "...",
    "pretest": "build",
    "test": "..."
  }
}
```

Now when I run this command:

```txt
npm run test
```

The `pretest` script will automatically be run first, and in the example above, that means the `build` script automatically runs before the `test` script.

_Note: Use **`post`** as the prefix to run a script_ after _another script._
