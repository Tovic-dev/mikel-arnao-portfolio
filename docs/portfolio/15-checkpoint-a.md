# Checkpoint A — Approval build

Date: 2026-10-16 · Live: https://mikel-arnao-portfolio.vercel.app (private repo `Tovic-dev/mikel-arnao-portfolio`, `main` = production)
Status: **layout and motion approved by Mikel**; performance baseline recorded below; real content next (8.3).

## 1. What Mikel reviewed and changed (D-33, D-37)

| Feedback | Change |
|---|---|
| Native vs Lenis scrolling | **Lenis chosen**: on by default with mouse/trackpad; native on touch and with reduced motion. Review panel removed |
| About section on the homepage | Removed; About only from the navigation |
| Hero → grid curtain not as smooth as the reference | Matched the reference: scale 0.94, lift 8%, shade 50%; 1:1 scrub with Lenis |
| Grid → featured projects felt like a "roadblock" and an abrupt colour change | Hold at the end of the grid, then a second curtain: featured projects slide over the receding grid |
| "View projects" implied only four projects | "Featured projects" wording; "View featured projects" |
| Contact footer too big | Compact footer (~200 px on desktop) |
| Section index overlapped the full-bleed caption | Full-bleed media is opaque and sits above the index; caption in the content column |
| Case-study entrance | First an ink curtain, then (preferred) the site's appear motion: label fade, title line masks, intro stagger, hero reveal |
| "See selected work" played the whole grid | Fades to paper, jumps past the grid to the first featured project, fades back in |
| Grid heading timing | Heading and lead rise together at 75% of the spread and land with the tiles |
| Grid tiles started in the wrong place | Fixed: explicit `fromTo` reveal + timeline redraw on refresh |

## 2. Performance, accessibility, SEO baseline (Lighthouse 13.5.0, live site)

Local Lighthouse with Chrome 140+ on Windows (PageSpeed Insights API was over its shared daily quota). Mobile preset unless noted.

| Page | Method | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home | simulated, median of 3 | 93 | 100 | 100 | 100 | 2.85 s | 0 | ~10 ms |
| Home | DevTools throttling | **97** | — | — | — | **2.1 s** | — | — |
| Home | desktop preset | 100 | 100 | 100 | 100 | 0.62 s | 0 | 0 |
| Ardura | simulated, median of 3 | 97 | 100 | 100 | 100 | 2.53 s | 0 | ~11 ms |
| Ardura | DevTools throttling | **97** | — | — | — | **2.1 s** | — | — |

Fixed during the baseline:
- **LCP render delay:** the hero render's reveal waited for JavaScript and hid the image until fully open. Now a CSS paper cover shrinks away over an image that's painted from the first frame; `fetchPriority="high"` instead of `preload`.
- **Accessibility:** project-card links overrode their visible text with an `aria-label` (label-content-name-mismatch). Removed; the visible text is the link name.

## 3. Open items (not blocking 8.3)

| Item | Target | Now | Plan |
|---|---|---|---|
| Mobile LCP | ≤ 2.0 s | 2.1 s (DevTools throttling) | Unthrottled headless runs show a fixed ~2 s first-paint floor on this PC even when everything has loaded by 0.4 s: likely a headless-Chrome artefact. Confirm on Mikel's phone and with real-user data (Vercel Speed Insights) in Phase 9 before optimising further |
| First-load JS (home) | ≤ 180 KB | ~213 KB transferred | Lighthouse reports ~56 KB unused JS. Candidates in Phase 9: load SplitText and Lenis only where used; check what React/Next ships by default in 16.4 |
| Render-blocking CSS | — | 9 KB, ~150 ms | Acceptable; revisit only if LCP stays above target |
| Motion checked by Mikel in a normal browser | — | Yes, desktop | Phone check of the process grid still to do |

## 4. Next: Phase 8.3 real content (by ~15 Nov)

Needed from Mikel by **2 Nov**, in `projects info/<project>/`:
- Final renders (Ardura, SEAT, Orbea), CAD screenshots, sketches
- Photo of the original Mercedes vent, the LCA charts
- Portrait (any time before launch)

Then: export web masters, replace placeholders project by project, write the English case-study copy from the reports (facts only), redraw the charts from report data, write alt text; **Checkpoint B** = Mikel fact-checks each case study.
