---
title: Using a Headless CMS as a Multi-Channel Content Source
description: One of the biggest benefits of a headless CMS is that they can serve multiple front ends.
tags:
  - repost-stackbit
  - cms
image: /posts/220124/220124-headless-cms-multichannel.png
---

One of the biggest benefits of using a headless CMS as the data source for your website is that the headless CMS is ... well, _headless_. The headless variety of CMS differs from the more traditional CMS (WordPress, Drupal, Squarespace, etc) in that it doesn't care _at all_ what you do with the content. The front end is entirely up to you.

While that idea comes with challenges of its own, it's powerful in enabling you to use your headless CMS as a multi-channel content source.

## Multi-Channel? Please explain.

A multi-channel source means that you can serve various channels through a single source of truth.

In the days of yore, the CMS was tightly-coupled to the experience presented on the front-end. If you wanted to create another website, such as a storefront to sell merchandise, you often got another CMS along with it.

{% post_image
    src="/posts/220124/210928-traditional-cms.png",
    alt="traditional cms data flow",
    flatten=true %}

In this headless world, there can be a single source of truth for content that you use across many channels. So when you want to spin up a new storefront, or a microsite to support a campaign, or a tiny app that displays information on a TV in your waiting room, it can all come from one source. It's much easier to tell content editors to go to a single place to edit content, rather than giving them a separate set of credentials and instructions based on which type of content they are adjusting.

{% post_image
    src="/posts/220124/210928-headless-cms.png",
    alt="headless cms data flow",
    flatten=true %}

## Choosing the Right CMS

There are many, many factors to consider when choosing a CMS. It will be the lifeblood of all the sites that consume its content. Without the content, the websites are useless.

When you know you're going to use the headless CMS journey to support multiple properties, these are the attributes to look for above all else.

### Cost

Cost is almost always a concern, and I've found that the pricing of CMS solutions can be particularly difficult to nail down. This is because the cost is often built on the volume of content and it can be _very_ difficult to predict the amount of content you're going to produce in a CMS.

Content isn't just about the number of web pages. These CMSs consider every _object_ to be a piece of content. That is _highly_ dependent on how your developer models the schema for the site. And that schema design has a different impact on your editing experience.

Many CMSs come with a free plan. Here's a quick comparison snapshot of just a few popular products out there:

| Name       | Records   | Content Types | Users |
| ---------- | --------- | ------------- | ----- |
| Contentful | 25k       | 48            | 5     |
| Sanity     | 10k       | Unlimited     | 3     |
| Prismic    | Unlimited | Unlimited     | 1     |
| GraphCMS   | 5k        | 25            | 5     |

You can see these numbers are vastly different. And then take a look at what it looks like when jumping to the first paid tier:

| Name       | Monthly Cost | Records   | Content Types | Users |
| ---------- | ------------ | --------- | ------------- | ----- |
| Contentful | $489         | 25k       | 48            | 10    |
| Sanity     | $99          | 25k       | Unlimited     | 10    |
| Prismic    | $100         | Unlimited | Unlimited     | 25    |
| GraphCMS   | $299         | 25k       | 50            | 15    |

But the decision is about so much more than the cost. And the cost includes many other factors than the few I've shown here.

In any case, going with the cheapest route may not leave you with the best set of features. And that's a whole other thing to explore, but let's move on to the next major consideration when focusing on multi-channel use.

### Content Modeling

While content modeling directly affects cost, there's a big challenge on the horizon when looking toward multi-site usage:

_Naming_ and _staying organized_.

Consider the salient object when it comes to modeling for websites — a page. And let's say you have two websites with pages. You essentially have two paths to take:

1.  **Create new content types for each site.** This is often a good choice because it lets you create fields relevant only to that site and is usually easier for your editors to understand. But it runs the risk of hitting the ceiling on the number of content types, and it also has the potential to end up with duplicate content (which can bump cost, too) if you want a similar page published to two sites.

{% post_image
    src="/posts/220124/210928-unique-page-models.png",
    alt="unique page models",
    flatten=true %}

2.  **Use a flag to denote which sites a page should be published.** In this case, you have a single content type ("Page" presumably). And it has a field in which you can choose where it gets published. Though a bit more challenging for non-technical editors to maintain, it's a good approach, assuming the structure of page objects can be the same across every site. And can you _really_ know that upfront? Probably not.

{% post_image
    src="/posts/220124/210928-solitary-page-models.png",
    alt="solitary page models",
    flatten=true %}

### Permissions

While permissions don't come up as much in smaller organizations, they are absolutely something you should consider when going multi-channel. At some point, you're likely going to want to introduce a content editor that shouldn't have access to edit every single piece of content. The various CMSs out there have different capabilities when it comes to permissions. You may not need the most complex solution, but should have a grasp on the way the editors want to work and the extent to which permissions are important.

Without sufficient permissions, you run the risk of an editor not understanding the full context of what they are editing, and they inadvertently publish or unpublish a piece of content on a site that they aren't meant to be working with.

---

This list goes on and on, but these are the areas in which I've seen organizations struggle the most as they grow into a multi-channel solution using a headless CMS.

## Multi-Channel Headless CMS + Visual Editing

One of the biggest challenges when it comes to implementing a headless CMS is that content editors tend to lose the context in which they are editing. It's difficult to implement previewing and in-context editing in this decoupled (i.e. _headless_) world.

But that's exactly what we're working on at Stackbit! Our product can integrate with CMSs like Contentful and Sanity to provide a visual interface for making changes to each individual site. This way, all your data can still live in the CMS, but Stackbit provides an interactive means for editing that data — to know exactly what you're affecting on the front end(s).

Say hello to <hello@stackbit.com> and we'll help you get started with a multi-channel CMS integration.
