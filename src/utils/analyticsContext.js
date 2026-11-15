import { sanitizeSectorAssessment } from "../data/intelligence/sectorAssessment.js";
import {
  commercialDefaults,
  productivityDefaults,
  investmentDefaults,
  calculateCommercialAdvanced,
  calculateProductivity,
  calculateInvestment,
  sanitizeCommercialScenarios,
} from "./intelligenceCalculations.js";
import { calculatePotential } from "./simulator.js";
import {
  observations,
  defaultMarketFilters,
  sanitizeMarketFilters,
} from "../data/intelligence/market.js";
import { getSectorProfile } from "../data/intelligence/sectors.js";
import { sanitizeAnswers } from "./projectContext.js";
import { evaluateDiagnostic } from "./diagnostic.js";
import { solutions } from "../data/content.js";

export const ANALYTICS_KEY = "loop-intelligence-v1";
export const ANALYTICS_LIMIT = 32768;
const object = (value) =>
  value && typeof value === "object" && !Array.isArray(value);
const clone = (value) => JSON.parse(JSON.stringify(value));
export function analyticsDefaults() {
  return {
    version: 1,
    market: { filters: { ...defaultMarketFilters }, observationIds: [] },
    sectorId: null,
    sectorAssessment: null,
    commercial: {
      mode: "basic",
      inputs: { ...commercialDefaults },
      saved: false,
      scenarios: [],
    },
    productivity: { inputs: { ...productivityDefaults }, saved: false },
    investment: {
      inputs: { ...investmentDefaults },
      saved: false,
      capacityImport: null,
    },
    diagnostic: null,
    recommendedSolutions: [],
  };
}
function numericDraft(value, defaults) {
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => {
      const raw = value?.[key];
      const allowed =
        (typeof raw === "number" &&
          Number.isFinite(raw) &&
          Math.abs(raw) <= 1e12) ||
        (typeof raw === "string" &&
          raw.length <= 30 &&
          (raw === "" ||
            (Number.isFinite(Number(raw)) && Math.abs(Number(raw)) <= 1e12)));
      return [key, allowed ? raw : fallback];
    }),
  );
}
export function sanitizeAnalytics(value) {
  const base = analyticsDefaults();
  if (!object(value) || value.version !== 1) return base;
  try {
    if (JSON.stringify(value).length > ANALYTICS_LIMIT) return base;
  } catch {
    return base;
  }
  const knownIds = new Set(observations.map((row) => row.id));
  base.market = {
    filters: sanitizeMarketFilters(value.market?.filters),
    observationIds: [
      ...new Set(
        (Array.isArray(value.market?.observationIds)
          ? value.market.observationIds
          : []
        )
          .slice(0, 64)
          .filter((id) => knownIds.has(id)),
      ),
    ].slice(0, 32),
  };
  base.sectorId = getSectorProfile(value.sectorId) ? value.sectorId : null;
  base.sectorAssessment =
    value.sectorAssessment?.sectorId === base.sectorId
      ? sanitizeSectorAssessment(value.sectorAssessment)
      : null;
  const commercial = numericDraft(value.commercial?.inputs, commercialDefaults);
  const mode = value.commercial?.mode === "advanced" ? "advanced" : "basic";
  const scenarios = sanitizeCommercialScenarios(
    value.commercial?.scenarios,
  ).map((entry) => ({
    ...entry,
    mode:
      value.commercial.scenarios.find((item) => item?.id === entry.id)?.mode ===
      "advanced"
        ? "advanced"
        : "basic",
  }));
  base.commercial = {
    mode,
    inputs: commercial,
    saved:
      value.commercial?.saved === true &&
      Boolean(
        mode === "advanced"
          ? calculateCommercialAdvanced(commercial)
          : calculatePotential(commercial),
      ),
    scenarios,
  };
  const productivity = numericDraft(
    value.productivity?.inputs,
    productivityDefaults,
  );
  base.productivity = {
    inputs: productivity,
    saved:
      value.productivity?.saved === true &&
      Boolean(calculateProductivity(productivity)),
  };
  const investment = numericDraft(value.investment?.inputs, investmentDefaults);
  base.investment = {
    inputs: investment,
    saved:
      value.investment?.saved === true &&
      Boolean(calculateInvestment(investment)),
    capacityImport: null,
  };
  const imported = value.investment?.capacityImport;
  if (
    imported?.confirmed === true &&
    Number.isFinite(imported.amount) &&
    imported.amount >= 0 &&
    Number(investment.benefit) === imported.amount
  ) {
    const capacity = calculateProductivity(productivity);
    if (capacity && imported.amount <= Math.max(0, capacity.capacityValue))
      base.investment.capacityImport = {
        confirmed: true,
        amount: imported.amount,
      };
  }
  base.diagnostic =
    value.diagnostic?.source === "loop-diagnostic-v1"
      ? { source: "loop-diagnostic-v1" }
      : null;
  base.recommendedSolutions = [
    ...new Set(
      (Array.isArray(value.recommendedSolutions)
        ? value.recommendedSolutions
        : []
      ).filter((id) => solutions.some((s) => s.id === id)),
    ),
  ].slice(0, 5);
  return base;
}
export function readSessionJson(key) {
  try {
    const text = sessionStorage.getItem(key);
    return text && text.length <= ANALYTICS_LIMIT ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}
export function currentDiagnostic() {
  const complete = readSessionJson("loop-diagnostic-complete");
  const answers = sanitizeAnswers(readSessionJson("loop-diagnostic-answers"));
  return complete === true && evaluateDiagnostic(answers) ? answers : null;
}
export function legacyAnalytics() {
  const base = analyticsDefaults(),
    old = readSessionJson("loop-simulation"),
    project = readSessionJson("loop-project");
  if (object(old))
    base.commercial.inputs = numericDraft(
      { ...commercialDefaults, ...old },
      commercialDefaults,
    );
  const previous = Array.isArray(project?.contexts)
    ? project.contexts.find(
        (c) => c?.kind === "simulator" && calculatePotential(c.inputs || {}),
      )
    : null;
  if (previous) {
    base.commercial.inputs = numericDraft(
      { ...commercialDefaults, ...previous.inputs },
      commercialDefaults,
    );
    base.commercial.saved = true;
  }
  if (currentDiagnostic()) base.diagnostic = { source: "loop-diagnostic-v1" };
  return sanitizeAnalytics(base);
}
export function readAnalytics() {
  return sanitizeAnalytics(readSessionJson(ANALYTICS_KEY) || legacyAnalytics());
}
export function updateAnalytics(current, update) {
  const next =
    typeof update === "function"
      ? update(clone(sanitizeAnalytics(current)))
      : update;
  return sanitizeAnalytics(next);
}
