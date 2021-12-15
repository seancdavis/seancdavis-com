const { imgixUrl } = require("./imgix_url");

describe("imgixUrl()", () => {
  test("returns null when there is no input", () => {
    const result = imgixUrl();
    expect(result).toEqual(null);
  });
  test("returns a full, signed URL", () => {
    const input = "/posts/210309/wtf--pnpm.png";
    const result = imgixUrl(input);
    expect(result).toContain(process.env.IMGIX_DOMAIN);
    expect(result).toContain(input);
    expect(result).toContain("&s=");
  });
  test("includes the specified parameters", () => {
    const result = imgixUrl("/posts/210309/wtf--pnpm.png", {
      auto: "compress,format",
    });
    expect(result).toContain("auto=compress%2Cformat");
  });
});
