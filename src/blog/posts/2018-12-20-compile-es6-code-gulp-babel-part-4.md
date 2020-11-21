---
title: Compile ES6 Code with Gulp and Babel, Part 4
description: "In the fourth of five parts on compiling multiple ES6 files into a minified bundle, you will learn how to minify your bundle and automatically clean up temporary build files."
tags:
  - babel
  - gulp
  - javascript
---

This is the fourth part in a five-part series on compiling and concatenating ES6 code using Gulp and Babel. If you haven't [started from the beginning](/compile-es6-code-gulp-babel-part-1.html), I recommend at least skimming through the first three parts. By now we've covered enough in previous steps that you'll be missing a lot of context for what's going on if you start here.

Otherwise, if you've been through previous parts of the series, welcome back!

In this part we're going to minify the bundle and clean up the files that are created for temporary use during the build. This part relies heavily on [Part 3](/compile-es6-code-gulp-babel-part-3.html), and you should familiarize yourself with that approach before diving in here.

## Step 1: Install Dependencies

We have a couple more dependencies to help us with these tasks:

- [`del`](https://www.npmjs.com/package/del) helps us delete files.
- [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify) is a Gulp plugin that helps us use [UglifyJS](https://github.com/mishoo/UglifyJS2) to minify JS code.

Install the dependencies via NPM:

```
$ npm install --save-dev del gulp-uglify
```

## Step 2: Update Gulpfile

There are a few things we're going to do to the Gulpfile:

1. Add `del` and `uglify` as dependencies.
2. Add `uglify()` to `jsBuild()` so only the self-authored files are minified.
3. Add a `jsClean()` task to remove temporary files.
4. Adjust the export so `jsClean()` is run after everything else is done.

Here's what the resulting file looks like now (with comments where code was added):

gulpfile.js {.filename}

```js
const { parallel, series, src, dest } = require("gulp")

const babel = require("gulp-babel")
const concat = require("gulp-concat")
// Add del dependency.
const del = require("del")
const plumber = require("gulp-plumber")
// Add uglify dependency.
const uglify = require("gulp-uglify")

const jsConfig = require("./src/config")
const srcDir = "./src"
const tmpDir = "./tmp"
const destDir = "./dist"

function jsDeps(done) {
  const tasks = jsConfig.map(config => {
    return done => {
      const deps = (config.deps || []).map(f => {
        if (f[0] == "~") {
          return `./node_modules/${f.slice(1, f.length)}.js`
        } else {
          return `${srcDir}/${f}.js`
        }
      })
      if (deps.length == 0) {
        done()
        return
      }
      return src(deps)
        .pipe(concat(`${config.name}.deps.js`))
        .pipe(dest(tmpDir))
    }
  })

  return parallel(...tasks, parallelDone => {
    parallelDone()
    done()
  })()
}

function jsBuild(done) {
  const tasks = jsConfig.map(config => {
    return done => {
      const files = (config.files || []).map(f => `${srcDir}/${f}.js`)
      if (files.length == 0) {
        done()
        return
      }
      return (
        src(files)
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
          // Minify the self-authored bundle.
          .pipe(uglify())
          .pipe(dest(tmpDir))
      )
    }
  })

  return parallel(...tasks, parallelDone => {
    parallelDone()
    done()
  })()
}

function jsConcat(done) {
  const tasks = jsConfig.map(config => {
    return done => {
      const files = [
        `${tmpDir}/${config.name}.deps.js`,
        `${tmpDir}/${config.name}.build.js`
      ]
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

// Add a jsClean() task to delete the temporary *.deps.js and
// *.build.js files from the temporary directory.
function jsClean(done) {
  const tasks = jsConfig.map(config => {
    return done => {
      const files = [
        `${tmpDir}/${config.name}.deps.js`,
        `${tmpDir}/${config.name}.build.js`
      ]
      return del(files)
    }
  })

  return parallel(...tasks, parallelDone => {
    parallelDone()
    done()
  })()
}

// Add jsClean() as the last task in the series.
exports.default = series(parallel(jsDeps, jsBuild), jsConcat, jsClean)
```

And again, you're ready to run the build:

```
$ npm run build
```

Notice:

- `tmpDir` (`./tmp` in this case) is cleaned from temporary files from the build.
- The components you authored are minified _after_ they are process with Babel.

Note that you _could_ extend this to also clean unwanted files from the build directory. While that can be useful -- for example, if you change the name of one of your bundles in `src/config.js`, an old bundle won't keep hanging around -- I haven't done that here because there are added complexities with that scenario. For instance, if you want to be able to manually add files to your destination directory, then you can't do a clean sweep of it. This is just to say, it's something to explore if you want further automation in your `jsClean()` task.

---

That's it for Part 4 -- only one more to go to complete the series!

In fact, you're in really good shape right now and have a powerful asset build pipeline for your project. In [the last part](/compile-es6-code-gulp-babel-part-5.html), we're going to explore the idea of asset hashing, which helps with cache invalidation depending on your means of distribution. But more on that in the next part.

Or if you want to jump around, here are all five parts:

1. [Part 1: Setup & Simple Implementation](/compile-es6-code-gulp-babel-part-1.html)
2. [Part 2: Concatenated Bundle](/compile-es6-code-gulp-babel-part-2.html)
3. [Part 3: Dynamic Manifest](/compile-es6-code-gulp-babel-part-3.html)
4. **Part 4: Clean Files & Minify Output**
5. [Part 5: Asset Hashing](/compile-es6-code-gulp-babel-part-5.html)
