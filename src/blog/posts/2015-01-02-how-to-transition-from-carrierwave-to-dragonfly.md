---
title: How to Transition from CarrierWave to Dragonfly
tags:
  - ruby-on-rails
description: It can be a process to move away from CarrierWave once you're already using it. Here's a step-by-step process to make it easy to transition to Dragonfly.
---

Since I started developing with Rails, I've always used [CarrierWave](https://github.com/carrierwaveuploader/carrierwave) for my file uploading. It was recommended to me right away, and I've loved it.

And I do still love CarrierWave. It's easy to use and it keeps all the uploading logic out of your model (unlike [Paperclip](https://github.com/thoughtbot/paperclip)).

But I've recently discovered [Dragonfly](http://markevans.github.io/dragonfly). And while I haven't yet determined how scalable it is, I can definitely speak for how well it handles resizing images. The biggest benefit to Dragonfly is that you can resize images on the fly. So, when you need to be flexible with image sizing/cropping, Dragonfly is your best bet because it only stores one file but makes all these sizes available to you.

With all that, we'll take a look at how you can convert a rails app already using CarrierWave to one using Dragonfly.

## 01: Store References

Before we remove CarrierWave, we need to store references to the files from CarrierWave. Since configurations differ greatly, we should probably just create a quick CSV reference.

Although there are some gems for this purpose, let's just build a quick solution using rake tasks. We'll store our results to file so we don't have to mess with the database.

Create a rake task and add the following.

_Note: This is an example that assumes an `Image` model with an uploader attribute attached to `image`. You should add your model settings to the `config` hash._

`lib/tasks/store_cw_refs.rake` {.filename}

```ruby
require 'csv'
require 'fileutils'
require 'open-uri'

desc 'Store references to CarrierWave files'
task :store_cw_refs => :environment do

  # This example assumes an Image model with an attached "image" uploader. Add
  # your models and their attributes here.
  #
  # If your model has more than one uploader, then reuse the model, but add each
  # in their own hash here.
  #
  config = [
    {:model => Image, :attr => :image}
  ]

  # Create storage directories
  #
  # If you want to rename this directory, do so below:
  #
  storage_dir = "#{Rails.root}/lib/cw_refs"
  FileUtils.mkdir_p(storage_dir) unless Dir.exists?(storage_dir)

  # Write to CSV files based on config and download files
  #
  config.each do |c|

    # create references to this group of files
    #
    config_file = "#{c[:model].to_s.underscore}_#{c[:attr].to_s}"
    dir = "#{storage_dir}/#{config_file}"
    csv_file = "#{dir}/#{config_file}.csv"
    FileUtils.mkdir_p(dir) unless Dir.exists?(dir)

    # Create CSV file
    #
    File.open(csv_file, 'w+') do |f|
      f << "id,#{c[:attr].to_s}\n"
    end
    puts "CREATED CSV FILE >> #{csv_file.split('/').last}"

    # Step through each record, store the reference and download the file
    #
    File.open(csv_file, 'a') do |f|

      # Step through each record in the database for this config
      #
      c[:model].all.each do |obj|

        # We don't need to waste our time if we don't have any data
        #
        unless obj.send(c[:attr].to_s).to_s.blank?

          # The url reference to the file (using your CarrierWave uploader). You
          # may have to change this based on your config.
          #
          url = obj.send(c[:attr].to_s).url

          # Safely parse and encode the url if using fog storage.
          #
          # NOTE: ONLY UNCOMMENT THIS LINE IF YOU ARE USING FOG STORAGE
          #
          # url = URI.parse(URI.encode(url.strip))

          # Create directory for storing file, then download the file.
          #
          img_dir = "#{dir}/#{obj.id}"
          img_file = "#{img_dir}/#{url.to_s.split('/').last}"
          img_filename = img_file.split('/').last
          FileUtils.mkdir_p(img_dir) unless Dir.exists?(img_dir)
          puts "DOWNLOADING IMAGE >> #{img_filename} ..."
          open(img_file, 'wb') do |file|

            # If using fog storage ...
            #
            # file << url.open.read

            # If using local storage ...
            #
            file << File.read(url)
          end
          puts "STORED IMAGE >> #{img_filename}"
          f << "#{obj.id},\"#{img_file}\"\n"
          puts "RECORDED REFERENCE TO >> #{img_filename}"

        end # << if not blank
      end # << step through records
    end # << csv write
  end # << step through config
end # << rake task
```

Consider these important notes about this rake task:

- It assumes you are using CarrierWave to process uploads.
- I tested this using fog storage. If you are using fog storage, make sure you read the comments and uncomment the two lines mentioned to avoid errors in your URL and in downloading the file. Otherwise, the download _should_ work.
- There are other approaches that could work better here. If you have a suggestion, question or change, please leave a comment [here](https://gist.github.com/seancdavis/b86cfab4b701e2bbe9d0).

## 02: Remove CarrierWave

### Remove & Replace Gems

The first thing to do is to remove the CarrierWave gems from your `Gemfile`. Depending your configuration, you may be using any one of these gems:

- `carrierwave`
- `carrierwave_direct`
- `fog`
- `rmagick`

Remove these gems. In their place, add the dragonfly gem.

`Gemfile` {.filename}

```ruby
gem 'dragonfly'
```

_Note: This will handle local uploads. If you are wanting to use remote storage, such as with Amazon S3, you'll need to find a gem to help you. For example, I use [this gem](https://github.com/markevans/dragonfly-s3_data_store) for uploading to S3._

_Also note: We aren't going to account for fog storage in this article._

Then install your new gems and clean up the old.

    $ bundle install
    $ bundle clean

_Note: We install the bundle before cleaning it because we just might be able to reuse some of the gems required by CarrierWave._

### Remove Configuration

You'll want to remove any initializers that you have installed with CarrierWave, as they will cause errors when try to start your server. It's _possible_ you don't have any config files, but I typically have one at `config/initializers/carrierwave.rb`.

_Note: I typically just comment out this file to ensure everything is working fine, but with git and in keeping the transition simple, deleting it shouldn't be a problem._

### Restart Server

At this point you _should_ be able to restart your server, although several views (and some models) will be broken. Just check to ensure you can at least get your server running.

    $ bundle exec rails s

### Remove Uploaders

Next, we can get rid of any files in `app/uploaders`.

**WARNING: It's good practice to record the thumb sizes you were using, because you may need those (although you'll keep them in a different place).**

You also need to delete references to any uploaders in your models. Using our example, we have:

`app/models/image.rb` {.filename}

```ruby
class Image < ActiveRecord::Base

  mount_uploader :image, ImageUploader

  # ...
```

Get rid of any mounted uploaders. We'll be coming back to these files, but let's make sure we've successfully removed CarrierWave first.

Now, kill your server and restart it to ensure we're good to go.

    $ bundle exec rails s

If you don't see any errors, then you can move on to installing Dragonfly (although you still will likely encounter some view errors, so you won't be able to render every page).

## 03: Add & Configure Dragonfly

### Install ImageMagick

Before we get into Dragonfly, make sure [ImageMagick](http://www.imagemagick.org/) is installed. My guess is that if you were using CarrierWave, you probably already have it installed.

If not, install it. Google is your friend here, although here are two scenarios:

#### Mac OS X

    $ brew install imagemagick

#### Ubuntu

    $ sudo apt-get install imagemagick

### Configure Dragonfly

You can follow [the guide](http://markevans.github.io/dragonfly/rails) for installing with rails.

First, generator the config file:

    $ bundle exec rails generate dragonfly

This creates a file at `config/initializers/dragonfly.rb`. Take a look at this file and adjust as you need to.

_Here is where I suggest reading a bit on Dragonfly if you have not yet. I'm not teaching you how to use, just how to make the transition. So, become familiar with Dragonfly and then edit your config file as needed._

### Add Database Columns

Dragonfly does not mount itself directly to a column. Instead it uses [an accessor](http://apidock.com/ruby/Module/attr_accessor). The way in which we name the columns is different.

For example, if you are going to mount the uploader to an `image` attribute, the actual database column needs to be `image_uid`. I also prefer to store the name. So, let's keep our example. If I have an `Image` model and an `image` attribute, I would first generate the migration:

    $ bundle exec rails g migration add_dragonfly_attrs_to_models

In this new migration, I would have:

```ruby
def change
  rename_column :images, :image, :image_uid
  add_column :images, :image_name, :string
end
```

You'll want to configure this based on your model and attribute names.

_Note: However you decide to approach, just make sure you don't keep a physical column that is named the same as the attribute you're going to mount, as we want to avoid naming conflicts._

### Adjust Models

Remember when we got rid of all the `mount_uploader` method calls in our models? Now, you're going to replace them. Go back to each model and add the accessor.

For every model and every uploader column, you have to mount the dragonfly accessor, like so (keeping with our example):

`app/models/image.rb` {.filename}

```ruby
class Image < ActiveRecord::Base

  dragonfly_accessor :image

  # ...
```

## 04: Re-Upload Files

If you've made the transition successfully, at this point you'll be able to re-import the files.

Again, we're going to use another rake to make importing nice and easy.

`lib/tasks/dragonfly_import.rake` {.filename}

```ruby
require 'csv'

desc 'Import local files (with csv references) using Dragonfly'
task :dragonfly_import => :environment do

  config = [
    {:model => Attachment, :attr => :document}
  ]

  storage_dir = "#{Rails.root}/lib/cw_refs"

  config.each do |c|

    config_file = "#{c[:model].to_s.underscore}_#{c[:attr].to_s}"
    dir = "#{storage_dir}/#{config_file}"
    csv_file = "#{dir}/#{config_file}.csv"

    CSV.foreach(csv_file, :headers => true) do |row|
      obj = c[:model].find_by_id(row['id'].to_i)
      unless obj.nil?
        file = File.open(row[c[:attr].to_s])
        unless file.nil?
          if obj.update(c[:attr].to_sym => file)
            puts "IMPORTED FILE >> #{row[c[:attr].to_s].split('/').last}"
          else
            puts "-- COULD NOT IMPORT FILE >> #{row[c[:attr].to_s].split('/').last}"
          end
        end
      end
    end
  end
end
```

> Note: This shares a lot of similarity to the original file. I've removed the comments, but you can comment on this file in [the gist](https://gist.github.com/seancdavis/b86cfab4b701e2bbe9d0) as well.

Run it!

    $ bundle exec rake dragonfly_import

If that worked, then you would have received output from the console when running the rake task. And if you are using the default configuration for dragonfly, then you should see files in the `public/system/dragonfly` directory.

## 05: Fix View Files

This step may take you awhile. You'll want to run your tests (or do some solid browser testing) to ensure you've caught all instances.

Refer again to [this page](http://markevans.github.io/dragonfly/rails/#handling-attachments) for how to handle URLs. The gist of it is:

- Standard URLs (original image references) should be the same. For example, the `image.image.url` format will still work.
- If you were using versions, that's what you'll have to change. So, something like `image.image.url(:small)` or `image.image.small.url` will change to something like `image.image.thumb('200x200#').url`.

[Read this](http://markevans.github.io/dragonfly/imagemagick/) to learn how Dragonfly works with ImageMagick.

That's as far as we're going to go here. Once you fix your view files, your app is ready for you to customize Dragonfly. Go nuts!

---

**Links:**

- [Transition from CarrierWave to Dragonfly in Rails](https://gist.github.com/seancdavis/b86cfab4b701e2bbe9d0)
