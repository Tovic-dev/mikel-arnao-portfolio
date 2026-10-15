# Open Decisions Log

Statuses: `OPEN` · `RECOMMENDED` (awaiting approval) · `APPROVED` · `REJECTED` · `DEFERRED`

## Approved

| ID | Decision | Date |
|---|---|---|
| D-01 | Source files live in `projects info/` (git-ignored, never published as-is) | 2026-10-15 |
| D-02 | All projects have process material (Mikel). Image quality still to be reviewed | 2026-10-15 |
| D-03 | **English only** | 2026-10-15 |
| D-05a | Ardura / iF: **participation only, not an award**. Mention at most as "submitted to iF Design Student Award" once the exact competition name is confirmed, or leave it out | 2026-10-15 |
| D-06 | **Deadline: master's applications in ~2 months (≈ mid-December 2026).** Planning must be short and an MVP must ship well before then | 2026-10-15 |
| L-02 | Git initialised on `main`; `projects info/` and `.claude/skills/` ignored | 2026-10-15 |
| D-07 | Flagships: 1 Ardura, 2 SEAT mirror, 3 Mercedes vent LCA, 4 Orbea rack. More projects added later | 2026-10-15 |
| D-08 | Mikel's role per flagship recorded in `09-content-and-assets.md` §3 | 2026-10-15 |
| D-11 | A PDF portfolio is required. It will be made **after** the website, derived from the same content and visual system | 2026-10-15 |
| D-14 | Original renders and CAD files exist (Mikel); to be copied in before Phase 6 | 2026-10-15 |
| D-12 | Headline **"From concept to specification."** | 2026-10-15 |
| D-13 | Orbea and Maier allow their names to be used publicly (Mikel). Wording: "Academic project in collaboration with Orbea" / "Carried out with Maier for the SEAT Ateca" | 2026-10-15 |
| D-04 | Creative direction **A "Spec Sheet"**, plus one full-bleed render moment per case study (from B) and CAD→render transitions (from C) | 2026-10-15 |
| D-15 | Ibili "Jario": **embargoed**. Ibili 2026 competition for the graphics of the nature-inspired "Hydrate & Reuse" bottle line; design unreleased, so copyright blocks publication. Do not show the design or name the result until Ibili launches the line | 2026-10-15 |
| D-16 | Availability line: "Open to internships and master's programmes · 2027" | 2026-10-15 |
| D-17 | Mercedes hero = photo of the original vent; LCA charts come from Mikel's existing charts | 2026-10-15 |
| D-18 | Contact: arnaomikel10@gmail.com · linkedin.com/in/mikelarnao. **No CV download** | 2026-10-15 |
| D-19 | Domain **mikelarnao.com** is owned but **not connected for now** (Mikel). Launch on the Vercel `*.vercel.app` URL; `SITE_URL` env var makes the later switch a one-line change | 2026-10-15 |
| D-20 | Tools: SolidWorks (Ardura, SEAT, Orbea) · Siemens NX (SEAT) · KeyShot + Blender (Ardura, SEAT, Orbea) · IHOBE "Climate and circularity calculator" (Mercedes LCA). Adobe only on non-flagship dossiers | 2026-10-15 |
| D-22 | Motion engine: GSAP (core + ScrollTrigger + SplitText) + CSS for hover/state; no Lenis, no pinning, no route transitions in MVP | 2026-10-15 |
| D-24 | **Stack approved** as in `08-technical-architecture.md` (Next.js 16.4.x ≥ 16.4.1 static, TS ^5.9 strict, Tailwind v4, GSAP, typed content files, Vercel Hobby, pnpm) | 2026-10-15 |
| D-25 | Deployment: **private GitHub repo connected to Vercel** (preview per push, `main` = production) | 2026-10-15 |
| D-26 | Typeface: **Geist + Geist Mono** | 2026-10-15 |
| D-27 | Accent: **signal orange**, line `#E04800`, text `#B83A00` | 2026-10-15 |
| D-28 | Education: Mondragon Unibertsitatea, 2023–2027 (expected), currently 4th year | 2026-10-15 |
| D-29 | Languages: Basque (native), Spanish (native), English C1 (Cambridge CAE) | 2026-10-15 |
| D-30 | Hero H1 = headline "From concept to specification."; name in header and title | 2026-10-15 |
| D-31 | Portrait: Mikel has one and will add it later; placeholder until then | 2026-10-15 |
| D-32 | **Placeholder images** (generic, free-licence) for the first build so layout, performance and motion can be approved before real assets; plan in `09` §6 | 2026-10-15 |
| D-34 | Adopt Mikel's "Sticky Grid Scroll" reference (Codrops, MIT): curtain hero + sticky process grid on the homepage, adapted to Spec Sheet (`03` round 2, `07` §3H–I, `05` A2b) | 2026-10-15 |
| D-21 | IA: home as index, no `/work` or `/contact` page, no burger, static header, sticky section index in case studies (`04`) | 2026-10-15 |
| D-10 | Timeline: approval build by 1 Nov, real content by 15 Nov, launch 23 Nov, PDF 24 Nov – 6 Dec, buffer to mid-Dec | 2026-10-15 |
| **D-36** | **Final plan approved; Phase 8 implementation authorised** | 2026-10-15 |
| D-38 | **Work page** at `/work` listing every project with filters (Field, Context, Year); replaces the `/work` → `/#work` redirect. Layout: pending Mikel's choice (A spec index / B gallery grid / C editorial list) | 2026-10-16 |
| D-39 | Non-flagship projects appear as **short entries** (lighter page: 1–2 images, role, short description). Ibili stays embargoed (D-15) | 2026-10-16 |
| D-40 | Navigation: **Work · Lab · About + compact copy-email button**; Contact link removed (footer keeps contact). Lab page to be built | 2026-10-16 |
| D-41 | Hero role label removed (repeated the header); header now shows the role on every screen size | 2026-10-16 |
| D-33 | **Lenis smooth scroll** chosen (Checkpoint A): on by default with mouse/trackpad, native on touch and with reduced motion. Review panel and native/Lenis switch removed; `?motion=on` kept until launch | 2026-10-16 |
| D-37 | Checkpoint A feedback: no about section on the homepage (About page only); "Featured projects" wording (more projects exist); smoother hero→grid curtain as in the reference; grid holds then is covered by featured projects (second curtain); compact footer | 2026-10-16 |

## Open

| ID | Decision | Recommendation | Status |
|---|---|---|---|
| D-05b | UPV competition (house) | Future project; add doc and link when it's added | DEFERRED |
| D-09 | Missing brief projects (mobility app, T-shirts, robotics) | Added after MVP | DEFERRED |
| D-35 | Exact master's application deadline(s) | Tell me when known; the roadmap assumes ≈ 15 Dec | OPEN |
| D-23 | Git commit email is `arnaomikel10@email.com` (domain "email.com") while the contact email is `@gmail.com` | Probably a typo in your git config. Fix with `git config --global user.email` if so | OPEN |

## Low-impact decisions taken (reversible)

| ID | Decision | Rationale |
|---|---|---|
| L-01 | Planning docs live in `docs/portfolio/`, numbered as in the brief | One source of truth per topic |
| L-03 | Installed agent skills are optional references, not requirements | They contradict each other stylistically |
| L-04 | Teammates are credited by name on each case study (with their consent) | Honest, and expected for team PBL work |
