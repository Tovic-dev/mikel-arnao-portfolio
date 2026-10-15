# Motion Specification

Status: **proposed** (2026-10-15) · Depends on: `02-creative-direction.md` (A), `04-information-architecture.md`, `05-page-specifications.md`
Library versions and APIs are checked against official docs in Phase 5 (`08-technical-architecture.md`). Nothing here is verified against code yet.

## 1. Motion principles for "Spec Sheet"

1. **Precise, not decorative.** Motion behaves like a plotter drawing a technical sheet: lines draw, masks open, labels appear. Nothing bounces, floats or loops.
2. **Content is never waiting.** Nothing hides content for more than ~300 ms. There is no preloader or intro sequence. If JavaScript fails, everything is visible (hidden start states are applied by JS, never by default CSS).
3. **Once only.** Scroll reveals play the first time an element enters the view and never reverse.
4. **Body text is never animated.** Only headings, images, lines, labels and charts.
5. **Composite-only properties:** `transform`, `opacity`, `clip-path`, SVG `stroke-dashoffset`. No animated `filter: blur`, `width`/`height`, `top`/`left` or box-shadow.
6. **Native scrolling.** No smooth-scroll library, no scroll hijacking, no pinned sections in the MVP.

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

One load sequence, total ≤ 1.2 s, starting as soon as the page hydrates:

| t (ms) | Element | Behaviour |
|---|---|---|
| 0 | Meta line (role · availability) | Fade + 16 px up, 500 ms |
| 80 | Headline "From concept to specification." | Lines rise inside overflow masks, 700 ms, stagger 70 ms |
| 200 | Ardura render | `clip-path` opens bottom→top, 900 ms |
| 900 | Leader lines (2–3) | Draw via `stroke-dashoffset`, 500 ms, stagger 90 ms |
| 1100 | Annotation labels | Fade in, 250 ms |

- No pointer parallax and no 3D.
- **LCP guard:** the render is the likely LCP element. Its clip reveal must start immediately (not after the text), and the image is preloaded with high priority.
- **Mobile:** same sequence. The annotations become a numbered list below the image (from `05` §B6), and that list fades in.

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

No character-level animation and no scrambling. They hurt readability and don't fit the direction.

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
| Smooth scroll | **None** | Smooth scrolling adds input lag, breaks anchor and keyboard expectations, and fights sticky elements. Native scroll is faster and more accessible |

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

Preloaders and intro screens · smooth-scroll libraries · scroll hijacking and horizontal scroll sections · custom cursors · magnetic buttons · parallax on text · continuous or looping animation · animated blur or glow · character scrambles · counting numbers · WebGL / 3D in the MVP · autoplaying video with sound.

## 8. Performance acceptance (verified in Phase 9)

- No long tasks (>50 ms) caused by animation during scroll on a mid-range Android phone (Chrome DevTools, 4× CPU throttle).
- Hero sequence does not delay LCP (LCP measured with motion on vs off differs by < 100 ms).
- CLS from animation = 0 (only transform, opacity and clip-path change).
- With JS disabled, every page is complete and readable.
