const glob = require("glob")
const path = require("path")

const files = glob.sync(path.join(__dirname, "../images/particles/**/*.svg"))
const images = files.map(file => path.basename(file, path.extname(file)))

module.exports = {
  images: process.env.DISABLE_PARTICLES ? [] : images
}
