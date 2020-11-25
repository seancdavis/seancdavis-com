---
title: Disable Rake Commands in a Rails Project
tags:
  - rake
  - ruby_on_rails
description: Sometimes you want to disable some of the default rake tasks in a rails project. Here's a quick way to do just that.
---

I had a project where I wanted to limit the use of `db` rake tasks to keep anyone from accidentally deleting the database.

To delete a rake task, simply add this method to your Rakefile:

`Rakefile` {.filename}

```ruby
Rake.application.instance_variable_get('@tasks').delete('task')
```

Here `task` is the name of your task.

If you want to do this multiple times, you can loop over your tasks like so:

`Rakefile` {.filename}

```ruby
def remove_task(task)
  Rake.application.instance_variable_get('@tasks').delete(task)
end

tasks = ['db:drop', 'db:reset', 'db:setup', 'db:rollback', 'db:seed']
tasks.each { |t| remove_task(t) }
```
