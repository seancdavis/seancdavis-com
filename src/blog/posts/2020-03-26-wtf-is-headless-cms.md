---
title: WTF is a Headless CMS
description: "The headless CMS is a core tenet of the Jamstack approach, a gamechanging approach to building modern websites. Here is an intro to the headless CMS approach."
tags:
  - cms
  - jamstack
  - wtf
---

[Content management systems](https://en.wikipedia.org/wiki/Content_management_system) (CMS) have been around for awhile. Some of the biggest players in the space go back a long time (in web years):

- [Drupal](https://www.drupal.org/) (2000)
- [WordPress](https://wordpress.com/) (2003)
- [Squarespace](https://www.squarespace.com/) (2004)
- [Wix](https://www.wix.com/) (2006)

I know, you're here to learn about headless CMS products, not these old fellows. But, before we dig into the more modern approach, let's take a look at how these traditional systems work. In doing so, we'll use WordPress as our example, as it powers more than a third of the top 10 million websites (as of April 2019)!

## How a Traditional CMS Works

The primary purpose of a CMS is to provide a means to ... well, _manage the content_ of a website. Traditional CMS products like WordPress tightly couple the content editing process (the "back-end") with the public's view of the website (the "front-end").

The editing process works like this:

1. Sign into your content management system (the back-end of your site).
2. Change some content, e.g. add a new blog post.
3. Click _Publish_.
4. WordPress stores the post info in its database.

Meanwhile, when a user visits the blog site (the front-end), that process looks like this:

1. User lands on the blog website.
2. WordPress queries the database for the most recent posts and shows the result on the screen.
3. After publishing that post in the example above, that post becomes one of those items, which the user can now view.

Here's a super simple diagram of the process:

{% post_image
    src="/blog/200326/legacy-cms.png",
    alt="Legacy CMS Workflow",
    classes="mb-4" %}

Being _tightly coupled_ means WordPress powers the entire website within a single application, from creating and editing the content, to storing content, to how the post looks when a visitor is reading it.

This is essentially the same way in which social media platforms behave. The main difference between WordPress and an app like Twitter is that editing and reading tweets are part of the same experience. There's no front-end and back-end of the application — it's all just the application. With WordPress, there's a distinct difference — the editor creates content for others (who have no access to edit the content) to consume.

For more than a decade, most CMS products worked like WordPress.

## Rise of the Jamstack

Eventually we started to see a rise in a different approach to building websites — [the Jamstack](/wtf-is-jamstack). The Jamstack's primary focus is in _decoupling_ (or _detaching_) front-ends from back-ends.

The Jamstack quickly gained popularity, as it offered an array of benefits to those building and maintaining websites, including cost, security, performance, scale, and developer experience. ([Read more on the subject here](/wtf-is-jamstack).)

While not a requirement, the headless CMS is a core tenet of many Jamstack websites. Therefore, as the Jamstack methodology took hold, so too did the headless CMS approach. And that's likely why you're here.

So let's dig into it!

## How a Headless CMS Works

A [headless CMS](https://headlesscms.org/), sometimes called a _decoupled CMS_, is essentially the _back-end_ half of a traditional system. While WordPress powers the entire website, a headless CMS is only concerned with the content editing process. It doesn't care what happens with the content after it is written. That part is up to the owner of the site (or their developer(s)) to figure out.

### Types of Headless CMS

There are two types of headless CMS products, the distinguishing factor being how they store the content:

- **API-Driven CMS:** An API-driven CMS handles its own content storage (usually in a database), and makes that content available via an [API](https://en.wikipedia.org/wiki/Application_programming_interface). Developers can use that API to build out the front-end(s). (Fun fact: WordPress also [has an API](https://developer.wordpress.org/rest-api/), which means it _could_ be used as a headless CMS.)
- **Git-Based CMS:** Instead of storing content in a database, a git-based CMS stores its content in data files alongside the front-end code (usually as [markdown](https://daringfireball.net/projects/markdown/), [JSON](https://www.json.org/json-en.html), or [YAML](https://yaml.org/)). Developers of the site use those files to visually create the front-end.

### The Headless CMS Market

This approach is gaining so much popularity that it seems like there is a new headless CMS to try every week. To list them would be exhausting. Fortunately, the fine folks at [Netlify](https://www.netlify.com/) (the same ones who coined the term _Jamstack_) are tireless, and have created an archive of headless content management systems at [headlesscms.org](https://headlesscms.org/).

The other reference I frequent is [this article](https://www.helloample.com/blog/comparing-headless-content-management-systems) and [its corresponding chart](https://uploads-ssl.webflow.com/5a2e8a9f7cc425000195064c/5db3471c4b211e0cec7d6356_ample-blog-tl-jamstack-headless-cms-cheatsheet.pdf) that my colleague authored. It lists a handful of the more popular headless CMS options, along with a solid feature comparison.

## Benefits of Headless CMS

On the surface it may seem like a headless CMS is just half of a CMS like WordPress. It is, but that has led to several key benefits:

- **Security:** When users visit a WordPress site, WordPress queries a database in real-time and sends that information to the user. That makes it more vulnerable than a Jamstack site, which doesn't involve the website's visitors in the data-retrieval process.
- **Scale:** The more traffic a WordPress site gets, the more challenging it becomes to manage its infrastructure. It could require load balancers, failovers, etc. The complexity of a headless CMS grows as the content grows, but that tends to be more predictable and easier to accommodate. (Both can be expensive problems to solve.)
- **Multiple Sites:** WordPress comes with a front-end (a theme) built into it. Supporting multiple sites requires a plugin, and plugins can get clunky fast. A headless CMS makes no inferences how the content is used. Therefore, a single headless CMS instance can power and endless number of front-ends (websites or applications). (Note that this is the case out-of-the-box with API-driven products, but it requires an extra step for devs using the git-based approach.)
- **Developer Experience:** When working with a traditional CMS, developers are forced to work within the language that the CMS was written in. Customizing WordPress beyond the basics requires a developer who knows PHP. With a headless CMS, the developer(s) can use the languages and tools they feel are best for the front-end.
- **Flexibility:** WordPress revolves around _Pages_ and _Posts_. While that's become fairly standard, it's not what every site needs. _Most_ headless CMS products make no inferences on content structure. That means more flexibility. And while flexibility brings complexity with it, it also brings a lot of power.

## The Challenges of a Headless CMS

I know, I'm selling this hard. I'm totally in love with the headless CMS approach. But it's not without its issues. There's a reason that WordPress is still powering so many websites, even years after the Jamstack has started picking up steam.

I find the headless CMS approach to have three challenges:

- **Complexity:** As mentioned above, flexibility is powerful, but it leads to makes them more complex to work with.
- **Code Required:** Anyone can learn how to use WordPress, Squarespace, Wix, etc. to spin up a website within a few hours for a few dollars. While a Jamstack site can be created at no cost, it requires some knowledge of code (_at least_ [HTML](/wtf-is-html) and CSS) to create a site.
- **Cost:** API-driven products tend to get pricey really fast. And those pricing models tend to be more about the amount of content and not the traffic on the front-end. Because of that, it can be tough to know how much a headless CMS is going to cost until getting a feel for how the content is architected, which _could_ vary depending on the chosen product.

---

The headless CMS is a core tenet of the Jamstack — a gamechanging component in building modern websites. The traditional CMS was revolutionary for the web, as it provided us a means to enable users to edit content dynamically and in the same space in which that content would be consumed. But that led to challenges with scaling, security, and cost, among others.

As part of the Jamstack, a headless CMS helps us overcome those challenges.
