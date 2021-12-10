---
title: Backup Gitlab Data and Repositories to Amazon S3
tags:
  - s3
  - git
  - gitlab
description: Make sure you don't lose all that precious GitLab data by backing
  regularly and syncing with an Amazon S3 bucket.
image: /posts/default/default-blue-03.png
---

I've found [GitLab](https://about.gitlab.com) to be a nice solution for storing all my git repositories. But it's a little scary hosting it myself. There are a lot of _what-ifs_ for something that is somewhat of a lifeline.

It's become imperative to backup this data. GitLab makes it easy to backup, and even to restore from a backup.

_Note: I installed GitLab prior to the [Omnibus package](https://about.gitlab.com/downloads/) being the preferred method. I suspect using that package won't change this approach, but I'm not guaranteeing it._

## Run the Backup Script

GitLab has a built in task to backup its data and repositories. Just make sure you're running the command as the `git` user, so our file permissions are predictable and consistent.

    $ cd /home/git/gitlab
    $ sudo -u git -H bundle exec rake gitlab:backup:create RAILS_ENV=production

You should see some output as this task steps through its process.

## Delete Old Backups

After the rake task packages up the backup, you're left with a tarball. But, it's still likely to be a pretty heavy file, and with a timestamp as part of its filename, this backup directory can get quite heavy.

So, it's nice to delete old files in there. Let's say you wanted to get rid of all the backups older than 30 days.

    $ find /home/git/gitlab/tmp/backups/*.tar -mtime +30 -exec rm {} \;

This assumes the user which runs this command has access to `/home/git/gitlab/tmp/backups/`.

## Syncing to Amazon S3

If you take regular snapshots of your server, this might be good enough. But, if you want to go one step further, you could sync this data with [Amazon's S3 Service](http://aws.amazon.com/s3/).

To do that, we can do that real easily by installing `s3cmd`. If you're on Ubuntu like me, it's as simple as:

    $ sudo apt-get install s3cmd

Once the installation is complete, you can add your credentials to the command.

    $ s3cmd --configure

You'll need to generate API keys through [Amazon's AWS Identity and Access Management System](http://aws.amazon.com/iam/) unless you already have them. And you'll have to create a bucket if you don't already have one.

But, once you're all set up with Amazon, the command is simple.

    $ s3cmd sync --skip-existing --delete-removed /home/git/gitlab/tmp/backups/ s3://[your_bucket]/gitlab/backups/

Replace `[your_bucket]` with your actual bucket name.

## Configuring Cron

Last, you can automate all of this by using cron jobs. If you haven't used `crontab` before, it's also quite simple. To run the editor, use this command:

    $ crontab -e

You can remove all the comments, although you'll learn a bit by reading through them.

Cron runs based on time intervals you pass to each line. I always forget what they mean, so I use a generator to help me, like [this one](http://www.robertplank.com/cron/).

In my case, here's what I want to do:

- Every Sunday at 2:00 am, run the backup script.
- Every Sunday at 3:00 am, remove all backups older than 30 days (should leave 4 files)
- Every Sunday at 4:00 am, sync the backup directory with my S3 bucket.

Here's what that looks like.

`crontab` {.filename}

```
0 2 * * * cd /home/git/gitlab && sudo -u git -H bundle exec rake gitlab:backup:create RAILS_ENV=production
0 3 * * * find /home/git/gitlab/tmp/backups/*.tar -mtime +30 -exec rm {} \;
0 4 * * * s3cmd sync --skip-existing --delete-removed /home/git/gitlab/tmp/backups/ s3://[my_bucket]/gitlab/backups/
```

## Restore from Backup

I've never restored from a backup, so I can't speak to its effectiveness. I would recommend you reference [this manual](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/doc/raketasks/backup_restore.md#restore-a-previously-created-backup) if you need to restore from backup.
