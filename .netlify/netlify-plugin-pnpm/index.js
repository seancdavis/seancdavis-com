module.exports = {
  onPreBuild: async ({ utils: { build, run } }) => {
    try {
      await run.command("npm install -g pnpm")
    } catch (error) {
      return build.failBuild(error)
    }
  }
}
