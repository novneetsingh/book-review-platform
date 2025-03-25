export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
    },
  },
  plugins: [],
};
