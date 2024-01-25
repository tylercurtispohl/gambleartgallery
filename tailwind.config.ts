import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: (theme) => ({
        "1/16": "calc(100vh / 16)",
        "2/16": "calc((100vh / 16) * 2)",
        "3/16": "calc((100vh / 16) * 3)",
        "10/16": "calc((100vh / 16) * 10)",
        "12/16": "calc((100vh / 16) * 12)",
        "13/16": "calc((100vh / 16) * 13)",
        "15/16": "calc((100vh / 16) * 15)",
      }),
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
    },
    screens: {
      "xs-max": { max: "639px" },
      // => @media (max-width: 639px) { ... }
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

      "3xl": "1792px",
      // => @media (min-width: 1536px) { ... }

      "4xl": "2048px",
      // => @media (min-width: 1536px) { ... }

      "5xl": "2304px",
      // => @media (min-width: 1536px) { ... }

      "6xl": "2560px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#004493",
            },
          },
        },
      },
    }),
  ],
};
export default config;
