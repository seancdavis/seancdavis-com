---
title: WTF is a Fixture?
description: A quick introduction what fixtures are in software, along with
  other purposes they can serve.
tags:
  - wtf
image: /posts/default/default-lime-01.png
---

In software engineering, a _test fixture_, often shortened to _fixture_, is a mechanism for putting code in a _fixed_ state so it can be more easily tested. Fixtures enable tests to focus on the specific thing being tested, rather that needing to worry about setting up and tearing down before and after the test is run.

For example, consider if we wanted to test what happens when a user clicks on a button on one page, and also what happens when a user fills out a form on another page. Before the tests run, we'd create a user from known (or random) data. Then we can make that user — the _fixture_ — be the subject of our tests.

Fixtures don't have to be used just for testing. In fact, I often use them more outside of testing. Fixtures can also serve as the basis for predictable (fixed) data to use during the development process. For example, in a [Ruby on Rails](https://rubyonrails.org/) project, I'd use that same method of creating a user for a test as I would to create the user as I'm building out the application. Or in a [Gatsby](https://www.gatsbyjs.org/) project, I might use a fixture to represent properties sent to a component before the data source is available.

Fixtures can have many uses. Their purpose is simply to provide a set of fixed data — to stabilize the state of the application — so we can stay focused on the work at hand, whether that be writing a test or styling a button.

If you'd like to learn more about fixtures, [Wikipedia has a good entry on the subject](https://en.wikipedia.org/wiki/Test_fixture).
