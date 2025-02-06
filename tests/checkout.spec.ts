import { test, expect } from "@playwright/test";

test.describe("suita de teste checkout", () => {
  test.use({ storageState: ".auth/customer01.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("checkout", async ({ page }) => {
    expect(page).toBeTruthy();
    await page.locator(".col-md-9").getByRole("link").first().click(); //.getByRole("link").first()
    await page.getByTestId("add-to-cart").click();
    await page.getByTestId("cart-quantity").click();
    await page.getByTestId("proceed-1").click();
  });
});
