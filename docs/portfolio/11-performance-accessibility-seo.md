# Performance, Accessibility and SEO

Status: **proposed targets** (2026-10-15). Nothing here has been measured yet; the targets are checked in Phase 9 (and at the approval build).
Depends on: `07`, `08`, `10`

## 1. Performance

### Targets

Lab = Lighthouse mobile preset (simulated slow 4G, 4× CPU), median of 3 runs. Field = Vercel Speed Insights p75, once there is traffic.

| Metric | Target (lab, mobile) | Field (p75) | Notes |
|---|---|---|---|
| LCP | **≤ 2.0 s** | ≤ 2.5 s | LCP element = hero render (preloaded, `priority`) |
| CLS | **≤ 0.02** (aim 0) | ≤ 0.05 | Static image dimensions, `next/font` size-adjust, animations transform-only |
| INP | — (lab: TBT ≤ 150 ms) | **≤ 200 ms** | Scrubbed timelines must not run JS-heavy work per frame |
| Lighthouse Performance | **≥ 90** mobile, ≥ 95 desktop | — | Homepage and one case study |
| First-load JS (transferred) | Home **≤ 220 KB**; case study ≤ 230 KB; /about ≤ 200 KB (revised 2026-10-16, see note) | — | Measured: Next 16 + React framework ≈ 150 KB (fixed), GSAP + ScrollTrigger + SplitText ≈ 46 KB, Lenis ≈ 10 KB. Home 213 KB, Ardura 222 KB |
| Hero image | ≤ 200 KB at 375 px width, ≤ 350 KB at 1440 px | — | AVIF/WebP from `next/image` |
| Initial page weight (home, above the fold) | ≤ 900 KB | — | Grid tiles and cards lazy-load |
| Fonts | ≤ 2 woff2 files preloaded, ≤ 120 KB total | — | Variable Geist + Geist Mono, Latin subset |
| Third-party requests | **0** | — | No analytics, fonts or CDNs at runtime in the MVP |
| Animation | No long tasks > 50 ms during scroll; ≥ 55 fps in the process grid on a mid-range Android (DevTools 4× CPU as proxy) | — | `07` §8 |

> **Budget revision (Checkpoint A).** The original 180 KB assumed a ~100 KB framework, an estimate made before measuring. The framework alone is ~150 KB in Next 16.4. With TBT ≈ 10 ms and Performance 97 (DevTools throttling), the approved motion stack (GSAP, Lenis) is kept and the budget raised to match. Any new dependency must fit inside it.

### Rules that protect the targets
- All routes are static (SSG). No runtime server work.
- Images below the fold are lazy, and grid tiles request about twice their tile size, not full renders.
- GSAP loads only through client components. Pages without them ship no GSAP.
- No `filter: blur`, no `backdrop-filter`, no animated box-shadows.
- `will-change` only while the process grid is active.
- Lenis (if chosen, D-33) is measured separately and kept only if TBT and INP stay within target.

### How it's measured
1. `next build`, then Lighthouse (Chrome DevTools, mobile, 3 runs) on the **Vercel preview URL**, never on localhost alone.
2. PageSpeed Insights on the preview URL, as an independent run.
3. JS size: the DevTools Network panel ("JS, transferred") on a cold load, plus `@next/bundle-analyzer` once to find what's heavy.
4. Animation: DevTools Performance panel recording while scrolling through the hero and process grid, with 4× CPU throttle, checking for long tasks and dropped frames.
5. A real phone (Mikel's) on mobile data: scroll the homepage and one case study.

## 2. Accessibility

**Target: WCAG 2.2 level AA.**

| Area | Requirement | Check |
|---|---|---|
| Semantics | One `h1` per page; heading levels without gaps; landmarks `header`, `nav`, `main`, `footer`; lists as lists; `<dl>` for metadata | axe + manual outline check |
| Keyboard | Everything reachable and usable by keyboard. Visible focus (`10` §3). Skip link. No traps. Compare slider operable with arrow keys. Hidden CTAs not focusable (`07` §3I) | Manual tab-through of every page |
| Contrast | Text ≥ 4.5 : 1, large text and UI lines ≥ 3 : 1. Palette pre-checked (`10` §1) | axe + spot checks on images with text over them (none planned) |
| Images | Meaningful images have descriptive alt (required by the type system); decorative tiles `alt=""`; charts have data tables | Review of all `alt` text before launch |
| Motion | `prefers-reduced-motion` honoured (`07` §6); no content depends on animation; nothing flashes more than 3 times per second; the scroll hint stops | Emulate reduced motion in DevTools; disable JS and reload |
| Touch | Targets ≥ 44 × 44 px; no hover-only content | Mobile emulation + real phone |
| Text | Zoom to 200% without loss; reflow at 320 px width without horizontal scrolling (tables scroll inside their own box) | Browser zoom, 320 px viewport |
| Screen reader | Split headings read as whole sentences; copy button announces "Copied"; external links announced | NVDA on Windows (free) quick pass of home + one case study |
| Language | `lang="en"`; Basque or Spanish names (e.g. company names) don't need markup | — |

Automated: `@axe-core/playwright` on every route in Phase 9, with **0 violations** as the target. Lighthouse Accessibility = 100.

## 3. SEO

| Item | Specification |
|---|---|
| Titles | Home: `Mikel Arnao — Product Designer & Design Engineer`. Case study: `{Title} — {product type} · Mikel Arnao`. About: `About · Mikel Arnao` |
| Descriptions | Home: the supporting statement trimmed to ≤ 155 characters. Case studies: the project `summary` (≤ 160, `05` B5) |
| Canonical | Absolute, from `SITE_URL` (`08` §9); one canonical per page |
| Open Graph / Twitter | `og:title`, `og:description`, `og:image` 1200 × 630 per project (cropped final render, **placeholder until then**), `twitter:card=summary_large_image` |
| Sitemap / robots | `app/sitemap.ts` lists `/`, `/about` and the 4 case studies; `robots.ts` allows all and links the sitemap. Previews are `noindex` by Vercel default |
| Structured data | JSON-LD `Person` on `/`: name, jobTitle, `alumniOf` / `affiliation` Mondragon Unibertsitatea, `sameAs` LinkedIn, `knowsLanguage` (eu, es, en). Nothing that isn't true. No `CreativeWork` markup until real dates and images are in |
| Headings and links | Descriptive link text ("View the Ardura case study", not "here"); heading hierarchy as above |
| URL | Lowercase, descriptive slugs (`04` §7) |
| 404 | Real 404 status, `noindex` |
| Placeholders | **The production URL is not shared publicly while placeholders exist.** The approval build is checked on a preview URL |

Measured with Lighthouse SEO (target 100), the Rich Results Test on the production URL, and a manual look at the social preview (LinkedIn Post Inspector) at launch.
