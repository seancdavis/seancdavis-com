---
title: My 7-year-old daughter built a full-stack application
description: >-
  How my daughter and I worked together to build a full-stack application that
  enabled her to visually represent her trick-or-treating candy haul.
tags:
  - ai
  - bolt
image: >-
  /posts/251118/my-7-year-old-daughter-built-a-full-stack-application-_HdFi5M6.png
seo:
  image: >-
    /posts/251118/my-7-year-old-daughter-built-a-full-stack-application-O5-0aTjO--meta.png
---

My 7 year-old daughter built a full-stack application (mostly) by herself! 🤯

The more I think about this, the more it blows my mind.

Here's the story of how my kids' candy haul became this interactive trick-or-treat tracker.

{% post_image alt="Candy haul on the dining room table", src="/uploads/251118/251124-candy-haul.png" %}

{% post_image alt="Trick or treat tracker - picture graph demo", src="/uploads/251118/251124-demo-picture-graph.png" %}

First things first. She sorted and grouped all the candy, then counted and recorded the haul.

I did actually experiment to see if I could get a model to read this image and convert to a data table, but after a few tries, we determined it'd be faster to count manually.

{% post_image alt="Candy haul paper record sheets for counting", src="/uploads/251118/251124-record-sheets.png" %}

We're ready! Her first prompt to Bolt: "I want you to build a candy website" ...

{% post_image alt="Prompt to build a candy website (first try)", src="/uploads/251118/251124-first-try.gif" %}

And, well, Bolt built a candy website. A full-fledged e-commerce website to sell candy.

But not the bar graph visualization she was aiming for.

So we talked a bit about context and instruction detail. I suggested she start over.

{% post_image alt="Candy e-commerce website screenshot", src="/uploads/251118/251124-candy-store.png" %}

Next attempt: "I went trick-or-treating and I want you to build a bar graph of candy" ...

{% post_image alt="Prompt to build a trick or treat tracker (second try)", src="/uploads/251118/251124-second-try.gif" %}

We let it cook 🍳 and I was shocked to find that it built essentially what we wanted!

There was no data at first, but it wired up a database and we were rolling. She transcribed all of the data from the paper, this time a combination of typing and talking.

About 15 minutes later, we had essentially the results we were hoping for.

{% post_image alt="Trick or treat tracker with admin operations", src="/uploads/251118/251124-second-try.png" %}

That's more or less the end of the story, though there were a few other things we worked on, and I stepped in to provider the finer details to get Bolt working right.

- She decided she wanted a picture graph, too. I helped her with the language, and then we worked together to source images from Google. We added an edit feature and then could upload images to existing candies.
- Making the bar graph vertical was probably the hardest part. And I doubt it scales well. It took a lot of coercing Bolt specifically for this data set. (I also used that change as an excuse to remove the % values, which didn't make a lot of sense.)
- She wanted to share it with her class, so write access couldn't be available from the home page. I also helped with suggesting the write access go in an admin route with simple auth. That was surprisingly easy.

{% post_image alt="Complete - picture graph view", src="/uploads/251118/251124-public-picture-graph.png" %}

{% post_image alt="Complete app - bar graph view", src="/uploads/251118/251124-demo-bar-graph.png" %}

The power of these tools is undeniable. They aren't perfect. And it takes practice to understand which tools are right for which jobs.

But let's put this in perspective in three points:

- When I was 7, JavaScript hadn't been released.
- If my daughter was 7 two years ago, she wouldn't have been able to do this. The tooling wasn't there.
- Two years ago I could have built this no problem. It would have taken somewhere between 5-20x as long. And I've been writing code for 15 years.

A couple hours, a little help from me, and a second grader built a full-stack application that is now live on the web. Boom! 💥
