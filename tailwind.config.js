/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "absolute",
    "font-roboto",
    "h-full",
    "leading-[1.375rem]",
    "min-h-[2.3125rem]",
    "min-w-[8.1875rem]",
    "right-0",
    "text-danger",
    "text-[0.875rem] font-[400]",
    "text-neutral-3",
    "text-neutral-4",
    "text-secondary-6",
    "top-0",
    "z-40",
  ],
  theme: {
    screens: {
      xs: "320px",
      // => @media (min-width: 320px) { ... }

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
      padding: "1em",
      center: true,
      screens: {
        "2xl": "1392px",
      },
    },
    extend: {
      backgroundImage: () => ({
        "hero-pattern": "url('/assets/images/background/login-background.svg')",
      }),
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        primary: "0.125rem",
        secondary: "0.25rem",
        "100px": "6.25rem",
        dropdownOverlay: "0",
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
        headerDraw: "1rem 0",
        bodyDraw: "1.5rem 0",
        footerDraw: "1rem 1rem",
        contentDraw: "0 2.5rem",
        contentModel: "1rem 0 1rem 0",
        dropdownOverlay: "0.25rem 0",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        mainBg: "#f8f8fb",
        danger: "#FF4D4F",
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
          5: "#F0F0F0",
          6: "#E3E3E3",
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
        chart: {
          1: "#556EE6",
          2: "#D9D9D9",
        },
        absentDescription: "#0386FF",
      },
      boxShadow: {
        dropShadow: "0px 10px 20px 0px rgba(18, 38, 63, 0.03)",
      },
      backdropBlur: {
        blurMain: "blur(6px)",
      },
      width: {
        drawWidth: "29rem",
      },
      antdTable: {
        cellPaddingInline: "12px",
        cellPaddingBlock: "12px",
        headerSplitColor: "none",
      },
      borderWidth: {
        borderTopDraw: "1px solid #f0f0f0",
        borderBottomDraw: "1px solid #f0f0f0",
      },
    },
  },
};
