import { extractYouTubeId, toTitleCase } from "../../src/utils/string-utils";

describe("toTitleCase", () => {
  it("Capitalizes the first letter of every word", () => {
    expect(toTitleCase("this is the title")).toEqual("This Is The Title");
  });
});

describe("extractYouTubeId", () => {
  it("Throws when not a valid YouTube URL", () => {
    const url = "https://www.youtube.com/";
    expect(() => {
      extractYouTubeId(url);
    }).toThrow();
  });
  it('Extracts the ID from "watch" URLs', () => {
    const url = "https://www.youtube.com/watch?v=FFBMgrAa6bs&t=48s";
    expect(extractYouTubeId(url)).toEqual("FFBMgrAa6bs");
  });
  it('Extracts the ID from "watch" URLs without "www"', () => {
    const url = "https://youtube.com/watch?v=FFBMgrAa6bs&t=48s";
    expect(extractYouTubeId(url)).toEqual("FFBMgrAa6bs");
  });
  it('Extracts the ID from "youtu.be" URLs', () => {
    const url = "https://youtu.be/FFBMgrAa6bs";
    expect(extractYouTubeId(url)).toEqual("FFBMgrAa6bs");
  });
  it('Extracts the ID from "youtu.be" URLs with "www"', () => {
    const url = "https://www.youtu.be/FFBMgrAa6bs";
    expect(extractYouTubeId(url)).toEqual("FFBMgrAa6bs");
  });
});