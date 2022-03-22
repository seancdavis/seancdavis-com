const { onSuccess } = require(".");

onSuccess({
  constants: { IS_LOCAL: true },
  utils: {
    build: {
      failPlugin: (msg) => {
        throw new Error(msg);
      },
    },
  },
});
