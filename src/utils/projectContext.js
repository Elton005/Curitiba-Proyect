import { solutions, features } from "../data/content.js";
import {
  diagnosticQuestions,
  diagnosticCategories,
  optimizationRecommendations,
} from "../data/diagnostic.js";
import { evaluateDiagnostic } from "./diagnostic.js";
import { calculatePotential, simulationDefaults } from "./simulator.js";
import { translate } from "../data/translations.js";
import { formatNumber, formatMoney } from "./format.js";

const object = (value) =>
  value && typeof value === "object" && !Array.isArray(value);
export const emptyProject = { selected: [], contexts: [] };
export function sanitizeAnswers(value) {
  if (!object(value)) return {};
  return Object.fromEntries(
    diagnosticQuestions
      .filter((q) => [0, 1, 2].includes(value[q.id]))
      .map((q) => [q.id, value[q.id]]),
  );
}
export function sanitizeSimulation(value) {
  if (!object(value)) return { ...simulationDefaults };
  const input = Object.fromEntries(
    Object.keys(simulationDefaults).map((key) => {
      const raw = value[key];
      const editable =
        (typeof raw === "number" && Number.isFinite(raw)) ||
        (typeof raw === "string" &&
          raw.length <= 30 &&
          (raw === "" || Number.isFinite(Number(raw))));
      return [key, editable ? raw : simulationDefaults[key]];
    }),
  );
  return input;
}
export function sanitizeProject(value) {
  if (!object(value)) return { ...emptyProject };
  const selected = [
    ...new Set(
      Array.isArray(value.selected)
        ? value.selected.filter((id) => solutions.some((s) => s.id === id))
        : [],
    ),
  ];
  const contexts = [];
  for (const entry of Array.isArray(value.contexts)
    ? value.contexts.slice(-12)
    : []) {
    if (!object(entry)) continue;
    if (entry.kind === "app") contexts.push({ kind: "app" });
    if (entry.kind === "intelligence" && entry.version === 1)
      contexts.push({ kind: "intelligence", version: 1 });
    if (entry.kind === "diagnostic") {
      const answers = sanitizeAnswers(entry.answers);
      if (evaluateDiagnostic(answers))
        contexts.push({ kind: "diagnostic", answers });
    }
    if (entry.kind === "simulator" && calculatePotential(entry.inputs || {}))
      contexts.push({
        kind: "simulator",
        inputs: sanitizeSimulation(entry.inputs),
      });
    if (
      entry.kind === "recommendation" &&
      [...diagnosticQuestions, ...optimizationRecommendations].some(
        (q) => q.id === entry.id,
      )
    )
      contexts.push({ kind: "recommendation", id: entry.id });
  }
  return { selected, contexts };
}
export function mergeProject(current, ids, context) {
  const safe = sanitizeProject(current);
  const key = (entry) => `${entry.kind}:${entry.id || ""}`;
  return sanitizeProject({
    selected: [...safe.selected, ...ids],
    contexts: context
      ? [
          ...safe.contexts.filter((entry) => key(entry) !== key(context)),
          context,
        ]
      : safe.contexts,
  });
}
export function projectSeed(project, language) {
  const t = (value) => translate(value, language);
  return sanitizeProject(project)
    .contexts.map((context) => {
      if (context.kind === "app") return t("appBrief");
      if (context.kind === "intelligence") return "";
      if (context.kind === "recommendation")
        return t(
          [...diagnosticQuestions, ...optimizationRecommendations].find(
            (q) => q.id === context.id,
          ).recommendation,
        );
      if (context.kind === "diagnostic") {
        const result = evaluateDiagnostic(context.answers);
        return `${t("diagnosticName")}\n${t(diagnosticCategories[result.category])}\n\n${t("priorities")}:\n${result.priorities.map((p, i) => `${i + 1}. ${t(p.recommendation)}`).join("\n")}`;
      }
      const result = calculatePotential(context.inputs);
      return `${t("simulatorIntro")}\n${t("monthlyInquiries")}: ${formatNumber(result.currentInquiries, language)} → ${formatNumber(result.nextInquiries, language)}\n${t("conversion")}: ${formatNumber(result.currentConversion, language)}% → ${formatNumber(result.nextConversion, language)}%\n${t("illustrativeRevenue")}: ${formatMoney(result.currentRevenue, language)} → ${formatMoney(result.nextRevenue, language)}\n${t("simulatorWarning")}`;
    })
    .join("\n\n");
}
export function sanitizeQuoteOptions(value) {
  const valid = object(value) ? value : {};
  const allocations = {};
  for (const solution of solutions) {
    const entry = valid.allocations?.[solution.id];
    if (!object(entry)) continue;
    allocations[solution.id] = Object.fromEntries(
      ["initial", "monthly"].map((key) => [
        key,
        entry[key] !== "" &&
        entry[key] != null &&
        Number.isFinite(Number(entry[key])) &&
        Number(entry[key]) >= 0 &&
        Number(entry[key]) <= 10000000
          ? String(entry[key])
          : "",
      ]),
    );
  }
  return {
    features: Array.isArray(valid.features)
      ? [
          ...new Set(
            valid.features.filter((id) => features.some((f) => f.id === id)),
          ),
        ]
      : [],
    allocations,
    deadline: ["noDeadline", "deadline1", "deadline2", "deadline3"].includes(
      valid.deadline,
    )
      ? valid.deadline
      : "noDeadline",
  };
}
