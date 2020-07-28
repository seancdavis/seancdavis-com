import { toggleMobileMenu } from "./utils/toggle-mobile-menu"
import { scanLinks } from "./utils/scan-links"

import "../components/particles/particles"

export const MobileMenu = {
  toggle: toggleMobileMenu
}

// Scan DOM for every link, and if they are external, add target="_blank" as an
// attribute.
scanLinks()
