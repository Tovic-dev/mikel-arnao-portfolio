import { expect, test } from "@playwright/test";

// Work page behaviour (05 Part D): filters, counts, URL state, views.
const visibleRows = (page: import("@playwright/test").Page) =>
  page.locator("ol > li[data-item]:not([hidden])");

test.describe("Work page", () => {
  test("lists every project and links to each page", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByText(/^Showing \d+ of \d+ projects/)).toHaveText(
      /Showing 7 of 7 projects/,
    );
    await expect(visibleRows(page)).toHaveCount(7);
    await page.getByRole("link", { name: /BIRA/ }).first().click();
    await expect(page).toHaveURL(/\/work\/bira$/);
    await expect(page.locator("h1")).toHaveText("BIRA");
  });

  test("field filter narrows the list and is kept in the URL", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/work");
    if (isMobile) await page.getByText(/^Filters/).click();
    const scope = isMobile ? page.locator("details") : page.locator("body");
    await scope.getByRole("button", { name: /^Sustainability/ }).click();
    await expect(page.getByText(/^Showing \d+ of \d+ projects/)).toHaveText(
      /Showing 3 of 7 projects/,
    );
    await expect(visibleRows(page)).toHaveCount(3);
    await expect(page).toHaveURL(/field=sustainability/);

    // Context AND field: company + sustainability = BIRA only.
    await scope.getByRole("button", { name: "With a company" }).click();
    await expect(page.getByText(/^Showing \d+ of \d+ projects/)).toHaveText(
      /Showing 1 of 7 projects/,
    );
    await expect(page).toHaveURL(/context=company/);

    await page.getByRole("button", { name: "Clear filters" }).first().click();
    await expect(page.getByText(/^Showing \d+ of \d+ projects/)).toHaveText(
      /Showing 7 of 7 projects/,
    );
    await expect(page).toHaveURL(/\/work$/);
  });

  test("filters and view are restored from a shared URL", async ({ page }) => {
    await page.goto("/work?field=research&view=grid");
    await expect(page.getByText(/^Showing \d+ of \d+ projects/)).toHaveText(
      /Showing 2 of 7 projects/,
    );
    await expect(page.getByRole("button", { name: "Grid" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator("ol > li[data-item]:not([hidden])")).toHaveCount(
      2,
    );
  });

  test("view toggle switches between list and grid", async ({ page }) => {
    await page.goto("/work");
    await page.getByRole("button", { name: "Grid" }).click();
    await expect(page).toHaveURL(/view=grid/);
    await expect(page.locator("ol.grid")).toBeVisible();
    await page.getByRole("button", { name: "List" }).click();
    await expect(page).not.toHaveURL(/view=grid/);
  });

  test("nav Work link goes to /work and is marked current", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Work" })
      .click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(
      page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "Work" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
