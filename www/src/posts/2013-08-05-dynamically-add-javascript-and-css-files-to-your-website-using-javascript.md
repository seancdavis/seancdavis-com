---
title: Dynamically Add JavaScript and CSS Files to Your Website Using JavaScript
tags:
  - css
  - javascript
description: When you can't use a JavaScript or CSS concatenater, this method
  can be useful for adding scripts and styles to your site on the fly.
image: /posts/default/default-lime-02.png
---

This is how we typically add JavaScript and [CSS](/posts/wtf-is-css/) files to websites:

```html
<script type="text/javascript" src="path/to/script.js"></script>
<link href="path/to/stylesheet.css" rel="stylesheet" type="text/css" />
```

## The Ideal Scenario

But, as your site gets super awesome, it can also get super cluttered. For example, with stylesheets, you're either going to have a giant, messy stylesheet, or (preferably) you're going to have a handful of (let's hope) nicely-organized stylesheets. The downside to that is the `<head>` section of your [HTML](/posts/wtf-is-html/) markup is going to get messy. That's not to mention that every request for a file, like a stylesheet, takes time and resources, and will slow your site down.

Ideally, you should compile these files into a single, manifest file. There are plenty of tools out there to help you with this. [Compass](http://compass-style.org/) and [Gulp](http://gulpjs.com/) are a couple examples.

And if you're using a server-side language to build your site (something like [Ruby](https://www.ruby-lang.org/) or [PHP](https://secure.php.net/)), you have even more tools available to you.

## Doing It On The Client Side (JavaScript)

If you can't make the ideal scenario happen, an okay option is to add these scripts and styles via a single script.

To do so, add something like this to the `<head>` of your document (hopefully you have a single *master page* or *header* file, so you only have to do this once):

```html
<script type="text/javascript" src="path/to/controller.js"></script>
```

You'll want to add this to the end of your `<head>` section, so it is the last script loaded.

_Note: There is a small chance of introducing an errors using this method. Because your scripts are being loaded in your head instead of at the end of your body, your page may not load if there is a JavaScript error. Also, be aware that other JavaScript files may be loaded after this if they are either loaded dynamically or are loaded at the end of the body._

Now, in your `controller.js` file, add this function:

`controller.js` {.filename}

```js
function loadFile(path, type) {
  if (type == "js") {
    var fileref = document.createElement("script");
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", path);
  } else if (type == "css") {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", path);
  }
  document.getElementsByTagName("head")[0].appendChild(fileref);
}
```

Below that function (in controller.js) you can call all your JS and CSS files, like so:

`controller.js` {.filename}

```js
// Stylesheets
loadFile("path/to/file.css", "css");

// Scripts
loadFile("path/to/file.js", "js");
```

Now your files should load no problem!

### Using jQuery

A somewhat cleaner method is to write the same function using [jQuery](http://jquery.com/ "jQuery"). To do so, your document `<head>` would need this markup:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="path/to/controller.js"></script>
```

Notice here we're loading the jQuery library first, so we can use it in `controller.js`. I'm loading this library from [Google Libraries](https://developers.google.com/speed/libraries/devguide "Google Libraries"), but you can certainly add it however you'd like.

Now, in the `controller.js` file:

`controller.js` {.filename}

```js
function loadFile(path, type) {
  if (type == "js") {
    $("head").append(
      '<script type="text/javascript" src="' + path + '"></script>'
    );
  } else if (type == "css") {
    $("head").append(
      '<link href="' + path + '" rel="stylesheet" type="text/css">'
    );
  }
}
```

And you would add your files in the same manner as before.

`controller.js` {.filename}

```js
// Stylesheets
loadFile("path/to/file.css", "css");

// Scripts
loadFile("path/to/file.js", "js");
```

As you can see, this is much cleaner, but unless you're planning to use the jQuery library throughout your JS code, it's not worth loading the entire library for this one function.

## Load Order

You can't always be sure how your browser is going to handle the load order of your scripts. If you're scripts have interwoven dependencies, then you may consider using a tool like [RequireJS](http://requirejs.org/) to ensure your scripts are loaded in the appropriate order.

---

**References**:

- [Dynamically loading an external JavaScript or CSS file](http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml)
