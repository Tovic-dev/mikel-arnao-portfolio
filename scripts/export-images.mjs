// Exports web masters from original project files (docs/portfolio/08 §7).
//
//   node scripts/export-images.mjs "<source folder>" <project-slug>
//
// Reads every JPG/PNG/WebP/TIFF in <source folder> (originals stay in
// `projects info/`, which is git-ignored) and writes, for each one,
// content/media/<project-slug>/<name>.jpg:
//   - max 2560 px on the long edge (never upscaled)
//   - sRGB, EXIF orientation applied, metadata stripped
//   - mozjpeg quality 85, progressive
// Prints a size report and warns about files above 600 KB.
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [sourceDir, slug] = process.argv.slice(2);
if (!sourceDir || !slug) {
  console.error(
    'Usage: node scripts/export-images.mjs "<source folder>" <project-slug>',
  );
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error("Project slug must be lowercase letters, numbers and hyphens.");
  process.exit(1);
}

const MAX_EDGE = 2560;
const WARN_BYTES = 600 * 1024;
const outDir = path.join(process.cwd(), "content", "media", slug);
await mkdir(outDir, { recursive: true });

const files = (await readdir(sourceDir)).filter((f) =>
  /\.(jpe?g|png|webp|tiff?)$/i.test(f),
);
if (files.length === 0) {
  console.error(`No images found in ${sourceDir}`);
  process.exit(1);
}

const toName = (file) =>
  path
    .parse(file)
    .name.normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

let total = 0;
for (const file of files) {
  const out = path.join(outDir, `${toName(file)}.jpg`);
  const info = await sharp(path.join(sourceDir, file))
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .toColourspace("srgb")
    .flatten({ background: "#f7f6f3" })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toFile(out);
  const { size } = await stat(out);
  total += size;
  const flag = size > WARN_BYTES ? "  ⚠ over 600 KB" : "";
  console.log(
    `${path.relative(process.cwd(), out)}  ${info.width}×${info.height}  ${Math.round(size / 1024)} KB${flag}`,
  );
}
console.log(
  `\n${files.length} images, ${Math.round(total / 1024)} KB total → ${path.relative(process.cwd(), outDir)}`,
);
