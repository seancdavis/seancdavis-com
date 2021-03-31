---
title: "Dynamically Changing a Netlify Form Name"
description: "Netlify forms are easy to use because they are simple in scope. Add a little power with this cool trick."
image: /blog/210331/green--netlify-form-name.png
tags:
  - jamstack
  - javascript
  - netlify
---

[Netlify Forms](https://www.netlify.com/products/forms/) are super cool. They are built to be simple and easy to use. But sometimes we need more than a handful of static fields on our form. Sometimes we require a bit of interactivity to add some power to these forms.

What if (for whatever reason) you wanted the data from the form to be saved as two separate forms, depending on some input by the user?

Well, I've found that you can do that on the fly with just a little [JavaScript](/blog/wtf-is-javascript/).

## Understanding the `form-name` Attribute

In my [Netlify Forms Intro Guide](/blog/what-you-need-to-know-about-netlify-forms/), I mentioned that **the `form-name` attribute that comes along with the data submitted to Netlify is extremely important**. It’s what tells Netlify where to put your submission, which can determine additional behavior, such as email notifications.

You'll notice that if you're working with a truly static site — whether plain HTML, or using a static site generator like [Eleventy](https://www.11ty.dev/) that outputs static HTML — Netlify performs some magic for you.

Let's say you publish an HTML page with a form that looks like this:

```html
<form name="My Form" netlify><!-- ... ---></form>
```

If you then look at the deployed site, the markup is actually a little different. It'll look something like this:

```html
<form name="My Form">
  <input type="hidden" name="form-name" value="My Form" />
  <!-- ... --->
</form>
```

During the build, Netlify reads your form name and builds a field that gets submitted along with the rest of your field data.

That means you could change the `value` attribute of the `form-name` field and, _voila!_ You'd be submitting the data to a different form, right!?

### WAIT! GOTCHA!

Well ... sort of.

**Netlify must know about the form after your site is built**. In other words, you technically need to render some form with a `name` attribute for every form you want to submit on the site.

But there are ways to be clever about that. You could hide the forms. You could put them on a page that no one ever sees. It doesn't really matter, they just have to be _somewhere_ on the site so Netlify can process them.

If you just make up a value for `form-name` on the fly, Netlify is not going to store the data. It'll ignore the submission with the assumption that you're trying to do something suspicious.

## Dynamically Changing the `form-name` Field

Let’s say that we have a simple contact form with three fields:

- `subject`
- `email`
- `message`

If `subject` is set to `Sales` then I want to save the submission in a "Contact-Sales" form in Netlify. Otherwise, I want the form to be submitted to a "Contact-Other" form.

### The HTML Markup

Remember, we technically need a form for both options. So our HTML code may look something like this:

```html
<form name="Contact-Sales" method="POST" netlify>
  <select name="subject" required>
    <option value="Sales">Sales</option>
    <option value="Other">Other</option>
  </select>
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>

<form name="Contact-Other" method="POST" netlify style="display: none;"></form>
```

Notice that I've hidden the second form. Netlify will still know it's a form that can be submitted on the site.

### The JavaScript

To add the interactivity, we just need a little JavaScript. In the simplest example, we can assume the form has a `id` attribute of `conditional-form`.

Then we could write a function (`changeFormName`) that fires when the subject field changes (we'll come back to that). The JS code might look something like this:

```js
function changeFormName(event) {
  // Get the value of the subject field.
  var value = event.target.value
  // Build the name we're to use for form-name field.
  var name = `Contact-${value}`
  // Find the form object.
  var form = document.querySelector("#conditional-form")
  // Set the name attribute on it (just to be safe).
  form.setAttribute("name", name)
  // Then find the form-name field and set its value.
  document
    .querySelector('#conditional-form [name="form-name"]')
    .setAttribute("value", name)
}
```

### Add Event Listener to Subject Field

Back in our HTML, we could add our event listener to the `subject` field. Let's listen for an `onchange` event:

```html
<select name="subject" required onchange="changeFormName(event)"></select>
```

See a rough demo of this working here: [https://codepen.io/seancdavis/pen/pmNdXK](https://codepen.io/seancdavis/pen/pmNdXK)

## Putting This into Practice

Note that this is a quick and dirty solution. I do not recommend using `onchange` attributes and global functions in a static context. This is just to demonstrate the foundation. The potential for where you take this is up to you!

---

What cool and interactive things are you doing with Netlify forms? Where do you plan to take what you learned here? [Let's talk](https://twitter.com/seancdavis29)!
