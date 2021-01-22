---
title: Remove the "www" from a URL with Nginx
tags:
  - nginx
description: "For SEO purposes, it's best to choose between www and no www. See how to do it with Nginx."
---

In moving away from the _old-school standard_ of prefixing our root domains with _www_, it's nice to still allow traffic with and without the _www_ in the domain name. For example, you can get to this site by going to [cobwwweb.com](http://cobwwweb.com), but you can also get here by going to [www.cobwwweb.com](http://www.cobwwweb.com).

You may have noticed that if you try the second URL (the one with the _www_), it gets removed from the address bar. It is ideal for SEO (search engine optimization) purposes that you choose one (with or without _www_) and stick with it by redirecting traffic from the other domain to your main domain.

With Nginx as your web server, the proper way of doing so is to perform a `301` redirect in a separate `server` directive. Use the following **in addition to** your main `server` directive.

```nginx
server {
  server_name www.yourdomain.com;
  return 301 $scheme://yourdomain.com$request_uri;
}
```

_Note: It's okay to have multiple directives in one file, but it's good to keep the directives separate from one another._

In this case, we're getting rid of the _www_ and considering _yourdomain.com_ to be your main domain. You could just as easily do the reverse, like so:

```nginx
server {
  server_name yourdomain.com;
  return 301 $scheme://www.yourdomain.com$request_uri;
}
```
