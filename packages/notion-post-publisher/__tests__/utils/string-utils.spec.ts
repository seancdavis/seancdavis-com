import { toTitleCase } from "../../src/utils/string-utils";

describe("toTitleCase", () => {
  it("Capitalizes the first letter of every word", () => {
    expect(toTitleCase("this is the title")).toEqual("This Is The Title");
  });
});
