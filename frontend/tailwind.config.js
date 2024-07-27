/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        main: "#146f99",
        // main: "#7ca982",
        // main: "#3D6A43",
        secondary: "#f1f7ed",
      },
      screens: {
        sm: "360px",
        md: "600px",
        lmd: "840px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
    },
  },
};
