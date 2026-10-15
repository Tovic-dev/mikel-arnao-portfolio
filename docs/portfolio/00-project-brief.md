# Project Brief — Mikel Arnao Portfolio

Status: **awaiting final approval** (2026-10-15). This page summarises the whole plan; each line links to the document that holds the detail.

## Vision
A personal portfolio that presents Mikel Arnao as a **Product Designer & Design Engineer**: someone who takes products **from concept to specification**. It works for a recruiter scanning for 30 seconds and for an admissions panel reading for 15 minutes.

## Objectives
1. Support **master's applications due ≈ mid-December 2026** (primary), then internship and graduate applications.
2. Prove the positioning with evidence: four documented projects, with Mikel's own role named.
3. Feel crafted and memorable through motion that means something, without sacrificing speed, accessibility or honesty.

## Audiences (`01` §4)
Master's admissions · product-design and engineering recruiters · automotive and mobility companies · tech and connected-product companies.

## Constraints
- English only.
- Facts only: no invented outcomes, awards or metrics.
- Team credit on every project.
- Web launch by **23 Nov**, then the PDF portfolio.
- Free hosting; domain `mikelarnao.com` owned but connected later.

## Decisions at a glance

| Area | Decision | Doc |
|---|---|---|
| Positioning | "Product Designer & Design Engineer" · headline **"From concept to specification."** | `01` |
| Projects | 1 Ardura · 2 SEAT Ateca mirror (with Maier) · 3 Mercedes V-Class vent LCA · 4 Orbea Cycle Dry. Roles, tools and team recorded | `09` |
| Creative direction | **"Spec Sheet"**: technical-report editorial; warm-grey paper, ink, signal-orange annotations; full-bleed renders; CAD→render transitions | `02` |
| Visual system | Geist + Geist Mono · 4/8/12 grid · square corners · no shadows · WCAG-checked palette | `10` |
| Structure | `/`, `/work/[4 slugs]`, `/about`. No `/work` index, `/contact` page, CV, dark mode, filter or language switch | `04` |
| Homepage | Curtain hero → **sticky process grid** (12 tiles, "exploded view" zoom, from Mikel's reference) → project list → approach → about → contact | `05` A, `07` §3H–I |
| Case studies | Process-numbered sections, "My role" above the fold, compare slider, annotated images, spec tables, charts | `05` B |
| Motion | GSAP (ScrollTrigger, SplitText); CSS for hovers; once-only reveals; reduced-motion and no-JS fallbacks; Lenis decided by A/B test | `07` |
| Stack | Next.js ≥ 16.4.1 static · TypeScript strict · Tailwind v4 · typed content files · next/image · next/font · Vercel Hobby via private GitHub repo · pnpm | `08` |
| Components | ~45 components, 11 client-side, no UI library | `06` |
| Quality targets | Lighthouse mobile ≥ 90 perf / 100 a11y / 100 SEO · LCP ≤ 2.0 s · CLS ≤ 0.02 · WCAG 2.2 AA · 0 third-party requests | `11` |
| Process | Approval build with placeholders → Checkpoint A → real content → Checkpoint B → testing → launch | `12`, `14` |

## Success criteria
- The site passes every item in `14-acceptance-criteria.md`.
- Mikel can send one link in his applications on 23 Nov.
- Adding a fifth project later means adding one content file and its images, with no component changes.

## What Mikel provides
| What | When |
|---|---|
| GitHub account + empty private repo; Vercel account | Before 18 Oct |
| Approval of placeholder downloads (one list) | ~19 Oct |
| Feedback at Checkpoint A | ~1 Nov |
| Renders, CAD screenshots, sketches, vent photo, LCA charts in `projects info/<project>/` | **By 2 Nov** |
| Fact-check of the four case studies (Checkpoint B) | ~15 Nov |
| Portrait photo | Any time before launch (placeholder until then) |
| Exact application deadline (D-35) | When known |

## Open items that don't block the start
D-33 Lenis (decided at Checkpoint A) · D-23 git email typo · D-35 exact deadline · D-05b, D-09 future projects.
