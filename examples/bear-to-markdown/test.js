const { Sequelize, Model, DataTypes, Op } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "sqlite",
  logging: console.log
})

const Note = sequelize.define(
  "Note",
  {
    id: { type: DataTypes.STRING, field: "Z_PK", primaryKey: true },
    title: { type: DataTypes.STRING, field: "ZTITLE" },
    body: { type: DataTypes.STRING, field: "ZTEXT" },
    deleted: { type: DataTypes.BOOLEAN, field: "ZTRASHED" },
    updatedAt: { type: DataTypes.DATE, field: "ZMODIFICATIONDATE" }
  },
  {
    tableName: "ZSFNOTE",
    timestamps: false
  }
)

const Tag = sequelize.define(
  "Tag",
  {
    id: { type: Sequelize.NUMBER, field: "Z_PK", primaryKey: true },
    title: { type: Sequelize.STRING, field: "ZTITLE" }
  },
  {
    tableName: "ZSFNOTETAG",
    timestamps: false
  }
)

const NoteTag = sequelize.define(
  "NoteTag",
  {
    NoteId: { type: Sequelize.NUMBER, field: "Z_7NOTES" },
    TagId: { type: Sequelize.NUMBER, field: "Z_14TAGS" }
  },
  {
    tableName: "Z_7TAGS",
    timestamps: false
  }
)

NoteTag.belongsTo(Tag)
NoteTag.belongsTo(Note)
Note.belongsToMany(Tag, { through: NoteTag })

// const sqlite3 = require("sqlite3").verbose()
// const db = new sqlite3.Database(process.env.DATABASE_URL)

// const { promisify } = require("util")

// const parseNote = require("./utils/parseNote")

// const query = promisify(db.all).bind(db)

// const getNotesQuery = `
//   SELECT
//     Z_PK as id,
//     ZTITLE as title,
//     ZTEXT as body,
//     ZSUBTITLE as subtitle,
//     ZTRASHED as deleted,
//     ZMODIFICATIONDATE as updatedAt
//       FROM ZSFNOTE
//       WHERE deleted = 0;
// `

// const getAllTagsQuery = `
//   SELECT
//     Z_PK as id,
//     ZTITLE as title
//       FROM ZSFNOTETAG
// `

// const getNoteTags = async (noteId) => {
//   const
// }

const main = async () => {
  const notes = await Note.findAll({ where: { deleted: false }, include: Tag })

  console.log(notes[0])
  //   const tags = await query(getAllTagsQuery)
  //   const notes = await query(getNotesQuery)
  //   notes.map(note => {
  //     console.log(note.id)
  //   })
  //   // console.log(notes)
}

main()
  .finally(() => {
    console.log("Done.")
  })
  .catch(err => {
    throw new Error(err.message)
  })
