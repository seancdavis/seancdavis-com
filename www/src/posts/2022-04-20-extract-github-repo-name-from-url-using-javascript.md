---
title: Extract GitHub Repo Name from URL using JavaScript
description: >-
  Quick JavaScript/Node snippet that can pul a GitHub repo path from a full
  GitHub URL.
tags:
  - javascript
tweet: >-
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

