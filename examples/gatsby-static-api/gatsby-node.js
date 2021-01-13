const fs = require("fs")
// const path = require("path")

exports.onPostBuild = async ({ graphql }) => {
  await graphql(`
    {
      earworms: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              song_id
              date(formatString: "YYYY-MM-DD")
              title
              artist
              spotify_url
            }
          }
        }
      }
    }
  `).then(result => {
    const earwormsPath = "./public/api/earworms"
    const earworms = result.data.earworms.edges.map(
      ({ node }) => node.frontmatter
    )

    if (!fs.existsSync(earwormsPath)) {
      fs.mkdirSync(earwormsPath, { recursive: true })
    }

    const earwormsData = {
      results: earworms,
      meta: {
        count: earworms.length,
      },
    }

    fs.writeFileSync(`${earwormsPath}.json`, JSON.stringify(earwormsData))

    earworms.map(earworm => {
      const data = { result: earworm, meta: {} }
      fs.writeFileSync(
        `${earwormsPath}/${earworm.song_id}.json`,
        JSON.stringify(data)
      )
    })
  })
}
