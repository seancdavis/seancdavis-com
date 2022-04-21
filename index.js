export function extractGitHubRepoPath(url) {
  if (!url) return null;
  const match = url.match(
    /^https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<repo>[\w.-]+)/
  );

  if (!match || !(match.groups?.owner && match.groups?.repo)) return null;
  return `${match.groups.owner}/${match.groups.repo}`;
}
