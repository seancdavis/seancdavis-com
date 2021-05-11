const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./database.sqlite")
const { promisify } = require("util")

const query = promisify(db.all).bind(db)

const getNotesQuery = `
  SELECT
    'Note'.'Z_PK' AS 'id',
    'Note'.'ZTITLE' AS 'title',
    'Note'.'ZTEXT' AS 'body',
    'Note'.'ZTRASHED' AS 'deleted',
    'Note'.'ZMODIFICATIONDATE' AS 'updatedAt',
    'Tags'.'Z_PK' AS 'Tags.id',
    'Tags'.'ZTITLE' AS 'Tags.title',
    'Tags->NoteTag'.'Z_7NOTES' AS 'Tags.NoteTag.NoteId',
    'Tags->NoteTag'.'Z_14TAGS' AS 'Tags.NoteTag.TagId'
      FROM 'ZSFNOTE' AS 'Note'
      LEFT OUTER JOIN 'Z_7TAGS' AS 'Tags->NoteTag' ON 'Note'.'Z_PK' = 'Tags->NoteTag'.'Z_7NOTES'
      LEFT OUTER JOIN 'ZSFNOTETAG' AS 'Tags' ON 'Tags'.'Z_PK' = 'Tags->NoteTag'.'Z_14TAGS'
      WHERE 'Note'.'ZTRASHED' = 0;
`

const main = async () => {
  // Reference to store note data.
  let notes = []
  // Query the database for notes and their tag. There will be a row returned
  // for each tag that a note contains.
  const queryResult = await query(getNotesQuery)
  // Get a unique set of IDs for the notes returned, as more than one row may
  // contain the same note.
  const noteIds = new Set(queryResult.map(res => res.id))
  // Collects all notes matching the passed ID and builds an object to represent
  // that note.
  const buildNoteObject = noteId => {
    const rows = queryResult.filter(row => row.id === noteId)
    if (rows.length === 0) return null
    const { id, title, body, deleted, updatedAt } = rows[0]
    const tags = rows.map(row => row["Tags.title"])

    return { id, title, body, deleted, updatedAt, tags }
  }
  // Loop through the notes and store the result in the notes object.
  noteIds.forEach(id => {
    notes.push(buildNoteObject(id))
  })
  // Log our result.
  console.log(notes)
}

main()
  .finally(() => {
    console.log("Done.")
  })
  .catch(err => {
    throw new Error(err.message)
  })
