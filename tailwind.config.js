// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        full: "1440px",
      },
      width: {
        "9xl": "1440px",
      },
      spacing: {
        default: "85px",
      },
      colors: {
        heading: "#242424",
        "sub-heading": "#5d5d5d",
        primary: "#ED8383",
        secondary: "#D54848",
        "light-100": "#F1F1F1",
        "light-300": "#CECECE",
        "dark-100": "#767676",
        "dark-200": "#5D5D5D",
        "dark-300": "#434343",
        "dark-400": "#242424",
        "dark-500": "#000000",
        "pink-default": "#FFF3F3",
        "gray-light": "#F7F7F7",
        "primary-coba": "#982218",
        "secondary-coba": "#345D61",
        "third-coba": "#F9B124",
        "default-coba": "#EFE7DE",
        "white-default": "#F9F6F2",
      },
      boxShadow: {
        "3d": "1px 0px #999, 2px 2px 0px #999, 3px 3px 0px #999, 4px 4px 0px #999, 5px 5px 0px #999, 6px 6px 0px #999;",
      },
      dropShadow: {
        "3d": "6px 6px #345D61",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        lato: ["Lato", ...defaultTheme.fontFamily.sans],
        playfair: ["Playfair Display", ...defaultTheme.fontFamily.serif],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        opensans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        "svn-sans": ["SVN-Product Sans", "sans-serif"],
        phudu: "Phudu",
        birthstone: "Birthstone",
        trirong: "Trirong",
        prata: "Prata",
        pinyonScript: "PinyonScript",
        beVietnamPro: "BeVietnamPro",
        playfairDisplay: "PlayfairDisplay",
        explora: "Explora",
        pacifico: "Pacifico",
        aleo: "Aleo",
        EncodeSans: "EncodeSans",
        CormorantUnicase: "CormorantUnicase",
        chamon: "Charmonman",
        Corinthia: "Corinthia",
        meowScript: "MeowScript",
      },
      fontSize: {
        "title-2": ["42px", { lineHeight: "63px" }],
        "title-1": ["36px", { lineHeight: "54px" }],
        "title-0": ["33px", { lineHeight: "49.5px" }],
        "title-mobile": ["28px", { lineHeight: "42px" }],
        "content-4": ["24px", { lineHeight: "36px" }],
        "content-3": ["18px", { lineHeight: "25.2px" }],
        "content-2": ["16px", { lineHeight: "24px" }],
        "content-1": ["14px", { lineHeight: "21px" }],
        "content-coba": ["34px", { lineHeight: "41px" }],
        "tilte-coba": ["60px", { lineHeight: "73px" }],
        "title-coba-mobile": ["35px", { lineHeight: "42.88px" }],
        "content-coba-mobile": ["32px", { lineHeight: "43.52px" }],
      },
      maxWidth: {
        "9xl": "1440px",
      },
      animation: {
        pulse: "customPulse 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
