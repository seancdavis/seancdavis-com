import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
// console.log(Object.keys(octokit));

const { data: repos } = await octokit.repos.listForUser({
  username: "seancdavis",
});

const owner = "seancdavis";
const repoName = "comments-test";
const repoPath = `${owner}/${repoName}`;
// const repoId = repos.find((repo) => repo.full_name === repoPath).id;

const q = `first repo:${repoPath}`;
const {
  data: { items: issues },
} = await octokit.search.issuesAndPullRequests({ q });
const issue = issues[0];

const { data: comments } = await octokit.issues.listComments({
  owner,
  repo: repoName,
  issue_number: issue.number,
});
console.log(comments);
