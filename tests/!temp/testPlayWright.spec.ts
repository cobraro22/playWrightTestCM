import { test, expect } from "@playwright/test";

test("test1", async ({ page }) => {
  await page.goto("https://cnpgenerator.ro/");

  await expect(page).toHaveTitle(/Generator CNP/);

  await expect(
    page.getByRole("link", { name: "Validare CNP", exact: true })
  ).toBeVisible();

  await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
});

// test("test2", async ({ page }) => {});
