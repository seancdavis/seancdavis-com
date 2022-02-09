const seoDefaults = require("./seo_defaults.json");

const encodedTitle = (title) => encodeURIComponent(`${title} by @seancdavis29`);

const encodedUrl = (pagePath) =>
  encodeURIComponent(`${seoDefaults.base_url}${pagePath}`);

module.exports = {
  contributor: (twitterHandle) => {
    return `https://twitter.com/${twitterHandle}`;
  },
  linkedin: ({ pagePath }) => {
    const url = encodedUrl(pagePath);
    return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  },
  twitter: ({ title, pagePath }) => {
    const text = encodedTitle(title);
    const url = encodedUrl(pagePath);
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  },
};
