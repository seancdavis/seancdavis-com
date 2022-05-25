---
title: "Pro Tip: Simplify If Statements Using Exit Conditions"
description: >-
  Exit clauses can help you write less code and make your code more readable.
  Here is a simple example, along with some additional tips.
tags:
  - javascript
image: >-
  /posts/220524/pro-tip-simplify-if-statements-using-exit-conditions-ybtu9fLI.png
seo:
  image: >-
    /posts/220524/pro-tip-simplify-if-statements-using-exit-conditions-wNMt8bIG--meta.png
---

On the surface, if statements are super simple. They’re one of the first things we’re taught in logical programming.

```typescript
if (condition) {
  // Do thing ...
} else {
  // Do other thing ...
}
```

In many languages (including JavaScript, as shown above), they often read semantically and can be followed without prior knowledge of the language’s syntax.

## If Statements Can Become Unwieldy

It doesn’t take long for if statements to become difficult to manage. Add a few more conditions or more lines of code within a condition, and all of a sudden it can take a lot of brain power just to understand where you are within the programming logic.

```typescript
if (condition) {
  // Do thing ...
} else if (otherCondition) {
  // Or maybe this will happen ...
} else {
  // And now there's a third option ...
}
```

Sure, we could use something like a switch-case statement, but I find those equally difficult to read. Plus, they can’t always account for the same level of logical parsing that if statements can.

## Use Exit Conditions Simplify and Flatten Code

A pattern I use commonly that I absolutely love is an _exit condition_ (or exit clause). An exit condition is an early return from a function following some logic.

Consider a function that compares two numbers, `a` and `b`. If `a` is greater than `b`, it returns `1`. If `a` is smaller, `-1`. And if they are the same, `0`. The if statement might look like this:

```typescript
function compare(a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}
```

It works, but it’s difficult to read at best.

With an exit condition, we could account for one of the three scenarios first, and use a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to simplify the other two conditions. Here’s a cleaned-up approach:

```typescript
function compare(a, b) {
  if (a === b) return 0;
  return a > b ? 1 : -1;
}
```

We’ve covered all the logic in two lines. Fewer curly braces, and less parsing. We only really have to step through two logical lines rather than examining each condition in isolation.

This can seriously flatten and simplify your code. [Here’s an example](https://www.seancdavis.com/posts/cleaning-up-nested-conditionals/) where I explored nested conditionals and took 25 lines of logic to 3 lines of logical code.

## Other Exit Condition Tips and Benefits

Here are a few other considerations when following this pattern.

### Use Ternary Operator over If/Else Statements

If left with two conditions, you can return from a ternary operation, as shown above. This is a great replacement for if/else statements. But keep them simple. Avoid nesting ternaries.

### Accounting for Multiple Exit Conditions

[The example I linked to earlier](https://www.seancdavis.com/posts/cleaning-up-nested-conditionals/) also shows a case of multiple exit conditions. There’s no limit to how many you can use. With each condition, you simplify the logic you have to deal with farther down in the function.

In general, though, if you have more than two exit clauses, you could likely simplify your function.

### Exit Early and Often

Write the clause as high up in the function as you can. Don’t define variables or do any other work before you have to. Exit as soon as you can. This reduces unnecessary work for your program.
