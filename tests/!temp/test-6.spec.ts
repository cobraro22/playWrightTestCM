import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../../components/login";
import { credentials } from "../../data/locatori";

const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

test(
  "Login with POM with fixtures",
  { tag: "@login" },
  async ({ page, loginPage }) => {
    // const loginPage = new LoginPage(page);
    // await loginPage.goto();

    await page.goto("/auth/login");

    //   await loginPage.emailInput.fill("customer@practicesoftwaretesting.com");
    //   await loginPage.passwordInput.fill("welcome01");
    //   await loginPage.loginButton.click();

    const task1 = loginPage.login(credentials.user, credentials.password);
    const task2 = expect(page.getByTestId("nav-menu")).toContainText(
      "Jane Doe"
    );
    //   await loginPage.login(credentials.user, credentials.password);
    //   await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");

    await Promise.all([task1, task2]);
  }
);
