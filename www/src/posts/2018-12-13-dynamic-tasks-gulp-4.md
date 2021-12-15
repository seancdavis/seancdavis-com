---
title: Dynamic Tasks with Gulp 4
description: With earlier versions of Gulp, dynamic tasks were as simple as a
  creating for loop. Gulp 4 changed this, but it's still possible to create
  dynamic tasks.
tags:
  - Gulp
  - JavaScript
image: /posts/default/default-yellow-03.png
---

Gulp 4 brought some big changes to the way in which tasks are built. While it's still possible to build tasks dynamically, it works differently than it used to. For reference, let's begin by looking at the old way.

## The Old Way

With earlier versions of [Gulp](https://gulpjs.com/), creating dynamic tasks was as simple as creating a `for` loop and building a task with each iteration.

For example, let's say you have a configuration array in JSON saved to a file called `gulp.config.js`:

`gulp.config.js` {.filename}

```js
module.exports = [
  {
    name: "my_task",
    some_option: [],
  },
  {
    name: "another_task",
    another_option: {},
  },
];
```

It's easy enough to require that file in the Gulp config and create a task using the `name` property in each item. That may look something like this:

`gulpfile.js` {.filename}

```js
// [Omitted] Load gulp and other dependencies ...

// Load the config array.
const config = require(`config`);

// Iterate over the config array.
for (options of config) {
  // Create a task, using the "name" property as the task name.
  gulp.task(options.name, [], function () {
    // [Omitted] Do something dynamic here with `options` ...
  });
}
```

Then -- voila! -- you have two tasks!

    $ gulp my_task
    $ gulp another_task

It used to be just that easy.

## Gulp 4 Basics

With Gulp 4, it's not so simple.

Gulp 4 requires [tasks to be exported explicitly](https://gulpjs.com/docs/en/getting-started/creating-tasks). That means task names need to be known while _writing_ the Gulpfile, as opposed to previous versions where tasks (with names) could be generated while _reading_ the file (on runtime).

The functions exported from the Gulpfile are equal to names of functions within the Gulpfile. For example, let's say your default task (the one that is run when no argument is passed to `gulp` on the command line) runs a `build()` function. That config might look something like this:

`gulpfile.js` {.filename}

```js
// [Omitted] Load gulp and other dependencies ...

function build(done) {
  // [Omitted] Do stuff ...
  done();
}

exports.default = build;
```

Then, on the command line, simply running `gulp` would call the `build()` function:

    $ gulp

## Series and Parallel Tasks

Another newer feature in Gulp is the way in which tasks are run in series or parallel. Previously, this required passing an array of dependent tasks to each task, like so:

```js
gulp.task("task_name", ["dependent_task_1", "dependent_task_2"], function () {
  // [Omitted] Do stuff ...
});
```

Now there is much more control over this. Take the Gulp 4 example from above. And say you wanted to run a `clean()` function (and let it finish) prior to running the `build()` function. That could be done like so:

```js
const { series } = require("gulp");

// [Omitted] Load other dependencies ...

function clean(done) {
  // [Omitted] Do stuff ...
  done();
}

function build(done) {
  // [Omitted] Do stuff ...
  done();
}

exports.default = series(clean, build);
```

Notice the exported default task calls a function named `series()` (imported from the Gulp library) and passes the `clean()` and `build()` functions to it as arguments. This ensures `clean()` will run first and will complete prior to `build()` being run.

The same can be done using the `parallel()` function, the difference being that the functions passed to `parallel()` are all run at the same time (they don't wait for others to complete first).

## Putting It Together

We can take this idea of tasks run in series (or parallel) and combine it with _anonymous tasks_ to create a dynamic group of tasks. Let's go back to the simple example where the default task runs a single `build()` function. But now let's have the `build()` function use the config object from the earlier example and create dynamic, anonymous tasks from it.

Here's what that looks like:

`gulpfile.js` {.filename}

```js
const { series } = require("gulp");

// [Omitted] Load other dependencies ...

const config = require(`config`);

function build(done) {
  const tasks = config.map((config) => {
    return (taskDone) => {
      // [Omitted] Do stuff ...
      taskDone();
    };
  });

  return series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })();
}

exports.default = build;
```

Let's look at how each piece of this fits together.

First off, we're calling the `config` array and [mapping it](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), which means we can iterate over the array but manipulate the value returned for each item. This new array gets saved to a `tasks` variable.

The key here is that the value we're mapping to each item in the `tasks` array (which originally came from the `config` array) is an anonymous gulp task. See here:

```js
return (taskDone) => {
  // [Omitted] Do stuff ...
  taskDone();
};
```

This is just a function without a name, and what gets returned from this anonymous function is a function call that completes a gulp task. So we have, in essence, an anonymous gulp task for each item in the `config` array.

The `tasks` array is nothing by itself. What matters is that Gulp will do whatever you tell it to do until you call the argument passed to the function (this is `done()` in these examples). In other words, until we call `done()` within the `build()` function, Gulp will keep trying to do its thing.

And we don't call `done()` until inside the `series()` call _within_ the `build()` function:

```js
return series(...tasks, (seriesDone) => {
  seriesDone();
  done();
})();
```

This is a unique sort of idiom. The first line returns (from the `build()` function) a series call to gulp, passing to it each task from the `tasks` array using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). (If you don't know about the spread operator, this means the `tasks` items are being passed as individual arguments, not as their original array.)

As the last argument in the `series()` call, we open up another anonymous task, but don't do anything except return from that task and then (most importantly) return from the overall (`build()`) task.

Alternatively, if you wanted to run dynamic tasks in parallel, that's just a matter of using `parallel()` instead of `series()`:

```js
return parallel(...tasks, (parallelDone) => {
  parallelDone();
  done();
})();
```

Note that the `seriesDone` and `parallelDone` are just names of arguments, so they can be whatever you'd like.

Also note that if using `parallel()`, you'll have to import that from gulp. You can do this in conjunction with series, if necessary:

```js
const { parallel, series } = require("gulp");
```

## Gotchas!

I hope this was helpful and that you now feel comfortable running dynamic tasks with Gulp 4. But, before you go, there are a few items that tripped me up when learning this new approach that I thought you should know about.

### Imports/Exports

[`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports) is not the same as [`export`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export), and it does not play well with combining imports. Therefore, when requiring dependencies for your gulp task, it's best if you use `require` and not `import`, like shown in these examples:

```js
const { series } = require("gulp");
```

### src/dest

There were no actual task examples here, so you didn't see an example using `src` and `dest`, although these are still two big features of Gulp 4. The difference is they now have to be required/imported. You can do this in conjunction with `series` and/or `parallel`, if necessary.

```js
const { dest, parallel, series, src } = require("gulp");
```
