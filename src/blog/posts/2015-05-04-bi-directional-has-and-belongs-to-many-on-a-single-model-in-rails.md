---
title: Bi-Directional has_and_belongs_to_many on a Single Model in Rails
description: "Bi-directional HABTM relationships are easy in Rails, but when you need to do it on a single model, that's when it gets tricky. Here's one approach."
tags:
  - ruby-on-rails
---

[Hold on to your butts](https://youtu.be/-W6as8oVcuM), because this ain't simple.

## Why It's Complicated

What we're trying to accomplish is _to associate a record within one Rails model to many other records in the same model, while also being able to allow that record to be associated to many other records within the same model._

Phew!

I've talked about a [has_many](/blog/a-has-many-relationship-within-a-single-model-in-rails/) relationship within a single model, but this is far more complex. This isn't your typical parent/child relationship. In this case, you don't really care which object is the parent or which one is the child. You just want to grab an object and get all of its associated records, and there may be no logical order to that.

And your typical [`has_many :through` and `has_and_belongs_to_many`](http://guides.rubyonrails.org/association_basics.html#choosing-between-has-many-through-and-has-and-belongs-to-many) are much simpler because the names associating one record to another are _different_ and _predictable_, which they aren't in this case.

### The Example

Our example is that we have a `Page` model, and any page can have and belong to many other pages, with no logical hierarchical ordering.

## The JOIN Model

First thing is first, we still need a model to store the associations (you _could_ use the `Page` model for everything, but that's not very _Railsy_).

So, let's create a `PageAssociation` model. **The key here is that the name's of our two attributes are essentially irrelevant**.

    $ bundle exec rails g model PageAssociation left_page_id:integer right_page_id:integer

Why `left_page_id` and `right_page_id`? I have no idea. Why not `batman_id` and `robin_id`? It doesn't matter. Just create your convention and know what they are.

### Associations

After you create the model, add your associations. As you usually would in a `has_many, :through` relationship, this JOIN model has two `belongs_to` columns. The difference here is we have to specify the class name so Rails knows what to do.

`app/models/page_association.rb` {.filename}

```ruby
class PageAssociation < ActiveRecord::Base

  belongs_to :left_page, :class_name => 'Page'
  belongs_to :right_page, :class_name => 'Page'

end
```

## The Page Model

The `Page` model is much weirder. We are first going to define `has_many` and `has_many, :through` associations **in both directions**.

So, _left_ first.

`app/models/page.rb` {.filename}

```ruby
class Page < ActiveRecord::Base

  has_many :left_page_associations, :foreign_key => :left_page_id,
           :class_name => 'PageAssociation'
  has_many :left_associations, :through => :left_page_associations,
           :source => :right_page

end
```

These two associations allow us to get from a page designated as `right_page_id` in the JOIN model, to all of its `left_page_id`s, which are `Page` objects.

Then, add the reverse to it.

`app/models/page.rb` {.filename}

```ruby
class Page < ActiveRecord::Base

  has_many :left_page_associations, :foreign_key => :left_page_id,
           :class_name => 'PageAssociation'
  has_many :left_associations, :through => :left_page_associations,
           :source => :right_page
  has_many :right_page_associations, :foreign_key => :right_page_id,
           :class_name => 'PageAssociation'
  has_many :right_associations, :through => :right_page_associations,
           :source => :left_page

end
```

That kind of makes sense, right? It's a little abstract because the naming isn't as semantic as we're used to with Rails, but the conventions are the same.

The problem we have here is that the association needs to be bi-directional. This means we assume that accessing a pages `left_associations` leaves us with missing associated records, as it ignores `right_associations`.

It's not the most efficient, but I've solved this by simply combining the two in an instance method.

`app/models/page.rb` {.filename}

```ruby
class Page < ActiveRecord::Base

  has_many :left_page_associations, :foreign_key => :left_page_id,
           :class_name => 'PageAssociation'
  has_many :left_associations, :through => :left_page_associations,
           :source => :right_page
  has_many :right_page_associations, :foreign_key => :right_page_id,
           :class_name => 'PageAssociation'
  has_many :right_associations, :through => :right_page_associations,
           :source => :left_page

  def associations
    (left_associations + right_associations).flatten.uniq
  end

end
```

_Now_ I can call `page.associations` and get all of its associations (assuming `page` is a `Page` object).

## The Form

I hope you're still following. The last bit is crucial. The form and the controller.

First, note my assumption here is that we have a form for a particular page, and that's where other pages can be associated to it. We assume that every page has one of these forms.

So, the issue is that if we just use, say, `left_association_id` in the form, that we're allowing _Page A_ to be left-associated with _Page B_, but not accounting for _Page B_ to be right-associated with _Page A_, right? Right. Well, we're going to do it anyways, and we'll get around this quandary.

_I'm using [`simple_form`](https://github.com/plataformatec/simple_form) lingo here. I highly encourage you to check it out. I'm also making up a location for this view file. It doesn't have to be where I put it._

`app/views/pages/_form.html.erb` {.filename}

```erb
<%= f.association :left_associations, :label => 'Linked Pages',
                  :as => :check_boxes, :collection => Page.all - [@page],
                  :checked => @page.associations.collect(&:id) %>
```

Here are the items to note:

- `f.association` is a SimpleForm method. You will have to research how to accomplish this with Rails' default helpers if you don't want to use SimpleForm (I encourage you to try it).
- `Page.all - [@page]` is not an efficient way to create the collection, but it demonstrates the logic I use to build the collection (the _collection_ is the set of objects available for association)
- `@page` is a `Page` object.

And last, and most important, notice we are **checking all page associations** (`:checked => @page.associations.collect(&:id)`).

This is our workaround. If you are on Page A's form and it is right-associated with Page B, then we wouldn't see this association. So, we manually check the checkbox for Page B.

And if you're thinking, _That's going to duplicate an association between Page A and Page B_, then you are absolutely correct.

There are two things that remedy this. The first we already know about. In the `Page` model, when we combined our associations into one method, notice we ran `flatten` and then `uniq` on that array of objects. `uniq` is what gets rid of any duplicated associations.

Second, since we might have duplicated records, we need to be sure we **delete records when an association is removed**. This is the trickiest part.

I'm going to do this in the pages controller. In theory you could handle it with an `after_destroy` callback on the `PageAssociation` model, but I've always had issues with `after_destroy`, so I'm not going to mess with that.

Again, your controller may be elsewhere. And this time I've commented the code, since there's a lot going on.

`app/controllers/pages_controller.rb` {.filename}

```ruby
class PagesController < ApplicationController

  def update
    # Get the page
    @page = Page.find_by_id(params[:id])
    # First, we find the difference between the associations
    # BEFORE the form was filled out, and what is being
    # submitted.
    deleted_ass_ids = (
      @page.associations.collect(&:id) -
      params[:page][:left_association_ids].reject(&:blank?).map(&:to_i)
    )
    if @page.update(update_params)
      # AFTER we update the page, destroy all the records
      # that differ from before and after the form was
      # submitted.
      deleted_ass_ids.each do |ass_id|
        ids = [@page.id, ass_id]
        TemplateAssociation.where(
          :left_template_id => ids,
          :right_template_id => ids
        ).destroy_all
      end
      redirect_to(@page, :notice => 'Page saved!')
    else
      render 'edit'
    end
  end

  private

    def update_params
      params.require(:page).permit(:left_association_ids => [])
    end

end
```

One thing to notice is the `update_params` only show the `left_association_ids` param for demonstration purposes.

---

That's all! I hope you've followed along and get it working. If you have any corrections or suggestions, [let's talk](http://twitter.com/home?status=@seancdavis29).
