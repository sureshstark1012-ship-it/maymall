import localFont from "next/font/local";

export const displayFont = localFont({
  src: [
    {
      path: "./fonts/newsreader-latin-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "./fonts/newsreader-latin-wght-italic.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
export const bodyFont = localFont({
  src: "./fonts/public-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-public-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});
export const tamilFont = localFont({
  src: "./fonts/noto-sans-tamil-tamil-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-tamil",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
