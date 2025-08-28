// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#140f10", // site background
        box: "#121212", // card/row background
        text: {
          light: "#000000",
          dark: "#ffffff",
          default: "#f0ebec", // body text
        },
        border: {
          DEFAULT: "#e5e7eb",
          "secondary-light": "#2f2f2f",
          "secondary-dark": "#1f1f1f",
        },
        position: {
          WR: "#ec4899", // pink
          RB: "#2563eb", // blue
          QB: "#16a34a", // green
          TE: "#9333ea", // purple
        },
        accent: "#f97316", // flockOrange
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        "15px": "15px",
        "20px": "20px",
      },
    },
  },
  plugins: [],
};
