---
title: Hide Recently Modified Panel in SharePoint 2010
tags:
  - css
  - sharepoint
description: The recently modified panel is annoying. Here's how you hide it.
---

By default, as you edit pages in SharePoint 2010, the Recently Modified panel appears above your local navigation. To hide it, add this code either to your [site collection's alternative CSS](/blog/add-custom-css-to-sharepoint-2010-without-master-page/) or place it in a [content editor web part](/blog/edit-files-efficiently-in-sharepoint/).

```css
.s4-recentchanges {
  display: none;
}
```
