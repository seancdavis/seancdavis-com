/* --- Colors --- */

type ColorConfig = {
  blue: string;
  blueGray: string;
  green: string;
  lime: string;
  orange: string;
  pink: string;
  yellow: string;
};

const colors: ColorConfig = {
  blue: "#2260bf",
  blueGray: "#4b6a8a",
  green: "#007785",
  lime: "#9ce736",
  orange: "#ff6b00",
  pink: "#eea2bf",
  yellow: "#ffd445",
};

/* --- Titles --- */

type TitleTextAlignOptions = "left" | "center";

export type TitleConfig = {
  maxLineWidth: number;
  maxFontSize: number;
  // If the font size for a single line is going to be larger than this number,
  // we don't have to split the lines. (This logic is baked into
  // utils/text-utils.)
  minSingleLineFontSize: number;
  textAlign: TitleTextAlignOptions;
  highlight: boolean;
};

function titleConfig(
  textAlign: TitleTextAlignOptions = "left",
  highlight: boolean = false
): TitleConfig {
  return {
    maxLineWidth: 1800,
    maxFontSize: 110,
    minSingleLineFontSize: 90,
    textAlign,
    highlight,
  };
}

const allTitles = {
  left: titleConfig("left"),
  center: titleConfig("center"),
  leftHighlight: titleConfig("left", true),
  centerHighlight: titleConfig("center", true),
};

/* --- Backgrounds --- */

export type BackgroundConfig = {
  filePath: string;
  highlightColor: string;
  textColor: string;
  titleOptionKeys: string[];
  width: number;
  height: number;
};

const defaultBackgroundConfig = {
  width: 2400,
  height: 1260,
};

function coloredBackgroundConfigSeries(
  name: string,
  color: string
): BackgroundConfig[] {
  return [...Array(20).keys()].map((idx) => {
    const formattedIdx = (idx + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return {
      ...defaultBackgroundConfig,
      filePath: `${name}/${name}-${formattedIdx}.svg`,
      highlightColor: "#ffffff",
      textColor: color,
      titleOptionKeys: Object.keys(allTitles),
    };
  });
}

function lightBackgroundConfigSeries(
  name: string,
  highlightColor: string,
  nums: number[]
): BackgroundConfig[] {
  return nums.map((num) => {
    const formattedIdx = num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return {
      ...defaultBackgroundConfig,
      filePath: `${name}/${name}-${formattedIdx}.svg`,
      highlightColor,
      textColor: "#ffffff",
      titleOptionKeys: ["leftHighlight", "centerHighlight"],
    };
  });
}

/* --- Config Object --- */

type Config = {
  titles: { [key: string]: TitleConfig };
  backgrounds: BackgroundConfig[];
};

const config: Config = {
  titles: allTitles,
  backgrounds: [
    // Solid colors with consistent backgrounds.
    ...coloredBackgroundConfigSeries("blue", colors.blue),
    ...coloredBackgroundConfigSeries("blue-gray", colors.blueGray),
    ...coloredBackgroundConfigSeries("green", colors.green),
    ...coloredBackgroundConfigSeries("lime", colors.lime),
    ...coloredBackgroundConfigSeries("orange", colors.orange),
    ...coloredBackgroundConfigSeries("pink", colors.pink),
    ...coloredBackgroundConfigSeries("yellow", colors.yellow),
    // Gray backgrounds with colored graphics.
    ...lightBackgroundConfigSeries("gray", colors.green, [1, 7, 13, 19]),
    ...lightBackgroundConfigSeries("gray", colors.blue, [2, 8, 14, 20]),
    ...lightBackgroundConfigSeries("gray", colors.orange, [3, 9, 15]),
    ...lightBackgroundConfigSeries("gray", colors.lime, [4, 10, 16]),
    ...lightBackgroundConfigSeries("gray", colors.pink, [5, 11, 17]),
    ...lightBackgroundConfigSeries("gray", colors.yellow, [6, 12, 18]),
    // White backgrounds with colored graphics.
    ...lightBackgroundConfigSeries("white", colors.orange, [1, 7, 13, 19]),
    ...lightBackgroundConfigSeries("white", colors.green, [2, 8, 14, 20]),
    ...lightBackgroundConfigSeries("white", colors.lime, [3, 9, 15]),
    ...lightBackgroundConfigSeries("white", colors.blue, [4, 10, 16]),
    ...lightBackgroundConfigSeries("white", colors.yellow, [5, 11, 17]),
    ...lightBackgroundConfigSeries("white", colors.pink, [6, 12, 18]),
  ],
};

export default config;
