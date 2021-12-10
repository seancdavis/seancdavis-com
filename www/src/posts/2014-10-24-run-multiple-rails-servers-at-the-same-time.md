---
title: Run Multiple Rails Servers at the Same Time
tags:
  - ruby-on-rails
description: It's annoying to shut down and start up your Rails server when
  jumping between projects. Learn how to run multiple servers at the same time.
image: /posts/default/default-green-03.png
---

If you jump between multiple Rails projects frequently, you probably get annoyed shutting down servers and starting them up again, and shutting them down, and starting them up again.

You start your Rails server like so (as I'm sure you know):

    $ bundle exec rails s

That makes your application available at [http://localhost:3000](http://localhost:3000).

Additionally, you can run another Rails server from another project on a different port by passing it the `-p` argument. Let's say we want to start the server on port 3001.

    $ bundle exec rails s -p 3001

Now this application is available at [http://localhost:3001](http://localhost:3001).

---

Alternatively, check out [Pow](http://pow.cx). I love the concept of it, but I ran into too many issues and just went back to the old-school, command line approach.
