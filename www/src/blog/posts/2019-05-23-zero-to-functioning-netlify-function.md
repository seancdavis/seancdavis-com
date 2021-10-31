---
title: From Zero to Functioning Netlify Function
description: A services-oriented architecture is a key component of the
  Jamstack, as it brings dynamic functionality to static sites. Here's how to
  get your feet wet by writing your first Netlify function.
tags:
  - jamstack
  - netlify
image: /blog/default/default-yellow-02.png
---

[Microservices](https://en.wikipedia.org/wiki/Microservices) are a key part of what makes [Jamstack](https://jamstack.org/) sites different from static sites. In a [service-oriented architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture), microservices provide a means for your static site to interact with back-end systems. And typically they follow the [single-responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), meaning each _service_ is responsible for doing one thing.

Often these services come in the form of [serverless functions](https://en.wikipedia.org/wiki/Serverless_computing). Before we had amazing tools like [Netlify](/blog/wtf-is-netlify/) at our disposal, we had to manage these services individually, or perhaps use a build framework like [Serverless](https://serverless.com/) to help us.

But now, we _do_ have Netlify! Netlify comes packed with an array of features to enable static sites to appear as though they are dynamic applications. One such feature is [Netlify Functions](https://www.netlify.com/docs/functions/). These are functions we can add to our sites that are deployed with Netlify. (Netlify uses [AWS Lambda](https://aws.amazon.com/lambda/) to serve these functions.)

They are extremely powerful, but it can be a little intimidating to get started — to figure out how to write functions in a way that serves you and your Jamstack site.

So let’s spend the rest of our time together providing the code and techniques for setting you up for success with Netlify functions. (Note: We’re going to use JavaScript as our language of choice for these function.)

## [0] The Scenario

Instead of worrying about what the function is actually doing, we’re just going to focus on getting everything up and running. Therefore, the function is only going to return the string “Hello World” as its response.

However, we will spend a bit of time talking about how you can debug the function, arming you with the ability to take the simple example and apply it to something meaningful for your project.

## [1] Setup Functions

Netlify does a good job laying out [how to get started with JS functions](https://www.netlify.com/docs/functions/#tools-for-building-javascript-functions). I’ll reiterate and add some specifics for our example.

### Add `netlify-lambda` Package

First, let’s install `netlify-lambda`:

    $ npm install netlify-lambda

Note that this will only work if you have a `package.json` file. If you don’t already have one in your project, you can generate it by running `npm init` and answering the series of questions prompted.

### netlify.toml

Next, if you don’t already have a `netlify.toml` file at the root of your project, create it. Then add these two lines to the file:

`netlify.toml` {.filename}

```toml
[build]
  functions = "./functions"
```

Note that if you already had the file and if it had the `[build]` line, you don’t need to include that a second time, but can just add the last line from the example.

Also note that what this is saying is that your functions will be built to the `functions` directory. Netlify deploys these functions separately to AWS Lambda. So, if you’re using a [static site generator](https://www.staticgen.com/) tool like [Jekyll](https://jekyllrb.com/), where there is no source directory, you will want to make sure that the `functions` directory does not get deployed to your project.

### Add the Function

Next, let’s add a basic function. I like keeping the functions all together, so I typically add them to the `functions/src` directory.

`functions/src/hello.js` {.filename}

```js
exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  })
}
```

### Add a Script to Serve Function

The `netlify-lambda` library provides us a means to run the function on a dev server. This is a nice way to test locally before deploying to Netlify.

I like to abstract the command a bit so I don’t have to remember as much. To do that, add a `scripts` section to your `package.json` file with the appropriate command, like so:

`package.json` {.filename}

```json
{
  // ...
  "scripts": {
    "functions:dev": "netlify-lambda serve functions/src"
  }
}
```

## [2] Running and Testing in Dev

Now that you’re all set up, you can run the dev server:

    $ npm run functions:dev

You should see the dev server running on the command line.

You can have more than one function, so each function is available at its own path through the server. This means our `hello.js` function is available locally at `http://localhost:9000/hello`. (The URL for production when deployed to Netlify will be different.)

You’ll notice if you go to that URL in the browser you will see the “Hello World” text. That’s because that’s all the function is doing at this point.

But, realistically, you’re not going to use a browser to trigger this function. You’re more likely to send a POST request to that URL using JavaScript.

Therefore, I suggest that you test locally using a REST client. My favorite (for Mac) is [Insomnia](https://insomnia.rest/), but [Postman](https://www.getpostman.com/) tends to be a bit more popular.

Within your REST client, you can send a POST request to `http://localhost:9000/hello` and you should receive “Hello World” as the response.

{% post_image src="/blog/190522/insomnia-request-01.png" %}

That’s it for now — we’re ready to deploy!

## [3] Deploying to Netlify

Deploying to Netlify is the easy part. Assuming you’ve already created your Netlify project, just push to your GitHub (or other remote provider’s) repository, and watch the build kick off.

After you deploy, you should see your function get picked up by Netlify, even though you haven’t run it yet. You can check this through the Netlify UI.

{% post_image src="/blog/190522/netlify-ui-functions.png" %}

Your function is now available at `/.netlify/functions/hello` within your site. That means you can POST directly to that URL.

For me, using the example from the image above, that means I’d change my URL in Insomnia (or Postman) to `http://scd-netlify-functions-test.netlify.com/.netlify/functions/hello`, but your URL will be different.

## [4] Debugging Practical Use Cases {id="debugging-practical-use-cases"}

That’s great, right! It didn’t take that long to get up and running with this function. And now you can do essentially anything you want because you have an endpoint in your site that will run a node process whenever you hit it.

(Note that this can become a paid service eventually, but you get 125k runs per month for free!)

### Log All the Things

My first recommendation when trying to figure out what to do with the function is to run `console.log` locally whenever you want to inspect an object or value. The log will get printed in the terminal window that is running your netlify-lambda server. (Your logs will also be printed to the Netlify logs if you keep them in when deploying.)

### Real-life Scenarios

How do you figure out how to test or run your function locally with a practical output?

For example, let’s say you have a “like” feature on your site, and every time a user clicks the “like” button, you send a request to your function, which in turn increments the count and stores the data in a remote database. In this case, how would you make sure it’s working before deploying to production?

### ngrok to the Rescue!

In this case, [ngrok](https://ngrok.com/) is your best friend, and its free tier will most likely work for you. You can install globally on your machine via `npm`:

    $ npm i -g ngrok

And then when you’re running your netlify-lambda server locally (on port 9000), you can surface the port publicly:

    $ ngrok http 9000

(Note that you may have to sign up for an account and authorize the service first, but it won’t charge you.)

Running ngrok will tunnel your localhost’s port 9000 to a public web address. It will provide you this address directly in the terminal. You can take this URL (which includes an SSL version), and provide it to your site, or to whatever service is going to call the function.

---

Hopefully you’re up and running with Netlify functions now and are feeling like you can make your static site truly dynamic and powerful. Once you have this base in place, you can build out your own microservices architecture and run a dynamic application on the Jamstack!

That’s pretty cool.
