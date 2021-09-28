---
title: "Why are security questions still a thing?"
description: "The motivation to provide an additional layer of security beyond an email-password combination is a noble one, but ..."
image: /blog/170303/security-questions.png
attribution:
  - name: Matthew Henry
    url: https://unsplash.com/@matthewhenry
    license: Unsplash
tags: []
---

The motivation to provide an additional layer of security beyond an email-password combination is a noble one. As annoying as it may be to a user, these layers of security exist to protect us.

Yet, more often than not, the vehicle for delivering this theoretical layer of security is a series of [security questions](https://en.wikipedia.org/wiki/Security_question). While this second layer of security is beneficial, implementing it via _security questions_ doesn’t make any sense.

Why?

**The answers are not always private.** We live in an age where our younger generation’s entire lives are catalogued on the internet. So, things like _Your mother’s maiden name?_ or _The make and model of your first car?_ or _Your first pet’s name?_ or _The last name of your third grade teacher?_ That information is becoming essentially public.

**The answers are usually short.** A pet name, a human name, the make and model of a car. These are (usually) short words. Short words are easy to guess. [Short passwords are not good](https://xkcd.com/936/).

**The answers are limited.** Similarly, in thinking about entropy, the answers to these questions are limited. Brute force attacks can happen so much faster because the number of possible answers is so limited to one particular category.

**The answers are difficult to remember.** _What street did you grow up on?_ Let’s say it’s, “Martin Luther King, Jr., Ave.” Hmmm ... I don’t like writing all that, so sometimes it’s _MLK Jr. Ave._, but recently I haven’t been using periods. Oh, and there was that one stretch in my life when I chose to abbreviate _avenue_ as _AV_. In other words, the answers aren’t easy to remember even when you know the answer.

**The answers are meant to be memorized.** We now have these awesome tools like [LastPass](https://www.lastpass.com/) and [1Password](https://1password.com/) that can generate and store passwords for us. And while they _could_ be used to store security answers, they aren’t really built for it and don’t make it super easy. But isn’t that the thing with security questions, you’re supposed to _know_ the answer! The great thing about tools like LastPass and 1Password is that you don’t have to know the password. Instead, every password can be different and difficult to guess.

---

We live in an age when more and more of our sensitive data is stored online. We need a better system for a second layer of protection from that data. Security questions are not the answer. We’d be world’s better off if the second layer were simply a second password.

Why are security questions still a thing?
