---
title: "Big Oops: Just a Few (Old) Notifications"
description: I've learned a few things the hard way. How to properly use Active
  Record callbacks with Ruby on Rails is one of those things.
tags:
  - big-oops
  - ruby-on-rails
image: /blog/default/default-pink-03.png
---

In this very first [#BigOops](/topics/big-oops/) story, I figured I'd tell one of my own stories. During the time I spent working on my podcast, [Squirrel Stories](https://www.squirrelstories.fm/), I found it best to embarrass myself before embarrassing others. While this isn't the same format or audience, it seems appropriate to do the same.

Here we go ...

---

In my first real job as a developer I was thrown to the wolves. After a few months it was rare that someone would check my work — a _figure it out or get out_ type of situation. While I feel that approach helped me become a better developer faster, it was also a breeding ground for stupid mistakes.

Today, one of my favorite #BigOops stories to tell is this one ...

It was 2014 and I was working for an agency. I was "The Lead" on a website redesign, which really just meant I was the only developer working on the project. We had our own stupid home-grown CMS and were using [Ruby on Rails](https://rubyonrails.org/) to build simple marketing brochure sites.

One task within this redesign was to take two forms and merge them into a single contact form. My approach was to take two old Rails models and merge them into one, since they were now going to share much of the same logic.

At this time I was also new to the idea of [Active Record callbacks](https://guides.rubyonrails.org/active_record_callbacks), which enabled a developer to bake in actions as data in the database changed via a data model. This is a powerful idea, but one must really know what they're doing when working with them. (I didn't.)

I also wanted to send an email notification to users who filled out the form saying thank you and that someone would be in touch — you know, that typical garbage email you receive after filling out an online form.

After some playing around, I found that I could trigger the notification using an `after_create` callback. This made sense because I wouldn't send the notification if I had to update the record, but only when I first created it.

I tested it locally and everything was working great.

Then it came time to deploy it to production. So the last step was to take the old data and merge it into the new model. No big deal, right?

Wrong.

Merging data from two other models into a new model would, in fact, _create_ a new record in that new model. That means I triggered an email notification to users who had already filled out the form.

And this wasn't recent data. We're talking about thousands of records over about five years.

So, _Ol' Johnny_ who filled out the request form five years ago just received an email notification saying thank you for filling out the request form! Oops!

Luckily, I caught the mistake mid-stream. There were thousands and thousands of records, but I stopped the import after about 1.5k. Big Oops!

I fessed up to it immediately, telling our CEO what had happened. She got on the phone with the client to give them a heads up. In the end, nobody actually cared. The client got a few extraneous phone calls, but it didn't bother them.

---

This mistake provided me with three important lessons I now take with me everywhere I go:

1. When something in the development world has great power, it should be treated with respect. Having someone else look at code before taking it to production is a great first step in that direction.
2. When working with an [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) framework, the models are for data, and the controllers are for more deliberate user-generated actions like sending email notifications. IOW, it's safer to keep risky code in a place it can be directly triggered.
3. Always proactively admit mistakes when catching them before someone else. It usually mitigates the repercussions.
