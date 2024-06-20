import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next"

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono'
});

export const metadata: Metadata = {
  title: "Jan Zámostný",
  description: "Landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" /> 
      </head>
      <body className={`h-full ${jetbrainsMono.variable}`}>
        <Header />
        {children}
        <SpeedInsights/>
        </body>
    </html>
  );
}
