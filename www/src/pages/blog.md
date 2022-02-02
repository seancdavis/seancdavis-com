---
layout: content-feed
title: The Blog
eleventyComputed:
  title: "The Blog{% if pagination.pageNumber > 0 %} (Page {{ pagination.pageNumber + 1 }}){% endif %}"
description: Thoughts, ideas, and tutorials to help developers build better websites, without forgetting to have a little fun along the way.
permalink: "blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.blog
  size: 10
seo:
  image: pages/seancdavis--meta--blog.png
---
