---
title: The Biggest Bug
description: "Programmers spend so much time architecting the perfect codebase, when the code itself relies on a system that is inherently flawed."
image: /blog/170313/the-biggest-bug.png
attribution:
  - name: Markus Spiske
    url: https://unsplash.com/@markusspiske
    license: Unsplash
tags: []
---

There’s a powerful term in computer [programming](https://hackernoon.com/tagged/programming) called [_coupling_](https://en.wikipedia.org/wiki/Coupling_%28computer_programming%29).

Modern code is modularized to make it easier to read, write, and maintain. But for the overall system to work properly, these modules likely have to [communicate](https://hackernoon.com/tagged/communicate) with one another and work together to benefit the greater whole. That’s where coupling comes into play. As Wikipedia reads:

> **Coupling** is the degree of interdependence between software modules.

Consider an example where we’re building a program to handle school exams. We’d probably have _Question_ and an _Answer_ modules. If Answer depends on too much of the Question, it makes the program fragile. For example, say Answer knows the order in which the questions are presented. If that order changes, you may possibly break the Answer module. In that case, Question and Answer are tightly coupled together.

Therefore, the goal in modularized (or [_object-oriented_](https://en.wikipedia.org/wiki/Object-oriented_programming)) programming is building modules that are _loosely_ coupled, or _decoupled_.

When programmers write code, that code is coupled with the language in which it’s written. That makes sense, right? The more we know about the language, the more tools we have at our fingertips to make the code work.

For those languages to work as expected, they have to form opinions and make assumptions. One such decision languages make is how dates and times work. You _could_ say most programming languages are coupled to time. Or, using the [transitive property](http://www.mathwords.com/t/transitive_property.htm), much of the code we write is coupled to time.

And time might just be the world’s biggest bug.

The [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) we use today calculates the average year as 365.2425 days long. It has an error of [about 27 seconds each year](https://www.timeanddate.com/date/perfect-calendar.html), which is about a day every 3,000 years or so.

In other words, the way in which we calculate dates and times is not fully correct. And yet, in so much of what we do, we assume it is. If we were to create a more accurate calendar ([the Persian calendar is closer](https://www.timeanddate.com/calendar/persian-calendar.html)) that changes the basic behavior of how we assume dates and times work today, much of our code will be broken.

[And that’s why you always decouple your code.](https://youtu.be/eNZsWIzEhP4)

---

_If this sounds dramatized, it is. This won’t actually affect any of us today._
