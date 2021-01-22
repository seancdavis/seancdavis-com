---
title: "Increase Developer Efficiency by Establishing Conventions"
description: "Developer efficiency is largely driven by the number and type of decisions to make. That number can be reduced by establishing solid (but balanced) conventions."
tags: []
---

How do you measure _efficiency_?

That's simple, at least in theory. It's _the amount of work accomplished over time_.

Great. But how to you measure _work accomplished?_

Probably something like _progress toward the end goal_, assuming you know what the end goal is. That sounds good, right?

In software development, _the end goal_ is usually some type of launch. That's open-ended, but in theory, we're striving to put the thing we're working on out into the world.

Therefore, efficiency could be considered how much progress a dev can make toward getting their thing launch-ready. So when it comes to efficiency, there's a lot riding on _how_ a developer spends their time.

_Pause for a moment ..._

There are philosophical conversations to be had here around how much we should be working. It can be a dangerous line to dance around when it comes to balancing efficiency with burnout. What I'm talking about here is not _how_ much we work, but how _efficiently_ we work. Or how we spend our time wisest within whatever bounds we've established (or have been established for us).

_Back to our regularly-schedule programming ..._

Okay, so how does a developer spend their time?

Whether or not they are writing code, most of a developer's time is spent _making decisions_. That's why we're programmers, right? If our job was data entry and we were spending time plugging away, we're doing something wrong. We're developers and we probably could have built a thing that could complete the entry faster than we can manually.

If a developer spends most of their time making decisions, then the way in which they can work most efficiently is by making decisions that get them closer to the end goal. Or, by _making fewer decisions_.

One method to reducing the number of decisions a developer has to make is through _convention_. I'll explain ...

## Convention over Configuration

When you're writing code, you either have to make a decision or you don't. I know it seems like a silly thing to think about, but it's true. You either have to decide how to name a file or you don't — you just _know_ what the file should be named. You either have to decide where images should go or you don't — you just put them where they go.

Enter the principle of _convention over configuration_. I originally read about this [in the Ruby on Rails doctrine](https://rubyonrails.org/doctrine/#convention-over-configuration), and I love it. Rails does it perfectly. It's extremely opinionated, but once you learn how it works, you can fly through the process of building applications.

Once a convention is established and you've committed it to memory, there's no need to spend brain compute cycles thinking about it. You just go. Like riding a bike, as they say.

And if you can _scale_ that convention — follow the same process across multiple projects — anyone who knows the convention can work more efficiently.

Consider the question of where you should put images in a project. In the end, it doesn't really matter (in most cases). What matters more is that you put them in the same place every time. You make that decision once, and then you know where they go in every (similar) project you work in the future.

And if, at some point, it makes sense to move image to a new location because you've encountered an issue with your convention, then that's fine. For example, maybe your project has grown and images shouldn't be local any more, but now get uploaded to some third-party service. That's fine, as long as that can be established as the new convention.

### Establish Conventions

Establishing conventions is a balancing act, like anything else. Add too much and you've restricted your developers to the point where they can't solve unique problems because the system is too rigid. Add too little and every project will be so different from the next that it'll be like learning all over again when a new developer opens up the code.

On a similar note, conventions need time to be established. It doesn't happen overnight. The first project a practice is used on doesn't represent convention. It needs time to sit, to simmer, and to be documented.

Establishing good conventions doesn't mean making _every_ decision for developers. It means providing a platform on which they can move with ease and happiness through your codebase(s). For example, it might not mean dictating _where_ images are hosted, but maybe only how they are named, or how they are uploaded. It all depends on the problem you're trying to solve and the people you're working with.

In the end, it takes time to get this right. There will be bumps and bruises along the way. But if you stick with it, you'll feel it come together, and eventually you'll end up with a solid set of guidelines, and you and your developers will fly!
