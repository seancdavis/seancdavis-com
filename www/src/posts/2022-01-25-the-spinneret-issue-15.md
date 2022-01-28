---
title: "The Spinneret: Issue #15"
description: "11ty 1.0 officially released, Astro gets additional backing, and TheJam.Dev is back!"
image: /posts/220125/the-spinneret--15.png
tags:
  - spinneret
---

The easiest way to sum up the last month would be to say: _It’s been weird_. It didn’t go as expected. But what does these days?

While I expect to be sharing more of my words and updates next month, let’s stick to the content I’ve read and tools I’ve found over the last several weeks.

## My Reads

_Articles and news I read last month that I found interesting, with some commentary._ {.text-sm}

{% post_image
    src="/posts/220125/the-spinneret--my-reads.png",
    alt="The Spinneret - My Reads" %}

[TheJam.dev 2022](https://cfe.dev/events/the-jam-2022/): There is a great lineup for this two-day event. But the best part? I’ll be emceeing for a portion of the event! But the actual best part? It’s free!

### News & Announcements

[Announcing Ionic 6](https://ionicframework.com/blog/announcing-ionic-6/): I really like Ionic. I’ve been using it since the early days when it was built exclusively with Angular. I’m glad to see them adding more support for desktop apps, though that process still requires [Electron](https://www.electronjs.org/).

[Announcing The Astro Technology Company](https://astro.build/blog/the-astro-technology-company/): Oh my, another company built around an SSG. 😅 I’ll admit, I’m excited about this one. I’m a proponent of islands architecture and see Astro being the leader in this space over the next year. Glad they have some guaranteed momentum.

[11ty 1.0 released](https://www.11ty.dev/) 🎈 You probably know I’m a _big fan_ of 11ty. My site is built with 11ty, and every time I think it’s not going to scale with me, I’m surprised with its abilities. Very exciting to see this release.

[The Biggest Features in ES2020/ES2021](https://hackernoon.com/es2020es2021): A useful and brief outline of some of the latest JavaScript features to use to your advantage.

### Patterns

[Understanding Rendering in the Jamstack](https://bejamas.io/blog/understanding-rendering-in-the-jamstack/): Brian and I have talked a lot about this over the last year. He does a really great job of breaking down all the acronyms out there to help us make sense of the various rendering methods offered by site frameworks today.

[What is partial hydration and why is everyone talking about it?](https://dev.to/ajcwebdev/what-is-partial-hydration-and-why-is-everyone-talking-about-it-3k56) This article does a fantastic job of concisely breaking down partial hydration by diving into some history on loading JavaScript on the client (i.e. hydration). If you’ve been seeing a lot on this subject, but haven’t gotten into the details, this is a good place to start.

[Patterns.dev](https://www.patterns.dev/): The partial hydration article led me to this site for the first time. It’s an entire site focused on architectural JavaScript patterns, and there’s [a book](https://www.patterns.dev/book/) that brings it all together. Worth exploring if these concepts interest or confuse you.

### Comparisons

[Why Deno Could Replace Node](https://hackernoon.com/why-deno-could-replace-node?source=rss): I’ve been hearing more and more about Deno over the last year. It certainly has potential and is worth keeping an eye on. But it also has a big hill to climb. As the article mentions: “[the ecosystem] is the biggest problem with Deno and is a big reason why most Node.js developers are not migrating to Deno ... There are 3,501 modules on deno.land, compared to 1.3 million on NPM.”

[Gatsby.js vs. Next.js: The Best React Framework and Its Use Cases](https://hackernoon.com/gatsbyjs-vs-nextjs-the-best-react-framework-and-its-use-cases): There are a lot of these out there, and this one is _pretty good_. It doesn’t seem all the way up to date with Gatsby 4’s capabilities. It concludes with: “for static websites Gatsby.js is the way to go, and for dynamic large multi-user websites, Next.js is the way to go.” There’s nuance to consider, but generally, I agree.

### Tips & Tricks

[Words To Avoid in Educational Writing](https://css-tricks.com/words-avoid-educational-writing/): I love this article. I came back to it recently when reviewing content for the Stackbit docs site. It's a great thing to keep in mind when writing for other developers, especially when you don't know their skill level (or maybe even when you do).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">TIL about `git switch`, which allows you to move your unstaged changes to a new branch. <br><br>Seems fairly new. I used to `git stash`, new branch, and then `git stash apply` <a href="https://t.co/6Rd0fCJOcV">pic.twitter.com/6Rd0fCJOcV</a></p>&mdash; Wes Bos (@wesbos) <a href="https://twitter.com/wesbos/status/1479129404500594691?ref_src=twsrc%5Etfw">January 6, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Odds & Ends

[There's never been a better time to build websites](https://www.simeongriggs.dev/there-has-never-been-a-better-time-to-build-websites): I love hype pieces like this. I think they do a great job getting folks interested in web development and helping build confidence for those overwhelmed or learning.

I do struggle with this idea: “The distance between idea and execution is as short as it's ever been.” The tooling we have is cool and powerful. More processes are commoditized than before. The really hard stuff is easy. But piecing a bunch of disparate tools together is not. At all. There is _so much more_ at the fingertips of devs today. But that power takes time to learn to harness.

[The End of “Your Database”](https://sdtimes.com/data/the-end-of-your-database/) Matt Biilmann talks about the benefits of the Jamstack, but in the context of not needing to think much about databases, in direct contrast to how we were building websites even just five years ago.

[Web Almanac: Jamstack](https://almanac.httparchive.org/en/2021/jamstack): This is a nice, detailed look at usage trends in Jamstack tooling. It looks at popular SSGs, CDN providers, and a whole lot more.

[JavaScript dev deliberately screws up own popular npm packages to make a point of some sort](https://www.theregister.com/2022/01/10/npm_fakerjs_colorsjs/): This isn’t the typical helpful article I share here, but it caught my attention. It shows the vulnerability of our current JS package model with NPM.

## My Finds

_New tools that I've recently discovered. They aren't necessarily new._ {.text-sm}

{% post_image
    src="/posts/220125/the-spinneret--my-finds.png",
    alt="The Spinneret - My Finds" %}

[DevUtils.app](https://devutils.app/): Developer tools all in one place. This looks seriously cool. If I was writing more code, I think I’d grab it.

[Turborepo](https://turborepo.org/): I learned about this when Vercel acquired them and forgot to share. It’s a little abstract to understand exactly what it is from the marketing copy. I’m beginning to implement it on a side project, and I’m sure I’ll be able to explain more after that process.

[Dolt](https://www.dolthub.com/): A database tool that looks different than the others I’ve come across. They say: _Dolt is the first and only SQL database that you can fork, clone, branch, merge, push and pull just like a Git repository._

[Tauri](https://tauri.studio/en/): An Electron alternative. I’ve been working with someone who is using it for a side project and really likes it. It’s more lightweight than Electron and seems to use more modern tooling.

[Fibery](https://fibery.io/): On the surface, it looks like another project management tool for teams. What caught my attention was not their product, but [their blog](https://fibery.io/blog/), which includes a list of [comparison posts](https://fibery.io/blog/fibery-vs-x). Check out this one on [Fibery vs Notion](https://fibery.io/blog/fibery-vs-notion/) to get a sense of how they think about their product as differentiating from those established in the space.

[Future Fonts](https://www.futurefonts.xyz/): (From Robin Rendle of CSS-Tricks) A tool “where you can go and buy fonts from type designers at reduced prices early on in their development and then you’ll get updates as they release changes. It’s such a neat publishing model for fonts.”

---

That's all for this issue. See you soon! Feel free to [say hello on Twitter](https://twitter.com/seancdavis29).
