---
title: "The Spinneret: Issue #6"
description: "Quick tips, more video content, website updates, and a myriad of new tools I've discovered. Come see what happened in my Jamstack world in February 2021."
image: /posts/210310/the-spinneret--06.png
tags:
  - spinneret
---

Hey there!

As the number of subscriptions to this newsletter increases, I'll look to refine what I do here to make it as beneficial as possible to you.

As an early follower in this adventure, I want you to help influence that direction. I'd love your feedback! The easiest way to get in touch with me is [on Twitter](https://twitter.com/seancdavis29).

A lot happened in February and the format of this newsletter has changed slightly as a result. Here are the highlights:

- I rearranged the sections a bit and added a section on Website Updates. These are the code changes I've made that are relevant to you as a reader of my words. The new sections make more sense to me, but I'm curious what you think about it (or if you care at all).
- I've begun recording more videos. My goal is for that to ebb and flow but eventually come out at _about one per week_ (i.e. 3-5 each month). [You can subscribe here](https://www.youtube.com/channel/UCskZ3MNbeGSVyOTL0L5ooww). I'd love your feedback. Which videos are most beneficial?
- I found _a ton_ of new tools this month. That section is super long. This is likely to be the thing that evolves first. But what do you think? Do you ever even make it to the tools section?

## My Words

_New blog posts and videos I published last month_ {.text-sm}

{% post_image
    src="/posts/210310/the-spinneret--my-words.png",
    alt="The Spinneret - My Words" %}

Here are links to the majority of pieces I published this month. I've continued to write about component organization as I work toward a big piece that pulls them all together. I also introduced the concept of _Quick Tips_. I'm not sure if these will end up being exclusively videos or articles, but for now there's a little of each.

### Videos

- [3 Methods for Adding Images to GItHub README Files](https://youtu.be/Ljj1wGFJqPY)
- [Quick Tip: Use a Code Spell Checker](https://youtu.be/Trhj3d9TK5k)
- [Quick Tip: Option + Delete for Terminal and iTerm 2](https://youtu.be/pP56DMy9m-s)
- [Quick Tip: Move Lines in VS Code](https://youtu.be/FFBMgrAa6bs)

[Subscribe here](https://www.youtube.com/channel/UCskZ3MNbeGSVyOTL0L5ooww) to get the content earlier.

### Blog Posts

- [A Guide to Setting up a New Mac Developer Machine](/posts/new-mac-dev-guide/)
- [How I Organize My Brain](/posts/organizing-my-brain/)
- [Delete Entire Word in Terminal and iTerm2](/posts/delete-full-words-terminal/)
- [Balancing Flexibility and Productivity in Your CMS](/posts/balancing-cms-productivity-flexibility/)
- [3 Rules for Keeping Components Organized](/posts/three-rules-keep-components-organized/)
- [Reconciling Editor Experience and Developer Experience in the CMS](https://css-tricks.com/reconciling-editor-experience-and-developer-experience-in-the-cms/) <small>(CSS-Tricks)</small>

## Website Updates

_Notable changes made [to my website codebase](https://github.com/seancdavis/seancdavis-com) and other projects._ {.text-sm}

{% post_image
    src="/posts/210310/the-spinneret--my-code.png",
    alt="The Spinneret - My Code" %}

- I'm slowly importing posts from other mediums I've used in the past. I used to have a blog called _The Polymath Lab_, which was about organization, productivity, communication, and inspiration. I sunset that site and brought all the relevant content into [the blog](/posts/).
- [The project I built to benchmark and compare SSG build times](https://github.com/seancdavis/ssg-build-performance-tests) is not sustainable in how it runs the specs. I'm (slowly) working on automating the process using GitHub Actions. Hoping to be in a stable spot in March.
- And lots of other behind-the-scenes stuff, including some bug fixes and swapping out NPM for [PNPM](https://pnpm.js.org/), which has great monorepo support.

## My Reads

_Articles and news I read last month that I found interesting, with some commentary._ {.text-sm}

{% post_image
    src="/posts/210310/the-spinneret--my-reads.png",
    alt="The Spinneret - My Reads" %}

[**Gatsby announced v3.0 at its conference**](https://www.gatsbyjs.com/blog/gatsbyconf-product-announcements/). I didn't attend the conference, but spent some time with the recap. I used to be an avid user of Gatsby and worked in it almost daily. Today I prefer Next.js for more complex projects.

I'm exited to see so much development from Gatsby. I think the more competition we have, the better, and Gatsby had been kind of quiet in 2020 (maybe partially in response to the negative press).

This release is a little concerning to me, though. They made Gatsby builds waaaaay faster ... _on their Gatsby Cloud platform_. Again, more competition is good. But they seem to be pushing hard to their paid services as a way to deal with the unpleasantness of the product.

In other words, I read that Gatsby is working on performance, but only _sort of_. And I didn't see a mention of considering page speed performance, which, in my experience, was abysmal.

---

[**Jamstack Conf 2021 announced**](https://jamstackconf.com/)! I'm already signed up! Really hoping to see multiple tracks this time around. The Jamstack space is now mainstream and the attendees are likely to vary widely in skillset and focus. I hope the content follows suit.

---

[**Blitz launched a new website and beta version of the product**](https://blitzjs.com/). I haven't personally used this, but I like following the progress because it's such an interesting project to me. It's a full-stack framework, built on Next.js, which is built on React. It seems like such a risky move to build a framework on another framework. And yet, it might also be a brilliant move. I'm curious to see where this goes.

---

This article got a lot of attention: [Choosing between Netlify, Vercel and Digital Ocean](https://zellwk.com/blog/netlify-vercel-digital-ocean/). It's _way_ off the mark, IMO. It totally misses the nuance between Netlify and Vercel. It calls out Vercel for a sneaky pricing page, which is silly. Most pricing pages do this, and Vercel's has a link to the fine print. If you want to use something, you need to take the responsibility of doing research on yourself. (And, generally speaking, if you're making money by using a service, you should probably be paying for the service.)

In the end, it comes down to this recommendation:

> If you have a small project: Go with netlify.
>
> If you have a larger project: Use Digital Ocean.
>
> I wouldn't choose Vercel anymore because of that dark pattern pricing strategy.

This is terrible advice. It has nothing to do with addressing the problem you are trying to solve. It's not a matter of _small v large_.

Because I can't give you a straight answer in a sentence, it makes me think I should write an article to add the necessary nuance here! Yeah, okay. I'll do that in March!

---

And here are some other quick-hitters.

- I heard a talk from Chris Coyier on [_The Great Divide_](https://css-tricks.com/the-great-divide/) created in front-end development as a result of the move toward serverless applications. Loved it! Brad Frost recently [added to the conversation with his two cents](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/). If you haven't spent time with this concept, it's worth consideration.
- I love Bejamas. I think they are doing great stuff in the Jamstack space. Their [free Jamstack resources](https://bejamas.io/resources/) page is a thing of beauty.
- This piece — [The Dark Side of Becoming a Self-Taught Developer](https://medium.com/swlh/the-dark-side-of-becoming-a-self-taught-developer-8e38814a2f83) — seems like it's going to be dark, but it's not. I found it quite inspirational. A great message for aspiring developers.
- [Getting Started With useQuery (React Query)](https://medium.com/swlh/getting-started-with-usequery-react-query-9ea181c3dd47) seems super useful. I haven't had the need to use it yet, but am looking forward to exploring it in the future.
- I came across [_A Better Way to Structure React Projects_](https://www.freecodecamp.org/news/a-better-way-to-structure-react-projects/). I nerd-out over this kind of stuff, but didn't really like the approach here. I feel strongly that components exist to build a reusable system. Grouping by page they are used on defeats that purpose. I have a much larger picture I'm piecing together with several articles, but for now, you can start to see what I'm going toward with this take: [Organize Components by Keeping Related Files Close](/posts/organize-components-by-keeping-related-files-close/).

## My Finds

_New tools that I've recently discovered. They aren't necessarily new._ {.text-sm}

{% post_image
    src="/posts/210310/the-spinneret--my-finds.png",
    alt="The Spinneret - My Finds" %}

I came across _a ton_ of new tools this last month. I think that is, in large part, a result of starting this new job and working with new people every day. So it may slow down in months to come. But maybe not.

Here they are, in alphabetical order (because I couldn't come up with any better way to organize them):

- [AdonisJs](https://adonisjs.com/) is a node-based application framework. I like the way they talk about it, though I don't suspect I'll use it any time soon. My team at [Grouparoo](https://www.grouparoo.com/) uses [Actionhero](https://www.actionherojs.com/), as our CTO ([@evantahler](https://twitter.com/evantahler)) created it.
- [Alacritty](https://github.com/alacritty/alacritty) is another terminal type of application. I recently switched back to [iTerm2](https://iterm2.com/) and am enjoying it, so I'm going to stick there.
- [Clearscope](https://www.clearscope.io/) is a way to grade content on how well it will drive SEO value based on an expected set of keywords. I'm writing a guest article for a team that uses it. I'd _love_ to try it out, but I'm not at the point where I can swallow $170 per month for it.
- [Deckset](https://www.deckset.com/) is how I've begun building [my talks](https://github.com/seancdavis/talks).
- When it comes to _error monitoring and reporting_, I'd known about [New Relic](https://newrelic.com/) for years. Recently I came across two competitors, [Bugsnag](https://www.bugsnag.com/) and [Datadog](https://www.datadoghq.com/).
- [GitHub1s](https://github1s.com/) is a way to edit code in GitHub repo in a hosted VS Code editor. It seems like it might be the same thing as [GitHub Surf](https://github.surf/). But it also seems like these tools are unnecessary as GitHub rolls out [Codespaces](https://github.com/features/codespaces).
- [Mockaroo](https://www.mockaroo.com/) is a little service to mock up to 1k rows of table-structured data.
- [Mural](https://www.mural.co/) is a collaborative brainstorming application. I spent only a little time in it, but it felt clunky when compared to [Miro](https://miro.com/).
- [Paw](https://paw.cloud/) is a Mac-only application for querying APIs. It reminds me of [Postman](https://www.postman.com/), which has been my go-to of late. Prior to Postman's redesign, I was using [Insomnia](https://insomnia.rest/).
- [RapidAPI](https://rapidapi.com/) seems to me like it will mesh various APIs together for a single endpoint. I haven't used it yet, but it seems promising!
- [Raycast](https://raycast.com/) is a productivity tool for Mac. Reminds me of [LaunchBar](https://www.obdev.at/products/launchbar/index.html) and [Alfred](https://www.alfredapp.com/). I've been using Alfred for a long time. I don't use the fancy features — mostly just the calculator and shortcuts for opening applications. I should probably spend some time seeing where I can get productivity gains. When I do that, perhaps I'll consider Raycast.
- [ray.so](https://ray.so/) is a way to export beautiful images of code examples. It's from the folks at [Raycast](https://raycast.com/). It reminds me a lot of [Carbon](https://carbon.now.sh/), which has been my preference. I don't use it much, though, so I'll probably just stick with Carbon, which seems to have a few more options.
- [Sapper](https://sapper.svelte.dev/) is an SSG from [Svelte](https://svelte.dev/). They call it _the next small thing in web development_, which I think is cute. I'm excited to follow the progress, though I'm happy using Eleventy and Next for various projects today.
- [ScraperAPI](https://www.scraperapi.com/) is an API for scraping static HTML from web pages. I haven't played around with this yet, but I've always done this manually in the past. Love the idea of not having to write the low-level code next time I want to do this.
- [Snagit](https://www.techsmith.com/screen-capture.html) is a screen-capture tool. I've just been using the out-of-the-box options for Mac.
- [TablePlus](https://tableplus.com/) is a database GUI. It's a lovely experience. I'm not paying for it (yet), but suspect I would when I require those features. What I love most of all is that I now don't need separate apps to visualize data in PostgreSQL, MySQL, and SQLite.
- [Web3Forms](https://web3forms.com/) is a way to add forms to your static Jamstack sites. There are a number of tools like this out there.
- [weweb.io](https://www.weweb.io/) is the newest CMS I've come across. It seems like a drag-and-drop CMS. I'm often skeptical of these types of tools.

---

Phew! That was a lot. I hope you got something out of it.

See you next time!
