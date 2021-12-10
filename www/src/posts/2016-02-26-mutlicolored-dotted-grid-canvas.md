---
title: Create a Multi-Colored, Dotted Grid with HTML5 Canvas
description: The wide world of canvas is open-ended. Here's a fun example to dig
  in and learn some of the basics of HTML5 canvas.
tags:
  - html
  - javascript
  - jquery
image: /posts/default/default-orange-03.png
---

[HTML5 Canvas](https://en.wikipedia.org/wiki/Canvas_element) is a great way to build, animate, and interact with shapes in your website or web application.

The goal of this article is to teach you how to build a multi-colored dot pattern within a `<canvas>` element. We're going to start simple and build on each example.

## 01: The Canvas Element

Let's begin with a simple canvas element.

`HTML` {.filename}

```html
<canvas class="dots">Your browser does not support canvas.</canvas>
```

`CSS` {.filename}

```css
canvas.dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

_Note: To be able to work with canvas, the element needs `width` and `height` attributes. I don't state them explicitly because we're going to make them relative here, so we'll dynamically set their attributes._

By itself, this code doesn't look like anything, but it's that base we need to continue.

## 02: Drawing A Circle

Next, let's just draw one circle so we can see what that code looks like.

To do that, we'll need to use some JavaScript. I'm going also use jQuery so the code is a little cleaner, but you don't need to.

```js
$(document).ready(function () {
  // Store a reference to canvas.
  var canvas = $("canvas.dots");

  // Set the width and height attributes on the canvas element based on its
  // current size.
  canvas.attr({ height: canvas.height(), width: canvas.width() });

  // The context is what we use to draw shapes.
  var context = canvas[0].getContext("2d");

  // Draw a circle.
  context.beginPath(); // begin drawing
  context.arc(50, 50, 25, 0, 2 * Math.PI, false); // specify that it's an arc
  context.fillStyle = "#F03C69"; // add a fill color
  context.fill(); // fill it in
});
```

This is annotated to make it easier to understand, but there are a few items I'd like to discuss:

- Setting the `width` and `height` attributes is essentially for the browser to know how to render what you're telling it to render.
- Since we're setting `width` and `height` on page load, we're not accounting for the window being resized. You'd have to wrap that in a `resize` call if you want to add that support. I'm not worried about that for this example.
- When we reference `canvas[0]` when setting `context`, the `[0]` is so we get an actual element instead of the standard jQuery response.
- We've hard-coded the arc here. See [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc) for its arguments.

**Here's where we are now:**

{% codepen
    user="seancdavis",
    id="oNLKvqm",
    title="Dot Grid #1 - Single Dot" %}

## 03: Add A Row Of Dots

Okay, now we know how to draw a circle. So, let's say _we want to draw a row of five circles across the page, with a left, top, and right padding of 25 pixels._

There are two main functions we're going to add here. First, we're going to find the center of the five circles we're going to draw, and then we'll call a `drawDot` function for each of them.

_Note: I'm going to get rid of the `$(document).ready ...` function for future examples just to keep the code a little more concise._

```js
// Setup (explained earlier)
var canvas = $("canvas.dots");
var context = canvas[0].getContext("2d");
canvas.attr({ height: canvas.height(), width: canvas.width() });

// We need a reference to the canvas width to calculate dot sizes and positions.
var canvasWidth = canvas.width();

// We're setting the margin between dots (and the edge of the container), and
// then we'll set the size of the dots automatically.
var dotMargin = 25;

// We'll set the number of dots dynamically, too, so we can adjust and see how
// it changes.
var numDots = 5;

// Let's figure out the radius of each dot.
var dotDiameter = (canvasWidth - (2 + numDots) * dotMargin) / numDots;
var dotRadius = dotDiameter * 0.5;

// Using the number of dots specified, find the center of each dot, and then
// draw it.
for (var i = 0; i < numDots; i++) {
  var x = i * (dotDiameter + dotMargin) + dotMargin + dotRadius;
  var y = dotMargin + dotRadius;
  drawDot(x, y, dotRadius);
}

// This is just as we had done before, but making values dynamic.
function drawDot(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#F03C69";
  context.fill();
}
```

All we've done here is figure out the center for each dot.

- The `x` value calculates the number of previous margins and dots to the left of the current dot and then adds another margin and radius for the current dot.
- The `y` value just pushes us away from the top of the page a bit.

**Demo:**

{% codepen
    user="seancdavis",
    id="KKMOPRm",
    title="Dot Grid #2 - Row of Dots" %}

Since we pulled out `numDots` and `margin`, play around with some different values and see how the pattern changes.

## 04: Create A Grid of Dots

Now that we can build one row, let's try to create a grid by adding an optional number of rows.

This gets a little trickier. Here's some code:

```js
// Setup the parameters for our grid. These are the values you can change.
var dotMargin = 25;
var numRows = 5;
var numCols = 10;

// Setup (explained earlier)
var canvas = $("canvas.dots");
var context = canvas[0].getContext("2d");
var canvasWidth = canvas.width();
var canvasHeight = canvas.height(); // this one is new
canvas.attr({ height: canvasHeight, width: canvasWidth });

// Because we don't know which direction (x vs. y) is the limiting sizing
// factor, we'll calculate both first.
var dotWidth = (canvasWidth - 2 * dotMargin) / numCols - dotMargin;
var dotHeight = (canvasHeight - 2 * dotMargin) / numRows - dotMargin;

// Now, we use the limiting dimension to set the diameter.
if (dotWidth > dotHeight) {
  var dotDiameter = dotHeight;
  var xMargin =
    (canvasWidth - (2 * dotMargin + numCols * dotDiameter)) / numCols;
  var yMargin = dotMargin;
} else {
  var dotDiameter = dotWidth;
  var xMargin = dotMargin;
  var yMargin =
    (canvasHeight - (2 * dotMargin + numRows * dotDiameter)) / numRows;
}

// Radius is still half of the diameter, because ... math.
var dotRadius = dotDiameter * 0.5;

// Now, we have to iterate in both directions, so we need a loop within a loop.
// This loop is a little more complicated because the margin in the direction
// with more space is not going to be the value you set.
for (var i = 0; i < numRows; i++) {
  // i is the row iterator
  for (var j = 0; j < numCols; j++) {
    // j is the column iterator
    var x = j * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;
    var y = i * (dotDiameter + yMargin) + dotMargin + yMargin / 2 + dotRadius;
    drawDot(x, y, dotRadius);
  }
}

function drawDot(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#F03C69";
  context.fill();
}
```

_The first thing I want to note here is that there are many different ways of doing this math. If you go through this, and you come up with a way to make it more concise and easier to read or understand, please share a snippet with me and I'll update this code. This is just one, quick approach._

The main difference here is that we have to consider which dimension of our canvas is the limiting factor based on our parameters, and then adjust the margin and diameter accordingly.

**And this is what it looks like:**

{% codepen
    user="seancdavis",
    id="zYBgOja",
    title="Dot Grid #3 - Grid of Dots" %}

## 05: Random Colors

How about, just for fun, we make it multi-colored? We'll just set an array of colors at the beginning and pick one from it for each dot. Then we'll pass that to the `drawDot` function.

I've cleaned up the comments so you can see the two lines that are new:

```js
var dotMargin = 25;
var numRows = 5;
var numCols = 10;
// Set the colors you want to support in this array
var colors = ["#F03C69", "#FFCD32", "#2BAD5D", "#2ABABF", "#CDDC28", "#B91E8C"];

var canvas = $("canvas.dots");
var context = canvas[0].getContext("2d");
var canvasWidth = canvas.width();
var canvasHeight = canvas.height(); // this one is new
canvas.attr({ height: canvasHeight, width: canvasWidth });

var dotWidth = (canvasWidth - 2 * dotMargin) / numCols - dotMargin;
var dotHeight = (canvasHeight - 2 * dotMargin) / numRows - dotMargin;

if (dotWidth > dotHeight) {
  var dotDiameter = dotHeight;
  var xMargin =
    (canvasWidth - (2 * dotMargin + numCols * dotDiameter)) / numCols;
  var yMargin = dotMargin;
} else {
  var dotDiameter = dotWidth;
  var xMargin = dotMargin;
  var yMargin =
    (canvasHeight - (2 * dotMargin + numRows * dotDiameter)) / numRows;
}

var dotRadius = dotDiameter * 0.5;

for (var i = 0; i < numRows; i++) {
  for (var j = 0; j < numCols; j++) {
    var x = j * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;
    var y = i * (dotDiameter + yMargin) + dotMargin + yMargin / 2 + dotRadius;
    // Grab a random color from the array.
    var color = colors[Math.floor(Math.random() * colors.length)];
    drawDot(x, y, dotRadius, color);
  }
}

function drawDot(x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}
```

And here's what this looks like (note that refreshing the page will give you a different combination of colors):

{% codepen
    user="seancdavis",
    id="PozMYaP",
    title="Dot Grid #4 - Multicolored Grid of Dots" %}

---

That should be enough to get you started. If you found this useful, please help me out by sharing the article!

**References:**

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
