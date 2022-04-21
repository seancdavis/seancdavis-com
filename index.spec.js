import { extractGitHubRepoPath } from ".";

describe("extractGitHubRepoPath()", () => {
  it("extracts the path from a valid GitHub URL", () => {
    const url = "https://github.com/seancdavis/talks";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/talks");
  });
  it("accounts for hyphens", () => {
    const url = "https://github.com/seancdavis/seancdavis-com";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/seancdavis-com");
  });
  it("accounts for periods", () => {
    const url = "https://github.com/seancdavis/seancdavis.com";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/seancdavis.com");
  });
  it("pulls the path out of longer URLs", () => {
    const url =
      "https://github.com/seancdavis/seancdavis-com/blob/main/www/src/pages/index.md";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/seancdavis-com");
  });
  it("works with www in the URL", () => {
    const url = "https://www.github.com/seancdavis/seancdavis-com";
    expect(extractGitHubRepoPath(url)).toEqual("seancdavis/seancdavis-com");
  });
  it("returns null when no URL", () => {
    expect(extractGitHubRepoPath("")).toEqual(null);
  });
  it("returns null when not a GitHub URL", () => {
    const url = "https://www.youtube.com/channel/UCskZ3MNbeGSVyOTL0L5ooww";
    expect(extractGitHubRepoPath(url)).toEqual(null);
  });
  it("returns null when there's no repo name", () => {
    const url = "https://www.github.com/seancdavis";
    expect(extractGitHubRepoPath(url)).toEqual(null);
  });
});
