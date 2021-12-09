---
title: API-driven or Git-based? Figuring out the right CMS for you.
description: It's hard to choose the right headless CMS when there are so many options. There's one decision you can make before comparing CMS products.
tags:
  - repost-ample
  - cms
  - jamstack
image: /blog/201102/201102--api-vs-git-cms.png
canonical_url: https://www.ample.co/blog/api-driven-or-git-based-figuring-out-the-right-cms-for-you
---

There are a lot of [headless content management systems](https://www.ample.co/blog/comparing-headless-content-management-systems) out there today. A lot. Looking at it now, there are 81 different products listed on the official [jamstack.org headless CMS page](https://jamstack.org/headless-cms/).

That makes it challenging to choose the right CMS for your project. Especially when there are so many factors to consider, like price, front-end integrations, publishing workflows, etc. And that's before you even begin to get a sense for how the product _feels_, which is an intangible quality that a spreadsheet comparison simply can't provide.

But, before you get to that step of weighing a conglomeration of factors important to you and your project, there's one decision you can make. A decision that can come before you need to know the details of individual products. That decision is which _type_ of headless CMS you're going to use.

## Two types of content management systems

There are two types of headless CMS products: _API-Driven_ and _Git-Based_.

The difference between the two is all about (_You guessed it!_) the content. How the content is stored, and how it is consumed.

API-driven CMS products store content in a database. This is more like the traditional (i.e. _monolithic_) CMS approach, used by products like WordPress, which takes the data you type into the page or post form, validates it, then stores it in its database.

Monolithic types of CMS applications like WordPress then pull that same content from that same database and present it to the user on the front-end. An API-driven CMS, on the other hand, has its data consumed via an—_You guessed it again!_—API.

With git-based content management systems, the content is stored in files, committed directly to the project's git repository. Most of these services communicate directly with the remote repository host—GitHub, GitLab, Bitbucket, etc.—via their APIs. In other words, these products are often actually making commits to your codebase on your behalf.

## _Okay. Which one should I choose?_

The question you really care about, right? Which one is better?

Well, there are two types of CMS products for a reason. Neither is a perfect solution for every front-end project. In fact, at Ample, we have two go-to CMS recommendations we make on the majority of our projects — one API-driven and the other git-based.

What we ask ourselves at the beginning of each project is _Which type of CMS will best serve this project_?

To help unpack that question, let's look at the top few benefits for each...

### Benefits of API-Driven CMS

API-driven CMS products tend to have the following qualities:

- **Proprietary.** That's good and bad. It means the CMS holds your data. And it usually means it's more expensive than their git-based counterparts. But it also means someone else is managing performance, security, scale, uptime, and many other factors that you don't have to manage. You just have to pay for it.
- **Scalability.** The APIs offered by these products tend to be optimized for performance, especially at scale. An API-driven CMS is very likely going to out-perform its git-based counterparts in terms of build times at scale.
- **Asset Management, Delivery, and Optimization.** Most API-driven products will have an ability to upload assets. Many also have asset-specific APIs, with features like on-demand image manipulation. Git-based products either have their assets embedded directly in the project or uploaded to some storage solution like [AWS S3](https://aws.amazon.com/s3/). But, to be optimized for front-end performance, they'll require custom tooling or another (paid) third-party service, like [Cloudinary](https://cloudinary.com/) or [Imgix](https://www.imgix.com/).
- **Front-end Integration.** Some of the more popular options in this category have worked to provide plug-and-play tooling for various front-end frameworks. This can make integration quick, seamless, and yet still maintain flexibility.
- **Automated Workflows.** You can have workflows with git-based CMS products, but you'll likely have to build them yourself, whereas many API-driven CMS solutions have publishing features and workflows built-in.
- **Built for Omnichanneling.** Aside from scale, perhaps the biggest downside to having all your data alongside the code (i.e. a git-based CMS) is that it means the data often only serves a single property (i.e. channel). API-driven CMS products can be consumed by any front-end application, as they are completely decoupled and focused only on the management of the content.

### Benefits of Git-Based CMS

Git-based CMS products tend to have the following qualities:

- **Low cost.** Most git-based products are open source and come at no cost to implement, as they run as single page applications that can be hosted right alongside your static website. That also means you'll want to make sure the product is actively being developed and supported, so you won't run into an issue that'll keep you from being able to administer content. Those git-based products that are proprietary, like [Forestry](https://www.forestry.io/), charge _significantly_ less than their API-driven competitors. That's largely because they require much less infrastructure to run smoothly.
- **Plug-and-Play.** Some static site generators (SSG), like [Eleventy](https://www.11ty.dev/) and [Hugo](https://gohugo.io/), are built to consume local files, run them through a templating engine, and then output HTML. That means you can stand up a git-based CMS and not need any extra tooling to make it work on the front-end. But, other SSGs may require custom code to use local files as the data source.
- **Flexible Content Modeling.** While API-driven products often have custom content modeling, the degree of flexibility within those models varies from product-to-product. While that's _somewhat_ true with the git-based approach, they tend to be quite a bit more flexible, because they're just writing data to file.
- **No Data Caps and More Predictable Cost.** A git-based CMS doesn't care how much data you have, and it also doesn't care how much data you _consume_. There are no bandwidth or data caps. The bottleneck is more likely to be in the build performance, which tends to make cost much more predictable.
- **Data Retention.** Your data is in local files, committed to your git repository. That means that as long as you have access to the code, you have a full version history available for any piece of content. It also means that every build you run on the front-end contains _all of the data_ for your site. As a bonus, most git-based CMS products are configured by reading files within your repository. That means everything—_everything_—is right alongside your code.
- **Ease of Swapping in and Out.** That also means that it's often trivial to move from one git-based CMS to another. Because ultimately, your data is right there. You may have to change a bit of the structure, and create a new configuration file, but that's it.

## Which one is right for you?

The list of benefits to each approach goes on and on, but those are a few of the high points. The reality is that they are both great solutions for different reasons. And, in contrast, in the _wrong_ scenario, they can feel like poor decisions.

For example, paying a monthly fee for a hosted API-driven CMS that powers a super small site with a few pages and blog posts is very likely overkill. And it'll hurt to pay that invoice every month when you could simply be editing a few markdown files. On the other hand, if you have to support multiple front-ends from the same data source, it'll feel like an uphill battle if you're using a git-based CMS, while an API-driven CMS is designed specifically to solve that problem right out of the box.

At Ample, we've evaluated the field on both sides and have found what makes us and our clients happy. We love [Contentful](https://www.contentful.com/) (API-driven) and [Forestry](https://www.forestry.io/) (Git-Based), each for different reasons. We have projects that are better suited for one over the other, and that's usually apparent early on in the process. Standardizing on these two approaches has enabled us to build tooling around each. That way we can choose one based on the project's criteria, and then move quickly through the development process.

But that may not be a good approach for you. You may build projects that are similar enough to be able to standardize on one CMS, or at least one _type_ of CMS. And that's great! What's important is that you evaluate your options based on criteria that is important to you and your projects.

Then [we can build Jamstack sites](https://www.ample.co/jamstack) with ease and your editors might just stop hating their CMS!

And if you want to talk more about content management systems, [our door is open](https://www.ample.co/contact). But, be warned, we're a little obsessed.
