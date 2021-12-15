---
title: Rails has_many :through Polymorphic Association
tags:
  - ruby-on-rails
description: How to maintain HMT behavior on a polymorphic association.
image: /posts/default/default-orange-02.png
---

If you're not familiar with the [`has_many ..., :through ...`](http://guides.rubyonrails.org/association_basics.html#the-has-many-through-association) association in rails, it's a great way to add a many-to-many relationship, between two models, _while storing more than just the association on the join model_.

## The Simple Way

Let's say you have a `Post` model and it has a many-to-many relationship with a `Tag` model. You might use a `Tagging` model to connect the two. A simple setup might look like this:

`app/models/post.rb` {.filename}

```ruby
class Post < ActiveRecord::Base
  has_many :taggings
  has_many :tags, :through => :taggings
end
```

`app/models/tag.rb` {.filename}

```ruby
class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :posts, :through => :taggings
end
```

`app/models/tagging.rb` {.filename}

```ruby
class Tagging < ActiveRecord::Base
  belongs_to :tag
  belongs_to :post
end
```

Where the `taggings` table would have a `post_id` and `tag_id` integer columns.

## Making It Polymorphic

But what if you need to extend your `Tagging` model so you can tag all sorts of other models, like an `Image` model, for example? The best way to do that is through a [polymorphic association](http://guides.rubyonrails.org/association_basics.html#polymorphic-associations).

In this case, you would replace your `post_id` column on your `Tagging` model with `taggable_id` (integer) and `taggable_type` (string) columns. Then, your join model would look like this:

`app/models/tagging.rb` {.filename}

```ruby
class Tagging < ActiveRecord::Base
  belongs_to :tag
  belongs_to :taggable, :polymorphic => true
end
```

For the post model, we now have to know we are getting to the `Tag` model _through_ the `taggable` polymorphic association. So, your `Post` model changes to:

`app/models/post.rb` {.filename}

```ruby
class Post < ActiveRecord::Base
  has_many :taggings, :as => :taggable
  has_many :tags, :through => :taggings
end
```

And let's say you wanted to make an image model taggable. That would look like this:

`app/models/image.rb` {.filename}

```ruby
class Image < ActiveRecord::Base
  has_many :taggings, :as => :taggable
  has_many :tags, :through => :taggings
end
```

That's it. That's easy. Except, for example, if you want to list all the posts from a certain tag, then you can't get there by doing this:

```ruby
@tag = Tag.find_by_id(params[:id])
@posts = @tag.posts
```

You _could_ do this:

```ruby
@tag = Tag.find_by_id(params[:id])
@posts = @tag.taggable.where(:taggable_type => 'Post')
```

But that's ugly.

So, if we want to keep that `@tag.posts` call in tact, we have to add a specific association to the `Tag` model:

`app/models/tag.rb` {.filename}

```ruby
class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :posts, :through => :taggings, :source => :taggable,
           :source_type => 'Post'
end
```

In other words, you need to tell rails _explicitly_ how to get to posts from tags, otherwise it gets confused.

And if you wanted to add images to the mix, you would just add this:

`app/models/tag.rb` {.filename}

```ruby
class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :posts, :through => :taggings, :source => :taggable,
           :source_type => 'Post'
  has_many :images, :through => :taggings, :source => :taggable,
           :source_type => 'Image'
end
```

**Links:**

- [Consolidated source code.](https://gist.github.com/seancdavis/e76e6649267655ebc461)
