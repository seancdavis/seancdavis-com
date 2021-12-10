---
title: What You Need to Know When Using Netlify Forms
description: Netlify forms are an incredibly powerful feature. They enable you
  to accept dynamically-driven user data on your static site. But you must
  understand a few key concepts about Netlify forms if you're going to have
  success working with them.
tags:
  - jamstack
  - netlify
image: /posts/default/default-yellow-02.png
---

Form Handling is an extremely powerful component within [Netlify's](/posts/wtf-is-netlify/) product, as it provides a way to accept dynamic data from users on a static site.

It's like [Formspree](https://formspree.io/) or [FormKeep](https://formkeep.com/), but I prefer Netlify's forms feature because it _just works_. There's no signing up for a third-party service. You just add a little markup to your site and — _Voila!_ — you have a form that sends its submissions to Netlify, which then stores the form data on your behalf. An added benefit is that Netlify currently offers 100 submissions per month, sourced from an unlimited number of forms, free of charge. That's a better free tier than either Formspree or FormKeep.

If you are building a truly static site — where all the [HTML](/posts/wtf-is-html/) markup is contained within HTML files, rather than being generated dynamically by JavaScript (JS/) — it really is _that easy_ to work with Netlify forms.

I recently went through the process of adding Netlify's form handling to a [Gatsby](https://www.gatsbyjs.org/) site, why was not _that easy_. Gatsby is a [static site generator](https://www.staticgen.com/) built on top of React. Thus, it's essentially a React app that has pre-cached the data it renders. In other words, Gatsby renders its HTML using JavaScript and, because it's not just a bunch of static HTML files, working with Netlify forms was a bit more complicated.

Integrating Netlify forms within a site powered mostly by JS (or [JSX](https://reactjs.org/docs/introducing-jsx)) required digging deeply into [the documentation](https://www.netlify.com/docs/form-handling/) and talking with Netlify's support team until I could get the forms working properly. It was a challenging process to work through, and that's why we're here right now.

Now that I have worked through several scenarios to get Netlify forms up and running on my latest project, I want to share with you what I've found to be the core tenets of understanding how Netlify forms really work. I hope that you'll be able to use this information to more easily add Netlify's form handlers to your site, regardless of whether it's fully static or rendered on the fly by JavaScript.

Alright, that's enough of the boring intro. Let's dig in ...

## 1. Forms are processed when the code is deployed.

If you've successfully deployed a form, you'll notice that the form appears in a list of forms for your site within the Netlify UI (`https://app.netlify.com/sites/[your_site]/forms`). This is because Netlify processes your forms after building and before deploying your code.

Netlify does this by looking for `data-netlify` and `name` attributes on forms generated within your built HTML (or JS) files. In other words, you register a new form by simply including the correct markup in your code.

This seems super obvious, but it provides the foundational knowledge necessary to help you understand and debug issues you run into along the way.

## 2. A form's `method` and `action` are important.

Consider a static site in which every page is a flat HTML file (thanks to frameworks like Gatsby, that's not how all static sites work). If those files are uploaded to a web-accessible server or [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), then sending a [GET request](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) to any HTML page on your site would result in the HTML file's contents in response.

That makes sense, right? That's how the web works.

Right. Okay. But what happens when you send a POST request?

Well, that would depend on the server (or CDN) on which your site is hosted. But, for a static site, I'd either expect to either see an error or to simply get the HTML page in response (i.e. to mimic a GET request's response).

But what Netlify does is listen for POST requests to your domain, and then it processes those requests as form submissions. This leads to two important notes:

1. A form _must_ send a POST request. That means either using a `method="POST"` attribute on the form and submitting directly, or by ensuring you are sending a POST request via [AJAX](<https:en.wikipedia.org_wiki_Ajax_(programming)>)/[XHR](https://en.wikipedia.org/wiki/XMLHttpRequest).
2. The `action` attribute on the form is the path to which you are going to submit your form. This can be any path. The attribute can also be omitted (which means it will be submitted to the current URL). The value of the `action` attribute simply **determines where the user will end up after the form is submitted**. This is only relevant if you are submitting the form via HTTP (not AJAX/XHR).

## 3. There is a spam filter!

Netlify uses [Akismet](https://akismet.com/) to filter entries to the form. This is beneficial in that it provides additional filtering beyond what a [ReCAPTCHA](https://en.wikipedia.org/wiki/ReCAPTCHA) or [honeypot](<https://en.wikipedia.org/wiki/Honeypot_(computing)>) field can provide. It also won't count spam entries toward your total submissions for the month.

The downside is that **you need to use real data when testing forms**. It's so easy to want to put in bogus data. But if you submit too many forms too fast, or if you use repeated or obviously fake content, you may not see those entries appear on the back-end. However, on the front-end of the site it will appear as though the submission went through. And unfortunately, there is no visibility into what gets picked up by the spam filter without talking to Netlify's support team. This means entries that you submitted may appear to be lost in the ether forever.

## 4. JS-rendered forms require an extra field.

Netlify adds a hidden field to each static HTML form after the build is completed (and before it is deployed). This field is named `form-name` and contains the value of the `name` attribute on the form. Netlify uses the value of the `form-name` field to know in which form to place the entry.

Netlify doesn't handle this when the form is rendered via JS because that happens dynamically and Netlify can't insert itself in that process.

So, if you are sending a JS(X) form submission via HTTP, you'd have to include a hidden field like this:

```html
<input name="form-name" value="Netlify Rocks" type="hidden" />
```

Or, if you are submitting via AJAX/XHR, you'd have to add that key-value pair to the data you are posting.

## 5. ReCAPTCHA is tricky for JS-rendered forms.

Netlify [offers a ReCAPTCHA out of the box](https://www.netlify.com/docs/form-handling/#explicit-recaptcha-2), which is super awesome. Within a static HTML page, all you have to do is add the `data-netlify-recaptcha="true"` attribute to the form **and** to a `<div>` inside the form in which you want the ReCAPTCHA to appear.

However, if using a JS-rendered form, because Netlify can't inject itself during the rendering process, the default ReCAPTCHA is not going to work. Fortunately, you can provide your own, [but it takes some extra setup](https://www.netlify.com/docs/form-handling#custom-recaptcha-2-with-your-own-settings). And, if submitting via AJAX/XHR, it requires that you send the `g-recaptcha-response` field's value along with your form data.

## 6. Submissions sent via JS must be encoded.

When submitting forms asynchronously via JavaScript, you are in control of the data you send. And that data must be encoded as a query string so that it mimics an HTTP request (i.e. when the form is submitted directly).

The [query-string](https://github.com/sindresorhus/query-string) JS library has a handy `stringify` method that handles this transformation for you. Suppose you imported that library as a variable, `qs`. Then your data would look something like this:

```js
let formData = { "form-name": "My Form", first_name: "Sean" };
const dataToSend = qs.stringify(formData);
```

I should also mention that you should specify the content type in the headers you send. In other words, the `Content-Type` header should have a value of `application/x-www-form-urlencoded`.

## 7. Deploy previews are a great place to test.

I'll make my last point one of my favorite features of Netlify — [Deploy Previews](https://www.netlify.com/docs/continuous-deployment/). Netlify builds your site using the branch from which you opened a [pull request on GitHub](https://help.github.com/en/articles/about-pull-requests) against your `master` branch. This is an extremely powerful feature because it allows you (and your boss, QA team, client, etc.) to see your work _before_ it goes into production and _without_ pulling the code down and running locally. (Note: You can customize how branches are deployed if you want them to work differently than the default settings.)

And, guess what? Forms work within deploy previews, so you can also test your submissions before going into production! Just remember #3 — there is a spam filter, so test submissions should contain real(_ish_) data and be sent at a reasonable rate.

Lastly, although not mentioned in the documentation, from what I can tell, the number of submissions that go against your monthly total do not seem to include submissions sent from deploy previews. However, they do show up inline with production submissions.

---

So there you have it. Netlify's forms are an extremely powerful feature. They provide a way to accept dynamic data from users on your static sites, which could otherwise be a tricky challenge to overcome. There's a lot of (really good) documentation, but some of the crucial elements can get lost in the weeds.

I hope these items I've called out have either helped you debug or helped get you started building Netlify forms.

Now go capture some user data!
