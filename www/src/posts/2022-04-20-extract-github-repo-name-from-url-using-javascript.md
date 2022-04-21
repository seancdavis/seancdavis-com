---
title: Extract GitHub Repo Name from URL using JavaScript
description: >-
  Quick JavaScript/Node snippet that can pul a GitHub repo path from a full
  GitHub URL.
tags:
  - javascript
  Had a need to extract the repo path from a full GitHub URL. Regex is fun,
  right?
image: /posts/220420/extract-github-repo-name-from-url-using-javascript-NdWoNfAS.png
seo:
  image: >-
    /posts/220420/extract-github-repo-name-from-url-using-javascript-iqa-iSSN--meta.png
---

Here’s a handy function that will extract the repo path from a valid GitHub URL:

```js
export function extractGitHubRepoPath(url) {
  if (!url) return null;
  const match = url.match(
    /^https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/
  );
  if (!match || !(match.groups?.owner && match.groups?.name)) return null;
  return `${match.groups.owner}/${match.groups.name}`;
}
```

Here we’re using a [named capture group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges) to independently retrieve the `owner` and `name` of a particular repo. We can then more easily ensure we have both, and return `null` if not.

It accounts for the following conditions:

- A falsey value for `url` (returns `null`)
- Using an insecure URL (`http` and not `https`)
- Including or omitting `www` subdomain (works with `github.com` and `www.github.com`)
- Any number of URL fragments following the repo path — e.g. `https://github.com/seancdavis/seancdavis-com/blob/main/www/src/pages/index.md` would return `seancdavis/seancdavis-com`
- Invalid URLs — anything that doesn't match the pattern, including having an `owner` and `name` match, returns `null`
