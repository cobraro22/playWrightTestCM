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
    await page.getByTestId("proceed-2").click();
    await page.getByPlaceholder("State *").fill('111')
    await page.getByPlaceholder("Your Postcode *").fill('A222')
    await page.getByTestId("proceed-3").click();
    await page.getByTestId("payment-method").selectOption('buy-now-pay-later');
    await page.getByTestId("monthly_installments").selectOption('3');    
    // await page.getByTestId("payment-method").selectOption('buy-now-pay-later')

    // await page.locator('[data-test="payment-method"]').selectOption('buy-now-pay-later');
    // await page.locator('[data-test="monthly_installments"]').selectOption('3');

    await page.getByTestId("finish").click()

    expect(page.locator(".help-block")).toHaveText('Payment was successful')
    // Payment was successful
  });
});
