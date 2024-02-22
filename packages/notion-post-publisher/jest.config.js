/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/__mocks__/s3-utils.ts"],
  moduleNameMapper: {
    "^axios$": "axios/dist/node/axios.cjs",
  },
};
