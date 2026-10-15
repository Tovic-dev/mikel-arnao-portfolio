// Generates neutral stand-in images so layout and motion can be reviewed before
// real assets arrive (docs/portfolio/09-content-and-assets.md §6).
// Usage: node scripts/generate-placeholders.mjs
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "content/media/_placeholder");

const KINDS = {
  render: { bg: "#d9d6cf", shape: "#b9b5ac", line: null },
  cad: { bg: "#f7f6f3", shape: "none", line: "#8a8780" },
  sketch: { bg: "#efede8", shape: "none", line: "#55534e" },
  photo: { bg: "#c9c6be", shape: "#a8a49b", line: null },
  chart: { bg: "#f7f6f3", shape: "none", line: "#8a8780" },
  portrait: { bg: "#cfccc5", shape: "#9f9b92", line: null },
};

function svg({ w, h, kind, label }) {
  const k = KINDS[kind];
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.22;
  const body =
    kind === "portrait"
      ? `<circle cx="${cx}" cy="${cy - r * 0.6}" r="${r * 0.55}" fill="${k.shape}"/>
         <rect x="${cx - r}" y="${cy + r * 0.1}" width="${r * 2}" height="${h}" rx="${r}" fill="${k.shape}"/>`
      : kind === "cad" || kind === "chart"
        ? `<g fill="none" stroke="${k.line}" stroke-width="${Math.max(2, w / 600)}">
             <rect x="${cx - r}" y="${cy - r * 1.2}" width="${r * 2}" height="${r * 2.4}" rx="${r * 0.9}"/>
             <rect x="${cx - r * 0.7}" y="${cy - r * 0.8}" width="${r * 1.4}" height="${r * 1.1}" rx="${r * 0.4}" stroke-dasharray="${w / 120} ${w / 160}"/>
             <line x1="${cx - r * 1.6}" y1="${cy + r * 1.35}" x2="${cx + r * 1.6}" y2="${cy + r * 1.35}"/>
             <line x1="${cx - r * 1.6}" y1="${cy - r * 1.2}" x2="${cx - r * 1.6}" y2="${cy + r * 1.2}" stroke-dasharray="4 6"/>
           </g>`
        : kind === "sketch"
          ? `<g fill="none" stroke="${k.line}" stroke-width="${Math.max(2, w / 500)}" stroke-linecap="round">
               <path d="M${cx - r} ${cy + r} C ${cx - r * 1.2} ${cy}, ${cx - r * 0.9} ${cy - r * 1.3}, ${cx} ${cy - r * 1.2} S ${cx + r * 1.2} ${cy}, ${cx + r} ${cy + r} Z"/>
               <path d="M${cx - r * 0.95} ${cy + r * 0.98} C ${cx - r * 1.1} ${cy}, ${cx - r * 0.8} ${cy - r * 1.25}, ${cx + r * 0.05} ${cy - r * 1.15}" opacity=".5"/>
               <line x1="${cx - r * 1.5}" y1="${cy + r * 1.1}" x2="${cx + r * 1.5}" y2="${cy + r * 1.1}" opacity=".6"/>
             </g>`
          : `<ellipse cx="${cx}" cy="${cy + r * 1.25}" rx="${r * 1.3}" ry="${r * 0.18}" fill="#00000014"/>
             <rect x="${cx - r}" y="${cy - r * 1.2}" width="${r * 2}" height="${r * 2.4}" rx="${r * 0.9}" fill="${k.shape}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="100%" height="100%" fill="${k.bg}"/>
    ${body}
    <text x="${w * 0.03}" y="${h - w * 0.03}" font-family="monospace" font-size="${Math.max(14, w / 70)}" fill="#67655f" letter-spacing="2">${label}</text>
  </svg>`;
}

const files = [
  { name: "hero-render", w: 2400, h: 1800, kind: "render" },
  ...["ardura", "seat", "mercedes", "orbea"].flatMap((p) => [
    {
      name: `${p}-card`,
      w: 2100,
      h: 1400,
      kind: p === "mercedes" ? "photo" : "render",
    },
    {
      name: `${p}-hero`,
      w: 2560,
      h: 1440,
      kind: p === "mercedes" ? "photo" : "render",
    },
    { name: `${p}-sketch`, w: 1200, h: 1200, kind: "sketch" },
    { name: `${p}-cad`, w: 1200, h: 1200, kind: "cad" },
    {
      name: `${p}-render`,
      w: 1200,
      h: 1200,
      kind: p === "mercedes" ? "chart" : "render",
    },
    { name: `${p}-figure-wide`, w: 2400, h: 1350, kind: "cad" },
    { name: `${p}-figure`, w: 1800, h: 1200, kind: "render" },
    { name: `${p}-figure-portrait`, w: 1200, h: 1500, kind: "sketch" },
  ]),
  // Short entries (05 Part E)
  ...["bira", "senda-norte", "stroller"].flatMap((p) => [
    {
      name: `${p}-card`,
      w: 2100,
      h: 1400,
      kind: p === "stroller" ? "sketch" : "render",
    },
    {
      name: `${p}-hero`,
      w: 2560,
      h: 1440,
      kind: p === "stroller" ? "photo" : "render",
    },
    {
      name: `${p}-figure`,
      w: 1800,
      h: 1200,
      kind: p === "stroller" ? "chart" : "sketch",
    },
  ]),
  { name: "portrait", w: 1200, h: 1500, kind: "portrait" },
];

await mkdir(OUT, { recursive: true });
for (const f of files) {
  const label = `PLACEHOLDER · ${f.name.toUpperCase()} · ${f.w}×${f.h}`;
  await sharp(Buffer.from(svg({ ...f, label })))
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(OUT, `${f.name}.jpg`));
}
console.log(
  `Generated ${files.length} placeholders in ${path.relative(process.cwd(), OUT)}`,
);
