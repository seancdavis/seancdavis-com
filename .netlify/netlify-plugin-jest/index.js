module.exports = {
  onPostBuild: async ({ utils: { build, run } }) => {
    try {
      await run.command("yarn test")
    } catch (error) {
      return build.failBuild(error)
    }
  }
}
