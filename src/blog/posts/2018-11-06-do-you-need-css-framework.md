---
title: Do You Need a CSS Framework?
description: "It's 2018. CSS is pretty powerful on its own. Do you really need to implement a framework?"
tags:
  - css
---

There are [a lot of CSS frameworks out there](https://github.com/troxler/awesome-css-frameworks). A lot. And many of them are well-maintained and supported by the community.

## CSS Frameworks

[Bootstrap](http://getbootstrap.com/) is the most widely-used framework out there. It is currently [the second-most-starred repository on GitHub](https://github.com/search?q=stars:%3E1&s=stars&type=Repositories) (although Vue and React are rising fast).

Bootstrap was originally released in August 2011. [Do you know what the web looked like back then](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers)? Internet Explorer had about half of all traffic (it has less than 5% in 2018), Firefox had about 25% (5% in 2018) and Chrome had about 15% (more than 60% in 2018). In other words, in 2011, there were several browsers to choose from, IE was the favorite, but others were making headway. Vendor prefixes were necessary to support multiple browsers, and most new projects made use of [Modernizr](https://modernizr.com/), a library you may not have heard of if you're new to development.

In other words, [CSS](/blog/wtf-is-css/) frameworks were absolutely a necessity. Well, no they weren't. They were brand new. They were more of a game-changer and only soon after _became_ a necessity. Feature detection and cross-browser support was a nightmare without the help of tools like Bootstrap and Modernizr.

[Foundation](https://foundation.zurb.com/) was released one month after Bootstrap, and the other million (including the one I tried to write) soon followed.

We've been on this path with CSS frameworks for seven years at this point. So much has changed in the web browser landscape. [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) has only recently become widely adopted and now most browsers are respecting the community's CSS specs. Thus, we don't have the cross-browser issues that once regularly woke us up in the middle of the night covered in cold sweat.

## Current State

But now it's 2018 and we're riding the CSS bike -- when we create a new project, we setup our preferred framework without even thinking about it.

So let's stop and think about it. What do we get out of CSS frameworks?

- A basic methodology. For example, Bootstrap has adopted [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/). When your framework already has a methodology it makes it easier to choose to follow that methodology throughout the project because it's already started for you.
- Component-based design (and somtimes, associated JS functionality) right out of the gate.
- An easily-constructible grid.
- Cross-browser support (for older browsers).

And what do we have available to us in 2018 that we didn't in 2006-2011?

- Better browser compatibility.
- More [CSS methodologies](https://medium.com/openmindonline/state-of-the-art-in-css-a-closer-look-at-css-architecture-systems-544339a6c625) to choose from.
- [CSS variables.](https://caniuse.com/#search=css%20var)
- [CSS grid.](https://caniuse.com/#search=css%20grid)

## Verdict

Given all this background and our current state, do we really need to be using CSS frameworks? If you know me (which you probably don't) then you know my answer.

_It depends_. (Honestly, I think _"It depends."_ is a huge step forward from _"Yes, always."_)

It depends what you're project entails. I find value in CSS frameworks in the following situations:

- Prototyping an application.
- Don't care about the visuals.
- Budget doesn't support custom design.
- Project requires supporting older browsers (i.e. IE).

In each of those cases, using something like Bootstrap and Foundation make it easy to move fast and get to an end product with browser consistency, without much concern for the uniqueness or appeal of the visuals.

In most other situations (on new projects), I'm probably not going to use a CSS framework today. Given the current state of browser compatibility, along with CSS variables and CSS grid, supplemented with the power of Sass (and a post-processor, too), I don't really see a reason for a framework.

On most custom projects I'm building components that look so much different than what these frameworks offer out of the box that it ends up taking more time to customize and compile the overwritten code than it does to greenfield a new component.

I also don't miss the JavaScript functionality all that much. Most of what Bootstrap offers in terms of JS can be accomplished by toggling a state class and adjusting the appearance with CSS.

---

You may have scenarios in which you feel a framework is appropriate, and I think that's totally fine. I simply encourage you to stop and think before you start a new project. Browsers are getting more powerful and feature-full all the time. First, learn what the browsers you're supporting are capable of, then make a decision **based on the best interest of your project**, not on your historical knowledge and comfort.

In other words, **choose the right tools for the job**, understanding that in 2018 a CSS framework may not be one of those tools.
