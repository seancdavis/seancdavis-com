---
title: How the Web Works
description: "Learn how the web works."
---

I've tried (unsuccessfully), on several occasions, to explain *how the web works*. To the few people that gazed hopelessly at me (while silently wishing I'd stop talking), I said, "I'll write a blog post on it, and *then* you'll understand." So, here we go -- I hope it works.

The only thing I'll mention before we get started is that I try to take a different approach than most when teaching this subject. I believe hands-on is the way to go, and theoretical nonsense is, well, nonsense until there's some substance to it. But we have to do a little theoretical talk first, so let's get started and get it over with.

## What is the web?

"Web" and "internet" are used interchangeably, but they are not the same thing. At all. The *internet*, simply, is a *network* of *networks*. Even simpler, it's what does the connecting of computers and servers and other devices to one another. The *web *is just one way of accessing the information, which it does by *using the internet*. More specifically, it uses HTTP (hyper-text transfer protocol) to communicate, which is why you see "http" before a web address (although modern browsers tend to hide that from you). HTTP can be thought of as a *language* used to exchange information.

Okay, that's enough theory to get started. [Check this out](http://www.webopedia.com/DidYouKnow/Internet/2002/Web_vs_Internet.asp "Difference Between Internet and Web") if you want even more detail.

## Your Browser

You've probably heard of a browser. If you haven't, a *browser* is simply an application (or a program) that runs on your computer (or phone or tablet), where its primary purpose is to *read files* (I'll explain what this means later). The most popular browsers are Internet Explorer, Chrome, Safari, Firefox and Opera.

Okay, this is boring. Let's turn another direction.

## Reading Files

I mentioned your browser's primary purpose is to *read files*. You're probably thinking, _Isn't it to surf the web?_ Well, yeah. But _surfing the web_ is really just reading files. I'll explain.

Open your favorite browser, and follow the steps below depending on your operating system and browser. This is going to get tricky and it will be your first look into why cross-browser consistency can be difficult to achieve.

_Note: If you have Chrome installed, I recommend trying these steps in both Internet Explorer or Safari AND Chrome._

### Mac OS X

#### Safari

If you're using Windows, type file:// into the address bar and hit Enter.

That will open up a new Finder window. Why? Because Safari recognized you want to search the local file system for a file, not the web.

#### Chrome

If you're on Mac and using Chrome, type `file://` into the address bar, and hit Enter.

Now click _Users_, then *your username*.

Guess what? Now you're browsing your Mac OS X home folder using a browser. It doesn't look as cool, and it isn't as feature-ful as Finder, but it's a file **_browser_** nonetheless.

### Windows 7

#### Internet Explorer

If you're using Windows and its built-in Internet Explorer, type `C:\` into the address bar and hit Enter.

Did it open up a Windows Explorer window? Good. That's because it knows you want to search your computer for a file, and Windows Explorer is much better equipped to handle that.

#### Chrome

If you're on Mac and using Chrome, type `file:///c:/` into the address bar, and hit Enter.

Now click *Users*, then *your username*.

Guess what? Now you're browsing your Windows home folder using a browser. It doesn't look as cool, and it isn't as feature-ful as Windows Explorer, but it's a file **_browser_** nonetheless.

---

What the heck was the point of that? Well, now you see that your web browser is really just a file browser capable of using the internet to browse the web.

Has your mind exploded yet? No? Okay, let's move on.

## Browsing Files on a Server

So far we've established a *browser* is really meant just to *browse *(or *read*) files. And, although this is severely simplifying it, that's all the web really is – a bunch of files. The complication is just that your browser needs to know where to look for the files, while it also needs to be able to communicate what it wants returned. Simple enough?

You know what a [URL](http://en.wikipedia.org/wiki/Uniform_resource_locator "URL") is, right? It's just a location on the web. What we're going to do next is take a URL, and step through each piece of it to know exactly what it means. We're going to give Yahoo a little love and use  [http://yahoo.com](http://yahoo.com "Yahoo").

### The Request (Basics)

Before we start, let's talk about the basics of the request. In other words, the communication channels. Here's what happens: 1. You type in a URL in your browser's address bar and hit enter. 2. Your browser (also known as *the client*) resolves your address and sends a request (via the internet) to the appropriate *web server*, informing the server what it would like returned. 3. The web server retrieves what it needs, and sends information back to the client (again, via the internet).

Now, the part that always confused me was the web server. What the heck is that?

The easiest way to think about it is to simply consider it as another computer, with a file system just like yours. Remember how your browser can browse files on your local system? Well, here, all it's doing is connecting to a different "computer" and "browsing" files on its system. It's more or less a* window *into another computer (or server).

Let's break it down.

### The Protocol: HTTP

We've already talked about this, remember? Think of HTTP as the language your browser uses to communicate with a server. It helps your browser tell the server what *type* of information it would like returned. Remember before, we typed "file://"? That's because we wanted a listing of files returned, not a webpage.

### The ://

In simple terms, the double slash after the colon refers to a *resource*, but that's not really important here.

### yahoo.com and DNS

So all that nonsense is good and all, but how do we know where the files for yahoo.com live? The web uses something called Domain Name System (DNS) to help. Locations on the web are _actually_ exchanged using Internet Protocol (IP) addresses. Here's what happens: - Your browser sends a request (through the internet) to a _DNS server_ for " [http://yahoo.com](http://yahoo.com)" - If the DNS server  knows the answer, it then returns the proper IP address to your browser. Otherwise, it pushes the request on to another DNS server. - Now that your browser knows the correct IP address, it sends a request (through the internet) to that location on the web, and then, as we discussed, that server returns what you requested, if possible.

You've probably seen an IP address even if you haven't realized it. Most IP addresses are a series of four numbers (although the switch it to move to six numbers, since the 4-digit combinations are about taken), for example 71.67.119.237. Google "what's my ip" to see what your computer's public IP address is. And yes, your computer has a public IP address, just like every other device accessing the internet. Think of it as your *Internet GPS*.

If you want more info on DNS, look [here](http://www.howstuffworks.com/dns.htm "Domain Name System").

### The File Structure

We said a web server was just a computer, right? So when the appropriate server receives the request for "yahoo.com" it has to know where to look. This gets technical, so let's just say the server *knows* where to look.

That *file* the web server returns exists in what we like to call the *root directory*. But now, let's say you click on a link on a page that takes you to [http://yahoo.com/stories/all.html](http://yahoo.com/stories/all) (this is an example, it's not a real page). Then what is happening is the *file* that is returned is called *all.html* and it lives in a folder called *stories*, which is a folder within the *root directory*.

{% post_image
    alt="how the web works",
    src="/blog/130603/how-the-web-works.png" %}

URLs, and the web in general can get a lot more complicated. That's a simple first look, and I hope your head is spinning too hard at this point. I'm sure I've left some things you're curious about out of this post. Ask away if you have questions. Thanks for reading.
