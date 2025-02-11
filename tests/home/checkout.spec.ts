import { test, expect } from "@playwright/test";
import * as fs from "fs";

test.describe("suita de teste checkout", () => {
  // test.use({ storageState: ".auth/customer01.json" });

  test.beforeEach(async ({ page, request }) => {
    const APIurl = "https://api.practicesoftwaretesting.com";
    const response = await request.post(APIurl + "/users/login", {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
      },
    });

    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const customer01AuthFile = ".auth/customer01.json";

    await page.goto("/auth/login");

    await page.getByTestId("email").fill(email);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-submit").click();

    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
    await page.goto("/");
  });

  test("checkout", async ({ page, request }) => {
    expect(page).toBeTruthy();
    await page.locator(".col-md-9").getByRole("link").first().click(); //.getByRole("link").first()
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("quantity")).toHaveValue("1");
    await page.getByTestId("cart-quantity").click();
    await expect(page.getByTestId("product-quantity")).toHaveValue("1");
    await expect(page.getByTestId("product-quantity")).toHaveAttribute(
      "type",
      "number"
    );
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();

    await page.getByPlaceholder("State *").fill("111");
    await page.getByPlaceholder("Your Postcode *").fill("A222");
    await page.getByTestId("proceed-3").click();
    expect(page.getByTestId("finish")).toBeDisabled();
    await page.getByTestId("payment-method").selectOption("buy-now-pay-later");
    expect(page.getByTestId("finish")).toBeEnabled();
    await page.getByTestId("monthly_installments").selectOption("3");
    // await page.getByTestId("payment-method").selectOption('buy-now-pay-later')

    // await page.locator('[data-test="payment-method"]').selectOption('buy-now-pay-later');
    // await page.locator('[data-test="monthly_installments"]').selectOption('3');

    await page.getByTestId("finish").click();

    await expect(
      page.locator(".help-block", { hasText: "Payment was successful" })
    ).toBeVisible();
    await page.getByTestId("finish").click();

    //     const text = await page.locator('.title').evaluate(el => el.textContent?.trim());
    // console.log(text);

    const invoiceNO = await page
      .locator('//div[@id="order-confirmation"]//span')
      .evaluate((el) => el.textContent?.trim());
    console.log(invoiceNO);

    const APIurl = "https://api.practicesoftwaretesting.com";
    // const reponse = await request.get(APIurl + "/invoices?page=1");
    // expect(reponse.status()).toBe(200);

    // const APIurl = "https://api.practicesoftwaretesting.com";
    // const response = await request.get(APIurl + "/products");
    // expect(response.status()).toBe(200);
    // expect(response.statusText()).toBe("OK");

    // Payment was successful
  });
});
