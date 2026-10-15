# Page Specifications

Status: **Parts A, B, C proposed** (2026-10-15). Copy is draft editorial text; facts trace to `09` and `13`.

---

## Part A — Homepage (`/`)

Copy below is **proposed** editorial text (label from `09`). Facts in it come from `09-content-and-assets.md` and the decision log.

### A0. Narrative flow
**Who** (hero, curtain) → **transformation** (process grid: sketches, CAD and renders explode open into one message) → **proof** (4 projects) → **how** (approach, each step pointing back to a project) → **person** (about) → **contact**.
A recruiter gets identity and the first project inside the first viewport and a half. An admissions reader gets method and motivation without leaving the page. Each section answers the question the previous one raises.

### A1. Header
| | |
|---|---|
| Objective | Identity and wayfinding on every page |
| Content | `MIKEL ARNAO` (wordmark, links to `/`) · `Work` · `About` · `Contact` |
| Layout | Desktop: one row, wordmark left, links right, 24 px vertical padding, hairline below. Mobile: wordmark row + links row (mono `text-label`) |
| Components | `Header`, `NavLink` |
| Interaction | G1/G2; current page in accent. Static (scrolls away) |
| A11y | `<header>` + `<nav aria-label="Main">`; "Skip to content" link as the first focusable element |

### A2. Hero
| | |
|---|---|
| Objective | Who, what and why it's credible, in under 10 seconds |
| Takeaway | "Design engineer student who takes products from concept to specification, and here's one." |
| Content | Label: `PRODUCT DESIGNER & DESIGN ENGINEER` · availability label `OPEN TO INTERNSHIPS AND MASTER'S PROGRAMMES · 2027` · H1 (display): **From concept to specification.** · Lead (supporting statement from `01` §3) · Secondary CTA `See selected work ↓` (→ `#work`) · Annotated Ardura render with 2–3 callouts, e.g. `CAD + DEVELOPMENT · LED BY ME`, `FINAL RENDER · LED BY ME` (exact callouts depend on the render) |
| Layout | Desktop: text cols 1–6, render cols 7–12, both top-aligned; total height ≤ 100 svh minus header so the top rule of project 01 is just visible (it signals more below). Tablet: text above, render below at full width. Mobile: label, H1, lead, render, CTA |
| Components | `Hero` (server), `HeroSequence` (client), `AnnotatedImage`, `Meta` |
| Motion | `07` §3B (≤ 1.2 s sequence) |
| Assets | One Ardura final render, ≥ 2400 px wide, product on a neutral background, room for callouts |
| A11y | H1 is the headline. The image `alt` describes the product; callouts are real text |
| Tech | Render `priority` (LCP). No client JS needed for the content to show |

*Name visibility:* the name appears in the header wordmark and the `<title>`. The H1 is the headline, not the name: the name alone says nothing about what he does. **Alternative (D-30):** an H1 of "Mikel Arnao" with the headline as a subtitle, if you'd rather lead with the name.

### A2b. Process grid (between hero and project list)
| | |
|---|---|
| Objective | Turn "concept to specification" into a physical scroll experience, then hand over to the projects |
| Takeaway | "Every project here went from sketch to CAD to render." |
| Content | 12 square tiles, 3 per flagship (sketch, CAD, render). Centre: label `SELECTED WORK · 04`, H2 **Four products, from first sketch to final specification.**, lead *"Team projects with Orbea, Maier and Mondragon Unibertsitatea, where I led the development and the final renders."* (draft, to check), secondary CTA `View projects ↓` → `#work` |
| Layout | Sticky dark stage (ink background, paper text), 260 vh desktop / 200 svh mobile |
| Components | `ProcessGrid` (client: GSAP timeline; server-rendered tiles and text) |
| Motion | `07` §3I; it is also the curtain that covers the hero (`07` §3H) |
| Assets | 12 square crops. **Placeholders first** (D-32) |
| A11y | Tiles `alt=""`; heading and CTA are real content; reduced motion shows a static grid |

### A3. Selected work (`id="work"`)
| | |
|---|---|
| Objective | Prove the claim with 4 projects in flagship order |
| Content | No repeated section title (the process grid introduced it); a visually hidden H2 "Selected work" for the outline, then 4 project cards (`10` §5): number, title, one-line summary, year, "My role" (condensed), disciplines, "View case study →" |
| Proposed summaries (≤ 160 chars) | **01 Ardura**: "A smart plant pot that looks after itself: energy autonomy and circular materials for people who want plants but lack the time." · **02 SEAT Ateca mirror**: "Side-mirror redesign carried out with Maier: regulations, a redesigned electrical circuit and a full material specification." · **03 Mercedes V-Class vent**: "Life-cycle assessment of a car air vent, from hotspots to three redesign actions ranked by environmental gain." · **04 Orbea Cycle Dry**: "A simpler, cheaper rear rack developed with Orbea: material testing, sketching, specification and a manufacturing process." |
| Layout | Cards stacked vertically, full grid width, 96–128 px apart |
| Components | `WorkList`, `ProjectCard` |
| Motion | W1–W3 |
| Assets | One card image per project (3:2). Mercedes: vent photo |
| A11y | `<section aria-labelledby>`; each card an `<article>` with one link; disciplines as text, not icons |

*All four summaries need checking against the reports before launch, e.g. whether Ardura's report supports "looks after itself" (`09` claim limits).*

### A4. Approach
| | |
|---|---|
| Objective | Show method, and tie each step to evidence |
| Takeaway | "He works through a real engineering process, and he leads the later stages." |
| Content | Label `APPROACH`, H2 **How I take a product from idea to specification**, then 4 steps, each with title, 1–2 sentences and an evidence link: **01 Understand**: research, users, regulations → "Regulatory analysis, SEAT mirror" · **02 Explore**: sketching and concept selection → "Ideation sketches, Orbea rack" · **03 Develop**: CAD, mechanisms, circuits, materials → "Development and CAD, Ardura" · **04 Specify and present**: specifications, manufacturing, LCA, final renders → "Life-cycle assessment, Mercedes vent" |
| Layout | Desktop: 4 columns with a top hairline and number each (spec-sheet columns). Tablet: 2×2. Mobile: stacked list |
| Components | `Approach`, `ApproachStep`, text links to case-study anchors (e.g. `/work/seat-ateca-mirror#research`) |
| Motion | Heading T1; steps fade with stagger. Optional: connecting line (`07` §5) |
| A11y | Ordered list `<ol>` |

### A5. About (short)
| | |
|---|---|
| Objective | The person, briefly, and a door to `/about` |
| Content (draft) | "I'm studying Industrial Design and Product Development Engineering at Mondragon Unibertsitatea in the Basque Country. Most of my projects are team projects with companies, and I tend to end up owning the development: CAD, materials, regulations and the final renders. I'm especially interested in how AI, robotics and connected products will change what we design and how we make it." Then link `More about me →` |
| Layout | Desktop: label cols 1–3, text cols 4–10. Mobile: stacked |
| Components | `AboutTeaser` |
| Assets | Optional portrait (D-31). Without one, the section is text only |

### A6. Footer / contact (`id="contact"`)
| | |
|---|---|
| Objective | Make contacting effortless |
| Content | H2 **Let's talk** (proposed) · `arnaomikel10@gmail.com` (large, `mailto:`) + `Copy` button · `LinkedIn ↗` · `Basque Country, Spain` · bottom row: `© 2026 Mikel Arnao` · `Designing what comes next.` |
| Layout | Full-width block, top rule `rule-strong`, generous padding; email in `text-h2` size |
| Components | `Footer`, `CopyEmailButton`, primary CTA `Email me` |
| A11y | `<footer>`; external link announces it opens LinkedIn; copy status via `aria-live` |

### A7. Homepage responsive summary
| Section | Desktop ≥ 1024 | Tablet 640–1023 | Mobile < 640 |
|---|---|---|---|
| Hero | Text 6 cols / render 6 cols, sticky curtain | Text, then render full width | Label, H1, lead, render, CTA |
| Process grid | Grid ≈ 50vw, zoom 2.05 | Grid ≈ 70vw | Grid ≈ 88vw, zoom 1.8, 200 svh |
| Selected work | Image 7 / text 5 | Image full, text in 2 cols | Stacked |
| Approach | 4 columns | 2 × 2 | List |
| About | Offset text column | Full width | Full width |
| Footer | Email large, links in a row | Same | Email wraps; links stacked |

---

## Part B — Case-study template (`/work/[slug]`)

### B1. Page anatomy

```
┌───────────────────────────────────────────────────────────────┐
│ Header                                                        │
├───────────────────────────────────────────────────────────────┤
│ 01 / 04   ARDURA                                              │  ← intro
│ Smart self-sufficient plant pot                               │
│ One-sentence summary.                                         │
│ ┌──────── metadata table (mono) ─────────┐                    │
│ │ Year 2026 · Course PBL5 · 3rd year     │                    │
│ │ Team  D. Iturbe, E. Fernandez, …       │                    │
│ │ With  — / Orbea / Maier for SEAT       │                    │
│ │ My role  · Led development phase + CAD │                    │
│ │          · Led final renders           │                    │
│ │ Tools  SolidWorks, KeyShot …           │                    │
│ └────────────────────────────────────────┘                    │
├───────────────────────────────────────────────────────────────┤
│ HERO RENDER — full-bleed (the "B" moment)                     │
├──────────────┬────────────────────────────────────────────────┤
│ Section index│ 01 Context                                     │
│ (sticky)     │ 02 Research …                                  │
│  01 Context  │   text column (max ~68ch) + media blocks       │
│  02 Research │   that may break out to the full grid width    │
│  …           │                                                │
├──────────────┴────────────────────────────────────────────────┤
│ ← 04 Orbea                               02 SEAT mirror →     │
├───────────────────────────────────────────────────────────────┤
│ Footer / contact                                              │
└───────────────────────────────────────────────────────────────┘
```

**Above the fold (desktop 1440×900 and mobile 375×812):** project number, title, summary and the **"My role"** lines must be visible without scrolling (recruiter journey, IA §5). On mobile, the rest of the metadata table can follow below the fold.

### B2. Sections

Numbering follows the design process, so the order itself tells the "concept to specification" story. A project uses only the sections it has evidence for. Numbers are renumbered per project with no gaps.

| # | Section | Required? | Content |
|---|---|---|---|
| — | Intro + metadata + role | **Always** | See B1 |
| — | Hero render (full-bleed) | **Always** (Mercedes: see B4) | One best image |
| 01 | Context & brief | **Always** | Who set the brief, what was asked, constraints |
| 02 | Research | **Always** | Product, market, user, regulations analysis: only the 2–4 findings that shaped decisions |
| 03 | Opportunity / requirements | **Always** | The brief or spec values that came out of research |
| 04 | Concepts | If ideation exists | Sketches, concept options, how one was selected (voting, weighted matrix) |
| 05 | Development | **Always** | CAD, mechanisms, circuits, form iterations: Mikel's lead area in 3 of 4 projects |
| 06 | Specification | If documented | Materials, manufacturing process, spec tables, LCA comparison |
| 07 | Result | **Always** | Final renders, poster, CAD→render transition |
| 08 | Reflection | **Always** | What worked, what Mikel would change, limits (no validation claims beyond the report) |

**Section rules:**
- Text blocks are 2–4 sentences. A section is mostly media with captions.
- Every image has a **mono caption**: `FIG 05.2 — Circuit redesign · Mikel` (figure number · what · who made it when relevant).
- Team work vs Mikel's work is marked in captions and in the role block. Body text uses "we" for team decisions and "I" for his led work.
- Numbers appear only as reported in the source document, with units.

### B3. Media modules (reused across projects)

| Module | Used for | Notes |
|---|---|---|
| Full-bleed image | Hero render, one result moment | Edge to edge; caption below inside the grid |
| Text + media | Default section content | Text column left, image right, or stacked |
| Image grid (2–4) | Sketches, moodboards, iterations | Equal heights, captions under each |
| **CAD → render compare** | Development → Result (from C) | Same viewpoint CAD screenshot and render. Draggable divider on desktop; tap toggle on touch; side-by-side with reduced motion |
| **Annotated image** | Hero, exploded views, the "spec sheet" signature | Leader lines + mono labels. Labels are real HTML text (accessible), positioned over the image; becomes a numbered list below the image on mobile |
| Spec table | Materials, specs, regulations, LCA results | Mono, hairline rules, scrolls horizontally inside its own box on mobile |
| Chart | LCA hotspots, comparisons | Redrawn in site style (SVG), source data from report, with a table fallback |
| Step sequence | Mechanism (Orbea hanger), manufacturing process | Numbered frames in a row; stacked on mobile |
| Quote / insight | Key research insights | Short, large type, no decoration |

### B4. Per-project plan

| Project | Signature modules | Hero | Watch-outs |
|---|---|---|---|
| **01 Ardura** | Annotated exploded view or CAD; CAD→render compare; persona and customer-journey summary | Final render (Mikel) | Don't claim energy-autonomy performance unless the report states results and method. iF: "submitted" only, if named exactly |
| **02 SEAT Ateca mirror** | Regulations spec table (Mikel); **circuit redesign diagram** (Mikel); materials spec table (Mikel); full-bleed render | Final render (Mikel) | "Carried out with Maier for the SEAT Ateca". 3D modelling credited to teammates |
| **03 Mercedes vent LCA** | **Hotspot chart by life-cycle stage**; MET matrix; weighted-selection matrix; three improvement actions compared | **Photo of the original vent** (D-17). Mikel's existing LCA charts are the source for the redrawn charts | Analysis-only brief: section 05 becomes "Improvement concepts" and 07 "Evaluation". LCA numbers exactly as reported |
| **04 Orbea "Cycle Dry"** | Material-testing table (density, Vickers); 4-step sketches (Mikel + colleague); lift-and-rotate **step sequence**; manufacturing process steps (Mikel); poster | Final render (Mikel) | "Academic project in collaboration with Orbea". Preliminary designs credited to teammates |

### B5. Content data model

Planning only. The storage format (MDX vs typed files) is decided in Phase 5. Fields:

**Project (front matter)**

| Field | Type | Example / rule |
|---|---|---|
| `slug` | string | `seat-ateca-mirror` |
| `order` | number | 1–4, flagship order |
| `title` | string | "SEAT Ateca side mirror" |
| `productName` | string? | "Cycle Dry" |
| `summary` | string ≤ 160 chars | Also used as meta description |
| `year` | number | 2025 |
| `date` | ISO date | 2025-06-16 (from report) |
| `course` | string | "PBL4 · 2nd year" |
| `institution` | string | "Mondragon Unibertsitatea" |
| `collaboration` | string? | Exact approved wording only (D-13) |
| `team` | string[] | Teammates' full names |
| `myRole` | string[] | 2–5 short "Led …" lines |
| `tools` | string[] | Only tools actually used: see `09-content-and-assets.md` §3 |
| `disciplines` | enum[] | `product-design`, `cad`, `engineering`, `sustainability`, `research`, `ux` |
| `recognition` | string? | Only if evidenced |
| `hero` | Media | Required |
| `cardImage` | Media | For the homepage list |
| `sections` | Section[] | Ordered |
| `status` | `draft` / `published` | Drafts never build to production |

**Section**: `id` (anchor) · `number` · `title` · `body` (short rich text) · `media[]`

**Media**: `type` (image / compare / annotated / table / chart / sequence / video) · `src` · `alt` (required, descriptive) · `caption` · `credit` (`mikel` / `team` / name) · `width` (text / wide / full-bleed) · type-specific data (annotations with x/y %, compare before/after, table rows, chart series).

**Validation rules:**
- The build fails if a published project is missing `hero`, `alt`, `myRole` or `summary`.
- `recognition` and `collaboration` are only filled in from the decision log.

### B6. Responsive behaviour (summary; full grids in `10-design-system.md`)

| | Desktop ≥1024 | Tablet 640–1023 | Mobile <640 |
|---|---|---|---|
| Section index | Sticky left column | `<details>` "Contents" at the top | Same as tablet |
| Metadata | 2-column table beside the title | Below the title | Below the title; role lines first |
| Text + media | Side by side | Stacked | Stacked |
| Annotated image | Labels on the image | Labels on the image if ≥ 4 fit, otherwise numbered list | Numbered list below the image |
| CAD→render | Drag divider | Drag divider (touch) | Tap toggle |
| Spec table | Full | Full | Horizontal scroll inside its own box |

---

## Part C — `/about` and 404

### C1. `/about`
Replaces a CV (D-18), so it has to carry the facts an admissions panel looks for.

| Block | Content | Notes |
|---|---|---|
| Intro | H1 **About**; lead paragraph (expanded version of A5) | Portrait beside it on desktop. **Placeholder portrait** until Mikel adds his photo (D-31, D-32) |
| Education | `Mondragon Unibertsitatea · Faculty of Engineering` · `BSc Industrial Design and Product Development Engineering` · `2023 – 2027 (expected)` · `4th year` | Confirmed (D-28) |
| How I work | 3–4 short paragraphs: team projects with companies; what Mikel usually leads (development, CAD, regulations, materials, LCA, renders); how he documents decisions | Each claim backed by a linked case study |
| Tools | Table by tool: **SolidWorks** (Ardura, SEAT, Orbea) · **Siemens NX** (SEAT) · **KeyShot** (Ardura, SEAT, Orbea) · **Blender** (Ardura, SEAT, Orbea) · **IHOBE Climate and circularity calculator** (Mercedes LCA) · **Adobe Creative Suite** (brand and dossier work) · **React, Next.js, TypeScript** (this website) | Shows *where* each tool was used instead of skill bars. No self-rated levels |
| Interests | AI, robotics and industrial automation, connected products (IoT), sustainability and circular design: one sentence each on *why* | Labelled as interests, not skills (`01` §6) |
| Languages | Basque: native · Spanish: native · English: C1 (Cambridge CAE) | Confirmed (D-29) |
| Recognition | Only evidenced items. Currently none publishable (Ardura: iF participation, optional wording; Ibili embargoed; UPV pending) | |
| Contact | Same footer | |

Layout: single reading column (cols 3–10 desktop) with mono labels in cols 1–2, like report headings. Motion: T1 headings and `Reveal` on the optional portrait only.

### C2. 404
- H1 **Page not found**, one sentence, then the 4 project cards in compact form (title + number only) and a link home.
- Same header and footer. No illustration, no animation.
- Status 404 (Next `not-found.tsx`), `noindex`.


## Checkpoint A changes (2026-10-16, D-37)
- **A5 About (short) removed** from the homepage; the About page is reached from the navigation only.
- **A2b / A3 wording:** label "Featured projects", title "Featured projects, from first sketch to final specification.", CTA "View featured projects". The project list's hidden heading is "Featured projects".
- **A6 footer made compact:** label "Contact", email at h3 size with Copy and LinkedIn beside it, then the location / sign-off / copyright row. About 200px tall on desktop.

## Part D — Work page (`/work`) · layout A "Spec index"

Status: **approved and built** (2026-10-16; D-38, D-39). Short entries are placeholders until Checkpoint B.

### D0. Purpose
The complete, filterable record of Mikel's work. The homepage stays the curated highlight (four flagships); `/work` is the archive. The page is read like a parts list: every project is a numbered row with the same columns.

### D1. Page anatomy (desktop ≥ 1024 px)

```
┌───────────────────────────────────────────────────────────────────────────┐
│ Header                                     Work·  About   [Copy email]    │
├───────────────────────────────────────────────────────────────────────────┤
│ WORK                                                                      │
│ All projects                                       (h1)                   │
│ Product design, engineering and research, from first year to now.         │
├───────────────────────────────────────────────────────────────────────────┤
│ FIELD    [Product design] [Engineering & CAD] [Sustainability]            │
│          [Research] [Brand & graphic]                                     │
│ CONTEXT  (All) (With a company) (Academic)                                │
│ YEAR     (All) (2026) (2025) (2024)            Showing 7 of 7 · Clear     │
│                                                   VIEW  [List] [Grid]     │
├─────┬──────────────────────────┬───────────────────┬──────────────┬──────┤
│ NO. │ PROJECT                  │ FIELD             │ CONTEXT      │ YEAR │
├─────┼──────────────────────────┼───────────────────┼──────────────┼──────┤
│ 01 ■│ Ardura                   │ Product · CAD ·   │ Academic     │ 2026 │ →
│     │ Smart self-sufficient…   │ Sustainability    │              │      │
├─────┼──────────────────────────┼───────────────────┼──────────────┼──────┤
│ 02 ■│ SEAT Ateca side mirror   │ Product · Eng.    │ Maier        │ 2025 │ →
│ …   │                          │                   │              │      │
│ 05  │ BIRA                     │ Brand · Sustain.  │ Ereindajan   │ 2026 │ →
└─────┴──────────────────────────┴───────────────────┴──────────────┴──────┘
   ■ = featured (accent square + visually hidden "Featured")
   Hovering a row: a 3:2 preview image follows the cursor (D5)
```

### D2. Rows (list view)

| Column | Content | Notes |
|---|---|---|
| No. | Two-digit number, stable for each project (01–04 = flagships in homepage order, then short entries by year, newest first) | Numbers don't change when filtering: they're part numbers, not positions |
| Featured | 6 × 6 px accent square after the number, `sr-only` "Featured" | Flagships only |
| Project | Title (`text-h3`) + product name / one-liner (`text-small`, ink-2) | |
| Field | Up to 3 field labels, mono `text-label`, separated by " · " | Same labels as the filters |
| Context | Company name ("Maier", "Orbea", "Ereindajan"), or "Academic" / "Competition" | From the `context` field |
| Year | Four digits, tabular figures | |
| Arrow | → that nudges 4 px on hover | Decorative |

- Each row is **one link** to `/work/<slug>` (case study or short entry). Hairline between rows; `rule-strong` under the header row.
- **Order:** flagships first (01–04), then short entries newest first. No user sorting in v1 (a handful of projects doesn't need it).
- **Hover / focus:** row background `raised`, title turns accent, arrow nudges, preview appears (D5).
- **Column headers** are visible labels (mono, ink-3); each cell also has an `sr-only` prefix ("Field:", "Year:") so a screen reader reading the link gets meaningful text.

### D3. Filters

| Group | Options | Selection | URL |
|---|---|---|---|
| Field | Product design · Engineering & CAD · Sustainability · Research · Brand & graphic (· UX/UI once a UX project exists) | **Multi-select**, OR within the group | `?field=sustainability,research` |
| Context | All · With a company · Academic (· Competition when one exists) | Single-select | `?context=company` |
| Year | All · each year that has a project (2026, 2025, 2024…) | Single-select | `?year=2025` |

- **Logic:** AND between groups, OR inside Field. A filter option that would give 0 results is shown but disabled-looking (still focusable, `aria-disabled`, tooltip-free text "0").
- **Counts** next to each Field option: "Sustainability 3".
- **Result line:** "Showing 3 of 7 projects" (`aria-live="polite"`), plus **Clear filters** when any filter is active.
- **Empty state** (can only happen through a hand-edited URL): "No projects match these filters." + Clear filters.
- **State lives in the URL** (`history.replaceState`, no page reload, no scroll jump), so a filtered view can be shared or bookmarked. Canonical stays `/work`.
- **Controls:** buttons with `aria-pressed` inside a `<fieldset>` with a `<legend>` per group. 44 px minimum height; the selected state is ink fill + paper text (same style as the earlier review toggles).

### D4. View toggle: List / Grid

- `[List] [Grid]` segmented control to the right of the filters; `aria-pressed`; stored in the URL (`?view=grid`) and remembered for the browser session.
- **Default: List.**
- **Grid view:** 3 columns desktop, 2 tablet, 1 phone. Card = 3:2 image, number + featured mark, title, field labels, year. Whole card is one link. Same filters apply.

### D5. Hover preview (list view, desktop)

- Pointer devices only (`hover: hover` and `pointer: fine`) and motion allowed.
- A 3:2 frame, ~22 vw wide (max 380 px), positioned to the right of the cursor and clamped inside the viewport; follows the pointer with smoothing (`gsap.quickTo`, 0.35 s).
- On entering a row: clip reveal bottom→top 0.35 s; switching rows swaps the image with a 0.2 s crossfade; leaving the list hides it (0.2 s).
- `aria-hidden`; purely decorative (the same image is on the project page and in grid view). Images preload on first hover of the list (small `sizes`, ~400 px).
- **Reduced motion / touch:** no floating preview. Instead each row shows a **64 px square thumbnail** in the No. column area (also used on phones).

### D6. Responsive

| | Desktop ≥ 1024 | Tablet 640–1023 | Phone < 640 |
|---|---|---|---|
| Filters | Inline rows as in D1 | Inline, wrapping | Collapsed into a `<details>` "Filters (n active)"; result line and view toggle stay visible |
| List rows | 5 columns + arrow | No. · Project · Year (Field and Context move under the title as one mono line) | Thumbnail · title · one mono line "Field · Year" |
| Grid | 3 columns | 2 columns | 1 column |
| Preview | Floating (D5) | Thumbnail | Thumbnail |

### D7. Motion (07)

| Moment | Behaviour |
|---|---|
| Page load | H1 line-mask reveal (as section headings); rows fade + 8 px up, stagger 40 ms, max 10 rows animated; no reveal on filter changes |
| Filter change | **GSAP Flip**: remaining rows/cards slide to their new places (0.45 s, power2.inOut); leaving items fade out 0.2 s; entering items fade + 8 px in 0.3 s |
| View toggle | Crossfade: list fades out 0.15 s → grid in, cards stagger 30 ms, 0.3 s |
| Reduced motion | Instant changes; no Flip, no stagger, no floating preview |

GSAP Flip is part of GSAP (free under the standard licence). It's **loaded only on `/work`** (dynamic import), so the homepage JS budget is unchanged.

### D8. Header and copy
- Label `WORK` · H1 **All projects** · intro line (draft): *"Product design, engineering and research projects, from first-year PBL to company collaborations."*
- `<title>`: "Work — All projects · Mikel Arnao"; description: "Every project by Mikel Arnao: product design, engineering, sustainability and research, filterable by field, context and year."

### D9. Connections with the rest of the site
- Navigation **Work → `/work`** (no longer `/#work`); "Work" is marked current on `/work` and `/work/*`.
- The `/work → /#work` redirect is removed.
- Homepage: the featured list ends with **"See all projects →"** (`/work`). The hero "See selected work" jump and "View featured projects" stay as they are (they target the homepage list).
- 404 page lists all projects (not only flagships).
- Sitemap adds `/work` and every short entry.

---

## Part E — Short entry pages (`/work/[slug]`, kind "short")

Lighter than a case study, same route and visual system.

```
┌──────────────────────────────────────────────────────────────┐
│ 05 / 07 · ENERGY BAR FROM SURPLUS HARVEST                    │
│ BIRA                                       MY ROLE  · …      │
│ One-line summary.                          YEAR     2026 · … │
│                                            WITH     Ereindajan│
│                                            TEAM     …        │
│                                            TOOLS    …        │
├──────────────────────────────────────────────────────────────┤
│ Hero image (full-bleed, same reveal as case studies)          │
├──────────────────────────────────────────────────────────────┤
│ ABOUT THE PROJECT   2–3 short paragraphs                      │
│ [optional second image, or a 2-image grid]                   │
├──────────────────────────────────────────────────────────────┤
│ ← previous project                          next project →    │
└──────────────────────────────────────────────────────────────┘
```

- Reuses `ProjectIntro`, the hero figure, `MediaBlock` and `PrevNextProject`. No section index (too short to need one).
- Previous / next cycle through **all** projects in Work-page order.
- Label shows the full count ("05 / 07"), replacing the fixed "/ 04" on case studies too.

### Initial short entries (facts from `09` §4; copy to be drafted from the reports and checked at Checkpoint B)

| No. | Project | Year | Context | Field | Open facts |
|---|---|---|---|---|---|
| 05 | **BIRA**: energy bar from surplus Basque harvest | 2026 | With Ereindajan (real); brand created by the team | Brand & graphic · Product design · Sustainability | Mikel's role in BIRA |
| 06 | **Senda Norte**: low-ABV vermouth, bottle and brand | 2026 | Academic (course to confirm) | Product design · Brand & graphic | Course; Mikel's role |
| 07 | **Urban stroller user research** | 2025 | Academic, Design Methodology | Research | Mikel's role (two-person project) |

Not listed: Caira and PBL02 (archive, D-07), Ibili "Jario" (embargoed, D-15). Future: UPV house, mobility app, race T-shirts, robotics (D-09), each added as a short entry or case study when their files arrive.

---

## Part F — Data model changes (extends B5)

```ts
type ProjectBase = {
  slug; order /* = No. */; title; productName?; summary; year; date;
  course; institution; team; myRole; tools;
  fields: Field[];            // replaces `disciplines` (same values + "brand")
  context: "company" | "academic" | "competition";
  company?: string;           // shown in the Context column when context = "company"
  featured: boolean;          // flagships = true
  hero: ImageAsset; cardImage: ImageAsset;
  status: "draft" | "published";
};
type CaseStudy  = ProjectBase & { kind: "case-study"; processTiles; sections };
type ShortEntry = ProjectBase & { kind: "short"; body: string[]; media?: Media[] };
type Project = CaseStudy | ShortEntry;
```

- `Field`: `product-design` · `engineering` (Engineering & CAD; merges today's `cad` and `engineering`) · `sustainability` · `research` · `brand` · `ux`.
- The homepage list and process grid use `featured` case studies only; `/work` uses everything.
- TypeScript still fails the build on missing required fields.
