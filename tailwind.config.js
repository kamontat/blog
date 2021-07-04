module.exports = {
  mode: "jit",
  darkMode: "media", // or "media" or "class"
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        primary: "#005AC2",
        "primary-dark": "#00489B",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",
            a: {
              color: false,
              "&:hover": {
                color: theme("colors.primary"),
              },
            },
          },
        },
      }),
    },
  },
}
