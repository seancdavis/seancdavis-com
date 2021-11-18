---
title: A Netlify Function That Sends Conditional Email Notifications
description: Conditional email notifications may be immortal, but we can still
  figure out how to implement them on emerging Jamstack websites.
tags:
  - jamstack
  - netlify
  - sendgrid
image: /blog/default/default-yellow-02.png
---

It seems that the whole _conditional contact form email notification_ is immortal.

It goes like this: Your site has a contact form, which collects basic information about the user filling out the form. One such field is the subject or topic of that user's message. The value of the subject field determines who will receive an email notification, which typically includes data from the submitted form.

This is a common problem, especially with corporate clients, and its solution is not super straightforward within emerging [Jamstack](https://jamstack.org/) websites.

One way we can solve solve this problem is by using [Netlify Functions](https://www.netlify.com/docs/functions/) to receive form data, adding a little logic to determine where to send the notification, and then actually sending the notification.

So let's dive right in, shall we?

## [0] The Scenario

Let's consider this problem and its solution to be service-agnostic. That means that this solution will get you _started_ no matter where the form data comes from. However, because we'll be writing our [serverless functions](https://en.wikipedia.org/wiki/Serverless_computing) with [Netlify](/blog/wtf-is-netlify/), I'll regularly mention how to apply the solutions to a project using [Netlify Forms](https://www.netlify.com/docs/form-handling/).

If you aren't familiar with Netlify Functions, know that they are essentially one function that runs a single time when triggered. That trigger is an endpoint URL that accepts a POST request. That request could come directly from your site, or perhaps you have a [headless CMS](https://headlesscms.org/) that uses a webhook to send a request whenever you create new content. It could even be an outgoing webhook from Netlify that gets triggered when a new Netlify Form is submitted.

There are countless scenarios in which you may want to trigger a serverless function. The key is figuring out how to parse the data so you know which email address(es) to use. We'll touch on the nuance of that as we get into the weeds.

And one last thing before we get started. The examples here are written in JavaScript, meaning the function will be run using Node.js. While [AWS Lambda](https://aws.amazon.com/lambda/) — the service Netlify Functions use — supports multiple programming languages, Netlify Functions work best when using JavaScript, so that's where we're going to focus our attention.

Okay, _now_ let's dive in!

## [1] Setup Functions on Netlify Project

The first step is to get functions up and running on your Netlify project. I've written [a detailed article on just that process](/blog/zero-to-functioning-netlify-function/), which I'd recommend you follow if you have not worked with Netlify Functions in the past. (If you have, it may help as a quick refresher.)

Follow that setup guide to create a function in your `functions/src` directory (unless you already have functions working elsewhere). I'll call my function `email_notification.js`, but you are welcome to use whatever name you'd like.

## [2] Configure Trigger Hook(s)

The next piece is to configure the trigger. This is the part where you identify how your function is going to be triggered.

But, before doing that, and while developing locally, you'll want to expose your local port (`9000` if you're using `netlify-lambda`). In this case, remember, [`ngrok` is your best friend](/blog/zero-to-functioning-netlify-function#debugging-practical-use-cases). ngrok will provide you a temporary URL that you can plug into your service while developing.

### Netlify Forms

If you're using Netlify forms, go to _Settings_, then _Forms_, then choose to create an outgoing webhook notification. This is where you can add the ngrok URL.

If you're using a different service, that's totally fine. Just point that URL to the one provided by ngrok.

The purpose of all of this is that we have the hook working right so we can examine the payload and extract the correct data.

## [3] Setup Email Service

Next, let's get an email service setup. We aren't sending emails directly from the server on which the (serverless) function resides. Instead, we'll use a third-party service.

My service of choice is [SendGrid](https://sendgrid.com/) because it's easy to work with and they offer a free tier. The code within this example will use SendGrid, so if you want to follow along, sign up for an account.

Then [create an API key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key) so we can send emails.

## [4] Parse the Payload

Recall from [the setup guide](/blog/zero-to-functioning-netlify-function/) that the simplest example looks like this:

`functions/src/email_notification.js` {.filename}

```js
exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  })
}
```

That's enough to get us up and running, but the next step is to use the payload to find the data necessary to send the email.

The data comes packed in `event.body` as a string. So, the way in which we get through the data is to first convert it to an object, like so:

```js
const body = JSON.parse(event.body)
```

And this is where we'll all start to drift apart, as the structure of the data sent to the function may differ. For example, if I built a Netlify form (and corresponding outgoing webhook) with a field `type_of_inquiry` that had the value I wanted to use to figure out which email to send, then my code might look like this:

```js
const body = JSON.parse(event.body)
const type = body.data.type_of_inquiry.trim()
```

But yours may vary. This is the point at which you figure out your conditional value and then come back here ...

## [5] Set the Email Address(es)

Next is to figure out which email address(es) should receive the notification. There are several ways to go about this. You could:

1. Use an [environment variable](/blog/favorite-tool-managing-project-specific-environment-variables/) to house your addresses.
2. Hard-code them into the function.
3. Store them in some place accessible via API.

We're only going to cover #2 here. Acquiring them externally or via environment variable will be up to you. (But I'll briefly touch on env vars in the next section).

Next, we'll use a JavaScript object to match the submission type and find the email address(es). Something like this:

```js
const body = JSON.parse(event.body)
const type = body.data.type_of_inquiry.trim()

const emails = {
  Marketing: "marketing@helloworld.com",
  Sales: "sales@helloworld.com"
}
```

Now I could get to the correct email with `emails[type]`. No big deal, right?

## [6] Send the Email

Sending email using [SendGrid's node library](https://github.com/sendgrid/sendgrid-nodejs) is a simple and pleasant experience if everything is setup properly. In its simplest form, it looks something like this:

```js
const sgMail = require("@sendgrid/mail")

sgMail.setApiKey("YOUR_API_KEY")

sgMail.send({
  to: "someone@helloworld.com",
  from: "noreply@helloworld.com",
  subject: "Really Important Email!",
  text: "Hello world!",
  html: "<p>Hello world!</p>"
})
```

You'll notice there's not much to this. We import the library, set the API key, and then send the message. When we put it into practice, it'll be a little more complicated, but not much.

But, before we move on, let's look at the API key for a moment.

### API Key

You'll want to use an environment variable to store the API key so that you don't leave it hard-coded in your code repository (which presents a security risk).

Netlify environment variables are available at runtime and can be accessed through the `process.env` object. You can read about Netlify environment variables [here](https://www.netlify.com/docs/continuous-deployment/#environment-variables).

Note that you can also set them locally and the will be available on the netlify-lambda server.

## [7] Put It All Together

When it all comes together, it looks something like this. Note that this follows the examples I've set forth throughout this article. Your solution may end up looking quite different, but I've commented throughout this function so you can follow and adjust as necessary.

```js
const sgMail = require("@sendgrid/mail")

exports.handler = function (event, context, callback) {
  // Parse the body sent to the function.
  const body = JSON.parse(event.body)
  // Find the conditional value.
  const type = body.data.type_of_inquiry.trim()

  // The list of potential email addresses to use.
  const emails = {
    Marketing: "marketing@helloworld.com",
    Sales: "sales@helloworld.com"
  }

  // This is the data coming from the form. This is specific to Netlify forms.
  const dataArray = Object.entries(body.human_fields)
  // Use that data to build a series of <tr> and <td> (table rows and columns)
  // for each field in the form.
  //
  // Note: I'm doing this so the email recipient can see the contents of the
  // form and respond directly via email rather than having to go to the source
  // to find the form contents.
  const tableData = dataArray
    .map(x => `<tr><td>${x[0]}</td><td>${x[1]}</td></td>`)
    .join("")
  // Wrap the field data in a table so it will render properly in email clients.
  const html = `<table><tbody>${tableData}</tbody></table>`
  // Build a text version of the contents, as well.
  const text = dataArray.map(x => `${x[0]}: ${x[1]};`).join("")

  // The message object contains the information to pass to SendGrid to send the
  // appropriate email message.
  const msg = {
    to: emails[type],
    from: "noreply@helloworld.com",
    subject: "New Contact Form Submission",
    text: text,
    html: html
  }

  // Set the SendGrid API key.
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  // Send the message.
  sgMail
    .send(msg)
    .then(() => {
      // If the message was successfully sent, we log the object to the console.
      // This enables us to see what was sent directly in the Netlify logs.
      console.log(msg)
      // The callback in this form tells the service initiating this function
      // that it was successful.
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(msg)
      })
    })
    // If the message was not successfully sent, then we catch the error and
    // render it to the logs. This also tells the service that intitiated this
    // function that it was not successful.
    .catch(error => callback(error))
}
```

That's all, folks! I hope you can pull all the necessary pieces together and get up and running sending emails via Netlify like a crazy person!
