---
title: My 7-year-old daughter built a full-stack application
description: >-
  How my daughter and I worked together to build a full-stack application that
  enabled her to visually represent her trick-or-treating candy haul.
tags:
  - ai
  - bolt
image: >-
  /uploads/251118/251124-demo-picture-graph.png
seo:
  image: >-
    /posts/251124/my-7-year-old-daughter-built-a-full-stack-application-Xvqso2PD--meta.png
---

My 7-year-old daughter built a full-stack application. Mostly by herself.

The more I think about this, the more it blows my mind. When I was seven, JavaScript hadn't even been released yet. My dad got me started with Dreamweaver when I was maybe 10 or 12. He had done a bit of work on his company's website. This is long before WordPress. It consisted mostly of FTP uploads and really simple webpages. When I got a hit counter added, I was thrilled. It was really cool just to tinker.

And now I have a seven-year-old who can build full-stack applications. The power in people's hands today is astonishing.

I want to share what we built together in about two hours because every time I think about it, I'm amazed all over again.

{% post_image alt="Candy haul on the dining room table", src="/uploads/251118/251124-candy-haul.png" %}

## Starting with the data

First things first — she sorted and grouped all the candy, then counted and recorded the haul.

I did an experiment to see if I could get a model to read the image and convert it to a data table. After a few tries, we determined it'd be faster to count manually.

(As a testament to how fast things move, I just tried this again with Gemini, and it got very close. That's incredible progress in less than two months!)

{% post_image alt="Candy haul paper record sheets for counting", src="/uploads/251118/251124-record-sheets.png" %}

## The first prompt

We were ready. My daughter's first prompt to [Bolt](https://bolt.new) was:

> I want you to build a candy website.

{% post_image alt="Prompt to build a candy website (first try)", src="/uploads/251118/251124-first-try.gif" %}

And, well ... Bolt built a candy website. A full-fledged e-commerce website to sell candy. Not the bar graph visualization she was aiming for.

{% post_image alt="Candy e-commerce website screenshot", src="/uploads/251118/251124-candy-store.png" %}

This was a textbook opportunity to talk about context in a way that is relevant to a seven-year-old. That's not just about AI, but can be a great boost for human communication as well.

After the quick conversation, I suggested that she start over, knowing that we were so far off from her vision.

## Second attempt

Next attempt:

> I went trick-or-treating and I want you to build a bar graph of candy.

{% post_image alt="Prompt to build a trick or treat tracker (second try)", src="/uploads/251118/251124-second-try.gif" %}

We let it cook and I was shocked to find that it built almost exactly what she wanted.

There was no data at first, but it wired up a database and we were rolling. She transcribed all of the data from the paper, this time using a combination of typing and dictation. About 15 minutes later, we had essentially the results we were hoping for.

{% post_image alt="Trick or treat tracker with admin operations", src="/uploads/251118/251124-second-try.png" %}

## Iterating on the details

That's more or less the core of the story, though there were a few other things we worked on. I stepped in to help with the finer details and to get Bolt working right when things got a little tricky. Here are a few notable moments:

### Adding a picture graph

She decided she wanted a picture graph, too. I helped her with the language, and then we worked together to source images from Google.

{% post_image alt="Complete - picture graph view", src="/uploads/251118/251124-public-picture-graph.png" %}

### Uploading images

We added an edit feature so we could upload images to existing candies.

### Design tweaks

Making the bar graph vertical was probably the hardest part. And I doubt it scales well. It took a lot of coercing Bolt specifically for this data set. (I also used that change as an excuse to remove the % values, which didn't make a lot of sense.)

{% post_image alt="Complete app - bar graph view", src="/uploads/251118/251124-demo-bar-graph.png" %}

### Handling permissions

She wanted to share it with her class at school, so write access couldn't be available from the home page. I helped with suggesting the write access go in an admin route with simple auth. That was surprisingly easy.

## The building/prompting process

One fascinating part of this process was how we actually built it, which isn't altogether different from how I'm building most of my code today.

We'd go to Bolt, open up a new project, and she'd hit the hotkey wired up to enter into dictation mode on the Mac. She'd talk, and then we'd let it run.

### The power of dictation

One thing that was eye-opening to me: she can't spell very well. A second grader is at the very beginning of their spelling journey in life, though many can already read decently well.

And you don't need to be able to write to build applications today! That's wild! Not only do you not have to write code, you also don't really need to be able to write English. You just need to be able to speak and read.

### Overcoming challenges

There were a few cases where she got stuck and knew something wasn't quite right, but didn't really have the language to tell Bolt how to fix it. That's where I stepped in. But she would come up with new ideas. Examples:

> I want to be able to add pictures

Or:

> I want to put the bar graph back but I want them to be up and down bars.

### Deployment

Just tinkering over the course of a couple days for a few minutes at a time, we've got this thing working. I wired it up to a custom domain for her, deployed it to Netlify, and then she took it into her second grade classroom and share with her class a full-stack application that she mostly built on her own.

## The power is undeniable

We've probably spent maybe a total of two hours on this thing. There's authentication, there's a database, there's a public view, there's an decent-looking UI.

### Comparing to my experience

Let's put this in perspective. Not even to compare this to my childhood in the 1990s. Instead, let's compare this to 2023.

- If my daughter was 7 two years ago, she wouldn't have been able to do this. The tooling wasn't there.
- Two years ago I could have built this, no problem. It would have taken somewhere between 5-20x as long. And I've been writing code professionally for 15 years.

Even just going back two years — not only would she not have been able to build this, I wouldn't have built it in two hours. Maybe a week. Add the authentication piece and all of that — it's a lot that came together in two hours with a little bit of my help.

## The bar keeps rising

While I don't discredit the fear that many developers have with AI, when I saw this come to life, I was astonished. It's not a replacement for the human brain. It's a tool that we use to create. It's just lowered the barrier to entry.

**Today a child can build in a couple of hours (with a little help) what it took for a senior dev to build in a week just two years ago.** The bar has been raised.

That will mean that the expectations on what we can do with these tools will rise. If a seven-year-old can build something that I couldn't have even dreamed of when I was seven, then professional engineers need to bring a lot more to the table. I think it's okay to have that expectation. It's just going to raise the bar across the board.

It's stressful and intimidating and fear-inducing, but it's also incredibly exciting, especially to somebody like me who wants to help developers build better websites.

Let's go! _Happy building!_
