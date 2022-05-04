---
title: Extract Twitter Handle from URL with JavaScript
description: >-
  Code snippet that extracts a Twitter user handle from a valid Twitter URL
  using JavaScript.
tags:
  - javascript
image: /posts/220504/extract-twitter-handle-from-url-with-javascript-3Uxv89pD.png
seo:
  image: >-
    /posts/220504/extract-twitter-handle-from-url-with-javascript-X6u0xy0D--meta.png
---

Here’s a quick JavaScript function that will find the Twitter handle from within a Twitter URL and return the handle with the preceding `@` symbol:

```js
function extractTwitterHandle(url) {
  if (!url) return null;
  const match = url.match(/^https?:\/\/(www\.)?twitter.com\/@?(?<handle>\w+)/);
  return match?.groups?.handle ? `@${match.groups.handle}` : null;
}
```

Notice here that we’re accounting for the following conditions:

- If there is no URL passed, return `null`.
- Insecure URLs (`http` and `https`).
- Including or omitting the `www` subdomain.
- Including or omitting the `@` symbol within the URL.
- If the URL was present but invalid, or if the handle couldn’t be found, return `null`.
