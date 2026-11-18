import localFont from "next/font/local";

// Static subset instances of the Google Fonts variable files (OFL), built by ./build.sh: only the weights and widths
// the site renders, Latin + Latin Extended-A (Czech). About 14 KB each instead of 86-90 KB per variable subset.
export const archivo = localFont({
  src: [
    { path: "./archivo-400.woff2", weight: "400", style: "normal" },
    { path: "./archivo-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

// Display headings (h1, h2) at 125% width.
export const archivoWide = localFont({
  src: "./archivo-600-125.woff2",
  weight: "600",
  variable: "--font-archivo-wide",
  display: "swap",
});

// The name in the phone hero at 112.5% width: phones only, so not preloaded.
export const archivoSemiWide = localFont({
  src: "./archivo-600-112.woff2",
  weight: "600",
  variable: "--font-archivo-semiwide",
  display: "swap",
  preload: false,
});

// Mono (meta text, readout): not preloaded; measured no LCP gain from preloading it.
export const redHatMono = localFont({
  src: "./redhatmono-400.woff2",
  weight: "400",
  variable: "--font-redhatmono",
  display: "swap",
  preload: false,
});
