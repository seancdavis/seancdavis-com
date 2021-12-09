---
title: Log Output During Long-Running Processes
description: Long-running processes can appear to hang when you aren't given
  feedback. So let's give some feedback.
tags: []
image: /blog/default/default-pink-02.png
---

Often as a programmer I'm tasked with (or task myself with) writing ad hoc scripts or small projects for a one-time need. My most recent example was moving thousands of records from an old CMS to a new CMS, while maintaining associations and transforming the data in the process.

Tasks like data migration and transformations can get big fast and when running. They can appear to hang when really they are doing some heavy-lifting work behind the scenes. It can be difficult to know which is which if you don't provide yourself any output.

So, do it -- add logging to long-running processes. (Really they don't _have_ to be long-running. You can add logging to any process.) Getting feedback is crucial to knowing what's happening within the bowels of your task-runner.

I often make my logging semantic. Say I'm migrating user data, maybe that feedback looks like this:

    --- USER: Jenna Maroney ---
    Exporting ... Done.
    Transforming ... Done.
    Importing ... Done.

    --- USER: Mickey Rourke ---
    Exporting ... Done.
    Transforming ...

But on my most recent task there was enough data I didn't need to be printing out explicit information. I just needed to know if what I was doing worked or didn't work. So I used colored dots. If the process worked, I printed a green dot. If not, the dot was red. I concurrently collected the error in a temporary file that I could analyze after the script was done running.

---

Feedback during these processes can be super helpful. They let you know that something's actually happening. And then can also help you debug your code by figuring out where the issue is by looking at which message was the last to print to the console.

So add that feedback!
