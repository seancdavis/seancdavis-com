---
title: Rails on Heroku - Redirect Root Domain to www
description: How to use a "www" subdomain as your primary domain on a Rails app
  hosted with Heroku.
tags:
  - heroku
  - ruby-on-rails
image: /blog/default/default-pink-02.png
---

I deployed a [Ruby on Rails](https://rubyonrails.org/) application to [Heroku](https://www.heroku.com/home) that was being served via [a custom domain](https://devcenter.heroku.com/articles/custom-domains), using the `www` subdomain of a domain that I owned (e.g. www.example.com).

But I quickly realized that the `www` was not enough. Users are going to type in the web address manually, which meant that I also needed to support the root level domain (e.g. example.com). And, to make the experience cleaner, as a best practice, I knew I should redirect the root-level domain to the `www` subdomain.

## Resolving Root Domain on Heroku

It's not as straightforward as you may assume in getting root domains to resolve to your app on Heroku. That's because Heroku [requires that all domains use `CNAME`-like records](https://help.heroku.com/NH44MODG/my-root-domain-isn-t-working-what-s-wrong), and most DNS providers don't offer the ability to create `ALIAS` or `ANAME` records for root-level domains.

I've found there are three options that work with varying degrees of success.

### Option 1: Forward root domain to "www"

If your DNS host doesn't provide the ability to add `ALIAS` or `ANAME` records to your root domain, they likely enable you to forward requests to that root-level domain to another domain.

So, in a pinch, you could forward your root domain to the `www` version.

The problem with that approach is that it doesn't support SSL certificates. And Heroku provisions these certificates for free.

In other words, if you forward at the domain level, `http://example.com` could forward to `https://www.example.com`, but `https://example.com` would not resolve.

### Option 2: Use a naked domain redirect

Another option would be to use a naked (or root) domain redirecting service like [wwwizer](http://wwwizer.com/). In this case, you would create an `A` record for the root domain, point it to wwwizer's IP address, and it will resolve to the `www` subdomain.

I've had trouble getting this to resolve in the past, but it's worth a shot if you are registered with a DNS host that doesn't support `CNAME`-like records on the root domain.

### Option 3: Find a DNS host that supports ALIAS records

The option I prefer is to go with a DNS host that support `CNAME`-like records on the root domain. There are a handful out there, but two of my favorites are [Namecheap](https://www.namecheap.com/) and [DNSimple](https://dnsimple.com/).

You can transfer your existing domain to one of these services. That process usually takes about a week. And then you'll be able to register the `ALIAS` record with your new host.

## Redirecting Root to "www" Subdomain in Rails

It's not ideal to perform this redirect within the Rails application, as it's going to take a lot longer than if you can do it at the web server level. However, you don't have access to that level with Heroku, and therefore your options are limited.

I accomplished this by adding a `before_action` hook in my `ApplicationController` to redirect non-www requests to the www subdomain. That looked something like this:

```ruby
class ApplicationController < ActionController::Base

  before_action :redirect_root_domain

  # ...

  private

    def redirect_root_domain
      return unless request.host === 'example.com'
      redirect_to("#{request.protocol}www.example.com#{request.fullpath}", status: 301)
    end

end
```

This will effectively redirect the root-level domain to the "www" subdomain. You'll just want to change out the value for the domain.
