# Page Specifications

Status: **Parts A, B, C proposed** (2026-10-15). Copy is draft editorial text; facts trace to `09` and `13`.

---

## Part A — Homepage (`/`)

Copy below is **proposed** editorial text (label from `09`). Facts in it come from `09-content-and-assets.md` and the decision log.

### A0. Narrative flow
**Who** (hero) → **proof** (4 projects) → **how** (approach, each step pointing back to a project) → **person** (about) → **contact**.
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

### A3. Selected work (`id="work"`)
| | |
|---|---|
| Objective | Prove the claim with 4 projects in flagship order |
| Content | Section label `SELECTED WORK · 04`, then 4 project cards (`10` §5): number, title, one-line summary, year, "My role" (condensed), disciplines, "View case study →" |
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
| Hero | Text 6 cols / render 6 cols | Text, then render full width | Label, H1, lead, render, CTA |
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
| Intro | H1 **About**; lead paragraph (expanded version of A5) | Optional portrait (D-31) beside it on desktop |
| Education | `Mondragon Unibertsitatea · Faculty of Engineering` · `BSc Industrial Design and Product Development Engineering` · years (start–expected end) · current year | **D-28:** confirm start year, current year and expected graduation |
| How I work | 3–4 short paragraphs: team projects with companies; what Mikel usually leads (development, CAD, regulations, materials, LCA, renders); how he documents decisions | Each claim backed by a linked case study |
| Tools | Table by tool: **SolidWorks** (Ardura, SEAT, Orbea) · **Siemens NX** (SEAT) · **KeyShot** (Ardura, SEAT, Orbea) · **Blender** (Ardura, SEAT, Orbea) · **IHOBE Climate and circularity calculator** (Mercedes LCA) · **Adobe Creative Suite** (brand and dossier work) · **React, Next.js, TypeScript** (this website) | Shows *where* each tool was used instead of skill bars. No self-rated levels |
| Interests | AI, robotics and industrial automation, connected products (IoT), sustainability and circular design: one sentence each on *why* | Labelled as interests, not skills (`01` §6) |
| Languages | e.g. Spanish, Basque, English (levels) | **D-29:** confirm languages and levels |
| Recognition | Only evidenced items. Currently none publishable (Ardura: iF participation, optional wording; Ibili embargoed; UPV pending) | |
| Contact | Same footer | |

Layout: single reading column (cols 3–10 desktop) with mono labels in cols 1–2, like report headings. Motion: T1 headings and `Reveal` on the optional portrait only.

### C2. 404
- H1 **Page not found**, one sentence, then the 4 project cards in compact form (title + number only) and a link home.
- Same header and footer. No illustration, no animation.
- Status 404 (Next `not-found.tsx`), `noindex`.
