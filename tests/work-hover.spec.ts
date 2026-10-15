import { expect, test, type Page } from "@playwright/test";

// Regression: the hover preview must stay in sync while the page scrolls under
// a still cursor (05 Part D5). Desktop pointers only.
const preview = (page: Page) =>
  page.evaluate(() => {
    const box = document.querySelector<HTMLElement>("[data-hover-preview]");
    if (!box) return { visible: false, slug: null as string | null };
    const visible =
      getComputedStyle(box).visibility !== "hidden" &&
      getComputedStyle(box).opacity !== "0";
    const img = [...box.querySelectorAll<HTMLElement>("[data-preview]")].find(
      (i) => getComputedStyle(i).opacity !== "0",
    );
    return { visible, slug: img?.dataset.preview ?? null };
  });

const rowUnder = (page: Page, x: number, y: number) =>
  page.evaluate(
    ([px, py]) =>
      document
        .elementFromPoint(px!, py!)
        ?.closest("[data-row]")
        ?.getAttribute("data-row") ?? null,
    [x, y],
  );

test("hover preview follows the row under a still cursor while scrolling", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop", "hover preview is desktop-only");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work");
  await page.waitForTimeout(1200);

  const first = page.locator("li[data-row='ardura'] a");
  await first.scrollIntoViewIfNeeded();
  const b = (await first.boundingBox())!;
  const x = b.x + 300;
  const y = b.y + b.height / 2;
  await page.mouse.move(x - 10, y);
  await page.mouse.move(x, y);
  await expect
    .poll(() => preview(page))
    .toEqual({ visible: true, slug: "ardura" });

  // Scroll by about two rows without moving the mouse.
  await page.mouse.wheel(0, 2 * b.height);
  await page.waitForTimeout(1200);
  const under = await rowUnder(page, x, y);
  expect(under).not.toBeNull();
  await expect
    .poll(() => preview(page))
    .toEqual({ visible: true, slug: under });

  // Moving off the list hides it.
  await page.mouse.move(x, 20);
  await expect.poll(async () => (await preview(page)).visible).toBe(false);
});
