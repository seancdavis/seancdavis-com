const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./database.sqlite")
const { promisify } = require("util")

const query = promisify(db.all).bind(db)

const getNotesQuery = `SELECT Z_PK as id, ZTITLE as title, ZTEXT as body, ZSUBTITLE as subtitle, ZTRASHED as deleted, ZMODIFICATIONDATE as updatedAt FROM ZSFNOTE WHERE deleted = 0;`

const main = async () => {
  const notes = await query(getNotesQuery)

  console.log(notes)
}

main()
  .finally(() => {
    console.log("Done.")
  })
  .catch(err => {
    throw new Error(err.message)
  })
