onInit(() => {
  const pens = document.querySelectorAll(".component--codepen")
  // Stop processing if we don't have any pens on the page.
  if (pens.length === 0) {
    return
  }
  // If there are pens on the page, append the script to the bottom of the page.
  let script = document.createElement("script")
  script.setAttribute("src", "https://static.codepen.io/assets/embed/ei.js")
  document.body.append(script)
})
