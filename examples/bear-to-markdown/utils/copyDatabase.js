const fs = require("fs")
const path = require("path")
const HOME = require("os").homedir()

const srcPath = path.join(
  HOME,
  "/Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data/database.sqlite"
)
const destPath = path.join(__dirname, "../database.sqlite")

if (!fs.existsSync(srcPath)) {
  console.error(`Could not find Bear database: ${srcPath}`)
  process.exit(1)
}

fs.copyFileSync(srcPath, destPath)
console.log(`Copied Bear database: ${destPath}`)
