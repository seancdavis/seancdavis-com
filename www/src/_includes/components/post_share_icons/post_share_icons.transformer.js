const { Component } = require("../../../../utils/shortcodes/component");

const SocialLink = ({ icon, url, classes }) => {
  const link = { icon, url };
  const component = new Component("social_link", { link, classes });
  return component.render();
};

module.exports = ({ base_url, page_url, title, classes = "" }) => {
  const encodedTitle = encodeURIComponent(`${title} by @seancdavis29`);
  const encodedUrl = encodeURIComponent(`${base_url}${page_url}`);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const twitterIcon = SocialLink({ icon: "twitter", url: twitterUrl, classes });

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const linkedinIcon = SocialLink({
    icon: "linkedin",
    url: linkedinUrl,
    classes,
  });

  const githubIcon = SocialLink({ icon: "github", url: "/", classes });

  return { content: [twitterIcon, linkedinIcon, githubIcon].join("") };
};
