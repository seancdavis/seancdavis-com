---
title: Compile ES6 Code with Gulp and Babel, Part 5
description: "In the last of the five part series on compiling multiple ES6 files into a minified bundle, you will learn how to add an asset hash to your bundles."
tags:
  - babel
  - gulp
  - javascript
---

This is the last of five parts in the series on compiling and concatenating ES6 code using Gulp and Babel. If you haven't [started from the beginning](/blog/compile-es6-code-gulp-babel-part-1/), I recommend doing so. This last piece is just some icing on the top layer of a real beefy cake.

If you've gone through all four parts already, welcome back! I'm glad you've made it this far and I hope you've been able to make use of this process.

In this last part we're going to add a hash to your bundled file(s). While hashing isn't always necessary, it's a convenient method for ensuring your assets aren't cached incorrectly. And it's only relevant if you're going to consume these files in the browser. If you're building a bundle to be consumed by other JS libraries, then you're already done -- you can skip to the end!

Without hashing you end up with a file named something like `main.js`. If you reference that file from a webpage, your browser may cache `main.js` to your local filesystem. (This depends on the headers sent from the server that hosts `main.js`, but it's a common problem.) That is great for performance, but once you need to make an update to `main.js`, you may be in trouble. Now, people who have already visited your site may have an old version of `main.js` on their machines, and if the cache still thinks it is valid, those users won't see the new version of your `main.js` file and may lose some functionality.

With hashing we simply add a random (or non-random, but _unique_) string of characters to the file so that when the version changes the filename is completely different and browsers are forced to download the new version. In this case, you may have a file called `main-1545394217102.js`, where the hash is a timestamp. And if you update it tomorrow, the filename becomes something like `main-1545480617102.js`. These are two different filenames so browsers are forced to download and reference the new version.

In this exercise, we're going to use the timestamp method and automatically apply these hashes. Of course, you can expand upon this however you'd like and manually or randomly apply/generate these hashes.

## The Only Step: Update Gulpfile

To update the Gulpfile, we're going to do only two things:

1. Add `hash` constant equivalent to the current time.
2. Add the hash to the resulting bundle filename(s).

This is just one new line and one edited line in an otherwise long Gulpfile. Nevertheless, here's the thing in its entirety with comments where the two new lines are:

`gulpfile.js` {.filename}

```js
const { parallel, series, src, dest } = require("gulp")

const babel = require("gulp-babel")
const concat = require("gulp-concat")
const del = require("del")
const plumber = require("gulp-plumber")
const uglify = require("gulp-uglify")

const jsConfig = require("./src/config")
const srcDir = "./src"
const tmpDir = "./tmp"
const destDir = "./dist"

// The hash is the timestamp when the task runs.
const hash = new Date().getTime()

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
        .pipe(uglify())
        .pipe(dest(tmpDir))
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
      return (
        src(files, { allowEmpty: true })
          .pipe(plumber())
          // Append hash to the bundle filename.
          .pipe(concat(`${config.name}-${hash}.js`))
          .pipe(dest(destDir))
      )
    }
  })

  return parallel(...tasks, parallelDone => {
    parallelDone()
    done()
  })()
}

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

exports.default = series(parallel(jsDeps, jsBuild), jsConcat, jsClean)
```

Now when you run the build you will see the hash appended to the filenames:

```
$ npm run build
```

Notice that this is where cleaning the build directory (mentioned in [Part 4](/blog/compile-es6-code-gulp-babel-part-4/)) could come in handy. With these timestamps appended to the filename, every time you build, there will be a new set of files in your destination directory. Therefore, it would be nice to automate cleaning that directory prior to running the build, but that can lead to limitations depending on how you build that feature.

---

That's it! You've made it through all five parts! Amazing!

I really hope you were able to glean meaningful information from this series and now feel empowered to build a dynamic JavaScript pipeline using Gulp and Babel. If you found it useful, please share it so others can more easily find it as well.

If you get stuck or have questions as you go through these exercises, don't hesitate to [send me a message on Twitter](https://twitter.com/seancdavis29). I'll always help when and how I can.

---

For reference, here is the series in its entirety, in case you want to jump around:

1. [Part 1: Setup & Simple Implementation](/blog/compile-es6-code-gulp-babel-part-1/)
2. [Part 2: Concatenated Bundle](/blog/compile-es6-code-gulp-babel-part-2/)
3. [Part 3: Dynamic Manifest](/blog/compile-es6-code-gulp-babel-part-3/)
4. [Part 4: Clean Files & Minify Output](/blog/compile-es6-code-gulp-babel-part-4/)
5. **Part 5: Asset Hashing**
