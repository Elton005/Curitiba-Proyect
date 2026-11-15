import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  calculatePotential,
  simulationDefaults,
} from "../src/utils/simulator.js";
import { evaluateDiagnostic } from "../src/utils/diagnostic.js";
import { diagnosticQuestions } from "../src/data/diagnostic.js";
import { calculateQuoteBudget, buildQuoteText } from "../src/utils/quote.js";
import {
  validatePublicConfig,
  contactLinks,
  isValidOptionalContact,
} from "../src/utils/contact.js";
import { seoPlugin } from "../scripts/seo-plugin.js";
import { pages, pageHref, resolvePage } from "../src/data/pages.js";
import {
  sanitizeProject,
  mergeProject,
  projectSeed,
  sanitizeAnswers,
  sanitizeQuoteOptions,
  sanitizeSimulation,
} from "../src/utils/projectContext.js";
import { messages, translate } from "../src/data/translations.js";
import * as content from "../src/data/content.js";
import * as diagnosticContent from "../src/data/diagnostic.js";
import * as market from "../src/data/market.js";

test("Illustrative scenarios use inquiries, conversion in percent, and BRL ticket", () => {
  const result = calculatePotential(simulationDefaults);
  assert.equal(result.currentSales, 10);
  assert.equal(result.currentRevenue, 2500);
  assert.equal(result.nextInquiries, 125);
  assert.equal(result.nextConversion, 12);
  assert.equal(result.nextSales, 15);
  assert.equal(result.nextRevenue, 3750);
  assert.equal(result.difference, 1250);
  assert.equal(result.percentDifference, 50);
});
test("A zero baseline has no invalid percentage division", () => {
  const result = calculatePotential({ ...simulationDefaults, conversion: 0 });
  assert.equal(result.currentRevenue, 0);
  assert.equal(result.percentDifference, null);
  assert.equal(result.nextRevenue, 625);
  assert.equal(
    calculatePotential({ ...simulationDefaults, inquiries: 0 }).nextRevenue,
    0,
  );
});
test("Reject invalid, empty, infinite, negative, or out-of-bounds simulation inputs", () => {
  for (const patch of [
    { inquiries: -1 },
    { ticket: -1 },
    { conversion: 101 },
    { growth: 101 },
    { conversion: 99, conversionGain: 2 },
    { ticket: Infinity },
    { inquiries: NaN },
    { conversion: "" },
    { inquiries: null },
    { ticket: 10000001 },
  ])
    assert.equal(calculatePotential({ ...simulationDefaults, ...patch }), null);
  assert.equal(
    calculatePotential({
      ...simulationDefaults,
      conversion: 100,
      conversionGain: 0,
    }).nextSales,
    125,
  );
});
test("Fractional expectations remain mathematical means, not rounded sales", () => {
  const result = calculatePotential({
    inquiries: 15,
    conversion: 3,
    ticket: 123.45,
    growth: 0,
    conversionGain: 0,
  });
  assert.ok(Math.abs(result.currentSales - 0.45) < 1e-10);
  assert.ok(Math.abs(result.currentRevenue - 55.5525) < 1e-8);
  assert.equal(result.difference, 0);
});
test("Diagnostic rejects incomplete and unknown answers", () => {
  assert.equal(evaluateDiagnostic({}), null);
  const answers = Object.fromEntries(diagnosticQuestions.map((q) => [q.id, 0]));
  assert.equal(evaluateDiagnostic({ ...answers, web: 3 }), null);
  assert.equal(evaluateDiagnostic({ ...answers, web: "0" }), null);
});
test("Diagnostic covers all 6,561 possible complete response patterns with three unique recommendations", () => {
  const categories = new Set();
  for (let pattern = 0; pattern < 3 ** 8; pattern++) {
    let code = pattern;
    const answers = Object.fromEntries(
      diagnosticQuestions.map((q) => {
        const value = code % 3;
        code = Math.floor(code / 3);
        return [q.id, value];
      }),
    );
    const result = evaluateDiagnostic(answers);
    assert.ok(result);
    assert.equal(result.priorities.length, 3);
    assert.equal(new Set(result.priorities.map((p) => p.id)).size, 3);
    assert.equal(result.strengths.length + result.opportunities.length, 8);
    assert.ok(
      result.priorities.every((p) =>
        content.solutions.some((s) => s.id === p.solution),
      ),
    );
    categories.add(result.category);
  }
  assert.deepEqual([...categories].sort(), [
    "developing",
    "initial",
    "optimize",
    "solid",
  ]);
});
test("Declared gaps set diagnostic priorities deterministically", () => {
  const answers = Object.fromEntries(diagnosticQuestions.map((q) => [q.id, 0]));
  assert.deepEqual(
    evaluateDiagnostic(answers).priorities.map((p) => p.id),
    ["web", "leads", "quotes"],
  );
  const solid = Object.fromEntries(diagnosticQuestions.map((q) => [q.id, 2]));
  assert.equal(evaluateDiagnostic(solid).category, "solid");
  assert.equal(evaluateDiagnostic(solid).strengths.length, 8);
  assert.deepEqual(
    evaluateDiagnostic(solid).priorities.map((p) => p.id),
    ["review", "connect", "learn"],
  );
  assert.equal(
    evaluateDiagnostic(
      Object.fromEntries(diagnosticQuestions.map((q) => [q.id, 1])),
    ).category,
    "optimize",
  );
});
test("Budget totals sum only selected services and separate one-time from monthly amounts", () => {
  const values = {
    web: { initial: "1000.50", monthly: "100" },
    systems: { initial: "2000", monthly: "50.25" },
    mobile: { initial: "99999" },
  };
  assert.deepEqual(calculateQuoteBudget(["web", "systems"], values), {
    initial: 3000.5,
    monthly: 150.25,
    provided: true,
  });
  assert.deepEqual(calculateQuoteBudget(["systems"], values), {
    initial: 2000,
    monthly: 50.25,
    provided: true,
  });
  assert.deepEqual(calculateQuoteBudget(["web"], {}), {
    initial: 0,
    monthly: 0,
    provided: false,
  });
  assert.equal(calculateQuoteBudget(["web"], { web: { initial: -1 } }), null);
});
test("Generated briefing reflects selected scope, optional fields and current locale", () => {
  const data = {
    selected: ["web"],
    description: "Projeto de website institucional acessível.",
    features: ["forms"],
    allocations: { web: { initial: "500", monthly: "50" } },
    deadline: "deadline2",
    name: "Nome de teste",
    contact: "",
  };
  const pt = buildQuoteText(data, "pt"),
    es = buildQuoteText(data, "es");
  assert.ok(pt.includes("Websites & Landing Pages"));
  assert.ok(es.includes("Sitios web y landing pages"));
  assert.ok(es.includes("No son precios de los servicios"));
  assert.ok(pt.includes("Nome de teste"));
  assert.ok(!pt.includes("undefined"));
  assert.ok(!pt.includes("5541999999999"));
});
test("Public configuration has no defaults and rejects unsafe or legacy placeholders", () => {
  assert.deepEqual(validatePublicConfig(), {
    origin: "",
    whatsapp: "",
    email: "",
    appDownload: "",
  });
  assert.equal(
    validatePublicConfig({ whatsapp: "5541999999999" }).whatsapp,
    "",
  );
  assert.equal(
    validatePublicConfig({
      origin: "javascript:alert(1)",
      appDownload: "http://unsafe.invalid",
      email: "a@example.com",
    }).origin,
    "",
  );
  assert.equal(
    validatePublicConfig({ email: "person@site.test?bcc=target@other.test" })
      .email,
    "",
  );
  assert.equal(contactLinks(validatePublicConfig(), "text").whatsapp, "");
  const links = contactLinks(
    { whatsapp: "5511987654321", email: "test@site.test" },
    "Olá & bienvenido\nsecond line",
  );
  assert.ok(links.whatsapp.includes("%26"));
  assert.ok(links.email.includes("%0A"));
});
test("Every UI and content entry has complete PT and ES translations", () => {
  let entries = 0;
  function visit(value) {
    if (!value || typeof value !== "object") return;
    if ("pt" in value || "es" in value) {
      assert.equal(typeof value.pt, "string");
      assert.equal(typeof value.es, "string");
      assert.ok(value.pt.trim());
      assert.ok(value.es.trim());
      entries++;
      return;
    }
    Object.values(value).forEach(visit);
  }
  [messages, content, diagnosticContent, market].forEach(visit);
  assert.ok(entries > 250);
  assert.throws(
    () => translate("untranslated-key", "es"),
    /Missing translation/,
  );
});
test("Portfolio corrections preserve mobile storage, navigation and Intelligence calculators", async () => {
  // The earlier mission expected mobile/ not to exist. Mobile 2.0 and these
  // portfolio edits are now authorized; protect the current untouched sources.
  const baseline = JSON.parse(
    await readFile(
      "docs/audit/portfolio-premium/protected-source-baseline.json",
      "utf8",
    ),
  );
  assert.ok(baseline.length >= 30);
  const hasMobile = existsSync("mobile");
  for (const entry of baseline) {
    if (entry.path.startsWith("mobile/") && !hasMobile) continue;
    // Git may check out the same text with LF or CRLF on different systems.
    const source = (await readFile(entry.path, "utf8")).replace(/\r\n/g, "\n");
    const hashes = [source, source.replace(/\n/g, "\r\n")].map((text) =>
      createHash("sha256").update(text).digest("hex").toLowerCase(),
    );
    assert.ok(hashes.includes(entry.sha256), entry.path);
  }
});

test("Optional contact accepts empty values, email and international phone; rejects incomplete input", () => {
  assert.equal(isValidOptionalContact(""), true);
  assert.equal(isValidOptionalContact("person@site.test"), true);
  assert.equal(isValidOptionalContact("+55 (41) 98765-4321"), true);
  assert.equal(isValidOptionalContact("incompleto"), false);
  assert.equal(isValidOptionalContact("a@b"), false);
  assert.equal(isValidOptionalContact("123"), false);
});
test("SEO emits no invented origin and enables localized canonical and sitemap only when configured", () => {
  const blank = seoPlugin({});
  const files = [];
  blank.generateBundle.call({ emitFile: (file) => files.push(file) });
  assert.equal(files.length, 1);
  assert.equal(files[0].fileName, "robots.txt");
  assert.ok(!files[0].source.includes("Sitemap:"));
  const configured = seoPlugin({ VITE_SITE_ORIGIN: "https://loop.test" });
  const enabled = [];
  configured.generateBundle.call({ emitFile: (file) => enabled.push(file) });
  assert.ok(
    enabled.some(
      (file) =>
        file.fileName === "sitemap.xml" &&
        file.source.includes("https://loop.test/es/"),
    ),
  );
  const html = configured.transformIndexHtml("<head></head>", {
    filename: "D:\\site\\es\\index.html",
  });
  assert.ok(html.includes('rel="canonical" href="https://loop.test/es/"'));
  assert.ok(html.includes('hreflang="pt-BR"'));
  assert.equal(
    configured.transformIndexHtml("<head></head>", { filename: "404.html" }),
    "<head></head>",
  );
});
test("Locally served font is a real WOFF2 file rather than a renamed static TTF", async () => {
  const font = await readFile("public/fonts/plus-jakarta-sans-latin.woff2");
  assert.equal(font.subarray(0, 4).toString(), "wOF2");
  assert.ok(
    (await readFile("public/fonts/OFL.txt", "utf8")).includes(
      "SIL OPEN FONT LICENSE",
    ),
  );
});

test("Independent routes resolve both languages and preserve the counterpart page", () => {
  const expected = [
    ["home", "/", "/es/"],
    ["projects", "/projetos/", "/es/projetos/"],
    ["diagnostic", "/diagnostico/", "/es/diagnostico/"],
    ["simulator", "/simulador/", "/es/simulador/"],
    ["quote", "/orcamento/", "/es/orcamento/"],
  ];
  for (const [key, pt, es] of expected) {
    assert.equal(pageHref(key, "pt"), pt);
    assert.equal(pageHref(key, "es"), es);
    assert.deepEqual(resolvePage(pt), { page: key, language: "pt" });
    assert.deepEqual(resolvePage(es + "index.html"), {
      page: key,
      language: "es",
    });
  }
  assert.equal(resolvePage("/unknown/").page, null);
  assert.equal(resolvePage("/es/unknown/").language, "es");
  assert.equal(resolvePage("/%zz").page, null);
  assert.equal(pageHref("home", "es", "solucoes"), "/es/#solucoes");
});
test("Workflow context merges services without duplicating requests or storing arbitrary personal data", () => {
  let project = mergeProject(
    { selected: ["web"], contexts: [] },
    ["systems", "web"],
    { kind: "app", name: "private", contact: "private" },
  );
  project = mergeProject(project, ["mobile"], { kind: "app" });
  assert.deepEqual(project.selected, ["web", "systems", "mobile"]);
  assert.deepEqual(project.contexts, [{ kind: "app" }]);
  assert.ok(!JSON.stringify(project).includes("private"));
  assert.deepEqual(
    sanitizeProject({
      selected: ["web", "unknown", "web"],
      contexts: [{ kind: "diagnostic", answers: { web: 9 } }],
    }),
    { selected: ["web"], contexts: [] },
  );
});
test("Diagnostic transfer is deterministic and is retranslated from anonymous answers", () => {
  const answers = Object.fromEntries(diagnosticQuestions.map((q) => [q.id, 0]));
  const project = mergeProject({}, ["web", "systems", "business"], {
    kind: "diagnostic",
    answers,
  });
  assert.ok(projectSeed(project, "pt").includes("Presença inicial"));
  assert.ok(projectSeed(project, "es").includes("Presencia inicial"));
  assert.ok(!projectSeed(project, "es").includes("Presença inicial"));
  assert.deepEqual(sanitizeAnswers({ web: 2, local: 3, other: 1 }), { web: 2 });
});
test("Session quote options accept only known anonymous fields and valid budget amounts", () => {
  assert.deepEqual(
    sanitizeQuoteOptions({
      name: "private",
      contact: "private",
      description: "private",
      features: ["forms", "forms", "bad"],
      deadline: "bad",
      allocations: { web: { initial: -1, monthly: 50 } },
    }),
    {
      features: ["forms"],
      allocations: { web: { initial: "", monthly: "50" } },
      deadline: "noDeadline",
    },
  );
});
test("Every route has a localized source document, dark startup and page-specific SEO", async () => {
  const configured = seoPlugin({ VITE_SITE_ORIGIN: "https://loop.test" });
  const files = [];
  configured.generateBundle.call({ emitFile: (file) => files.push(file) });
  assert.equal(
    (
      files
        .find((file) => file.fileName === "sitemap.xml")
        .source.match(/<url>/g) || []
    ).length,
    28,
  );
  for (const [key, page] of Object.entries(pages))
    for (const lang of ["pt", "es"]) {
      const path = "." + pageHref(key, lang) + "index.html";
      const html = await readFile(path, "utf8");
      assert.ok(html.includes(page.title[lang]));
      assert.ok(html.includes('data-theme="dark"'));
      assert.ok(!html.includes("fonts.googleapis.com"));
      const result = configured.transformIndexHtml("<head></head>", {
        filename: "D:/site/" + pageHref(key, lang).slice(1) + "index.html",
      });
      assert.ok(
        result.includes(
          `rel="canonical" href="https://loop.test${pageHref(key, lang)}"`,
        ),
      );
      assert.ok(
        result.includes(
          `hreflang="es" href="https://loop.test${pageHref(key, "es")}"`,
        ),
      );
    }
});

test("Editing one invalid simulator field preserves the other hypotheses until corrected", () => {
  const draft = sanitizeSimulation({
    ...simulationDefaults,
    inquiries: 200,
    ticket: "-1",
  });
  assert.equal(draft.inquiries, 200);
  assert.equal(draft.ticket, "-1");
  assert.equal(calculatePotential(draft), null);
  assert.equal(calculatePotential({ ...draft, ticket: 250 }).nextRevenue, 7500);
});
