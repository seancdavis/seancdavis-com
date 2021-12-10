---
title: Add Custom JavaScript and Stylesheets from SharePoint Master Page
tags:
  - css
  - javascript
  - sharepoint
description: You can add JavaScript and CSS files to your master page if you
  want to overwrite some default styles or add some functionality via a new
  script.
image: /posts/default/default-green-02.png
---

I just finished authoring a post on [how to dynamically add javascripts and stylesheets to a website](/posts/dynamically-add-javascript-and-css-files-to-your-website-using-javascript/). The purpose of this post is to elaborate and discuss the previous post in the context of SharePoint.

There are a few different methods to adding custom [CSS](/posts/wtf-is-css/) and JS files to your SharePoint site. I've previously discussed how to add a [CSS file without touching the master page](/posts/add-custom-css-to-sharepoint-2010-without-master-page/), but that only accounts for a single, CSS file. I've also discussed [how to add a JavaScript file to a single wiki page](/posts/how-to-run-javascript-on-sharepoint-pages/). If you want to add a few more files, and if you want to include JavaScript files on every page, then you're going to have to dig into the master page, but not too much.

Some great advice I've received is **edit the master page as little as possible**. The reason for this is twofold. First, it's not the easiest thing in the world to deploy a change, and it's hardly worth it for adding a single line, like a new stylesheet. And second, master pages have been famous for not surviving upgrades well.

> Edit your master pages sparingly, and document your changes.

Therefore, a decent method for adding custom JS and CSS files is [using the method I've linked above](/posts/dynamically-add-javascript-and-css-files-to-your-website-using-javascript/). And when you do so, just make sure you add it to the bottom of your `<head>` section of your master page, so your files overwrite the inherent styles.

Finally, you'll notice I've not gone into detail about how to accomplish this. I assume you know how to edit the master page, and there are plenty of resources out there if you don't. [Here's a good place to start](http://office.microsoft.com/en-us/windows-sharepoint-services-help/create-or-edit-a-master-page-HA010157775.aspx).
