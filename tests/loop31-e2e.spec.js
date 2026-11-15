import { test, expect } from "@playwright/test";
import { fullReportState } from "./intelligence-fixture.js";
test("Loop31 economic hypotheses require opt-in and disappear again on opt-out", async ({
  page,
}) => {
  await page.goto("/");
  const state = fullReportState();
  state.market.observationIds = [];
  state.sectorId = null;
  await page.evaluate((s) => {
    sessionStorage.setItem("loop-intelligence-v1", JSON.stringify(s));
    sessionStorage.setItem(
      "loop-project",
      JSON.stringify({
        selected: ["automation"],
        contexts: [{ kind: "intelligence", version: 1 }],
      }),
    );
  }, state);
  await page.goto("/orcamento/");
  await expect(page.locator("#project-description")).not.toHaveValue(/5\.000/);
  await page.locator(".quote-economics input").check();
  await expect(page.locator("#project-description")).toHaveValue(/5\.000/);
  await page.locator(".quote-economics input").uncheck();
  await expect(page.locator("#project-description")).not.toHaveValue(/5\.000/);
});
test("Loop31 sector assessment persists, targets a solution and transfers only declared needs", async ({
  page,
}) => {
  await page.goto("/inteligencia/setores/");
  await page.locator("#sector-profile").selectOption("home");
  for (let i = 0; i < 4; i++)
    await page
      .locator(`input[name="sector-home-q${i}"][value="${i === 0 ? 1 : 2}"]`)
      .check();
  await expect(page.locator(".sector-assessment-result")).toBeVisible();
  await expect(page.locator(".sector-assessment-result .button")).toHaveCount(
    1,
  );
  await page.reload();
  await expect(
    page.locator('input[name="sector-home-q0"][value="1"]'),
  ).toBeChecked();
  await page.locator(".sector-assessment-result .button").click();
  await expect(
    page.locator('.quote-solution input[value="web"]'),
  ).toBeChecked();
  await expect(page.locator("#project-description")).toHaveValue(/Recebimento/);
  await expect(page.locator(".quote-economics input")).not.toBeChecked();
  await page.goBack();
  await page
    .locator('.sector-assessment-result a[href="/solucoes/#web"]')
    .click();
  await expect(page.locator("#web")).toBeVisible();
});
test("Loop31 solutions demo changes filtered rows and sends chosen service to quote", async ({
  page,
}) => {
  await page.goto("/es/solucoes/");
  await page.locator("#demo-filter").selectOption("open");
  await expect(page.locator(".capability-demo li")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Completar agenda", exact: true })
    .click();
  await expect(page.locator(".capability-demo li")).toHaveCount(1);
  await page.locator("#systems .button-row .button").click();
  await expect(
    page.locator('.quote-solution input[value="systems"]'),
  ).toBeChecked();
});
test("Loop31 compact tool selector navigates with state and localized insights", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/es/inteligencia/produtividade/");
  await page.locator("#prod-newMinutes").fill("30");
  await expect(page.locator(".result-insights")).toContainText(
    "exige más tiempo",
  );
  await page.locator("#int-tool-selector").selectOption("investment");
  await expect(page).toHaveURL(/es\/inteligencia\/investimento/);
  await page.goBack();
  await expect(page.locator("#prod-newMinutes")).toHaveValue("30");
});
