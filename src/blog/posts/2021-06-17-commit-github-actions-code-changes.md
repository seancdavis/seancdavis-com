---
title: Commit Code Changes Using GitHub Actions
description: Commit file changes created during a GitHub automated workflow run.
image: /blog/210617/pink--github-actions.png
tags:
  - github
  - testing
---

[Actions](https://github.com/features/actions) is a super powerful GitHub feature that enables you to execute automated code based on some trigger. It is most often used as a [continuous integration](/blog/wtf-is-continuous-integration/) tool — to run your test suite when pushing or creating a pull request. I like to think of them as _workflows_ (partially because you put your configuration code in a `.github/workflows` directory).

Sometimes you may perform some action that changes code and you want that code to be committed back to your repository.

Well, lucky for you, there is a GitHub Action already built to support this: [@stefanzweifel/git-auto-commit-action](https://github.com/stefanzweifel/git-auto-commit-action).

Let's say you have an action that simply installs dependencies and runs your test suite with `npm run test`. The configuration for that workflow may look something like this:

`.github/workflows/ci.yml` {.filename}

```yaml
name: Run CI
on: [push]
jobs:
  Run-All-Tests:
    name: "Run All Tests"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm run test
```

Super! That'll run your tests and provide feedback on whether they passed or not (assuming your test suite is configured correctly).

## Auto-Committing Changes

Now, suppose `npm run test` changed some files that you want to commit back to the repository. You can add the git-auto-commit-action at the end of the workflow to commit any changes back to the repository.

Together, it looks like this:

`.github/workflows/ci.yml` {.filename}

```yaml
name: Run CI
on: [push]
jobs:
  Run-All-Tests:
    name: "Run All Tests"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm run test
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "[Bot] Update all the things!"
          commit_user_name: Ian Malcolm
          commit_user_email: ian@example.com
          commit_author: Ian Malcolm <ian@example.com>
```

{% callout type="note" %}
Notice you have the option to specify the commit message and author.
{% endcallout %}

## Adjusting for Other Triggers

The above code should work just great when using a `push` trigger. ([See here for more info on trigger events](https://docs.github.com/en/actions/reference/events-that-trigger-workflows).)

But if you want to use this action on anything other than a push event, you will have to [store a reference to the current branch](https://github.com/stefanzweifel/git-auto-commit-action#checkout-the-correct-branch).

`.github/workflows/ci.yml` {.filename}

```yaml
name: Run CI
on: [pull_request]
jobs:
  Run-All-Tests:
    name: "Run All Tests"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.head_ref }}
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm run test
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "[Bot] Update all the things!"
          commit_user_name: Ian Malcolm
          commit_user_email: ian@example.com
          commit_author: Ian Malcolm <ian@example.com>
```

Notice the change here — we added a reference to the `actions/checkout` action to tell the git-auto-commit-action which branch to push.

## Other Gotchas!

There are other items to note when working with this action. They are well-documented. Be sure to first check out [the README for this project](https://github.com/stefanzweifel/git-auto-commit-action) if you have any issues.
