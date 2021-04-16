const chalk = require("chalk")
const HTMLParser = require("node-html-parser")
const fs = require("fs")
const http = require("http")
const nodePath = require("path")

const tmpDir = path.join(__dirname, `../tmp`)
const logFile = path.join(tmpDir, `scan-links-${Date.now()}.json`)
fs.mkdirSync(tmpDir, { recursive: true })

// TODO:
// - [ ] Cache links and anchors when making first request for a page.
// - [ ] Exit with a non-zero exit code when there is at least one invalid link.
// - [ ] Consider a scenario in which a redirect fails — "strict mode" that
//   requires all links to return 200.
// - [ ] List the invalid links and their pages.

const hostname = "localhost"
const port = 3001

let linkCache = {}
let pageCache = {}
let pageQueue = ["/"]

const statuses = {
  VALID: "valid",
  INVALID: "invalid",
  SKIPPED: "skipped"
}

const colors = {
  [statuses.VALID]: "green",
  [statuses.INVALID]: "red",
  [statuses.SKIPPED]: "yellow"
}

const request = path => {
  return new Promise((resolve, reject) => {
    const requestOptions = { hostname, port, path, method: "GET" }

    const req = http.request(requestOptions, res => {
      if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
        resolve({ response: res, redirectTo: res.headers.location })
      } else {
        res.on("data", data => resolve({ response: res, body: data.toString() }))
      }
    })

    req.on("error", error => reject(error))

    req.end()
  })
}

const extractLinksFromHtml = htmlString => {
  const root = HTMLParser.parse(htmlString)
  return root.querySelectorAll("a").map(a => a.getAttribute("href"))
}

const printLinkResult = status => {
  const color = colors[status]
  process.stdout.write(chalk[color]("."))
}

const validateLink = async link => {
  // Skip if the link was not defined.
  if (!link) {
    printLinkResult(statuses.SKIPPED)
    return statuses.SKIPPED
  }

  // If already validated and in the cache, return the cached value.
  if (linkCache[link]) {
    printLinkResult(linkCache[link])
    return linkCache[link]
  }
  // If is an external link or a hash, skip validation.
  if (!nodePath.isAbsolute(link)) {
    printLinkResult(statuses.SKIPPED)
    return (linkCache[link] = statuses.SKIPPED)
  }
  // Otherwise, validate the link.
  const { response, redirectTo } = await request(link)
  if (response.statusCode === 200) {
    if (!pageCache[link]) pageQueue.push(link) // Add the page to the queue if it hasn't been processed.
    printLinkResult(statuses.VALID)
    return (linkCache[link] = statuses.VALID)
  } else if (redirectTo) {
    return (linkCache[link] = await validateLink(redirectTo))
  } else {
    printLinkResult(statuses.INVALID)
    return (linkCache[link] = statuses.INVALID)
  }
}

const validatePage = async path => {
  // If page has been cached, return the result.
  if (pageCache[path]) {
    return pageCache[path]
  }

  console.log(`Page: ${path}`)
  const { body } = await request(path)
  const links = extractLinksFromHtml(body)

  for (let link of links) {
    await validateLink(link)
  }

  pageCache[path] = {
    valid: links.filter(l => linkCache[l] === statuses.VALID),
    invalid: links.filter(l => linkCache[l] === statuses.INVALID),
    skipped: links.filter(l => linkCache[l] === statuses.SKIPPED)
  }

  console.log("\n")
}

const validateNextPage = async () => {
  try {
    const nextPage = pageQueue[0]
    // Stop when we have no pages left.
    if (!nextPage) {
      collectResults()
      process.exit(0)
    }
    // Validate the page.
    await validatePage(nextPage)
    // Remove all instances from the next page from the page queue after it has
    // been processed.
    pageQueue = pageQueue.filter(p => p !== nextPage)
    // Run it again.
    return await validateNextPage()
  } catch (error) {
    // Collect results when we hit an error.
    collectResults()
    console.error(error)
    process.exit(1)
  }
}

const collectResults = () => {
  fs.writeFileSync(logFile, JSON.stringify(pageCache))
  console.log(`Results logged to: ${logFile}`)
}

validateNextPage()
