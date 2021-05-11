const fs = require("fs")
const path = require("path")
const slugify = require("slugify")
const sqlite3 = require("sqlite3").verbose()
const yaml = require("js-yaml")
const { promisify } = require("util")

const db = new sqlite3.Database("./database.sqlite")
const query = promisify(db.all).bind(db)

const outputDir = path.join(__dirname, "./tmp/export")
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

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
    // Find all rows from the query result matching the passed ID.
    const rows = queryResult.filter(row => row.id === noteId)
    // Return a null object if we were given a bad ID.
    if (rows.length === 0) return null
    // Extract relevant attributes out of the first row. Each of these is
    // assumed to be the same value in any row. We're picking the first one
    // because we know there will always be a first one.
    const { id, title, body, deleted, updatedAt } = rows[0]
    // Collect the tag names. Each row in the query result has its own unique
    // tag name, assuming the tag was only used once in the document.
    const tags = rows.map(row => row["Tags.title"])
    // Build a slug from the title. This is what will be used as the filename.
    const slug = slugify(title, { lower: true, strict: true })
    // Build the object and return it.
    return { id, title, slug, body, deleted, updatedAt, tags }
  }
  // Builds frontmatter and then writes the note to file.
  const exportNote = note => {
    const filePath = path.join(outputDir, `${note.slug}.md`)
    const { id, title, slug, body, tags } = note
    const frontmatter = yaml.dump({ id, title, slug, tags })
    const content = `---\n${frontmatter}---\n\n${body}`
    fs.writeFileSync(filePath, content)
    return { filePath, content }
  }
  // Loop through the notes and store the result in the notes object.
  noteIds.forEach(id => {
    const note = buildNoteObject(id)
    const { filePath } = exportNote(note)
    console.log(`Wrote note to file: ${filePath}`)
  })
}

main()
  .finally(() => {
    console.log("Done.")
  })
  .catch(err => {
    throw new Error(err.message)
  })
