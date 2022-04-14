// Note: This mock is included globally by jest.config.js

jest.mock("../src/utils/s3-utils", () => {
  return { downloadFile: jest.fn(), uploadFile: jest.fn() };
});
