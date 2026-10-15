# Mikel Arnao — Portfolio

Personal portfolio of Mikel Arnao, Product Designer & Design Engineer.
Live: https://mikel-arnao-portfolio.vercel.app

Next.js 16 (App Router, fully static) · TypeScript · Tailwind CSS v4 · GSAP · Lenis · Vercel.
All planning and decisions live in [`docs/portfolio/`](docs/portfolio/) — start with [`00-project-brief.md`](docs/portfolio/00-project-brief.md).

## Run it

Requires Node 20.9+ (developed on 24) and pnpm.

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # production build (must pass before every push)
pnpm start          # serve the production build
```

Quality checks:

```bash
pnpm typecheck      # TypeScript (strict)
pnpm lint           # ESLint
pnpm format:check   # Prettier
pnpm test:a11y      # axe + smoke tests on every route (uses installed Chrome)
pnpm check:placeholders   # lists stand-in images still in use
```

### Reduced motion

If your OS has reduced motion turned on (on Windows: Settings → Accessibility → Visual effects → Animation effects off), the site shows static versions. Add `?motion=on` to any URL to see the motion for that browser tab; `?motion=off` resets it.

## Content

Each project is one typed file in `content/projects/` (data model: `content/types.ts`). Site-wide facts are in `content/site.ts`. Every claim must trace to `docs/portfolio/09-content-and-assets.md` or the decision log `13-open-decisions.md`.

### Add or edit a project

1. Copy an existing file in `content/projects/` and rename it (the filename doesn't matter; `slug` does).
2. Fill in every field. TypeScript fails the build if required fields are missing: `hero`, `cardImage`, `processTiles`, `myRole`, `summary` (≤ 160 characters), image `alt` text.
3. Register it in `content/index.ts` and set `order`.
4. `pnpm build`, check it locally, push.

The homepage, case-study page, sitemap and navigation pick it up automatically.

### Replace placeholder images

Originals stay in `projects info/` (never committed). Export web versions:

```bash
pnpm images:export "projects info/ardura" ardura
```

This writes `content/media/ardura/*.jpg` (max 2560 px, sRGB, ~85 quality). Then import them in the project file in place of `placeholders.*`, remove `placeholder: true`, and write proper `alt` text. `pnpm check:placeholders` shows what's left; launch requires none (`LAUNCH=1 pnpm check:placeholders` fails if any remain).

## Deploy

`main` deploys to production on Vercel automatically; every other branch gets a preview URL. The only environment variable is `SITE_URL` (absolute production URL, used for canonical links, sitemap and Open Graph).

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
