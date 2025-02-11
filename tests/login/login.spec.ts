import { test, expect } from "@playwright/test";
import { LoginPage } from "../../components/login";
import { credentials } from "../../data/locatori";

test("Login with POM", { tag: "@login" }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  //   await loginPage.emailInput.fill("customer@practicesoftwaretesting.com");
  //   await loginPage.passwordInput.fill("welcome01");
  //   await loginPage.loginButton.click();

  const task1 = loginPage.login(credentials.user, credentials.password);
  const task2 = expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  //   await loginPage.login(credentials.user, credentials.password);
  //   await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");

  await Promise.all([task1, task2]);
});
