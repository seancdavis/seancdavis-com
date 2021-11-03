const { shuffle } = require("./shuffle");

describe("shuffle()", () => {
  it("shuffles elements of an array, and returns the result", () => {
    const array = Array.from({ length: 100 }, (_, i) => i);
    const shuffledArray = shuffle([...array]);

    expect(shuffledArray.length).toEqual(100);
    expect(shuffledArray[0]).not.toEqual(0);

    for (let i of array) {
      expect(shuffledArray.indexOf(i)).toBeGreaterThan(-1);
    }
  });
});
