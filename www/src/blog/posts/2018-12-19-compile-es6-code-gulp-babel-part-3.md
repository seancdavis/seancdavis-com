---
title: Compile ES6 Code with Gulp and Babel, Part 3
description: In the third of five parts on compiling multiple ES6 files into a
  minified bundle, you will learn how to use a configuration file to build
  multiple dynamic manifest bundles.
tags:
  - babel
  - gulp
  - javascript
image: /blog/default/default-yellow-01.png
related_posts:
  - compile-es6-code-gulp-babel-part-4
  - compile-es6-code-gulp-babel-part-5
---

This is the third part in a five-part series on compiling and concatenating ES6 code using Gulp and Babel. If you haven't [started from the beginning](/blog/compile-es6-code-gulp-babel-part-1/), I recommend doing so.

Otherwise, welcome back!

At this point, you have built a single JavaScript bundle consisting of third-party libraries and self-authored components. In Part 3, we're going to add a JS configuration file that will enable us to build multiple bundles with unique dependencies and self-authored components.

This part is unique among the five in that it requires a bit of background to get started. To understand how this is going to work, you should know a bit about building dynamic tasks with Gulp 4. And in this particular approach, we're using a JavaScript configuration file to drive those dynamic tasks. I wrote [an article that follows this approach](/blog/dynamic-tasks-gulp-4/), and I recommend at least skimming through that before continuing.

## Step 1: Add JS Config

Create a new file at `src/config.js` that will serve as your main JS configuration. (As stated in other parts, you're welcome to put this file wherever you'd like, you'll just have to update the code appropriately to reflect your changes.)

`src/config.js` {.filename}

```js
module.exports = [
  {
    name: "main",
    deps: ["~jquery/dist/jquery.min", "vendor/my-lib"],
    files: ["components/foo", "components/bar"]
  },
  {
    name: "lodash",
    deps: ["~lodash/lodash"]
  }
]
```

This configuration is unique even to [the introductory article](/blog/dynamic-tasks-gulp-4/) -- here's what's going on:

- Each item in the exported array is an object.
- Each object must have a `name` property and either a `deps` or a `files` property.
- `name` is the resulting filename of the bundle (sans the `.js` extension).
- `deps` is an array of third-party dependencies (files we don't want to process with Babel).
- `files` are self-authored files that will be compiled with Babel.
- `.js` extension is assumed throughout and never used.
- The tilde (`~`) is a shorthand for looking into the `node_modules` directory. Otherwise, all paths are considered relative to the `src` directory.

## Step 2: Manually Add Dependency

Because I want to show you how it can work if you add a third-party dependency that isn't available as an NPM package, let's create a dummy dependency at `src/vendor/my-lib.js`:

`src/vendor/my-lib.js` {.filename}

```js
class MyLib {
  constructor() {
    console.log("MyLib")
  }
}
```

## Step 3: Update Gulpfile

We have some big adjustments to make to the Gulpfile. Here we're still taking a similar approach to Part 2 in having the build run in series with functions `jsDeps()`, `jsBuild()`, `jsConcat()`. The difference is that within each function we are reading the configuration file (`src/config.js`) and building dynamic anonymous tasks for each item within the configuration array. The bulk of this is explained in [the introductory article on dynamic Gulp 4 tasks](/blog/dynamic-tasks-gulp-4/), but there are some comments in the code to help.

`gulpfile.js` {.filename}

```js
// Import "parallel" function, along with the others we've
// been using.
const { parallel, series, src, dest } = require("gulp")

const babel = require("gulp-babel")
const concat = require("gulp-concat")
const plumber = require("gulp-plumber")

// Import the config array as `jsConfig`.
const jsConfig = require("./src/config")

// Use variables to reference project directories.
const srcDir = "./src"
const tmpDir = "./tmp"
const destDir = "./dist"

function jsDeps(done) {
  // Loop through the JS config array and create a Gulp task for
  // each object.
  const tasks = jsConfig.map(config => {
    return done => {
      // Create an array of files from the `deps` property.
      const deps = (config.deps || []).map(f => {
        // If the filename begins with ~ it is assumed the file is
        // relative to node_modules. The filename must also be
        // appended with .js.
        if (f[0] == "~") {
          return `./node_modules/${f.slice(1, f.length)}.js`
        } else {
          return `${srcDir}/${f}.js`
        }
      })
      // If we don't exit in the case that there is no deps property
      // we will hit an error and Gulp will abandon other tasks, so
      // we need to gracefully fail if the config option is missing.
      if (deps.length == 0) {
        done()
        return
      }
      // Build the temporary file based on the config name property,
      // i.e. [name].deps.js.
      return src(deps)
        .pipe(concat(`${config.name}.deps.js`))
        .pipe(dest(tmpDir))
    }
  })

  // Run all dynamic tasks in parallel and exit from the main task
  // after all (anonymous) subtasks have completed.
  return parallel(...tasks, parallelDone => {
    parallelDone()
    done()
  })()
}

/**
 *  jsBuild() is identical to jsDeps() with a few exceptions:
 *
 *      1. It looks at the `files` property (not the `deps` property).
 *      2. It processes the concatenated bundle with Babel.
 *      3. It does not support the tilde importer because we assume
 *         all self-authored files are within the source directory.
 *      4. Temp files are named [name].build.js.
 */
function jsBuild(done) {
  const tasks = jsConfig.map(config => {
    return done => {
      const files = (config.files || []).map(f => `${srcDir}/${f}.js`)
      if (files.length == 0) {
        done()
        return
      }
      return src(files)
        .pipe(plumber())
        .pipe(concat(`${config.name}.build.js`))
        .pipe(
          babel({
            presets: [
              [
                "@babel/env",
                {
                  modules: false
                }
              ]
            ]
          })
        )
        .pipe(dest(tmpDir))
    }
  })

  return parallel(...tasks, parallelDone => {
    parallelDone()
    done()
  })()
}

// jsConcat() takes the two temporary files from each config
// object ([name].deps.js and [name].build.js) and combines
// then into a single bundle.
function jsConcat(done) {
  const tasks = jsConfig.map(config => {
    return done => {
      const files = [
        `${tmpDir}/${config.name}.deps.js`,
        `${tmpDir}/${config.name}.build.js`
      ]
      // The allowEmpty option means the task won't fail if
      // one of the temp files does not exist.
      return src(files, { allowEmpty: true })
        .pipe(plumber())
        .pipe(concat(`${config.name}.js`))
        .pipe(dest(destDir))
    }
  })

  return parallel(...tasks, parallelDone => {
    parallelDone()
    done()
  })()
}

exports.default = series(parallel(jsDeps, jsBuild), jsConcat)
```

Now you're ready to run the build again:

```
$ npm run build
```

Upon successful build, notice:

- The `.js` extensions were automatically added to the bundles.
- MyLib (`src/lib/my-lib.js`) did not get compiled by Babel, but was simply added to the bundle.
- `dist/lodash.js` is not the minified version. While you wouldn't keep this for production, this is just an example to show that the `deps` files are not processed with Babel but taken directly as they are.

---

That's it for Part 3! Now you can have multiple JS bundles without messing with the Gulpfile whenever you need to add a new dependency or create a separate bundle. In [the next part](/blog/compile-es6-code-gulp-babel-part-4/) you will learn how we can minify our bundle and clean up the temporary files.

Or, if you don't want to go right to the next step, you can jump around throughout the series:

1. [Part 1: Setup & Simple Implementation](/blog/compile-es6-code-gulp-babel-part-1/)
2. [Part 2: Concatenated Bundle](/blog/compile-es6-code-gulp-babel-part-2/)
3. **Part 3: Dynamic Manifest**
4. [Part 4: Clean Files & Minify Output](/blog/compile-es6-code-gulp-babel-part-4/)
5. [Part 5: Asset Hashing](/blog/compile-es6-code-gulp-babel-part-5/)
