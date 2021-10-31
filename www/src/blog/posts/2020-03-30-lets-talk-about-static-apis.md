---
title: WTF is a Static API
description: Most APIs today are dynamic. But the Jamstack has provided a path
  for creating static APIs, which can be incredibly powerful and beneficial in
  the right scenario.
tags:
  - api
  - jamstack
  - wtf
image: /blog/default/default-green-02.png
---

[_API_](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/) is a term we constantly throwing around in the software industry. APIs have become so fundamental to writing code that it's easier to be upset when a product doesn't offer an API, compared to being excited when it does.

In case you didn't know (or wanted a refresher), an API ([_application programming interface_](https://en.wikipedia.org/wiki/Application_programming_interface)) provides a means to extend the functionality of an application for some other purpose, while only exposing what's necessary to developers. As I hinted, most popular applications have an API to some extent. Here are some examples in which an API could be used:

- [Dropbox](https://www.dropbox.com/): Show a list of files within a shared folder and a link to download those files.
- [Stripe](https://stripe.com/): Provide a custom payment processing workflow.
- [Mailchimp](https://mailchimp.com/): Add a subscriber to a mailing list.
- [Slack](https://slack.com/): Send a message to a channel based on some event.

Most APIs today are _dynamic_. They run on a web server and are always changing. That makes them super powerful because they can be updated in real-time. But that also provides complications — they must employ proper caching mechanisms and (expensive) scaling methods as they acquire more concurrent users.

In addition, many APIs also require authentication so the app's developers know who is using their API and can allow, throttle, or charge those users as desired.

But an API doesn't _have_ to be dynamic. An API _could_ be static.

## What is a Static API?

A dynamic API is an application, running on a web server, that performs actions for and delivers data (typically as JSON) to the requesting user.

A _static API_ is simply a collection of flat JSON files that live on a content delivery network ([CDN](https://en.wikipedia.org/wiki/Content_delivery_network)). It doesn't perform any action other than delivering content (static JSON files) to the requesting user.

But that doesn't mean a static API is _simple_. And every file doesn't have to be manually generated or updated. A static API can still use a database and it can still pull data from external services. In other words, it can be _dynamically generated_, but it is _statically delivered_.

## Advantages of a Static API

If a dynamic API seems more powerful, that's because it is. But that power brings many challenges with it, and that power may not be something your API needs.

The advantages of using a static API largely follow the benefits of using the [Jamstack](https://jamstack.org/). That makes sense, as a static API is basically a Jamstack website. Those advantages are:

- **Performance:** There's no web server and no _real-time_ database retrieval. The content is just a plain file sitting on a CDN. That means the time it takes to load that content can feel near instantaneous.
- **Uptime:** Working with external systems is abstracted into a build process. If a build fails, the site (API) is still available. So if a database goes down, the API may be stuck with stale data for a bit, but it will still be available to consuming clients.
- **Scale:** Scale is a walk in the park. CDNs are built to scale, as they are distributed across the globe, have strong caching mechanisms in place, and are simply delivering static files.
- **Cost:** The cost of CDNs are extremely low when compared to what it would cost to put several servers together to ensure speedy delivery to a large number of users.
- **Security:** With a static API, the database isn't part of the picture to the end user. There's nothing to exploit when requests can only yield JSON files that have already been written.

## Disadvantages of a Static API

As great as static APIs are, there are a few disadvantages when compared to their dynamic counterparts:

- **Real-time delay:** Dynamic APIs can be updated in real-time. Static APIs are typically updated through a _build and deploy process_, which means there will be some delay before updates are available to consuming clients.
- **Lack of action:** A dynamic API can receive requests and perform actions based on that request. A static API can't do that out of the box — it's all about delivering files. (_Technically_, a static API _could_ be built to perform actions via [serverless functions](https://en.wikipedia.org/wiki/Serverless_computing).)
- **No authentication:** Providing a set of static files on a CDN means you're likely going to omit authentication. It's _possible_ to include auth, but it would complicate the system, losing some of the benefits of it being static in the first place.

## When to Use the Static API Approach

It sounds great in theory, but the static API approach is not always the practical (or wise) one to take. Here are a few examples in which a static API may make sense:

- The API only needs to deliver content, not perform actions.
- Authentication is not necessary.
- Content is not updated frequently, or content updates can be delayed and don't need to be delivered immediately.
- The cost of scaling an API is problematic.

---

So there you have it — a _static API_.

While a dynamic API brings a lot of power, that comes with complexity, which often leads to a larger number of challenges, including cost, performance, security, and scale. In the right scenario, a static API can be just as powerful, while helping overcome those challenges.
