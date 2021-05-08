const runType = process.env.LHCI_RUN_TYPE || "mobile"

const config = {
  default: {
    collect: {
      numberOfRuns: 1,
      url: ["https://www.seancdavis.com/"]
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
}

config.mobile = {
  ...config.default
}

config.desktop = {
  ...config.default,
  collect: {
    url: config.default.collect.url.map(url => `${url}?desktop`),
    settings: {
      preset: "desktop"
    }
  }
}

module.exports = {
  ci: config[runType]
}
