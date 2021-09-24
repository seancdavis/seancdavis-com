---
title: WTF is object-dig?
description: 'Tired of "Cannot read property of undefined" errors? object-dig can help!'
tags:
  - javascript
---

[object-dig](https://github.com/joe-re/object-dig) is one of my favorite JavaScript libraries that isn't all that popular (I'll tell you why).

It provides a means of looking for a property in a deeply-nested object, without worrying about running into an error. Instead, the function will return `undefined` if any of the properties along the way don't exist.

It is inspired by [Ruby's `dig` method](https://ruby-doc.org/core-2.3.0_preview1/Hash.html#method-i-dig), which provides similar functionality on Ruby hashes (which are /similar/ to JavaScript objects).

## object-dig Example

For example, let's say we've imported the function as `dig`, like so:

```js
import dig from "object-dig"
```

And we have a nested object:

```js
const obj = {
  a: {
    b: {
      c: "Hi there!"
    }
  }
}
```

I could access `obj.a.b.c` with `dig`:

```js
dig(obj, ["a", "b", "c"])
// => "Hi there!"
```

But if I tried a property that didn't exist and kept drilling, I'd just get undefined:

```js
dig(obj, ["WRONG", "b", "c"])
// => undefined
```

This is nice for avoiding an error just because a property doesn't exist.

## I don't use object-dig today

All this said, as much as I love it, I don't use this function much today. If it's the type of functionality I require when working with objects, then I may include it. But I often make use of additional features from [Lodash](/blog/wtf-is-lodash/).

And Lodash has [a `get` method](https://lodash.com/docs#get) which provides similar functionality, so I tend to opt for that.

## Reference Links

- [GitHub](https://github.com/joe-re/object-dig)
- [NPM](https://www.npmjs.com/package/object-dig)
- [jsDelivr](https://www.jsdelivr.com/package/npm/object-dig)
