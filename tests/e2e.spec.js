import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile, mkdir } from "node:fs/promises";

const routes = [
  ["home", "/", "/es/", "Sites", "Sitios"],
  ["projects", "/projetos/", "/es/projetos/", "Projetos", "Proyectos"],
  [
    "diagnostic",
    "/diagnostico/",
    "/es/diagnostico/",
    "Loop Diagnóstico",
    "Loop Diagnóstico",
  ],
  ["simulator", "/simulador/", "/es/simulador/", "Simulador", "Simulador"],
  ["quote", "/orcamento/", "/es/orcamento/", "Orçamento", "Presupuesto"],
];
async function images(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) => {
        img.loading = "eager";
        return img.decode().catch(() => {});
      }),
    );
  });
}
async function theme(page, target) {
  if ((await page.locator("html").getAttribute("data-theme")) !== target)
    await page.locator(".theme-button").click();
}
async function finishDiagnostic(page, value = 0) {
  for (let step = 0; step < 8; step++) {
    await page.locator(".diagnostic-option").nth(value).click();
    await page.locator(".diagnostic-buttons .button").last().click();
  }
}
async function noAxeViolations(page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
}

for (const [key, pt, es, titlePt, titleEs] of routes)
  for (const [language, path, title] of [
    ["pt", pt, titlePt],
    ["es", es, titleEs],
  ])
    test(`Direct ${path}: independent document, locale, metadata, dark default and local assets`, async ({
      page,
      request,
    }) => {
      const errors = [],
        external = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("request", (req) => {
        if (!["127.0.0.1", "localhost"].includes(new URL(req.url()).hostname))
          external.push(req.url());
      });
      const htmlResponse = await request.get(path);
      expect(htmlResponse.status()).toBe(200);
      const html = await htmlResponse.text();
      expect(html).toContain(`lang="${language === "pt" ? "pt-BR" : "es"}"`);
      expect(html).toContain('data-theme="dark"');
      expect(html).toContain(title);
      await page.goto(path);
      await expect(page).toHaveURL(new RegExp(path + "$"));
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        language === "pt" ? "pt-BR" : "es",
      );
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expect(page).toHaveTitle(new RegExp(title));
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        "content",
        language === "pt" ? "pt_BR" : "es_ES",
      );
      if (key !== "home") {
        await expect(page.locator(".breadcrumbs")).toBeVisible();
        await expect(page.locator(".hero")).toHaveCount(0);
      } else {
        await expect(
          page.locator(".diagnostic-panel,.simulator-panel,.quote-form"),
        ).toHaveCount(0);
        await expect(page.locator(".tools-grid>article")).toHaveCount(3);
      }
      await images(page);
      expect(
        await page
          .locator("img")
          .evaluateAll((list) =>
            list.every((img) => img.complete && img.naturalWidth > 0),
          ),
      ).toBe(true);
      expect(external).toEqual([]);
      expect(errors).toEqual([]);
      expect(
        await page
          .locator('a[href*="wa.me"]')
          .evaluateAll((links) =>
            links.every(
              (link) => new URL(link.href).pathname === "/554197862547",
            ),
          ),
      ).toBe(true);
      await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    });

test("Services transfer across documents, reload and backward/forward without losing newer choices", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".solution-web .round-link").click();
  await expect(page).toHaveURL(/\/orcamento\/$/);
  await expect(
    page.locator('.quote-solution input[value="web"]'),
  ).toBeChecked();
  await page.locator(".quote-solution").nth(1).click();
  await page.reload();
  await expect(page.locator(".quote-solution input:checked")).toHaveCount(2);
  await page.goBack();
  if (!new URL(page.url()).pathname.endsWith("/orcamento/"))
    await expect(page.locator(".hero")).toBeVisible();
  else await page.locator(".brand").first().click();
  await page.locator(".solution-mobile .round-link").click();
  await expect(page.locator(".quote-solution input:checked")).toHaveCount(3);
  await page.goBack();
  await expect(page.locator(".hero")).toBeVisible();
  await page.goForward();
  await expect(page.locator(".quote-solution input:checked")).toHaveCount(3);
});

test("Diagnostic validates and transfers anonymous answers, services and localized recommendations to the quote", async ({
  page,
}) => {
  await page.goto("/diagnostico/");
  await page.locator(".diagnostic-buttons .button").last().click();
  await expect(page.locator(".diagnostic-question")).toContainText(
    "Selecione uma resposta",
  );
  await page.locator(".diagnostic-option").first().click();
  await page.locator(".diagnostic-buttons .button").last().click();
  await page.locator(".diagnostic-buttons .button").first().click();
  await expect(page.locator(".diagnostic-option input").first()).toBeChecked();
  await finishDiagnostic(page);
  await expect(page.locator(".diagnostic-result-title")).toHaveText(
    "Presença inicial",
  );
  await expect(page.locator(".recommendation-list>li")).toHaveCount(3);
  await page
    .getByRole("link", { name: "Preparar uma conversa sobre o resultado" })
    .click();
  await expect(page).toHaveURL(/\/orcamento\/$/);
  await expect(page.locator(".quote-solution input:checked")).toHaveCount(3);
  await expect(page.locator("#project-description")).toHaveValue(
    /Presença inicial/,
  );
  await page.getByRole("button", { name: "Español", exact: true }).click();
  await expect(page).toHaveURL(/\/es\/orcamento\/$/);
  await expect(page.locator("#project-description")).toHaveValue(
    /Presencia inicial/,
  );
  await expect(page.locator("#project-description")).not.toHaveValue(
    /Presença inicial/,
  );
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await page.goBack();
  await expect(page).toHaveURL(/\/diagnostico\/$/);
  await expect(page.locator(".diagnostic-result-title")).toHaveText(
    "Presença inicial",
  );
  await page.reload();
  await expect(page.locator(".diagnostic-result-title")).toHaveText(
    "Presença inicial",
  );
  await page.getByRole("button", { name: "Refazer diagnóstico" }).click();
  await expect(page.locator(".diagnostic-option input:checked")).toHaveCount(0);
});

test("Completed diagnostic state survives an in-place locale switch and returns valid optimization priorities", async ({
  page,
}) => {
  await page.goto("/es/diagnostico/");
  await finishDiagnostic(page, 2);
  await expect(page.locator(".diagnostic-result-title")).toHaveText(
    "Buena base digital",
  );
  await expect(
    page.locator(".diagnostic-findings>div").first().locator("li"),
  ).toHaveCount(8);
  await page.getByRole("button", { name: "Português brasileiro" }).click();
  await expect(page).toHaveURL(/\/diagnostico\/$/);
  await expect(page.locator(".diagnostic-result-title")).toHaveText(
    "Boa base digital",
  );
  await expect(page.locator(".recommendation-list>li")).toHaveCount(3);
  await page.locator(".diagnostic-result .formula-details summary").click();
  await expect(
    page.locator(".diagnostic-result .formula-details"),
  ).toContainText("Não é auditoria técnica");
});

test("Simulator validates arithmetic, fractional limits, zero and persists its illustrative context", async ({
  page,
}) => {
  await page.goto("/simulador/");
  await expect(page.getByTestId("scenario-revenue")).toContainText("3.750,00");
  await expect(page.getByTestId("scenario-difference")).toContainText(
    "1.250,00",
  );
  await page.locator("#sim-inquiries").fill("200");
  await expect(page.getByTestId("scenario-revenue")).toContainText("7.500,00");
  await page.locator("#sim-conversion").fill("100");
  await expect(page.locator("#sim-conversionGain")).toHaveValue("0");
  await expect(page.getByTestId("scenario-revenue")).toContainText("62.500,00");
  await page.locator("#sim-conversion").fill("99.9");
  await page.locator("#sim-conversionGain").press("End");
  expect(
    Number(await page.locator("#sim-conversionGain").inputValue()),
  ).toBeCloseTo(0.1, 5);
  await expect(page.getByTestId("scenario-revenue")).toContainText("62.500,00");
  await page.locator("#sim-inquiries").fill("0");
  await expect(page.getByTestId("scenario-revenue")).toContainText("0,00");
  await page.locator("#sim-ticket").fill("-1");
  await expect(page.locator('.simulator-results [role="alert"]')).toBeVisible();
  await page.locator("#sim-ticket").fill("250");
  await expect(page.locator("#sim-inquiries")).toHaveValue("0");
  await page.locator("#sim-inquiries").fill("200");
  await page.reload();
  await expect(page.locator("#sim-inquiries")).toHaveValue("200");
  await page.getByRole("button", { name: "Español", exact: true }).click();
  await expect(page.locator("#sim-inquiries")).toHaveValue("200");
  await page
    .getByRole("link", { name: "Preparar mi proyecto", exact: true })
    .click();
  await expect(page).toHaveURL(/\/es\/orcamento\/$/);
  await page.locator(".quote-economics input").check();
  await expect(page.locator("#project-description")).toHaveValue(
    /No representa una previsión/,
  );
  await expect(
    page.locator('.quote-solution input[value="business"]'),
  ).toBeChecked();
});

test("Quote totals, optional contact validation, locale history, real clipboard/download and private fields", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const outgoing = [];
  page.on("request", (request) => {
    if (["POST", "PUT", "PATCH"].includes(request.method()))
      outgoing.push(request.url());
  });
  await page.goto("/orcamento/");
  await page.getByRole("button", { name: "Gerar resumo do projeto" }).click();
  await expect(page.locator("#quote-errors")).toContainText(
    "Selecione ao menos",
  );
  await page.locator(".quote-solution").nth(0).click();
  await page.locator(".quote-solution").nth(1).click();
  await page
    .locator("#project-description")
    .fill("Texto livre de teste sobre um projeto institucional acessível.");
  await page.locator(".feature-checkboxes input").first().check();
  await page.locator(".budget-planner summary").click();
  for (const [id, value] of [
    ["web-initial", "1000"],
    ["web-monthly", "100"],
    ["systems-initial", "2000"],
    ["systems-monthly", "50"],
  ])
    await page.locator("#budget-" + id).fill(value);
  await expect(page.getByTestId("budget-initial-total")).toContainText(
    "3.000,00",
  );
  await expect(page.getByTestId("budget-monthly-total")).toContainText(
    "150,00",
  );
  await page.locator("#project-deadline").selectOption("deadline2");
  await page.locator(".voluntary-contact summary").click();
  await page.locator("#quote-name").fill("Nome reservado teste");
  await page.locator("#quote-contact").fill("incompleto");
  await page.getByRole("button", { name: "Gerar resumo do projeto" }).click();
  await expect(page.locator("#quote-errors")).toContainText(
    "e-mail ou telefone válido",
  );
  await page.locator("#quote-contact").fill("teste@site.test");
  await page.getByRole("button", { name: "Gerar resumo do projeto" }).click();
  await page
    .getByRole("button", { name: "Copiar resumo", exact: true })
    .click();
  await expect(page.locator('.generated-brief [role="status"]')).toHaveText(
    "Resumo copiado.",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "3.000,00",
  );
  const pending = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Baixar resumo (.txt)", exact: true })
    .click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("loop-avante-briefing-pt.txt");
  expect(await readFile(await download.path(), "utf8")).toContain(
    "1 a 3 meses",
  );
  await page.getByRole("button", { name: "Español", exact: true }).click();
  await expect(page.locator("#quote-name")).toHaveValue("Nome reservado teste");
  await expect(page.locator("#quote-contact")).toHaveValue("teste@site.test");
  await expect(page.locator("#project-description")).toHaveValue(/Texto livre/);
  await expect(page.locator(".generated-brief pre")).toContainText(
    "Sitios web y landing pages",
  );
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  const stored = await page.evaluate(() =>
    JSON.stringify({ ...localStorage, ...sessionStorage }),
  );
  expect(stored).not.toContain("Nome reservado");
  expect(stored).not.toContain("teste@site.test");
  expect(stored).not.toContain("Texto livre");
  expect(outgoing).toEqual([]);
  await page.reload();
  await expect(page.locator(".quote-solution input:checked")).toHaveCount(2);
  await expect(page.getByTestId("budget-initial-total")).toContainText(
    "3.000,00",
  );
  await page.locator(".voluntary-contact summary").click();
  await expect(page.locator("#quote-name")).toHaveValue("");
  await expect(page.locator("#project-description")).toHaveValue("");
});

test("App CTA transfers access request without inventing a store link or download", async ({
  page,
}) => {
  await page.goto("/es/");
  await page
    .getByRole("link", { name: "Solicitar información de acceso" })
    .click();
  await expect(page).toHaveURL(/\/es\/orcamento\/$/);
  await expect(page.locator("#project-description")).toHaveValue(
    /disponibilidad de acceso/,
  );
  await expect(
    page.locator('.quote-solution input[value="mobile"]'),
  ).toBeChecked();
  await expect(
    page.locator(
      'a[href*="play.google.com"],a[href*="apps.apple.com"],a[href$=".apk"]',
    ),
  ).toHaveCount(0);
});

test("Mobile menu, Escape, page navigation and cross-page anchors work with history", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es/diagnostico/");
  const menu = page.locator(".menu-button");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".main-nav a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .locator(".main-nav")
    .getByRole("link", { name: "Soluciones", exact: true })
    .click();
  await expect(page).toHaveURL(/\/es\/solucoes\/$/);
  await expect(page.locator("h1")).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/\/es\/diagnostico\/$/);
  await page.getByRole("button", { name: "Português brasileiro" }).click();
  await expect(page).toHaveURL(/\/diagnostico\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/es\/diagnostico\/$/);
  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});

test("Corrupted anonymous session data is rejected without crashing forms or recommendations", async ({
  page,
}) => {
  await page.addInitScript(() => {
    sessionStorage.setItem(
      "loop-project",
      JSON.stringify({
        selected: ["unknown", "web", "web"],
        contexts: [
          { kind: "diagnostic", answers: { web: 99 } },
          { kind: "app", name: "should not appear" },
        ],
      }),
    );
    sessionStorage.setItem("loop-diagnostic-answers", "{bad json");
    sessionStorage.setItem("loop-diagnostic-step", "999");
    sessionStorage.setItem(
      "loop-quote-options",
      JSON.stringify({
        features: ["bad"],
        deadline: "bad",
        allocations: { web: { initial: -10 } },
      }),
    );
  });
  await page.goto("/orcamento/");
  await expect(page.locator(".quote-solution input:checked")).toHaveCount(1);
  await expect(page.locator("#project-description")).toHaveValue(
    /aplicativo Loop Avante/,
  );
  await expect(page.locator(".feature-checkboxes input:checked")).toHaveCount(
    0,
  );
  await expect(page.locator("#project-deadline")).toHaveValue("noDeadline");
  await page.goto("/diagnostico/");
  await expect(page.locator(".diagnostic-progress")).toContainText(
    "Pergunta 1 de 8",
  );
});

test("Unknown pages return HTTP 404 with localized UI; trailing slash redirects preserve the route", async ({
  page,
  request,
}) => {
  for (const [path, text, home] of [
    ["/caminho-inexistente", "Esse caminho ainda não existe.", "/"],
    ["/es/ruta-inexistente", "Este camino todavía no existe.", "/es/"],
  ]) {
    const response = await page.goto(path);
    expect(response.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText(text);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex,follow",
    );
    await page
      .getByRole("link", {
        name: home === "/" ? "Voltar ao início" : "Volver al inicio",
        exact: true,
      })
      .first()
      .click();
    await expect(page).toHaveURL("http://127.0.0.1:5173" + home);
  }
  for (const path of ["/projetos", "/es/simulador"]) {
    const response = await request.get(path, {
      maxRedirects: 0,
      headers: { Accept: "text/html" },
    });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(path + "/");
  }
});

for (const width of [390, 768, 1440])
  test(`Visual ${width}px: all five pages, PT dark and ES light, no overflow or missing images`, async ({
    page,
  }) => {
    await mkdir(".local/review/captures", { recursive: true });
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [key, pt, es] of routes)
      for (const [lang, path, mode] of [
        ["pt", pt, "dark"],
        ["es", es, "light"],
      ]) {
        await page.goto(path);
        await theme(page, mode);
        await images(page);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBe(width);
        expect(
          await page
            .locator("img")
            .evaluateAll((list) =>
              list.every((img) => img.complete && img.naturalWidth > 0),
            ),
        ).toBe(true);
        await page.screenshot({
          path: `.local/review/captures/${key}-${width}-${lang}-${mode}.png`,
          fullPage: true,
          animations: "disabled",
        });
        await page.screenshot({
          path: `.local/review/captures/${key}-${width}-${lang}-${mode}-viewport.png`,
          animations: "disabled",
        });
      }
    expect(errors).toEqual([]);
  });

for (const [key, pt, es] of routes)
  test(`Accessibility ${key}: PT dark/light desktop and ES dark/light mobile`, async ({
    page,
  }) => {
    for (const [path, mode, width] of [
      [pt, "dark", 1440],
      [pt, "light", 1440],
      [es, "dark", 390],
      [es, "light", 768],
    ]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(path);
      await theme(page, mode);
      await images(page);
      await noAxeViolations(page);
    }
  });

test("Diagnostic result and generated briefing are accessible and keep declared answers in the tab session only", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto("/diagnostico/");
  await finishDiagnostic(page);
  await noAxeViolations(page);
  await page.screenshot({
    path: ".local/review/diagnostic-result.png",
    fullPage: true,
  });
  await page
    .getByRole("link", { name: "Preparar uma conversa sobre o resultado" })
    .click();
  await page.getByRole("button", { name: "Gerar resumo do projeto" }).click();
  await expect(page.locator(".generated-brief")).toBeVisible();
  await noAxeViolations(page);
  expect(await page.evaluate(() => Object.keys(localStorage).sort())).toEqual([
    "loop-language",
    "loop-theme",
  ]);
  await page.screenshot({
    path: ".local/review/quote-generated.png",
    fullPage: true,
  });
});

test("A failed tool module offers a localized retry and recovers after the connection returns", async ({
  page,
}) => {
  const module = "**/src/sections/DigitalDiagnostic.jsx*";
  await page.route(module, (route) => route.abort("failed"));
  await page.goto("/es/diagnostico/");
  await expect(page.getByRole("alert")).toContainText(
    "No se pudo abrir esta herramienta.",
  );
  await page.unroute(module);
  await page.getByRole("button", { name: "Intentar de nuevo" }).click();
  await expect(page.locator(".diagnostic-question")).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
});
