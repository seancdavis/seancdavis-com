---
title: Use Slack For Rails Error Notification
description: Post a message to one of your Slack channels when your Rails app
  encounters a 500 error.
tags:
  - ruby
  - ruby-on-rails
  - slack
image: /posts/default/default-pink-01.png
---

You want to know when your production app encounters an error, right?

[Exception Notification](https://github.com/smartinez87/exception_notification) works pretty well for trapping errors and sending notifications to your inbox. But let's just say you despise email and you want, instead, to create a feed of error messages in one of your Slack channels.

Well, let's get started.

## Exception Notification

First, we'll still use Exception Notification, so let's get that setup. Add the gem to your Gemfile.

`Gemfile` {.filename}

```ruby
gem 'exception_notification'
```

Install it.

    $ bundle install

Then you need to add the config. I tend to make it its own initializer, but feel free to add it where it makes sense to you.

`config/initializers/errors.rb` {.filename}

```ruby
if Rails.env.production?
  Rails.application.config.middleware.use(
    ExceptionNotification::Rack,
    :email => {
      :email_prefix => EMAIL_PREFIX,
      :sender_address => [SENDER_ADDRESS],
      :exception_recipients => [RECIPIENTS]
    }
  )
end
```

Replace my constants with your values. For example, for `EMAIL_PREFIX`, I might use `'[My App ERROR] '`. This becomes the subject of the email. I'll probably send it _from_ something like `noreply@myapp.com` and to `me@myapp.com`. Do what makes sense for you.

Also notice that I have wrapped this in an environment conditional. I only care about loading the config when I'm in production.

Next, be sure **you have email configured for your production server.** I'll assume you already have that working since other functions, like resetting a password, are often done via email (in other words, I'd hope mail is already working on your production server).

At this point, why not deploy and see if it is working? We'll need this to be functional before we move on. I suggest you have a hidden or fairly less common way to create an error that won't affect regular usage for your current users.

## IFTTT

If you haven't heard of [IFTTT](https://ifttt.com/wtf), it's a nice service that follows logic you tell it to perform tasks for you (the "IFTTT" stand for "if this, then that").

Sign up for the service and then let's create a new recipe. Go to _My Recipes_ and click _Create Recipe_.

{% post_image
    src="/posts/151222/ifttt-recipe-01.png",
    alt="Use Slack for Rails Error Notification" %}

Your _this_ is going to be _Email_. So click _this_ and then type in and select _Email_.

{% post_image
    src="/posts/151222/ifttt-recipe-02.png",
    alt="Use Slack for Rails Error Notification" %}

Next, choose to _Send IFTTT an email tagged_. The tag can be anything you want. I just use `#error`.

{% post_image
    src="/posts/151222/ifttt-recipe-03.png",
    alt="Use Slack for Rails Error Notification" %}

Your _that_ is _Slack_, and you want to _Post To Channel_.

{% post_image
    src="/posts/151222/ifttt-recipe-04.png",
    alt="Use Slack for Rails Error Notification" %}

You'll have to authenticate your Slack app first. Then, choose the channel and configure the message however you would like it formatted. Remember you really just have a `Subject` and `Body` to work with.

{% post_image
    src="/posts/151222/ifttt-recipe-05.png",
    alt="Use Slack for Rails Error Notification" %}

And last, create the recipe.

## Reconfigure Exception Notification

Last, you need to update your Exception Notification configuration so it matches IFTTT's specs.

Be sure you do the following:

- Add the hashtag to your `EMAIL_PREFIX`, including the `#` mark.
- The email must come from the address that matches your IFTTT user account.
- At least one of the recipients must be `trigger@recipe.ifttt.com`.

Make those changes, deploy to production and then give it a whirl (again, that hidden 500 error comes in handy here).
