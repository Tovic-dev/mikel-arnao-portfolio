# Motion Specification

Status: **proposed, rev. 2** (2026-10-15): adds the curtain hero and process grid adapted from Mikel's "Sticky Grid Scroll" reference (`03` round 2)
Library versions and APIs are checked against official docs in Phase 5 (`08-technical-architecture.md`). Nothing here is verified against code yet.

## 1. Motion principles for "Spec Sheet"

1. **Precise, not decorative.** Motion behaves like a plotter drawing a technical sheet: lines draw, masks open, labels appear. Nothing bounces, floats or loops.
2. **Content is never waiting.** Nothing hides content for more than ~300 ms. There is no preloader or intro sequence. If JavaScript fails, everything is visible (hidden start states are applied by JS, never by default CSS).
3. **Once only.** Scroll reveals play the first time an element enters the view and never reverse.
4. **Body text is never animated.** Only headings, images, lines, labels and charts.
5. **Composite-only properties:** `transform`, `opacity`, `clip-path`, SVG `stroke-dashoffset`. No animated `filter: blur`, `width`/`height`, `top`/`left` or box-shadow.
6. **Native scrolling first.** No scroll hijacking. **One** sticky scroll sequence on the homepage (the process grid, §3I) plus the curtain hero (§3H); no other pinned sections in the MVP. Lenis is tested in the prototype only (D-33).

## 2. Motion tokens

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 150 ms | Colour and state changes, copy feedback |
| `--dur-base` | 250 ms | Hover transitions, underline, index marker |
| `--dur-reveal` | 700 ms | Heading line masks, image clip reveals |
| `--dur-draw` | 500 ms | Leader lines, chart bars |
| `stagger-lines` | 70 ms | Between heading lines |
| `stagger-items` | 90 ms | Between cards, labels, bars |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals and draws (fast start, long settle) |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Hover and state changes |
| Reveal distance | 16 px (text), 0 (images use clip-path) | Small movements read as precise |
| Reveal trigger | element top reaches 85% of viewport height | |

Reduced-motion values: §6.

## 3. Interaction inventory

### A. Global — *Essential*

| ID | Element | Trigger | Behaviour | Duration / easing | Engine | Touch / mobile | Reduced motion |
|---|---|---|---|---|---|---|---|
| G1 | Text links | hover, focus-visible | Underline grows left→right (`scaleX` on a pseudo-element) | base / standard | CSS | Underline always shown on inline body links | Colour change only |
| G2 | Nav links | hover, focus, current | Accent colour; current page always accent + `aria-current` | fast / standard | CSS | Same | Same |
| G3 | Focus ring | keyboard focus | 2 px accent outline, 3 px offset, appears instantly | none | CSS | — | Same |
| G4 | Copy email | click / Enter | Button label "Copy" → "Copied" with check icon, reverts after 2 s; announced via `aria-live="polite"` | fast | CSS + a few lines of JS | Same | Same |
| G5 | Image loading | image decoded | Blurred low-res placeholder (from the image pipeline) → image fades in | 300 ms / standard | CSS | Same | Instant swap |
| G6 | Arrow icons in CTAs and cards | hover / focus | Arrow nudges 4 px right | base / standard | CSS | Static | Static |

**Route transitions:** none in the MVP. Next.js navigations are instant. *Experimental option (§5):* View Transitions to morph a project card image into the case-study hero.

### B. Homepage hero — *Essential*

One load sequence, total ≤ 1.4 s, starting as soon as the page hydrates (H1 uses character masks; see §3H):

| t (ms) | Element | Behaviour |
|---|---|---|
| 0 | Meta line (role · availability) | Fade + 16 px up, 500 ms |
| 80 | Headline "From concept to specification." | Characters rise inside line masks, 1.0 s, stagger 15 ms (§3H) |
| 200 | Ardura render | `clip-path` opens bottom→top, 900 ms |
| 900 | Leader lines (2–3) | Draw via `stroke-dashoffset`, 500 ms, stagger 90 ms |
| 1100 | Annotation labels | Fade in, 250 ms |

- No pointer parallax and no 3D.
- **LCP guard:** the render is the likely LCP element. Its clip reveal must start immediately (not after the text), and the image is preloaded with high priority.
- **Mobile:** same sequence. The annotations become a numbered list below the image (from `05` §B6), and that list fades in.

### H. Curtain hero (homepage) — *Essential* (adapted from "Sticky Grid Scroll", `03` round 2)

| Item | Spec |
|---|---|
| Structure | Hero is `position: sticky; top: 0; height: 100svh; z-index: 0`. Every following homepage section has an opaque background and `z-index: 1`, so it slides over the hero |
| Trigger | ScrollTrigger on the process-grid section: `start: "top bottom"` → `end: "top top"`, `scrub: 0.6` |
| Behaviour | Hero inner: `scale 1 → 0.95`, `yPercent 0 → −6` (origin bottom centre); shade layer (ink) `opacity 0 → 0.4`. Once the hero is fully covered, set `visibility: hidden` (restored on scroll back) so it's skipped by paint and by assistive tech focus order |
| Easing | `none` (scroll-linked) |
| Mobile | Same, with scale only to 0.97 and shade 0.3 (smaller screens make large moves feel like lag) |
| Reduced motion | Sticky curtain stays (it is layout, not animation); no scale and no shade |
| A11y | Hero content stays in the DOM. The hidden state only applies when it is visually fully covered |
| Hero load sequence | As §B, except the H1 uses **character masks**: SplitText `type: "chars,lines", mask: "lines"`, chars `yPercent 115 → 0`, 1.0 s, `power4.out`, stagger 0.015. Total sequence ≤ 1.4 s. The screen-reader text of the H1 must stay the full sentence (verify SplitText's aria output in Phase 8) |
| Scroll hint | "Scroll" label + 1 px line with a moving fill, `1.8 s cubic-bezier(.7,0,.3,1)`, **3 iterations then stops**; hidden under reduced motion; `aria-hidden` |

### I. Process grid (homepage) — *Essential* (adapted from "Sticky Grid Scroll")

Sits between the hero and the project list. It turns 12 images into one message and leads straight into Selected Work.

| Item | Spec |
|---|---|
| Content | 12 square tiles = **3 per flagship (sketch, CAD, render)**, arranged so each column mixes projects. Centre text: label `SELECTED WORK · 04` · H2 **Four products, from first sketch to final specification.** · lead (1 sentence) · secondary CTA `View projects ↓` (→ the project list) |
| Structure | Section `height: 260vh` (desktop) / `200svh` (mobile); inner stage `position: sticky; top: 0; height: 100svh; overflow: hidden`; **ink background, paper text** (the site's one dark sheet) |
| Grid | 3 columns, square tiles. Desktop width ≈ 50vw (max 760 px), column gap 32 px, row gap 40 px. Mobile: 3 columns kept at ~88vw, gaps 12/16 px |
| Timeline (one scrubbed timeline, `scrub: 0.6`, `start: "top top"`, `end: "bottom bottom"`) | **1. Column reveal:** even columns from above, odd from below, `y = ±(viewport height − (viewport height − grid height)/2)`, stagger 0.06 per tile (from end / start), `power1.inOut`. **2. Exploded zoom** (overlaps by 0.6): grid `scale → 2.05`, column 1 `xPercent → −40`, column 3 `xPercent → 40`, column 2 splits `yPercent ±40` (top half up, bottom half down), `power3.inOut`. **3. Content:** the H2 is pre-offset to the centre and rises to its resting place; lead + CTA fade in (0.4 s) when the scroll direction is forward, out when backward (non-scrubbed toggle, as in the original) |
| Images | `next/image`, `sizes` matched to the zoomed size (tiles get ~2× larger, so request ~2× tile width), `loading="lazy"` with blur placeholder. **No loading gate** |
| Alt text | Tiles are `alt=""` (decorative here); the same images appear with full alt text in the project list and case studies. The section has a real heading and CTA |
| Interaction | Tiles aren't links. The CTA and the following list are the way in |
| Mobile | Same sequence, shorter section; zoom 1.8 instead of 2.05 so side columns don't leave the screen too early. Test on a real phone: if it stutters on a mid-range Android, fall back to the reduced-motion version for `(max-width: 639px)` |
| Reduced motion | **No sticky stage**: section height auto; static 3×4 grid shown with the H2, lead and CTA above it |
| Keyboard | Tabbing to the CTA while the stage is mid-sequence: the CTA is `pointer-events: none` and `tabindex="-1"` until shown, then focusable, so focus never lands on an invisible button |
| Performance | Only transform and opacity; 12 images ≈ 12 compositor layers during the sequence, with `will-change: transform` only while the section is active (set in `onToggle`). Verify in DevTools (Phase 9) |
| Source | Adapted from MIT-licensed code; keep the licence notice in the component file |

### C. Selected work (homepage) — *Essential*

| ID | Element | Trigger | Behaviour | Duration / easing | Touch | Reduced motion |
|---|---|---|---|---|---|---|
| W1 | Project card image | enters view | `clip-path` reveal bottom→top | reveal / out | Same | Visible immediately |
| W2 | Card text (number, title, tags, year) | enters view | Fade + 16 px up, stagger items | 500 ms / out | Same | Visible |
| W3 | Card hover / focus | hover, focus-visible within the card | Image scales 1 → 1.03 inside its frame; title turns accent; arrow nudges (G6) | 600 ms image, base for the rest / standard | No hover state; whole card is the link; arrow always visible | Colour only, no scale |

The whole card is a single `<a>`: one tab stop, with a descriptive accessible name ("Ardura: smart self-sufficient plant pot, case study").

### D. Text — *Essential, limited scope*

| ID | Element | Behaviour | Notes |
|---|---|---|---|
| T1 | Section headings (h2) | Line mask reveal, 600 ms, stagger 70 ms | Split text must keep the original text for screen readers (aria-label on the heading or visually hidden copy); re-split on resize |
| T2 | Section numbers (01, 02…) | Fade in with the heading | |
| T3 | Body text, captions, tables | **Not animated** | |

No character-level animation and no scrambling, **except the hero H1** (§3H), which is one short sentence shown once.

### E. Case studies — *Essential*

| ID | Element | Trigger | Behaviour | Engine | Mobile | Reduced motion |
|---|---|---|---|---|---|---|
| C1 | Section index marker | Section crosses ~40% of viewport | Accent marker slides to the active item (`translateY`, base / standard); `aria-current="true"` | IntersectionObserver + CSS | Index is a `<details>`, so no marker | Instant jump |
| C2 | Full-bleed render | enters view | `clip-path` reveal, 900 ms / out | Animation engine | Same | Visible |
| C3 | Annotated image | enters view | Leader lines draw, labels fade (as hero) | Animation engine | Numbered list below image fades in | Static |
| C4 | CAD → render compare | pointer drag / arrow keys | Divider follows pointer 1:1 (no easing). Keyboard: ←/→ moves 5%, Home/End to the ends. Exposed as a slider (`role="slider"`, `aria-valuenow`) | Pointer events, no library | Drag works with touch; also a "CAD / Render" toggle button | Same (direct manipulation is not decorative motion) |
| C5 | Chart bars | enter view | Bars grow from the baseline (`scaleY`), draw / out, stagger items. Values are static text, never counted up | Animation engine | Same | Static |
| C6 | Media in sections | enter view | Clip reveal (images) or fade (diagrams, tables), once | Animation engine | Same | Visible |
| C7 | Previous / next project | hover / focus | As W3 | CSS | As W3 | As W3 |

### F. Microinteractions

| Item | Decision |
|---|---|
| Underline links, arrow nudge, copy email | **Yes** (G1, G4, G6) |
| `<details>` "Contents" open/close | **Yes**: chevron rotates 180°, base; content not height-animated (instant) to avoid layout animation |
| Magnetic buttons | **No.** Wrong tone, and no benefit on touch |
| Custom cursor / cursor-following labels | **No** |
| Tabs / accordions | None needed in MVP |

## 4. Engine and ownership (proposal, confirmed in Phase 5)

**Recommendation: one JavaScript animation engine (GSAP) for scroll-triggered and sequenced motion. CSS for every hover, focus and state transition. No Lenis.**

| Concern | Choice | Why |
|---|---|---|
| Hover, focus, state | CSS transitions + tokens | No JS cost; works before hydration |
| Scroll reveals, hero sequence, line draws, chart bars | GSAP core + ScrollTrigger (with `ScrollTrigger.batch` for card lists) | One engine, consistent easing, reliable once-only triggers, built-in `matchMedia` for reduced motion and breakpoints |
| Heading line splits | GSAP SplitText (candidate) | Handles line detection, re-splitting on resize and accessibility. **Verify licence and accessibility handling in Phase 5** |
| Section index active state | IntersectionObserver | Not animation, so no engine needed |
| CAD → render slider | Native pointer events | Direct manipulation; any library would be overhead |
| Smooth scroll | **Native scroll + `scrub: 0.6`** by default. **Lenis A/B test in the prototype** (D-33): desktop only (`syncTouch: false`), disabled under reduced motion, driven from the GSAP ticker so there is one loop, `anchors: true` for in-page links. Kept only if Mikel prefers it and it passes the keyboard/anchor checks | Smoothing the scrubbed animations gets most of the example's feel without taking over the page scroll; Lenis is a decision by feel, so it is tested, not assumed |

**Alternative considered:** CSS scroll-driven animations (`animation-timeline: view()`) plus IntersectionObserver, with no JS engine. Lighter, but browser support and once-only behaviour need checking. Phase 5 decides between this and GSAP based on current support data. The motion design above works with either engine.

**Ownership rules:**
- Each component owns its own animations, scoped to its root element, created on mount and **fully cleaned up on unmount**. This prevents duplicates from React Strict Mode and fast refresh.
- **Only the hero has a multi-element timeline.** No timeline spans more than one component.
- Plugins are registered once in a single client module. No component registers its own.
- Pages without animated components load no animation JavaScript.

## 5. Optional and experimental

| Tier | Effect | Condition |
|---|---|---|
| Optional (post-MVP polish) | Full-bleed render: subtle scale 1.06 → 1 scrubbed while it enters | Desktop only; drop if it costs >1 frame |
| Optional | First-view hint on the CAD→render slider: divider sweeps 50 → 70 → 50% once | Not with reduced motion |
| Optional | Approach section: connecting line draws between the 4 steps as you scroll | If the approach layout uses a horizontal line |
| Experimental | View Transitions: card image morphs into the case-study hero | Only if browser support is adequate and it adds nothing to bundle size; must fall back to an instant navigation |
| Experimental | Orbea lift-and-rotate mechanism as a pinned, scroll-scrubbed frame sequence | Desktop only, after MVP, only if frames exist |

## 6. Reduced motion, touch and low-power devices

**`prefers-reduced-motion: reduce`:**
- All reveals (hero, cards, headings, media, charts, leader lines): content shown immediately at full state; at most a 150 ms opacity fade.
- Hover scale is removed; colour changes stay.
- Optional and experimental effects are off.
- The CAD→render slider still works.

**Touch devices (`hover: none`):** no hover-dependent information. Arrows, labels and link affordances are always visible.

**Low-power and slow connections:**
- The motion budget is independent of images. Reveals never wait for image download: the placeholder is what reveals.
- With `Save-Data` or slow connections, there are no extra assets; motion has no assets anyway.

**Animation never carries information:** every number, label and annotation is in the HTML from the start.

## 7. Effects to avoid (decided)

Preloaders, loading gates and intro screens · scroll hijacking and horizontal scroll sections · custom cursors · magnetic buttons · parallax on text · continuous or looping animation (the scroll hint stops after 3 cycles) · animated blur or glow · character scrambles · counting numbers · WebGL / 3D in the MVP · autoplaying video with sound.

## 8. Performance acceptance (verified in Phase 9)

- No long tasks (>50 ms) caused by animation during scroll on a mid-range Android phone (Chrome DevTools, 4× CPU throttle).
- Hero sequence does not delay LCP (LCP measured with motion on vs off differs by < 100 ms).
- CLS from animation = 0 (only transform, opacity and clip-path change).
- With JS disabled, every page is complete and readable.

## 9. Implementation notes (Phase 8.2, 2026-10-15)
- **Review switch `?motion=on` / `?motion=off`.** The Windows PC used for development reports `prefers-reduced-motion: reduce` (most likely Windows "Animation effects" is off), so the site correctly shows the static versions there. Adding `?motion=on` to any URL plays the motion for the rest of the browser session; `?motion=off` clears it. Motion is never forced by default.
- **Tall hero on phones.** The sticky hero is taller than a phone screen, so it sticks by its bottom edge (`top = viewport height − hero height`, measured with a ResizeObserver). The whole hero scrolls into view before the curtain covers it.
- **Process grid gap.** The middle column opens by max(40% of a tile, the height needed for the centred text ÷ zoom). On tall phones the original 40% let the tiles cover the text. Tiles sit above the text, so the heading appears through the gap; no blend modes.
- **Lenis A/B switch (D-33).** Lenis 1.3.26 (MIT; 1.3.27 was one day old) runs only when chosen with `?scroll=lenis` or the review panel, only with a mouse or trackpad (`hover: hover` and `pointer: fine`), and only when motion is allowed or forced. Settings: `lerp 0.08`, `anchors: true`, `stopInertiaOnNavigate: true`, driven by the GSAP ticker (`lagSmoothing(0)` while active, restored after). Route changes jump to the top instantly.
- **Review panel.** `?review=on` shows a small toolbar (bottom left) with Scroll: Native / Lenis and Motion: System / Force on. Choices persist for the browser session. Both the panel and whichever scroll option loses are removed before launch.

- **Checkpoint A changes (2026-10-16).** Lenis is the default (D-33). Hero curtain matches the reference: scale 0.94, lift 8%, shade 50% (phones 0.96 / 35%). Scroll-linked timelines scrub 1:1 when Lenis runs (it already smooths) and 0.6 s on touch. Process grid: heading fades in as the section rises (`top 57%`), a hold of 0.5 timeline units after the content appears, then a **second curtain**: the featured projects (margin-top −100svh, z above) slide over the last screen of the sticky grid while it recedes (scale 0.94, lift 8%, shade 50%). Section height 380vh desktop / 300svh phone.
- **Case-study entrance (Checkpoint A, 2026-10-16).** Replaces "no route transitions" for case studies only. On in-site navigation to `/work/*` (not on a first visit, so LCP is unaffected; never with reduced motion): an ink curtain covers the screen with the label `02 / 04 — Project title`, then lifts away (`yPercent −100`, 0.75 s, `power3.inOut`, from 0.3 s). The intro rises (fade + 24 px, stagger 60 ms, from 0.5 s) and the hero render opens bottom→top (0.9 s, from 0.45 s). About 1.1 s in total. A 2 s failsafe always removes the curtain. Implemented in `components/project/CaseStudyEntrance.tsx`; first-visit detection in `lib/navigation.ts`.
- **Case-study entrance, revised (2026-10-16).** The ink curtain was replaced at Mikel's request by the site's own appear motion, on every visit: label fade + 16 px (0 s); title line masks (`yPercent 115 → 0`, 0.8 s, stagger 70 ms); summary, role block and mobile contents fade + 16 px (stagger 70 ms, from 0.2 s); hero render clip bottom→top (0.9 s, from 0.25 s). Body sections keep their scroll reveals.
- **Hero CTA "See selected work" (2026-10-16).** Jumps past the sticky process grid instead of scrolling through it: paper veil fades in (0.25 s), instant jump to `#work` (Lenis `immediate`), 0.25 s pause so scrubbed timelines settle, veil fades out (0.45 s). Focus moves to the project list. Reduced motion: instant jump, no veil. 1.5 s failsafe. `components/ui/JumpLink.tsx`, `lib/scroll.ts`.
- **Process grid text, revised (2026-10-16).** The heading no longer appears early or waits centred. Heading (fade + 40 px) and label, lead and CTA (fade + 16 px) are part of the scrubbed zoom: they start at 40% of the spread and land exactly when the tiles reach their final position (zoom t = 1). Reverses with the scroll. The CTA becomes focusable once the content has landed.
- **Grid start-position fix (2026-10-16).** After a ScrollTrigger refresh, `invalidateOnRefresh` made GSAP redraw only the tweens starting at t = 0, so only the first tile of each column started off-screen. The column reveal is now an explicit `fromTo`, and `onRefresh` seeks the timeline to the end and back to the current progress so every tile draws its correct state. Text now starts at 60% of the spread (was 40%) and lands with the tiles. Verified by stepping the GSAP ticker manually.
