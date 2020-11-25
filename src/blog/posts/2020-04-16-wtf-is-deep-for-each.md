---
title: WTF is deep-for-each?
description: Explore an introduction to the super cool, single-function JavaScript package, deep-for-each.
tags:
  - javascript
  - wtf
---

[deep-for-each](https://github.com/moxystudio/js-deep-for-each) is a JavaScript package that ships a single function used for recursively iterating over an object. It is most useful when wanting to manipulate or extract from an object with an unpredictable structure.

## How deep-for-each Works

If we were to import the deep-for-each function as `deepForEach`, the usage would look like this:

```js
import deepForEach from "deep-for-each"

deepForEach(movie, (value, key, subject, path) => {
  // do something ...
})
```

The function accepts two arguments — the object and the callback. The callback is fired for every property within the object, providing access to the following for that property:

- `value`: The property's value, which may include descendants if the property is an object or array of objects.
- `key`: The property's key.
- `subject`: The surrounding object — i.e. the property's parent and parents' descendants.
- `keyPath`: The path to the property from the original object.

Let's walk through a couple quick examples ...

## Example #1: Callback Arguments

Say we have a _movie_ object that contains a bunch of data for a given film. I just watched a silly movie, [_Jumanji: The Next Level_](https://www.imdb.com/title/tt7975244), so let's use that as our example. Here's a snippet of that film might look like:

```js
const movie = {
  name: "Jumanji: The Next Level",
  year: "2019",
  cast: [
    {
      actor: {
        name: "Dwayne Johnson"
      },
      character: {
        name: "Bravestone"
      }
    },
    {
      actor: {
        name: "Karen Gillan"
      },
      character: {
        name: "Ruby"
      }
    }
  ]
}
```

If I were to run the deep-for-each function over that object, displaying the output in each available callback, the code to execute it would be something like this:

```js
import deepForEach from "deep-for-each"

deepForEach(movie, (value, key, subject, path) => {
  console.log("KEY:", key)
  console.log("VALUE:", value)
  console.log("SUBJ:", subject)
  console.log("PATH:", path)
})
```

For the first key-value pair — the top-level `name` — that would log the following:

```
KEY: name
VALUE: Jumanji: The Next Level 
SUBJ: { name: 'Jumanji: The Next Level', 
  year: '2019', 
  cast:  
   [ { actor: [Object], character: [Object] }, 
     { actor: [Object], character: [Object] } ] } 
PATH: name
```

But, then let's say we're in the first cast member's real `name`. That would look like this:

```
KEY: name
VALUE: Dwayne Johnson 
SUBJ: { name: 'Dwayne Johnson' } 
PATH: cast[0].actor.name 
```

## Example #2: Creating New Properties

Now, suppose I couldn't predict the structure of this object, but I wanted to provide a `title` alias to every `name` property. I could look for `name` keys and set a title if one doesn't already exist. It'd look like this:

```js
deepForEach(movie, (value, key, subject, path) => {
  if (key === "name" && !subject.title) subject.title = value
})
```

That says if we run into a `name` property where there is not a sibling `title` property, then we duplicate the `name` property as `title`. If we were to check the value of `movie` after running this recursive function, we'd see this:

```json
{
  "name": "Jumanji: The Next Level",
  "year": "2019",
  "cast": [
    {
      "actor": {
        "name": "Dwayne Johnson",
        "title": "Dwayne Johnson"
      },
      "character": {
        "name": "Bravestone",
        "title": "Bravestone"
      }
    },
    {
      "actor": {
        "name": "Karen Gillan",
        "title": "Karen Gillan"
      },
      "character": {
        "name": "Ruby",
        "title": "Ruby"
      }
    }
  ],
  "title": "Jumanji: The Next Level"
}
```

While that may not be super practical, it demonstrates how flexible and powerful this function can be.

## Warning: Be Careful!

As always, _with great power comes great responsibility_. So, while this is really powerful and can clean up some gnarly code, it also means you have to be careful. It's going to be much easier to screw something up along the way.

## Reference Links:

- [GitHub](https://github.com/moxystudio/js-deep-for-each)
- [NPM](https://www.npmjs.com/package/deep-for-each)
- [jsDelivr](https://www.jsdelivr.com/package/npm/deep-for-each)
