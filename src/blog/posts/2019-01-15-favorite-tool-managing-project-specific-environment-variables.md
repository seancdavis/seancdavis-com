---
title: My Favorite Tool for Managing Project-Specific Environment Variables
description: "With many local projects, environment variables often conflict with one another. I tried several tools before landing on my favorite for managing project-specific values."
---

How many code-based projects do you have on your machine? I have more than 30 that I've touched within the last month. More than half [use environment variables to manage sensitive and environment-specific data](/when-to-use-environment-variables.html).

If it hasn't happened yet, at some point you are going to run into a situation where two environment variables of the same name require different values for different projects. This usually happens with generically-named variables, like `GOOGLE_API_KEY` or `AWS_SECRET_ACCESS_KEY`.

## Trials and (Minor) Tribulations

I've gone through several iterations on handling project-specific settings.

For awhile I used tools like [Figaro](https://github.com/laserlemon/figaro) (for [Ruby on Rails](https://rubyonrails.org/)) to enable me to place project- and environment-specific values in a single file (ignored by git). This worked well, but I wasn't 100% happy with it because the tool was specific to Rails, so when I had front-end only apps, I was forced to use a different strategy. Managing environment variables differently from project to project made context switching even difficult.

Then I discovered [dotenv](https://www.npmjs.com/package/dotenv) which is built for JavaScript (solving most of my front-end problems), but also has [a ruby alternative](https://github.com/bkeepers/dotenv) that works similarly. After employing dotenv, I had project-specific environment-variable parity among most of the projects on my machine.

But I still wasn't _totally_ happy (apparently I can be difficult to please) because it didn't _just work_. I could have a `.env` file within my project with all my sensitive and environment-specific values, but unless I initialized dotenv, then values wouldn't be available at runtime.

## direnv To The Rescue!

I struggled down the dotenv road for for several months before discovering [direnv](https://direnv.net/)—the tool I should have been looking for from the beginning.

While dotenv hooks into the _process_ you run, direnv hooks into the _shell_, and thus is available to any process within a given shell session.

Direnv looks for a single file—`.envrc`—in any directory. When you change into a directory containing a `.envrc` file, it loads that file's contents into your environment (after you allow it)automatically. This means you don't have to do any extra work, the environment variables are set automatically. As a bonus, direnv knows when you've made changes to your `.envrc` file and prompts you to re-allow the file before it will load the values into your environment.

direnv supports several operating systems out of the box (although it seems like [Windows support is still being developed](https://github.com/direnv/direnv/issues/343) at the time of writing this article). Once you've [installed it](https://direnv.net/), working with it is super simple. Let's go through a quick example:

Use your terminal to change into a project directory:

    $ cd path/to/project

Create a `.envrc` file at the project root and export some environment variable. We'll use `MY_VALUE` as the test case:

`.envrc` {.filename}

```shell
export MY_VALUE="Hello World"
```

Now, when you type a new command or even just hit `Enter` in your terminal, you'll see a warning that a change has been made to the `.envrc` file, but you haven't approved it to pass into the environment just yet.

    $ ...
    direnv: error .envrc is blocked. Run `direnv allow` to approve its content.

So you simply do what it says and direnv will tell you what it loads into the environment:

    $ direnv allow
    direnv: loading .envrc
    direnv: export +MY_VALUE

Now if you export the environment variables you'll see your new value:

    $ ENV
    Other env vars ...
    MY_VALUE=Hello World

That's all you have to do, and now `ENV['MY_VALUE']` is available in your project, assuming you are running the project from a terminal session!
