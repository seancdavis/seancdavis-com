# Send Custom Email Notifications Using Netlify Functions

This is an example project that shows you how you can use [Netlify Functions](https://www.netlify.com/products/functions/) to send custom email notifications. It was built to support [this tutorial](http://www.seancdavis.com/blog/netlify-functions-email-notifications/).

To keep things simple, this example uses [Nodemailer](https://nodemailer.com/) with [Ethereal](https://ethereal.email/), which means the emails are caught and not actually sent. You are welcome to drop in your favorite email service, like [SendGrid](https://sendgrid.com/) or [Mailgun](https://www.mailgun.com/) as a replacement.

## Using this Project

Since this is part of the larger monorepo and you probably don't want to clone the whole thing, my suggestion to you is to look at the function (`netlify/functions/send-email.js`) and use that as a starting point in your own project.

You can also reference `index.html` for a basic example on submitting a form to the function to be processed.

This is technically ready to run out of the box if you want to copy it wholesale. You can deploy to Netlify or [run locally](https://www.netlify.com/products/dev/). But make note of the caveat explained below.

### ⚠️ Caveats!

If you do want to start by deploying this project, this directory is _technically_ ready to go as a Netlify project. It even has a `netlify.toml` with some basics to get started. However, it is using an Ethereal test account. That means the inbox is generated on the fly and you won't actually be able to see the email messages. You're welcome to swap these values out for something more stable.

## Issues

If you find issues or have questions, you're welcome to [submit a GitHub issue](https://github.com/seancdavis/seancdavis-com/issues/new). I tend to address post issues in batches every so often.

For a quicker response time, [try Twitter](https://twitter.com/seancdavis29).
