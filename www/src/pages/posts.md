---
layout: content-feed
title: All Posts
eleventyComputed:
  title: "Posts{% if pagination.pageNumber > 0 %} (Page {{ pagination.pageNumber + 1 }}){% endif %}"
description: |
  Written content to help you along your web development journey, without forgetting to have some fun along the way.
permalink: "posts/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.posts
  size: 10
seo:
  image: pages/seancdavis--meta--blog.png
  description: Written content to help you along your web development journey, without forgetting to have some fun along the way.
---
