---
title: Cleaning Up Nested Conditionals
description: Flattening the logic of if/else conditionals can go a long way
  toward cleaning up your code.
image: /blog/default/default-blue-01.png
---

(The examples in this article are written in JavaScript, but the principles can be applied to any language.)

---

We've all done (and may still do) something like this:

```js
var myFunction = function (a, b, c) {
  if (a > 0) {
    if (b > 0) {
      if (c > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else if (a == 0) {
    if (b == 0) {
      if (c == 0) {
        return 0
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}
```

Just _look_ at that 25-line mess!

Are you able to cut through the nastiness to see what this is actually doing? It's really quite simple. The function `myFunction` takes three arguments, and:

- If all three arguments are positive, it returns true.
- If all three arguments are zero, it returns zero.
- Otherwise, it returns false.

That natural next step one may take when refactoring this code is to combine conditionals where possible. That would leave something like this:

```js
var myFunction = function (a, b, c) {
  if (a > 0 && b > 0 && c > 0) {
    return true
  } else if (a == 0 && b == 0 && c == 0) {
    return 0
  } else {
    return false
  }
}
```

Phew! From 25 to 9 lines. This at least reads a bit more semantically.

But what if I told you I still thought this was messy ...

If we introduce _exit conditions_ where applicable, we can continue through the flow of the function without being nested within an if/else conditional statement. An _exit condition_ requires the program (in this case, the function) to cease (or _return_) before getting through all its code.

Taking this approach, the function can be adjusted like so:

```js
var myFunction = function (a, b, c) {
  if (a > 0 && b > 0 && c > 0) return true
  if (a == 0 && b == 0 && c == 0) return 0
  return false
}
```

By using exit conditions, we've effectively _flattened_ the logic within this function. That may not seem like much in this scenario, but if you needed to add some additional behavior after checking whether all the values were positive or zero, this would really come in handy.

So, next time the first line in a function you write opens an if/else conditional, stop yourself. Figure out how to introduce exit clauses to clean up your code.

---

**Pro Tip:** One more thing before you leave. Exit clauses should occur _as early in the function as possible_. Your function shouldn't have to process any unnecessary logic if it meets one of the exit conditions.
