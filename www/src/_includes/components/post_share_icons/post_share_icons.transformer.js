const { Component } = require("../../../../utils/shortcodes/component");

const SocialLink = ({ icon, url, classes }) => {
  const link = { icon, url };
  const component = new Component("social_link", { link, classes });
  return component.render();
};

module.exports = ({ base_url, page_url, title, classes = "" }) => {
  const fullUrl = `${base_url}${page_url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTwitterText = encodeURIComponent(`${title} by @seancdavis29`);
  const encodedBlueskyText = encodeURIComponent(
    `${title} by @seancdavis.com ${fullUrl}`
  );

  const blueskyUrl = `https://bsky.app/intent/compose?text=${encodedBlueskyText}`;
  let icons = [SocialLink({ icon: "bluesky", url: blueskyUrl, classes })];

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTwitterText}&url=${encodedUrl}`;
  icons.push(SocialLink({ icon: "twitter", url: twitterUrl, classes }));

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  icons.push(SocialLink({ icon: "linkedin", url: linkedinUrl, classes }));

  const copyButtonProps = {
    icon: "link",
    text: fullUrl,
    classes: `${classes} component--social-link text-green`,
  };
  const copyButton = new Component("copy_button", copyButtonProps);
  icons.push(copyButton.render());

  return { content: icons.join("") };
};
