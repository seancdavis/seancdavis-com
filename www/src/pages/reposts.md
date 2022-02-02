---
layout: content-feed
title: Reposts
eleventyComputed:
  title: "Reposts{% if pagination.pageNumber > 0 %} (Page {{ pagination.pageNumber + 1 }}){% endif %}"
description: Content I've written for other blogs.
permalink: "reposts/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.reposts
  size: 10
seo:
  image: pages/seancdavis--meta--blog.png
---
