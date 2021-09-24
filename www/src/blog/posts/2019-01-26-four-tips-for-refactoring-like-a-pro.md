---
title: 4 Tips for Refactoring Like a Pro
description: "Refactoring should be part of the code writing process, including the best developers. Here are four tips for working refactoring into your process effectively and efficiently."
---

Refactoring code is an essential part of the development process. While you're likely to get better at writing good code on the first pass as you _develop_ your development skills, refactoring should always be part of the writing process.

Even the best developers can't know how they're going to solve all their problems before they start writing a single line of code for a new project. Instead, they design a system (or solution) to the best of their abilities with the information they have available at that time. And they constantly refactor as they learn new information about the problem(s) they are solving.

To be a great developer you will need to develop the skills to write good code on the first pass. But that's only part of what it takes. You must also understand not just how to refactor, but how to refactor _effectively_ and _efficiently_.

Here are four tips to help you get to the next level when you're refactoring:

## 1. Refactor on the fly

Refactoring entire systems or major parts of a system can be a behemoth of a task. I've set out to do just that on a few occasions and ended up rewriting the project entirely. That's because, at some point, refactoring becomes inefficient. As an application reaches a certain size, refactoring becomes more like _rewriting_. And while rewriting has its place, that's not what we're here to discuss.

Instead, try _refactoring on the fly_. Don't make an entire project out of refactoring. Just work refactoring into every task (or _most_ tasks) you have. Do it one file at a time. If you are given a task in which you have to touch a few files to either add a new feature or fix a bug, why not look at the entire file and see if you can write it a little cleaner.

By taking this approach you eliminate (or at least _reduce_) the need to sell a refactoring project to your team or client. (Clients tend to dislike paying for refactoring because it's difficult to see the value in the end result, typically believing you should have done it well the first time.)

The trick here is to balance the amount of time you spend refactoring. While it takes practice to move efficiently, you won't want refactoring to be 80% of the time you spend on every task. If your task was to fix a bug that required changing a single line of code, it probably doesn't make sense to refactor the entire file. You may just want to fix the bug and wait for a bigger change to employ your refactoring abilities.

## 2. Convert functional(-like) code to object-oriented code

Many times I've come across code that was written in haste during its first pass. _In haste_ often means functional-like programming, in which there is a function or a set of functions (sometimes in the global namespace) that are procedural and not well designed. The classic case is opening a JavaScript file to find a series of global, generically-named functions that operate procedurally by passing values from one function to another down the file.

When you have the opportunity, consider moving to an object-oriented approach. Either that, or at least scope the contents of a single file to that file, when possible.

Making code object-oriented makes it easier to test and easier to debug in the future. This is because you have _objects_ that have _states_ and you can easily create an object, manipulate its state and test that it behaves the way you'd expect.

_Bonus Tip:_ Don't get hung up on the [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) of the object you're creating. If you follow the _refactoring on the fly_ approach, then you should expect your object's DSL to change over time. Naming is hard, and it's best to just pick a name you think makes sense and continue refactoring as you go.

## 3. Refactor main program separate from tests

I spent years developing before I had the appreciation to write solid tests. And that appreciation came when I started making small changes to a large application to fix a minor bug. By fixing one bug (without understanding the entire application), I'd introduce three new bugs. Finally, I understood. Testing was like a safety net. **If I wrote really solid tests**, I'd be able to refactor code without worrying that I'd introduced regressions (bugs).

So, first thing is first: Write a really solid test suite. I don't mean 100% coverage. [DHH](https://en.wikipedia.org/wiki/David_Heinemeier_Hansson) (creator of the [Ruby on Rails](https://rubyonrails.org/) framework) [says it well](https://signalvnoise.com/posts/3159-testing-like-the-tsa):

> I get paid for code that works, not for tests, so my philosophy is to test as little as possible to reach a given level of confidence (I suspect this level of confidence is high compared to industry standards, but that could just be hubris). If I don’t typically make a kind of mistake (like setting the wrong variables in a constructor), I don’t test for it.

In other words, be smart about the time you spend on testing and the tests you write. And once you have a solid test suite, you can refactor with confidence, because all you have to do is run the tests to see if the code you've changed is going to break a part of the system.

Sometimes we want to refactor the tests themselves. That's okay. That's good, actually. Keeping a smooth-running test suite is critical to staying motivated to continue writing tests. But you should refactor test code separate from refactoring application code.

When you refactor application code, it works like this:

1. Ensure all tests are passing.
2. Refactor application code.
3. Fix broken tests.
4. Commit changes.

When it's time to refactor test code, it works similarly:

1. Ensure all tests are passing.
2. Refactor test code.
3. Fix tests written incorrectly.
4. Commit changes.

In this last example, sometimes refactoring test code can actually help you uncover bugs you didn't notice before because the test was written to cover it or wasn't written well. I still wouldn't fix the bug, but add an asterisk to Step 3 and Step 4 in that you can commit broken tests for the tests that are fixing old tests or filling in their gaps. Then, after the commit, go fix any bugs in the code you identified through the process.

## 4. Code doesn't have to be perfect

This is the most important piece of advice I can give you when it comes to refactoring.

Refactoring is a process. Like I mentioned in #2 and #3, spending too much time worry about naming or test coverage is inefficient. Make a decision, write the code, then move on. If you follow #1 and refactor on the fly, you'll have the opportunity to make your current work better at some point in the future.

Understand that this process repeats itself over and over again until you stop working on a project, or until you finally make the decision that a rewrite is in order.

Your code doesn't have to be perfect because it's probably going to change. Whether you spend one hour or 100 hours mapping out some object and its methods, you're still going to refactor it in the future. Spend the one hour now and make refactoring a part of your process.

---

With that, it's time for me to go — I just got the itch to go clean up some code. You should go do the same.
