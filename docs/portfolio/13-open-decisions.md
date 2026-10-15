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

## Round 3 — open

| ID | Decision | Recommendation | Status |
|---|---|---|---|
| D-05b | UPV competition (house) | Future project; add doc and link when it's added | DEFERRED |
| D-09 | Missing brief projects (mobility app, T-shirts, robotics) | Added after MVP | DEFERRED |
| D-21 | IA: home as index, no `/work` page, no `/contact` page, no burger, static header, sticky section index in case studies | See `04-information-architecture.md` | RECOMMENDED |
| D-22 | Motion: GSAP (core + ScrollTrigger + SplitText) for reveals and the hero; CSS for hover/state; **no Lenis**, no pinning, no route transitions in MVP | Confirmed in Phase 5: licence free incl. SplitText; CSS scroll timelines not in stable Firefox (`08` §5) | RECOMMENDED |
| D-24 | Stack: Next.js 16.4.x (≥ 16.4.1, security) static App Router · TypeScript ^5.9 strict · Tailwind v4 · GSAP · typed TS content files · next/image · next/font · Vercel Hobby · pnpm. No CMS, no component library, no 3D, no analytics in MVP | See `08-technical-architecture.md` | RECOMMENDED |
| D-25 | Deployment workflow | Private GitHub repo + Vercel Git integration (preview URL per push). Needs a GitHub account; alternative is Vercel CLI from this PC | OPEN |
| D-23 | Git commit email is `arnaomikel10@email.com` (domain "email.com") while the contact email is `@gmail.com` | Probably a typo in your git config. Fix with `git config --global user.email` if so | OPEN |
| D-10 | Planning depth vs deadline | Planning ≈ 2 weeks, MVP weeks 3–6, polish 7–8. **The PDF also needs time before the deadline. Reserve the last ~1.5 weeks for it**, so the web MVP must be done by ~week 5 | RECOMMENDED |

## Low-impact decisions taken (reversible)

| ID | Decision | Rationale |
|---|---|---|
| L-01 | Planning docs live in `docs/portfolio/`, numbered as in the brief | One source of truth per topic |
| L-03 | Installed agent skills are optional references, not requirements | They contradict each other stylistically |
| L-04 | Teammates are credited by name on each case study (with their consent) | Honest, and expected for team PBL work |
