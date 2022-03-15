const { readSvg } = require("../../../../utils/shortcodes/svg");
const { renderMarkdown } = require("../../../../utils/shortcodes/markdown");
const { extractDomainName } = require("../../../../utils/filters/domain_name");
const {
  extractGitHubRepoPath,
} = require("../../../../utils/filters/github_repo");
const {
  extractTwitterHandle,
} = require("../../../../utils/filters/twitter_handle");

module.exports = ({ tool, comments }) => {
  const body = renderMarkdown(comments);

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

  return {
    ...tool,
    sources,
    body,
  };
};
