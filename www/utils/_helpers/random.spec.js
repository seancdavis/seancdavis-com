const { random } = require("./random");

describe("random()", () => {
  it("returns a float between 0 and 1", () => {
    Array.from({ length: 100 }, () => {
      const res = random();
      expect(res).toBeGreaterThanOrEqual(0);
      expect(res).toBeLessThanOrEqual(1);
      expect(Number.isInteger(res)).toEqual(false);
    });
  });
  it("returns a float between 0 and the first number", () => {
    Array.from({ length: 100 }, () => {
      const res = random(100);
      expect(res).toBeGreaterThanOrEqual(0);
      expect(res).toBeLessThanOrEqual(100);
      expect(Number.isInteger(res)).toEqual(false);
    });
  });
  it("returns a float between the smaller and larger numbers", () => {
    Array.from({ length: 100 }, () => {
      const res = random(50, 500);
      expect(res).toBeGreaterThanOrEqual(50);
      expect(res).toBeLessThanOrEqual(500);
      expect(Number.isInteger(res)).toEqual(false);
    });
  });
  it("returns an integer when requested", () => {
    Array.from({ length: 100 }, () => {
      const res = random(0, 100, false);
      expect(res).toBeGreaterThanOrEqual(0);
      expect(res).toBeLessThanOrEqual(100);
      expect(Number.isInteger(res)).toEqual(true);
    });
  });
});
