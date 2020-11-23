---
title: Related Content (without metadata) in Rails using tf-idf
tags:
  - ruby_on_rails
description: Sometimes metadata isn't available. Other times you don't want to rely on it. Here's a method for finding related content using term frequency / inverse document frequency.
---

_Note: I'm using Ruby 2.1 and Rails 4.1 here -- other versions *may* not be compatible._

Don't need background? You can [_skip to the code_](#the-code). You can also [view the consolidated code](https://gist.github.com/seancdavis/fa07542fa8dab0310b9c).

Marketing folks have discovered a great way to keep people on your site is to intelligently recommend where the visitor should go after they are done with the current page. In the blogging world, this is most frequently executed via _related posts_.

Our challenge is _how do we programmatically determine the relatability of a particular post?_

During one iteration on [The Polymath Lab](http://thepolymathlab.com), I had 77 published posts to move over. Not that many. I worked through several solutions before finding one I was satisfied with. And, even so, with less than 100 posts, it's can be difficult to be accurate, especially when the topics of this space are so widespread.

## Approaches

### Tags & Other Metadata

Typically, the most effective way to accomplish this is to look at metadata and find posts with similar metadata, and then use some other means by which to relate them. You could even weigh different types of data.

Many times this approach works very well, but what if you don't have metadata? Or, what if we want to relate items based on content alone?

As an example, in my case, when moving content over, I had only two posts tagged with _git_. While they would be related to each other, they likely have content similar to other articles on web development, though they might not share tags. Tags should be specific, after all. So, I wanted to look at content alone.

### Content-Only Relatability

Okay, so let's say we have no metadata. To sum up the approach, we're going to look for _an intersection of words, while weighing each word based on its frequency_.

You may have heard of [_stop words_](https://en.wikipedia.org/wiki/Stop_words) or _noise words_. These are words that are used so frequently they should be ignored when looking for meaningful and relatable words.

#### Term Frequency-Inverse Document Frequency

Let's take a look at the [_tf-idf_](http://en.wikipedia.org/wiki/Tf%E2%80%93idf) approach. According to Wikipedia:

> Term frequency-inverse document frequency is a numerical statistic that is intended to reflect how important a word is to a document in a collection or corpus.

Here's how were going to relate this theory to posts.

1. Strip down each post so we have only the content -- no [HTML](/wtf-is-html) markup, no code, etc.
2. For each post in _the collection_, find the words that intersect with the post at hand. Multiple each of those words by its `idf` and sum to get a related score for each post.
3. Sort and cache a list of the top five.

#### Scalability & Scoping

Scalability becomes an issue when we considering the scope of _the collection_ mentioned in #2 above. If we consider the collection to be our entire blog site, then the process becomes heavier and heavier as we draft more posts.

While I don't have this issue yet, if you have hundreds or thousands of posts, I'd recommend scoping the posts you pull from. For example, if you do have tags or categories, you could say _only those items that share at least one tag in common are eligible to be related_. Or, you could say _only posts published within the last six months are eligible_ if you're pumping out a lot of content.

I'll leave scoping up to you.

## The Code

We're going to squeeze the code into just your model and controller. I've abstracted this to a [service object](https://netguru.co/blog/service-objects-in-rails-will-help) to keep my model lighter, but it will make more sense if we look at all the logic in one place.

My example here uses a `Post` model that has a `body` column. You can use any model or column you wish, just make note to change the code.

## 01: Cache the Post's Words

The first thing to do is to cache the words of each post on the post's record. We could figure this out on the fly, but it will make looking for related posts much faster if we store it.

### Cache Column

Give yourself a column for `words`:

    $ bundle exec rails g migration add_words_to_posts words:text
    $ bundle exec rake db:migrate

### Model Logic

We're going to need a few gems to help us here:

`Gemfile` {.filename}

```ruby
gem 'htmlentities'
gem 'nokogiri'
```

Install them:

    $ bundle install

Since we are going to cache our words on the post record, we should do it every time the post is saved, but only if the body changed. A good way to do this is to put it in an `after_save` callback.

_Don't forget to include our `SanitizeHelper` -- we're going to use it to strip tags from our post._

`app/models/post.rb` {.filename}

```ruby
include ActionView::Helpers::SanitizeHelper

class Post < ActiveRecord::Base

  after_save :update_words!

  def update_words!
    require 'htmlentities'; require 'nokogiri'
    # create an HTML object
    doc = Nokogiri::HTML.parse(body)
    # remove text within <pre> and <code> elements
    doc.xpath("//pre").remove.xpath("//code").remove
    # pull text (with tags) from HTML and remove all newlines
    words = doc.text.gsub(/\n/, '').downcase
    # strip tags from HTML
    words = HTMLEntities.new.decode(sanitize(words, :tags => []))
    # split our words into an array on common word delimiters
    words = words.split(/\ |\.|\,|\!|\?|\//).reject(&:blank?).sort.join(',')
    # remove any non-alpha characters and make into a string
    words.gsub(/[^a-z\,]/i, '').split(',').reject(&:blank?).sort.join(',')
    # save the words to the database
    update_columns(:words => words)
  end

end
```

_Here we call `update_columns` instead of `update` because `update_columns` will skip any callbacks. If we called `update` in this method, we would run into an endless loop._

Try to save a post now and you should see your words cached in the database.

**Be sure to restart your server so the `RelatedPost` class is loaded.**

## 02: Calculating the Word Factor (Inverse Document Frequency)

Ready to use a logarithm? I bet you haven't done that recently.

We could tuck this method away somewhere, but let's leave it in the model for now. But, since we're not going to call this externally, we could make it a private method, so we can only call it from within the model.

`app/models/post.rb` {.filename}

```ruby
class Post < ActiveRecord::Base

  # ...

  private

    def inverse_document_frequency(posts)
      # start with an empty hash
      words = {}
      # step through each post
      posts.each do |post|
        # run `process_words` if the `words` column is empty
        RelatedPost.process_words(post.body) if post.words.blank?
        # split words into a unique array (each word only appears once)
        post.words.split(',').uniq.each do |word|
          # add one to the count of the word in the overall words hash
          words[word] = 0 if words[word].nil?
          words[word] += 1
        end
      end
      # step back through the words and run the idf formula to
      # come up with a frequency factor
      words.each do |word, freq|
        words[word] = Math.log(posts.size / freq)
      end
      words # return the hash
    end

end
```

As I mentioned at the beginning of this post, this calculation will be run every we need to find related posts. This can, over time, get heavy if you are sending all posts to the function. One way to cut it down is to limit the number of posts you're considering. Another way is simply to run this method only, say, once every day, and cache it elsewhere.

## 03: Saving Related Posts

We could create a join table or a join model to store related posts. But since we're only going to grab related posts after a post has been loaded, why not just cache them on the post record as well? Let's add that column.

    $ bundle exec rails g migration add_related_posts_to_posts related_posts
    $ bundle exec rake db:migrate

_Notice we don't give a column type to `related_posts`. If you didn't know, rails assumes this means you want it to be a string._

While I cache the words on the post after every save, I'm not going to automatically cache related posts. You could certainly do this, but the logic can get hairy.

For example, if I'm looking to store three related posts, then every time I save a post, I want to update the related posts on the current post, but I also want to then look at the three related posts to see if the current post is now related to them as well. So, I have to look for related posts on four posts every time I save a post. Keeping this logic in the controller makes it much easier to manage.

### The Logic

Here's how we're going to find the related posts.

`app/models/post.rb` {.filename}

```ruby
class Post < ActiveRecord::Base

  # ...

  def update_related!
    posts = Post.all; related = {}
    # notice here we're calling the ifd method from the
    # previous section, and using all posts in the call
    ifd = inverse_document_frequency(posts)
    # we only want to look at published posts,
    # while also ignoring the post of interest
    (posts.select(&:published?) - [self]).each do |post|
      # we find the number of times the words intersect
      # between each post and the post of interest, and add the
      # ifd factor for each intersection
      score = 0
      intersection = self.words.split(',').multiset(post.words.split(','))
      intersection.each { |word| score += ifd[word] }
      # we're left with a "score" for each post
      related[post.id] = score
    end
    # sort the posts and store the top 3
    related = related.sort_by { |k,v| v }.reverse
    related = related.collect { |k,v| k }.first(3).join(',')
    update_columns(:related_posts => related)
  end

  # ...

end
```

We use `multiset` instead of your typical [ruby array intersection](http://www.ruby-doc.org/core-2.1.3/Array.html#method-i-26) because we get duplicates returned, which we want in this case.

To manually add `multiset`, you can do something like this:

`config/initializers/array.rb` {.filename}

```ruby
class Array

  def multiset(arr)
    result=[]
    h1,h2=Hash.new(0),Hash.new(0)
    self.each { |x| h1[x] += 1 }
    arr.each { |x| h2[x] += 1 }
    h1.each_pair { |k,v| result << [k] * [v, h2[k]].min if h2[k] != 0 }
    result.flatten
  end

end
```

### Call It

Now you can call and store related posts from the controller. Let's say you wanted to do this in the `create` and `update` actions.

`app/controllers/posts_controller.rb` {.filename}

```ruby
class PostsController < ApplicationController

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      @post.update_related!
      @post.related.each { |p| p.update_related! }
      redirect_to @post, :notice => "Post was created successfully."
    else
      render 'new'
    end
  end

  def edit
    @post = Post.find_by_id(params[:id])
  end

  def update
    @post = Post.find_by_id(params[:id])
    if @post.update(post_params)
      @post.update_related!
      @post.related.each { |p| p.update_related! }
      redirect_to @post, :notice => "Post was updated successfully."
    else
      render 'edit'
    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :body, :published)
    end

end
```

## 04: Displaying Related Posts

The only thing remaining is to display the posts. Again, we'll tuck this logic away in an instance method within the model.

`app/models/post.rb` {.filename}

```ruby
def related
  Post.published.where(:id => related_posts.split(','))
end
```

We can call this from the controller. For example:

`app/controllers/posts_controller.rb` {.filename}

```ruby
def show
  @post = Post.find_by_id(params[:id])
  @related = @post.related.first(3)
end
```

**Links:**

- [Consolidated source code.](https://gist.github.com/seancdavis/fa07542fa8dab0310b9c)
