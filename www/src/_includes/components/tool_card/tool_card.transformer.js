const { Component } = require("../../../../utils/shortcodes/component");
const { readSvg } = require("../../../../utils/shortcodes/svg");
const { extractDomainName } = require("../../../../utils/filters/domain_name");
const {
  extractGitHubRepoPath,
} = require("../../../../utils/filters/github_repo");
const {
  extractTwitterHandle,
} = require("../../../../utils/filters/twitter_handle");

module.exports = ({ tool, layout = "expanded" }) => {
  let topicData = tool?.data?.topics || [];
  // Compact cards behave as if there are no topics, which prtools the
  // unnecessary topic_badge rendering below.
  if (layout === "compact") topicData = [];

  const topics = topicData
    .map((topic) => {
      const component = new Component("topic_badge", {
        topic,
        classes: "mr-1",
      });
      return component.render();
    })
    .join("");

  const sources = {
    website: tool.data.sources?.website
      ? {
          icon: readSvg("website"),
          text: extractDomainName(tool.data.sources.website),
          url: tool.data.sources.website,
        }
      : null,
    twitter: tool.data.sources?.twitter
      ? {
          icon: readSvg("twitter"),
          text: extractTwitterHandle(tool.data.sources.twitter),
          url: tool.data.sources.twitter,
        }
      : null,
    github: tool.data.sources?.github
      ? {
          icon: readSvg("github"),
          text: extractGitHubRepoPath(tool.data.sources.github),
          url: tool.data.sources.github,
        }
      : null,
  };

  let wrapperClasses,
    contentClasses = "";

  if (["expanded", "horizontal"].includes(layout)) {
    wrapperClasses = "bg-white shadow-sm";
    contentClasses = "p-4";
  }
  // Flat cards get vertical padding in the content area.
  if (layout === "flat") contentClasses = "py-4";

  return {
    ...tool,
    wrapperClasses,
    contentClasses,
    topics,
    layout,
    sources,
  };
};
