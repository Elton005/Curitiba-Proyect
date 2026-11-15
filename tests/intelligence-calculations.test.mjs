import test from "node:test";
import assert from "node:assert/strict";
import {
  calculatePotential,
  simulationDefaults,
} from "../src/utils/simulator.js";
import {
  calculateCommercialAdvanced,
  commercialDefaults,
  commercialSensitivity,
  sanitizeCommercialScenarios,
  calculateProductivity,
  productivityDefaults,
  calculateInvestment,
  investmentDefaults,
} from "../src/utils/intelligenceCalculations.js";

const close = (actual, expected, tolerance = 1e-8) =>
  assert.ok(
    Math.abs(actual - expected) < tolerance,
    `${actual} != ${expected}`,
  );

test("Advanced commercial model preserves every basic result and separates revenue, variable cost and contribution", () => {
  const basic = calculatePotential(simulationDefaults);
  const result = calculateCommercialAdvanced(commercialDefaults);
  for (const key of Object.keys(basic)) assert.equal(result[key], basic[key]);
  assert.equal(result.currentRevenue, 2500);
  assert.equal(result.nextRevenue, 3750);
  assert.equal(result.unitContribution, 150);
  assert.equal(result.currentVariableCosts, 1000);
  assert.equal(result.nextVariableCosts, 1500);
  assert.equal(result.currentContribution, 1200);
  assert.equal(result.nextContribution, 1800);
  assert.equal(result.contributionDifference, 600);
  assert.equal(result.contributionPercentDifference, 50);
  assert.equal(
    result.nextRevenue - result.nextTotalCosts,
    result.nextContribution,
  );
  assert.ok(!("advertisingRoi" in result));
});

test("Commercial cost can exceed ticket and produce a loss without being mistaken for revenue", () => {
  const result = calculateCommercialAdvanced({
    ...commercialDefaults,
    variableCost: 350,
  });
  assert.equal(result.currentRevenue, 2500);
  assert.equal(result.unitContribution, -100);
  assert.equal(result.currentContribution, -1300);
  assert.equal(result.nextContribution, -1950);
  assert.equal(result.contributionPercentDifference, null);
});

test("Zero commercial base and zero ticket have explicit non-applicable ratios", () => {
  const result = calculateCommercialAdvanced({
    ...commercialDefaults,
    inquiries: 0,
    acquisitionCost: 0,
  });
  assert.equal(result.percentDifference, null);
  assert.equal(result.contributionPercentDifference, null);
  assert.equal(result.currentContributionMarginPercent, null);
  assert.equal(result.nextContribution, -150);
  const zeroTicket = calculateCommercialAdvanced({
    ...commercialDefaults,
    ticket: 0,
  });
  assert.equal(zeroTicket.nextRevenue, 0);
  assert.equal(zeroTicket.nextContributionMarginPercent, null);
});

test("Advanced commercial inputs reject empty, malformed, non-finite, negative costs and conversion above 100%", () => {
  for (const patch of [
    { variableCost: -1 },
    { acquisitionCost: "" },
    { digitalCost: Infinity },
    { ticket: " " },
    { inquiries: true },
    { growth: [] },
    { conversion: 99, conversionGain: 2 },
    { variableCost: 10000001 },
  ]) {
    assert.equal(
      calculateCommercialAdvanced({ ...commercialDefaults, ...patch }),
      null,
      JSON.stringify(patch),
    );
  }
  assert.equal(calculateCommercialAdvanced(null), null);
  assert.equal(
    calculateCommercialAdvanced({
      ...commercialDefaults,
      conversion: 100,
      conversionGain: 0,
    }).nextSales,
    125,
  );
});

test("Sensitivity varies only proposed conversion and respects bounded percentages", () => {
  const points = commercialSensitivity(commercialDefaults);
  assert.equal(points.length, 21);
  assert.equal(points[0].conversion, 0);
  assert.equal(points[0].revenue, 0);
  assert.equal(points[0].contribution, -450);
  assert.equal(points.at(-1).conversion, 100);
  assert.equal(points.at(-1).sales, 125);
  assert.equal(points.at(-1).revenue, 31250);
  assert.ok(
    points.every(
      (point) => point.acquisitionCost === 300 && point.digitalCost === 150,
    ),
  );
  assert.equal(commercialSensitivity(commercialDefaults, { min: -1 }), null);
  assert.equal(commercialSensitivity(commercialDefaults, { max: 101 }), null);
  assert.equal(
    commercialSensitivity(commercialDefaults, { min: 60, max: 50 }),
    null,
  );
  assert.equal(
    commercialSensitivity(commercialDefaults, { steps: 1000000 }),
    null,
  );
  assert.equal(commercialSensitivity(commercialDefaults, { steps: 1.2 }), null);
});

test("Saved scenarios allow three fixed anonymous slots and drop invalid or arbitrary fields", () => {
  const scenarios = sanitizeCommercialScenarios([
    {
      id: "conservative",
      inputs: commercialDefaults,
      name: "private name",
      email: "private@test.test",
    },
    { id: "base", inputs: commercialDefaults },
    { id: "optimistic", inputs: { ...commercialDefaults, growth: 50 } },
    { id: "unknown", inputs: commercialDefaults },
    {
      id: "base",
      inputs: { ...commercialDefaults, ticket: 300 },
      contact: "private",
    },
    { id: "optimistic", inputs: { ...commercialDefaults, conversion: 101 } },
  ]);
  assert.equal(scenarios.length, 3);
  assert.deepEqual(
    scenarios.map((s) => s.id),
    ["conservative", "base", "optimistic"],
  );
  assert.equal(scenarios.find((s) => s.id === "base").inputs.ticket, 300);
  assert.ok(!JSON.stringify(scenarios).includes("private"));
  assert.deepEqual(sanitizeCommercialScenarios(null), []);
});

test("Productivity applies adoption to task time and keeps recurring tool cost separate", () => {
  const result = calculateProductivity(productivityDefaults);
  assert.equal(result.currentHours, 30);
  assert.equal(result.nextHours, 15);
  assert.equal(result.releasedHours, 15);
  assert.equal(result.capacityValue, 600);
  assert.equal(result.recurringCost, 100);
  assert.equal(result.annualReleasedHours, 180);
  assert.equal(result.annualCapacityValue, 7200);
  assert.equal(result.annualRecurringCost, 1200);
  assert.equal(result.monthlyProjection.length, 12);
  assert.equal(result.monthlyProjection.at(-1).cumulativeReleasedHours, 180);
  assert.ok(!("guaranteedSavings" in result));
});

test("Productivity handles no tasks, no adoption, full adoption and equal time", () => {
  const noTasks = calculateProductivity({ ...productivityDefaults, tasks: 0 });
  assert.equal(noTasks.currentHours, 0);
  assert.equal(noTasks.nextHours, 0);
  assert.equal(noTasks.releasedHours, 0);
  const noAdoption = calculateProductivity({
    ...productivityDefaults,
    adoption: 0,
  });
  assert.equal(noAdoption.currentHours, noAdoption.nextHours);
  assert.equal(noAdoption.capacityValue, 0);
  const full = calculateProductivity({
    ...productivityDefaults,
    adoption: 100,
  });
  assert.equal(full.nextHours, 10);
  assert.equal(full.releasedHours, 20);
  const equal = calculateProductivity({
    ...productivityDefaults,
    newMinutes: 15,
  });
  assert.equal(equal.releasedHours, 0);
  assert.equal(equal.capacityValue, 0);
});

test("A slower digital process increases modeled hours and reports negative released capacity", () => {
  const result = calculateProductivity({
    ...productivityDefaults,
    newMinutes: 25,
    adoption: 100,
  });
  assert.equal(result.currentHours, 30);
  assert.equal(result.nextHours, 50);
  assert.equal(result.releasedHours, -20);
  assert.equal(result.capacityValue, -800);
  assert.equal(result.annualReleasedHours, -240);
});

test("Productivity accepts an omitted optional recurring cost but rejects invalid mandatory inputs", () => {
  const { recurringCost, ...withoutRecurring } = productivityDefaults;
  assert.equal(calculateProductivity(withoutRecurring).recurringCost, 0);
  assert.equal(
    calculateProductivity({ ...productivityDefaults, recurringCost: "" })
      .recurringCost,
    0,
  );
  for (const patch of [
    { tasks: -1 },
    { tasks: "" },
    { currentMinutes: NaN },
    { newMinutes: Infinity },
    { adoption: 101 },
    { hourlyCost: " " },
    { recurringCost: -1 },
    { newMinutes: 1441 },
  ])
    assert.equal(
      calculateProductivity({ ...productivityDefaults, ...patch }),
      null,
    );
});

test("Investment example matches nominal cash flow and ROI defined on initial investment", () => {
  const result = calculateInvestment(investmentDefaults);
  assert.equal(result.netMonthly, 600);
  assert.equal(result.totalCost, 7400);
  assert.equal(result.grossBenefit, 9600);
  assert.equal(result.accumulated, 2200);
  assert.equal(result.roiPercent, 44);
  close(result.paybackMonths, 5000 / 600);
  assert.equal(result.recoveryStatus, "within-horizon");
  assert.equal(result.cashFlow.length, 13);
  assert.equal(result.cashFlow[0].cumulative, -5000);
  assert.equal(result.cashFlow.at(-1).cumulative, 2200);
  assert.equal(
    result.cashFlow.reduce((sum, month) => sum + month.netFlow, 0),
    result.accumulated,
  );
});

test("Investment allows losses, negative incremental benefits and no recovery", () => {
  const loss = calculateInvestment({ ...investmentDefaults, benefit: 100 });
  assert.equal(loss.netMonthly, -100);
  assert.equal(loss.accumulated, -6200);
  assert.equal(loss.roiPercent, -124);
  assert.equal(loss.paybackMonths, null);
  assert.equal(loss.recoveryStatus, "no-recovery");
  const negative = calculateInvestment({
    ...investmentDefaults,
    benefit: -100,
  });
  assert.equal(negative.netMonthly, -300);
  assert.equal(negative.accumulated, -8600);
});

test("Zero initial investment has no initial-investment ROI or payback, regardless of operating outcome", () => {
  for (const benefit of [800, 0, -100]) {
    const result = calculateInvestment({
      ...investmentDefaults,
      initial: 0,
      benefit,
    });
    assert.equal(result.roiPercent, null);
    assert.equal(result.paybackMonths, null);
    assert.equal(result.recoveryStatus, "no-initial-investment");
    assert.ok(Number.isFinite(result.accumulated));
  }
});

test("Zero net monthly benefit has no payback, and a late payback remains beyond the selected horizon", () => {
  const zero = calculateInvestment({ ...investmentDefaults, benefit: 200 });
  assert.equal(zero.netMonthly, 0);
  assert.equal(zero.accumulated, -5000);
  assert.equal(zero.paybackMonths, null);
  const late = calculateInvestment({ ...investmentDefaults, horizon: 6 });
  assert.equal(late.recoveryStatus, "beyond-horizon");
  assert.equal(late.accumulated, -1400);
});

test("All three horizons use their own costs, benefits and monthly series without rounding", () => {
  for (const horizon of [6, 12, 24]) {
    const result = calculateInvestment({
      initial: 1234.56,
      recurring: 23.45,
      benefit: 100.12,
      horizon,
    });
    close(result.accumulated, horizon * 76.67 - 1234.56);
    close(result.totalCost, 1234.56 + horizon * 23.45);
    assert.equal(result.cashFlow.length, horizon + 1);
    close(result.cashFlow.at(-1).cumulative, result.accumulated);
  }
});

test("Investment rejects empty, non-finite, invalid cost and unsupported horizon inputs", () => {
  for (const patch of [
    { initial: -1 },
    { recurring: -1 },
    { benefit: "" },
    { benefit: Infinity },
    { initial: NaN },
    { recurring: " " },
    { horizon: 0 },
    { horizon: 18 },
    { horizon: 24.1 },
    { benefit: -10000001 },
  ])
    assert.equal(
      calculateInvestment({ ...investmentDefaults, ...patch }),
      null,
    );
  assert.equal(
    calculateInvestment({
      ...investmentDefaults,
      initial: "5000",
      horizon: "12",
    }).roiPercent,
    44,
  );
});

test("A tiny but positive comparison base never emits an infinite basic or advanced percentage", () => {
  const input = {
    ...commercialDefaults,
    conversion: 1e-308,
    conversionGain: 100,
  };
  const basic = calculatePotential(input),
    advanced = calculateCommercialAdvanced(input);
  assert.ok(basic.currentRevenue > 0);
  assert.equal(basic.percentDifference, null);
  assert.equal(advanced.percentDifference, null);
  assert.ok(Number.isFinite(advanced.nextRevenue));
  const tinyTicket = calculateCommercialAdvanced({
    ...commercialDefaults,
    ticket: 1e-308,
  });
  assert.equal(tinyTicket.currentContributionMarginPercent, null);
  assert.equal(tinyTicket.nextContributionMarginPercent, null);
});

test("Unrepresentable investment ratios are non-applicable rather than Infinity or a fictitious zero-month recovery", () => {
  const hugeRoi = calculateInvestment({
    initial: 1e-308,
    recurring: 0,
    benefit: 10000000,
    horizon: 24,
  });
  assert.equal(hugeRoi.roiPercent, null);
  assert.ok(Number.isFinite(hugeRoi.accumulated));
  const late = calculateInvestment({
    initial: 10000000,
    recurring: 0,
    benefit: 1e-308,
    horizon: 24,
  });
  assert.equal(late.paybackMonths, null);
  assert.equal(late.recoveryStatus, "beyond-horizon");
  const tiny = calculateInvestment({
    initial: Number.MIN_VALUE,
    recurring: 0,
    benefit: 10000000,
    horizon: 6,
  });
  assert.equal(tiny.paybackMonths, null);
  assert.equal(tiny.recoveryStatus, "within-horizon");
});
