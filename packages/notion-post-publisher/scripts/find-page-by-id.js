const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const pageId = process.argv[2];

if (!pageId) {
  console.error("Usage: node ./scripts/find-page-by-id.js <page-id>");
  process.exit(1);
}

// The only pages that will be available are the ones that the API key has
// access to, which will be the pages in the content database.

(async () => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  console.log(response);
})();
