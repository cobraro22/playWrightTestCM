import { test, expect } from "@playwright/test";

test("Login Test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  // await page.locator('[data-test="nav-sign-in"]').click(); // click pe locator

  // await page.getByRole("link", { name: "Sign in" }).click(); //  dupa tag input/button/link

  // await page.getByText("Sign in").click(); // dupa text

  // await page.getByLabel("nav-sign-in").click(); //dupa label

  await page.getByTestId("nav-sign-in").click();

  // await page.locator('[data-test="email"]').click();
  // await page.locator('[data-test="email"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");
  // await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("welcome01");
  // await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-contact"]')).toBeVisible();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jane Doe"
  );
});
