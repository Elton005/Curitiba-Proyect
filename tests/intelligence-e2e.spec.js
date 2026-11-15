import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile } from "node:fs/promises";
import { fullReportState } from "./intelligence-fixture.js";
import { analyticsDefaults } from "../src/utils/analyticsContext.js";
const tools = [
  ["hub", "/inteligencia/"],
  ["market", "/inteligencia/mercado/"],
  ["commercial", "/simulador/"],
  ["productivity", "/inteligencia/produtividade/"],
  ["investment", "/inteligencia/investimento/"],
  ["sectors", "/inteligencia/setores/"],
  ["report", "/inteligencia/relatorio/"],
];
async function setTheme(page, theme) {
  if ((await page.locator("html").getAttribute("data-theme")) !== theme)
    await page.locator(".theme-button").click();
}
async function seed(page, state = fullReportState()) {
  await page.goto("/inteligencia/");
  await page.evaluate(
    (state) =>
      sessionStorage.setItem("loop-intelligence-v1", JSON.stringify(state)),
    state,
  );
}
async function axe(page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
}

for (const [key, path] of tools.filter(([key]) => key !== "commercial"))
  for (const lang of ["pt", "es"])
    test(`Intelligence direct ${lang} ${key}: document, navigation, sources and no console errors`, async ({
      page,
      request,
    }) => {
      const route = (lang === "es" ? "/es" : "") + path,
        errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      const response = await request.get(route);
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain("<noscript><h1>");
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator(".int-tool-nav a")).toHaveCount(6);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        lang === "pt" ? "pt-BR" : "es",
      );
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      expect(errors).toEqual([]);
    });

test("Intelligence visitor journey: filtered CSV, productivity, confirmed cash replacement, report, locale, history and quote", async ({
  page,
}) => {
  await page.goto("/inteligencia/mercado/");
  await page.locator("#market-region").selectOption("south");
  await expect(page.locator("#market-size option")).toHaveCount(1);
  await expect(
    page.locator(".int-market-results .int-metric").first(),
  ).toContainText("59%");
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Baixar dados filtrados (CSV)" })
    .click();
  const download = await downloadPromise;
  const csv = await readFile(await download.path(), "utf8");
  expect(csv).toContain("Sul");
  expect(csv).toContain("B6");
  expect(csv).toContain("cetic.br");
  await page
    .getByRole("button", { name: "Adicionar ao relatório", exact: true })
    .click();
  await page
    .locator('.int-tool-nav a[href="/inteligencia/produtividade/"]')
    .click();
  await page.locator("#process-name").fill("PRIVATE PROCESS 123");
  await page.locator("#prod-tasks").fill("120");
  await page.locator("#prod-currentMinutes").fill("15");
  await page.locator("#prod-newMinutes").fill("5");
  await page.locator("#prod-adoption").fill("75");
  await page.locator("#prod-hourlyCost").fill("40");
  await expect(
    page.locator(".int-calculator-grid .int-metric").first(),
  ).toContainText("15 horas");
  await page
    .getByRole("button", { name: "Adicionar ao relatório", exact: true })
    .click();
  await page
    .locator('.int-tool-nav a[href="/inteligencia/investimento/"]')
    .click();
  await page.locator("#capacity-amount").fill("200");
  await expect(
    page.getByRole("button", { name: "Substituir benefício mensal" }),
  ).toBeDisabled();
  await page.locator("#capacity-confirm").check();
  await page
    .getByRole("button", { name: "Substituir benefício mensal" })
    .click();
  await expect(page.locator("#invest-benefit")).toHaveValue("200");
  await page.locator("#invest-recurring").fill("50");
  await page
    .getByRole("button", { name: "Adicionar ao relatório", exact: true })
    .click();
  await page.locator('.int-tool-nav a[href="/inteligencia/setores/"]').click();
  await page.locator("#sector-profile").selectOption("commerce");
  await page
    .locator('.int-tool-nav a[href="/inteligencia/relatorio/"]')
    .click();
  await expect(page.locator(".int-report-document")).toBeVisible();
  await expect(page.locator(".int-report-document")).toContainText("59%");
  await expect(page.locator(".int-report-document")).not.toContainText(
    "PRIVATE PROCESS",
  );
  await expect(page.locator(".int-report-document")).toContainText("3.200,00");
  await page.evaluate(() => {
    window.print = () => {
      window.printCalled = true;
    };
  });
  await page
    .getByRole("button", { name: "Imprimir / Salvar como PDF" })
    .click();
  expect(await page.evaluate(() => window.printCalled)).toBe(true);
  await page.getByRole("button", { name: "Español", exact: true }).click();
  await expect(page).toHaveURL(/\/es\/inteligencia\/relatorio\/$/);
  await expect(page.locator(".int-report-document")).toContainText("Informe");
  await setTheme(page, "light");
  await page.goBack();
  await expect(page).toHaveURL(/\/inteligencia\/relatorio\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/es\/inteligencia\/relatorio\/$/);
  await page.locator(".int-commercial-cta .button").click();
  await expect(page.locator("#project-description")).toHaveValue(
    /Contexto de mi informe/,
  );
  await expect(page.locator("#project-description")).toHaveValue(/59%/);
  await expect(page.locator(".quote-solution input:checked")).not.toHaveCount(
    0,
  );
  const state = await page.evaluate(() =>
    JSON.stringify({ ...sessionStorage }),
  );
  expect(state).not.toContain("PRIVATE PROCESS");
  expect(page.url()).not.toContain("?");
});

test("Advanced commercial scenarios are editable in three slots, support loss and preserve basic arithmetic", async ({
  page,
}) => {
  await page.goto("/simulador/");
  await expect(page.getByTestId("scenario-revenue")).toContainText("3.750,00");
  await page.getByRole("button", { name: "Avançado", exact: true }).click();
  await page.locator("#sim-variableCost").fill("400");
  await page.locator("#sim-acquisitionCost").fill("300");
  await page.locator("#sim-digitalCost").fill("150");
  await expect(page.locator(".int-metric.is-negative")).toHaveCount(2);
  for (const id of ["conservative", "base", "optimistic"]) {
    await page.locator("#commercial-slot").selectOption(id);
    await page
      .getByRole("button", { name: "Guardar cenário", exact: true })
      .click();
  }
  await expect(page.locator(".int-row-actions")).toHaveCount(3);
  await page.locator(".int-row-actions button").first().click();
  await page.locator("#sim-ticket").fill("500");
  await page
    .getByRole("button", { name: "Guardar cenário", exact: true })
    .click();
  await expect(page.locator(".int-row-actions")).toHaveCount(3);
  await page.reload();
  await expect(page.locator("#sim-ticket")).toHaveValue("500");
  await expect(page.locator(".int-row-actions")).toHaveCount(3);
  await page.locator("#sim-variableCost").fill("");
  await expect(page.locator(".simulator-results [role=alert]")).toBeVisible();
  await page.getByRole("button", { name: "Básico", exact: true }).click();
  await expect(page.getByTestId("scenario-revenue")).toContainText("7.500,00");
});

test("Productivity permits a slower process; investment handles negative benefits, zero initial and every horizon", async ({
  page,
}) => {
  await page.goto("/inteligencia/produtividade/");
  await page.locator("#prod-newMinutes").fill("20");
  await expect(page.locator(".int-notice.is-danger")).toContainText(
    "consome mais tempo",
  );
  await expect(page.locator(".int-metric.is-negative")).toHaveCount(2);
  await page.locator("#prod-adoption").fill("0");
  await expect(
    page.locator(".int-calculator-grid .int-metric").first(),
  ).toContainText("0 horas");
  await page.locator("#prod-tasks").fill("");
  await expect(page.locator("[role=alert]")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Adicionar ao relatório", exact: true }),
  ).toBeDisabled();
  await page.goto("/inteligencia/investimento/");
  await page.locator("#invest-benefit").fill("-50");
  await expect(page.locator(".int-calculator-grid")).toContainText(
    "Não há recuperação",
  );
  for (const n of ["6", "12", "24"]) {
    await page.locator("#invest-horizon").selectOption(n);
    await expect(page.locator(".int-table tbody tr")).toHaveCount(
      Number(n) + 1,
    );
  }
  await page.locator("#invest-initial").fill("0");
  await expect(page.locator(".int-calculator-grid")).toContainText(
    "Sem investimento inicial",
  );
  await expect(page.locator("body")).not.toContainText("Infinity");
});

test("Report is partial by default, rejects unsupported cross tabs and keeps sector statistics distinct", async ({
  page,
}) => {
  await page.goto("/inteligencia/relatorio/");
  await expect(page.locator(".int-report-document")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Imprimir / Salvar como PDF" }),
  ).toBeDisabled();
  const state = analyticsDefaults();
  state.market.filters = {
    indicatorId: "website",
    year: 2025,
    region: "south",
    size: "10-49",
    sector: "all",
  };
  await seed(page, state);
  await page.goto("/inteligencia/mercado/");
  await expect(page.locator(".int-market-results .int-empty")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Baixar dados filtrados (CSV)" }),
  ).toBeDisabled();
  await page.goto("/inteligencia/setores/");
  await page.locator("#sector-profile").selectOption("beauty");
  await expect(page.locator(".int-workspace")).toContainText(
    "Não há estatística isolada",
  );
  await expect(page.locator(".int-workspace")).not.toContainText("%");
  await page.goto("/inteligencia/relatorio/");
  await expect(page.locator(".int-report-document")).toBeVisible();
  await expect(page.locator(".int-module-list")).toContainText("Não avaliado");
  await expect(
    page.locator(".int-report-document .int-line-chart"),
  ).toHaveCount(0);
});

test("Analytics storage discards hostile fields, invalid versions and oversized payloads without crashing", async ({
  page,
}) => {
  const state = fullReportState();
  state.name = "PRIVATE CONTACT";
  state.productivity.processName = "PRIVATE PROCESS";
  await seed(page, state);
  await page.goto("/inteligencia/produtividade/");
  await page.locator("#prod-tasks").fill("121");
  const stored = await page.evaluate(() =>
    sessionStorage.getItem("loop-intelligence-v1"),
  );
  expect(stored).not.toContain("PRIVATE");
  await page.evaluate(() =>
    sessionStorage.setItem("loop-intelligence-v1", "x".repeat(40000)),
  );
  await page.reload();
  await expect(page.locator("#prod-tasks")).toHaveValue("120");
});

test("Completed diagnostic enters a partial report and storage denial keeps calculators usable", async ({
  page,
}) => {
  await page.goto("/diagnostico/");
  for (let step = 0; step < 8; step++) {
    await page.locator(".diagnostic-option").first().click();
    await page.locator(".diagnostic-buttons .button").last().click();
  }
  await page.goto("/inteligencia/relatorio/");
  await expect(page.locator(".int-report-document")).toContainText(
    "Loop Diagnóstico",
  );
  await expect(
    page.locator(".int-report-document .int-line-chart"),
  ).toHaveCount(0);
  await page.addInitScript(() =>
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("Storage denied");
      },
    }),
  );
  await page.goto("/inteligencia/produtividade/");
  await page.locator("#prod-tasks").fill("240");
  await expect(
    page.locator(".int-calculator-grid .int-metric").first(),
  ).toContainText("30 horas");
  await page
    .getByRole("button", { name: "Adicionar ao relatório", exact: true })
    .click();
  await expect(page.locator(".int-save-actions [role=status]")).toContainText(
    "Adicionado",
  );
});

for (const width of [360, 390, 430, 768, 1024, 1440, 1920])
  test(`Intelligence Visual ${width}px: seven surfaces PT dark / ES light, full report and no page overflow`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    await mkdir(".local/intelligence/responsive", { recursive: true });
    await seed(page);
    for (const lang of ["pt", "es"])
      for (const [key, path] of tools) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto((lang === "es" ? "/es" : "") + path);
        await setTheme(page, lang === "pt" ? "dark" : "light");
        if (key === "sectors")
          await page.locator("#sector-profile").selectOption("commerce");
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("h1")).toBeVisible();
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBe(width);
        await page.screenshot({
          path: `.local/intelligence/responsive/${key}-${lang}-${width}.png`,
          fullPage: true,
          animations: "disabled",
        });
      }
  });
for (const [key, path] of tools)
  test(`Intelligence Accessibility ${key}: both themes and locales with saved report`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    await seed(page);
    for (const lang of ["pt", "es"])
      for (const theme of ["dark", "light"]) {
        await page.setViewportSize({
          width: lang === "pt" ? 1440 : 390,
          height: 1000,
        });
        await page.goto((lang === "es" ? "/es" : "") + path);
        await setTheme(page, theme);
        await axe(page);
      }
  });
