---
title: "Converting FormData to JSON in JavaScript"
description: "FormData is a useful interface for collecting data from a form. But it can be tricky to convert to JSON."
image: /posts/210428/green--json-form.png
tags:
  - javascript
---

[The `FormData` interface](https://developer.mozilla.org/en-US/docs/Web/API/FormData) is a super convenient way to collect data from a `<form>` element. This makes the process of submitting form requests asynchronously a total walk in the park.

_Most of the time._

It works really great out of the box if you're able to send your request using the `multipart/form-data` encoding type. But what often happens is the service that is receiving that data isn't setup to work with that encoding. That's because it's not as easy to work with. It's often a cleaner approach to be able to accept JSON on the server side and use that to (do whatever) with the form data.

## Sending FormData Directly

Let's say we have a super simple form, with one field to collect a name:

```html
<form onsubmit="submitForm(event)">
  <label>Name</label>
  <br />
  <input type="text" name="name" required />
  <br /><br />
  <input type="submit" value="Submit" />
</form>
```

{% callout type="note" %}
Don't actually use `onsubmit` to call a global function in production. [Here are a couple alternate patterns worth considering](/posts/two-ways-to-keep-javascript-local/).
{% endcallout %}

We could then submit the data through some JavaScript function:

```js
function submitForm(event) {
  // Prevent the form from submitting.
  event.preventDefault();
  // Set url for submission and collect data.
  const url = "https://example.com/...";
  const formData = new FormData(event.target);
  // Submit the data.
  const request = new XMLHttpRequest();
  request.open("POST", url);
  request.send(formData);
}
```

That works great if your server (or serverless function) can process the data directly.

## Converting FormData to JSON

Now here's the weird thing. If you inspect `formData` from the function above, it looks like there's nothing there.

Let's adjust our function:

```js
function submitForm(event) {
  // Prevent the form from submitting.
  event.preventDefault();
  // Set url for submission and collect data.
  const url = "https://example.com/...";
  const formData = new FormData(event.target);
  // Log the data.
  console.log(formData);
}
```

This will result in a log to the console like this:

```
FormData {}
```

_Coooool._ That's not helpful.

Instead, we actually have to iterate over the field individually and build an object manually.

```js
function submitForm(event) {
  // Prevent the form from submitting.
  event.preventDefault();
  // Set url for submission and collect data.
  const url = "https://example.com/...";
  const formData = new FormData(event.target);
  // Build the data object.
  const data = {};
  formData.forEach((value, key) => (data[key] = value));
  // Log the data.
  console.log(data);
}
```

Now fill in the field with something like "My Name" and submit the form. You'll see the object logged to the console:

```js
{
  name: "My Name";
}
```

## Handling All Cases

That will solve for many cases, but not all. [This StackOverflow answer](https://stackoverflow.com/a/46774073/2241124) offers a solution for handling multi-select lists. [Check out the demo](https://jsfiddle.net/wilt/jwkzdhsx).

---

**References:**

- [Demo](https://codepen.io/seancdavis/pen/vYgZaJm?editors=1111)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) (MDN)
- [This StackOverflow answer](https://stackoverflow.com/a/46774073/2241124)
- [Multi-select demo](https://jsfiddle.net/wilt/jwkzdhsx)
