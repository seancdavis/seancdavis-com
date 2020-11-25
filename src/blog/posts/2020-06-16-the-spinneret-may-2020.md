---
title: "The Spinneret: Issue #1"
description: "The first issue of my monthly collection of web development topics, ideas, tools, and references, along with some commentary."
tags:
  - spinneret
---

Welcome to the very first issue of _The Spinneret_! This is an idea I've had for awhile. It's taken different forms over the last few months, but has led to this — a blog article and email newsletter that consolidates what's happening in my sphere of web development.

I can't, in good conscious, release this without addressing the injustice being fought throughout the United States and the world. In a time like this, silly articles like this one aren't important. Equality, comfort, safety, health — those are the things that matter.

I continue to write because it makes me happy. It calms me down and brings me comfort. And if you get something out of it, that's a bonus for me. But what's more important is that we do something to fight for justice and equality, or at least to support those doing the fighting.

Okay. Here we go!

## In My Words

{% post_image
    src="/blog/200616/spinneret-may-2020--in-my-words.png",
    alt="The Spinneret, May 2020 - In My Words" %}

I took more than a week off in May to unplug in a cabin in the woods with my family. It was a much needed break! But it meant I didn't publish as much as I normally would in a month. However, there were still a few articles I enjoyed writing:

### Static APIs

I've been exploring the idea of [_Static APIs_](https://cobwwweb.com/lets-talk-about-static-apis) over the last few months, trying to add a new tutorial here and there. Last month I added a quick tutorial on [Building a Static API with Eleventy](https://cobwwweb.com/building-static-api-eleventy). I also got some love from [@chriscoyier](https://twitter.com/chriscoyier) on [CSS Tricks](https://css-tricks.com/wtf-is-a-static-api/)!

### Jamstack Exploration

I try to put out one article each month for [Ample](https://www.helloample.com/blog-categories/jamstack) on the Jamstack. This month we squeezed two in there:

- [Settling Down in a Jamstack World](https://www.helloample.com/blog/settling-down-in-a-jamstack-world) is the first article of an ongoing topic I'm going to explore on how we balance efficiency and relevance among an ever-changing set of tools, processes, and ideas.
- [From Static to Jamstack](https://www.helloample.com/blog/from-static-to-jamstack) is a bit of new take on an introduction to the Jamstack, aimed more at non-technical people.

### Looking Ahead

I'll be slow to get back into writing upon my return from the woods, but I expect to have another Static API tutorial in June. I'm also beginning to explore screencasts and video content to provide some variation in the content I produce. We'll see how that goes!

## Shop Talk

{% post_image
    src="/blog/200616/spinneret-may-2020--shop-talk.svg",
    alt="The Spinneret, May 2020 - Shop Talk",
    classes="mb-8 mt-4 w-56" %}

While I had my head down banging out code on a couple hot projects this last month, I was able to take a bit of time and talk shop with my team. Here were my three favorite topics:

### Separating the front from the back

Building off my article on settling down in a Jamstack world, it's been tough to work efficiently (by standardizing) without missing cool new tools on the scene. We've struggled much with what CMS we should recommend on any given project.

That led to a conversation on whether we should build some tooling to abstract the front from the back end — so that we can use any data source, but the _structure_ of our data looks the same to whatever [static site generator](https://www.staticgen.com/) we use.

The very next day after this conversation I discovered [Sourcebit](https://github.com/stackbithq/sourcebit) from [Stackbit](https://www.stackbit.com/). I haven't explored it yet, but plan to dig in over the coming months to see if that (or something inspired by that) will solve our problems. I also suspect I'll have several articles coming along this theme of _settling down without losing touch_.

### The Bowels of gatsby-transformer-remark

I've spent a lot of time working with [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) over the last couple months, and that's not letting up any time soon. I'm trying to build a system for structured content with Gatsby to make it feel like I've got a structured database when all I really have are a bunch of local markdown files.

There will be much that comes out of this, including blog posts and tutorials. [This is the current problem I'm solving](https://spectrum.chat/gatsby-js/general/how-to-build-graphql-types-on-top-of-gatsby-transformer-remark~33ea4f0b-2f97-4fdb-a887-0cc6420e1960), but it continues to evolve.

### JavaScript is Weird

I introduced my team to a wonderfully weird JavaScript problem:

```js
;["1", "7", "11"].map(parseInt)
// => [1, NaN, 3]
```

WTF?

I love it. It's so weird. That led me to write an introductory article on [passing a function as an argument to a JavaScript function](https://cobwwweb.com/pass-func-as-arg-javascript). But [here's the explanation for this specific problem](https://medium.com/dailyjs/parseint-mystery-7c4368ef7b21).

## Resources & References

{% post_image
    src="/blog/200616/spinneret-may-2020--resources.png",
    alt="The Spinneret, May 2020 - Resources & References" %}

These are the two that caught my attention:

### React Hooks

My team has been working more and more with React lately. React hooks are pretty amazing (sometimes). In looking to solve specific problems, we've found a couple nice resources that I'm sure I'll return to:

- [11 Useful Custom React Hooks for Your Next Web App](https://blog.bitsrc.io/11-useful-custom-react-hooks-for-your-next-app-c66307cf0f0c)
- [useHooks - Easy to understand React Hook recipes](https://usehooks.com/)

### Incremental Gatsby Builds on Netlify

I'm very excited about [this](https://www.netlify.com/blog/2020/04/23/enable-gatsby-incremental-builds-on-netlify/)! I haven't tried to work with it yet, but I suspect I will soon.

## What The Buzz!

{% post_image
    src="/blog/200616/spinneret-may-2020--buzz.jpg",
    alt="The Spinneret, May 2020 - What the Buzz?",
    caption="Photo Credit: [Forbes](https://www.forbes.com/sites/davidjeans/2020/05/27/gatsby-website-building-startup-backed-by-index-ventures-raises-28-million/)" %}

I'd assume that in a month in which [Jamstack Conf](https://jamstackconf.com/) takes place, that's all the news I'm focused on. Oh, but it wasn't. Here's what else is happening:

- [Gatsby Days](https://www.gatsbyjs.com/resources/gatsby-days/) has been pushed back. I'm looking forward to listening when it comes back around.
- The community has decided to treat "JAMstack" as "Jamstack" moving forward, effectively killing the (meaningless) JAM acronym. [Here's the discussion](https://github.com/jamstack/jamstack.org/issues/279#issuecomment-607896059).
- The Jamstack community is [working on a new website](https://next--jamstack-site.netlify.app/) with a new look.
- [Netlify](https://www.netlify.com/) also got a bit of a facelift.
- Gatsby [raised \$28 million](https://www.forbes.com/sites/davidjeans/2020/05/27/gatsby-website-building-startup-backed-by-index-ventures-raises-28-million/#7aaede57f3e0)!

_Note: While I was unable to attend Jamstack Conf, I plan to include a separate writeup of the content, which I will link to in next month's issue._

## New (to me) Tools

<div class="flex items-center justify-center override-body-constraint mt-4 my-6">

{% post_image
    src="/blog/200616/spinneret-may-2020--tools-01.png",
    alt="The Spinneret, May 2020 - Tools",
    classes="inline-block w-24 mx-2" %}

{% post_image
    src="/blog/200616/spinneret-may-2020--tools-02.png",
    alt="The Spinneret, May 2020 - Tools",
    classes="inline-block w-24 mx-2" %}

{% post_image
    src="/blog/200616/spinneret-may-2020--tools-03.png",
    alt="The Spinneret, May 2020 - Tools",
    classes="inline-block w-24 mx-2" %}

{% post_image
    src="/blog/200616/spinneret-may-2020--tools-04.svg",
    alt="The Spinneret, May 2020 - Tools",
    classes="inline-block w-24 mx-2" %}

</div>

I came across all of these tools and apps for the first time in May. Buttondown is the only one I've used so far, and I'm at the very early stages. So I don't have commentary to share here, just a list of links:

- [Buttondown](https://buttondown.email/): The easiest way to run your newsletter
- [Coda](https://coda.io/welcome): It's time for a new doc that brings words, data, and teams together
- [Draft](https://draft.io/): Work as you may think
- [Miro](https://miro.com/features/): Start collaborating in 90 seconds
- [Pico](https://github.com/nikersify/pico): Take browser screenshots in Javascript
- [Prose](http://prose.io/): A Content Editor for GitHub
- [Sitesauce](https://sitesauce.app/): A static version of your website in one click
- [Quiver](https://happenapps.com/): The Programmer's Notebook
- [Whimsical](https://whimsical.com/flowcharts): The visual Workspace

---

I hope you enjoyed this first edition of _The Spinneret!_ As always, I welcome feedback [via Twitter](https://twitter.com/seancdavis29).

I'll see you next time!
