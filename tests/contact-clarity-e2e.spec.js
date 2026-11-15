import { test, expect } from "@playwright/test";
test("Diagnostic inclusion is optional and removing it preserves the customer description", async ({
  page,
}) => {
  await page.goto("/diagnostico/");
  for (let step = 0; step < 8; step++) {
    await page.locator(".diagnostic-option").first().click();
    await page.locator(".diagnostic-buttons .button").last().click();
  }
  // A completed diagnosis is available even when arriving without its CTA.
  await page.goto("/orcamento/");
  await expect(
    page.locator(".quote-diagnostic-option input"),
  ).not.toBeChecked();
  await expect(page.locator("#project-description")).not.toHaveValue(
    /Loop Diagnóstico/,
  );
  await page.locator(".quote-diagnostic-option input").check();
  await expect(page.locator("#project-description")).toHaveValue(
    /Loop Diagnóstico/,
  );
  await page.goto("/diagnostico/");
  await page
    .locator(".diagnostic-result")
    .getByRole("link", {
      name: "Preparar uma conversa sobre o resultado",
      exact: true,
    })
    .click();
  const option = page.locator(".quote-diagnostic-option input"),
    description = page.locator("#project-description");
  await expect(option).toBeChecked();
  const initial = await description.inputValue();
  await description.fill(
    initial + "\nPreciso organizar o atendimento da minha equipe.",
  );
  await option.uncheck();
  await expect(description).toHaveValue(/Preciso organizar/);
  await expect(description).not.toHaveValue(/Loop Diagnóstico/);
  await page.locator(".quote-form button[type=submit]").click();
  const text = new URL(
    await page.locator(".whatsapp-button").getAttribute("href"),
  ).searchParams.get("text");
  expect(text).not.toContain("Loop Diagnóstico");
  expect(text).toContain("Preciso organizar");
  await option.check();
  await expect(description).toHaveValue(/Loop Diagnóstico/);
});
for (const language of ["pt", "es"])
  test(`WhatsApp ${language}: minimum validation, full structured briefing, copy fallback and manual handoff`, async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(language === "pt" ? "/orcamento/" : "/es/orcamento/");
    await expect(page.locator(".whatsapp-button")).toHaveCount(0);
    await page.locator(".quote-form button[type=submit]").click();
    await expect(page.locator("#quote-errors")).not.toBeEmpty();
    await page.locator(".quote-solution input[value=web]").check();
    await page
      .locator("#project-description")
      .fill(
        "Website & catálogo com descrição, integrações e requisitos claros.",
      );
    await page.locator(".feature-checkboxes input").first().check();
    await page.locator(".budget-planner summary").click();
    await page.locator("#budget-web-initial").fill("1200");
    await page.locator("#budget-web-monthly").fill("90");
    await page.locator(".voluntary-contact summary").click();
    await page.locator("#quote-name").fill("Nome de teste");
    await page.locator(".quote-form button[type=submit]").click();
    const summary = await page.locator(".generated-brief pre").innerText();
    const button = page.getByRole("link", {
      name:
        language === "pt"
          ? "Enviar projeto pelo WhatsApp"
          : "Enviar proyecto por WhatsApp",
      exact: true,
    });
    await expect(button).toBeVisible();
    await expect(button.locator("svg")).toBeVisible();
    const href = await button.getAttribute("href");
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe("https://wa.me/554197862547");
    expect(url.searchParams.get("text")).toBe(summary);
    expect(summary).toContain("Nome de teste");
    expect(summary).toMatch(/1\.?200/);
    expect(summary).toContain("90,00");
    expect(summary).not.toContain("undefined");
    await page
      .getByRole("button", {
        name: language === "pt" ? "Copiar resumo" : "Copiar resumen",
        exact: true,
      })
      .click();
    expect(
      (await page.evaluate(() => navigator.clipboard.readText())).replace(
        /\r\n/g,
        "\n",
      ),
    ).toBe(summary);
    await context.route("https://wa.me/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<title>Handoff intercepted for QA</title>",
      }),
    );
    const popupPromise = context.waitForEvent("page");
    await button.click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded");
    expect(popup.url()).toBe(href);
    await expect(
      page.locator(".generated-brief [role=status]"),
    ).not.toContainText(language === "pt" ? "enviado" : "enviado");
    await popup.close();
    await page.locator("#project-description").fill("");
    await expect(page.locator(".whatsapp-button")).toHaveCount(0);
  });
