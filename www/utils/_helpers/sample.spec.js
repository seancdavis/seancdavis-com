const { sample } = require("./sample");

describe("sample()", () => {
  it("extracts a random element from an array", () => {
    const array = Array.from({ length: 100 }, (_, i) => i);
    let results = [];
    Array.from({ length: 100 }, () => {
      const res = sample(array);
      expect(Number.isInteger(res)).toEqual(true);
      expect(res).toBeGreaterThanOrEqual(0);
      expect(res).toBeLessThanOrEqual(99);
      results.push(res);
    });
    expect([...new Set(results)].length).toBeGreaterThan(1);
  });
  it("returns undefined for empty arrays", () => {
    expect(sample([])).toEqual(undefined);
  });
  it("returns undefined for null or undefined arguments", () => {
    expect(sample()).toEqual(undefined);
    expect(sample(null)).toEqual(undefined);
    expect(sample(undefined)).toEqual(undefined);
  });
});
