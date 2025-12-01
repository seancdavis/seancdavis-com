---
title: My 7-year-old daughter built a full-stack application
description: >-
  How my daughter and I worked together to build a full-stack application that
  enabled her to visually represent her trick-or-treating candy haul.
tags:
  - ai
  - bolt
image: >-
  /posts/251124/my-7-year-old-daughter-built-a-full-stack-application-0gVXu2Fx.png
seo:
  image: >-
    /posts/251124/my-7-year-old-daughter-built-a-full-stack-application-Xvqso2PD--meta.png
---

My 7-year-old daughter built a full-stack application. Mostly by herself.

The more I think about this, the more it blows my mind. When I was seven, JavaScript hadn't even been released yet. And here we are — I have a seven-year-old who can build full-stack applications.

Here's the story of how my kids' candy haul became an interactive trick-or-treat tracker.

{% post_image alt="Candy haul on the dining room table", src="/uploads/251118/251124-candy-haul.png" %}

{% post_image alt="Trick or treat tracker - picture graph demo", src="/uploads/251118/251124-demo-picture-graph.png" %}

## Starting with the data

First things first — she sorted and grouped all the candy, then counted and recorded the haul.

I did experiment to see if I could get a model to read the image and convert it to a data table, but after a few tries, we determined it'd be faster to count manually.

{% post_image alt="Candy haul paper record sheets for counting", src="/uploads/251118/251124-record-sheets.png" %}

## The first prompt

We were ready. Her first prompt to Bolt: "I want you to build a candy website" ...

{% post_image alt="Prompt to build a candy website (first try)", src="/uploads/251118/251124-first-try.gif" %}

And, well, Bolt built a candy website. A full-fledged e-commerce website to sell candy.

Not the bar graph visualization she was aiming for.

{% post_image alt="Candy e-commerce website screenshot", src="/uploads/251118/251124-candy-store.png" %}

So we talked a bit about context and instruction detail. I suggested she start over.

## Second attempt

Next attempt: "I went trick-or-treating and I want you to build a bar graph of candy" ...

{% post_image alt="Prompt to build a trick or treat tracker (second try)", src="/uploads/251118/251124-second-try.gif" %}

We let it cook and I was shocked to find that it built essentially what we wanted.

There was no data at first, but it wired up a database and we were rolling. She transcribed all of the data from the paper, this time a combination of typing and talking.

About 15 minutes later, we had essentially the results we were hoping for.

{% post_image alt="Trick or treat tracker with admin operations", src="/uploads/251118/251124-second-try.png" %}

## Iterating on the details

That's more or less the core of the story, though there were a few other things we worked on. I stepped in to help with the finer details and to get Bolt working right when things got a little tricky.

- She decided she wanted a picture graph, too. I helped her with the language, and then we worked together to source images from Google. We added an edit feature so we could upload images to existing candies.
- Making the bar graph vertical was probably the hardest part. And I doubt it scales well. It took a lot of coercing Bolt specifically for this data set. (I also used that change as an excuse to remove the % values, which didn't make a lot of sense.)
- She wanted to share it with her class, so write access couldn't be available from the home page. I helped with suggesting the write access go in an admin route with simple auth. That was surprisingly easy.

{% post_image alt="Complete - picture graph view", src="/uploads/251118/251124-public-picture-graph.png" %}

{% post_image alt="Complete app - bar graph view", src="/uploads/251118/251124-demo-bar-graph.png" %}

## The mechanics

Here's roughly how it worked. We'd go to [bolt.new](https://bolt.new), open up a new project, and she'd hit the hotkey that turns the Mac into microphone transcription mode. She'd talk, and then we'd let it ride.

There were a few cases where she got stuck and knew something wasn't quite right, but didn't really have the language to tell Bolt how to fix it. That's where I stepped in. But she would come up with new ideas — I want to be able to upload images, I want to put the bar graph back but I want them to be vertical bars.

Just tinkering over the course of a couple days for a few minutes at a time, we've got this thing. I wired it up to a custom domain for her and now she can take that into her second grade classroom and share with her class a full-stack application that she mostly built on her own.

## You don't even need to write

One thing that was pretty eye-opening to me — she can't even spell a lot of basic words. We were playing last night and she misspelled "ticket." A second grader is at the very beginning of their spelling journey in life.

And yet, you don't even need to write to be able to build applications today. That's wild. Not only do you not have to write code, you also don't really need to be able to write English. You just need to be able to speak it.

## The perspective

The power of these tools is undeniable. They aren't perfect. And it takes practice to understand which tools are right for which jobs.

But let's put this in perspective:

- When I was 7, JavaScript hadn't been released.
- If my daughter was 7 two years ago, she wouldn't have been able to do this. The tooling wasn't there.
- Two years ago I could have built this, no problem. It would have taken somewhere between 5-20x as long. And I've been writing code for 15 years.

We've probably spent maybe a total of two hours on this thing. And there's authentication, there's a database, there's a public view, there's a decent design. Even just go back two years — not only would she not have been able to build this, I wouldn't have built it in two hours. Maybe a week. Add the authentication piece and all of that — it's a lot that came together in two hours with a little bit of my help.

## The bar keeps rising

My dad got me hooked up with Dreamweaver when I was maybe 10 or 12, and he didn't know what he was doing. He did a little bit of work on his company's website. Back then, WordPress wasn't even a thing yet. It was mostly FTP uploads and really simple stuff. But it was really cool for me to experience that. The power in people's hands today, though — it's astonishing.

I talk a lot about AI skeptics and the fear around AI. And I don't discredit that fear — when you see this come to life, that fear is not terribly misguided because it can do so much. But it's not a replacement for the human brain. It's a tool that we use to create. It's just lowered the barrier to entry.

And what that's going to mean is the expectations on what we can do with these tools will rise. If a seven-year-old can build something that I couldn't have even dreamed of when I was seven, then professional engineers need to bring a lot more to the table. I think it's okay to have that expectation. It's just going to raise the bar across the board.

## Where we are today

This isn't a comparison to 1995. This is a comparison to 2023. She couldn't have done it two years ago, and I couldn't have done it this fast either. I could have, but it would have taken 10 to 20 times the amount of time. And it would have looked better and worked a little more smoothly — been a little more my style. But so what? This got the job done and she likes it. It solved the problem she was after.

The bar is raised so high. It's stressful and intimidating and fear-inducing, but it's also incredibly exciting, especially to somebody like me who really just wants to tinker.

A couple hours, a little help from me, and a second grader built a full-stack application that is now live on the web.

Who knows where we can go from here?
