---
title: "The Spinneret: Issue #13"
description: How much JavaScript is too much JavaScript? The landscape of web development is changing rapidly. If we don't stop to look around once in awhile, we might miss it.
image: /blog/211029/the-spinneret--13.png
tags:
  - spinneret
---

## My Updates

_Notable changes in my life, [on my website](https://github.com/seancdavis/seancdavis-com), and in other projects._ {.text-sm}

{% post_image
    src="/blog/211029/the-spinneret--my-code.png",
    alt="The Spinneret - My Code" %}

I wrapped up [the first project](https://github.com/seancdavis/seancdavis-com/projects/5) of the next iteration on the site! This was mostly behind-the-scenes changes that sets me up to be able to make changes that will be meaningful to you.

Progress on [the current project](https://github.com/seancdavis/seancdavis-com/projects/2) has been slow so far, partially because I took a week off to bounce around a few cabins in Michigan (US) with my family. Now that I'm back at it, I'm working on some improvements to individual posts before beginning to introduce new types of content on the site.

I'm anxious to share these updates with you!

## My Words

_New blog posts and videos I published last month._ {.text-sm}

{% post_image
    src="/blog/211029/the-spinneret--my-words.png",
    alt="The Spinneret - My Words" %}

[Creating and saving images with node-canvas](https://blog.logrocket.com/creating-saving-images-node-canvas/) was a really fun one to put together for LogRocket. When I write pieces like this, I work to stay focused on the goal at hand. But I always want to say more. Sometimes to add background or introductory information, and other times to explore next steps. Here I did both and published the following related articles on my blog:

- [Generate Meta Images for Blog Posts with Node.js](https://www.seancdavis.com/blog/generate-meta-images-for-blog-posts-with-node/)
- [Generate Random Markdown Files with Node](https://www.seancdavis.com/blog/generate-random-markdown-files-node/)
- [Run Loop n Times in JavaScript](https://www.seancdavis.com/blog/run-loop-n-times-javascript/)

[The Next Evolution of Stackbit](https://www.stackbit.com/blog/next-evolution-of-stackbit/) kicked off a series of posts for Stackbit in which I got introspective on what Stackbit is and where we're going. But I think my favorite piece of the month for Stackbit was [What Made the Essence of Jamstack Possible](https://www.stackbit.com/blog/what-made-the-essence-of-jamstack-possible/), which was born while exploring [The Missing Piece of the Jamstack](https://www.stackbit.com/blog/the-missing-piece-of-the-jamstack/). The types of articles get to the core of why Stackbit exists and what drew me to the product.

[100 Free CSS Resources](https://www.seancdavis.com/blog/100-free-css-resources/) is the fourth of five guest articles from [Pratham](https://twitter.com/prathkum) published on the blog. The final will likely emerge in November.

## My Reads

_Articles and news I read last month that I found interesting, with some commentary._ {.text-sm}

{% post_image
    src="/blog/211029/the-spinneret--my-reads.png",
    alt="The Spinneret - My Reads" %}

### The Future

It was fun to play a role in Dom's piece on [11 Considerations for the Future of Jamstack Web Development](https://www.cmswire.com/information-management/11-considerations-for-the-future-of-jamstack-web-development/). It helped me think about where we've come from and where we're going with web development. It's likely to spark several related articles from me in the coming months. Rest assured, 2022 is going to be a fascinating year in the evolution of web dev. Of course, I couldn't have responded to all these questions without mentioning [Astro](https://astro.build/) or [Slinkity](https://slinkity.dev/), and I'm glad [Bryan picked up on it](https://twitter.com/brob/status/1451589089837424667)!

(Speaking of Slinkity) [Building The SSG I’ve Always Wanted: An 11ty, Vite And JAM Sandwich](https://www.smashingmagazine.com/2021/10/building-ssg-11ty-vite-jam-sandwich/) was probably the best thing I read this month. It's essentially the birth story of Slinkity. But it does such a great job walking through that journey that it brings to life not just the case for Slinkity, but why we're seeing this trend of component-based SSGs that ship less JS to the client (like Astro). It's long, but it is absolutely worth a read. This stuff is going to be the talk of the town for the near future.

[Tweets like this one from Jaon Lengstorf](https://twitter.com/jlengstorf/status/1442707241627385860) are showing a compelling reason to look more seriously into low-JS tools. Many folks are playing around with these solutions that ship less JS to the clients and seeing major performance benefits. It doesn't mean it's a silver bullet, but it's shifting the conversation, and that's important.

[Static Svelte: JavaScript Blogging with 93% less JavaScript](https://www.swyx.io/svelte-static/) also follows a similar trend. And we have to keep Svelte and SvelteKit in mind when thinking about trends for 2022. While Astro and Slinkity work toward the minimal amount of JS, and tools like Next.js and Gatsby ship loads and loads of JS, Svelte is focused on bringing _the right_ JavaScript. We may see Astro and Slinkity move in this direction, but only time will tell at this point.

### News

[What’s New in Gatsby 4](https://www.gatsbyjs.com/blog/whats-new-in-gatsby-4/) marks the official public release of Gatsby 4! We saw Gatsby lose a large market share to Next.js throughout 2020. I can't wait to see if this release is what they needed to pull some developers who left for Next.js (like me) back into the mix.

[Remix announced a $3 million seed round](https://remix.run/blog/seed-funding-for-remix), which also seems promising in building the competition with Next and Gatsby in this space — React-based front-end frameworks. I don't know much about Remix, but this news has been hyped quite a bit, so I'm interested to see where it goes.

[Serverless introduced Serverless Cloud Public Preview](https://www.serverless.com//blog/introducing-serverless-cloud-public-preview). It's been years since I used Serverless directly. At that time it was a much better alternative than using [AWS Lambda](https://aws.amazon.com/lambda/) directly. But since then services like [Netlify Functions](https://www.netlify.com/products/functions/) have gotten so easy to use, I haven't gone back to Serverless. I wonder if we'll hear more from the community in using Serverless following this announcement.

### Developer Advice

[Write 5x more but write 5x less](https://critter.blog/2020/10/02/write-5x-more-but-write-5x-less/) is advice that speaks to me. It says: "The average person should write 5x more things than they do. The average written thing should be 5x shorter than it is." I love this advice and have been trying to keep it in mind since coming across it this month.

[6 Concrete Tips That Will Make Your React Pull Requests Easier To Review](https://www.chakshunyu.com/blog/6-concrete-tips-that-will-make-your-react-pull-requests-easier-to-review/) is super useful if you are new to creating creating or reviewing pull requests, or if you feel like it's not a super productive process on your team.

### CSS

[Proposal for CSS @when](https://css-tricks.com/proposal-for-css-when/) from Chris Coyier led me down a rabbit hole with CSS this month — a topic with which I don't often spend much time these days. It is a good summary, but [the GitHub discussion](https://github.com/w3ctag/design-principles/issues/335) is almost more valuable of a read. It has some great insight into thinking through naming conventions when setting standards.

[The Future of CSS: Cascade Layers (CSS @layer)](https://www.bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/) is a proposal that could fundamentally change the way we write CSS today. _Cascading_ may not work exactly the same thing in a few years.

[Less Absolute Positioning With Modern CSS](https://ishadeed.com/article/less-absolute-positioning-modern-css/) is a clever trick to getting around absolute positioning. When it seems like we should be out of innovations in CSS, something new comes along.

### Everything Else

[Candy Crush in React](https://youtu.be/PBrEq9Wd6_U)

[33 Concepts Every JavaScript Developer Should Know](https://github.com/leonardomso/33-js-concepts)

[Twitter conversation from Jeff Escalante](https://twitter.com/jescalan/status/1450943915234938885) that has a slew of great Next.js plugins.

[SSF Passwords](https://www.adsoftheworld.com/media/integrated/ssf_passwords)

[Is Deno Still a Thing? A Look at the Status of the Node Killer](https://blog.bitsrc.io/is-deno-still-a-thing-a-look-at-the-status-of-the-node-killer-884d47981d09)

## My Finds

_New tools that I've recently discovered. They aren't necessarily new._ {.text-sm}

{% post_image
    src="/blog/211029/the-spinneret--my-finds.png",
    alt="The Spinneret - My Finds" %}

[Heroicons](https://heroicons.com/) are beautiful hand-crafted SVG icons,by the makers of Tailwind CSS.

[unDraw Illustrations](https://undraw.co/illustrations) are open source and free to use. I love that people provide this great work to the community for free. I hope that you'll avoid putting meaningless illustrations on your website like everyone else.

[Canva](https://www.canva.com/) is a design tool that has apparently been around for awhile, but I just came across it this month.

[Projector](https://projector.com/home/) is also a design/presentation too, but seems to be more focused on collaboration.

[Beau](https://beau.to/) is a tool to help build no-code workflows for your clients. I didn't totally understand the use case, but they have so nicely outlined a handful of possible use cases on their home page.

[Motion One](https://motion.dev/) is a simple animation library, supposedly faster because it is built on top of the Web Animations API. I haven't tried it yet, but I like the design of the API at first glance.

[PlanetScale](https://planetscale.com/) calls itself _the database for developers_. (Aren't all databased _for developers?_) I've asked around and have yet to find a clear way that this product is distinguished from other DBaaS or BaaS tools. That said, I'd still like to try it, just haven't gotten around to it yet.

[Thunder Client](https://www.thunderclient.io/) is a lightweight REST API client that you can use directly inside VS Code. No need to download a separate app like Postman or Insomnia. (I've been using Postman most frequently lately.)

[Happy Scribe](https://www.happyscribe.com/) is a video editing service with built-in transcription. I've played around with it a bit and I love it. I think the pricing is super reasonable for what it is. If you edit quick videos for a blog, check it out. It's not necessarily great for all use cases, and so I ended up ditching it. But I could see it being extremely useful for some folks.

I came across a handful of developers talking about their favorite component UI libraries for React. This is what I found as a result. I don't know much about any of these, but I love the idea of primitive UI libraries that don't require loads of CSS to create specific styling or theming.

- [Radix Primitives](https://www.radix-ui.com/)
- [Reach UI](https://reach.tech/)
- [Headless UI](https://headlessui.dev/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)

[Marko](https://markojs.com/) is a framework I've yet to share here. It's credited with being of the first frameworks to do partial hydration, which is finally making its way to the mainstream.

[React Bricks](https://reactbricks.com/) is a site builder for React-based projects. We looked at this a bit at Stackbit and think it's missing some of the key ingredients that make Stackbit so powerful, but this definitely has a nice feel to it.

[The CSS-Tricks newsletter #273](https://css-tricks.com/newsletter/273-weird-browsers/) focused on weird browsers. Chris Coyier said, "Perhaps for what we’re losing in browser engine diversity, we’ll gain in browser UI/UX diversity." Then I went down a rabbit hole and found several browsers gaining some traction today, each focused on a slightly different case:

- [bonsai](https://bonsaibrowser.com/)
- [Opera GX](https://www.opera.com/gx)
- [The Browser Company](https://thebrowser.company/)
- [Sidekick](https://www.meetsidekick.com/)
- [Synth](https://synth.app/)
- [Mighty](https://www.mightyapp.com/)

[GistPad](https://github.com/lostintangent/gistpad) is a tool for managing Gists with VS Code.

[giscus](https://laymonage.com/posts/giscus) brings a commenting system to your website using GitHub discussions. This is a thing I've been wanting to do for quite some time, but figured I'd have to write it myself. It seems limited right now, but I'm curious to see if this changes over time.

And last, I'll leave you with [this](https://tixy.land/), which is absolutely amazing.

---

That's all for this month. See you soon!

As always, I welcome feedback on this newsletter (and any content I put out there). Say hello on [Twitter](https://twitter.com/seancdavis29).
