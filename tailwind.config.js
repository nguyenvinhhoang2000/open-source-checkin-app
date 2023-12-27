/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ssm: "480px",
      // => @media (min-width: 480px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      xxl: "1440px",
      // => @media (min-width: 1440px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      padding: "2.375em",
      center: true,
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        mainBg: "#f8f8fb",
        primary: {
          0: "#FF6D03",
          1: "#FFF4E6",
          2: "#FF8B2B",
        },
        secondary: {
          1: "#FFFFFF",
          2: "#D1FAE5",
          3: "#A7F3D0",
          4: "#6EE7B7",
          5: "#D9D9D9",
        },
        neutral: {
          0: "#FFFFFF",
          1: "#556EE6",
          2: "#D9D9D9",
          3: "#F5F5F5",
        },
        character: {
          0: "#00000040",
          1: "#000000D9",
        },
        calendula: "#FAAD14",
        volcano: {
          2: "#FFD8BF",
          6: "#FA541C",
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
