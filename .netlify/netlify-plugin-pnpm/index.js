module.exports = {
  onPreBuild: async ({ utils: { build, run } }) => {
    try {
      await run.command(
        'test "$CI" = true && npx pnpm install -r --store=node_modules/.pnpm-store || echo skiping pnpm install'
      )
    } catch (error) {
      return build.failBuild(error)
    }
  }
}
