import test from "node:test";
import assert from "node:assert/strict";
import { resultInsights } from "../src/utils/resultInsights.js";
import {
  sectorQuestions,
  evaluateSectorAssessment,
  sanitizeSectorAssessment,
} from "../src/data/intelligence/sectorAssessment.js";
import {
  calculateProductivity,
  productivityDefaults,
  calculateInvestment,
  investmentDefaults,
  calculateCommercialAdvanced,
  commercialDefaults,
} from "../src/utils/intelligenceCalculations.js";
import { translate } from "../src/data/translations.js";
test("Unrepresentable ROI is not described as a zero initial investment", () => {
  const result = calculateInvestment({
    ...investmentDefaults,
    initial: Number.MIN_VALUE,
    benefit: 10000000,
    recurring: 0,
  });
  assert.equal(result.roiPercent, null);
  for (const lang of ["pt", "es"])
    assert.match(
      translate(resultInsights("investment", result).points[0], lang),
      /represent/,
    );
});
test("Insights describe zero, loss, non-applicable ROI and adoption without promises in both languages", () => {
  for (const [kind, result, inputs] of [
    [
      "commercial",
      calculateCommercialAdvanced({ ...commercialDefaults, inquiries: 0 }),
      {},
    ],
    [
      "commercial",
      calculateCommercialAdvanced({
        ...commercialDefaults,
        variableCost: 1000,
      }),
      {},
    ],
    [
      "productivity",
      calculateProductivity({ ...productivityDefaults, newMinutes: 40 }),
      productivityDefaults,
    ],
    [
      "productivity",
      calculateProductivity({ ...productivityDefaults, adoption: 0 }),
      { adoption: 0 },
    ],
    [
      "investment",
      calculateInvestment({ ...investmentDefaults, initial: 0 }),
      {},
    ],
    [
      "investment",
      calculateInvestment({ ...investmentDefaults, benefit: -100 }),
      {},
    ],
  ]) {
    const insight = resultInsights(kind, result, inputs);
    assert.ok(insight.points.length >= 2);
    for (const lang of ["pt", "es"])
      for (const text of [insight.title, insight.cta, ...insight.points])
        assert.ok(translate(text, lang).length > 5);
  }
  assert.equal(resultInsights("investment", null), null);
});
test("Sector assessment covers seven profiles and every answer pattern without arbitrary scores or undeclared gaps", () => {
  for (const sectorId of [
    "commerce",
    "food",
    "beauty",
    "home",
    "construction",
    "professional",
    "other",
  ]) {
    const questions = sectorQuestions(sectorId);
    assert.equal(questions.length, 4);
    for (let n = 0; n < 81; n++) {
      const answers = Object.fromEntries(
        questions.map((q, i) => [q.id, Math.floor(n / 3 ** i) % 3]),
      );
      const r = evaluateSectorAssessment({ sectorId, answers });
      assert.equal(
        r.strengths.length + r.opportunities.length + r.unknown.length,
        4,
      );
      assert.ok(r.priorities.length <= 3);
      assert.ok(r.priorities.every((q) => answers[q.id] === 1));
      assert.equal("score" in r, false);
    }
  }
  assert.equal(
    evaluateSectorAssessment({ sectorId: "commerce", answers: { q0: 1 } }),
    null,
  );
  assert.deepEqual(
    sanitizeSectorAssessment({
      sectorId: "commerce",
      answers: { q0: 1, q1: "PRIVATE" },
      name: "PRIVATE",
    }),
    { sectorId: "commerce", answers: { q0: 1 } },
  );
});
