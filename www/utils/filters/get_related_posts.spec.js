const {
  getPostsBySlugs,
  getPostsByTags,
  getReferencedPosts,
  getRelatedPosts,
} = require("./get_related_posts");
const postsFixture = require("./__fixtures__/posts.json");

// Note: The postsFixture doesn't match the collection shape exactly. Just
// enough to be able to run these tests.

/* --- getPostsBySlug() --- */

describe("getPostsBySlugs()", () => {
  it("returns posts matching the slugs", () => {
    const slugs = ["blog-post-02"];
    const result = getPostsBySlugs(postsFixture, slugs);
    expect(result).toEqual([postsFixture[1]]);
  });
  it("respects the order of the slugs", () => {
    const slugs = ["blog-post-02", "blog-post-01"];
    const result = getPostsBySlugs(postsFixture, slugs);
    expect(result).toEqual([postsFixture[1], postsFixture[0]]);
  });
  it("returns an empty array when it finds no matches", () => {
    const slugs = ["blog-post-xx"];
    const result = getPostsBySlugs(postsFixture, slugs);
    expect(result).toEqual([]);
  });
});

/* --- getPostsByTags() --- */

describe("getPostsByTags()", () => {
  it("returns a list of posts using a list of tags", () => {
    const expResult = [postsFixture[0], postsFixture[2], postsFixture[3]];
    // Run this 100 times so we don't get a lucky pass from shuffling.
    Array.from({ length: 100 }, () => {
      let result = getPostsByTags(postsFixture, ["tag-a"]);
      result = result.sort((a, b) => (a.fileSlug > b.fileSlug ? 1 : -1));
      expect(result).toEqual(expResult);
    });
  });
  it("limits the results, as specified", () => {
    let result = getPostsByTags(postsFixture, ["tag-a"], 2);
    result = result.sort((a, b) => (a.fileSlug > b.fileSlug ? 1 : -1));
    expect(result.length).toEqual(2);
  });
  it("shuffles the results", () => {
    const firstResults = Array.from({ length: 100 }, () => {
      const result = getPostsByTags(postsFixture, ["tag-a"]);
      return result[0] === postsFixture[0];
    });
    const wrongResult = Array.from({ length: 100 }, () => true);
    // The matcher here is that the first item in the resulting array isn't
    // always the first item in the fixture.
    expect(firstResults).not.toEqual(wrongResult);
    // Checking that the logic is right above and at least one result returned
    // the first item first. Running 100 times to make the probability highly
    // unlikely that this would ever randomly fail.
    expect(firstResults.filter((x) => x).length).toBeGreaterThan(0);
  });
  it("prioritizes those that match more tags", () => {
    const firstResults = Array.from({ length: 100 }, () => {
      const result = getPostsByTags(postsFixture, ["tag-a", "tag-b"]);
      return result[0] === postsFixture[0];
    });
    const expResult = Array.from({ length: 100 }, () => true);
    // Here we do the opposite of the previous test and should see the first
    // item (which has two matches) be first every time.
    expect(firstResults).toEqual(expResult);
  });
  it("returns any posts if no tags are specified", () => {
    const includesPostWithoutTags = Array.from({ length: 100 }, () => {
      const result = getPostsByTags(postsFixture, []);
      return result.filter((post) => post === postsFixture[1]).length > 0;
    });
    // At least 1 of the 100 results includes the second post, which is the only
    // one without a tag.
    expect(includesPostWithoutTags.filter((x) => x).length).toBeGreaterThan(0);
  });
});

/* --- getReferencedPosts() --- */

describe("getReferencedPosts()", () => {
  it("resolves reference links to posts", () => {
    const content = `<p>Lorem ipsum ...</p><a href="/blog/${postsFixture[0].fileSlug}/">Post #1</a>`;
    const result = getReferencedPosts(postsFixture, content);
    expect(result).toEqual([postsFixture[0]]);
  });
  it("doesn't require trailing slashes", () => {
    const content = `<p>Lorem ipsum ...</p><a href="/blog/${postsFixture[0].fileSlug}">Post #1</a>`;
    const result = getReferencedPosts(postsFixture, content);
    expect(result).toEqual([postsFixture[0]]);
  });
  it("picks up index.html references", () => {
    const content = `<p>Lorem ipsum ...</p><a href="/blog/${postsFixture[0].fileSlug}/index.html">Post #1</a>`;
    const result = getReferencedPosts(postsFixture, content);
    expect(result).toEqual([postsFixture[0]]);
  });
  it("ignores bad links", () => {
    const content = `<p>Lorem ipsum ...</p><a href="/blog/blog-post-xx/">Post #1</a>`;
    const result = getReferencedPosts(postsFixture, content);
    expect(result).toEqual([]);
  });
  it("ignores image links", () => {
    const content = `<p>Lorem ipsum ...</p><img src="/blog/blog-post-xx.png">`;
    const result = getReferencedPosts(postsFixture, content);
    expect(result).toEqual([]);
  });
  it("returns a max of 3 posts", () => {
    const content = `
      <p>Lorem ipsum ...</p>
      <a href="/blog/${postsFixture[0].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[1].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[2].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[3].fileSlug}/">Post #1</a>
    `;
    const result = getReferencedPosts(postsFixture, content);
    expect(result.length).toEqual(3);
  });
  it("shuffles the results", () => {
    const content = `
      <p>Lorem ipsum ...</p>
      <a href="/blog/${postsFixture[0].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[1].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[2].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[3].fileSlug}/">Post #1</a>
    `;
    const firstResults = Array.from({ length: 100 }, () => {
      const result = getReferencedPosts(postsFixture, content);
      return result[0] === postsFixture[0];
    });
    const wrongResult = Array.from({ length: 100 }, () => true);
    // See shuffle test in getPostsByTags() tests for more info.
    expect(firstResults).not.toEqual(wrongResult);
    expect(firstResults.filter((x) => x).length).toBeGreaterThan(0);
  });
  it("does not duplicate posts", () => {
    const content = `
      <p>Lorem ipsum ...</p>
      <a href="/blog/${postsFixture[0].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[0].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[1].fileSlug}/">Post #1</a>
    `;
    const result = getReferencedPosts(postsFixture, content);
    expect(result.length).toEqual(2);
  });
});

/* --- getRelatedPosts() --- */

describe("getRelatedPosts()", () => {
  it("returns an empty set if given an empty set of related_posts", () => {
    const result = getRelatedPosts(postsFixture, []);
    expect(result).toEqual([]);
  });
  it("returns related_posts explicitly", () => {
    const result = getRelatedPosts(postsFixture, [
      postsFixture[1].fileSlug,
      postsFixture[0].fileSlug,
    ]);
    expect(result).toEqual([postsFixture[1], postsFixture[0]]);
  });
  it("first retrieves references", () => {
    const content = `
      <p>Lorem ipsum ...</p>
      <a href="/blog/${postsFixture[0].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[1].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[2].fileSlug}/">Post #1</a>
    `;
    let result = getRelatedPosts(
      postsFixture,
      undefined,
      [],
      undefined,
      content
    );
    result = result.sort((a, b) => (a.fileSlug > b.fileSlug ? 1 : -1));
    expect(result).toEqual([postsFixture[0], postsFixture[1], postsFixture[2]]);
  });
  it("falls back to tags if no references", () => {
    const expResult = [postsFixture[0], postsFixture[2], postsFixture[3]];
    // Run this 100 times so we don't get a lucky pass from shuffling.
    Array.from({ length: 100 }, () => {
      let result = getRelatedPosts(
        postsFixture,
        undefined,
        ["tag-a"],
        undefined,
        ""
      );
      result = result.sort((a, b) => (a.fileSlug > b.fileSlug ? 1 : -1));
      expect(result).toEqual(expResult);
    });
  });
  it("adds tags on top of references", () => {
    const content = `
      <p>Lorem ipsum ...</p>
      <a href="/blog/${postsFixture[1].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[2].fileSlug}/">Post #1</a>
    `;
    Array.from({ length: 100 }, () => {
      let result = getRelatedPosts(
        postsFixture,
        undefined,
        ["tag-b"],
        undefined,
        content
      );
      result = result.sort((a, b) => (a.fileSlug > b.fileSlug ? 1 : -1));
      // 0 comes from "tag-b" while 1 and 2 are referenced in the content. Should
      // be the same every time.
      expect(result).toEqual([
        postsFixture[0],
        postsFixture[1],
        postsFixture[2],
      ]);
    });
  });
  it("will not include the current object", () => {
    // Do the same as the previous test, but include the current object as one
    // of the three expected results, which will pull in the outlier, since it
    // wants to fill up a series of 3 posts.
    const content = `
      <p>Lorem ipsum ...</p>
      <a href="/blog/${postsFixture[1].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[2].fileSlug}/">Post #1</a>
    `;
    Array.from({ length: 100 }, () => {
      let result = getRelatedPosts(
        postsFixture,
        undefined,
        ["tag-b"],
        postsFixture[1].fileSlug,
        content
      );
      result = result.sort((a, b) => (a.fileSlug > b.fileSlug ? 1 : -1));
      // 0 comes from "tag-b" while 1 and 2 are referenced in the content. Should
      // be the same every time.
      expect(result).toEqual([
        postsFixture[0],
        postsFixture[2],
        postsFixture[3],
      ]);
    });
  });
  it("will not duplicate objects", () => {
    // Also a similar pattern, but use a scenario where we'll have to protect
    // against duplicates.
    const content = `
      <p>Lorem ipsum ...</p>
      <a href="/blog/${postsFixture[0].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[0].fileSlug}/">Post #1</a>
      <a href="/blog/${postsFixture[1].fileSlug}/">Post #1</a>
    `;
    Array.from({ length: 100 }, () => {
      let result = getRelatedPosts(
        postsFixture,
        undefined,
        ["tag-b"], // this is only applied to the first one.
        undefined,
        content
      );
      result = result.sort((a, b) => (a.fileSlug > b.fileSlug ? 1 : -1));
      // We have three results, but only see the references posts once.
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual(postsFixture[0]);
      expect(result[1]).toEqual(postsFixture[1]);
      expect(result[2]).not.toEqual(postsFixture[0]);
      expect(result[2]).not.toEqual(postsFixture[1]);
    });
  });
});
