const fs = require("fs");
const glob = require("glob");
const path = require("path");

const runType = process.env.LHCI_RUN_TYPE || "mobile";

// Determine the URLs to run the test against.
const baseUrl = "https://www.seancdavis.com";
const buildDir = path.join(__dirname, "./dist");
let urls = [baseUrl];
if (fs.existsSync(buildDir)) {
  urls = glob.sync(path.join(buildDir, "**/*.html")).map((file) => {
    let filePath = file.replace(buildDir, "").replace(".html", "");
    if (filePath.endsWith("/index")) filePath = filePath.replace("/index", "/");
    return `${baseUrl}${filePath}`;
  });
}

const config = {
  default: {
    collect: {
      numberOfRuns: 1,
      // Use only up to the first 10 URLs.
      url: urls.slice(0, 10),
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

config.mobile = {
  ...config.default,
};

config.desktop = {
  ...config.default,
  collect: {
    url: config.default.collect.url.map((url) => `${url}?desktop`),
    settings: {
      preset: "desktop",
    },
  },
};

module.exports = {
  ci: config[runType],
};
