---
title: Free Alternatives to GitHub for Private Git Hosting
tags:
  - bitbucket
  - git
  - github
  - gitlab
description: "GitHub is super awesome, until you have to start paying for it. Check out two feature-full and FREE alternatives."
---

I really don't think there's any doubt that [GitHub](https://github.com/) is the absolute best application for git hosting. I personally love everything about it.

Okay, not _everything_.

When you start adding private repositories, it gets [really expensive really fast](https://github.com/pricing).

This might be fine for people who spend most of their time writing for a few proprietary projects. But, my guess is if you're reading this you don't fall into this bucket. I assume _you need to host several private git repositories for little or no money_.

It's a fair problem. After all, we're developers -- why pay for something when a similar alternative is available for free?

## A Reference

First, there is a [page dedicated to keeping an updated list of git hosting applications](https://git.wiki.kernel.org/index.php/GitHosting). The key piece of information here is the last column, which shows you whether or not it has free hosting for private repos.

Notice on this list how few options there are for free private hosting. As it goes, _that's where they get you_. And, while there are more than two, I want to focus on two, as I find them to both be good and valuable options.

## Bitbucket

[Bitbucket.org](https://bitbucket.org) has been around a long time. Originally, it was dedicated to hosting SVN repositories, but has taken to hosting git, and it works nicely doing so. It was built and is maintained by [Atlassian](https://www.atlassian.com/), who has created many popular project management tools, including their bread and butter, [Jira](https://www.atlassian.com/software/jira).

Bitbucket has **unlimited private repos with up to five collaborators**. [Pricing](https://bitbucket.org/account/user/seancdavis/plans) starts at more than 5 users and follows the \$1/user as you add more users. I find this pricing approach to be nice and inexpensive for smaller teams with a large number of repositories. It is for this reason my agency uses Bitbucket for our projects.

I should also note one thing I've always found interesting. Issue tracking is one of the main components to Jira, which is a paid product. I was surprised to learn Bitbucket had any issue tracking with how inexpensive it is. I'm not currently using Jira, and I can tell you that you can get by with a _decent_ workflow using just Bitbucket's issue tracker. In other words, _it's not bad_.

## GitLab

I've been using [GitLab](https://about.gitlab.com) for a long time. GitLab began as an open-source alternative to (and based on) GitHub. Up through sometime in version 6, GitLab was most valuable as a _self-hosted application_. In that regard, it's _not necessarily_ free, but still inexpensive. I've been using GitLab in this way since 2013, and it works great for me. I have it on a \$10/month [Digital Ocean](https://www.digitalocean.com/) server. I like having all my code hosted in my own space that I manage, but that's just me.

Since I began self-hosting GitLab, they began to offer a [free, hosted version of their product](https://gitlab.com). This works well, and is a nice way to cut a few bucks every month.

There are two general concepts that make me like GitLab:

1. It is based on GitHub, and I prefer that look and feel to Atlassian's products.
2. It _seems_ to be the group's main source of income, so they tend to push feature updates frequently. It also seems to still maintain that open-source mentality.

And more specifically, the Wiki and Issue Tracker work at least as well as Bitbucket's, but we can be sure they will continue to be enhanced over time.

## So, which one?

Right, so which one is better? It's difficult for me to say. I use GitHub, Bitbucket and GitLab on a regular basis, and I like them all. They all have loads of pros and limited cons. My advice to you would be to put a project on Bitbucket and another on GitLab and try them both out, then make the full move.

But, no matter which one you choose, I still suggest all your open source projects be hosted on GitHub.
