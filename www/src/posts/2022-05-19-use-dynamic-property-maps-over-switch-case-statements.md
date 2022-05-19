---
title: Use Dynamic Property Maps over Switch Case Statements
description: >-
  An everyday JavaScript pattern to avoid clunky switch-case statements and
  unnecessary if conditionals.
tags:
  - javascript
image: >-
  /posts/220519/use-dynamic-property-maps-over-switch-case-statements-3iMv-f6H.png
seo:
  image: >-
    /posts/220519/use-dynamic-property-maps-over-switch-case-statements-cwekPF9L--meta.png
---

It’s a common scenario in JavaScript to want _something_ returned based on some other value.

## The Example

For example, let’s say I have some _dynamic_ value representing the _theme_ of a button. I want to use that to call a function that returns a string of classes I should use when rendering the button.

This is what I expect:

```js
// "light" theme
getButtonClasses("light"); // => "bg-gray text-black"

// "dark" theme (default)
getButtonClasses("dark"); // => "bg-black text-white"
getButtonClasses("WRONG"); // => "bg-black text-white"
getButtonClasses(); // => "bg-black text-white"
```

## Don’t Use If Statements

Your first inclination may be to use an if/else statement because we have only two options. Something like this:

```js
function getButtonClasses(theme = "dark") {
  if (theme === "light") {
    return "bg-gray text-black";
  } else {
    return "bg-black text-white";
  }
}
```

That works, but it _can_ lead to some problems:

- It doesn’t scale. Once you add support for a third theme, it starts to become unwieldy.
- Often these scenarios will require more logic than a simple string to return. It can become easy to get lost in which part of the _if_ statement you’re in when the logic gets longer (though there are ways of avoiding that).

## Don’t Use Switch Case Statements

I do not like switch-case statements. I’ve rarely found a good use for them. Here’s how the function might look using switch case:

```js
function getButtonClasses(theme = "dark") {
  switch (theme) {
    case "dark":
      return "bg-black text-white";
    case "light":
      return "bg-gray text-black";
    default:
      return "bg-black text-white";
  }
}
```

You can already see that it’s messier than the if statement. It doesn’t really scale much better than the if statement either. It’s a lot of code for simple value checking.

## Try Dynamic Property Maps

My favorite pattern to use in these scenarios is a dynamic property map. It works by defining a property and using square brackets to interpolate the key and return the value of that property.

Consider the values we want returned. We could create a map like this:

```js
const buttonClassMap = {
  dark: "bg-black text-white",
  light: "bg-gray text-black",
};
```

And then we can access the values like this:

```js
buttonClassMap["light"]; // => "bg-gray text-black"
buttonClassMap["dark"]; // => "bg-black text-white"
```

This is great because:

- It scales perfectly. Need to support a new mapping? Just add a new key-value pair.
- No need for a function. Everything is defined statically and accessed directly.

### Even for Simple Cases

I use this approach even for these simple cases because it’s clean when it’s small and scales better than the other approaches. That way I don’t have to make a conditional decision, I just go to the map every time. My code is consistent and using the pattern becomes like muscle memory.

### Accounting for Default Values

Because this isn’t a function and just an object, we have to define default values differently.

In the example, I used a string to access the properties. In practice, those strings would be set to a variable and determined at runtime. Suppose the variable is called `theme`. We can set a default to `dark` like this:

```js
buttonClassMap[theme || "dark"];
```

{% callout type="note" %}
Note: We use `||` instead of the often preferred `??` because we then have a fallback for empty strings.
{% endcallout %}

### Accounting For Bad Values

What we don’t have a fallback for is incorrectly typing a key. There are several ways you could ensure that, but if you can’t be sure that `theme` is going to be a valid key, an alternative approach to the previous example is this:

```js
buttonClassMap[Object.keys(buttonClassMap).includes(theme) ? theme : "dark"];
```

This looks at the possible keys and uses `dark` as the key unless it finds a match.

### Using with Functions/Logic

You’re not limited to return simple values here, either. You could even return a function.

```js
const funcMap = {
  a: (arg) => console.log(arg),
  b: (arg) => console.log(arg),
};

funcMap["a"]("HELLO!"); // Logs "Hello!" to the console
```

I hope this was a helpful sets of tips that you can work into your everyday JavaScript!
