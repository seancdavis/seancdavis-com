---
title: New Developers Shouldn't Focus on Writing Tests
description: You wouldn't open an insurance plan on your dog house, would you?
tags:
  - testing
image: /blog/default/default-blue-03.png
---

Being a new developer is wild and crazy.

There's so much information. So many questions.

_Where should you start? What should your focus be? What are the best resources for learning? How do you get a job? What kind of job should you be looking for?_

I remember being a new developer, although it feels like a lifetime ago. I built a few WordPress sites and plugins as a hobby before landing a job as a [Ruby on Rails](https://rubyonrails.org/) developer.

I was still new to WordPress when I started that job, and I knew virtually nothing about Ruby or Rails. So I used [Michael Hartl's book](https://www.railstutorial.org/book) to get me up to speed as fast as possible.

I dove in deep and flew through the first two chapters. Then I hit Chapter 3 (of 14), in which Mr. Hartl brings testing (and test-driven development, or _TDD_) into play. It felt important — I was still near the beginning of the book, after all. And I didn't know much about programming, Ruby, or Rails, so I learned to write tests. Not just that, but I learned to write tests _before_ I wrote methods.

The problem was I didn't really know how to write methods. I was fumbling my way through models, controllers, and views, trying to get the simplest concepts to work. And by writing tests, and writing them _first_, I was significantly increasing the time it took to bring something to life. I'd write a test, then write the application code, then realize it was all wrong, and repeat the process again.

It was painful. And in recognizing that TDD was a big part of that pain, I ditched it entirely. By doing so, I started moving faster and faster. I was loving what I was doing. I knew there was value in testing, but I was so jaded by my experience that it would be years before I came back to it.

---

Hear me right: **Testing is extremely beneficial**. Production applications should have a solid test suite. But, testing is not for _new_ developers.

I like to think of testing as _insurance_, like home owner's insurance. Home owner's insurance protects me from unplanned damage to my house — from wind, rain, tornadoes, flooding, etc. Writing tests protects me from ... well, me (and other contributors). If I make a change to an application I haven't touched for a year and then run the test suite, I'll know if I broke something else (assuming I wrote the tests well).

But a new developer isn't concerned with building a house. They don't even know what a hammer is. They're learning how to use a saw and a tape measure. And when they get a grasp of the tools, they aren't going to jump right into building a real house. They're going to build a dog house or a tree house or a wood shed. Those things (most of them, anyways) don't need insurance.

Now, that's not all developers. Some get thrown to the wolves right away. They don't necessarily have to build a house on their own, but they may be asked to hang a door or run ductwork. In that case, they likely have a foreman looking over their work, _testing_ their work. In the dev world, maybe that looks like letting the new developer write the code and then pairing on the testing portion of it.

I've found it beneficial to teach new developers how to test _manually_ — directly through the browser or command line. That promotes focusing on an attention to detail, as the dev will have to work through their code every time they make a change. _Efficient?_ No. _Easy?_ Yes. There are enough barriers for the new developer to overcome. Writing programmatic tests doesn't have to be one of them.

---

It took me years before I started writing tests again.

_Do you know why I got back into it?_

Because I was got burned. And then burned again. And then again.

I was spending a good amount of my time fixing features I'd built a year ago, only to break something else in the application. Had I written tests, I would have been protected. I would have significantly reduced the amount of time spent bug squashing and reworking code.

What I should have done — what any new developer should do — was to first learn how to work with the appropriate language, tools, frameworks, etc. Then I should have built a few projects on my own, for fun. Perhaps a little recipe book app — something that already exists, but that I could put together simply, for me. After building a few super simple apps (for myself) and getting comfortable in the dev space, I should have _then_ begun diving into testing as I launched apps that I'd been paid to build.

Learning to write code is hard. Really hard.

_Overwhelming_.

And the more tools we build to _empower_ developers, the more overwhelming we make it to enter the industry.

So, let's at least make one thing a little easier on those new devs. Promote manual testing first, while the new dev focuses on the core of the tools and frameworks they are going to work with. Then, once that new dev is moving along, introduce them to testing. Show how it will save them in the long run. The result will be better code, a more solid application, and a happy developer.
