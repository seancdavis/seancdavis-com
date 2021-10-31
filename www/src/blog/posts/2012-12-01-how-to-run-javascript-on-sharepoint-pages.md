---
title: How to Run JavaScript on SharePoint Pages
tags:
  - javascript
  - sharepoint
description: Here's a cool trick to run JavaScript on SharePoint 2010 wiki pages
  without editing the master page.
image: /blog/default/default-lime-02.png
---

A great way to extend SharePoint is to create what I like to call _mini applications_ -- run JavaScript on SharePoint pages. And the best part:  **you don't need to edit the master page**. Here's how you run JavaScript on a SharePoint 2010 wiki page:

## 01: Content Editor Web Part

Your JavaScript has to be loaded from a Content Editor Web Part. To add, go into page edit mode, then click _Insert_ > _Web Part_ > _Media and Content_ > _Content Editor_. Then click _Add_.

{% post_image
    alt="Add Web Part - How to Run JavaScript on SharePoint Pages",
    src="/blog/121201/Capture3.png" %}

Next, open the web part tools by editing the web part. There are a few different ways to load a script on your page. One way is to add a content link in your web part tools panel (_if you do this, the file has to live in the current site collection_). To follow my best practice of [_one file, one place_](/blog/edit-files-efficiently-in-sharepoint/) I suggest you go about this a different way.

With the web part tools open, click inside the Content Editor Web Part (the first time this area will read _Click here to add new content_). With the cursor blinking inside the web part, click the Format Text Tab above the ribbon, then HTML > Edit HTML Source.

{% post_image
    alt="Edit Web Part - How to Run JavaScript on SharePoint Pages",
    src="/blog/121201/Capture4.png" %}

This should bring up a blank dialog box titled *HTML Source*.

> Warning: if your dialog box is not blank, you are not editing the web part -- go back and make sure your cursor was inside the content editor when you selected Edit HTML Source.

{% post_image
    alt="HTML Source Dialog Box - How to Run JavaScript on SharePoint Pages",
    src="/blog/121201/Capture5.png" %}

You should load your JavaScript from this dialog box. You could drop your script file text right in this box, but following the best practice, if there is a chance you may reuse this code on another page, I would suggest instead linking a file that lives in a library in the current site collection or another.

Let's say you are using jQuery in your file and you need to load that JavaScript library as well. You would drop this code into your HTML Source dialog box:

```html
<script src="[LINK TO JQUERY LIBRARY]" type="text/javascript"></script>
<script src="[LINK TO YOUR JS FILE]" type="text/javascript"></script>
```

Chances are you don't want to see your Content Editor on your web page. You can hide the web part while still loading the script by opening the web part tools (editing the web part), then choosing _Appearance_ > _Chrome Type_ > _None_. Click _OK_.

{% post_image
    alt="Hide Web Part - How to Run JavaScript on SharePoint Pages",
    src="/blog/121201/Capture6.png" %}

## 02: Setting Up Your Page

It's more than likely if you're loading a JavaScript file on the page you are going to be working with the body of the page (as opposed to master page elements). I suggest building yourself a static `div` on the page to use in your script.

To do this, ensure your page is in edit mode, then click the cursor is outside the content editor web part. Choose _Format Text_ > _HTML_ > _Edit HTML Source_. This will load a dialog box with some content (you may notice a div you didn't add -- this is the content editor web part). Wherever you'd like, add your div with an associated id or class to call.

```html
<div id="[YOUR ID]" class="[YOUR CLASS]"></div>
```

## 03: Custom Styles

If you are creating custom elements with your script, you probably want to style them. Granted, elements will be styled by default, but you may need to go above and beyond that with some custom styles.

There are a few ways to accomplish this. The first is to drop your styles in the same Content Editor Web Part (or a new web part) between two style tags:

```html
<style>
  /*[YOUR CUSTOM STYLES]*/
</style>
```

A better way to accomplish this is to use an alternative stylesheet (still doesn't require editing the master page). You do need to have publishing features turned on. Go to _Site Actions_ (top left corner) > _Site Settings_ > _Look and Feel_ > _Master Page_. Scroll down to the _Alternative CSS URL_ section and add the URL to a custom CSS file. Click OK.

{% post_image
    alt="Alternative CSS - How to Run JavaScript on SharePoint Pages",
    src="/blog/121201/Capture7.png" %}

> You obviously need to have a CSS file already created and saved somewhere on your SharePoint server. Again, I suggest keeping the [_one file, one place_](/blog/edit-files-efficiently-in-sharepoint/) practice in mind.

It's important to keep in mind a couple things. First, this stylesheet is loaded after all the default SharePoint CSS files. Therefore, you are able to change the default SharePoint styles in this CSS file. Second, without editing the master page, you are only allowed one alternative CSS per site collection. If you're using this stylesheets for many purposes, ensure you're keeping it nice and organized with comments.
