---
title: Compile ES6 Code with Gulp and Babel, Part 1
description: "In the first of five parts on compiling multiple ES6 files into a minified bundle, you will learn how to setup the project and build a simple implementation."
tags:
  - babel
  - gulp
  - javascript
---

Welcome to the five-part series on compiling and concatenating ES6 code with Gulp and Babel. In this first part we're going to setup the project and learn how to build a simple Gulp script that compiles ES6 code so it can be supported by older browsers.

Cool? Cool. Let's dig in.

## Step 1: Create `package.json` File

The [`package.json` file](https://docs.npmjs.com/files/package.json) is a configuration file used in many front-end projects. It works with JavaScript package managers -- like [`npm`](https://www.npmjs.com/) and [`yarn`](https://yarnpkg.com/en/) -- to manage your project's dependencies, releases, scripts, and so on.

To prep this project, first make sure you have NPM installed. Alternatively, you can use Yarn, but the examples here will use NPM. I won't go through the installation process under the assumption that you've already used NPM and have it installed. (If you haven't, read through [this guide](https://www.npmjs.com/get-npm).)

With NPM installed, change into your project directory and run the initialize script from NPM.

```
$ cd path/to/your/project
$ npm init
```

This will ask you a series of questions about your project.

```
package name:
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
```

If you don't know the answer you can leave it blank and NPM will set the default value. Follow this step you should see a `package.json` file with some basic values in there. You can change these values directly at any point, if necessary.

Alternatively, if you don't want to go through the setup process, you can manually create the `package.json` file, but you have to at least include a blank JSON object:

`package.json` {.filename}

```json
{}
```

## Step 2: Install Dependencies

With the `package.json` file in place, we're all set to install the project's dependencies. For now these are:

- [@babel/core](https://www.npmjs.com/package/@babel/core): Core Babel compiler.
- [@babel/present-env](https://www.npmjs.com/package/@babel/preset-env): Tells Babel how to transpile your code for browser support.
- [gulp (version 4+)](https://www.npmjs.com/package/gulp): The build toolkit.
- [gulp-babel](https://www.npmjs.com/package/gulp-babel): Gulp plugin for working with Babel.
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber): Error handling for Gulp.

You can install these with a single command:

    $ npm install --save-dev @babel/core @babel/preset-env gulp@4 gulp-babel gulp-plumber

If your `package.json` file was setup properly, you should now see those dependencies with the appropriate version notation.

`package.json` {.filename}

```js
{
  // ...
  "devDependencies": {
    "@babel/core": "^7.2.0",
    "@babel/preset-env": "^7.2.0",
    "gulp": "^4.0.0",
    "gulp-babel": "^8.0.0",
    "gulp-plumber": "^1.2.1"
  }
}
```

## Step 3: Ignore Node Modules

Running `npm install` not only saved your dependencies config to `package.json`, it also installed your dependencies along with all your dependencies' dependencies into a `node_modules` directory. You'll want to save yourself a massive headache later and ignore that directory from Git if you haven't done so already.

`.gitignore` {.filename}

```shell
# ...
node_modules
```

## Step 4: Write JavaScript Components

For our examples throughout this series, we're going to follow a couple conventions:

1. [Component-Driven JavaScript](/component-based-js-architecture.html), which means we're going to write an individual JavaScript file for each component. The examples will show dummy code, but the structure will demonstrate a focus on components.
2. All JavaScript source files are going to go into a `src` directory and build files will be placed in a `dist` directory.

These are simply choices made for these examples. You're welcome to change any values you see throughout the series to suit your project.

With that said, let's create two components -- Foo and Bar. We will continue to work with these components throughout all five parts in this series.

`src/components/foo.js` {.filename}

```js
class Foo {
  log(msg) {
    console.log(msg)
  }
}
```

`src/components/bar.js` {.filename}

```js
class Bar {
  print(msg) {
    document.write(msg)
  }
}
```

Notice these are both ES6 classes and each have a single (but different) instance method. Foo has a `log` method that takes a messages and logs it to the console. Bar has a `print` method that takes a message and writes it to the DOM.

## Step 5: Gulpfile

Next, let's create the Gulpfile (`gulpfile.js`). This is our configuration for our build. It is annotated with comments so you can follow what's going on.

`gulpfile.js` {.filename}

```js
// Import `src` and `dest` from gulp for use in the task.
const { src, dest } = require("gulp")

// Import Gulp plugins.
const babel = require("gulp-babel")
const plumber = require("gulp-plumber")

// Gulp 4 uses exported objects as its tasks. Here we only have a
// single export that represents the default gulp task.
exports.default = function (done) {
  // This will grab any file within src/components or its
  // subdirectories, then ...
  return (
    src("./src/components/**/*.js")
      // Stop the process if an error is thrown.
      .pipe(plumber())
      // Transpile the JS code using Babel's preset-env.
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
      // Save each component as a separate file in dist.
      .pipe(dest("./dist"))
  )
}
```

## Step 6: Add Command-Line Script

At this point, if you have Gulp installed globally you would be able to run the build by simply calling `gulp`:

    $ gulp

You don't need to follow `gulp` with a task name because the default export (`exports.default` in your `gulpfile.js`) is assumed when the task name argument is missing.

But I don't like calling `gulp` directly on the command line because you will inevitably end up with several projects on your machine, each (potentially) requiring a different version of Gulp. And when you call `gulp` directly, you're using the single global version. So you may not know which version of Gulp you're using when you run `gulp` on the command line, and that's a problem.

Therefore, I prefer to use the context of the project by adding a script to `package.json`:

`package.json` {.filename}

```js
{
  // ...
  "scripts": {
    "build": "gulp"
  }
}
```

Now we can run the build like so:

    $ npm run build

And this will run `gulp`, but it does so within the current context (our project), which means it's going to use the version of gulp that the project has (in the `node_modules` directory) and requires.

## Step 7: Test It

After a successful build, you will see a file in the `dist` for each component. Feel free to take these files, plug them into an [HTML](/wtf-is-html) file and then work with them.

For example, you could drop an `index.html` file in the `dist` directory and point it to both components.

`dist/index.html` {.filename}

```html
<script src="foo.js"></script>
<script src="bar.js"></script>
```

And then you could oen the file, and the JavaScript console, and run something like this:

```js
var foo = new Foo()
foo.log("Hello World") // Prints "Hello World" to the console.

var bar = new Bar()
bar.print("Hello World") // Prints "Hello World" to the DOM.
```

---

That's it for Part 1! But there's plenty more to do with Gulp and Babel, so please continue through the series. The next articles is on [concatenating your components into a single file](/compile-es6-code-gulp-babel-part-2.html).

Or you can jump around throughout the series:

1. **Part 1: Setup & Simple Implementation**
2. [Part 2: Concatenated Bundle](/compile-es6-code-gulp-babel-part-2.html)
3. [Part 3: Dynamic Manifest](/compile-es6-code-gulp-babel-part-3.html)
4. [Part 4: Clean Files & Minify Output](/compile-es6-code-gulp-babel-part-4.html)
5. [Part 5: Asset Hashing](/compile-es6-code-gulp-babel-part-5.html)
