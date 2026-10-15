# Design System — "Spec Sheet"

Status: **proposed** (2026-10-15). Typeface pair and accent colour to be picked from the rendered samples (D-26, D-27). Everything else is a proposal with real values.
Depends on: `02-creative-direction.md` (A approved), `07-motion-specification.md`, `08-technical-architecture.md`
Implementation: all **global tokens** live in `app/globals.css` under Tailwind v4 `@theme` (`08` §4). Values marked *local* belong to one composition and must not become tokens.

## 1. Colour

Light theme only (dark mode was rejected in `04` §4). Contrast ratios were computed with the WCAG 2.x formula on 2026-10-15.

### Neutrals

| Token | Value | Use | Contrast on `paper` |
|---|---|---|---|
| `--color-paper` | `#EEECE7` | Page background (warm grey, like uncoated paper) | — |
| `--color-raised` | `#F7F6F3` | Media frames, table rows, code-like blocks | — |
| `--color-ink` | `#161614` | Headings, body text | 15.4 : 1 |
| `--color-ink-2` | `#55534E` | Secondary text, metadata values | 6.5 : 1 |
| `--color-ink-3` | `#67655F` | Captions, mono labels (smallest text allowed to be lighter) | 4.9 : 1 |
| `--color-rule` | ink at 16% (`#16161429`) | Hairlines, grid lines, table rules | decorative |
| `--color-rule-strong` | ink at 40% | Section dividers, active table borders | 3 : 1+ |

Rule: **no text lighter than `ink-3`**. Pure white is not used; the lightest surface is `raised`.

### Accent: one colour, two roles

Each candidate has a **line** value (strokes, markers, focus ring; needs ≥ 3 : 1) and a **text** value (accent text; needs ≥ 4.5 : 1).

| Candidate | Line | Text | Line on paper | Text on paper | Character |
|---|---|---|---|---|---|
| **A. Signal orange (recommended)** | `#E04800` | `#B83A00` | 3.5 : 1 | 4.9 : 1 | Redline / markup colour on technical drawings. Warm and distinctive against neutral renders |
| B. Technical blue | `#2440FF` | `#2440FF` | 5.5 : 1 | 5.5 : 1 | Blueprint. One value for both roles, but risks reading as default link blue |
| C. Engineering green | `#006B3E` | `#006B3E` | 5.6 : 1 | 5.6 : 1 | Calm and "sustainable", but competes with Ardura's plant imagery |

The original idea, `#FF4F00`, **fails** contrast on paper (2.8 : 1) even for lines, so it's out.

Accent usage, deliberately scarce: leader lines and annotation labels, active nav and section-index item, focus ring, link hover underline, chart highlight series. **Never** used for backgrounds, large areas or body text.

## 2. Typography

### Families (D-26: choose from samples)

| Pair | Display + body | Mono (labels, metadata, captions) | Notes |
|---|---|---|---|
| **1. Geist + Geist Mono (recommended)** | Geist | Geist Mono | One superfamily, so the mono and sans share proportions. OFL. Neutral and precise |
| 2. Inter Tight + JetBrains Mono | Inter Tight | JetBrains Mono | Very legible; Inter is widespread, so it reads more generic |
| 3. Instrument Sans + IBM Plex Mono | Instrument Sans | IBM Plex Mono | Slightly warmer and more editorial; Plex Mono feels "engineering document" |

Budget: 2 families. Variable fonts if available; otherwise 2 weights per family (400, 500). **No 700 anywhere**: hierarchy comes from size and spacing, not weight.

### Type scale

Fluid sizes from 375 px to 1440 px viewport (`clamp`).

| Token | Size (375 → 1440) | Line height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `--text-display` | 44 → 104 px | 0.95 | −0.035em | 500 | Hero headline only |
| `--text-h1` | 36 → 72 px | 1.0 | −0.03em | 500 | Case-study title, /about title |
| `--text-h2` | 28 → 48 px | 1.05 | −0.02em | 500 | Section headings |
| `--text-h3` | 20 → 24 px | 1.25 | −0.01em | 500 | Sub-sections, card titles |
| `--text-lead` | 19 → 22 px | 1.45 | 0 | 400 | Summaries, supporting statement |
| `--text-body` | 17 px | 1.6 | 0 | 400 | Body |
| `--text-small` | 15 px | 1.5 | 0 | 400 | Table values, secondary |
| `--text-label` | 12 px mono, UPPERCASE | 1.3 | +0.06em | 400 / 500 | Metadata labels, FIG captions, nav on mobile, section numbers |
| `--text-mono-body` | 13 px mono | 1.5 | 0 | 400 | Spec-table values, annotation labels |

- **Text measure:** max 68ch for body; 40ch for lead.
- **Numerals:** tabular figures (`font-variant-numeric: tabular-nums`) in tables, metadata and charts.
- 12 px uppercase mono is the smallest text, used only for labels, never for sentences.

## 3. Grid, spacing, breakpoints

### Breakpoints (Tailwind `@theme` overrides)

| Name | Min width | Columns | Gutter | Outer margin |
|---|---|---|---|---|
| base (mobile) | 0 | 4 | 16 px | 16 px |
| `sm` (tablet) | 640 px | 8 | 20 px | 32 px |
| `lg` (desktop) | 1024 px | 12 | 24 px | 48 px |
| `xl` | 1440 px | 12 | 24 px | 64 px |

- Max content width: **1600 px**, centred. Full-bleed media ignores it.
- **Visible grid:** columns are shown only as hairlines in specific places: the metadata table, the selected-work list and section dividers. There is no background grid overlay.

### Spacing scale (4 px base)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`
- Between sections: `clamp(96px, 12vw, 192px)`
- Heading to content: 32 px (mobile) / 48 px (desktop)
- Figure to caption: 12 px

### Other tokens

| Token | Value |
|---|---|
| Radius | **0** everywhere: images, buttons, tables. Square corners fit the technical-sheet language. The only exception is the focus ring, which follows the element |
| Hairline | 1 px `--color-rule` |
| Focus ring | `outline: 2px solid` accent **line** colour, `outline-offset: 3px` (4 px on images and cards). Never removed without a replacement |
| Shadow | none |
| Blur / gradients | none |

### Z-index layers

| Token | Value | Use |
|---|---|---|
| `--z-base` | 0 | Content |
| `--z-raised` | 10 | Annotation labels over images, compare-slider handle |
| `--z-sticky` | 20 | Case-study section index |
| `--z-skip` | 100 | "Skip to content" link when focused |

No overlays, modals or fixed headers, so no higher layers are needed.

## 4. Motion tokens

These are defined in `07` §2 and repeated here as the token list for `@theme`:
- Durations: `--dur-fast` 150 ms · `--dur-base` 250 ms · `--dur-draw` 500 ms · `--dur-reveal` 700 ms
- Easings: `--ease-out` `cubic-bezier(0.16,1,0.3,1)` · `--ease-standard` `cubic-bezier(0.2,0,0,1)`
- Reveal distance: 16 px · stagger 70 ms (lines) / 90 ms (items)
- **Reduced motion:** every duration above 150 ms is set to 0 and all transforms are removed. Opacity may still fade over 150 ms.
- *Local* (not tokens): hero choreography offsets (`07` §3B), the 0.03 card image scale.

## 5. Component styles

### Links and buttons

| Component | Rest | Hover / focus-visible | Notes |
|---|---|---|---|
| **Text link** (body) | ink, 1 px underline at 3 px offset in `rule-strong` | Underline turns accent, grows left→right (G1) | Always underlined in body text |
| **Nav link** | `text-label` mono on mobile; 15 px sans on desktop; ink-2 | ink | Current page: accent text + 1 px accent underline |
| **Primary CTA** | ink background, paper text, `text-label` mono, 48 px tall, 0 radius, trailing arrow | Arrow nudges 4 px; background turns accent **text** colour (orange `#B83A00` gives 4.9 : 1 against the paper text) | Used at most once per view (e.g. "Email me") |
| **Secondary CTA** | Transparent, 1 px ink border, ink text | Border and text turn accent text colour; arrow nudges | "View case study", "Copy email" |
| **Icon button** | 44 × 44 px hit area minimum | As secondary | Copy, and the CAD/Render toggle on mobile |

All interactive targets are at least **44 × 44 px** on touch.

### Project card (homepage "Selected work")

```
desktop (12 cols)
┌ 01 ─────────────────────────────────────────────────────────────┐  ← hairline top rule
│ [ image 3:2, cols 1–7 ]          │ ARDURA                (h3)   │
│                                  │ Smart self-sufficient plant  │
│                                  │ pot that …          (lead)   │
│                                  │ ───────────────────────────  │
│                                  │ YEAR      2026      (label)  │
│                                  │ ROLE      Development, CAD,  │
│                                  │           renders            │
│                                  │ DISCIPLINE Product · CAD ·   │
│                                  │           Sustainability     │
│                                  │ View case study →            │
└─────────────────────────────────────────────────────────────────┘
```
- The number (`01`) sits in the top rule like a drawing-sheet index.
- Image and text sides are **always in the same order** (no zig-zag), so the list reads like a schedule.
- **Tablet:** image full width, text below in 2 columns (title/summary | metadata).
- **Mobile:** stacked: number + title, image, summary, metadata, CTA.
- The whole card is one link (`07` W3).

### Media frame and captions
- Background `raised`; image fills it at its own aspect ratio. Allowed ratios: **3:2** (default renders), **4:5** (portrait details), **16:9** (full-bleed, wide CAD), **1:1** (sketch grids).
- Caption below: `FIG 05.2 — Circuit redesign · Mikel`, as `text-label` in ink-3, with the figure number in ink.

### Metadata layout (case-study intro, project cards)
- Definition list (`<dl>`), two columns: label (`text-label`, ink-3, ~10ch wide) and value (`text-small`, ink).
- Hairline between rows.
- "My role" values are a bulleted list with an accent square marker (4 × 4 px).

### Annotation
- Leader line: 1 px accent **line** colour, ending in a 5 px dot on the image.
- Label: `text-mono-body` on `raised`, 4 × 8 px padding, ink text, 1 px accent left border. Labels never cover the product's key area; they are positioned per image (*local* values).

### Spec table
- Header row: `text-label`, ink-3, bottom rule `rule-strong`.
- Body rows: `text-mono-body` (values) / `text-small` (descriptions), hairline rules, no zebra striping, tabular numerals.
- Units in their own column, or after the value in ink-3.

### Charts (inline SVG)
- Bars and lines in ink. **One highlighted series in the accent line colour** (e.g. the hotspot stage).
- Axis labels in `text-label`; no gridlines except a baseline.
- Every chart has a visually hidden data table, or a visible "Show data" `<details>`.

### Section index (case studies)
- `text-label` list: `01 CONTEXT`, `02 RESEARCH` …
- Inactive items ink-3; active item ink, with a 2 px accent bar to its left that slides (C1).

## 6. Global tokens vs local values

| Global (in `@theme`) | Local (per composition) |
|---|---|
| Colours, type scale, spacing scale, breakpoints, grid, radius, focus, z-index, durations, easings | Hero render size and crop, annotation positions, hero timeline offsets, chart dimensions, specific image aspect choices, the 0.03 card scale |

## 7. Pending
- **D-26:** typeface pair (recommendation: Geist + Geist Mono).
- **D-27:** accent colour (recommendation: signal orange, line `#E04800` / text `#B83A00`).
- After assets arrive: check the palette against the actual renders (warm vs cool lighting).
