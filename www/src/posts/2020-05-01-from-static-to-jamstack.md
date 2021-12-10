---
title: From static to Jamstack
description: The Jamstack combines the best parts of Web 1.0 and Web 2.0, resulting in secure sites that are easily scalable, well-performing, and lower cost.
tags:
  - repost-ample
  - jamstack
image: /posts/200501/200501--static-to-jamstack.png
canonical_url: https://www.ample.co/blog/from-static-to-jamstack
---

Imagine that I'm a salesman. (Please ignore my deep-seated insecurities that would prevent me from ever being successful at such a job.)

So here I am, a successful, confident, polished, practiced salesman. I walk into some company's corporate office. I take the elevator up to the marketing floor, where there's a fancy conference room that the team calls _The Fish Bowl_ because they are marketers and all marketers have a relentless sense of humor. I walk into that room, and with the confidence I take everywhere with me, I pull out my girthy proposal and slap it on the table.

And then I say, "We're going to make your site static."

You'd kick me out of the room, right? That company did. Maybe you'd be a little nicer and wait until I left to make fun of me.

But wait,  I am the _World's Greatest Salesman_.

The next day, I walk into another office. This time I end up in what I think is a meeting room, but the sign outside the door said _War Room_, and all I can think is that someone definitely died in here at some point.

But I shake that haunting thought aside, and with even more ferocity than the previous day, I whip out my proposal and say, "_Today, I can start_ transitioning your site to  **THE JAMSTACK?**"

They're intrigued. So I continue.

"The Jamstack will [make your site fly](https://www.helloample.com/blog/top-4-reasons-we-use-jamstack)! It'll help us increase performance for users, security for you, and happiness for your developers. The upkeep of it will come at a fraction of the cost of your current website. And, [we'll build it one page at a time](https://www.helloample.com/blog/migrating-to-the-jamstack), so you can more easily budget for it."

And then I put the moves on—

And yet again, we're off topic.

The funny thing is, even though that second pitch feels more compelling, it's not all that much different than the first one, other than one word — _Jamstack_. See, a Jamstack site _is_ a static site, but it's so much more than that. To understand that nuance, we're going to have to travel back to the age of Ian Malcolm and Kevin McCallister — _The 90s_.

## Back to the 90s

When [Tim Berners-Lee](https://www.w3.org/People/Berners-Lee/) invented the world wide web, [his first page](http://info.cern.ch/hypertext/WWW/TheProject.html) was static. And for a few years, that's how all webpages worked. Developers would write HTML (and maybe some early CSS), then upload those files to a web server.

A visitor would dial up the internet, pull up their trusty ancient browser and put in a website address. That web server would then find the appropriate HTML file (just a file living on the server) and send it back to the browser. The browser would then parse the HTML and show that visitor the properly formatted content on the screen.

{% post_image
    src="/posts/200501/5eac49d991dd172c85e9f92c_ample-blog-tl-jamstack-from-static-to-jamstack-chart1.png",
    alt="How Web 1.0 Works",
    flatten="true" %}

That's it. That's a static site.

## Pressing Fast Forward

Let's pull out our trusty old VHS player and push fast-forward to another decade, moving into the era of [Web 2.0](https://en.wikipedia.org/wiki/Web_2.0).

Web 2.0 was a revolutionary enhancement to the way websites worked. While what's known as _Web 1.0_ was a series of static HTML, CSS, JavaScript, and image files, Web 2.0 was _dynamic_. These new websites were backed by a database and sculpted with front-end frameworks.

With Web 2.0, when a visitor asked their trusty browser to access a website, that site's web server would talk to an application server, which would ask a database for real-time data, and then it would translate that data into HTML, CSS, and JS files _on the fly_, and send that information back to the browser to be parsed and displayed on screen.

{% post_image
    src="/posts/200501/5eac4aecce0e4a47488ea487_ample-blog-tl-jamstack-from-static-to-jamstack-chart2.png",
    alt="How Web 2.0 Works",
    flatten="true" %}

The benefit of this approach was unprecedented. All of a sudden _users_ could generate content for a website in real-time. Within a few years some of the huge players we still see today were on the scene, such as WordPress, Facebook, and Twitter.

And, for the most part, that's how they all work. On Facebook and Twitter (and other social networks), users write content and it shows up on the site. WordPress is a very similar concept. The only difference is that social media sites make the content editing experience part of the site, while WordPress (and all monolithic content management systems) separate the editing and viewing experiences.

## Web 2.0 Problems

With great power comes great problems. And that's what Web 2.0 had. It was hugely powerful. But it had a handful of challenges:

- **Complexity:** Building a Web 2.0 site was complicated and still is today. It's overkill for the vast majority of sites out there. Most sites would be fine if they could be built efficiently but delivered statically (more on this later).
- **Cost & Scale:** Web 2.0 sites can be inexpensive at first, but it takes resources to communicate with a database every time a user wants to access content. Put too many users together at once, and then you need to introduce failover servers and load balancers and all kinds of craziness that is really expensive.
- **Uptime:** There are a lot of moving pieces during each page's request. And if anything fails along the way, the user isn't going to get what they asked for. While Web 1.0 sites rarely go down, Web 2.0 sites require constant monitoring to ensure users can continue to access content.
- **Performance:** And because there's so much going on in each request, it takes time to get the user what they want, compared to Web 1.0, where the web server was simply delivering a static file to the user.
- **Security:** With every page request containing a call to a database, there's a potential for a hacker to intercept those requests and gain access to a database. Even the most secure Web 2.0 sites are more vulnerable than the insecure Web 1.0 sites because there was nothing to hack with Web 1.0 sites. They are just a bunch of static files that are already publicly accessible.

## Back to the Jamstack

So where does the Jamstack fit? I like to say that the Jamstack takes the best parts of Web 1.0 and combines them with Web 2.0. In other words, a Jamstack site isn't a static site or a dynamic site. It's both!

A Jamstack site is a _dynamically-generated static site_.

The way it works is that it separates the dynamic processes from the static files through a _build process_.

The build process — the _dynamic_ or _Web 2.0_ part — is an automated system in which developers can retrieve data from dynamic systems. That could mean grabbing page content from a WordPress database, or maybe recent Tweets via the Twitter API. The possibilities are endless. And this build process happens on a server away from the users who will visit the website, so there are much fewer security vulnerabilities.

The static part — the Web 1.0 piece — is the result of the build process. The build process produces a collection of static HTML, CSS, JavaScript, and media files. These files then get uploaded to a [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN). And when users visit the site, their browsers download the static files, just as they did in the 90s.

{% post_image
    src="/posts/200501/5eac4b0ac720320f99157a1c_ample-blog-tl-jamstack-from-static-to-jamstack-chart3.png",
    alt="How Jamstack Works with Web 2.0",
    flatten="true" %}

## Benefits of the Jamstack

Knowing how the Jamstack takes the best parts of Web 1.0 and combines them with the best parts of Web 2.0, these are the problems we're set up to solve as a result:

- **Complexity:** With the Jamstack, how the sites are built is up to the developers, and there are plenty of options. Some have a low barrier to entry, while others are much more complex. Developers can choose the level of complexity appropriate for their project.
- **Cost & Scale:** CDNs are nearly infinitely scalable, because they are built to deliver static (cached) files to users. More traffic will mean more cost, but not nearly at the rate that a Web 2.0 project would offer.
- **Uptime:** When the build fails, the site doesn't go down. That's because visitors are still looking at the last set of static files. The only way the site goes down is if the CDN (the place where the static files live) goes down, and that just doesn't happen. Or, if it does, it likely means a good portion of the web is also down.
- **Performance:** A well-built Jamstack site is just presenting a series of (usable) HTML files to the site's visitors. It has a huge advantage over their dynamic counterparts.
- **Security:** Because the build process is abstracted from the site's visitors, there's nothing to infiltrate. Jamstack sites are secure.

But one of the best parts of the Jamstack is that it's trivial to build a new site one page at a time, which not only makes it much easier to budget for, but it also gets newer content and designs in front of your users faster. [Read more about that approach here](https://www.helloample.com/blog/migrating-to-the-jamstack).

Did my world-class sales skills leave you wanting more?

Well, then [let's talk](https://www.ample.co/contact) about making your site static. I mean, let's talk about moving your site to the Jamstack! Yeah, okay. That's better.
