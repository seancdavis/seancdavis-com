---
title: "The Difference Between =, == and === in JavaScript"
permalink: blog/difference-between-equal-signs-javascript/
description: "They may look similar, but they each do something very different from the next, and it's important to understand the differences."
tags:
  - javascript
---

I've begun posting prompts to our development team every morning, often asking a developer to explain some [JavaScript](/blog/wtf-is-javascript/)-based concept to the rest of the team. This has been a great exercise, as teaching tends to be more educational than reading or listening.

While the prompts have ranged from foundational questions to more advanced topics, I like this one — exploring the difference between `=`, `==`, and `===` in JS — because there's a range of experience packed in it. On one hand, if you don't know the difference between `=` and `==`, you're not going to get very far. The difference is foundational to being able to write JavaScript code. But `==` and `===` are close enough in behavior that many newer JS developers don't have to face their difference in every day practice. Still, it's important to know what's going on under the hood.

## What `=` Means in JavaScript

The equality symbol (`=`) is used for [variable assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var). The value on the right side of the equation is stored in a reference (a _variable_) from the left side of the equation.

Typically this includes a keyword like `var`, `let`, or `const` to kick things off. It looks like this:

```js
var a = 1

console.log(a) // => 1
```

## Comparison Operators in JavaScript

While a single equal sign is used for variable assignment, using two or three consecutively is used as a [comparison operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Comparison) for equality, meaning _to check_ if equality exists.

Take a look at this example:

```js
var a = 1

console.log(a == 1) // => true
console.log(a == 2) // => false

console.log(a === 1) // => true
console.log(a === 2) // => false
```

If you try to use one of the comparison operators when attempting to assign a variable, you'll run into a syntax error:

```js
var a == 1 // => SyntaxError: Unexpected token
```

On the other hand, if you use variable assignment when you should be looking for a comparison, you get an unexpected result:

```js
var a = 1

if ((a = 2)) {
  a = 3
} else {
  a = 4
}

console.log(a) // => 3
```

Weird, right?

What happened was that the resolution of `a = 2` returns `2`:

```js
a = 2 // => 2
```

`2` is a _truthy_ value, which means that the if statement is resolved. So we then set `a` to `3` and jump down the script to the log statement.

## The Difference Between `==` and `===` in JavaScript

Okay, so let's fix that comparison statement from above.

```js
var a = 1

// Using == for comparison
if (a == 2) {
  a = 3
} else {
  a = 4
}

console.log(a) // => 4
```

That's better. Now `a == 2` returns false and `a` gets set to `4`.

But what if we use `===` instead?

```js
var a = 1

// Using === for comparison
if (a === 2) {
  a = 3
} else {
  a = 4
}

console.log(a) // => 4
```

Same thing. That's peculiar.

And I think that's why devs get tripped up by the (subtle) difference between `==` and `===` and often don't have to deal with the consequences of it. So we tend to gravitate toward `==` because it's easier to type. Or, if our linter is yelling at us, then maybe we use `===` across the board.

But what's the difference?

While both are equality operators, `===` looks for _strict_ equality. `==` is a little looser and will change the _type_ of the two objects in question to match before looking for equality.

```js
var a = 1
var b = "1"

console.log(typeof a) // => number
console.log(typeof b) // => string

console.log(a == b) // => true
console.log(a === b) // => false
```

## When to Use `==` or `===`

While there are differing opinions out in the world, my practice is to almost never use `==`. I find it extremely valuable to know the _type_ of object you're working with. If you don't, other unexpected consequences may emerge down the road. If you're _really_ looking for equality, then look for strict equality. And if you need to convert type, then convert the type prior to checking for its equality.

---

That's all for now. Assign all the variables and compare them. But don't forget to have a little fun doing it!
