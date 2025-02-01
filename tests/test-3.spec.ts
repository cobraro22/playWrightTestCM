import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://cnpgenerator.ro/");
  await page.getByLabel("Sex: *").selectOption("0");
  await page.getByLabel("Data nașterii:").fill("1979-03-15");
});
