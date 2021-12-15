---
title: Animating Dots Using HTML5 Canvas
description: This builds on a previous example and brings some movement to our dots!
tags:
  - html
  - javascript
  - jquery
image: /posts/default/default-lime-02.png
---

Before you get started here, I recommend you take a look at [this article](/posts/mutlicolored-dotted-grid-canvas/) first. It walks through the basics of drawing dots on canvas, and it's what we're going to build on here. But if you're already familiar with canvas and just want to get into it, then please proceed!

## 01: Setup

The setup here won't change. So your [HTML](/posts/wtf-is-html/) and [CSS](/posts/wtf-is-css/) are nice and straightforward.

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

## 02: Animating A Single Dot

We're going to start with our example of a static, single dot and move it around the page.

To keep this simple and get used to animation, let's just move it back and forth along a diagonal line.

_Again, here, we're not wrapping this JavaScript code in a function or a `ready` listener. I'll leave it up to you to worry about variable scoping within your particular example._

```js
// Setup the canvas element.
var canvas = $("canvas.dots");
var context = canvas[0].getContext("2d");
var canvasWidth = canvas.width();
var canvasHeight = canvas.height();
canvas.attr({ height: canvasHeight, width: canvasWidth });

// Set the number of frames we want to run.
var frames = 150;

// We have a currentFrame reference which essentially tracks our place in time.
var currentFrame = 0;

// Set and create our dot.
var dot = { x: 50, y: 50, radius: 25 };
drawDot(dot);

// Start the animation frame 2.5 seconds after the page loads.
setTimeout(function () {
  window.requestAnimationFrame(moveDot);
}, 2500);

// This function moves the dot down and to the right in each frame.
function moveDot() {
  // Clear the canvas so we can draw on it again.
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Adjust the dot's x and y values down and to the right.
  dot.x += 1;
  dot.y += 1;

  // Draw the dot again (remember, we wiped it away with clearRect above).
  drawDot(dot);

  // Move the current time forward by one frame.
  currentFrame += 1;

  // If we've reached our maximum number of frames, reset the dot and start
  // over.
  if (currentFrame == frames) {
    currentFrame = 0;
    dot = { x: 50, y: 50, radius: 25 };
  }

  // Call this function again.
  window.requestAnimationFrame(moveDot);
}

function drawDot(dot) {
  context.beginPath();
  context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#F03C69";
  context.fill();
}
```

While this code is annotated, there are a few things I'd like to call your attention to.

Animating is really all about the `window.requestAnimationFrame` call, which takes a function as an argument. The browser controls _when_ it runs this, but in general it's really, really speedy.

But, the browser wants to be told to render a frame, and that's why you call it at the end of your rendering function -- so the browser knows to run it again.

The other important thing to note here is that we **have to clear the canvas before drawing again**. Try it without, it's interesting. It just leaves the objects you've already drawn. You see that the browser isn't actually moving anything, it's just rendering shapes and providing the illusion that they are the same shape moving. It's like a [motion picture](https://en.wikipedia.org/wiki/Film).

Here's what this looks like:

{% codepen user="seancdavis", id="YzWmKEM", title="Animated Dots #1 - Single Dot" %}

## 03: Let The Dot Move Freely

Next, we're going to let the dot move in any direction. And, most importantly, we're going to make sure that when it hits a boundary, it bounces in the direction that it should.

```js
// Setup the canvas element.
var canvas = $("canvas.dots");
var context = canvas[0].getContext("2d");
var canvasWidth = canvas.width();
var canvasHeight = canvas.height();
canvas.attr({ height: canvasHeight, width: canvasWidth });

var dot = {
  x: 50,
  y: 50,
  radius: 25,
  xMove: "+", // xMove and yMove tell us which direction to move the dot
  yMove: "+",
};

drawDot(dot);

setTimeout(function () {
  window.requestAnimationFrame(moveDot);
}, 2500);

function moveDot() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Find the x and y values of the dot based on the direction it is to move.
  if (dot.xMove == "+") {
    dot.x += 1;
  } else {
    dot.x -= 1;
  }
  if (dot.yMove == "+") {
    dot.y += 1;
  } else {
    dot.y -= 1;
  }

  // Draw the dot in its new position.
  drawDot(dot);

  // If we hit a boundary in some direction, we reverse the movement in the
  // direction that caused the collision.
  if (dot.x + dot.radius == canvasWidth) {
    dot.xMove = "-";
  }
  if (dot.x - dot.radius == 0) {
    dot.xMove = "+";
  }
  if (dot.y + dot.radius == canvasHeight) {
    dot.yMove = "-";
  }
  if (dot.y - dot.radius == 0) {
    dot.yMove = "+";
  }

  // Render it again
  window.requestAnimationFrame(moveDot);
}

function drawDot(dot) {
  context.beginPath();
  context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#F03C69";
  context.fill();
}
```

This is actually a little less complicated (in my mind). We don't have to worry about which frame we're on, we just have to track the direction in which the dot is moving and make sure we reverse it (in that direction) when it hits a boundary.

{% codepen
    user="seancdavis",
    id="KKMOPZW",
    title="Animated Dots #2 - Single Dot with Boundaries" %}

## 03: Add More Dots!

Next, let's add more dots to the mix. Essentially, instead of having just one `dot` object, we'll track an array of objects as `dots` and iterate through them on each animation frame.

We're going to give these objects predictable starting positions for now.

In this example, I also show you how you can increase the number of pixels by which we move a dot and it makes the dots move faster. That's because each dot is moving twice as far in each animation frame.

```js
var canvas = $("canvas.dots");
var context = canvas[0].getContext("2d");
var canvasWidth = canvas.width();
var canvasHeight = canvas.height();
canvas.attr({ height: canvasHeight, width: canvasWidth });

// Set an array of dot objects.
var dots = [
  { x: 100, y: 100, radius: 25, xMove: "+", yMove: "+" },
  { x: 40, y: 200, radius: 25, xMove: "-", yMove: "+" },
  { x: 250, y: 300, radius: 25, xMove: "+", yMove: "-" },
  { x: 150, y: 35, radius: 25, xMove: "-", yMove: "-" },
];

// Notice in the moveDot function we can make dots go faster if we increment
// by more than 1 pixel each time.
var frameLength = 2;

// Draw each dot in the dots array.
for (i = 0; i < dots.length; i++) {
  drawDot(dots[i]);
}

setTimeout(function () {
  window.requestAnimationFrame(moveDot);
}, 2500);

function moveDot() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Iterate over all the dots.
  for (i = 0; i < dots.length; i++) {
    if (dots[i].xMove == "+") {
      dots[i].x += frameLength;
    } else {
      dots[i].x -= frameLength;
    }
    if (dots[i].yMove == "+") {
      dots[i].y += frameLength;
    } else {
      dots[i].y -= frameLength;
    }

    drawDot(dots[i]);

    if (dots[i].x + dots[i].radius >= canvasWidth) {
      dots[i].xMove = "-";
    }
    if (dots[i].x - dots[i].radius <= 0) {
      dots[i].xMove = "+";
    }
    if (dots[i].y + dots[i].radius >= canvasHeight) {
      dots[i].yMove = "-";
    }
    if (dots[i].y - dots[i].radius <= 0) {
      dots[i].yMove = "+";
    }
  }

  // Render it again
  window.requestAnimationFrame(moveDot);
}

function drawDot(dot) {
  context.beginPath();
  context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#F03C69";
  context.fill();
}
```

**Demo:**

{% codepen
    user="seancdavis",
    id="YzWmKYb",
    title="Animated Dots #3 - Multiple Dots with Boundaries" %}

## 04: Apply Animation to the Multi-Colored Grid

Now let's really have some fun!

Here we're going to use the result of [the multi-colored dot tutorial](/posts/mutlicolored-dotted-grid-canvas/) and apply some animation to it. This combines Step 05 from the multi-colored dot tutorial with the previous example.

Two other items we add here are variable speed and some transparency to the dots. You'll see both combine to make it a little more visually interesting.

```js
var dotMargin = 25;
var numRows = 5;
var numCols = 10;
// Set the colors you want to support in this array
var colors = ["#F03C69", "#FFCD32", "#2BAD5D", "#2ABABF", "#CDDC28", "#B91E8C"];
var directions = ["+", "-"];
var speeds = [0.5, 1, 1.5, 2, 2.5, 3, 3.5];

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

// Start with an empty array of dots.
var dots = [];

var dotRadius = dotDiameter * 0.5;

for (var i = 0; i < numRows; i++) {
  for (var j = 0; j < numCols; j++) {
    var x = j * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;
    var y = i * (dotDiameter + yMargin) + dotMargin + yMargin / 2 + dotRadius;
    // Get random color, direction and speed.
    var color = colors[Math.floor(Math.random() * colors.length)];
    var xMove = directions[Math.floor(Math.random() * directions.length)];
    var yMove = directions[Math.floor(Math.random() * directions.length)];
    var speed = speeds[Math.floor(Math.random() * speeds.length)];
    // Set the object.
    var dot = {
      x: x,
      y: y,
      radius: dotRadius,
      xMove: xMove,
      yMove: yMove,
      color: color,
      speed: speed,
    };
    // Save it to the dots array.
    dots.push(dot);
    drawDot(dot);
  }
}

// Draw each dot in the dots array.
for (i = 0; i < dots.length; i++) {
  drawDot(dots[i]);
}

setTimeout(function () {
  window.requestAnimationFrame(moveDot);
}, 2500);

function moveDot() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  for (i = 0; i < dots.length; i++) {
    if (dots[i].xMove == "+") {
      dots[i].x += dots[i].speed;
    } else {
      dots[i].x -= dots[i].speed;
    }
    if (dots[i].yMove == "+") {
      dots[i].y += dots[i].speed;
    } else {
      dots[i].y -= dots[i].speed;
    }

    drawDot(dots[i]);

    if (dots[i].x + dots[i].radius >= canvasWidth) {
      dots[i].xMove = "-";
    }
    if (dots[i].x - dots[i].radius <= 0) {
      dots[i].xMove = "+";
    }
    if (dots[i].y + dots[i].radius >= canvasHeight) {
      dots[i].yMove = "-";
    }
    if (dots[i].y - dots[i].radius <= 0) {
      dots[i].yMove = "+";
    }
  }

  window.requestAnimationFrame(moveDot);
}

function drawDot(dot) {
  // Set transparency on the dots.
  context.globalAlpha = 0.9;
  context.beginPath();
  context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
  context.fillStyle = dot.color;
  context.fill();
}
```

**Demo:**

{% codepen
    user="seancdavis",
    id="PozMYRq",
    title="Animated Dots #4 - Multiple Multicolored Dots with Boundaries" %}

---

I hope you've found both of these tutorials interesting. If you liked them and learned something, please help me out by sharing this post.

And if you have anything to add, hit me up on Twitter. I'm all ears!
