const { extractGitHubRepoPath } = require("./github_repo");

describe("extractGitHubRepoPath()", () => {
  test("returns null when no url", () => {
    expect(extractGitHubRepoPath()).toBeNull();
  });
  test("returns null when bad url", () => {
    expect(extractGitHubRepoPath("NOT_A_URL")).toBeNull();
  });
  test("returns null when not a github URL", () => {
    expect(extractGitHubRepoPath("https://www.seancdavis.com/")).toBeNull();
  });
  test("returns null when there's only an owner, no repo", () => {
    expect(extractGitHubRepoPath("https://github.com/seancdavis")).toBeNull();
  });
  test("returns the repo path with a valid URL", () => {
    const url = "https://github.com/seancdavis/seancdavis-com";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/seancdavis-com");
  });
  test("returns the repo path with a valid URL (http)", () => {
    const url = "http://github.com/seancdavis/seancdavis-com";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/seancdavis-com");
  });
  test("returns the repo path with a valid URL (www)", () => {
    const url = "https://www.github.com/seancdavis/seancdavis-com";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/seancdavis-com");
  });
  test("returns the repo path with a valid URL (all allowable chars)", () => {
    const url = "https://github.com/abcABC123-_./abcABC123-_.";
    expect(extractGitHubRepoPath(url)).toEqual("abcABC123-_./abcABC123-_.");
  });
  test("returns the repo path with a valid URL (trailing slash)", () => {
    const url = "https://github.com/seancdavis/seancdavis-com/";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/seancdavis-com");
  });
});
