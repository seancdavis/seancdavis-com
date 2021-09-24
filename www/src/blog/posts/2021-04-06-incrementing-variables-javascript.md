---
title: "Incrementing Variables in JavaScript"
description: "JavaScript has three different types of incrementers: i++ ++i and i+=1. Let's look at how they differ from one another."
image: /blog/210406/pink--js-incrementers.png
tags:
  - javascript
---

Like many things with JavaScript, incrementing and decrementing variables is ... _a little weird_.

The classic example is using `i` as an index-based iterator when looping through an array. Like this:

```js
const sandwiches = ["Club", "Reuben", "Grilled Cheese"]

for (let i = 0; i < sandwiches.length; i++) {
  console.log(i, sandwiches[i])
}

// => 0 'Club'
// => 1 'Reuben'
// => 2 'Grilled Cheese'
```

[In this example](https://codepen.io/seancdavis/pen/dyNRKLo?editors=0012), after each iteration within the for loop is completed, `i++` is executed, which _increments_ the variable, meaning it increases the value by `1`. You can see this in the result above, where `i` is `0`, then `1`, then `2`.

## Another Incrementer: `++i`

Did you know `i++` isn't the only way to iterate on a variable? JavaScript also has an incrementing function that can be written with the plus ahead of the variable, e.g. `++i`.

Replace the `i++` above with `++i` and see what you get. (You can edit [this Pen](https://codepen.io/seancdavis/pen/dyNRKLo?editors=0012) if you'd like.)

Nothing changes! That's because the result of both `i++` and `++i` leave `i` with a value `1` more than it previously had.

But they are different! The difference is baked into how `i` is _returned_ from the incrementing function:

- `i++` returns `i` **before** incrementing it.
- `++i` returns `i` **after** incrementing it.

Consider this:

```js
let i = 0
console.log(i) // => 0

console.log(i++) // => 0
console.log(i) // => 1

console.log(++i) // => 2
console.log(i) // => 2
```

Notice that when we log `i++` we're logging the `return` value of running `i++`, which is `1`, since `i` was returned before incrementing.

## Another Third Player: `i+=1`

There's _another_ type of operation that can be used for incrementing in JavaScript! 🤯

The `+=` operator is called [the addition assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment). It works by adding the right side of the equation to the variable on the left, and then storing the result in the variable.

This works _similarly_ to `++i` in that the return value of the function call is the value of `i` **after** the addition was applied.

```js
let i = 0
console.log(i) // => 0

console.log(i++) // => 0
console.log(i) // => 1

console.log(++i) // => 2
console.log(i) // => 2

console.log((i += 1)) // => 3
console.log(i) // => 3
```

And you don't have to use `1` either. You could use any value and it will be applied to `i`.

```js
let i = 0
console.log(i) // => 0

console.log(i++) // => 0
console.log(i) // => 1

console.log(++i) // => 2
console.log(i) // => 2

console.log((i += 1)) // => 3
console.log(i) // => 3

console.log((i += 2)) // => 5
console.log(i) // => 5
```

And now you have the knowledge to go impress your coworkers by incrementing all the variables!
