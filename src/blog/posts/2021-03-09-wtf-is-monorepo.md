---
title: "WTF is a Monorepo?"
description: "Have you heard this term thrown around but not really sure what it means. Well, let's take a quick introductory look at it."
image: /blog/210309/wtf--monorepo.png
tags:
  - wtf
---

If you've heard the term "monorepo" and are confused, it's okay. There's actually not that much to it. As the name suggests, it simply means _one repo_. In a monorepo, all the code for a project and its related items go into one repository.

## Examples of Monorepos

Guess what!? You're looking at a monorepo (or the result of one) right now! [The code for this site](https://github.com/seancdavis/seancdavis-com) is a monorepo. I did this because I was running into issues with example code falling out of date and developers having trouble with it. I don't pay _super_ close attention to those examples, but it's nice that they are in this space with everything else and it can be apparent when there is an issue with one of them.

I still build some projects separately when there is a reason, but I'm slowly bringing more into this repo to make it easier to manage.

At Grouparoo, [our main product is a monorepo](https://github.com/grouparoo/grouparoo). But [the website is in a separate repo](https://github.com/grouparoo/www.grouparoo.com). That was because the two were unrelated — the website isn't the product. But we may change that in the future.

And for a bigger example, here's a great article on [_Why Google Stores Billions of Lines of Code in a Single Repository_](https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext). Google's monorepo is believed to be the biggest in the world.

## Benefits of a Monorepo

It might seem silly, but a monorepo can have several benefits, including:

- Dependencies are easier to manage. That becomes even more so the case with tools like [PNPM](/blog/wtf-is-pnpm) or [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/), which are built to support monorepos. Using the right tools means you can have the same versions of dependencies across all your projects.
- Confidence that _all_ the code is working. When everything is in one place, if you've written solid test, you can have the confidence that even a large-scale refactor won't result in bugs you've already covered in tests.
- Sharing code is easier because all the code is in the same place. So you don't have to install dependencies or link local packages. It's all right there!
- When using an issue tracker like GitHub issues, it can be easier to have everything in one place. When there are multiple repos, one change could mean PRs and closing issues in several different places.

## The Hard Parts

The biggest issue I see with monorepos is in their ability to scale, especially when it comes to build tools. If trying to manage dependencies across several projects, it can be time-consuming to make everything work. For me, at my scale with this project, that has yet to be an issue.

Larger teams sometimes run into an issue that there isn't a good way to control access at the project level, since all projects are included in the repo. I haven't worked on a team where that's been an issue.

## It's Not a Monolithic Application

One last thing before we go. It may be confusing because the terms are so close to one another, but a monorepo is not a monolithic application. A monolithic app is one that contains a front-end and a back-end in the same application. [WordPress](https://wordpress.org/download/) is a great example of that. The application that is the CMS is also the website itself.

A monolithic application is concerned with _how the code runs_, while a monorepo is about _how the code is stored_.
