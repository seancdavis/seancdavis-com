---
title: Passing a Function as an Argument to a JavaScript Function
description: Learn the basics of callback functions in JavaScript.
tags:
  - javascript
image: /posts/default/default-blue-03.png
---

A powerful idiom in JavaScript is to pass a function as an argument to another function. This is commonly referred to as a callback function. [As MDN says](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function):

> A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

Here is an example:

```js
// Function that doubles the first argument, then runs the second argument as a
// callback function, passing the doubled number and original number to it.
function double(num, callback) {
  // Double the first argument and store as newNum.
  const newNum = num * 2;
  // Run the callback function, using the doubled number as the first argument,
  // and the original number as the second.
  callback(newNum, num);
  // Return the doubled number.
  return newNum;
}

// Run the function using 2 as the input, and store the result as doubledNum.
const doubledNum = double(2, function (result, originalNum) {
  // The first argument in the callback function was the doubled number.
  console.log(result); // => 4
  // The second argument was the original input.
  console.log(originalNum); // => 2
});

// The result of running the double function was the doubled number.
console.log(doubledNum); // => 4
```

In this case, we call `double`, passing `2` as the first argument and a function as the second argument. The `double` function then multiplies `2` by `2` and returns the result (`4`). But, before it returns the result, it runs the callback function, using the doubled number (`4`) as the first argument and the original number (`2`) as the second.

When the callback function runs, we log both arguments. (`4` and `2`) .

The last thing we do is to log the result of calling the `double` function. That function returned the resulting number, which was `4`.

## Named Functions

The previous example used what we call an anonymous function as the callback function, as it wasn't named. Another way to achieve this same result is through a named function.

```js
// The callback function, defined as its own, named function.
const logResult = function (result, originalNum) {
  console.log(result); // => 4
  console.log(originalNum); // => 2
};

const doubledNum = double(2, logResult);
```

This behaves in exactly the same way as the code above. It simply abstracts the callback function into its own space. This is especially useful if you're going to use the callback function in more that one place in your code.

### Gotcha! Watch out for arguments!

There's a little magic that happens behind the scenes when using named functions that can lead to some unexpected behavior.

In the last line of this example — `double(2, logResult)` — we don't see the arguments being passed to `logResult`, as they are abstracted back in the function definition.

It's important to understand the parameters of _both_ functions if you're going to use this approach, as it can lead to some crazy results if you're not paying attention.

Consider this example:

```js
["1", "7", "11"].map(parseInt);
// => [1, NaN, 3]
```

In this case `map` is the first function we're calling and `parseInt` is the second. But it leads to some unexpected results because of the way in which `map` passes arguments to `parseInt`. You can [read more here](https://medium.com/dailyjs/parseint-mystery-7c4368ef7b21) if you're interested in digging into this specific problem.
