---
title: Adding S3 Credentials for Node.js AWS SDK
description: "My go-to method for gaining access to AWS using the Node.js tooling."
image: "/blog/210820/lime--aws-sdk-creds.png"
tags:
  - javascript
  - node
---

Long story short, it's Amazon — there are [way too many ways to set credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html).

Though my preferred method is not the recommended way, I find that it plays well with setting other environment-based values for your application. That is by using [environment variables](/blog/wtf-is-environment-variable/).

The [AWS SDK](https://github.com/aws/aws-sdk-js-v3) automatically [looks for your credentials in environment variables](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html). You can set the following values:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Then it'll just work, like magic!

A big benefit to this approach is that you can have multiple projects on your machine and set these values contextually based on the project you're working with.

To learn more about setting variables in [JavaScript](/blog/wtf-is-javascript/), see [this guide](/blog/set-env-var-js-projects/).
