onInit(() => {
  if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
    return
  }

  let message = document.createElement("div")
  message.classList.add("bg-yellow", "text-center", "py-2", "shadow-md", "sticky", "z-20", "top-0")
  message.innerHTML = `<p>
  This site does not support your browser.
  <br>
  Please upgrade to a modern browser for optimal experience.
</p>`

  document.body.prepend(message)
})
