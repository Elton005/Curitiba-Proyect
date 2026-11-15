import { evaluateSectorAssessment } from "../data/intelligence/sectorAssessment.js";
import { sanitizeAnalytics, currentDiagnostic } from "./analyticsContext.js";
import { observations } from "../data/intelligence/market.js";
import {
  getSectorProfile,
  sectorRecommendations,
} from "../data/intelligence/sectors.js";
import {
  calculateCommercialAdvanced,
  calculateProductivity,
  calculateInvestment,
} from "./intelligenceCalculations.js";
import { calculatePotential } from "./simulator.js";
import { evaluateDiagnostic } from "./diagnostic.js";
import { translate, b } from "../data/translations.js";
import { formatMoney, formatNumber } from "./format.js";
import { inputLabels } from "../data/intelligence/inputLabels.js";

export function buildIntelligenceReport(raw, answers = null) {
  const context = sanitizeAnalytics(raw),
    sector = getSectorProfile(context.sectorId);
  const marketRows = observations.filter((row) =>
    context.market.observationIds.includes(row.id),
  );
  const c = context.commercial;
  const scenarios = c.scenarios
    .map((s) => ({
      ...s,
      result:
        s.mode === "advanced"
          ? calculateCommercialAdvanced(s.inputs)
          : calculatePotential(s.inputs),
    }))
    .filter((s) => s.result);
  const commercial = c.saved
    ? {
        inputs: c.inputs,
        mode: c.mode,
        result:
          c.mode === "advanced"
            ? calculateCommercialAdvanced(c.inputs)
            : calculatePotential(c.inputs),
        scenarios,
      }
    : scenarios.length
      ? { ...scenarios[0], sourceScenarioId: scenarios[0].id, scenarios }
      : null;
  const productivity = context.productivity.saved
    ? {
        inputs: context.productivity.inputs,
        result: calculateProductivity(context.productivity.inputs),
      }
    : null;
  const investment = context.investment.saved
    ? {
        inputs: context.investment.inputs,
        result: calculateInvestment(context.investment.inputs),
        capacityImport: context.investment.capacityImport,
      }
    : null;
  const diagnostic = answers ? evaluateDiagnostic(answers) : null;
  const recommendations = [];
  const add = (item) => {
    if (
      !recommendations.some((existing) => existing.solution === item.solution)
    )
      recommendations.push(item);
  };
  if (diagnostic)
    diagnostic.priorities.forEach((p) =>
      add({ solution: p.solution, title: p.recommendation, reason: p.advice }),
    );
  const sectorResult = evaluateSectorAssessment(context.sectorAssessment);
  if (sectorResult)
    sectorResult.priorities.forEach((q) =>
      add({
        solution: q.solution,
        title: q.topic,
        reason: b(
          "Melhoria declarada na avaliação setorial.",
          "Mejora declarada en la evaluación sectorial.",
        ),
      }),
    );
  else if (sector) sectorRecommendations(sector.id).forEach(add);
  if (productivity)
    add({
      solution: "automation",
      title: b(
        "Mapear o processo antes de automatizar",
        "Definir el proceso antes de automatizar",
      ),
      reason: b(
        "A simulação de tempo orienta uma conversa sobre adoção e rotina, sem garantir economia de caixa.",
        "La simulación de tiempo orienta una conversación sobre adopción y rutina, sin garantizar ahorro de caja.",
      ),
    });
  if (commercial)
    add({
      solution: "web",
      title: b(
        "Revisar o caminho entre consulta e contratação",
        "Revisar el camino entre consulta y contratación",
      ),
      reason: b(
        "As hipóteses comerciais ajudam a formular perguntas sobre oferta, atendimento e conversão.",
        "Los supuestos comerciales ayudan a formular preguntas sobre oferta, atención y conversión.",
      ),
    });
  if (marketRows.length)
    add({
      solution: marketRows.some((r) => r.indicatorId === "crm")
        ? "systems"
        : "web",
      title: b(
        "Conectar presença e organização",
        "Conectar presencia y organización",
      ),
      reason: b(
        "Indicadores públicos contextualizam o mercado, mas não comprovam uma necessidade individual. Valide-a no diagnóstico.",
        "Los indicadores públicos contextualizan el mercado, pero no demuestran una necesidad individual. Valídala en el diagnóstico.",
      ),
    });
  const sources = [
    ...new Map(
      marketRows.map((row) => [
        `${row.indicatorId}|${row.url}`,
        {
          id: row.indicatorId,
          variable: row.variable,
          title: `${row.source} · ${row.study} · ${row.indicator}`,
          url: row.url,
          year: row.year,
          definition: row.definition,
        },
      ]),
    ).values(),
  ];
  const modulesUsed = [
    ...(marketRows.length ? ["market"] : []),
    ...(commercial ? ["commercial"] : []),
    ...(productivity ? ["productivity"] : []),
    ...(investment ? ["investment"] : []),
    ...(sector ? ["sector"] : []),
    ...(diagnostic ? ["diagnostic"] : []),
  ];
  return {
    sector,
    marketRows,
    commercial,
    productivity,
    investment,
    diagnostic,
    recommendations: recommendations.slice(0, 3),
    sources,
    modulesUsed,
  };
}
export function analyticBrief(context, language, answers = null) {
  const snapshot = buildIntelligenceReport(context, answers);
  if (!snapshot.modulesUsed.length) return "";
  const t = (value) => translate(value, language),
    money = (value) => formatMoney(value, language),
    number = (value) => formatNumber(value, language);
  const lines = [t("i.briefLead")];
  const assessment = evaluateSectorAssessment(context.sectorAssessment);
  if (assessment) lines.push(...assessment.priorities.map((q) => t(q.topic)));
  if (snapshot.sector)
    lines.push(`${t("i.chooseSector")}: ${t(snapshot.sector.title)}`);
  const addInputs = (inputs, basic = false) =>
    Object.entries(inputs)
      .filter(([key]) => inputLabels[key])
      .filter(
        ([key]) =>
          !basic ||
          !["variableCost", "acquisitionCost", "digitalCost"].includes(key),
      )
      .map(([key, value]) => `${t(inputLabels[key])}: ${number(Number(value))}`)
      .join("; ");
  if (snapshot.commercial) {
    lines.push(
      `${t("i.commercial")}: ${money(snapshot.commercial.result.currentRevenue)} → ${money(snapshot.commercial.result.nextRevenue)}`,
      `${t("i.assumptions")}: ${addInputs(snapshot.commercial.inputs, snapshot.commercial.mode === "basic")}`,
      t("i.commercialWarning"),
    );
    if (snapshot.commercial.mode === "advanced")
      lines.push(
        `${t("i.contribution")}: ${money(snapshot.commercial.result.nextContribution)}`,
        t("i.contributionNote"),
      );
  }
  if (snapshot.productivity)
    lines.push(
      `${t("i.productivity")}: ${number(snapshot.productivity.result.releasedHours)} ${t("i.hours")} / ${t("perMonth")}; ${t("i.capacityValue")}: ${money(snapshot.productivity.result.capacityValue)}`,
      `${t("i.assumptions")}: ${addInputs(snapshot.productivity.inputs)}`,
      t("i.productivityWarning"),
    );
  if (snapshot.investment)
    lines.push(
      `${t("i.investment")}: ${t("i.horizon")} ${snapshot.investment.result.horizon} ${t("i.months")}; ${t("i.accumulated")}: ${money(snapshot.investment.result.accumulated)}`,
      `${t("i.assumptions")}: ${addInputs(snapshot.investment.inputs)}`,
      t("i.investmentWarning"),
    );
  if (snapshot.diagnostic)
    lines.push(
      t("diagnosticName"),
      ...snapshot.diagnostic.priorities.map((p) => t(p.recommendation)),
    );
  if (snapshot.recommendations.length)
    lines.push(
      t("i.recommendations"),
      ...snapshot.recommendations.map((item) => t(item.title)),
    );
  if (snapshot.marketRows.length)
    lines.push(
      t("i.official"),
      ...snapshot.marketRows
        .slice(0, 7)
        .map(
          (row) =>
            `${t(row.variable)}: ${row.value}% · ${row.year} · ${t(row.denominatorLabel)} · ${row.url}`,
        ),
    );
  const text = lines.join("\n");
  return text.length > 3800
    ? text.slice(0, 3600) + "\n" + t("i.briefTruncated")
    : text;
}
export function liveIntelligenceReport(context) {
  return buildIntelligenceReport(context, currentDiagnostic());
}
