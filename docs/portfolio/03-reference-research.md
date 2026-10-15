# Reference Research

Status: **round 1, partial** (2026-10-15). This round covers art direction only. Implementation references (GSAP, Lenis, Codrops demos, component libraries) are researched in Phase 4–5.

## How the research was done, and its limits

- Browsed in the Claude desktop app's built-in browser.
- **What worked:** first-viewport screenshots of a site and page text.
- **What didn't:** after scrolling, the browser pane stopped rendering screenshots reliably (blank or partial frames). Below-the-fold layouts therefore are **not verified** this round.
- Each reference is labelled **Inspected** (seen this session) or **Known** (from prior knowledge, not re-checked). Known items need a manual check by Mikel or a later round before anything is copied from them.

## Aggregators

| Source | Result |
|---|---|
| Godly (godly.website) | **Redirects to recent.design**, a general design feed. Not useful for targeted search. |
| siteInspire | Loads; the category filter in the URL was dropped. Usable manually with its "Portfolio" / "Product" filters. |
| Awwwards, Lapa Ninja | Not visited this round. |

**Recommendation:** use aggregators only to find studios. The best references for this portfolio are **industrial-design studios and product manufacturers**, because their sites already solve "present a physical product credibly online". Generic web-design award winners don't.

## Art-direction references

### 1. teenage engineering: OP-1 field product page — *Inspected (first viewport)*
- URL: https://teenage.engineering/products/op-1
- **Worth studying:** small lowercase grotesque type; a header of icon + label + three tiny lines of description per nav item (a spec-sheet nav); a flat neutral grey field; the product photographed straight-on as the hero; a one-line statement ("the beauty of evolution.").
- **Don't copy:** their playful brand voice, custom icons and full-bleed grey; the large orange cookie hand. The cookie banner covers the product on load, which shows how badly overlays hurt a product hero.
- **Translation:** the *technical label* idea. Every image and section gets a small mono caption (project · year · tool · role), like a part label.
- Code: proprietary, not reusable.

### 2. Industrial Facility (Sam Hecht & Kim Colin) — *Inspected (home only; `/work` returns 404)*
- URL: https://www.industrialfacility.co.uk/
- **Worth studying:** extreme restraint. Small two-line wordmark top left, burger top right, one centred object (their monograph) on light grey, a caption bar "Works 2002~2019". The work is the only visual.
- **Don't copy:** hiding all navigation behind a burger on desktop, which costs a recruiter a click. The 404 on a guessed `/work` URL is a reminder to keep routes predictable.
- **Translation:** centred, product-only imagery on a neutral ground for renders; quiet chrome.

### 3. LAYER (Benjamin Hubert) — *Inspected (home + /projects first viewport)*
- URL: https://layerdesign.com/
- **Worth studying:** positioning line "strategy, industrial design, engineering, branding and digital design" is close to Mikel's mix of disciplines.
- **Avoid:** both the home page and `/projects` open with a **full black screen and a slow word-by-word intro ("Designing…", "We…") that showed no work after 7+ seconds**. That fails the 10-second recruiter test. **Anti-reference for the hero.**

### 4. Map Project Office — *Inspected (first viewport)*
- URL: https://mapprojectoffice.com/
- **Seen:** a blank white page for ~2 s, then only a bold lowercase wordmark "map project office" with spaced words.
- **Takeaway:** a confident wordmark-only opening works for a famous studio and doesn't work for a student. Mikel's opening must show work or role immediately.

### 5. Known, to verify in round 2
| Reference | Why | Status |
|---|---|---|
| Nothing (nothing.tech) product pages | Dot-matrix/mono technical labelling around product renders | Known |
| Dieter Rams / Braun archive sites | Grid, restraint, spec captions | Known |
| Codrops "image reveal" / "text split" demos | Implementation of clipped reveals | Phase 4 |
| Awwwards "portfolio" + "industrial design" collections | Find 2–3 individual designer portfolios at Mikel's level | Round 2 |

## Conclusions for the creative direction

1. **Show the product immediately.** The two studios with slow or empty openings (LAYER, Map) are the worst fit for a recruiter scan.
2. **A technical caption system** (teenage engineering) is the most distinctive idea, and it fits "concept to specification" exactly.
3. **Neutral grounds + centred product renders** (Industrial Facility) let Mikel's own renders carry the visuals and cost almost nothing to build.
4. **Desktop nav stays visible.** No burger on desktop.

---

## Round 2 — Mikel's reference: "Sticky Grid Scroll" (2026-10-15) · *Inspected (full source)*

- **File:** `Downloads/sticky-grid-scroll2.html` (single-file adaptation, 12 embedded images, Spanish UI text)
- **Original:** Codrops "Sticky Grid Scroll" by Theo Plawinski, github.com/theoplawinski/codrops-sticky-grid-scroll. **Licence: MIT** (verified via GitHub API). Keep the copyright notice in the adapted source file.
- **Stack in the example:** GSAP 3.13 + ScrollTrigger + SplitText (CDN), Lenis 1.1.20 (current: 1.3.27).

### What it does
1. **Curtain hero.**
   - The hero is `position: sticky`, so it stays in place while the next section, which is opaque, slides over it like a curtain.
   - While it is being covered, the hero shrinks (scale 0.94), moves up 8% and darkens to 50% (scroll-scrubbed).
   - On load, the name animates letter by letter from line masks (SplitText `chars` + `mask: "lines"`, 1.2 s, stagger 0.05).
2. **Sticky grid scroll.**
   - A 425 vh section with a sticky 100 vh stage holds a 3-column grid of 12 square images.
   - **Reveal:** columns slide in, even columns from above and odd from below, staggered.
   - **Zoom:** the grid scales ×2.05. The side columns push outward (±40% x) and the middle column splits up and down (±40% y), opening a gap.
   - **Content:** the centred title rises, then the description and button fade in.
   - One scrubbed timeline drives the whole sequence.
3. **Smooth scroll:** Lenis (lerp 0.08) synchronised with ScrollTrigger through the GSAP ticker.
4. **Looping scroll hint:** an endlessly animated vertical line.
5. **Loading gate:** the page can't scroll until every image and font has loaded.

### What works and why Mikel likes it
- **Scroll becomes a physical, mechanical motion.** Columns slide like drawers and parts separate like an **exploded view**. That fits an industrial designer's language.
- **The curtain gives depth with only transform and opacity.** It is cheap to render.
- **The sequence is a story:** many images become one focused message.

### Conflicts with the approved plan, and how each is resolved
| Example does | Plan said | Resolution |
|---|---|---|
| Lenis smooth scroll | No Lenis (`07` §4) | Build with native scroll + `scrub: 0.6` (GSAP smooths the animation, not the page). **Test Lenis in the prototype** on desktop only, off for touch and reduced motion, and let Mikel decide by feel (D-33) |
| 425 vh pinned/sticky section | No pinning in MVP | **Accepted as the one sticky sequence on the homepage**, shortened to ~260 vh desktop / ~200 svh mobile so a recruiter isn't scrolling through 3 screens of motion |
| Character-level intro, 1.2 s + 0.05 stagger | Line masks only, ≤ 1.2 s | Characters allowed **on the hero H1 only**, stagger 0.015, total ≤ 1.4 s, with accessible text kept intact |
| Loading gate (no scroll until assets load) | Content never waits | **Dropped.** The grid isn't in the first viewport and uses placeholders while images load |
| Infinite scroll hint | No loops | Plays 3 cycles, then stops; none under reduced motion |
| Dark stage, Instrument Serif display, `mix-blend-mode: difference` | Light Spec Sheet, Geist | The grid stage becomes **the one dark "sheet"** on the site (ink background, paper text, both from the palette). Type stays Geist. No blend modes, because their contrast is unpredictable |
| 1440-based fluid `rem` (tiny on phones) | Fluid clamp type scale | Use the design-system scale; explicit mobile layout (`07` §3H) |
| Images are anonymous squares | Content is evidence | The 12 tiles are **3 per flagship project: sketch → CAD → render**, so the grid literally shows "concept to specification" |
