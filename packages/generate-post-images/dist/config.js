"use strict";
/* --- Colors --- */
Object.defineProperty(exports, "__esModule", { value: true });
const colors = {
    blue: "#2260bf",
    blueGray: "#4b6a8a",
    green: "#007785",
    lime: "#9ce736",
    orange: "#ff6b00",
    pink: "#eea2bf",
    yellow: "#ffd445",
    white: "#ffffff",
};
function titleConfig(textAlign = "left", highlight = false) {
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
const defaultBackgroundConfig = {
    width: 2400,
    height: 1260,
};
function coloredBackgroundConfigSeries(name, color) {
    return [...Array(20).keys()].map((idx) => {
        const formattedIdx = (idx + 1).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        return Object.assign(Object.assign({}, defaultBackgroundConfig), { filePath: `${name}/${name}-${formattedIdx}.svg`, highlightColor: colors.white, highlightTextColor: color, textColor: colors.white, titleOptionKeys: Object.keys(allTitles) });
    });
}
function lightBackgroundConfigSeries(name, highlightColor, nums) {
    return nums.map((num) => {
        const formattedIdx = num.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        return Object.assign(Object.assign({}, defaultBackgroundConfig), { filePath: `${name}/${name}-${formattedIdx}.svg`, highlightColor, highlightTextColor: colors.white, textColor: colors.white, titleOptionKeys: ["leftHighlight", "centerHighlight"] });
    });
}
const config = {
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
exports.default = config;
