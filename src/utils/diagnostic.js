import {
  diagnosticQuestions,
  optimizationRecommendations,
} from "../data/diagnostic.js";

export function evaluateDiagnostic(answers) {
  if (
    !answers ||
    diagnosticQuestions.some(
      (q) => !q.options.some((o) => o.value === answers[q.id]),
    )
  )
    return null;
  const strengths = diagnosticQuestions.filter((q) => answers[q.id] === 2);
  const opportunities = diagnosticQuestions.filter((q) => answers[q.id] < 2);
  const initial = diagnosticQuestions.filter((q) => answers[q.id] === 0).length;
  const category =
    initial >= 4
      ? "initial"
      : strengths.length >= 5
        ? "solid"
        : initial === 0
          ? "optimize"
          : "developing";
  const sorted = [...opportunities].sort(
    (a, b) => answers[a.id] - answers[b.id] || a.priority - b.priority,
  );
  const priorities = [...sorted, ...optimizationRecommendations].slice(0, 3);
  return { category, strengths, opportunities, priorities };
}
