import {
  calculatePotential,
  simulationDefaults,
  simulationLimits,
} from "./simulator.js";

const freezeLimits = (value) =>
  Object.freeze(
    Object.fromEntries(
      Object.entries(value).map(([key, limits]) => [
        key,
        Object.freeze([...limits]),
      ]),
    ),
  );

export const commercialDefaults = Object.freeze({
  ...simulationDefaults,
  variableCost: 100,
  acquisitionCost: 300,
  digitalCost: 150,
});
export const commercialLimits = freezeLimits({
  ...simulationLimits,
  variableCost: [0, 10000000],
  acquisitionCost: [0, 10000000],
  digitalCost: [0, 10000000],
});
export const productivityDefaults = Object.freeze({
  tasks: 120,
  currentMinutes: 15,
  newMinutes: 5,
  adoption: 75,
  hourlyCost: 40,
  recurringCost: 100,
});
export const productivityLimits = freezeLimits({
  tasks: [0, 1000000],
  currentMinutes: [0, 1440],
  newMinutes: [0, 1440],
  adoption: [0, 100],
  hourlyCost: [0, 10000000],
  recurringCost: [0, 10000000],
});
export const investmentDefaults = Object.freeze({
  initial: 5000,
  recurring: 200,
  benefit: 800,
  horizon: 12,
});
export const investmentLimits = freezeLimits({
  initial: [0, 10000000],
  recurring: [0, 10000000],
  benefit: [-10000000, 10000000],
  horizon: [6, 24],
});
export const investmentHorizons = Object.freeze([6, 12, 24]);
export const commercialScenarioIds = Object.freeze([
  "conservative",
  "base",
  "optimistic",
]);

// Numeric strings from number fields are accepted. Empty required fields,
// whitespace, booleans, arrays and objects are never interpreted as zero.
function numericInputs(input, limits, optionalZero = []) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const result = {};
  for (const [key, [min, max]] of Object.entries(limits)) {
    let raw = input[key];
    if (optionalZero.includes(key) && (raw == null || raw === "")) raw = 0;
    if (typeof raw !== "number" && typeof raw !== "string") return null;
    if (typeof raw === "string" && !raw.trim()) return null;
    const value = Number(raw);
    if (!Number.isFinite(value) || value < min || value > max) return null;
    result[key] = value;
  }
  return result;
}

function finitePercent(numerator, denominator) {
  if (denominator === 0) return null;
  const result = (numerator / denominator) * 100;
  return Number.isFinite(result) ? result : null;
}

/** BRL/month illustrative contribution, not accounting profit or advertising ROI. */
export function calculateCommercialAdvanced(input) {
  const assumptions = numericInputs(input, commercialLimits);
  if (!assumptions) return null;
  const basic = calculatePotential(assumptions);
  if (!basic) return null;
  const { variableCost, acquisitionCost, digitalCost, ticket } = assumptions;
  const unitContribution = ticket - variableCost;
  const currentVariableCosts = basic.currentSales * variableCost;
  const nextVariableCosts = basic.nextSales * variableCost;
  const currentVariableContribution =
    basic.currentRevenue - currentVariableCosts;
  const nextVariableContribution = basic.nextRevenue - nextVariableCosts;
  // The one acquisition-cost input is the same monthly amount in both cases.
  // Digital cost is incremental and therefore charged only to the new case.
  const currentContribution = currentVariableContribution - acquisitionCost;
  const nextContribution =
    nextVariableContribution - acquisitionCost - digitalCost;
  const contributionDifference = nextContribution - currentContribution;
  return {
    ...basic,
    percentDifference: Number.isFinite(basic.percentDifference)
      ? basic.percentDifference
      : null,
    assumptions,
    unitContribution,
    currentVariableCosts,
    nextVariableCosts,
    currentVariableContribution,
    nextVariableContribution,
    currentAcquisitionCost: acquisitionCost,
    nextAcquisitionCost: acquisitionCost,
    currentDigitalCost: 0,
    nextDigitalCost: digitalCost,
    currentTotalCosts: currentVariableCosts + acquisitionCost,
    nextTotalCosts: nextVariableCosts + acquisitionCost + digitalCost,
    currentContribution,
    nextContribution,
    contributionDifference,
    contributionPercentDifference:
      currentContribution > 0
        ? finitePercent(contributionDifference, currentContribution)
        : null,
    currentContributionMarginPercent:
      basic.currentRevenue > 0
        ? finitePercent(currentContribution, basic.currentRevenue)
        : null,
    nextContributionMarginPercent:
      basic.nextRevenue > 0
        ? finitePercent(nextContribution, basic.nextRevenue)
        : null,
  };
}

/** Keep inquiries, unit costs and monthly costs fixed; vary proposed conversion. */
export function commercialSensitivity(input, options = {}) {
  const result = calculateCommercialAdvanced(input);
  if (
    !result ||
    !options ||
    typeof options !== "object" ||
    Array.isArray(options)
  )
    return null;
  const min = options.min ?? 0;
  const max = options.max ?? 100;
  const steps = options.steps ?? 20;
  if (
    ![min, max, steps].every(
      (value) => typeof value === "number" && Number.isFinite(value),
    ) ||
    min < 0 ||
    max > 100 ||
    min > max ||
    !Number.isInteger(steps) ||
    steps < 1 ||
    steps > 100
  )
    return null;
  const { ticket, variableCost, acquisitionCost, digitalCost } =
    result.assumptions;
  return Array.from({ length: steps + 1 }, (_, index) => {
    const conversion = min + ((max - min) * index) / steps;
    const sales = (result.nextInquiries * conversion) / 100;
    const revenue = sales * ticket;
    const variableCosts = sales * variableCost;
    return {
      conversion,
      sales,
      revenue,
      variableCosts,
      acquisitionCost,
      digitalCost,
      contribution: revenue - variableCosts - acquisitionCost - digitalCost,
    };
  });
}

/** Anonymous, bounded scenario slots. Names/personal free text are not copied. */
export function sanitizeCommercialScenarios(value) {
  if (!Array.isArray(value)) return [];
  const byId = new Map();
  for (const entry of value.slice(-12)) {
    if (
      !entry ||
      typeof entry !== "object" ||
      !commercialScenarioIds.includes(entry.id)
    )
      continue;
    const result = calculateCommercialAdvanced(entry.inputs);
    if (result)
      byId.set(entry.id, { id: entry.id, inputs: result.assumptions });
  }
  return commercialScenarioIds
    .filter((id) => byId.has(id))
    .map((id) => byId.get(id));
}

/** Released capacity is a theoretical time value, never guaranteed cash savings. */
export function calculateProductivity(input) {
  const assumptions = numericInputs(input, productivityLimits, [
    "recurringCost",
  ]);
  if (!assumptions) return null;
  const {
    tasks,
    currentMinutes,
    newMinutes,
    adoption,
    hourlyCost,
    recurringCost,
  } = assumptions;
  const adoptionFraction = adoption / 100;
  const currentHours = (tasks * currentMinutes) / 60;
  const nextHours =
    (tasks *
      (currentMinutes * (1 - adoptionFraction) +
        newMinutes * adoptionFraction)) /
    60;
  const releasedHours =
    (tasks * (currentMinutes - newMinutes) * adoptionFraction) / 60;
  const capacityValue = releasedHours * hourlyCost;
  const annualCurrentHours = currentHours * 12;
  const annualNextHours = nextHours * 12;
  const annualReleasedHours = releasedHours * 12;
  const annualCapacityValue = capacityValue * 12;
  const annualRecurringCost = recurringCost * 12;
  return {
    assumptions,
    currentHours,
    nextHours,
    releasedHours,
    capacityValue,
    recurringCost,
    annualCurrentHours,
    annualNextHours,
    annualReleasedHours,
    annualCapacityValue,
    annualRecurringCost,
    monthlyProjection: Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      currentHours,
      nextHours,
      releasedHours,
      capacityValue,
      recurringCost,
      cumulativeReleasedHours: releasedHours * (index + 1),
      cumulativeCapacityValue: capacityValue * (index + 1),
      cumulativeRecurringCost: recurringCost * (index + 1),
    })),
  };
}

/** Mathematical nominal cash-flow scenario, with no discounting or financing. */
export function calculateInvestment(input) {
  const assumptions = numericInputs(input, investmentLimits);
  if (!assumptions || !investmentHorizons.includes(assumptions.horizon))
    return null;
  const { initial, recurring, benefit, horizon } = assumptions;
  const netMonthly = benefit - recurring;
  const totalCost = initial + horizon * recurring;
  const grossBenefit = horizon * benefit;
  const accumulated = horizon * netMonthly - initial;
  const roiPercent = initial > 0 ? finitePercent(accumulated, initial) : null;
  const rawPayback =
    initial > 0 && netMonthly > 0 ? initial / netMonthly : null;
  const paybackMonths =
    Number.isFinite(rawPayback) && rawPayback > 0 ? rawPayback : null;
  const recoveryStatus =
    initial === 0
      ? "no-initial-investment"
      : netMonthly <= 0
        ? "no-recovery"
        : netMonthly * horizon >= initial
          ? "within-horizon"
          : "beyond-horizon";
  return {
    assumptions,
    initial,
    recurring,
    benefit,
    horizon,
    netMonthly,
    totalCost,
    grossBenefit,
    accumulated,
    roiPercent,
    paybackMonths,
    recoveryStatus,
    cashFlow: Array.from({ length: horizon + 1 }, (_, month) => ({
      month,
      benefit: month === 0 ? 0 : benefit,
      recurringCost: month === 0 ? 0 : recurring,
      initialCost: month === 0 ? initial : 0,
      netFlow: month === 0 ? -initial : netMonthly,
      cumulativeBenefit: month * benefit,
      cumulativeCost: initial + month * recurring,
      cumulative: month * netMonthly - initial,
    })),
  };
}
