---
title: Preview Emails in Rails
tags:
  - ruby-on-rails
description: Rails 4.1 introduced the ability to preview email messages from
  your mailers without sending an email. Learn how ...
image: /posts/default/default-green-01.png
---

As of Rails 4.1, you can now preview emails while developing (without sending an
email). Let's say you have a mailer that looks like this:

`app/mailers/notification_mailer.rb` {.filename}

```ruby
class NotificationMailer < ActionMailer::Base

  def welcome(user)
    @user = user
    mail :to => user.email, :from => 'me@mydomain.com',
      :subject => 'Welcome!'
  end

end
```

To preview it, create a file in `test/previews` and call the mailer method just
as you would from any model or controller in your app.

`test/previews/notification_preview.rb` {.filename}

```ruby
class NotificationPreview < ActionMailer::Preview

  def welcome
    NotificationMailer.welcome(User.first)
  end

end
```

Then you can preview the email at [/rails/mailers/notification/welcome](http://
rails/mailers/notification/welcome).

> Notice the preview route matches the **preview class name** and then
> **preview method**, which doesn't necessarily need to be related to the
> mailer itself.
>
> Also note the preview filename is appended with `_preview`.
