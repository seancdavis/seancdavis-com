import { toggleMobileMenu } from "./utils/toggle-mobile-menu"
import "./utils/scan-links"

import "./lib/analytics"

import { initBackButton } from "../components/back_button/back_button.controller"
import { initParticles } from "../components/particles/particles.controller"
import { initTypewriter } from "../components/typewriter/typewriter.controller"

export const MobileMenu = {
  toggle: toggleMobileMenu
}

export const Typewriter = {
  init: initTypewriter
}

export const Particles = {
  init: initParticles
}

onInit(() => {
  initBackButton()
})
