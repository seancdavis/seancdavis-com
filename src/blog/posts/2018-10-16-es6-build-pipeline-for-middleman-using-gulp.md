---
title: ES6 Build Pipeline for Middleman using Gulp
description: "Middleman has abandoned its asset pipeline in favor of a more flexible and customized approach. Let's use this new approach to get ES6 modules into our Middleman project."
tags:
  - babel
  - gulp
  - javascript
  - middleman
---

For its first three major versions, Middleman used [Rails' asset pipeline](https://guides.rubyonrails.org/asset_pipeline.html) for its asset pipeline. But as of v4, [Middleman has abandoned using Rails' asset pipeline](https://middlemanapp.com/advanced/asset-pipeline/) in favor of a more customize approach -- [the external pipeline](https://middlemanapp.com/advanced/external-pipeline/).

The idea of the external pipeline is that you can build your own customized front-end build pipeline and easily hook it into the Middleman serve and build processes. Note that this affects only JavaScript, as Middleman still handles processing an SCSS bundle on its own.

This is a solid approach for Middleman. As the docs suggest, it's uncomfortable for developers coming from Rails to have a blank slate from which to generate a JS bundle. But it's 2018, and [the number of ways to approach front-end builds is getting out of control](https://medium.freecodecamp.org/making-sense-of-front-end-build-tools-3a1b3a87043b). So, while it may be uncomfortable to have to put your own build pipeline together, and while it may be overwhelming to decide which approach is best for your project, this feature is accommodating to all walks of the (new) JS life.

We're going to try to keep things as simple as possible. We have two simple goals in this venture:

- To write modular files using [ES6](https://en.wikipedia.org/wiki/ECMAScript).
- To prepend third-party dependencies to the bundle.

_Note: I'm going to be fairly opinionated as we move through this process. I hope you will see that you can alter the approach and code in any way that suits your project's need. What I have here is only one approach and it will not work for all situations._

Alrighty then, let's get to it.

## JavaScript Components

We're going to use [a component-based structure](/component-based-js-architecture.html) to architect our site's JavaScript. That means that instead of long-form spaghetti code littered with `$(document).ready()` wrappers and event handlers, we're breaking down the responsibilities of JavaScript into components.

For example, let's say your site has modal windows and accordions -- you'd have two separate files to handle both functions, probably a `modal.js` and an `accordion.js` or something like that.

For this example, though, let's be generic. We're going to have a `foo.js` component and a `bar.js` component. We're going to put both in a `components` directory.

`source/javascripts/components/foo.js` {.filename}

```js
class Foo {
  doSomething() {
    console.log("Already done.")
  }
}
```

`source/javascripts/components/bar.js` {.filename}

```js
class Bar {
  doSomething() {
    console.log("Working on it.")
  }
}
```

These are both super simple, right? They are JS classes with one instance method that sends a message to the console. Not much to them.

And with only two files, we _could_ just drop a reference to them in the layout and be done.

`source/layouts/layout.erb` {.filename}

```erb
    ...

    <%= javascript_include_tag 'components/foo' %>
    <%= javascript_include_tag 'components/bar' %>
  </body>
</html>
```

But there are several problems with that approach:

- There are already two requests for assets when we only need to make one.
- Every time we add a new JS file you have to make another request.
- We'll likely want JS dependencies at some point and those will also require another request.
- You probably have to support browsers that don't support JS classes (or other new JS features).

So, it's problematic at best.

## The JS Config File

Enter the JS file.

Previously Middleman has relied on [Rails' Sprockets](https://github.com/rails/sprockets) gem for its JS build pipeline. If you're familiar with sprockets, you'll recognize the nice and simple approach -- create a manifest file and then drop in all your requires:

```js
//= require jquery

$().ready({
  // my custom code here
})
```

We _could_ take that approach, but we're going to be using JS already to build our build tasks, so let's just keep it simple and use a JS object as our manifest configuration.

Let's create a `config.js` file in the `javascripts` directory. The structure will look like this:

`source/javascripts/config.js` {.filename}

```js
module.exports = {
  "[name]": {
    dependencies: [],
    files: []
  }
}
```

I like this [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) because it's simple. Every object within the exported object has a name that becomes the bundled JS file. And the config is simply which dependencies to prepend to that file and which custom JS files to transpile, combine, and minify into the bundle.

For this example, let's say we want a bundle called `main.js` and we're going to load in our `foo.js` and `bar.js`, which (for example purposes) rely on [jQuery](https://jquery.com/) and [Lodash](https://lodash.com/).

### Add Dependencies

And let's say we're going to install lodash via npm and jQuery directly. You'd be better to be consistent but I want to support both approaches, so we're using this for demonstration purposes only.

First, simply [copy jQuery](https://code.jquery.com/jquery-2.2.4.min.js) into `javascripts/vendor/jquery.min.js`.

To add Lodash via NPM, first create a `package.json` file in the root of the project with only a single empty object.

`package.json` {.filename}

```js
{}
```

From the command line you can install Lodash.

    $ npm i -D lodash

You should see your `package.json` file update automatically with the lodash dependency.

_Note: This is a good time to add `node_modules` to your `.gitignore` file if you have not done so already._

### Update Config

Now that your dependencies are installed, update your JS config file.

`source/javascripts/config.js` {.filename}

```js
module.exports = {
  main: {
    dependencies: ["~lodash/lodash.min", "vendor/jquery.min"],
    files: ["components/foo", "components/bar"]
  }
}
```

Notice the `~` character preceding lodash. We're going to add a fun little feature that takes a path beginning with `~` and resolves it within the `node_modules` directory. Also notice there are no `.js` extensions on these files. That's just one less thing to type and we can programmatically add it during the build.

But overall, pretty easy to read, right? Cool. Now let's make it work.

## Install Build Tools

We're going to want a handful of tools to help us bring the build together. Let's install those via npm:

    $ npm install -D gulp gulp-babel gulp-concat gulp-plumber gulp-uglify @babel/core @babel/preset-env rimraf

Again, you should see your `package.json` file updated with the new packages.

## Add Gulpfile

[GulpJS](https://gulpjs.com/) is a task runner that uses plugins to wrap other libraries that will facilitate the build for us. While Gulp seems like it's fallen in popularity in recent years, I've always liked it because it's so simple to learn and to get up and running.

The Gulp configuration goes into a `gulpfile.js` file at the root of the project.

**WARNING!** While I say this is simple, there's a lot of code here, so this may be a bit overwhelming at first glance. To help, I've injected comments throughout the file so you can see what's going on. I encourage you to read through the code and I'll summarize below the block.

`gulpfile.js` {.filename}

```js
// Dependencies
const gulp = require("gulp")
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const plumber = require("gulp-plumber")
const uglify = require("gulp-uglify")

// Directory in which to find JS source files.
const srcDir = "./source/javascripts"
// Directory in which to place built files.
const destDir = "./tmp/javascripts"

// The main config file.
const jsConfig = require(`${srcDir}/config`)

// The Gulp tasks are built (and named) dynamically based on the contents of the
// config file. This object holds a reference to the main task names, such that
// they can be used as a dependency to the main `js` task (see bottom of the
// file) that builds all the files at once.
let jsTasks = []

// Loop through the objects within the config object. This is what enables the
// ability to build dynamically-named tasks on the fly.
for (key in jsConfig) {
  // The config object.
  const config = jsConfig[key]
  // The task name is the name of the output file with "-js" appended, just so
  // we can be sure it doesn't conflict with our other built-in tasks.
  const taskName = `${key}-js`
  // Add the task name to the jsTasks array. (More on this below.)
  jsTasks.push(taskName)

  /**
   * @task ${taskName}-deps
   * Concatenates dependencies into a single file.
   */
  gulp.task(`${taskName}-deps`, [], function () {
    // We don't attempt to build a dependencies file unless dependencies were
    // specified in the config.
    if (!config.dependencies) return true
    // Resolve the assumptions made when naming the files. This is where we
    // replace "~" with "node_modules" and append ".js" to each filename. (If
    // "~" is not in the filename we assume the file is in the source
    // directory.)
    const files = config.dependencies.map(f => {
      if (f[0] == "~") return `${f.replace("~", "./node_modules/")}.js`
      return `${srcDir}/${f}.js`
    })
    // Use the files array to ...
    return (
      gulp
        .src(files)
        .pipe(plumber())
        // Concatenate the files together into a combined file in the destDir.
        // This filename is appended with ".deps.js" so it does not conflict with
        // our other files. For example, if our config name is "main" the deps
        // file would be "main.deps.js" and would be placed in "tmp/javascripts"
        // (the destDir value).
        .pipe(concat(`${key}.deps.js`))
        .pipe(gulp.dest(destDir))
    )
  })

  /**
   * @task ${taskName}-files
   * Concatenates components into a single file, transpiles with Babel, and
   * minifies with Uglify.
   */
  gulp.task(`${taskName}-files`, function () {
    // Resolve the filenames. Here the assumption is that all custom JS files
    // are located in the source directory. Therefore, the path to the source
    // directory is prepended and ".js" is appended to the given path.
    const files = config.files.map(f => `${srcDir}/${f}.js`)
    // Use the files array to ...
    return (
      gulp
        .src(files)
        .pipe(plumber())
        // Concatenate the files together combined file ending with ".deps.js" so
        // it does not conflict with our other files.
        .pipe(concat(`${key}.files.js`))
        // Transpile the concatenated file with Babel. This is potentially slower
        // because Babel's work is more difficult the larger a file becomes. But
        // it makes the resulting bundle smaller.
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
        // Minify the bundle.
        .pipe(uglify())
        .pipe(gulp.dest(destDir))
    )
  })

  /**
   * @task ${taskName}
   *
   * Concatenates the built files from the ${taskName}-deps and
   * ${taskName}-files into a single file.
   */
  gulp.task(taskName, [`${taskName}-deps`, `${taskName}-files`], function () {
    // Here the filenames are predictable, and all this task does is concatenate
    // them into a single file.
    return gulp
      .src([`${destDir}/${key}.deps.js`, `${destDir}/${key}.files.js`])
      .pipe(plumber())
      .pipe(concat(`${key}.js`))
      .pipe(gulp.dest(destDir))
  })
}

/**
 * @task js
 *
 * Runs all of the dynamically-built -- ${taskName} -- tasks.
 */
gulp.task("js", jsTasks, function () {
  return
})

/**
 * @task watch-js
 *
 * Uses gulp.watch to watch for changes to the file. When a change is detected
 * it runs the `js` task.
 */
gulp.task("watch-js", function () {
  gulp.watch(`${srcDir}/**/*.js`, ["js"], () => {
    return
  })
})
```

While it looks complicated, there's not much going on here. Essentially we read through the JS config file you created at `source/javascripts/config.js`, loop through it (i.e. this supports multiple bundles), and create the appropriate bundle.

The dependencies are concatenated together. The main set of files are also concatenated, but then they are transpiled using [Babel](https://babeljs.io/) and minified using [Uglify](https://github.com/mishoo/UglifyJS).

At the bottom of the file are the only two tasks you'll actually run, which are `js` and `watch-js`. The `js` task runs all the dynamically-built tasks and the `watch-js` task runs `gulp.watch` which will start up a process in your terminal that watches for file changes and, when it detects a change, it re-runs the `js` task.

## Test Gulp Tasks

With everything in place, you should be able to run your Gulp tasks. Try it!

    $ gulp js

If you get an error that the gulp command is not found, you may need to install it globally (`$ npm i -g gulp`).

If it ran successfully, you should see three files in `tmp/javascripts`:

- `main.deps.js` is the concatenated vendor files.
- `main.files.js` is the processed custom scripts.
- `main.js` is the resulting bundle.

## Add `package.json` Scripts

While we tested this by running the global `gulp` command, we're going to be better served if we can run this script from within the context of our project using `npm`. To do this, we're going to add scripts to the `package.json` file.

`package.json` {.filename}

```json
{
  "scripts": {
    "clean": "rimraf ./tmp/javascripts",
    "build:clean": "npm run clean && npm run build",
    "dev": "gulp watch-js",
    "build": "gulp js"
  },
  "devDependencies": {
    // ...
  }
}
```

Each of the items in the `scripts` object can be run with `npm run [name]`. This gives us the following commands:

- `npm run clean`: Deletes the build directory (`tmp/javascripts`) and all its contents.
- `npm run build`: Runs `gulp js` which builds our bundle(s). It also creates the build directory if necessary.
- `npm run dev`: Runs the `gulp watch-js` task, which will watch for JS file changes and rebuild.
- `npm run build:clean`: Runs the `clean` script then the `build` script.

Save the file and you should be able to run any of these commands and get the expected output.

## Add to Middleman

The last thing we have to do is hook these processes into Middleman using [the external pipeline faeture](https://middlemanapp.com/advanced/external-pipeline/), so Middleman knows to run the appropriate script during the build. We do this in the Middleman config file:

`config.rb` {.filename}

```rb
# ...

if build? || server?
  activate(
    :external_pipeline,
    name: :gulp,
    command: build? ? 'npm run build:clean' : 'npm run dev',
    source: 'tmp',
    latency: 1
  )
end

ignore /(deps|files|config)\.js/
ignore /javascripts\/(components|vendor)\/(.*)\.js/

# ...
```

Notice we've wrapped the external pipeline activation in an if statement looking for `build?` or `server?` to return true. This is so Middleman doesn't try to run the JS build when it is reading or processing the file.

We also have a conditional as the command. We do this so that when Middleman is being built (presumably to be deployed) we run `npm run build:clean` which cleans out our build directory and rebuilds the files once. But when we are not running build (presumably in dev), we run `npm run dev` which will watch for changes while the middleman server is running.

The crucial part of this, though, is the `source` argument, which tells Middleman that the `tmp` directory is where our built files live. Recall that our build directory is `tmp/javascripts`. Therefore we use `tmp` as our source, and middleman knows to look into a `javascripts` directory within the source directory. In other words, you could change `tmp` to anything you want, you'll just also have to make the change in `gulpfile.js` and `package.json`.

Last, we tell Middleman to ignore our temp and config JS files, along with the original vendor and component files. Following this, when the project is built, you should see only your bundled scripts in the `build/javascripts` directory.

And the very last part is to load the script into your layout:

`source/layouts/layout.erb` {.filename}

```erb
<!-- ... -->

<%= javascript_include_tag 'main' %>

<!-- ... -->
```

## A Few Caveats

That's really it. At this point you should be able to run the Middleman serve or build command and see your resulting bundle.

Before I close, I want to let you know about a few caveats to this approach:

1. We transpile and minify our custom scripts but not the vendor scripts. This is intentional, as we should leave the production of the appopriate code to the vendor. Because of this, the expectation is that you'd add the minified version of the vendor file.

2. The build directory I chose as `tmp` was arbitrary. You really can put these files wherever you feel most appropriate. Just remember to make changes in `gulpfile.js`, `package.json`, and `config.rb`.

3. There is a question as to [whether or not you should be concatenating assets](https://medium.com/@asyncmax/the-right-way-to-bundle-your-assets-for-faster-sites-over-http-2-437c37efe3ff). I still choose to take this approach, but it may not always be the best approach. Perhaps you choose to load your dependencies individually. Ultimately, you should configure your project the way in which it works best for you.

4. This was a prototype. I'm working on something similar in production, but if you find issues with the approach, please [let me know](https://twitter.com/seancdavis29).

---

And that's all! I hope this helped you to building an ES6 bundle in your Middleman project.
