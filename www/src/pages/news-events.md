---
layout: content-feed
title: News & Events
eleventyComputed:
  title: "News & Events{% if pagination.pageNumber > 0 %} (Page {{ pagination.pageNumber + 1 }}){% endif %}"
description: "Your pulse for front-end development: The latest announcements, along with upcoming conferences and meetups."
permalink: "news-events/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.news_events
  size: 10
seo:
  image: pages/seancdavis--meta--blog.png
---
