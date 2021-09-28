---
title: Two Methods for Writing Better Code
description: "Take yourself to the next level in any programming language by using the powers and talents of those that have come and done before you, and by reflecting those powers back on others who will come after you."
---

If you are like most developers, you know why you wrote the code you in the way you did. You know what it does and how it works (hopefully). You know why you chose the names you did. You know why it is organized in the way it is. Maybe you haven't considered every approach, and sure, you could always have written it better, but you know how it works and that's enough.

And if you're like most developers, when you jump into another developer's code, it's an entirely different story. How well and how quickly you're able to understand another dev's code involves:

- Your experience with the programming language
- The context in which the code was written
- The quality of the code

When you look at someone else's code, you rarely are afforded the luxury of context—of knowing the decisions the developer(s) made and why they made those decisions. That's because most developers write code in the silo of their own brain—which is expected and totally fine—even when working on a team. Sometimes you'll have the benefit of a well-documented pull request, or maybe even sitting down with the original developer to talk through their work. Still, you're not going to know every decision the developer made.

To understand another developer's code, there needs to be some combination of your experience with the language and the quality of their code (which you can't control). The more experience you have in the language, the faster you can understand code you didn't write in that language. And the cleaner the code is—_clean_ being that the author followed typical idioms and practices accepted by the community—the faster you'll be able to understand it.

We know this situation to be true, so how do you use it to help yourself write better code? In two ways:

1. Read other developers' code, even when you don't have to.
2. Consider what it would be like for someone to read your code while you're writing it.

I was intimidated the first time I went looking through an open source repository trying to track down a bug. The repository represented a [Ruby gem](https://en.wikipedia.org/wiki/RubyGems) (a Ruby package/library), and I had no idea how the files were connected to one another or how the program I was writing used those files. But as I became more comfortable with Ruby as a language, I found myself digging into other developers' code more frequently.

While not all packages are created equal \[insert joke\], many popular open sources packages are supported by talented developers in the community and are well-written and well-maintained (meaning they continue to get better over time). Digging into well-written open source code has helped me understand even the shittiest of code enough to fix a bug in my program, or to help the original developer fix a bug, or to simply help the original developer get a little better at writing code.

Spending time reading and understanding others' code is one of the absolute best methods for getting to the next level of a programming language.

Because of all the time I've spent _reading_ other's code, now when I _write_ code, I constantly think about what it would be like for another developer to come in blind, with no context to the problem or the decisions I'm making, and try to understand how my program works. I want the advanced developer to understand everything I'm doing almost immediately upon looking at it. And I want the novice developer to find a new pattern or some inspiration they can take back to their code and make it better.

So, keep (or _start_) **reading** other programmers' code, even when you don't understand it. (Most of) It will eventually click and make sense. And when you **write** code consider what it'd be like to be the developer who comes in blind and has to read your code. Make it easy for that person.

Put these two practices into play constantly, and you will very quickly find yourself advancing as a developer.
