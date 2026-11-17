import { ImageResponse } from "next/og";
import { cacheLife } from "next/cache";
import { getDict, isLang } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jan Zámostný";

// Satori needs TTF/OTF; Google Fonts serves TTF to clients without a modern user agent.
async function archivo(weight: number, text: string) {
  "use cache";
  cacheLife("max");
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,${weight}&text=${encodeURIComponent(text)}`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("Archivo font not found for OG image");
  return (await fetch(url)).arrayBuffer();
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const d = getDict(isLang(lang) ? lang : "en").home;
  const name = "Jan Zámostný";
  const text = `${name}${d.eyebrow}${d.role}`;
  const [bold, regular] = await Promise.all([archivo(800, text), archivo(400, text)]);
  // DESIGN.md light tokens: bg, text, muted, border, accent.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          background: "#F3F4F0",
          color: "#14171A",
          borderBottom: "16px solid #0A6B47",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ fontSize: 28, color: "#596067", letterSpacing: 2, textTransform: "uppercase" }}>{d.eyebrow}</div>
        <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1, marginTop: 24, letterSpacing: -2 }}>{name}</div>
        <div style={{ fontSize: 40, color: "#596067", marginTop: 32, maxWidth: 980, lineHeight: 1.35 }}>{d.role}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: bold, weight: 800, style: "normal" },
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
