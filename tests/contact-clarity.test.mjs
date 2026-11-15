import test from "node:test";
import assert from "node:assert/strict";
import { siteConfig, confirmedBusinessWhatsapp } from "../src/data/config.js";
import { contactLinks } from "../src/utils/contact.js";
import { buildQuoteText, hasBudgetValue } from "../src/utils/quote.js";
import { solutions, features } from "../src/data/content.js";
import { translate } from "../src/data/translations.js";
test("Confirmed WhatsApp destination is exact and encoded briefing survives a URL round trip", () => {
  assert.equal(confirmedBusinessWhatsapp, "554197862547");
  assert.equal(siteConfig.whatsapp, confirmedBusinessWhatsapp);
  const text = "Projeto: João & ação + orçamento\n¿Diseño? #1";
  const url = new URL(contactLinks(siteConfig, text).whatsapp);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/554197862547");
  assert.equal(url.searchParams.get("text"), text);
  assert.ok(url.href.includes("%26"));
});
test("Briefing includes all selected scope, features, optional contact and separate available budgets in PT/ES", () => {
  for (const language of ["pt", "es"]) {
    const input = {
      selected: solutions.map((s) => s.id),
      features: features.map((f) => f.id),
      description: "Descrição de teste com requisitos & integrações.",
      allocations: {
        web: { initial: "1500", monthly: "75" },
        systems: { initial: "250", monthly: "25" },
      },
      name: "Nome de teste",
      contact: "pessoa@site.test",
      deadline: "deadline2",
    };
    const text = buildQuoteText(input, language);
    for (const s of solutions)
      assert.ok(text.includes(translate(s.title, language)));
    for (const f of features)
      assert.ok(text.includes(translate(f.title, language)));
    assert.ok(text.includes("Nome de teste"));
    assert.ok(text.includes(input.description));
    assert.ok(text.includes("1.750") || text.includes("1750"));
    assert.ok(text.includes("100,00"));
    assert.ok(!text.includes("undefined"));
    assert.ok(!text.includes("5541999999999"));
    assert.equal(
      new URL(contactLinks(siteConfig, text).whatsapp).searchParams.get("text"),
      text,
    );
  }
});
test("Missing optional fields do not invent a company, price or a monthly budget of zero", () => {
  for (const language of ["pt", "es"]) {
    const text = buildQuoteText(
      {
        selected: ["web"],
        features: [],
        description: "Uma necessidade descrita para avaliar.",
        allocations: { web: { initial: "500" } },
      },
      language,
    );
    assert.ok(text.includes(translate("notSpecified", language)));
    assert.ok(!text.includes("undefined"));
    assert.ok(!text.includes("[object Object]"));
    assert.ok(!text.includes("Empresa:"));
    assert.equal(
      hasBudgetValue(["web"], { web: { initial: "500" } }, "monthly"),
      false,
    );
    assert.equal(
      hasBudgetValue(["web"], { web: { monthly: "0" } }, "monthly"),
      true,
    );
  }
});
