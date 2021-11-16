---
title: Change the Primary Key Type with Sequelize
date: 2021-05-11
description: It seems like it's going to be super easy. And it is! And then it's not.
image: /blog/210511/210511-change-primary-key.png
tags:
  - postgresql
  - sqlite
canonical_url: https://www.grouparoo.com/blog/change-primary-key-sequelize
---

We recently adjusted how we handle primary keys. Previously they were [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier) with a max length of `40` characters. With our [Declarative Sync](/blog/declarative-data-sync) feature, we allow developers to set primary key values from their configuration files. Thus, we needed to lengthen the maximum number of characters allowed on primary keys in our database.

Seems simple, right?

I thought so, too. We're using [Sequelize](https://sequelize.org/) as our [ORM tool](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping), and I found a handy [`changeColumn` method](https://sequelize.org/master/manual/query-interface.html#changing-the-datatype-of-a-column).

So that's what I did. It looked like this:

```js
await migration.changeColumn(tableName, columnName, {
  type: DataTypes.STRING(191)
})
```

<Alert variant="primary">
  Note: In these examples, I'm accessing Sequelize methods through an object
  called <code>migration</code>. This is because we use{" "}
  <Link href="https://github.com/actionhero/ah-sequelize-plugin#migrations">
    Actionhero to run our database migrations
  </Link>
  . Your objects will look different, but the methods on them should be the same.
</Alert>

I first tested with SQLite and _voila!_ It did exactly as I expected. All the primary keys were changed and working just lovely.

## Changing PostgreSQL Primary Keys

Since we support both Postgres and SQLite as our application database, I moved on to test in Postgres, and that's when, instead of the database being properly migrated, I was presented with this lovely message:

    column "id" is in a primary key

I thought: _Yes, true. That is correct. And ... ?_

It turns out Sequelize doesn't handle this action well with Postgres. After going down a rabbit hole in [playing around with constraints](https://www.postgresql.org/docs/13/ddl-constraints.html), I ended up just writing the SQL statement directly. It looked something like this:

```js
const query = `ALTER TABLE "${tableName}" ALTER COLUMN "${columnName}" SET DATA TYPE varchar(${maxIdLength}); `
await migration.sequelize.query(query)
```

That worked!

## Consistency is Awesome! (SQLite is Weird.)

It made sense to me to try to use the same approach with both databases. So I tried my Postgres solution with SQLite.

It didn't work. (Sensing a theme yet?)

That seemed odd. But, of course, we already know that [SQLite is weird](/blog/7-awesome-sqlite-quirks). And it turns out [SQLite's `ALTER TABLE` methods](https://sqlite.org/lang_altertable.html) are extremely (and intentionally) limited.

Which meant I was stuck with two solutions. And when that happens, we tend to look at the current dialect and execute the appropriate code. And that's why this is the weird function that alters the primary key column in both Postgres and SQLite:

```js
const changeColumn = async (tableName, columnName) => {
  if (config.sequelize.dialect === "postgres") {
    const query = `ALTER TABLE "${tableName}" ALTER COLUMN "${columnName}" SET DATA TYPE varchar(${maxIdLength}); `
    await migration.sequelize.query(query)
  } else {
    await migration.changeColumn(tableName, columnName, {
      type: DataTypes.STRING(191)
    })
  }
}
```

You can see the complete set of changes that came along with this code in [this pull request](https://github.com/grouparoo/grouparoo/pull/1764).
