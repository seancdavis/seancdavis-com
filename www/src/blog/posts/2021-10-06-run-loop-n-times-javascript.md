---
title: Run Loop n Times in JavaScript
description: Quick snippet to run some function n times using JavaScript.
image: /blog/211005/yellow--js-loop.png
tags:
  - javascript
---

I run into the situation frequently in which I want to iterate `n` number of times over a loop. As a former Rubyist, I _loved_ being able to do this:

```ruby
10.times do
  # runs 10 times
end
```

Using classic [JavaScript](https://www.seancdavis.com/blog/wtf-is-javascript/) patterns, you could do something like this:

```js
for (i = 1; i <= 10; i++) {
  // runs 10 times
}
```

But that feels ... _old_, doesn't it?

Here's a fancy way to do this with more modern JavaScript:

```js
Array(10).fill().map(() => {
  // runs 10 times
})
```

There are several quirks that makes this work the way it does. If you're curious and want to go deep, [here is a great in-depth look at creating arrays in JavaScript](https://dmitripavlutin.com/power-up-the-array-creation-in-javascript/).
