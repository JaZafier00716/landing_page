import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "devicon/devicon.min.css";
import Header from "@/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getLang } from "./utils/getLang";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono'
});


export const metadata: Metadata = {
  title: "Jan Zámostný",
  description: "Landing page",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const lang = await getLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`h-full ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <Header lang={lang} />
        {children}
        {process.env.NODE_ENV === "production" ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
