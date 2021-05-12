---
title: How to Use Netlify Forms in a Gatsby Project
description: "Netlify form handling is an extremely powerful feature that enables you to collect dynamic data from your users on your static sites. But it's a little tricky to get it working right within a Gatsby project. Here's a detailed look at a couple different ways of approaching Netlify forms for a Gatsby site."
tags:
  - gatsby
  - jamstack
  - netlify
---

I’ve (somewhat unexpectedly) become a serious fanboy of both [Netlify](/blog/wtf-is-netlify/) and [GatsbyJS](https://www.gatsbyjs.org/). For the first time since I was discovering [Rails](https://rubyonrails.org/) I have felt like a tool (library, framework, etc.) had an answer to every question I was seeking.

Nearly every time I reached a challenging hurdle without a clear solution, I would do a bit of googling and, sure enough, Netlify or Gatsby (depending on the challenge) would have the answer ready and waiting. That’s a seriously uplifting way to work and that’s going to keep me coming back to these two products.

That being said, one area in which I’ve struggled to find easy answers is when [building form handlers using Netlify](https://www.netlify.com/docs/form-handling/). I did a lot of reading, along with a fair amount of trial and error, before I really found a solution that worked well.

And while I came up with [seven points I think you should know before working with Netlify forms](/blog/what-you-need-to-know-about-netlify-forms/), I wanted to take some time to share how these points translate to a Gatsby project. If you have not read the article, I’d suggest at least skimming it — it’ll help add some context as we pass through the following scenarios.

For the rest of this article, we’re going to dive into some specific examples. Since there are many different means of approaching how you work with forms in Gatsby, I’ve provided multiple ways in which you can approach Netlify’s form handling, such that you can choose the best path forward for your project.

Let’s dig in!

## Setup

I’ve skipped boilerplate code — I’m assuming if you’re here you already know how to work with Netlify and Gatsby, and that you have a Git service like [GitHub](https://github.com) acting as the glue between the two.

If not, [here are docs on how to get rolling with Gatsby](https://www.gatsbyjs.org/docs/quick-start), and [here they are for Netlify](https://www.netlify.com/docs/). These examples following haven’t done anything out of the ordinary beyond the basic _Getting Started_ setup. (At the time of writing this, I’m working with Gatsby v2.3.25.)

Once your Gatsby project is up and running locally, let’s start by building a basic form. For this example, along with those following, let’s say we’re going to create a contact form at `/contact` with two fields — `email` and `message`.

The first step is to create the page and add some boilerplate code:

`src/pages/contact.js` {.filename}

```jsx
import React from "react"
import Layout from "../components/layout"

const ContactFormPage = () => (
  <Layout>
    <h1>Contact</h1>
  </Layout>
)

export default ContactFormPage
```

Note that the location and behavior of the `Layout` is based on what you get from Gatsby out of the box. If you’ve changed this behavior, you’ll want to adjust that component accordingly.

## Basic Form

From here we can work on building the form. We can essentially just drop our form markup into the page and be done with it. Knowing the rest of your boilerplate code, here’s what the `ContactFormPage` function looks like with a basic working form:

```jsx
const ContactFormPage = () => (
  <Layout>
    <h1>Contact</h1>

    <form name="Contact Form" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="Contact Form" />
      <div>
        <label>Your Email:</label>
        <input type="email" name="email" />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" />
      </div>
      <button type="submit">Send</button>
    </form>
  </Layout>
)
```

I want to call your attention to four key points within this markup (these shouldn’t be a surprise if you’ve read the _must know_ article referenced above):

1. The form has a `data-netlify="true"` attribute, which tells Netlify to register the form while building your site.
2. The form has a `name` attribute describing it. This is the name Netlify will give the form when you deploy this code.
3. The form’s `name` attribute is repeated in a hidden `form-name` field. **This is absolutely necessary**. If you omit this field or mistype the name, your entries will either throw an error or get lost somewhere in the internet abyss.
4. Every field has a `name` attribute. A field must have a name for that data to be persisted within Netlify.

Another point — which may seem obvious if you’ve worked with Netlify forms in the past — is that Netlify forms do not work in local development. When you first add this code, Netlify doesn’t know about the form and it’s not being submitted to Netlify. Instead, you’ll have to deploy your code (via Netlify) to test the form. I highly recommend doing this via a [Deploy Preview](https://www.netlify.com/tag/deploy-previews/), which will enable you to test before the form goes into production. (As a bonus, as far as I’ve been able to tell, form submissions that originate from preview deploys are not counted toward your total monthly allotment.)

But, that’s it! Commit and push your code to GitHub, kicking off a Netlify build (if everything is configured correctly), and see the form live after the site (or preview) is deployed. Then the form should submit properly and you should see your submissions through the Netlify UI.

## Adding a Success Page

You may notice a bit of an undesirable effect with this out-of-the-box behavior: the success page is served from Netlify. That means:

1. It likely doesn’t match your site’s design.
2. You have to click a link to go back to the page the form was on.

{% post_image src="/blog/190504/form-success-page.png" %}

Fortunately, you can specify the path to which you want users redirected after a successful form submission so you have more control over the message, behavior, and aesthetic.

To do this, all you have to do is add an `action` attribute to your form, like so:

```jsx
<form
  name="Contact Form"
  method="POST"
  data-netlify="true"
  action="/thank-you"
/>
```

Notice here that I’ve added a value of `/thank-you` as the `action` on the form. This means that after a successful form submission, users will be redirected to `/thank-you`. In other words, we’ll need a page to receive those users:

`src/pages/thank-you.js` {.filename}

```jsx
import React from "react"
import Layout from "../components/layout"

const ThankYouPage = () => (
  <Layout>
    <h1>Contact</h1>
    <p>Thank you for your submission!</p>
  </Layout>
)

export default ThankYouPage
```

Notice this is just a basic page, but it gives some feedback to the user within the context of your site (and its design) so they feel more continuity after completing the form.

## reCAPTCHA

One great feature of Netlify’s form handling is that it has a built-in filter to catch spammy submissions and prevent them from counting toward your monthly allotment. It won’t be perfect, but it’s one more step that a form submission has to get through before being considered valid.

Still, you may want to add additional spam measures, such as [reCAPTCHA](https://en.wikipedia.org/wiki/ReCAPTCHA). If you’ve read through Netlify’s docs or through my [must-know Netlify form tips](/blog/what-you-need-to-know-about-netlify-forms/), you’ve probably seen that Netlify also offers reCAPTCHA support out of the box. And you may also already know, if you’ve tried to implement this within a Gatsby site, that Netlify’s reCAPTCHA support doesn’t extend to forms rendered by JavaScript (as Gatsby’s pages are/).

Therefore, if we want a [reCAPTCHA](https://www.google.com/recaptcha) field within our Gatsby site, we must implement it ourselves.

I have found that this is easiest to work with through the [`react-google-recaptcha`](https://github.com/dozoisch/react-google-recaptcha) library. You can install this like so:

    $ npm install react-google-recaptcha

Next, import the package to the top of your page:

`src/pages/contact.js` {.filename}

```jsx
import ReCAPTCHA from "react-google-recaptcha"
```

Following Netlify’s docs, you do still need to add `data-netlify-recaptcha=“true”` as an attribute on your form. And then you can add the `ReCAPTCHA` component with a `sitekey` prop.

The updated **form markup** might look something like this:

```html
<form
  name="JSX Form"
  method="POST"
  data-netlify="true"
  data-netlify-recaptcha="true"
>
  <input type="hidden" name="form-name" value="JSX Form" />
  <label>Your Email:</label>
  <input type="email" name="email" />
  <br />
  <label>Message:</label>
  <textarea name="message" />
  <br />
  <ReCAPTCHA sitekey="YOUR_SITE_KEY" />
  <button type="submit">Send</button>
</form>
```

Notice that I added `YOUR_SITE_KEY` as a placeholder for the reCAPTCHA key. I usually like to use an environment variable in this space. One really nice feature of Gatsby’s is that any environment variable beginning with `GATSBY_` [automatically gets picked up](https://www.gatsbyjs.org/docs/environment-variables/) and is available on the `process.env` object. So if I set the environment variable `GATSBY_RECAPTCHA_KEY` to my key, then the ReCAPTCHA line looks more like this:

```html
<ReCAPTCHA sitekey="{process.env.GATSBY_RECAPTCHA_KEY}" />
```

Also, don’t forget that Netlify needs to verify this server-side for it to be valid. That means, for this to work, **you are going to need to set `SITE_RECAPTCHA_KEY` and `SITE_RECAPTCHA_SECRET` variables _within Netlify_** so that it will validate the reCAPTCHA.

Once you have this all configured correctly it will (or _should_) just work!

## Async Submission

Now, while we’ve had to work through a few _GOTCHA!_ scenarios so far, it’s all relatively straightforward. As long as you follow the docs, everything works (or at least _should_ work) swimmingly.

But there’s one downside to the approaches we’ve taken — when submitting forms via HTTP, your browser actually sends a POST request to the `action` specified in the form, and it gets redirected upon success. The problem, in that case, is that Gatsby has to reload, so you’re going to take a performance hit on the success page.

One way to keep the process acting smooth is to use AJAX or an XHR request to asynchronously submit the form data to the Netlify server, and then show your own custom feedback upon success.

### Major Changes, Summarized

To get started, we’re going to see a few important changes:

1. Bring in two more packages — [`axios`](https://github.com/axios/axios) for handling the request and [`query-string`](https://github.com/sindresorhus/query-string) for encoding our data properly.
2. Convert our page component to a class so that we can work with [React state](https://reactjs.org/docs/state-and-lifecycle) and give feedback to the user.
3. Add an event listener to the form submission event so we can catch it and override it.
4. Every field in the form gets a `ref` attribute matching the name of the field.

The skeleton of that component then looks like this:

`src/pages/contact.js` {.filename}

```jsx
import React from "react"
import axios from "axios"
import * as qs from "query-string"

import Layout from "../components/layout"

class ContactFormPage extends React.Component {
  constructor(props) {
    // Do intro stuff ...
	}

  handleSubmit(event) {
    // Do form submission stuff ...
  }

  render() {
    return (
      <Layout>
        <h1>Contact</h1>

        {this.state.feedbackMsg && <p>{this.state.feedbackMsg}</p>}

        <form ref={this.domRef} name="Contact Form" method="POST" data-netlify="true" onSubmit={event => this.handleSubmit(event)}>
          <input ref="form-name" type="hidden" name="form-name" value="Contact Form" />
          <!-- ... -->
          <input ref="email" type="email" name="email" />
          <!-- ... -->
          <textarea ref="message" name="message" />
          <!-- ... -->
        </form>
      </Layout>
    )
  }
}

export default ContactFormPage
```

Note the addition of the `feedbackMsg` state on the form. That will show a paragraph of text matching what we set the `feedbackMsg` state, and it won’t show if there is nothing set.

### The Constructor

Now let’s step through our two methods we haven’t filled in yet. First is the constructor, which is the method that gets run automatically when the class is instantiated. If overriding the constructor in an extended React component, you must call `super(props)` before doing anything else.

We’re going to perform two tasks in our constructor:

1. Create a blank React DOM reference. This gets attached to our form on render (that’s why you saw the `ref={this.domRef}` attribute on the form). This enables us to access the form through the DOM, which we’ll use to clear the fields upon success.
2. Set a default state, containing `feedbackMsg` as `null`.

This is what that method should look like now:

```jsx
constructor(props) {
  super(props)
  this.domRef = React.createRef()
  this.state = { feedbackMsg: null }
}
```

### Handling the Submission

The `handleSubmit` method is a bit more complicated. Instead of explaining it ahead of time, I’ve put the comments inline:

```jsx
handleSubmit(event) {
  // Do not submit form via HTTP, since we're doing that via XHR request.
  event.preventDefault()
  // Loop through this component's refs (the fields) and add them to the
  // formData object. What we're left with is an object of key-value pairs
  // that represent the form data we want to send to Netlify.
  const formData = {}
  Object.keys(this.refs).map(key => (formData[key] = this.refs[key].value))

  // Set options for axios. The URL we're submitting to
  // (this.props.location.pathname) is the current page.
  const axiosOptions = {
    url: this.props.location.pathname,
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify(formData),
  }

  // Submit to Netlify. Upon success, set the feedback message and clear all
  // the fields within the form. Upon failure, keep the fields as they are,
  // but set the feedback message to show the error state.
  axios(axiosOptions)
    .then(response => {
      this.setState({
        feedbackMsg: "Form submitted successfully!",
      })
      this.domRef.current.reset()
    })
    .catch(err =>
      this.setState({
        feedbackMsg: "Form could not be submitted.",
      })
    )
}
```

You can see, there’s a lot more going on when you want to submit your form asynchronously. But if you do it well enough, your users will have a better experience and your site will be snappier after a user submits a form.

### A Note on reCAPTCHA

Note that I’ve removed reCAPTCHA from this example. You can certainly keep it in, but this solution I’ve outlined in the section above will not work properly as-is.

If you add reCAPTCHA back, you won’t have a reference to it as you are looping through your component’s `ref` objects. Instead, you’ll have to listen for changes to that reCAPTCHA and, upon success, store the value in state, and then include that value to the `g-recaptcha-response` field when submitting the form.

---

As simple and powerful as Netlify forms are, and as awesome as the Gatsby framework is, implementing Netlify form handling within a Gatsby project can be tricky — I spent the better part of a week trying and failing to make all of this work.

And if you make user experience a priority, it gets even trickier when considering feedback and performance.

But, when you put all this together, your users are going to love it, and you will, too — you’ll be able to accept dynamic data from your users directly through Netlify! That’s pretty cool.

---

(If you’ve found issues with the code or have questions, please do not hesitate to [reach out to me](https://twitter.com/seancdavis29).)
