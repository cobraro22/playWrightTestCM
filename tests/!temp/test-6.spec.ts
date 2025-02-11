import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/contact");
  // await page.locator('[data-test="nav-contact"]').click();
  // await page.locator('[data-test="first-name"]').click();
  await expect(page.locator('[data-test="first-name"]')).toBeVisible();
});
