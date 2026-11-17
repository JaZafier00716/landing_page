import { Archivo, Red_Hat_Mono } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin", "latin-ext"], // Czech: ě š č ř ž ý á í é ú ů ď ť ň
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const redHatMono = Red_Hat_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-redhatmono",
  display: "swap",
});
