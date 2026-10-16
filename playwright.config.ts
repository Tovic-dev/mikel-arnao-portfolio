import { defineConfig, devices } from "@playwright/test";

// Accessibility and smoke checks (docs/portfolio/11 §2, 14 §5).
// Uses the locally installed Chrome (no browser download) against a production
// build of a separate, freshly seeded database (portfolio_test, 16 §8), so
// local edits in the dashboard never break the tests. Needs `pnpm db:dev`.
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3100",
    channel: "chrome",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], channel: "chrome" },
    },
  ],
  webServer: {
    command: "pnpm seed && pnpm build && pnpm exec next start --port 3100",
    url: "http://localhost:3100",
    env: {
      DATABASE_URI:
        "postgres://postgres:postgres@localhost:5433/portfolio_test",
    },
    reuseExistingServer: false,
    timeout: 600_000,
  },
});
