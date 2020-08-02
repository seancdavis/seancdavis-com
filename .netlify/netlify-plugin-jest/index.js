module.exports = {
  onPreBuild: async ({ utils: { build, run, status } }) => {
    try {
      await run.command("yarn test --ci")

      status.show({
        // Optional. Default to the plugin's name followed by a generic title.
        title: "Continuous Integration",
        // Required.
        summary: "Tests passed"
        // Optional. Empty by default.
        // text: 'Detailed information shown in a collapsible section',
      })
    } catch (error) {
      status.show({
        // Optional. Default to the plugin's name followed by a generic title.
        title: "Continuous Integration",
        // Required.
        summary: "Tests failed"
        // Optional. Empty by default.
        // text: 'Detailed information shown in a collapsible section',
      })
      return build.failBuild(error)
    }
  }
}
