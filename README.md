# Mikel Arnao — Portfolio

Personal portfolio of Mikel Arnao, Product Designer & Design Engineer.
Live: https://mikel-arnao-portfolio.vercel.app

Next.js 16 (App Router) · Payload CMS 3 at `/dashboard` · Postgres · TypeScript · Tailwind CSS v4 · GSAP · Lenis · Vercel.
All planning and decisions live in [`docs/portfolio/`](docs/portfolio/) — start with [`00-project-brief.md`](docs/portfolio/00-project-brief.md).

## Run it

Requires Node 20.9+ (developed on 24) and pnpm. Copy `.env.example` to `.env.local` and set a long random `PAYLOAD_SECRET`. The local database needs no account or install (embedded Postgres in `.embedded-pg/`, git-ignored; `pnpm db:dev --reset` wipes it).

```bash
pnpm install
pnpm db:dev         # local Postgres on port 5433; keep this terminal open
pnpm seed           # first time only: imports content/seed/ into the database
pnpm dev            # http://localhost:3000, dashboard at /dashboard
pnpm build          # production build (must pass before every push)
pnpm start          # serve the production build
```

Quality checks:

```bash
pnpm typecheck      # TypeScript (strict)
pnpm lint           # ESLint
pnpm format:check   # Prettier
pnpm test:a11y      # axe + smoke tests on every route (needs db:dev; seeds and builds against a separate test database)
pnpm check:placeholders   # lists Media marked as placeholder in the CMS
```

### Reduced motion

If your OS has reduced motion turned on (on Windows: Settings → Accessibility → Visual effects → Animation effects off), the site shows static versions. Add `?motion=on` to any URL to see the motion for that browser tab; `?motion=off` resets it.

## Content

All content is edited in the CMS at `/dashboard` (Payload; spec in [`16-cms-specification.md`](docs/portfolio/16-cms-specification.md)). Every claim must still trace to `docs/portfolio/09-content-and-assets.md` or the decision log `13-open-decisions.md`.

- **Projects:** case studies (sections built from media blocks) and short entries. Save as draft, publish when ready; only published projects reach the site. Pages update within seconds of publishing.
- **Lab entries**, **Media** (every image needs alt text; tick _placeholder_ for stand-ins), and the **Site**, **Homepage**, **About** and **Lab page** globals for the remaining text.
- **First login:** on a new database, `/dashboard` asks you to create the first user. There is no public sign-up; further users can only be added by a logged-in admin. Forgotten password: another admin resets it (email reset comes later).

The site reads content through `content/index.ts`, which maps Payload documents to the types in `content/types.ts`. After changing a collection or global in `cms/`, run `pnpm generate:types` and create a migration (`pnpm payload migrate:create <name>`) before deploying.

`content/seed/` holds the original typed content that `pnpm seed` imports. It is kept until the production database has been seeded and checked.

### Replace placeholder images

Originals stay in `projects info/` (never committed). Export web versions:

```bash
pnpm images:export "projects info/ardura" ardura
```

This writes `content/media/ardura/*.jpg` (max 2560 px, sRGB, ~85 quality). Upload them in `/dashboard` → Media with proper `alt` text, swap them into the project, and delete or untick the placeholder. Launch requires none left (`LAUNCH=1 pnpm check:placeholders` fails if any remain).

## Deploy

`main` deploys to production on Vercel automatically; every other branch gets a preview URL. The build runs database migrations first (`vercel.json`).

Environment variables (Vercel → Settings → Environment Variables):

| Variable                | Source                                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`              | Absolute production URL (canonical links, sitemap, Open Graph, CMS cookies)                                                                                  |
| `DATABASE_URL`          | Set automatically by the Neon integration (Vercel Marketplace)                                                                                               |
| `BLOB_READ_WRITE_TOKEN` | Set automatically when a Vercel Blob store is connected. The store must be **Public**: Payload cannot use private stores, and access cannot be changed later |
| `PAYLOAD_SECRET`        | A long random value you generate; never reuse the local one                                                                                                  |

Before pushing to `main`: `pnpm build && pnpm lint && pnpm test:a11y`, and `pnpm audit` for dependency advisories.

### Connect mikelarnao.com later

1. Vercel → Project → Settings → Domains → add `mikelarnao.com` and `www.mikelarnao.com`; follow the DNS records Vercel shows (at your domain registrar).
2. Set `www` to redirect to the apex (or the reverse) in the same screen.
3. Change `SITE_URL` to `https://mikelarnao.com` (Settings → Environment Variables) and redeploy.
4. Add a redirect from `mikel-arnao-portfolio.vercel.app` to the domain (Vercel → Domains → the `.vercel.app` entry → Redirect).

## Credits

- Process-grid and curtain motion adapted from "Sticky Grid Scroll" by Theo Plawinski (Codrops), MIT licence.
- Geist and Geist Mono by Vercel, SIL Open Font License.
- GSAP under the GSAP Standard "No Charge" licence; Lenis (MIT).
