# Acceptance Criteria

Status: **proposed** (2026-10-15). This checklist decides whether the portfolio is done.
Sections 1–4 apply at **Checkpoint A** (with placeholders). Everything applies at **launch**.

## 1. Content and integrity
- [ ] Homepage shows name, role, headline "From concept to specification.", availability, and 4 projects in order: Ardura, SEAT mirror, Mercedes vent, Orbea Cycle Dry.
- [ ] Every case study opens with year, course, team (named), approved collaboration wording (D-13) and "My role", visible without scrolling on desktop (1440 × 900) and mobile (375 × 812).
- [ ] *(Launch)* Every factual claim (dates, roles, collaborations, tools, numbers) traces to `09` or `13`. No invented outcomes, awards or metrics.
- [ ] *(Launch)* iF appears at most as "submitted to …" with the exact name, or not at all. Ibili "Jario" is not shown (D-15).
- [ ] *(Launch)* `check-placeholders` reports **0** placeholder media.
- [ ] *(Launch)* Spelling and grammar checked; English only.
- [ ] Contact: email `arnaomikel10@gmail.com` with working copy button; LinkedIn link correct; no CV download.

## 2. Design and responsive
- [ ] Matches the approved system: Geist + Geist Mono, signal orange accent used only as specified, 0 radius, no shadows or gradients (`10`).
- [ ] Layouts follow `05` A7 and B6 at 375, 768, 1024, 1440 and 1920 px widths.
- [ ] No horizontal page scroll at 320 px. Tables scroll inside their own box.
- [ ] Navigation: Work / About / Contact visible at every width; no burger; current page marked.
- [ ] Case-study section index: sticky on desktop, `<details>` on smaller screens; previous/next links wrap around.

## 3. Motion
- [ ] Hero load sequence ≤ 1.4 s, and content is readable without waiting for it.
- [ ] Curtain hero and process grid behave as in `07` §3H–I on desktop and mobile.
- [ ] Reveals play once, never reverse; body text never animates.
- [ ] Reduced motion: no transforms, static process grid, scroll hint off, everything visible (`07` §6).
- [ ] JavaScript disabled: every page is complete and readable.
- [ ] Lenis decision (D-33) made: the losing option and the review panel (`components/ui/ReviewPanel.tsx`, `lib/review.ts` switches) removed from the code.
- [ ] No console errors or warnings in production.

## 4. Technical
- [ ] Next.js ≥ 16.4.1 (or a later patched version); `pnpm audit` shows no high or critical issues.
- [ ] `pnpm build`: 0 TypeScript errors (strict), 0 ESLint errors.
- [ ] All routes static; unknown `/work/*` slugs return 404; `/work` redirects to `/#work`.
- [ ] No runtime third-party requests (fonts, scripts, analytics).
- [ ] Security headers from `08` §10 present on production responses.

## 5. Performance, accessibility, SEO (Phase 9; numbers recorded in the test report)
- [ ] Lighthouse mobile (median of 3) on home and one case study: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100.
- [ ] LCP ≤ 2.0 s, CLS ≤ 0.02, TBT ≤ 150 ms (lab, mobile).
- [ ] First-load JS within the budgets in `11` §1.
- [ ] Process grid: no long tasks > 50 ms while scrolling (4× CPU throttle).
- [ ] axe: 0 violations on every route.
- [ ] Keyboard-only pass of every page; compare slider works with arrow keys; no hidden focus targets.
- [ ] NVDA pass of home and one case study: headings read as full sentences; copy-status announced.
- [ ] Titles, descriptions, canonical, OG images present per page; sitemap and robots served; JSON-LD validates.

## 6. Launch and handover
- [ ] Production deploy from `main` on the Vercel URL; preview deployments not indexed.
- [ ] LinkedIn Post Inspector shows the correct preview image and text.
- [ ] Tested on Mikel's phone over mobile data.
- [ ] `README.md` explains: run locally, add or edit a project, replace images, deploy, connect `mikelarnao.com` later.
- [ ] Mikel signs off.
