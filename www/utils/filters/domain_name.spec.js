const { extractDomainName } = require("./domain_name");

describe("extractDomainName()", () => {
  test("returns null when no url", () => {
    expect(extractDomainName()).toBeNull();
  });
  test("throws an error for bad URLs", () => {
    expect(() => {
      extractDomainName("NOT_A_URL");
    }).toThrow();
  });
  test("returns the domain name", () => {
    const url = "https://www.seancdavis.com/";
    expect(extractDomainName(url)).toEqual("www.seancdavis.com");
  });
});
