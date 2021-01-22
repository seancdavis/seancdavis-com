export const initBackButton = () => {
  const buttons = [...document.querySelectorAll("[data-back-button]")]
  if (!document.referrer || document.referrer === window.location.href) {
    return
  }

  buttons.map(button => {
    button.querySelector("span").innerText = "Back"
    button.setAttribute("href", document.referrer)
  })
}
