---
title: "The Right Way to Learn JavaScript in 2020"
description: "At first glance, the JavaScript ecosystem is overwhelming. Here are thoughts on how to slow down, center yourself, and find a place to begin."
tags:
  - javascript
---

It's 2020, the world is losing its mind, and you want to learn [JavaScript](/wtf-is-javascript)?

That's great! Welcome — it's going to be one crazy adventure! But, now that you've made the decision to learn JavaScript, what's next? How do you get started?

_What is the right way to learn JavaScript in 2020?_

The JavaScript community is vast. There's _so much_ out there, it's really difficult to figure out where to begin. And that's not just for the beginner. Even for experienced programmers, proficient in other language(s), beginning to learn JavaScript can be a tricky thing to navigate.

Because JavaScript is unique.

Where most (web) languages are typically used on either the client side (in your browser) or the server side (the thing that powers websites and applications), JavaScript can do both. And while most languages have a preferred framework ([Ruby](https://www.ruby-lang.org/en/) has [Rails](https://rubyonrails.org/), [Python](https://www.python.org/) has [Django](https://www.djangoproject.com/)), JavaScript has a ton on both the server-side and client-side.

Before we get ourselves too far down the rabbit hole, let's come back to the question we're trying to answer: _What's the right way to learn JavaScipt in 2020?_

The answer is ... _It depends_.

I know, I take the middle ground a lot and it can be frustrating that there isn't one right answer. But it's true. The place you choose to start is the right way for you. And you can make adjustments along the way as you learn more.

Instead of focusing on what's _right_, let's explore what's out there and create a few prompts on which you can reflect when making your decision. The goal here is to have enough information to choose where to get started, knowing that you will likely change course along your journey.

## The Two Sides of JavaScript

There are two primary _sides_ to the language:

- **Client-side:** Code that runs in a web browser. This is the original and more frequent use of JavaScript, bringing powerful interactivity to web pages.
- **Server-side:** Thanks to [Chrome's V8 engine](<https://en.wikipedia.org/wiki/V8_(JavaScript_engine)>), JS can also run directly on a server (i.e. your computer). [Node.js](https://nodejs.org/en/) is the most popular example of this.

These sides are also often referred to as the _front-end_ (client-side) and the _back-end_ (server-side).

The code you'll write on either side will still be JavaScript. It will look and work the same. The primary difference lies in the availability to work with the system. For example, Node has a module that enables you to manipulate the filesystem directly, whereas you can't touch files on someone's computer with client-side code (for security purposes).

Each side comes with its own set of frameworks.

### Server-Side JavaScript Frameworks

There is an abundance of server-side frameworks. [Here's a solid list from 2019](https://scotch.io/bar-talk/10-node-frameworks-to-use-in-2019). [Express](https://expressjs.com/) is easily the most popular, but it also doesn't bring _a ton_ to the table when compared with popular server-side frameworks of other languages.

That results in having to make many low-level decisions if you're going to actually build out a web application with Express. But there are plenty of resources and examples out there to help guide you along the way.

### Client-Side JavaScript Frameworks

At first glance, the client-side frameworks seem intimidating and as vast as their server-side counterparts. But, for the most part, client-side JavaScript falls into one of a three buckets:

- [Angular](https://angular.io/)
- [React](https://reactjs.org/)
- [Vue](https://vuejs.org/)

Yes, yes, there are plenty of others. These are the big players in the game today.

You may have come across other frameworks like [Gatsby](https://www.gatsbyjs.org/) or [Gridsome](https://gridsome.org/) or [Scully](https://scully.io/). Each of those are built on top of one of the frameworks listed above. And sometimes that goes a level deeper. For example, [Blitz](https://blitzjs.com/) is build on top of [Next](https://nextjs.org/), which is built on top of React.

It's worth noting that some frameworks also touch both the client-side and server side. For example, both Blitz and Next have a server-side (i.e. Node) component to them.

We could keep digging here, but this is a good place to stop and move on. I wanted you to get a feel for the lay of the land. While there are _a ton_ of client-side frameworks, it typically comes down to one of the three big players.

## The Two Camps of Learning

Strong opinions are plentiful when it comes to where you should begin learning JavaScript, falling into one of two camps:

- Learn the basics from scratch
- Begin with a framework

Some believe that it makes sense to start learning the basics out of the gate. To build a solid foundation before jumping into frameworks that may enable you to skip over the fundamentals.

Others want you to be practical and effective earlier by jumping right into a framework, with an assumption that you'll pick up the necessary basics along the way.

I look at this a lot like learning to play an instrument. If I wanted to learn to play the guitar (as I did many years ago), I could start by looking up a song like _Stairway to Heaven_ so all my friends would think I was super cool. I'd have to learn how to read a tab, and then I'd translate that to what my fingers could do and start learning the song directly. It would take me a long time, because I didn't have the basics down, but in the end I'd have something cool I could show my friends and family faster.

Or, I could learn the basics first. Chords, chord theories, and strumming patterns, before digging into a song. And my first song would be simpler. Third Eye Blind long before Led Zeppelin. But when I got to Led Zeppelin, I'd understand that the theory behind those songs is still the same as any other band, but they are more difficult songs to master. But I'd be able to pick them up faster with the basics already under my belt.

## Determining Where to Start

Now that we have a lay of the land, let's figure out the best path for you. by considering questions I typically ask someone who wants to learn JavaScript:

### 1. What is your learning style?

I ask this first because, if you're firm in your answer, it makes the path forward much simpler.

Are you someone who likes to dive right in and figure it out as they go? Do you not care if that means you make a whole lot of time-consuming mistakes along the way? Are you okay with filling in the basics later?

If so, then jump right into a framework. Otherwise, you'll be bored by the fundamentals and the lack of bringing something practical to life quickly.

On the other hand, if you like to know _why_, or if you prefer to be precise in your decisions rather than flying by the seat of your pants, I'd suggest starting with the fundamentals.

### 2. Are you a beginner or an experienced developer?

If you feel proficient in another logic-based language (i.e. not [HTML](/wtf-is-html) or [CSS](/wtf-is-css)), you're likely in good enough shape to jump right into a framework. You should understand some of the inner workings of JS at runtime, as well as the syntax of the language itself, but you can pick those up along the way.

If you're a beginner and you have the tolerance to start with the basics, then I'd say we're still on the basics train at this point.

### 3. What are your goals?

I ask this question because sometimes there is some external motivation working against your learning style.

For example, if you're an impatient and aggressive learner, you're likely to start with a framework regardless of your goals. The next question then becomes more about choosing which framework to learn first.

It's trickier when you are a patient and methodical learner, but you're motivated to switch careers or land a new job because you don't like the position you're in today. In that case, it may be better to work outside your comfort zone and learn a framework first, as you'll have a better chance of landing a job faster.

### 4. Do you want to build websites or applications?

Building a website consists of creating (and styling) the elements seen on screen, while likely also providing admin users some means to edit those elements through a content management system.

Building an application means providing individual user views — where a user sees content specific to themselves. That typically means user authentication and lots of form submissions.

What I'm getting at here is whether you think you're going to prefer the front-end or back-end.

While it's possible that you could land a job in which you only work with the back-end of applications, you're unlikely to be able to build a complete application in JS without learning the front-end. And while it's possible you can build websites with JS without writing any Node code, you're probably going to have to touch it at some point.

Therefore, this isn't a question of _either-or_, but rather _where to begin_. My recommendation here is typically that you'll know if you want to start with Node (back-end, server-side). If you don't know, start with the front.

## How to Start Learning JavaScript in 2020

Hopefully you have a more clear understanding of _where_ you want to start. Now let's consider _how_ to start. To do so, we'll bring it back to the two camps of learning.

### How to Start with the Fundamentals

On the front-end, if you want to start with the fundamentals, I'd recommend checking out CodeAcademy's [Introduction to JavaScript course](https://www.codecademy.com/learn/introduction-to-javascript). Wes Bos' [Beginner JavaScript](https://beginnerjavascript.com/) is another great resource.

In both cases, if you're starting with the fundamentals of JavaScript but also don't know HTML or CSS, I'd also recommend at least getting your feet wet with both. [CodeAcademy has a plethora of HTML and CSS resources](https://www.codecademy.com/catalog/language/html-css).

If you're more interested in starting with the back-end, [CodeAcademy has a Node.js course](https://www.codecademy.com/learn/learn-node-js). [So does Wes Bos](https://learnnode.com/).

### How to Start with a Framework

If starting with a front-end framework, there's another big decision to make — which framework are you going to start with? There's a learning curve with each, and while you can jump from one to the other, you're likely to eventually settle into a groove in which you spend more time with one over the others. That may be because you land a job that prefers one framework, or it may end up being a personal preference. But you'll very likely write code with each of those frameworks — Angular, React, and Vue — at some point.

Rather than going through a comparison here, I'll point you to [this fantastic, 2020-based comparison of Angular, React, and Vue](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/). There are all sorts of criteria packed in there which you can use to make your decision. I recommend picking some criteria that you find important and choosing a framework based on that. It can be as simple as _number of GitHub stars_. That's okay. All you really need is a place to start.

As far as getting started, each of them have their own tutorials. Code Academy has tutorials on [React](https://www.codecademy.com/learn/react-101) and [Vue](https://www.codecademy.com/learn/learn-vue-js). [Wes Bos has a beginner React course](https://reactforbeginners.com/). I also highly recommend checking out [Frontend Masters](https://frontendmasters.com/) for an array of courses.

But, you now know the front-end doesn't stop there. While Angular tends to be fully-featured, React and Vue present only view layers. There are other frameworks built atop that provide the necessary features to build an entire application. That means if you're starting with React or Vue, you have another decision to make. Do you want to start with the framework's fundamentals, or use something built on top of them to create a fully-featured site or application?

My recommendation is that if you're already learning a framework to start, you might as well learn something that can get you closer to your end goal faster. In other words, if you want to go the React route, it may be better to start with [Gatsby](https://www.gatsbyjs.org/) for website-building or [Next](https://nextjs.org/) for more dynamic applications. The most popular Vue framework is [Nuxt](https://nuxtjs.org/). There are fewer in-depth courses for each of these options, so the best route in getting started is likely to view the documentation and tutorials available on each of their websites.

On the back side of things, start with Express. There is [a tutorial on their website](https://expressjs.com/) and [CodeAcademy has a course](https://www.codecademy.com/learn/learn-express).

## The Real Answer

Phew! That was a lot of information without a direct answer. That's because there is no right answer. Your learning path is about you.

And remember that this is just a place to start. If you feel like you made a wrong choice, then try something else. _Something else_ may end up being a different programming language. That's okay, too. Learning to write code isn't just about learning to write code, it's about learning what code you want to write.

I used PHP and WordPress as a way to apply the theory I had learned. I haven't written a line of PHP or worked with WordPress in seven years. I found a path that I preferred, so I left the foundation on which I learned to write code behind.

You don't have to know where you're going, but if you want to find out where you end up, you must begin.

If, after working through the sections in this article, you're still feeling uneasy and want to talk, [start a conversation with me](https://twitter.com/seancdavis29).
