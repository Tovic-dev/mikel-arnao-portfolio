# Creative Direction

Status: **3 directions proposed, A recommended, awaiting approval** (2026-10-15)
Inputs: `01-personal-brand.md` (headline "From concept to specification."), `03-reference-research.md`, `09-content-and-assets.md`

## Constraints the direction must meet

1. A recruiter understands name, role and one project **in under 10 seconds**, with no intro animation blocking content.
2. It has to carry **renders** (Ardura, SEAT, Orbea) and **charts and diagrams** (Mercedes LCA, specs, circuits) with equal dignity.
3. It has to translate to a **printable PDF portfolio** later with little rework.
4. A first version has to be buildable by **~week 5** alongside writing four case studies.
5. It has to express "concept to specification" in form, not just in words.

---

## Direction A — "Spec Sheet" (technical editorial) · **Recommended**

**Idea:** the site reads like a well-made design report or a product specification sheet. A visible grid, numbered sections, and small mono labels on every image, like part callouts on a technical drawing. Renders sit on calm neutral grounds. The engineering labelling is the visual signature.

| Aspect | Proposal (values finalised in `10-design-system.md`) |
|---|---|
| Ground | Light warm grey / off-white paper; near-black ink. Dark mode not in MVP. |
| Accent | One signal colour, used only for annotations, active states and the focus ring (candidate: international orange). |
| Type | One neo-grotesque for display + body, one monospace for labels/metadata. Candidates: Geist + Geist Mono, or Inter Tight + JetBrains Mono (all OFL). |
| Grid | 12 columns with hairline rules, visible in places (section dividers, metadata tables), never decorative noise. |
| Imagery | Renders centred on neutral backgrounds; CAD and sketches on white; charts redrawn in the site's own style. |
| Signature element | **Annotation callouts**: thin leader lines from a render to short labels ("Circuit redesigned · I led"). Used in the hero and in each case study. |
| Hero | Name + "Product Designer & Design Engineer" + headline left; one large annotated render (Ardura) right; 4-project index directly below the fold edge. |
| Case studies | Numbered like a report: 01 Context → 02 Research → 03 Brief → 04 Concepts → 05 Development → 06 Specification → 07 Result → 08 Reflection, with a sticky "My role" block. |
| Motion | Line-by-line text reveals, clip-path image reveals, leader lines drawing in, CAD→render crossfade. Short and precise. |
| 3D | None in MVP. A turntable video for one project is optional. |

- **Pros:** it embodies the positioning and handles LCA charts naturally. It prints well (the PDF is almost free), it's cheap to build, and it performs well.
- **Cons:** it can go cold or generic if the type, spacing and labels aren't executed carefully. Its quality depends on detail.
- **References:** teenage engineering (labels, spec nav), Industrial Facility (restraint, centred product).

## Direction B — "Material Studio" (cinematic, render-led)

**Idea:** a dark, gallery-like site where large renders and light carry everything. Serif or high-contrast display type, slow parallax, and an interactive 3D model or turntable in the hero.

- **Pros:** strong first impression, and it shows off rendering skill.
- **Cons:**
  - It positions Mikel as a **visualiser**, which goes against "concept to specification".
  - Dark grounds make the LCA charts and spec tables hard to read.
  - The PDF would need a separate design.
  - 3D asset prep (GLB export, decimation, textures) costs about a week the deadline doesn't have.
  - Heavier on mobile.
- **Use instead:** borrow the **one full-bleed render per case study** moment from it.

## Direction C — "Drawing Board" (process-led)

**Idea:** sketches, CAD wireframes and exploded views lead. Paper-white ground, blue technical line work, handwritten-feeling annotations. The process is the hero.

- **Pros:** process is front and centre, which admissions panels value.
- **Cons:**
  - The blueprint look is a well-worn cliché and easily looks like a theme.
  - It depends on how good the sketches are, which hasn't been reviewed yet.
  - The final renders (Mikel's strongest skill) become secondary.
- **Use instead:** borrow the **CAD-to-render transitions** and an **exploded-view** section inside case studies.

---

## Recommendation

**A "Spec Sheet", with one full-bleed render moment per case study (from B) and CAD→render transitions (from C).**

It is the only direction where the visual system *proves* the headline. It handles the full range of content (renders, LCA charts, spec tables) and can become the PDF. It also fits the five-week build.

## Anti-references (decided)
- No full-screen intro or loader that hides the work (LAYER, Map Project Office).
- No burger menu on desktop.
- No cookie or other overlay covering the hero. The site should need no consent banner: no tracking cookies (analytics choice in Phase 5).
- No custom cursor, no scroll hijacking, no autoplaying sound.

## Pending
- D-04: approve A (or choose B/C).
- Accent colour and typeface pair: choose in Phase 6 from 2–3 rendered samples.
