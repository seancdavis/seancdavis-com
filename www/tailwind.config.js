module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.njk", "./src/**/*.md"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    container: {
      center: true,
      padding: "2rem"
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.5" }],
      sm: ["0.875rem", { lineHeight: "1.5" }],
      base: ["1rem", { lineHeight: "1.5" }],
      lg: ["1.125rem", { lineHeight: "1.5" }],
      xl: ["1.25rem", { lineHeight: "1.5" }],
      "2xl": ["1.5rem", { lineHeight: "1.5" }],
      "3xl": ["1.875rem", { lineHeight: "1.5" }],
      "4xl": ["2.25rem", { lineHeight: "1.5" }],
      "5xl": ["3rem", { lineHeight: "1.5" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }]
    },
    extend: {
      colors: {
        black: "var(--color-black)",
        blue: {
          DEFAULT: "var(--color-blue)",
          dark: "var(--color-blue-dark)"
        },
        gray: {
          blue: "var(--color-gray-blue)",
          DEFAULT: "var(--color-gray-200)",
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
          DEFAULT: "var(--color-green)"
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