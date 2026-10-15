import { expect, test } from "@playwright/test";

// Lab page behaviour (05 Part G): type filter, lightbox, shareable entries.
const frames = (page: import("@playwright/test").Page) =>
  page.locator("li[data-frame]:not([hidden])");

test.describe("Lab page", () => {
  test("type filter narrows the sheet and is kept in the URL", async ({
    page,
  }) => {
    await page.goto("/lab");
    await expect(frames(page)).toHaveCount(6);
    await page.getByRole("button", { name: "Sketch", exact: true }).click();
    await expect(frames(page)).toHaveCount(2);
    await expect(page.getByText(/^2 entries$/)).toBeVisible();
    await expect(page).toHaveURL(/type=sketch/);
    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(frames(page)).toHaveCount(6);
  });

  test("lightbox opens, steps, closes with Escape and returns focus", async ({
    page,
  }) => {
    await page.goto("/lab");
    const opener = page.getByRole("button", {
      name: "Open L-006: Building this portfolio",
    });
    await opener.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading")).toHaveText(
      "Building this portfolio",
    );
    await expect(page).toHaveURL(/entry=L-006/);

    await dialog.getByRole("button", { name: "Next" }).click();
    await expect(dialog.getByRole("heading")).toHaveText("Material study");
    await expect(page).toHaveURL(/entry=L-005/);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page).not.toHaveURL(/entry=/);
    await expect(opener).toBeFocused();
  });

  test("a shared ?entry= link opens that entry", async ({ page }) => {
    await page.goto("/lab?entry=L-004");
    await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
      "Form sketches",
    );
  });

  test("nav Lab link is marked current", async ({ page }) => {
    await page.goto("/");
    const lab = page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Lab" });
    await lab.click();
    await expect(page).toHaveURL(/\/lab$/);
    await expect(lab).toHaveAttribute("aria-current", "page");
  });
});
