---
title: Multiple Line "If" Statement in CoffeeScript
tags:
  - coffeescript
description: There are lots of different ways to move "if" statements in CoffeeScript into multiple lines. Pick the one you like the best!
---

Creating if statements that span multiple lines in CoffeeScript can be hard to remember, but it's quite easy. The trick is to make sure you

- keep your indentation the same, and
- end a line with an operator or a backslash

## Simple Examples

Each of these examples will work, but they aren't necessarily pretty.

### 1. Backslash

Use a backslash to continue the line:

```coffee
if a == 1 && b == 1 \
|| c == 1 && d == 1
  doSomething()
```

### 2. "Or" Operator

Use an "or" operator at the end of a line:

```coffee
if a == 1 && b == 1 ||
c == 1 && d == 1
  doSomething()
```

### 3. Parentheses

Use parentheses (and an "or" operator):

```coffee
if(
  a == 1 && b == 1 ||
  c == 1 && d == 1
)
  doSomething()
```

## Refactoring

Let's do a bit of refactoring to see how we can make these a little cleaner.

### 1. Whitespace

Although it may seem odd, the indentation in CoffeeScript is looking for two spaces for it subsequent line. So if you use more than two, it will work as a continuation of the previous line. For example:

```coffee
if a == 1 && b == 1 ||
   c == 1 && d == 1
  doSomething()
```

### 2. Parentheses

If that's hard to read, you can include parentheses.

```coffee
if(a == 1 && b == 1 ||
   c == 1 && d == 1)
  doSomething()
```

### 3. Break Up Logic

Or, you could break up the logic into multiple statements.

```coffee
e = a == 1 && b == 1
f = c == 1 && d == 1
if e && f
  doSomething()
```

_Note: I prefer symbols for operators, such as `&&` vs. `and` as I actually find it easier to read, even though it's less semantic. You can substitute my `&&` for `and` and `||` for `or` and achieve the same effect._

---

**References:**

- [CoffeeScript Issue #966](https://github.com/jashkenas/coffeescript/issues/966)
