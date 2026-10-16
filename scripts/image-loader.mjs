// Node module hook for scripts/seed.ts: the seed files import images the way
// Next does (`import x from "./a.jpg"`). Outside Next, those imports become
// { src: <absolute path> }.
import { fileURLToPath } from "node:url";

export async function load(url, context, next) {
  if (/\.(jpe?g|png|webp|avif)$/i.test(new URL(url).pathname)) {
    const src = fileURLToPath(url);
    return {
      format: "module",
      shortCircuit: true,
      source: `export default ${JSON.stringify({ src, width: 0, height: 0 })};`,
    };
  }
  return next(url, context);
}
