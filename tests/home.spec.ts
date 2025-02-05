import { test, expect } from "@playwright/test";

test("Home Page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("nav-sign-in")).toBeVisible();
  await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");

  await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

  //   const productNO = page.locator("container");
  //   await expect(productNO.getByRole("link")).toHaveCount(9);

  const productNO = page.locator(".col-md-9");

  await expect(productNO).toBeVisible();
  await expect(productNO.getByRole("link")).toHaveCount(9);
  await expect(productNO.locator(".page-link")).toHaveCount(7);
});
