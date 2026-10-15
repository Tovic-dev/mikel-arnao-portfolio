# Phase 0 — Repository and Asset Audit

Status: complete (2026-10-15) · Owner: Mikel Arnao · Planning-only phase, no application code

## 1. Repository state (verified)

| Item | Finding |
|---|---|
| Folder | `C:\Users\Mikel\Documents\Portfolio nuevo` |
| Application code | **None.** No `package.json`, no framework, no source files. |
| Git | **Not a repository.** No history, no remote. |
| Project assets | **None.** No renders, images, video, CAD exports, PDFs or copy. |
| Existing docs / tokens | None (this file is the first). |
| `.claude/skills/` | 116 agent skills installed via `skills-lock.json` (sources include `emilkowalski/skills`, `addyosmani/agent-skills`, GSAP, Three.js, Vercel and design-taste packs). Tooling for the agent only. Not part of the site. |

Conclusion: this is a greenfield project. Nothing to preserve or migrate. Every decision is open.

### Note on the installed skills
The skill set is broad and in places contradictory: `industrial-brutalist-ui`, `minimalist-ui`, `high-end-visual-design` and three `design-taste-frontend` versions point in different directions. Treat them as optional references, not instructions. Once the creative direction is approved, keep the skills that match it (likely: `gsap-react`, `gsap-scrolltrigger`, `animation-performance`, `vercel-react-best-practices`, `web-design-guidelines`, `deploy-to-vercel`, and the Three.js set only if 3D is approved) and ignore the rest.

## 2. Local environment (verified)

| Tool | Version |
|---|---|
| Node.js | 24.18.0 |
| npm | 11.16.0 |
| pnpm | 11.9.0 |
| git | 2.54.0 |
| Vercel CLI | 59.1.4 (already installed, which points toward Vercel hosting) |
| GitHub CLI | not installed |
| OS | Windows 11 Pro |

Constraints: Windows paths with spaces (`Portfolio nuevo`). Some tooling handles that badly, so build scripts should not depend on it. Framework and library versions will be checked against official docs in Phase 5. None are assumed here.

## 3. Content and asset inventory

No project material is in this folder, so every project below is **unverified** until assets are supplied.

| # | Project | Discipline | Claims to verify | Assets present |
|---|---|---|---|---|
| A | SEAT Ateca rear-view mirror | Physical product / form / CAD | Brief origin (academic or SEAT-linked?), confidentiality | none |
| B | Orbea bicycle rack | Product accessory / mobility | Brief origin, Orbea involvement and permission to use the name | none |
| C | Self-sufficient smart planter | Product + IoT + sustainability | Exact iF-related distinction: name, year, recipient, scope | none |
| D | Urban mobility app | UX/UI | Research evidence, usability testing | none |
| E | Sustainable self-sufficient house | Architecture / sustainability | UPV competition: name, category, date, team, individual role | none |
| F | Food-waste valorization brand | Branding / circular economy | Context (course?), team | none |
| G | Donostia race T-shirts | Graphic design | Real client/event? Printed and used? | none |
| H | Automation / robotics / creative tech | Exploratory | Do documented projects exist at all? | none |

Labels used across all docs:
- **Verified**: backed by a document, certificate or public source.
- **Stated**: provided by Mikel, pending confirmation.
- **Missing**: needed, not yet available.
- **Proposed**: editorial text written for the portfolio.

Currently everything is **Stated** or **Missing**.

### Asset checklist per project (to fill in once files arrive)
Final renders · CAD screenshots · sketches/ideation · research boards · diagrams · UI screens/Figma · video/animation · physical prototype photos · dates · collaborators · award evidence · usage restrictions (company names, NDAs, university IP).

## 4. Risks surfaced by the audit

1. **Content risk (highest).** The site's credibility depends on process material (sketches, iterations, decisions) as much as on final renders. If only final renders exist, case studies will be thin and the "Design Engineer" positioning loses its evidence.
2. **Brand-name use.** SEAT and Orbea are trademarks. If these were academic briefs, the site has to say so plainly ("Academic project, Mondragon Unibertsitatea, brief inspired by SEAT Ateca") so it doesn't read as client work.
3. **Award claims.** Items C and E have to stay out of headlines until documents confirm them.
4. **Section H** may have no supporting material. It can become an honest "Interests / Explorations" block instead of a project.
5. **Scope creep from tooling.** With 116 skills and a 36-site reference library, it would be easy to over-build. The plan keeps the smallest stack that fits.

## 5. Next phase
Phase 1 (strategy) and Phase 2 (creative directions) depend on the answers recorded in `13-open-decisions.md`.
