---
title: "How to Upload Jest Image Snapshot Diffs to S3"
description: "Add snapshots from failed to S3 to enable running jest-image-snapshot on continuous integration server."
image: /posts/220126/220126--jest-snapshot-s3.png
tags:
  - jest
  - testing
---

Every time I open a PR for this blog site that does anything more than add blog content, I run a visual regression test to ensure I didn't screw anything up.

I've been working with [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot) to help in that process. This library takes screenshots when there are differences in snapshots.

## Why S3?

This process is super helpful when running locally. I see the specs fail and I'm pointed to where the images are on my machine.

But when these specs run in an ephemeral environment like most [continuous integration](/posts/wtf-is-continuous-integration) (CI) servers, I won't be able to access those files. They'll be gone by the time the test has failed.

To make these files viewable and still be able to run visual regression tests in CI, I upload the failed snapshots to S3. This is how I do it.

## Prerequisites

This post assumes:

- A Jest test suite configured for your project.
- You can programmatically access AWS. ([See this post if not](/posts/credentials-node-aws-sdk/).)

## Add Image Reporter

First, let's add the code that will upload the image snapshot on failure.

{% callout type="note" %}
I like to put all my Jest config files (except the main config) in a `.jest` directory. You can put it wherever.
{% endcallout %}

`.jest/image-reporter.js` {.filename}

```js
const chalk = require("chalk");
const fs = require("fs");
const AWS = require("aws-sdk");

// s3 bucket name
const bucket = process.env.AWS_BUCKET;
// directory in the bucket to place snapshots
const rootPath = "jest/diff_output";

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onTestResult(test, testResult, aggregateResults) {
    if (
      testResult.numFailingTests &&
      testResult.failureMessage.match(/snapshot/) &&
      testResult.failureMessage.match(/different/)
    ) {
      // location of local generated snapshots
      const files = fs.readdirSync(
        "./__tests__/__image_snapshots__/__diff_output__/"
      );
      files.forEach((value) => {
        // path to where they snapshots are stored in s3
        const path = `${rootPath}/${value}`;
        const params = {
          Body: fs.readFileSync(
            `./__tests__/__image_snapshots__/__diff_output__/${value}`
          ),
          Bucket: bucket,
          Key: path,
          ContentType: "image/png",
        };
        s3.putObject(params, (err) => {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(
              chalk.red.bold(
                `Uploaded image diff file to <https://$>{bucket}.s3.amazonaws.com/${path}`
              )
            );
          }
        });
      });
    }
  }
}

module.exports = ImageReporter;
```

Even though there's some length to this file, there’s not a whole lot happening. `ImageReporter` is a class that has an `onTestResult` method, which conditionally uploads failed snapshots to S3.

If you're interested in digging further, [here is more info on Jest reporters](https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options).

{% callout type="note" %}
[Here's a link to this file](https://github.com/seancdavis/seancdavis-com/blob/2f98b55/.jest/image-reporter.js) in my repo. This was heavily influenced by [this file](https://github.com/americanexpress/jest-image-snapshot/blob/2ef1ca8/examples/image-reporter.js) that the library recommends. If you're having trouble with my version, you may want to try the library's version.
{% endcallout %}

## Update Jest Config

[Assuming AWS is configured](/posts/credentials-node-aws-sdk/), you can then configure Jest to use the reporter. [This is what it looked like for me](https://github.com/seancdavis/seancdavis-com/blob/2f98b55/jest.config.js#L11), but this is a bit of a goofy configuration. If you have a more standard Jest config, it probably will look more like this:

`jest.config.js` {.filename}

```js
module.exports = {
  reporters: ["default", "<rootDir>/image-reporter.js"],
  // other config items ...
};
```

## Resources

My solution was heavily influence by [this section of the jest-image-snapshot doc](https://github.com/americanexpress/jest-image-snapshot#upload-diff-images-from-failed-tests). That points to [this file](https://github.com/americanexpress/jest-image-snapshot/blob/2ef1ca8/examples/image-reporter.js). It was really close to what I needed, but I had to change a few values to get it to work for me.
