import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Every route, with motion on and with reduced motion (11 §2: 0 axe violations).
const routes = [
  "/",
  "/work",
  "/lab",
  "/about",
  "/work/bira",
  "/work/ardura",
  "/work/seat-ateca-mirror",
  "/work/mercedes-vent-lca",
  "/work/orbea-cycle-dry",
  "/this-page-does-not-exist",
];

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test.describe(`motion: ${reducedMotion}`, () => {
    test.use({ reducedMotion });

    for (const route of routes) {
      test(`axe: ${route}`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState("load");
        // Let load sequences finish so hidden start states don't count.
        await page.waitForTimeout(1600);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        const summary = results.violations.map(
          (v) =>
            `${v.id} (${v.impact}): ${v.nodes.length} node(s) — ${v.nodes
              .slice(0, 3)
              .map((n) => n.target.join(" "))
              .join(" | ")}`,
        );
        expect(summary, summary.join("\n")).toEqual([]);
      });
    }
  });
}

test("skip link is the first focus stop and reaches main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("every page has exactly one h1", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1"), route).toHaveCount(1);
  }
});

test("unknown project slug returns 404", async ({ request }) => {
  const res = await request.get("/work/not-a-project");
  expect(res.status()).toBe(404);
});
