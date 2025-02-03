import { test, expect } from "@playwright/test";
import { locatori } from "../data/locatori";
import { url } from "inspector";

test.describe("suita de teste DIGI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://digi24.ro");

    // await expect(page).toHaveTitle(/Digi24/);

    await page.getByRole("button", { name: "ACCEPT TOATE" }).click();
  });
  test("verificare titlu", { tag: "@digi" }, async ({ page }) => {
    await expect(page).toHaveTitle(/Digi24/);
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

  test("verificare URL", { tag: "@digi" }, async ({ page }) => {
    // await expect(page).toHaveURL(`^${locatori.URL}(\\?.*)?$`);
    expect(page.url()).toContain(locatori.URL);
  });
});
