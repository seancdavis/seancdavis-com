---
title: Add Custom CSS to SharePoint 2010 without Master Page
tags:
  - css
  - sharepoint
description: Here's how you can add custom styles to a specific site collection in SharePoint 2010.
---

SharePoint 2010 provides a nice and easy way to add custom styles to your site collection without touching the master page. You can accomplish this on a page-by-page basis by adding your styles to a Content Editor Web Part's [HTML](/wtf-is-html) source between two style tags.

```html
<style>
  /*[YOUR CSS STYLES]*/
</style>
```

[This article](/how-to-run-javascript-on-sharepoint-pages.html) describes how to accomplish this in more detail.

I recommend instead you use the built-in Alternative CSS functionality. This way your CSS is loaded on every page in your site collection.

> To be able to use Alternative CSS functionality, you need to have publishing features turned on.

To get started, create your CSS file and save it in a library somewhere on your SharePoint server. I suggest using just one, organized CSS file for all site collections; saving it in one central location following the [one file, one place](/edit-files-efficiently-in-sharepoint.html) practice.

Next, go to _Site Actions_ (top left corner) > _Site Settings_ > _Look and Feel_ > _Master Page_. Scroll down to the Alternative CSS URL section and add the URL to a custom CSS file. Click OK.

{% post_image alt="alternative CSS", src="/blog/121202/Capture7.png" %}

It's important to keep in mind a few things. First, this stylesheet is loaded after all the default SharePoint CSS files. Therefore, you are able to override the default SharePoint styles in this CSS file. Second, without editing the master page, you are only allowed one alternative CSS per site collection. If you're using this stylesheet for many purposes, ensure you're keeping it nice and organized with comments.
