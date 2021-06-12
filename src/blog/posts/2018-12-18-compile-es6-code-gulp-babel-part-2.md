---
title: Compile ES6 Code with Gulp and Babel, Part 2
description: "In the second of five parts on compiling multiple ES6 files into a minified bundle, you will learn how to concatenate multiple files into a single file."
tags:
  - babel
  - gulp
  - javascript
---

This is the second part in a five-part series on compiling and concatenating ES6 code using Gulp and Babel. If you haven't [started from the beginning](/blog/compile-es6-code-gulp-babel-part-1/), I recommend doing so.

Otherwise, welcome back!

At this point you have individual components being run through Babel (with the help of Gulp) that are then compiled and saved to the `dist` directory. But after the build, the resulting files still represent individual components. In this part, we're going to concatenate those files together into a single bundle.

## Step 1: Install Dependencies

We need one more Gulp plugin for this one -- [gulp-concat](https://www.npmjs.com/package/gulp-concat) -- that will enable us to concatenate multiple source files into a single build file.

Install it:

```
$ npm install --save-dev gulp-concat
```

## Step 2: Add Concat to Gulpfile

We only need to add two lines to the Gulpfile. These are included with comments so you know which lines are new:

`gulpfile.js` {.filename}

```js
const { src, dest } = require("gulp")

const babel = require("gulp-babel")
// Import new Gulp plugin.
const concat = require("gulp-concat")
const plumber = require("gulp-plumber")

exports.default = function (done) {
  return (
    src("./src/components/**/*.js")
      .pipe(plumber())
      // Concatenate all files within src/components and its
      // subdirectories into a single file named main.js.
      .pipe(concat("main.js"))
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
      .pipe(dest("./dist"))
  )
}
```

It's important here that you add `concat()` **before running babel** so it only compiles the code once. If you run Babel first it will slow down your build significantly, while creating duplicate code in the process.

{% callout type="warning" %}
This will not work if you're using `import` and `export` statements, as is common in newer JavaScript modules. Here we're making the assumption that you are not using these features, as we're compiling everything together anyways.

If you want to stick with imports and exports (which are a great pattern), I'd suggest building out a pipeline using a build tool like [webpack](/blog/wtf-is-webpack/). I wrote [an introductory guide on getting started with webpack](/blog/javascript-webpack-build-pipeline/).

You could also [use webpack with Gulp](https://www.npmjs.com/package/webpack-stream), but I'm not covering that here.

If you'd like, feel free to add your thoughts to [the discussion on this topic](https://github.com/seancdavis/seancdavis-com/issues/57).
{% endcallout %}

At this point, if you run the build (`npm run build`) you will see the files get compiled to a single `main.js` file in the `dist` directory.

That's great, but you will eventually want to work with third-party libraries within your JavaScript components. And while you could load them separately in your [HTML](/blog/wtf-is-html/) file(s), it's easier to manage and can be more performant when you include those dependencies in your bundle. Let's try that out.

## Step 3: Add Dependencies

The trick here is that we don't want to run Babel through the third-party libraries we're including. It's up to the libraries' author(s) to handle minification and obfuscation. We'll just assume the files are ready to go as they are presented.

This means we now need to break up the build task into multiple functions:

- `jsDeps()` concatenates all third-party libraries into a single file (`main.deps.js`) and stores them in a temporary directory.
- `jsBuild()` concatenates and compiles our JS component code into a single temp file (`main.build.js`).
- `jsConcat()` concatenates the two temp files into a single file (`main.js`) and places it in the `dist` directory.

Before we get to it, let's install a couple example dependencies:

```
$ npm install --save-dev jquery lodash
```

With the dependencies installed we can update the Gulpfile (new behavior is commented):

`gulpfile.js` {.filename}

```js
// Import the "series" function, too.
const { series, src, dest } = require("gulp")

const babel = require("gulp-babel")
const concat = require("gulp-concat")
const plumber = require("gulp-plumber")

function jsDeps(done) {
  // An array of dependencies. Use minified versions
  // here since we aren't processing these files.
  const files = [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/lodash/lodash.min.js"
  ]
  return (
    src(files)
      .pipe(plumber())
      // Combine these files into a single main.deps.js file.
      .pipe(concat("main.deps.js"))
      // Save the concatenated file to the tmp directory.
      .pipe(dest("./tmp"))
  )
}

function jsBuild(done) {
  return (
    src("./src/components/**/*.js")
      .pipe(plumber())
      // Notice the name change.
      .pipe(concat("main.build.js"))
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
      // And the destination change.
      .pipe(dest("./tmp"))
  )
}

function jsConcat(done) {
  // An array of the two temp (concatenated) files.
  const files = ["./tmp/main.deps.js", "./tmp/main.build.js"]
  return (
    src(files)
      .pipe(plumber())
      // Concatenate the third-party libraries and our
      // homegrown components into a single main.js file.
      .pipe(concat("main.js"))
      // Save it to the final destination.
      .pipe(dest("./dist"))
  )
}

// Make use of Gulp's "series" command to ensure each task
// completes before the next one is run.
exports.default = series(jsDeps, jsBuild, jsConcat)
```

Tip: We're using the `tmp` directory as a temporary place to store files during the build process. You can ignore this directory (add `tmp` to `.gitignore`) so you don't have to track changes to these files as they are only useful for a short time during the build process.

[`series()`](https://gulpjs.com/docs/en/api/series#series) is a function of Gulp's that ensures an array of tasks are run _in series_, meaning that one task may not start until the previous one has finished. This is useful in cases like this where we want to ensure we have both temporary files (`main.deps.js` and `main.build.js`) prior to attempting to concatenate them into a single file.

I chose to put all three of these tasks in series for simplicity, but it's not the most performant. Because `jsDeps()` and `jsBuild()` don't rely on each other, they could be run in parallel. So your default task could look something like this:

```js
exports.default = series(parallel(jsDeps, jsBuild), jsConcat)
```

In this case, `jsDeps()` and `jsBuild()` are run in parallel, but `jsConcat()` must wait for _both_ to finish before it is allowed to begin. Note that if you go this route, you have to also import the `parallel` function from Gulp at the top of the Gulpfile.

---

That's it for Part 2! Now you have a concatenated bundle and you're off to the races. If you want to keep digging in, the next part focuses on [building a dynamic manifest file](/blog/compile-es6-code-gulp-babel-part-3/), which means that when we want to add a new file to our bundle, we don't have to touch the Gulpfile every time, but we can have a separate JS config. We'll also discuss supporting building multiple bundles during the same build.

Or, if you want to jump around throughout the series, here is a link to each part:

1. [Part 1: Setup & Simple Implementation](/blog/compile-es6-code-gulp-babel-part-1/)
2. **Part 2: Concatenated Bundle**
3. [Part 3: Dynamic Manifest](/blog/compile-es6-code-gulp-babel-part-3/)
4. [Part 4: Clean Files & Minify Output](/blog/compile-es6-code-gulp-babel-part-4/)
5. [Part 5: Asset Hashing](/blog/compile-es6-code-gulp-babel-part-5/)
