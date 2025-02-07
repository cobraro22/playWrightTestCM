import { test as setup, expect } from "@playwright/test";

setup("create customer 01 auth", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer01AuthFile = ".auth/customer01.json";

  await page.goto("/auth/login");

  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await context.storageState({ path: customer01AuthFile });

  await context.close();
});
