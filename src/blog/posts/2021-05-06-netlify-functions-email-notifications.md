---
title: Use Netlify Functions to Send Email Notifications
description: Learn the basics of sending custom email notifications using Netlify functions and your email service of choice.
image: /blog/210506/green--netlify-notification.png
tags:
  - jamstack
  - javascript
  - netlify
  - node
---

While [Netlify](/blog/wtf-is-netlify) supports email notifications around triggers and features within its system (e.g. [deploy events](https://docs.netlify.com/site-deploys/notifications/), [form submissions](https://docs.netlify.com/forms/notifications/)), you may want to add custom email notification triggered by actions from users on your site.

Notifications sound tricky, though, don't they?

Well, they don't have to be. We can use [Netlify Functions](https://www.netlify.com/products/functions/), along with some email-sending service, to make that process a walk in the park.

To keep this example as simple as possible, we're going to use [Nodemailer](https://nodemailer.com/about/) with [Ethereal](https://ethereal.email/) as our email sending service. That means we will have to configure very little, but the emails will be _caught_, not sent.

Let's dive into a quick example! (You can view a full version of the example code [here](https://github.com/seancdavis/seancdavis-com/tree/50322c36844e2db007a9daa29d6f22895febc90c/examples/netlify-functions-send-email) at any time.)

## Step 1: Setup Project

Before we get started, you'll want a new project. Create a directory for your project. My first steps in a new project are usually these:

    $ npm init -y
    $ echo 'node_modules' >> .gitignore

Then you can install the only dependency we need, Nodemailer:

    $ npm install nodemailer

## Step 2: Add the Netlify Function

Let's add a Node-based Netlify function that will handle sending our email message.

The function will expect a stringified JSON object as the body, containing two key-value pairs:

- `email`: The email address to use to send the message.
- `body`: The message to use as the body of the email.

Place the following code in `netlify/functions/send-email.js`.

{% callout type="note" %}
`netlify/functions` is the default location for functions. If you have overridden this value for you site, be sure to place the file in the appropriate location.

Also note that we're having Nodemailer make use of [Ethereal](https://ethereal.email/), which is a mail-catching service. That means none of the messages are going to actually be delivered. I'll talk a little more about this when we get to [_Next Steps_](#next-steps) at the end of this post.
{% endcallout %}

`netlify/functions/send-email.js` {.filename}

```js
const nodemailer = require("nodemailer")

exports.handler = async function (event, context, callback) {
  // Parse the JSON text received.
  const body = JSON.parse(event.body)

  // Build an HTML string to represent the body of the email to be sent.
  const html = `<div style="margin: 20px auto;">${body.body}</div>`

  // Generate test SMTP service account from ethereal.email. Only needed if you
  // don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"☁️ The Cloud ☁️" <thecloud@example.com>',
      to: body.email,
      subject: "New Form Submission",
      text: body.body,
      html: html
    })
    // Log the result
    console.log(info)
    callback(null, { statusCode: 200, body: JSON.stringify(info) })
  } catch (error) {
    // Catch and log error.
    callback(error)
  }
}
```

This will log the result to the console, regardless of whether it is successful or not (`callback(error)` will print feedback), so you can have an idea of what's going on.

## Step 3: Wire up the Front End

Next, let's build a simple HTML page that gives you the ability to set the `email` and `body` fields. Then we'll add just a little JavaScript to make it all work.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Send Email Notifications with Netlify Functions</title>
  </head>
  <body>
    <form onsubmit="submitForm(event)">
      <div style="margin-bottom: 1rem">
        <label for="email">Email Address</label>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Where should I send the message?"
          required
        />
      </div>

      <div style="margin-bottom: 1rem">
        <label for="body">Message</label>
        <textarea id="body" name="body" cols="30" rows="10" required></textarea>
      </div>

      <input type="submit" value="Send email" />
    </form>

    <script>
      function submitForm(event) {
        // Stop the browser's default behavior.
        event.preventDefault()
        // Retrieve data from the form.
        const formData = new FormData(event.target)
        const request = new XMLHttpRequest()
        // Convert data to JSON object.
        var jsonData = {}
        formData.forEach((value, key) => (jsonData[key] = value))
        // Send the data to the Netlify function.
        request.open("POST", "/.netlify/functions/send-email")
        request.send(JSON.stringify(jsonData))
        // Clear the form.
        alert("Email request submitted!")
        event.target.reset()
      }
    </script>
  </body>
</html>
```

{% callout type="warning" %}
It's not good practice to use an `onsubmit` attribute on a form element to call a global function when submitting a message. This is just a very simple example for demonstration purposes.
{% endcallout %}

### Not Getting Emails?

If you're not getting the email messages in the inbox you specified, it's because we're not _actually_ delivering them!

WTF?

Yes. Ethereal, which we're using as our email server, is a mail-catching service, which means that it catches the mail requests and lets you read them, but it doesn't actually send them.

If you want to see the messages being caught, then instead of creating a test account in the function, go to [Ethereal](https://ethereal.email/) and click _Create Ethereal Account_. Then plug the username and password in. You can then visit the inbox for that account and see everything that was caught.

## Next Steps

Being that this is just the beginning of something that you'd actually put into practice, here are some ideas on where you could take it from here to get it ready for production:

- Instead of submitting through an HTML page and relying on user input to control the recipient and the message, you could submit through an API request platform, like [Postman](https://www.postman.com/).
- Add a legit emailing service in place of Nodemailer and Ethereal, such as [Mailgun](https://www.mailgun.com/) or [SendGrid](https://sendgrid.com/).
- Adjust which values you accept and which you hard-code, like subject or from email.
- Add some validation or authentication so not just anyone can trigger the action.
- Be mindful of limitations or quotas on your accounts. Netlify Functions enables you to have a generous number of requests per day. Email services are generally not as generous, and you could run up a bill quickly.

No matter where you go with it, I'd love to learn more about your approach or any questions you have. [Let's chat](https://twitter.com/seancdavis29).

## References

- [Demo code](https://github.com/seancdavis/seancdavis-com/tree/50322c36844e2db007a9daa29d6f22895febc90c/examples/netlify-functions-send-email)
