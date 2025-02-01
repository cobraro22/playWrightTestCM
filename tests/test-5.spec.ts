import { test, expect } from "@playwright/test";

test("test", { tag: "@testulMeu6" }, async ({ page }) => {
  await page.goto("https://cnpgenerator.ro/");
  await page.getByLabel("Sex: *").selectOption("0");
  await page.getByRole("link", { name: "Validare CNP", exact: true }).click();
  await page.getByRole("button", { name: "Valideaza CNP" }).click();
  await page.getByRole("button", { name: "Valideaza CNP" }).click();
  await expect(page.getByPlaceholder("Introduceti CNP")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Verificare CNP - Validare Cod" })
  ).toBeVisible();
  await expect(page.locator("h1")).toContainText(
    "Verificare CNP - Validare Cod Numeric Personal"
  );
  await expect(page.locator("h1")).toMatchAriaSnapshot(
    `- heading "Verificare CNP - Validare Cod Numeric Personal" [level=1]`
  );
});
