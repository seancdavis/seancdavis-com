import { toggleMobileMenu } from "./utils/toggle-mobile-menu";

import "./lib/analytics";

import "../components/codepen/codepen.controller";
import "../components/copy_button/copy_button.controller";
import { initParticles } from "../components/particles/particles.controller";
import { initTypewriter } from "../components/typewriter/typewriter.controller";

export const MobileMenu = {
  toggle: toggleMobileMenu,
};

export const Typewriter = {
  init: initTypewriter,
};

export const Particles = {
  init: initParticles,
};
