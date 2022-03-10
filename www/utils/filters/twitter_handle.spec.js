const { extractTwitterHandle } = require("./twitter_handle");

describe("extractTwitterHandle()", () => {
  test("returns null when no url", () => {
    expect(extractTwitterHandle()).toBeNull();
  });
  test("returns null when bad url", () => {
    expect(extractTwitterHandle("NOT_A_URL")).toBeNull();
  });
  test("returns null when not a twitter URL", () => {
    expect(extractTwitterHandle("https://www.seancdavis.com/")).toBeNull();
  });
  test("returns the handle with a valid URL", () => {
    const result = extractTwitterHandle("https://twitter.com/seancdavis29");
    expect(result).toEqual("@seancdavis29");
  });
  test("returns the handle with a valid URL (http)", () => {
    const result = extractTwitterHandle("http://twitter.com/seancdavis29");
    expect(result).toEqual("@seancdavis29");
  });
  test("returns the handle with a valid URL (www)", () => {
    const result = extractTwitterHandle("https://www.twitter.com/seancdavis29");
    expect(result).toEqual("@seancdavis29");
  });
  test("returns the handle with a valid URL (@)", () => {
    const result = extractTwitterHandle("https://twitter.com/@seancdavis29");
    expect(result).toEqual("@seancdavis29");
  });
  test("returns the handle with a valid URL (trailing slash)", () => {
    const result = extractTwitterHandle("https://twitter.com/@seancdavis29/");
    expect(result).toEqual("@seancdavis29");
  });
});
