const chalk = require("chalk")
const fs = require("fs")
const AWS = require("aws-sdk")

const bucket = process.env.AWS_BUCKET
const rootPath = "jest/diff_output"

const s3 = new AWS.S3({ apiVersion: "2006-03-01" })

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onTestResult(test, testResult, aggregateResults) {
    if (
      testResult.numFailingTests &&
      testResult.failureMessage.match(/snapshot/) &&
      testResult.failureMessage.match(/different/)
    ) {
      const files = fs.readdirSync("./__tests__/__image_snapshots__/__diff_output__/")
      files.forEach(value => {
        const path = `${rootPath}/${value}`
        const params = {
          Body: fs.readFileSync(`./__tests__/__image_snapshots__/__diff_output__/${value}`),
          Bucket: bucket,
          Key: path,
          ContentType: "image/png"
        }
        s3.putObject(params, err => {
          if (err) {
            console.log(err, err.stack)
          } else {
            console.log(
              chalk.red.bold(
                `Uploaded image diff file to https://${bucket}.s3.amazonaws.com/${path}`
              )
            )
          }
        })
      })
    }
  }
}

module.exports = ImageReporter
