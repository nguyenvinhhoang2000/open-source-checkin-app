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
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      screens: {
        "2xl": "1392px",
      },
    },
    extend: {
      backgroundImage: () => ({
        "hero-pattern": "url('./src/assets/backgrounds/Log-in.svg')",
      }),
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        primary: "0.125rem",
        secondary: "0.25rem",
        "100px": "6.25rem",
      },
      padding: {
        primary: {
          x: "0.9375rem",
          y: "0.4rem",
        },
        secondary: {
          x: "0.9375rem",
          y: "0.4rem",
        },
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
          6: "#00CE9D",
        },
        neutral: {
          0: "#FFFFFF",
          1: "#556EE6",
          2: "#D9D9D9",
          3: "#F5F5F5",
          4: "#F46A6A",
        },
        character: {
          0: "#00000040",
          1: "#000000D9",
          2: "#00000073",
        },
        calendula: "#FAAD14",
        volcano: {
          2: "#FFD8BF",
          6: "#FA541C",
        },
      },
      boxShadow: {
        dropShadow: "0px 10px 20px 0px rgba(18, 38, 63, 0.03)",
      },
    },
  },
};
