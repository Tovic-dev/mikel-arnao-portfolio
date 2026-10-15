# Component Inventory

Status: **proposed** (2026-10-15) · Depends on: `05`, `07`, `08` §11, `10`
Legend:
- **S** = Server Component, **C** = Client Component (`'use client'`)
- **E** = essential (MVP), **O** = optional, **X** = experimental
- **Motion owner** = the component that creates and cleans up the animation (`07` §4)

Principle: one component per meaningful responsibility. Decorative details (hairlines, numbers, arrows) are props or CSS, not components.

## 1. Global shell

| Component | Type | Tier | Purpose | Props / content | Responsive | Motion owner |
|---|---|---|---|---|---|---|
| `RootLayout` (`app/layout.tsx`) | S | E | `<html lang="en">`, fonts, metadata defaults, skip link, header, footer | `content/site.ts` | — | — |
| `SkipLink` | S | E | "Skip to content" → `#main` | — | — | — |
| `Header` | S | E | Wordmark + nav | current path (via `NavLink`) | 2 rows < 640 px | — |
| `NavLink` | C | E | Sets `aria-current` from the pathname | `href`, label | — | CSS only |
| `Footer` | S | E | Contact block `#contact`, sign-off | site data | Stacks < 640 px | — |
| `CopyEmailButton` | C | E | Clipboard + `aria-live` status | email | 44 px target | CSS only |
| `Container` | S | E | Max width 1600, outer margins | `bleed?` | Margins per breakpoint | — |
| `Grid` | S | E | 4/8/12-column CSS grid with column-span helpers | `as`, children | Columns per breakpoint | — |
| Route transition layer | — | X | Not built in MVP (`07` §5) | — | — | — |
| Scroll progress | — | — | Rejected (`04` §4) | — | — | — |

## 2. Typography and primitives

| Component | Type | Tier | Purpose | Notes |
|---|---|---|---|---|
| `Heading` | S | E | `level` (1–3) + `size` (display/h1/h2/h3) kept separate so semantics and visual size can differ | Wraps in `RevealHeading` when `reveal` is set |
| `Text` | S | E | Body / lead / small variants | Max measure built in |
| `Label` | S | E | Mono uppercase `text-label` (eyebrows, figure numbers, metadata keys) | |
| `TextLink` | S | E | Underlined link, external variant with ↗ and an accessible "(opens LinkedIn)" text | |
| `Button` / `ButtonLink` | S | E | Primary / secondary CTA, optional arrow | 48 px tall, square |
| `IconButton` | C | E | Copy, CAD/Render toggle | 44 × 44 px minimum |
| `Divider` | — | — | Not a component: a CSS utility (`border-t`) | |
| `MetaList` | S | E | `<dl>` label/value rows (case-study intro, cards) | Role values as an accent-marker list |
| `Tag` | S | E | Discipline text tags (`Product · CAD`) | Text, not pills |

## 3. Homepage

| Component | Type | Tier | Purpose | Content dependency | Motion owner |
|---|---|---|---|---|---|
| `Hero` | S | E | Label, H1, lead, availability, CTA, hero image | `site.ts`, Ardura hero media | — |
| `HeroSequence` | C | E | Load timeline (chars, image clip, callouts) **and** curtain scroll-out | wraps `Hero` children by ref | **owns** `07` §3B + §3H |
| `ScrollHint` | S + CSS | E | "Scroll" line, 3 iterations | — | CSS |
| `ProcessGrid` | C | E | Sticky dark stage, 12 tiles, centred text, scrubbed timeline | 12 tile media (3 × project), copy | **owns** `07` §3I |
| `WorkList` | S | E | Ordered list of `ProjectCard` | all projects sorted by `order` | delegates to `Reveal` (batch) |
| `ProjectCard` | S | E | Number, image, title, summary, meta, CTA; whole card one link | project front matter | `Reveal` + CSS hover |
| `Approach` / `ApproachStep` | S | E | 4 steps with evidence links | static copy + anchors | `Reveal` |
| `AboutTeaser` | S | E | Short bio + link | `site.ts` | `Reveal` |

## 4. Projects

| Component | Type | Tier | Purpose | Notes |
|---|---|---|---|---|
| `ProjectIntro` | S | E | Number, title, summary, `MetaList` incl. "My role" | Must fit above the fold (`05` B1) |
| `SectionIndex` | C | E | Sticky list (desktop), `<details>` (tablet/mobile), active marker | IntersectionObserver; **owns** C1 |
| `CaseSection` | S | E | Numbered section: heading, short body, media blocks | `id` = anchor |
| `MediaBlock` | S | E | Switch rendering the right media module from data | One place maps `type` → component |
| `MediaFrame` | S | E | `next/image` in a ratio frame + `Caption`; placeholder tag | `placeholder` flag shows a tag outside production |
| `Caption` | S | E | `FIG 05.2 — … · credit` | |
| `FullBleed` | S | E | Edge-to-edge image | `Reveal` |
| `ImageGrid` | S | E | 2–4 images, equal height | |
| `CompareSlider` | C | E | CAD ↔ render, drag + keys + toggle | **owns** C4; ARIA slider |
| `AnnotatedImage` | S + C layer | E | Image + HTML labels; client layer draws leader lines | **owns** C3; list below image on mobile |
| `SpecTable` | S | E | Mono table, scroll box on mobile | |
| `Chart` (bar) | S + C layer | E | Inline SVG bar chart + data table fallback | **owns** C5 |
| `StepSequence` | S | E | Numbered frames (mechanism, manufacturing) | |
| `InsightQuote` | S | O | Large research insight | |
| `PrevNextProject` | S | E | Wrapping prev/next | CSS hover |
| Before/after slider | — | — | Covered by `CompareSlider` | |
| Process timeline | — | — | Not needed: section numbering is the timeline | |
| Project filter | — | — | Rejected (`04` §4) | |
| Pinned mechanism sequence | C | X | Orbea, post-MVP (`07` §5) | |

## 5. Animation

| Component / module | Type | Tier | Purpose |
|---|---|---|---|
| `lib/gsap.ts` | C module | E | Registers ScrollTrigger + SplitText once; exports `gsap`; sets defaults from tokens |
| `Reveal` | C | E | Once-only clip/fade reveal for children; `ScrollTrigger.batch` in lists |
| `RevealHeading` | C | E | SplitText line (or char, hero only) mask reveal; re-splits on resize; keeps accessible text |
| `useReducedMotion` | C hook | E | Wraps `gsap.matchMedia` conditions for components that branch in render (e.g. `ProcessGrid` static layout) |
| `SmoothScroll` (Lenis) | C | X | Only for the D-33 A/B test; behind a flag; removed if not chosen |
| Custom cursor | — | — | Rejected |

## 6. Utilities

| Item | Purpose |
|---|---|
| `content/types.ts` | `Project`, `Section`, `Media` (union by `type`), `placeholder` flag; required fields make the build fail when missing |
| `content/index.ts` | `getProjects()`, `getProject(slug)`, `getAdjacent(slug)` |
| `lib/seo.ts` | Metadata builders, JSON-LD `Person` |
| `app/sitemap.ts`, `app/robots.ts` | Generated SEO files |
| `app/not-found.tsx` | 404 |
| `scripts/export-images.mjs` | One-off sharp export of web masters |
| `scripts/check-placeholders.mjs` | Lists media with `placeholder: true`; fails when `LAUNCH=1` |
| Error states | Static site: only 404. No data-fetching error UI needed |
| Loading states | None: static pages; images use blur placeholders |
| Video handling | Not in MVP (`08` §7) |

## 7. Counts

- **Client components:** `NavLink`, `CopyEmailButton`, `IconButton`, `HeroSequence`, `ProcessGrid`, `SectionIndex`, `CompareSlider`, the `AnnotatedImage` and `Chart` draw layers, `Reveal`, `RevealHeading`. That is **11**, all small. Everything else renders on the server.
- **Total:** ~45 components. None comes from an external UI library.

## Additions for the Work page (2026-10-16, proposed — `05` Part D/E)

| Component | Type | Purpose |
|---|---|---|
| `WorkIndex` | C | Owns filter + view state (synced to the URL), renders list or grid, runs Flip on changes |
| `WorkFilters` | C (inside `WorkIndex`) | Field / Context / Year toggle groups, counts, result line, Clear; `<details>` on phones |
| `ViewToggle` | C | List / Grid segmented control |
| `IndexRow` | S | One project row (link), columns + sr-only labels, mobile thumbnail |
| `IndexCard` | S | Grid card (link) |
| `HoverPreview` | C | Floating 3:2 preview following the pointer (desktop, motion allowed) |
| `ShortEntryBody` | S | "About the project" paragraphs + optional media for short entries |
| `lib/flip.ts` | C module | Dynamic import + registration of GSAP Flip, used only on `/work` |
