import { test, expect } from "@playwright/test";

test.describe("Home Page suite test with No auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("visual testing NoAuth", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("homeNoAuth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check SignIN", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toBeVisible();
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("check Web Title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("check count page", async ({ page }) => {
    const productNO = page.locator(".col-md-9");

    await expect(productNO).toBeVisible();

    //#region  locator assert vs value assert

    await expect(productNO.getByRole("link")).toHaveCount(9);
    expect(await productNO.getByRole("link").count()).toBe(9);

    await expect(productNO.locator(".page-link")).toHaveCount(7);
    expect(await productNO.locator(".page-link").count()).toBe(7);

    //#endregion
  });

  test("check search", async ({ page }) => {
    const productNO = page.locator(".col-md-9");

    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productNO.getByRole("link")).toHaveCount(1);
    await expect(productNO.getByAltText("Thor Hammer")).toBeVisible();

    //#endregion
  });
});

test.describe("Home page suite with auth01", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await page.goto("http://practicesoftwaretesting.com");
  });
  test("visual testing Auth", async ({ page }) => {
    await expect(page).toHaveScreenshot("homeWithAuth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });

    // await expect(page).toHaveScreenshot("homeNoAuth.png", {
    //   mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    // });
  });

  test("check sign in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
  });
});
