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
          default: "var(--color-gray-200)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)"
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
      mono: [
        "Operator Mono",
        "Fira Code",
        "Consolas",
        "Monaco",
        "Andale Mono",
        "Ubuntu Mono",
        "monospace"
      ],
      sans: ["Lato", "sans-serif"],
      serif: ["Source Serif Pro", "serif"],
      subheadings: ["Lato", "sans-serif"]
    }
  },
  variants: {},
  plugins: []
}
