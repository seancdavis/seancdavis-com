---
title: Rollback A Deleted Rails Database Migration
description: "You got yourself into that pickle where you created a migration, migrated, deleted the migration, then tried to rollback. Here's how you get around it!"
tags:
  - ruby-on-rails
---

I've run into this pickle a few times. Here's how the story goes:

- Create a migration,
- Migrate the database.
- Delete the migration file.
- Rollback the database.

Rolling back the database doesn't work at that point. That's because Rails can't find the file of its latest migration to know which one to jump to.

I even tried rolling back multiple steps, but no luck.

## Already Committed To Git

If you have committed the file to your git history, you're in luck. Stash your current code, rollback, then pop your stash.

    $ git add .
    $ git stash
    $ bundle exec rake db:rollback
    $ git stash pop

You should be good to go at this point.

## New File

If the migration file you had deleted was a new file, then you have to be a little trickier.

I've gotten around this by creating an empty migration file, migrating, then rolling back twice.

    $ bundle exec rails g migration fix_rollback_error
    $ bundle exec rake db:migrate
    $ bundle exec rake db:rollback STEP=2

Then, make sure you **delete the empty migration file**, and be on your way!
