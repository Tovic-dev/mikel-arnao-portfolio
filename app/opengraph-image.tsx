import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Default social preview (11 §3), generated at build time in the Spec Sheet style.
// Case studies get their own OG image from the hero render.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fonts = join(process.cwd(), "node_modules/geist/dist/fonts");

export default async function OpengraphImage() {
  const [medium, mono] = await Promise.all([
    readFile(join(fonts, "geist-sans/Geist-Medium.ttf")),
    readFile(join(fonts, "geist-mono/GeistMono-Regular.ttf")),
  ]);

  const label = {
    fontFamily: "Geist Mono",
    fontSize: 22,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "#67655f",
  };

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#eeece7",
        color: "#161614",
        padding: "64px 72px",
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #16161429",
          paddingBottom: 20,
          ...label,
        }}
      >
        <span>{site.name}</span>
        <span>{site.role}</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 104,
          lineHeight: 0.95,
          letterSpacing: "-0.035em",
          maxWidth: 900,
        }}
      >
        {site.headline}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 48, height: 2, background: "#e04800" }} />
        <span style={label}>Mondragon Unibertsitatea · Basque Country</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
