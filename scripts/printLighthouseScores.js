const path = require("path")
const fs = require("fs")
const glob = require("glob")

const lhGlobPattern = path.join(__dirname, "../.lighthouseci", "lhr-*.json")

const files = glob.sync(lhGlobPattern)

const results = {}

const storeResult = result => {
  if (!result.finalUrl) return null

  results[result.finalUrl] = {
    performance: result.categories.performance.score,
    accessibility: result.categories.accessibility.score,
    bestPractices: result.categories["best-practices"].score,
    seo: result.categories.seo.score
  }
}

files.map(file => {
  const content = fs.readFileSync(file)
  const result = JSON.parse(content)
  storeResult(result)
})

console.log(JSON.stringify(results, null, 2))
