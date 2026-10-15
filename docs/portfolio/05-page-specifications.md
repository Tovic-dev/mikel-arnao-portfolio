# Page Specifications

Status: **Part B (case-study template) proposed** (2026-10-15). Part A (homepage) and Part C (/about, 404) follow after the motion spec, because their behaviour depends on it.

---

## Part A — Homepage
*Pending. Section order is fixed in `04-information-architecture.md` §6.*

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
| **03 Mercedes vent LCA** | **Hotspot chart by life-cycle stage**; MET matrix; weighted-selection matrix; three improvement actions compared | **Needs a decision (D-17):** photo or render of the existing vent, or a large chart as the hero. No final design exists, so no "Result" render | Analysis-only brief: section 05 becomes "Improvement concepts" and 07 "Evaluation". LCA numbers exactly as reported |
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
| `tools` | string[] | Only tools actually used (to confirm per project) |
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

## Part C — `/about`, 404
*Pending.*
