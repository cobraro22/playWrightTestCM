import { test, expect } from "@playwright/test";

test.describe("prima suita", () => {
  test("testul1 ", { tag: ["@gone"] }, async ({ page }) => {
    await page.goto("/contact");
    // await expect(page.locator('[data-test="first_name"]')).toBeVisible();
    await expect(page.locator('[data-test="first-name"]')).toBeVisible();
    await expect(page.locator('[id="first_name"]')).toBeVisible();
    await expect(page.locator("//input[@id]").first()).toBeVisible();
    await expect(
      page.locator('[placeholder="Your first name *"]')
    ).toBeVisible();

    const locator = page.locator('[data-test="first-name"]');

    await expect(locator).toHaveAttribute("formcontrolname", "first_name");
  });
});
