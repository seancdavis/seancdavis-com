---
title: Using Web Components to Build a House, Room-by-Room
description: You could build a house one brick at a time. Every room could be
  unique. That would take a long time and it'd cost a lot of money, as houses
  usually do. But what if you could build a house room-by-room?
tags:
  - components
image: /blog/default/default-yellow-02.png
---

Web pages, in their simplest form, are just bunches of [HTML](/blog/wtf-is-html/) code — element tags that determine content and structure. We don't really _need_ anything else to build a web page. But we add [CSS](/blog/wtf-is-css/) to make pages look nice and [JavaScript](/blog/wtf-is-javascript/) to add interactivity.

On their own, these languages — HTML, CSS, and JavaScript – are _tools_. What you have in front of you is a blank canvas, or an empty web page. To bring that page to life, you have to put those tools to use.

Consider if you were building a house by hand. You have access to lumber, bricks, mortar, glass, hardware, pipes, wires, paint, and so on. And your toolbox is filled with the tools you'll need to get the job done.

Where do you begin?

Probably with a plan. A _design_ for what the house will eventually look like.

Once you've completed the design, it's time to get started building the house. You start with the foundation, laying one block at a time, adding some mortar, adding the next block, and so on. Then you begin building walls, one brick at a time.

It's going to take a long time for that house to come together.

Unless ...

What if you could build one piece of the house and then reuse it elsewhere? What if you could build a wall, or a closet, or a window frame, and then endlessly duplicate it wherever you wanted to use it?

Building the house would go a lot faster.

But, as with anything that moves faster, there are tradeoffs.

For instance, you'd lose some uniqueness — and perhaps some _character_ — when duplicating parts of the house. But you could create variation through paint, orientation, or other attributes that are easily changeable. Unless you are willing to pay the time and money it would take to make every space completely unique, it might be worth it.

Component-driven development is like building a house in composable pieces. Not brick-by-brick (that's just HTML and CSS), but room-by-room (which is built wall-by-wall).

In order to realize the potential for success of the project, you'll have to set yourself up for it at the beginning. That means going all the way back to when you just had a pile of bricks and some tools. Back to the design process.

If you're able to build a house room-by-room and you want to realize the cost and time savings from that approach, then you'll want to design your house with that in mind. The house must be treated as though it's a system of reusable pieces.

Websites work in much the same way. We could build a website one page at a time, adding unique elements to each page. That would take a long time. And it's not easily maintainable. Or we could build it one section at a time by developing reusable pieces of code that we can plug in at the page level. These are the things we call [_components_](/blog/wtf-is-a-web-component/).

Building a website component-first means that each piece of the site comes from a single source of truth. We build it once and it works everywhere!

But to realize the benefits of [component-driven development](/blog/wtf-is-component-driven-development/), the site must also be _designed_ in the same manner. Otherwise you'll end up trying to build a house room-by-room, only to find out that the small differences in each space make it more frustrating and time-consuming than it would have been if you'd just built every space from scratch.

So when it comes time to bring your next web project to life, build it like a house. Not one brick at a time, but one room at a time.
