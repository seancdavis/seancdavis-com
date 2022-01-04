---
title: "The Spinneret: Issue #14"
description: New rounds of funding for Netlify and Vercel, 23 new tools, a new search feature on the website, and so much more.
image: /posts/220104/the-spinneret--14.png
tags:
  - spinneret
---

## My Updates

_Notable changes in my life, [on my website](https://github.com/seancdavis/seancdavis-com), and in other projects._ {.text-sm}

{% post_image
    src="/posts/220104/the-spinneret--my-code.png",
    alt="The Spinneret - My Code" %}

While I have lots of words to share in this lengthy (and long overdue) newsletter, I haven't published anything in the last two months!

It's not because I ate too many sandwiches, and only partially because I was either sick or taking care of sick kids. But mostly for two reasons.

First, we (soft) launched [Stackbit v2 public beta](https://www.stackbit.com/blog/v2-beta-announcement/). It took a lot to get here and there's a long way to go, but I'm excited about the progress. I think it looks great and it has a ton of potential. Though I've worn many hats in the process, my biggest contribution to this effort was leading [the new documentation site](https://docs.stackbit.com/), which itself is a massive work-in-progress.

And second, I've put the figurative pencil down to focus on website improvements. These changes are in preparation for the next generation of seancdavis.com, and I'm very excited for what's to come. Here are some of the changes introduced since the last newsletter:

- [A new about page](https://www.seancdavis.com/about/) that looks eerily similar to the home page. That's intentional. By the time the next newsletter comes around, the home page is going to look very different.
- [A new post layout](https://www.seancdavis.com/posts/8-best-animation-software-2021/) that includes easier sharing, consistent options to connect with me, and smart related articles.
- [Search](https://www.seancdavis.com/search/)! I've been itching to get this in there since I launch the site more than a year ago.
- Several other small improvements, including [upgrading 11ty to 1.0](https://github.com/seancdavis/seancdavis-com/pull/319), [removing Lodash](https://github.com/seancdavis/seancdavis-com/pull/318), [adding feeds for each topic](https://github.com/seancdavis/seancdavis-com/pull/331), [new routes and names for content types](https://github.com/seancdavis/seancdavis-com/pull/339), and reposts from places I've been employed — [Stackbit](https://www.seancdavis.com/topics/repost-stackbit/), [Grouparoo](https://www.seancdavis.com/topics/repost-grouparoo/), and [Ample](https://www.seancdavis.com/topics/repost-ample/).

There's a long way to go, but this is a great start in getting there.

If you want to learn more, check out [closed pull requests](https://github.com/seancdavis/seancdavis-com/pulls?q=is%3Apr+is%3Aclosed) or reply to this message to chat.

## My Reads

_Articles and news I read last month that I found interesting, with some commentary._ {.text-sm}

{% post_image
    src="/posts/220104/the-spinneret--my-reads.png",
    alt="The Spinneret - My Reads" %}

I found lots and lots of great reads over the last couple months. Let's start with some news.

### Notable News

[Netlify snags $105M Series D to fuel Jamstack-focused web development](https://techcrunch.com/2021/11/17/netlify-snags-105m-series-d-to-fuel-jamstack-focused-web-development/), which also came with these announcements:

- [Launched $10 Million Jamstack Innovation Fund](https://www.netlify.com/blog/2021/11/17/we-win-together-netlify-launches-10-million-jamstack-innovation-fund/)
- [Acquired OneGraph](https://www.netlify.com/blog/2021/11/17/netlify-acquires-onegraph-a-powerful-graphql-platform-for-connecting-apis-and-services/)

[Next.js released v12](https://nextjs.org/blog/next-12). Vercel has followed that up announcement with other _huge_ news, including:

- [Announcing $150M to build the end-to-end platform for the modern Web](https://vercel.com/blog/vercel-funding-series-d-and-valuation)
- Hiring [Rich Harris](https://vercel.com/blog/vercel-welcomes-rich-harris-creator-of-svelte) (Svelte), [Jared Palmer](https://vercel.com/blog/vercel-acquires-turborepo) (Turborepo), and [Sebastian Markbåge](https://vercel.com/blog/supporting-the-future-of-react) (React core team at Meta).

[Tailwind v3 Released](https://tailwindcss.com/blog/tailwindcss-v3). Tailwind continues to be a polarizing topic. I'm a fan. Excited to upgrade and see what this version has in store.

### Other Interesting Reads

[Learning to future-proof sites using headless CMS and different SSGs](https://www.netlify.com/blog/2021/10/25/learning-to-future-proof-sites-using-headless-cms-and-different-ssgs/). This is playing into the _markdown layer_ or _middle layer_ that I've been suggesting for quite some time. (It always makes me think I should revisit building something in the space.)

[12 JavaScript Pro Snippet Codes For Everyday Problems](https://medium.com/geekculture/12-javascript-pro-snippet-codes-for-everyday-problems-678d510b28de). A useful collection of some common and helpful JavaScript snippets

[Does the Next Generation of Static Site Generators Make Building Sites Better?](https://css-tricks.com/does-the-next-generation-of-static-site-generators-make-building-sites-better/) Some thoughts from Chris Coyier after discovering îles, yet another SSG.

[How to Add Authentication to Your 11ty Site](https://www.zachleat.com/web/eleventy-login/). This is great! 11ty is great because it's _soooo simple_ right out of the box. But that makes it feel like it's limited. Being able to extend and build on it like this is fantastic, and really showcases its power.

[Understanding Transitional JavaScript Apps](https://dev.to/this-is-learning/understanding-transitional-javascript-apps-27i2). It took weeks following Jamstack Conf for the transitional apps talk to really spread. It has been a hot-button topic since. I personally don't love the term. It feels meaningless. It's just a way to describe a thing that already exists and a thing for which we haven't needed a description yet. The already wide array of rendering patterns are hard enough to understand — SPA, MPA, SSR, SSG, DSR, ISR, DSG. There's a lot to still be worked out and we'll eventually figure out what's best.

After some digging, I found that the article came from [this tweet](https://twitter.com/RyanCarniato/status/1458872931962933259?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed&ref_url=notion%3A%2F%2Fwww.notion.so%2Fseancdavis%2F680702cf46b54bf7a5472838a9a5a258%3Fv%3Daff9df6ad4c04732b233101c409f7ff9%26p%3D3f96dcb33ded4c4c9ec2493ef6bc2505). The comments are insightful, including the discussion with Rich Harris (coiner of said term).

[Generate a Pull Request of Static Content With a Simple HTML Form](https://css-tricks.com/generate-a-pull-request-of-static-content-with-a-simple-html-form/). Very cool idea. I love how creative people are with the content layer for their static sites.

[Etsy’s Journey to TypeScript](https://codeascraft.com/2021/11/08/etsys-journey-to-typescript/). This is wildly in-depth and a great resource for anyone thinking about transitioning a large and/or legacy JavaScript codebase to TypeScript. I'm thinking about doing this on a small scale, but even that seems like some effort that I don't know I'm ready to give.

[Git basics: Conventional commits](https://daily-dev-tips.com/posts/git-basics-conventional-commits/). Love organizational processes like this. It's a simple structure that is built to serve posterity. It is so nice to be able to thank your past self when you can easily find what you're looking for.

[How defensive coding leads to bloat](https://swizec.com/blog/how-defensive-coding-leads-to-bloat/). This is a great lesson on how what is a good idea in principle can have negative consequences based on how it is implemented. _Love_ the idea of _Validate the edges, trust the insides_.

[I decreased my average load time by 381ms](https://daily-dev-tips.com/posts/i-decreased-my-average-load-time-by-381ms/). This asks the really difficult question "Do I even need Google Analytics?" I don't want to answer it for myself, but it's got me thinking about it. 😊

[From no-code to some-code](https://flaviocopes.com/from-no-code-to-low-code/). This is a super interesting idea — using Notion to get your feet wet with development. But I wouldn't do it in this way. 1) You have _zero_ control over the HTML and it could change tomorrow. Base any styles or interactivity on the structure and you have a lot of work to do when Notion changes something. 2) Content and code become coupled and that's nasty for keeping up to date.

Did you know you can [review GitHub PRs by hitting period](https://twitter.com/BenLesh/status/1461784746397159426) and then exploring the code? Game. Changer.

[Hammer Factories](https://www.danstroot.com/posts/2018-10-03-hammer-factories). A coworker of mine dug this older post up. Though this contains totally unnecessary domestic violence jokes, the underlying message is valuable. Another colleague summarized it well: "People will write bad code, and frameworks are too hard to use. 90% of the time manual data entry will suffice."

### Just for Fun

And just so we don't forget to have a little fun along the way.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">What’s the best Wi-Fi name you’ve seen?</p>&mdash; Elmira 🦄☁️ (@elmiracodes) <a href="https://twitter.com/elmiracodes/status/1457110976826912772?ref_src=twsrc%5Etfw">November 6, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## My Finds

_New tools that I've recently discovered. They aren't necessarily new._ {.text-sm}

{% post_image
    src="/posts/220104/the-spinneret--my-finds.png",
    alt="The Spinneret - My Finds" %}

Also lots and lots of finds. Here they are, loosely categorized:

### Front-End Frameworks

[îles](https://iles-docs.netlify.app/guide/introduction): _Yet another_ SSG. This one is focused on the newer concept of _partial hydration_. And it's built with all the hot topics — Vite, Vue, and MDX. At first glance it looks like Astro, with less stuff. I don't want to dismiss it entirely before I try it, and yet, I don't see myself trying it anytime soon.

[Elder.js](https://elderguide.com/tech/elderjs/): An SEO-first Svelte-based framework. _And yet another_ SSG. I have to really see something in a front-end framework to make me want to try it, simply because the market is so saturated. I haven't found that with Elder. But again, I shouldn't dismiss entirely before I try. This might just be the perfect solution for your next project.

[Solid](https://www.solidjs.com/) looks to be a React alternative focused on performance. [Here's a comparison](https://ogzhanolguncu.com/blog/react-vs-solid). I don't know how many folks are choosing to ditch React because of performance. Maybe there's a play here, but with React as established as it is, I think we're going to need more than this to see something really catch on.

[Quik](https://github.com/BuilderIO/qwik): The HTML-first framework. This is a simple SSG focused on zero JavaScript, also an emerging 30-year-old trend. I personally love 11ty for this purpose, but it's worth reading [the announcement](https://www.builder.io/blog/introducing-qwik-framework) to understand their position.

[Lit](https://lit.dev/): Simple and fast web components. Lit suggests you don't need as much boilerplate and can use simple components.

### Commerce

[Medusa](https://www.medusa-commerce.com/): Seems like a self-hosted take on headless commerce.

[Snipcart](https://snipcart.com/): The hosted counterpart.

[Shopify Hydrogen](https://hydrogen.shopify.dev/): A React-based framework for commerce, using Shopify as the back end. I have mixed feelings about this. On one hand, it's super powerful and opinionated and will get you going quickly. On the other hand, it's locking you in, which may or may not be okay when it comes to a commerce provider.

### Back Ends

[CockroachDB](https://www.cockroachlabs.com/): A back-end focused on developer experience. [I agree with Chris Coyier](https://twitter.com/chriscoyier/status/1461388898152566784): It looks cool, but not sure I want to keep saying "cockroach".

[OneGraph](https://www.onegraph.com/): API integrations tool. I've added many of these in the past. I love the pattern. OneGraph was just acquired by Netlify, which makes me curious to see how this becomes more tightly integrated into Netlify.

### Database Apps

[Rows](https://rows.com/): The spreadsheet with superpowers. Looks like an Airtable alternative.

[AppFlowy.IO](https://www.appflowy.io/): The open source Notion alternative.

### Dev Utilities

[Fig](https://fig.io/): Your terminal, reimagined. This is in its early days, but I'm using this thing and I love it. The integration feels seamless and it's super helpful. I like it as someone who's been writing code for awhile, but I could see it being supremely helpful to beginners.

[Lorem.Space](https://lorem.space/): Calls itself an "API for placeholder images, but useful!"

[Fontfacer.io](http://Fontfacer.io): A helpful little tool to generate CSS snippets based on font files.

[ImageOptim](https://imageoptim.com/mac): An image optimizer for Mac. I've been using this for the past month and it is delightful. I still prefer a service like Imgix or Cloudinary, but this is great when you can't use those cloud-based tools.

[Sourcegraph](https://about.sourcegraph.com/): Universal code search. It's a smart search utility tool that enables you to search across your entire ecosystem of code. Cool idea. Probably only useful at the enterprise level.

[Core Web Vitals Checker](https://calibreapp.com/tools/core-web-vitals-checker) from Calibre. I've had trouble getting this to work for my site. I get varying results, but I really like the idea.

[Finicky](https://github.com/johnste/finicky): Always open the right browser. Finicky is a macOS application that allows you to set up rules that decide which browser is opened for every link or URL. Sounds super cool, though I'm happy enough with Chrome profiles at this point.

### UI/UX Tools

[Ninja Keys](https://github.com/ssleptsov/ninja-keys): Keyboard shortcuts interface for your website. There have been more and more of these popping up. It's becoming such a popular pattern, I bet we end up seeing a small number rise above the rest.

[Scoutbar](https://www.scoutbar.co/): Oh look, another one. I do like the positioning statement of this one: "Help you build a better navigation experience." It makes me think we may see a future where this becomes the norm when visiting a website. Does [seancdavis.com](http://seancdavis.com) need one?

### Site Builders

This is Stackbit's (my employer's) category, so I tend to run across these frequently.

[WeWeb](https://www.weweb.io/): What was once a "website builder" is now an "application builder". Here's [the launch post](https://news.ycombinator.com/item?id=29173977) on Hacker News.

### Asset Management

[ImageKit.io](https://imagekit.io/): The right way to manage & deliver images on the web. Looks to be like an Imgix or Cloudinary. But the reason this caught my attention is because they just released [a video API](https://imagekit.io/features/video-api). I'm starting to see more folks move away from YouTube and toward HTML video. This is something to keep your eye on.

---

That's all for this issue. See you soon!

As always, I welcome feedback on this newsletter (and any content I put out there). Say hello on [Twitter](https://twitter.com/seancdavis29).
