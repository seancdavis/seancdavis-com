---
title: Remove HTML Extension And Trailing Slash In Nginx Config
description: When you have a static site, sometimes you want to get rid of the
  HTML extensions and those pesky trailing slashes. Here's how I've done it.
tags:
  - nginx
image: /posts/default/default-green-02.png
---

Static websites are back in gaining popularity, even in these days where everything can be driven by a database. With tools like [Middleman](https://middlemanapp.com/) and [Jekyll](http://jekyllrb.com/), web developers have the ability to build fairly complex sites and render them as individual, static files.

I've jumped aboard that train. And while the question as to _why_ I did it deserves its own article, I can say the main motivation for me is speed and cost.

I've been transferring a few of my sites to static files using Middleman. To maintain consistency, I wanted to remove all `.html` extensions and trailing slashes. And while that's a functional benefit, I also like it better cosmetically.

## Remove [HTML](/posts/wtf-is-html/) Extension

There are a few different ways to go about removing the `.html` extension. I've found the following to work just fine:

```nginx
server {
  rewrite ^(/.*)\.html(\?.*)?$ $1$2 permanent;
}
```

Then we have to make sure Nginx knows what files to look for, and for that we use the `try_files` directive. We'll look for a file with the current `$uri` and an `.html` extension, and if no file exists, we check for a directory with that name and serve the index. Otherwise, we render a `404` error.

```nginx
server {
  rewrite ^(/.*)\.html(\?.*)?$ $1$2 permanent;

  index index.html;
  try_files $uri.html $uri/ $uri =404;
}
```

## Remove Trailing Slashes

After that first step, we have a URL without a `.html` extension. However, if the file of interest was an `index.html` file, it could still be accessed via the name of the parent directory with a trailing slash.

For me, for example, I was getting a URL at [https://example.com/page/2/](https://example.com/page/2/), but I didn't want the trailing slash.

We have to remove the trailing slash _after_ we have removed the `.html` extension.

The gotcha here is that we have to alter the `try_files` directive to look for an `index.html` file _first_.

```nginx
server {
  rewrite ^(/.*)\.html(\?.*)?$ $1$2 permanent;
  rewrite ^/(.*)/$ /$1 permanent;

  index index.html;
  try_files $uri/index.html $uri.html $uri/ $uri =404;
}
```

## Pulling It Together

To pull it all together, I'll share a slightly-altered version of my config for this site.

```nginx
server {
  listen   80;
  server_name example.com *.example.com;

  rewrite ^(/.*)\.html(\?.*)?$ $1$2 permanent;
  rewrite ^/(.*)/$ /$1 permanent;

  root /path/to/project/root;
  index index.html;
  try_files $uri/index.html $uri.html $uri/ $uri =404;

  error_page 404 /404.html;
  error_page 500 502 503 504 /500.html;
}
```

_A quick thanks to Jason Garber for his note on [falling back to `$uri` within the `try_files` directive](http://sixtwothree.org/posts/nginx-configuration-removing-html-file-extensions-and-trailing-slashes)._
