# Technical Architecture

Status: **APPROVED** (2026-10-15; deployment via private GitHub repo + Vercel) · Depends on: `04`, `05`, `07`
Versions were checked on 2026-10-15 with `npm view` and official sources (listed in §11). They are re-checked on the day implementation starts.

## 1. Summary

| Layer | Choice | Version policy |
|---|---|---|
| Framework | **Next.js, App Router, fully static** | Latest **16.4.x** patch, **≥ 16.4.1** (security release) |
| UI runtime | React | The version `create-next-app` 16.4.x installs (19.x) |
| Language | **TypeScript, strict** | **^5.9** (5.9.3), the `create-next-app` default. Not 7.x (see §3) |
| Styling | **Tailwind CSS v4**, tokens in CSS `@theme` | 4.3.x |
| Motion | **GSAP** core + ScrollTrigger + SplitText, via `@gsap/react` (`useGSAP`) | gsap 3.15.x, @gsap/react 2.1.x |
| Smooth scroll | **None** (no Lenis) | — |
| 3D | **None** in MVP | — |
| Component library | **None** (no shadcn/ui, no Radix) | — |
| Icons | lucide-react (≈ 5 icons, tree-shaken) | latest 1.x at install |
| Fonts | `next/font`, self-hosted at build | Pair chosen in Phase 6 (Geist + Geist Mono is the lead candidate) |
| Images | `next/image` with static imports | Built in |
| Content | **Typed TypeScript content files** in the repo | — |
| Hosting | **Vercel (Hobby)** on the default `*.vercel.app` URL | Domain later (D-19) |
| Package manager | pnpm (already installed: 11.9) | — |
| Node | 24.x (installed 24.18; Next requires ≥ 20.9) | — |
| Lint / format | ESLint 9 + `eslint-config-next`, Prettier | ESLint ^9, as `create-next-app` installs. Not 10 yet |

What it adds up to: one framework, one styling system, one animation engine, no backend, no CMS, no database.

## 2. Next.js and React

**Decision:** Next.js App Router, every route statically generated at build time.

- **Why Next.js:** it's the stack Mikel already uses. It also handles image optimisation, font self-hosting, metadata, sitemap, robots and OG images in one place, and deploys natively to Vercel.
- **Alternatives considered:**
  - **Astro:** a better fit for a pure content site with less client JS. But it's a new framework to learn with a 5-week build window, and React islands would still be needed for GSAP components.
  - **Vite + React SPA:** weaker SEO and metadata handling.
  - Rejected for schedule risk and fit, not quality.
- **Static rendering:**
  - Case studies use `generateStaticParams` with `dynamicParams = false`, so unknown slugs return 404 and nothing renders at request time.
  - No Server Actions, API routes, `use cache`, middleware/proxy or ISR.
  - This also keeps the site out of reach of the 16.4.1 advisories (RCE in `use cache` and Image Optimization with SVG, DoS via Server Actions). The site still uses the patched version.
- **Version note (verified 2026-10-15):** 16.4.1 was released on 2026-10-14 with fixes for **two critical RCE advisories and one high DoS**. The 16.3 line (last: 16.3.8, 2026-09-30) has no fix. Normally a release this new would be avoided, but here **the patched release is required**. Use the newest 16.4.x patch on install day.

### Server / client boundary

Everything is a **Server Component** by default. Only these are Client Components (`'use client'`):

| Client component | Why it needs the client |
|---|---|
| `HeroSequence` | GSAP timeline on load |
| `Reveal` (images/media), `RevealHeading` | ScrollTrigger once-only reveals, SplitText |
| `AnnotatedImage` (draw layer only) | Leader-line drawing; labels themselves are server-rendered HTML |
| `ChartBars` (animation layer) | Bar growth; values are server-rendered |
| `CompareSlider` | Pointer and keyboard interaction |
| `SectionIndex` | IntersectionObserver active state |
| `CopyEmailButton` | Clipboard API |

Rules:
- Client components receive plain serialisable props and wrap server-rendered children wherever possible. The HTML is complete without JS.
- GSAP is imported **only** inside client components, and plugins are registered once in `lib/gsap.ts` (a client module).
- `/about` and the 404 page need only `Reveal`. If a page has no animated component, no GSAP code is sent for it (Next splits bundles per route automatically).

## 3. TypeScript

- `strict: true`, plus `noUncheckedIndexedAccess`. Enable `typedRoutes: true` (verified in the Next docs) so every internal link is type-checked.
- **TypeScript 7 rejected for now.** Per the Next docs (verified), TS 7 "does not currently provide the JavaScript compiler API". Next can use the `tsc` CLI instead, but then it loses its route-aware error messages, and the setting involved is experimental. TS 5.9.3 is what `create-next-app` installs and is fully supported. Revisit after the MVP.

## 4. Styling: Tailwind v4

- Tailwind v4's CSS-first `@theme` holds all design tokens (colours, type scale, spacing, motion durations and easings from `07` §2) as CSS variables. CSS, Tailwind utilities and GSAP all read the same variables, so there is one source of truth.
- **No component library.** The site needs about 20 small custom components; none are complex widgets (no dialogs, comboboxes or date pickers). shadcn/ui or Radix would add a second design language to fight. Native `<details>` covers the mobile contents list.
- Class sorting with `prettier-plugin-tailwindcss`.

## 5. Motion: GSAP

Decision D-22 confirmed with today's evidence:

| Check | Result |
|---|---|
| Licence | **Verified:** GSAP Standard "No Charge" licence (Webflow, effective 2025-04-30). Commercial use is free, **including SplitText and all plugins**. The only prohibition is building visual animation tools that compete with Webflow, which doesn't apply here. No attribution required; proprietary notices must not be removed from the library files |
| React integration | `@gsap/react` 2.1.2 (`useGSAP`, peer `react >= 17`, `gsap ^3.12.5`). Scoped contexts and automatic cleanup on unmount, which satisfies the ownership rules in `07` §4 |
| CSS-only alternative | **Rejected for now.** MDN compat data: `animation-timeline: view()` is supported in Chrome 115+ and Safari 26+, but in Firefox only from **159, which is still in beta** (stable is 158 on 2026-10-15). Scroll timelines also scrub and reverse with scroll, while the spec needs once-only reveals |
| Smooth scroll (Lenis) | **Rejected** (see `07` §4) |

Implementation rules:
- **Reduced motion and breakpoints:** `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` and `(hover: none)`.
- **Reveals:** card reveals use `ScrollTrigger.batch`, `once: true`.
- **Split headings:** SplitText re-splits on resize. Check its accessibility output in the browser during Phase 8.

## 6. Content architecture

**Decision: typed TypeScript content files** — `content/projects/ardura.ts` and so on — that implement the data model from `05` §B5.

| Option | Verdict |
|---|---|
| **Typed TS objects** | **Chosen.** Case-study text is short and **media-heavy** (compare sliders, annotations with x/y coordinates, tables, chart series). These are structured data, which TS objects express directly. Missing `alt`, `myRole` or `hero` is a **type error that fails the build**, with no extra validation library. Static image imports give width, height and blur placeholders automatically |
| MDX | Better for long prose, but the media modules would become JSX props inside prose files: harder to validate and to reuse for the PDF |
| Headless CMS | Rejected: one editor, a few projects, adds an account, an API and failure modes |

**Reuse for the PDF portfolio (D-11):** the same content files can feed a print-styled route or a print stylesheet later, without copying text.

## 7. Images and media

- **Source pipeline:**
  - Originals stay in `projects info/` (git-ignored).
  - A small one-off script (run manually with `sharp`, which Next already depends on) exports web masters into `content/media/<project>/`: **max 2560 px on the long edge, sRGB, JPEG quality ≈ 85**.
  - Target: < 600 KB per master. These masters are committed.
- **Delivery:** `next/image` with **static imports**, which provides:
  - intrinsic width and height (no layout shift, CLS = 0)
  - automatic `placeholder="blur"`
  - responsive `sizes`, AVIF/WebP generated by Vercel
- **Hero image** (Ardura render): `priority` / preload, so it's the LCP element and loads first.
- **No SVGs through `next/image`.** Diagrams and charts are inline SVG components, which also avoids the 16.4.1 SVG advisory surface.
- **Video:** none planned. If a turntable is added: self-hosted MP4 (H.264) + WebM, muted, `playsinline`, a poster image, `preload="none"`, no autoplay under reduced motion.
- **To verify in Phase 8:** Vercel Hobby image-optimisation quotas against roughly 150–200 source images. Fallback if exceeded: pre-generate AVIF/WebP sizes in the export script and set `unoptimized`.

## 8. Fonts

- Self-hosted through `next/font`, so there are no requests to Google at runtime and no layout shift (`size-adjust` fallback).
- **Lead candidate:** Geist + Geist Mono (SIL OFL, `geist` package 1.7.2 or `next/font/google`). Alternative: Inter Tight + JetBrains Mono.
- **Budget:** two families, at most 2 weights each (variable fonts count as one file each). The final pair is chosen from rendered samples in Phase 6.

## 9. SEO, metadata, routes

- `metadataBase` comes from an env variable `SITE_URL`: today the Vercel production URL, `https://mikelarnao.com` later. Changing domain then means changing one variable.
- Generated files:
  - per-route `generateMetadata`
  - `app/sitemap.ts` and `app/robots.ts`
  - OG images: one static image per project (a cropped final render) plus a site default
- **JSON-LD:** `Person` on `/` (name, jobTitle "Product Designer & Design Engineer", alumniOf Mondragon Unibertsitatea as *student*, sameAs LinkedIn). Only fields that are true.
- **Redirect** `/work` → `/#work` (`next.config` `redirects`).
- **Before the domain exists:** the production `*.vercel.app` URL is the canonical and is indexable. Vercel preview deployments are not indexed. When the domain is added, `*.vercel.app` redirects (308) to it and `SITE_URL` changes.

## 10. Hosting and deployment

- **Vercel Hobby (free):** fits a personal, non-commercial portfolio. Static output and global CDN, with automatic HTTPS on `*.vercel.app`.
- **Domain (D-19, deferred by Mikel):** not connected now. The project name decides the URL, e.g. `mikelarnao.vercel.app` if that name is free when the project is created.
- **Workflow (recommended):**
  - Private GitHub repo connected to Vercel.
  - Every push gets a preview URL; `main` is production.
  - Alternative without GitHub: deploy from this machine with the Vercel CLI (59.1.4 is installed), with no automatic previews.
- **Environment variables:** only `SITE_URL`. No secrets exist.
- **Security headers** (in `next.config`): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, mic and geolocation off), `frame-ancestors 'none'`. A strict CSP is deferred because GSAP and Next inline scripts need nonces or hashes; revisit in Phase 9.
- **Analytics:** none in the MVP, so there are no cookies and no consent banner. Optional later: Vercel Web Analytics (cookieless). Vercel Speed Insights for real-user Core Web Vitals in Phase 9.
- **Dependency hygiene:** exact versions pinned in the lockfile; `pnpm audit` before every production deploy; re-check Next.js security releases weekly until launch.

## 11. Proposed repository structure (documentation only)

```
/app
  layout.tsx            fonts, header, footer, metadata defaults
  page.tsx              home
  about/page.tsx
  work/[slug]/page.tsx  case-study template
  not-found.tsx
  sitemap.ts  robots.ts  opengraph-image (static files)
  globals.css           Tailwind import + @theme tokens
/components
  layout/   Header, Footer, Container, Grid
  ui/       Link, Button, Meta (mono labels), Divider, CopyEmailButton
  home/     Hero, HeroSequence, WorkList, ProjectCard, Approach, AboutTeaser
  project/  ProjectIntro, RoleBlock, SectionIndex, Section, PrevNext
  media/    MediaFrame, FullBleed, ImageGrid, CompareSlider, AnnotatedImage,
            SpecTable, Chart, StepSequence
  motion/   Reveal, RevealHeading
/content
  projects/ ardura.ts, seat-ateca-mirror.ts, mercedes-vent-lca.ts, orbea-cycle-dry.ts
  media/    <project>/*.jpg   (web masters)
  site.ts   name, role, headline, availability, contact
  types.ts  Project, Section, Media types
/lib        gsap.ts (client), seo.ts
/scripts    export-images.mjs (sharp)
/docs/portfolio
```

## 12. Sources checked (2026-10-15)

- npm registry (`npm view`): versions and release dates for next, react, typescript, tailwindcss, gsap, @gsap/react, geist, eslint, lucide-react, sharp; `next` engines (Node ≥ 20.9.0); `create-next-app@16.4.1` defaults (typescript ^5, eslint ^9, tailwindcss ^4).
- Next.js release v16.4.1 on GitHub: security advisories listed above.
- Next.js docs, TypeScript page (last updated 2026-08-25): TS 7 support, `typedRoutes`.
- GSAP Standard Licence page (gsap.com/community/standard-license).
- MDN browser-compat-data (GitHub, `animation-timeline`), Mozilla product-details (Firefox stable 158, beta 159).
- **Not verified yet:** Vercel Hobby image-optimisation quota and terms (check on the Vercel pricing page in Phase 8); SplitText accessibility output (check in browser in Phase 8).
