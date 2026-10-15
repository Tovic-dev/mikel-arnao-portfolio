# Implementation Roadmap

Status: **proposed** (2026-10-15) · Today: Thu 15 Oct 2026 · **Hard deadline: master's applications ≈ mid-December 2026** (D-06; exact date to confirm, D-35)

## 0. Timeline at a glance

| Dates (2026) | Phase | Milestone |
|---|---|---|
| 15–16 Oct | 7 · Planning review | ✅ **Plan approved → implementation authorised** |
| 16–18 Oct | 8.1 · Setup | Repo on GitHub (private), Vercel preview live with an empty shell |
| 19 Oct – 1 Nov | 8.2 · **Approval build** (placeholders) | 🔶 **Checkpoint A:** Mikel approves layout, motion, performance; decides Lenis (D-33) |
| 2 – 15 Nov | 8.3 · Real content | 🔶 **Checkpoint B:** Mikel fact-checks the 4 case studies |
| 16 – 22 Nov | 9 · Testing and refinement | All of `14` passes |
| 23 Nov | 10 · Launch | Production on `*.vercel.app`, link ready for applications |
| 24 Nov – 6 Dec | PDF portfolio (D-11) | Separate deliverable, same content and system |
| 7 – 15 Dec | Buffer | Fixes, extra projects only if time allows |

The web MVP lands in **week 6**, which leaves the planned ~1.5 weeks for the PDF plus a buffer week (D-10).

## Phases

### Phase 7 — Planning review and approval
- **Inputs:** documents 00–14.
- **Tasks:** Mikel reviews `00-project-brief.md` (one-page summary) and confirms or edits.
- **Deliverable:** status "approved" in `13`.
- **Acceptance:** every RECOMMENDED decision either approved or explicitly deferred.
- **Approval:** **Mikel's explicit "approved, start implementation"**. Nothing in Phase 8 starts before this.

### Phase 8.1 — Setup (16–18 Oct)
- **Inputs:** approved stack (`08`). **Mikel's actions** (accounts are his to create):
  - a GitHub account and an empty **private** repo
  - a Vercel account (Hobby) linked to GitHub
- **Tasks:**
  - Re-check versions and security advisories on the day.
  - `create-next-app` 16.4.x (TS, Tailwind, ESLint, App Router), pnpm.
  - Strict TS + `typedRoutes`, Prettier.
  - Tokens from `10` into `globals.css` `@theme`; fonts.
  - `content/types.ts`.
  - Push to GitHub; connect Vercel; set `SITE_URL`.
- **Deliverables:** running shell (header, footer, empty pages) on a preview URL.
- **Acceptance:** `pnpm build` passes with 0 type errors and 0 lint errors; preview URL loads; security headers present.
- **Risks:** account set-up delays. Mitigation: everything runs locally first; deploy when the accounts exist.

### Phase 8.2 — Approval build with placeholders (19 Oct – 1 Nov)
- **Inputs:** `05`, `06`, `07`, `10`; placeholder images (downloaded with Mikel's permission, `09` §6).
- **Tasks, in order** (each one a small, working slice pushed to its own preview):
  1. Primitives and layout (Grid, Heading, Label, links, buttons, MetaList).
  2. Header, footer, copy email.
  3. Hero + `HeroSequence` (load + curtain).
  4. **`ProcessGrid`** (desktop, mobile, reduced motion).
  5. WorkList + ProjectCard; Approach; AboutTeaser.
  6. Case-study template with **one full project (Ardura)** using every media module: compare slider, annotated image, spec table, chart, step sequence.
  7. The other 3 case studies as skeletons with draft text from the reports.
  8. /about, 404, metadata, sitemap, robots, JSON-LD.
  9. Lenis A/B switch (desktop) for D-33.
- **Deliverables:** complete site on a preview URL with `PLACEHOLDER` tags; a short checkpoint note with Lighthouse numbers and known issues.
- **Acceptance:** `14` §§1–4 pass with placeholders; first Lighthouse run recorded.
- **Risks:**
  - Process grid stutters on phones → mobile fallback from `07` §3I.
  - SplitText accessibility output → line-only fallback.
  - Scope creep from new reference ideas → logged as post-launch.
- **Approval: 🔶 Checkpoint A.** Mikel reviews on desktop and his phone and gives one consolidated round of feedback, then the build is adjusted.

### Phase 8.3 — Real content (2 – 15 Nov)
- **Inputs:**
  - **Mikel's assets** in `projects info/<project>/`: renders, CAD screenshots, sketches, vent photo, LCA charts. **Needed by 2 Nov.**
  - The reports.
- **Tasks:**
  - Run `export-images.mjs`; replace placeholders project by project.
  - Write the English case-study copy from the reports (facts only, `01` §6).
  - Redraw charts from the report data.
  - Write the alt text.
  - Crop the OG images.
- **Deliverables:** 4 complete case studies, real hero and grid, /about with facts.
- **Acceptance:** `scripts/check-placeholders` lists only the portrait (or nothing, if the photo has arrived); every claim traceable to `09` or `13`.
- **Risks:**
  - Late assets → the approval build is already complete, so the site can launch with fewer figures per project and gain more later.
  - Fact-checking time → copy is delivered project by project, not all at the end.
- **Approval: 🔶 Checkpoint B.** Mikel confirms every case study is accurate (roles, collaborations, numbers).

### Phase 9 — Testing and refinement (16 – 22 Nov)
- **Tasks:** everything in `11` measured; `@axe-core/playwright` on every route; keyboard, NVDA and reduced-motion passes; real-phone test; fixes; final copy polish.
- **Deliverable:** a test report (numbers, not claims) in `docs/portfolio/15-test-report.md`.
- **Acceptance:** every item in `14` checked; any exception written down with a reason and Mikel's OK.

### Phase 10 — Launch and handover (23 Nov)
- **Tasks:**
  - Production deploy on `main`.
  - Check the production URL, OG previews (LinkedIn Post Inspector) and the sitemap.
  - Short `README.md`: how to run the site, add a project, replace images, deploy, and later connect `mikelarnao.com` (steps for D-19).
- **Deliverables:** live URL to use in applications; README.
- **Acceptance:** `14` §6.

## Dependencies

```
Plan approval ──► 8.1 Setup ──► 8.2 Approval build ──► Checkpoint A ──► 8.3 Real content ──► Checkpoint B ──► 9 Testing ──► 10 Launch ──► PDF
                    ▲ GitHub + Vercel accounts (Mikel)          ▲ Assets in projects info/ by 2 Nov (Mikel)
```

## Working rules during implementation
- Small slices: each one builds, lints and type-checks before it's pushed.
- One commit per slice; no work lands on `main` without passing `pnpm build`.
- Specs stay authoritative. If implementation shows a spec is wrong, update the doc in the same commit and note it.
- New ideas during the build go into a "post-launch" list in `13`, not into the MVP.

## Progress log

| Date | Slice | Status |
|---|---|---|
| 15 Oct | 8.1 Setup: Next 16.4.1 static app, tokens, shell, content types; GitHub (private) + Vercel production at mikel-arnao-portfolio.vercel.app | ✅ |
| 15 Oct | 8.2 Homepage: curtain hero, sticky process grid, work list, approach, about teaser (placeholders) | ✅ |
| 15 Oct | 8.2 Case-study template with all media modules; /about; 404; sitemap, robots, JSON-LD, icon | ✅ |
| 16 Oct | 8.2 Lenis A/B (Lenis chosen), Checkpoint A feedback applied, Lighthouse baseline, `15-checkpoint-a.md` | ✅ Checkpoint A passed |
| by 2 Nov | 8.3 Real assets from Mikel in `projects info/<project>/` | Waiting on assets |

Testing note: the in-app browser pane used for checks stops rendering animation frames when it isn't visible, so GSAP tweens can appear frozen half-way there. Motion is verified by reading state after scrolling, and must be checked by Mikel in a normal browser at Checkpoint A.
