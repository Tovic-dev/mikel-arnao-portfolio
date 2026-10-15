# Information Architecture

Status: **approved with contact details** (2026-10-15; domain `mikelarnao.com`) · Depends on: `01-personal-brand.md`, `02-creative-direction.md` (A approved), `09-content-and-assets.md`

## 1. Principles

1. **Two clicks to any evidence.** Home → case study → section.
2. **The homepage is the project index** while there are fewer than ~7 projects. A separate `/work` page with 4 items would repeat the homepage.
3. **No hidden navigation.** Every page shows all top-level links; there is no burger menu at any width.
4. **One URL per piece of content**, so each case study can be linked directly in an application form or email.

## 2. Routes (MVP)

| Route | Purpose | Notes |
|---|---|---|
| `/` | Identity + headline + 4 flagship projects + approach + short about + contact | The main recruiter page |
| `/work/ardura` | Case study 01 | |
| `/work/seat-ateca-mirror` | Case study 02 | |
| `/work/mercedes-vent-lca` | Case study 03 | |
| `/work/orbea-cycle-dry` | Case study 04 | |
| `/about` | Full profile: education, how I work, tools (per project), interests. Replaces a CV (no CV download, D-18) | Admissions panels read this |
| `/sitemap.xml`, `/robots.txt` | SEO | Generated |
| 404 | Short message, links to the 4 projects | |

**Rejected or deferred:**

| Route | Decision | Reason |
|---|---|---|
| `/work` index | Deferred until 7+ projects | Would duplicate the homepage |
| `/contact` | Rejected | One email and two links don't need a page. Contact lives in the footer of every page and as a homepage section |
| `/es` language routes | Rejected (D-03, English only) | |

`/work` without a slug redirects to `/#work` so a hand-typed URL never 404s.

## 3. Navigation

### Header (every page)
```
M. ARNAO — Product Designer & Design Engineer          Work   About   Contact
```
- **Work** → `/#work` · **About** → `/about` · **Contact** → `#contact` (footer anchor, present on every page)
- **Static, not fixed.** It scrolls away. Case studies get their own sticky section index instead (§4). A fixed header would compete with it and cost vertical space on mobile.
- **Mobile (375 px):** wordmark on line 1, the three links on line 2 in mono 13 px. They fit, so no menu component is needed.
- **Current page** is marked with the accent colour and `aria-current="page"`.

### Footer (every page) = contact block, `id="contact"`
- Email arnaomikel10@gmail.com (with a copy-to-clipboard button: recruiters often paste addresses into an ATS)
- LinkedIn: https://www.linkedin.com/in/mikelarnao
- Location: Basque Country, Spain
- © year · "Designing what comes next." as the sign-off line (from `01-personal-brand.md`)

### Inside case studies
- **Section index:** the numbered steps (01 Context … 08 Reflection) as a sticky list in the left column on desktop, highlighting the current section. On tablet and mobile it collapses to a "Contents" `<details>` element at the top of the page.
- **Previous / next project** at the end, in flagship order, wrapping around (04 → 01).
- **"Back to all work"** link → `/#work`.

## 4. Optional features: decisions

| Feature | Decision | Reason |
|---|---|---|
| Availability label | **Yes**: "Open to internships and master's programmes · 2027" (D-16, approved) | Tells recruiters you're available |
| Downloadable CV | **No** (Mikel, D-18) | `/about` carries education, tools and roles instead; the application itself includes his CV |
| Project filter by discipline | **No** | 4 projects. Discipline tags appear on cards instead |
| Theme switch / dark mode | **No** | Direction A is a light print-like system; dark mode doubles the QA |
| Scroll progress bar | **No** | The case-study section index already shows position |
| Language switch | **No** | English only |
| Route transitions | **Deferred to Phase 4** | Only if they're cheap and don't delay content (motion spec) |
| Copy email button | **Yes** | Tiny and useful |
| Contact form | **No** | Needs a backend or third-party service for no gain over a mailto link |

## 5. User journeys

**Recruiter, ~30 seconds.** Lands on `/`. Reads name, role, headline and availability. Scans the 4 project cards (title, one-line summary, discipline tags, year). Opens one case study and reads the role block and hero render. Leaves with the email or LinkedIn.
→ *The role block and hero image must be visible without scrolling on the case-study page.*

**Admissions panel, 5–15 minutes.** Arrives from the link in the application. Reads `/about` (education, motivation, how I work). Reads 2–3 case studies in depth: research, decisions, reflection.
→ *Each case study needs a real Reflection section and readable long-form layout.*

**Engineer or designer at a company, deep dive.** Goes straight to development and specification sections: circuits, materials, regulations, LCA, manufacturing.
→ *The section index must let them jump straight to "05 Development" and "06 Specification".*

## 6. Homepage content order (detailed in `05-page-specifications.md`)

1. **Header**
2. **Hero:** name · role · headline · supporting line · availability · annotated Ardura render
3. **Selected work** (`id="work"`): 4 project rows/cards in flagship order
4. **Approach:** how concept → specification works in practice, in 3–4 short steps tied to real projects
5. **About (short):** 3–4 sentences + link to `/about`
6. **Footer / contact** (`id="contact"`)

**Areas of interest** (AI, robotics, automation, IoT) are not a separate homepage section. They appear on `/about` as interests, so they don't read as claimed skills (rule from `01-personal-brand.md` §6).

## 7. URL and naming rules

- Slugs are lowercase, hyphenated, and say what the project is: `seat-ateca-mirror`, not `pbl04`.
- Course codes (PBL3, PBL4…) appear only in the metadata block, never as titles.
- Page titles: `Ardura — Smart self-sufficient plant pot · Mikel Arnao`.

## Revision (2026-10-16, D-38–D-40) — proposed
- **New route `/work`**: all projects with filters (layout A "Spec index", spec in `05` Part D). Replaces "home as index" and removes the `/work → /#work` redirect.
- **Short entries** at `/work/[slug]` alongside case studies (`05` Part E).
- **Navigation:** Work (`/work`) · Lab (`/lab`, to be specified) · About, plus a compact copy-email button. The Contact link is removed; contact stays in the footer.
