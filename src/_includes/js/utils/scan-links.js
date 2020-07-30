onInit(() => {
  const links = document.getElementsByTagName("a")

  for (let link of links) {
    if (link.hostname.length && location.hostname !== link.hostname) {
      link.setAttribute("target", "_blank")
    }
  }
})
