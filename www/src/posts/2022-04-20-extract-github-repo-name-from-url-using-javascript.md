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

## Playground

Here it is in action, with a series of tests for varying input URLs. (Use the horizontal and vertical white bars to move the windows around, or [open the sandbox](https://codesandbox.io/s/extract-github-repo-from-url-vkdnhv) for a larger view.)

<iframe src="https://codesandbox.io/embed/js-playground-forked-vkdnhv?fontsize=14&hidenavigation=1&previewwindow=tests&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="JS Playground (forked)"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
