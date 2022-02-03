process.env.JEST_CONFIG = process.env.JEST_CONFIG || "default";

const config = {
  default: {
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/(.*).visual.(spec|test).[jt]s",
    ],
  },
  visual: {
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    testMatch: ["**/?(*.)+(visual).(spec|test).[jt]s?(x)"],
    setupFilesAfterEnv: ["<rootDir>/.jest/visual-setup.js"],
    reporters: ["default", "<rootDir>/.jest/image-reporter.mjs"],
    preset: "jest-puppeteer",
  },
};

module.exports = config[process.env.JEST_CONFIG];
