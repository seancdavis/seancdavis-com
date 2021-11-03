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
