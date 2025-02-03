import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.digi24.ro/");
  await page.getByRole("button", { name: "ACCEPT TOATE" }).click();
  await expect(
    page.getByRole("banner").getByRole("link").filter({ hasText: /^$/ })
  ).toBeVisible();
  await page.locator(".nav-btn").click();
  await expect(
    page.getByRole("banner").getByRole("button").filter({ hasText: /^$/ })
  ).toBeVisible();
  await page
    .getByRole("banner")
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .click();
  await expect(page.locator(".nav-btn")).toBeVisible();
});
