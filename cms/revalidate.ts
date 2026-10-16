import { revalidatePath } from "next/cache";

// On-demand revalidation (16 §3): after content changes in /dashboard, rebuild the
// affected static pages within seconds. Outside a Next request (e.g. the seed
// script) revalidatePath throws; that's expected and ignored.
export function revalidate(paths: string[]) {
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      // Not running inside Next.js (seed / CLI): nothing to revalidate.
    }
  }
}

/** Every public page that can show project data. */
export const SITE_PATHS = ["/", "/work", "/lab", "/about", "/sitemap.xml"];
