module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.njk", "./src/**/*.md"],
  theme: {
    container: {
      center: true,
      padding: "2rem"
    },
    extend: {
      colors: {
        black: "var(--color-black)",
        blue: {
          default: "var(--color-blue)",
          dark: "var(--color-blue-dark)"
        },
        gray: {
          blue: "var(--color-gray-blue)",
          dark: "var(--color-gray-dark)",
          default: "var(--color-gray)",
          light: "var(--color-gray-light)"
        },
        green: {
          default: "var(--color-green)"
        },
        lime: "var(--color-lime)",
        orange: "var(--color-orange)",
        pink: "var(--color-pink)",
        white: "var(--color-white)",
        yellow: "var(--color-yellow)"
      }
    },
    fontFamily: {
      headings: ["DM Serif Display", "serif"],
      sans: ["Lato", "sans-serif"],
      serif: ["Source Serif Pro", "serif"],
      subheadings: ["Lato", "sans-serif"]
    }
  },
  variants: {},
  plugins: []
}
