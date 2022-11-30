import fs from "fs";
import glob from "fast-glob";
import path from "path";

import { createNewTags } from "../../src/utils/www-utils";
import { TOPICS_DIR } from "../../src/constants";

jest.mock("../../src/constants", () => {
  return {
    TOPICS_DIR: path.join(__dirname, "../..", "__mocks__/www/src/topics"),
  };
});

function getTopicFiles() {
  return glob.sync(path.join(TOPICS_DIR, "*.md"));
}

function getTopicNames() {
  return getTopicFiles().map((filePath) =>
    path.basename(filePath, path.extname(filePath))
  );
}

describe("createNewTags", () => {
  afterEach(() => {
    getTopicFiles()
      .filter((filePath) => path.basename(filePath) !== "javascript.md")
      .map((filePath) => fs.rmSync(filePath));
  });

  it("returns an empty array when argument is undefined", async () => {
    const response = await createNewTags();
    expect(response).toEqual([]);
  });
  it("returns an empty array when argument is an empty array", async () => {
    const response = await createNewTags([]);
    expect(response).toEqual([]);
  });
  it("doesn't create new tags for existing tags", async () => {
    expect(getTopicFiles().length).toEqual(1);
    const response = await createNewTags(["javascript"]);
    expect(response).toEqual([]);
    expect(getTopicFiles().length).toEqual(1);
    expect(getTopicNames()).toEqual(["javascript"]);
  });
  it("creates new files for new topics", async () => {
    expect(getTopicFiles().length).toEqual(1);
    const response = await createNewTags(["new"]);
    expect(response).toEqual(["new"]);
    expect(getTopicFiles().length).toEqual(2);
    expect(getTopicNames()).toEqual(["javascript", "new"]);
    expect(fs.readFileSync(getTopicFiles()[1]).toString()).toEqual(
      `---\ntitle: New\npagination:\n  data: collections.new\n---\n`
    );
  });
  it("handles multiple new files", async () => {
    expect(getTopicFiles().length).toEqual(1);
    const response = await createNewTags(["a", "b"]);
    expect(response).toEqual(["a", "b"]);
    expect(getTopicFiles().length).toEqual(3);
    expect(getTopicNames()).toEqual(["a", "b", "javascript"]);
  });
  it("handles hyphens", async () => {
    expect(getTopicFiles().length).toEqual(1);
    const response = await createNewTags(["new-topic"]);
    expect(response).toEqual(["new-topic"]);
    expect(getTopicFiles().length).toEqual(2);
    expect(getTopicNames()).toEqual(["javascript", "new-topic"]);
    expect(fs.readFileSync(getTopicFiles()[1]).toString()).toEqual(
      `---\ntitle: New Topic\npagination:\n  data: collections.new-topic\n---\n`
    );
  });
  it("downcases before matching", async () => {
    expect(getTopicFiles().length).toEqual(1);
    const response = await createNewTags(["JavaScript"]);
    expect(response).toEqual([]);
    expect(getTopicFiles().length).toEqual(1);
    expect(getTopicNames()).toEqual(["javascript"]);
    expect(fs.readFileSync(getTopicFiles()[0]).toString()).toEqual(
      `---\ntitle: JavaScript\npagination:\n  data: collections.javascript\n---\n`
    );
  });
});
