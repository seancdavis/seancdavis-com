export default {
  toggle: () => {
    const mobileMenu = document.getElementById("layout--header--mobile-menu")
    return mobileMenu.classList.toggle("is-active")
  }
}
