---
layout: content-feed
title: Videos
eleventyComputed:
  title: "Videos{% if pagination.pageNumber > 0 %} (Page {{ pagination.pageNumber + 1 }}){% endif %}"
description: Quick tips and guided tutorials to help you on your coding journey, without forgetting to have some fun along the way.
permalink: "videos/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.videos
  size: 10
seo:
  image: pages/seancdavis--meta--blog.png
---
