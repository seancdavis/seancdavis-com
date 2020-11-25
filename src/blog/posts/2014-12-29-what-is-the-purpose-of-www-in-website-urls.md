---
title: What is the Purpose of "www" in Website URLs?
tags: []
description: "Some websites use www in their domain name, and others don't. What the heck? Find out why and what you should do here ... "
---

_Note: This article is written with the assumption you know very little about the technical, inner-workings of DNS. If you are looking for a more technical answer, I like [this answer](http://serverfault.com/a/145781/257018) (and its comments) a lot._

---

Remember those days when everyone would say, "My website is double-yoo-double-yoo-double-yoo-dot-blah-blah-blah"? And, do you notice how it still happens today? Why are websites presented in this way?

Or, to think of this question a different way, consider an example. If you go to [www.twitter.com](http://www.twitter.com), you are redirected to [twitter.com](http://twitter.com). And, in contrast, if you go to [facebook.com](http://facebook.com), you are redirected to [www.facebook.com](https://www.facebook.com/).

_What the heck?_

## What "www" Means

First, what are we really talking about?

You may have heard the term _domain_ before. We refer to _facebook.com_ and _twitter.com_ as _domains_. I've discussed this when I wrote a basic article on [how the web works](http://thepolymathlab.com/how-the-web-works#the-://). The TL;DR version of that post is essentially this:

> When you type in a URL in your browser, the browser (if it doesn't have the domain name stored in memory) will contact a **domain name server** to ask which **IP address** the domain names points to. It then sends you to the correct IP address and renders the html (or other data) sent to it.
>
> An **IP address** is essentially a unique way to identify a _machine accessing the internet_.

The administrator of a domain (which might be you if you own the domain!) gets to choose the IP address to which their domain points. This is done via a [_DNS zone file_](https://en.wikipedia.org/wiki/Zone_file).

You've probably been to sites that are considered [_subdomains_](https://en.wikipedia.org/wiki/Subdomain) of the root domain. For example, About has a main website at [www.about.com](http://www.about.com/) (notice the _www_). But they also have several other websites. One such example is [bbq.about.com](http://bbq.about.com/).

In this case, the administrator of the _about.com_ domain can choose which IP address to point _www_ and _bbq_ to (and they don't have to be the same).

_Note: This significantly simplifies what the administrator of the large about.com domain actually has to do, but we're using it as an example._

Using this logic, the main Facebook application is actually using a subdomain, and that subdomain uses the _www_ prefix. Meanwhile, Twitter's main application uses their [_naked domain_](http://encyclopedia2.thefreedictionary.com/naked+domain), or a domain with no subdomain/prefix.

## A Utilitarian "www"

So, we've established what _www_ is, but _why_ is it used?

Well, I've been using websites for my examples, but there are many other uses for a domain. Domains can also be used for a mail server (how you receive emails), which is typically at a _mail_ subdomain (for example, _mail.google.com_), or even _ftp_ for file transfer and file sharing. The examples for domain usage go on and on.

So, _www_ became (by some means I didn't research) the standard prefix to use for one's public website.

## Pronouncing "www"

What's better – _www_ or no _www_?

To answer this question, consider:

- your technical configuration
- how to market your website
- accounting for both cases

### Your Technical Configuration

There are some sites out there that recommend you do not use a naked domain, but always use some subdomain for your main website. This typically happens when either a) you have a really, really large site that needs to consider load balancing, or b) you are outsourcing hosting to a service that suggests or requires it.

Furthermore, depending on the age of your domain, you may be pigeonholed into not being able to use the naked domain for your public website.

I think both of these scenarios are understandable and fine. There are many out there against me, but for the simplicity of it, I prefer _no www unless your configuration requires it._

### How to Market Your Website

You got a really awesome, four-syllable domain name, right? Something like "Goo-gle-dot-com" or "a-bout-dot-com" or "twit-ter-dot-com"?

Great! So, why the heck would you say, "My website is www.google.com!" even if it is? Doing so **adds 10 syllables to your domain name.**

I know, I know. This sounds stupid and arbitrary. But really, you saying "www" is the part that is stupid and arbitrary.

So, if you're going to use _www_ (which we've established is completely fine), don't write it on business cards and for Pete's sake, don't say it out loud. Just make sure you ...

### Account for Both Cases

Whether or not you use or don't use _www_, one thing will always be true -- you need to account for both cases. No matter how you configure or promote your domain, people are going to go to _yourdomain.com_ and _www.yourdomain.com_, simply because different people use the web differently.

But, for purposes of SEO (search engine optimization), you should **keep your main domain, and redirect the other to that domain.** This is better for search engines and for accurate analytics.

_Note: If you're using Nginx as your web server, I wrote a quick post on [how to redirect www](http://thepolymathlab.com/remove-the-www-from-a-url-with-nginx)._

---

**References:**

- [Why Use www?](http://www.yes-www.org/why-use-www/)
- [Why do some Web sites include www in the URL while others don't?](http://computer.howstuffworks.com/internet/basics/question180.htm)
- [What’s the point in having “www” in a URL?](http://serverfault.com/questions/145777/what-s-the-point-in-having-www-in-a-url)
