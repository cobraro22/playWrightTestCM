import { test, expect } from "@playwright/test";
import { locatori } from "../data/locatori";

test.describe("suita de teste DIGI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://digi24.ro");

    // await expect(page).toHaveTitle(/Digi24/);

    await page.getByRole("button", { name: "ACCEPT TOATE" }).click();
  });
  test.skip("verificare titlu", { tag: "@digi" }, async ({ page }) => {
    // await expect(page).toHaveTitle(/Digi24/);
  });
  test("verificare Sigla", { tag: "@digi" }, async ({ page }) => {
    const locator = page
      .getByRole("link", { name: locatori.numePolitica })
      .first();
    await expect(locator).toBeVisible();
  });

  test("verificare Iconita", { tag: "@digi" }, async ({ page }) => {
    await expect(page.locator(locatori.search)).toBeVisible();
  });
});
