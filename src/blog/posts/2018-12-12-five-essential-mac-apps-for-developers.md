---
title: 5 Essential Mac Apps for Developers
description: "These are five of the most useful applications for developers working with Mac OS X."
tags: []
---

I should start with a caveat: I've already written an article called [_5 Essential Mac Apps_](https://medium.com/@seancdavis/5-essential-mac-apps-9538946a3606). These apps in this article are those which I feel could benefit any Mac user, regardless of what they use their Mac for:

- Spotlight Replacement: [Alfred](https://www.alfredapp.com/)
- Window Manager: [Spectacle](https://www.spectacleapp.com/)
- Clipboard Manager: [CopyClip 2](https://fiplab.com/apps/copyclip-for-mac)
- Email Client: [Shift](https://tryshift.com/)
- Screen Recorder: [Recordit](http://recordit.co/)

If you don't know about or have these apps I recommend at least taking a look. They have all been great to me over the years.

But, we're here to talk about the applications most valuable specifically for those using their Mac machines as developers. Okay, here we go.

## 01: Code Editor: [Visual Studio Code](https://code.visualstudio.com/)

**Cost:** Free

{% post_image alt="Visual Studio Code", src="/blog/181212/vs-code.png" %}

I know, it's a little ridiculous, but the first application I list is a Microsoft application. WTF?

I was resistant to using it when I first heard about it because Microsoft had a reputation of making less-than-stellar products. I eventually adopted it because I was doing freelance work on an AngularJS project. At that time, VS Code was the preferred editor for AngularJS developers, so I gave it a shot, switching from [Sublime Text](https://www.sublimetext.com/). It took a week or so to fall in love, but I've never looked back (I use it for all my projects to day).

I've gone through many iterations of code editors over the years, spending the most time with Sublime and [TextMate](https://macromates.com/), but I've really come to love VS code. It's a solid product with a ton of momentum and support, so I think I'll be on it for awhile.

(The other popular code editor for Mac is [Atom](https://atom.io/), which I still see many using today.)

When it comes down to it, all four of these code editors I've mentioned (VS Code, Sublime Text 3, TextMate, and Atom) are all good products. You won't go wrong in any case, but I've been happiest with VS Code.

## 02: API REST Client: [Insomnia](https://insomnia.rest/)

**Cost:** Free

{% post_image alt="Insomnia", src="/blog/181212/insomnia.png" %}

If you want to make calls to an API without wiring up and running application code or a script, Insomnia will be your best friend. I use it mostly for debugging responses from APIs when my scripts and applications aren't behaving the way I'd expect. This is a huge time-saver when compared to writing and rewriting code until you get the expected API response.

A popular alternative is [Postman](https://www.getpostman.com/). Postman was traditionally tied to the Chrome browser and limited with its features when compared to Insomnia. It's received a few updates since the last time I used it and appears like it's on a similar level (as Insomnia) now. Still, I'm really happy with Insomnia.

## 03: Cloud Storage / File Transfer Client: [Transmit 5](https://panic.com/transmit/)

**Cost:** \$45

{% post_image alt="Transmit 5", src="/blog/181212/transmit.png" %}

Transmit is one of the pricier apps I've purchased, but it is 100% worth every single penny.

I don't work much with transferring files via FTP today, but if I did, this would _absolutely_ be a lifesaver. It has a clean interface and it's really pleasant to work with.

I use Transmit more for sending and viewing files on external cloud storage providers like [Amazon S3](https://aws.amazon.com/s3/), [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html), and so on. I tend to only use this for viewing or transferring a smaller number of files. When it becomes a mass transfer, I switch over to using a lower-level tool, like the [AWS S3 CLI](https://docs.aws.amazon.com/cli/latest/reference/s3/), which is more performant.

I also use it as a great alternative to the [Dropbox](https://www.dropbox.com) and [Google Drive](https://www.google.com/drive/) clients, as I can upload and download files at will on multiple accounts and it doesn't take up any space on my computer. This wouldn't work if you are an avid user of one of these services, as it would surely slow you down, but it's been good to me.

Most of us are hosting assets somewhere in the cloud, and while we can see and work with those assets via the command line, it really can be nice to have a visual representation and an easy drag-and-drop interface for manipulating contents.

## 04: Markdown Editor: [Ulysses](https://ulysses.app/)

**Cost:** $4.99 per month ($39.99 per year)

{% post_image
    alt="Ulysses",
    src="/blog/181212/ulysses.png",
    classes="override-body-constraint mb-4 max-w-xs mx-auto" %}

While a markdown editor isn't necessarily essential, it can really come in handy. Markdown tends to be the preferred means of writing prose for developers and it's nice to have a client that can provide a preview of the rendered output from your input.

I bounce back and forth on this one occasionally. I really love Ulysses, but I use it more writing fiction and lyrics and less so for technical documents. In fact, I'm writing this article in VS Code and not Ulysses. And when you tack on the subscription model Ulysses has recently switched to, it's become quite the pricey application and is moving more to focus on authors who make money using their tool.

That being said, there are plenty of markdown editors and previewers out there as an alternative. Prior to Ulysses, I had worked a lot with [Marked 2](http://marked2app.com/). While also a bit pricey (\$13.99), it doesn't come with an authoring client. It's just a preview. That seems limiting, but it's actually kind of nice, as it gives you (the author) the choice of which authoring application you'll use, while it focuses on rendering the output.

And I mean there really are others if you do a bit of Googling. The two that have recently caught my attention are [Caret](https://caret.io/) and [Typora](https://typora.io/). I've tried and like both, but not enough to go away from Ulysses just yet.

## 05: Placeholder Text: [Little Ipsum](http://dustinsenos.com/littleIpsum)

**Cost:** \$0.99

{% post_image
    alt="Little Ipsum",
    src="/blog/181212/little-ipsum.png",
    classes="override-body-constraint mb-4 max-w-xs mx-auto" %}

We developers regularly need some sort of placeholder text. What's nice about Little Ipsum is that its icon sits in the menu tray and provides a quick and easy means for copying placeholder text.

Of course, it costs a dollar, and there are hundreds of placeholder text generators on the web. My two favorites are [Hipster Ipsum](https://hipsum.co/) and [Samuel L. Ipsum](https://slipsum.com/). And shoot, they're so easy to make that if you don't find one you like you could make your own. But again, Little Ipsum is nice just because it's right there for you on your Mac, and this article is about native Mac apps.

## What About Terminal?

One quick word before we part ways. You notice I didn't say anything about a terminal. If you're a developer on a Mac, you're going to write on the command line at some point. I'm on the command line frequently. So, what's up -- where's the best app?

What's up is that Mac's terminal application is perfectly fine as is. I used [iTerm2](https://www.iterm2.com/) for a few years but consider it to be overkill. Terminal does everything I need. So I can't split windows the way I liked to in iTerm2. So what? Tabs are easier to work with than split-screen windows anyways.

Mac's terminal is a solid application and, aside from low-level apps, it's perhaps the only out-of-the-box Mac application I use regularly. Seriously. Mail, Calendar, Contacts, Safari, Photos, etc. -- I have alternatives I prefer to all of those. But Terminal is simple and all that you should need when you're on the command line.

---

I hope you found an app or two you hadn't heard of or hadn't tried yet. Give it a shot and let me know how it goes for you. It's good to try something new every once in awhile to see how competition with your regular apps has been keeping up and, if surpassed, perhaps it's time for a full switch.
