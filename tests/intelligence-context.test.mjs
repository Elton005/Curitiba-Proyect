import test from "node:test";
import assert from "node:assert/strict";
import {
  analyticsDefaults,
  sanitizeAnalytics,
  ANALYTICS_LIMIT,
  legacyAnalytics,
  readAnalytics,
  updateAnalytics,
} from "../src/utils/analyticsContext.js";
import {
  buildIntelligenceReport,
  analyticBrief,
} from "../src/utils/intelligenceReport.js";
import { observations } from "../src/data/intelligence/market.js";
import { pages, pageHref, resolvePage } from "../src/data/pages.js";
import { mergeProject, sanitizeProject } from "../src/utils/projectContext.js";
import { diagnosticQuestions } from "../src/data/diagnostic.js";
import {
  calculatePotential,
  simulationDefaults,
} from "../src/utils/simulator.js";
test("The preserved basic calculator rejects nonnumeric coercions and malformed containers", () => {
  for (const input of [null, undefined, [], true, "100"])
    assert.equal(calculatePotential(input), null);
  for (const value of [" ", true, false, [], [10], {}, NaN, Infinity])
    assert.equal(
      calculatePotential({ ...simulationDefaults, inquiries: value }),
      null,
    );
  assert.ok(calculatePotential({ ...simulationDefaults, inquiries: "0" }));
});

test("Every intelligence route is independent in both languages, with a single commercial URL", () => {
  for (const key of [
    "intelligence",
    "market",
    "productivity",
    "investment",
    "sectors",
    "report",
    "simulator",
  ])
    for (const lang of ["pt", "es"])
      assert.deepEqual(resolvePage(pageHref(key, lang)), {
        page: key,
        language: lang,
      });
  assert.equal(Object.keys(pages).length, 14);
  assert.equal(resolvePage("/inteligencia/comercial/").page, null);
});
test("Report preserves each E2C variable definition despite a shared official table URL", () => {
  const state = analyticsDefaults();
  state.market.observationIds = observations
    .filter((r) => r.region === "all" && r.size === "all" && r.sector === "all")
    .map((r) => r.id);
  const report = buildIntelligenceReport(state);
  assert.equal(report.sources.length, 7);
  for (const id of ["salesWebsite", "salesMessaging", "salesSocial"])
    assert.ok(
      report.sources.some((s) => s.id === id && s.definition.pt.length > 30),
    );
});
test("Default and unfinished modules do not fabricate report results; partial reports contain only chosen modules", () => {
  const state = analyticsDefaults();
  let report = buildIntelligenceReport(state);
  assert.deepEqual(report.modulesUsed, []);
  assert.equal(report.commercial, null);
  assert.equal(report.productivity, null);
  assert.equal(report.investment, null);
  assert.equal(analyticBrief(state, "es"), "");
  state.market.observationIds = [observations[0].id];
  report = buildIntelligenceReport(state);
  assert.deepEqual(report.modulesUsed, ["market"]);
  assert.equal(report.sources.length, 1);
  assert.equal(report.investment, null);
  state.productivity.saved = true;
  assert.deepEqual(buildIntelligenceReport(state).modulesUsed, [
    "market",
    "productivity",
  ]);
  state.productivity.inputs.tasks = "";
  assert.equal(buildIntelligenceReport(state).productivity, null);
});
test("Anonymous context strips contact, process names, free text and unknown IDs, bounds storage and scenario slots", () => {
  const state = analyticsDefaults();
  state.name = "PERSON_SECRET";
  state.productivity.processName = "PROCESS_SECRET";
  state.productivity.inputs.email = "EMAIL_SECRET";
  state.market.observationIds = [
    observations[0].id,
    observations[0].id,
    "fake",
  ];
  state.sectorId = "fake";
  state.recommendedSolutions = ["web", "fake"];
  state.commercial.scenarios = Array.from({ length: 9 }, (_, i) => ({
    id: ["conservative", "base", "optimistic"][i % 3],
    name: "PRIVATE",
    inputs: { ...state.commercial.inputs, name: "PRIVATE" },
    mode: "advanced",
  }));
  const result = sanitizeAnalytics(state),
    text = JSON.stringify(result);
  assert.ok(!/SECRET|PRIVATE|fake/.test(text));
  assert.equal(result.commercial.scenarios.length, 3);
  assert.equal(result.market.observationIds.length, 1);
  assert.deepEqual(result.recommendedSolutions, ["web"]);
  assert.deepEqual(
    sanitizeAnalytics({ ...state, unused: "x".repeat(ANALYTICS_LIMIT) }),
    analyticsDefaults(),
  );
  assert.deepEqual(sanitizeAnalytics({ version: 2 }), analyticsDefaults());
});
test("Capacity is imported only with explicit confirmation, a finite bounded amount and replacement equality", () => {
  const state = analyticsDefaults();
  state.productivity.saved = true;
  for (const imported of [
    { amount: 100 },
    { confirmed: true, amount: Infinity },
    { confirmed: true, amount: -1 },
    { confirmed: true, amount: 10000 },
  ]) {
    state.investment.capacityImport = imported;
    assert.equal(sanitizeAnalytics(state).investment.capacityImport, null);
  }
  state.investment.inputs.benefit = 100;
  state.investment.capacityImport = { confirmed: true, amount: 100 };
  assert.deepEqual(sanitizeAnalytics(state).investment.capacityImport, {
    confirmed: true,
    amount: 100,
  });
  state.investment.inputs.benefit = 101;
  assert.equal(sanitizeAnalytics(state).investment.capacityImport, null);
});
test("Saved advanced scenarios, diagnostic references and quotation transfer are localized and do not copy arbitrary text", () => {
  const state = analyticsDefaults();
  state.sectorId = "commerce";
  state.commercial.mode = "advanced";
  state.commercial.saved = true;
  state.commercial.scenarios = [
    {
      id: "base",
      inputs: state.commercial.inputs,
      mode: "advanced",
      name: "PRIVATE",
    },
  ];
  state.productivity.saved = true;
  state.investment.saved = true;
  const answers = Object.fromEntries(diagnosticQuestions.map((q) => [q.id, 0]));
  const report = buildIntelligenceReport(state, answers);
  assert.deepEqual(report.modulesUsed, [
    "commercial",
    "productivity",
    "investment",
    "sector",
    "diagnostic",
  ]);
  assert.ok(report.recommendations.length <= 3);
  assert.ok(report.commercial.result.nextContribution !== undefined);
  assert.match(
    analyticBrief(state, "es", answers),
    /No representa una previsión/,
  );
  assert.match(analyticBrief(state, "pt", answers), /não é economia de caixa/);
  assert.ok(!analyticBrief(state, "es", answers).includes("PRIVATE"));
  const project = mergeProject(
    { selected: ["mobile"], contexts: [] },
    report.recommendations.map((r) => r.solution),
    { kind: "intelligence", version: 1, name: "PRIVATE" },
  );
  assert.ok(project.selected.includes("mobile"));
  assert.deepEqual(project.contexts, [{ kind: "intelligence", version: 1 }]);
  assert.deepEqual(sanitizeProject(project), project);
});
test("Migration preserves legacy simulator hypotheses and only completed diagnostics; corrupt storage recovers", () => {
  const store = new Map();
  globalThis.sessionStorage = { getItem: (key) => store.get(key) ?? null };
  try {
    let state = legacyAnalytics();
    assert.equal(state.commercial.saved, false);
    store.set("loop-simulation", JSON.stringify({ inquiries: "345" }));
    state = legacyAnalytics();
    assert.equal(state.commercial.inputs.inquiries, "345");
    assert.equal(state.commercial.saved, false);
    store.set(
      "loop-project",
      JSON.stringify({
        contexts: [{ kind: "simulator", inputs: state.commercial.inputs }],
      }),
    );
    assert.equal(legacyAnalytics().commercial.saved, true);
    store.set("loop-intelligence-v1", "{bad");
    assert.equal(readAnalytics().commercial.inputs.inquiries, "345");
    store.set("loop-intelligence-v1", JSON.stringify({ version: 99 }));
    assert.deepEqual(readAnalytics(), analyticsDefaults());
    const next = updateAnalytics(analyticsDefaults(), (draft) => {
      draft.investment.inputs.benefit = -50;
      return draft;
    });
    assert.equal(next.investment.inputs.benefit, -50);
  } finally {
    delete globalThis.sessionStorage;
  }
});
