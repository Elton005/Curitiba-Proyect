import { solutions, features } from "../data/content.js";
import { translate, b } from "../data/translations.js";
import { formatMoney } from "./format.js";

export function calculateQuoteBudget(selected, allocations) {
  let initial = 0,
    monthly = 0,
    provided = false;
  for (const id of selected) {
    for (const key of ["initial", "monthly"]) {
      const raw = allocations[id]?.[key];
      if (raw === "" || raw === undefined) continue;
      const value = Number(raw);
      if (!Number.isFinite(value) || value < 0 || value > 10000000) return null;
      provided = true;
      if (key === "initial") initial += value;
      else monthly += value;
    }
  }
  return { initial, monthly, provided };
}
export function hasBudgetValue(selected, allocations, key) {
  return selected.some((id) => {
    const value = allocations[id]?.[key];
    return value !== "" && value != null;
  });
}

export function buildQuoteText(data, language) {
  data = {
    name: "",
    contact: "",
    description: "",
    features: [],
    selected: [],
    allocations: {},
    ...data,
  };
  for (const key of ["name", "contact", "description"])
    if (typeof data[key] !== "string") data[key] = "";
  data.selected = data.selected.filter((id) =>
    solutions.some((s) => s.id === id),
  );
  data.features = data.features.filter((id) =>
    features.some((f) => f.id === id),
  );
  const t = (value) => translate(value, language);
  const totals = calculateQuoteBudget(data.selected, data.allocations);
  const lines = [
    "LOOP AVANTE",
    t("quoteSummary"),
    ...(data.name.trim() ? [`${t("yourName")}: ${data.name.trim()}`] : []),
    ...(data.contact.trim()
      ? [`${t("contactDetail")}: ${data.contact.trim()}`]
      : []),
    "",
    t(b("1. SOLUÇÕES E TIPO DE PROJETO", "1. SOLUCIONES Y TIPO DE PROYECTO")),
    ...solutions
      .filter((s) => data.selected.includes(s.id))
      .map((s) => `• ${t(s.title)}`),
    "",
    t(
      b(
        "2. NECESSIDADE, DESCRIÇÃO E REQUISITOS",
        "2. NECESIDAD, DESCRIPCIÓN Y REQUISITOS",
      ),
    ),
    data.description.trim(),
    "",
    t(b("3. FUNCIONALIDADES SELECIONADAS", "3. FUNCIONALIDADES SELECCIONADAS")),
    ...features
      .filter((f) => data.features.includes(f.id))
      .map((f) => `• ${t(f.title)}`),
  ];
  if (!data.features.length) lines.push(t("notSpecified"));
  lines.push(
    "",
    t(
      b(
        "4. ORÇAMENTO DISPONÍVEL DO CLIENTE",
        "4. PRESUPUESTO DISPONIBLE DEL CLIENTE",
      ),
    ),
  );
  if (totals?.provided) {
    lines.push(
      "",
      t("budget"),
      ...data.selected.map((id) => {
        const solution = solutions.find((s) => s.id === id);
        const allocation = data.allocations[id] || {};
        return `${t(solution.title)} — ${t("budgetSingle")}: ${allocation.initial === "" || allocation.initial === undefined ? t("notSpecified") : formatMoney(Number(allocation.initial), language)}; ${t("budgetMonthly")}: ${allocation.monthly === "" || allocation.monthly === undefined ? t("notSpecified") : formatMoney(Number(allocation.monthly), language)}`;
      }),
      `${t("budgetSingle")}: ${hasBudgetValue(data.selected, data.allocations, "initial") ? formatMoney(totals.initial, language) : t("notSpecified")}`,
      `${t("budgetMonthly")}: ${hasBudgetValue(data.selected, data.allocations, "monthly") ? formatMoney(totals.monthly, language) : t("notSpecified")}`,
    );
  } else
    lines.push(
      `${t("budgetSingle")}: ${t("notSpecified")}`,
      `${t("budgetMonthly")}: ${t("notSpecified")}`,
    );
  lines.push(
    t("budgetHelp"),
    "",
    t(
      b(
        "5. PRAZO E AVALIAÇÃO DA PROPOSTA",
        "5. PLAZO Y EVALUACIÓN DE LA PROPUESTA",
      ),
    ),
    `${t("deadline")}: ${t(data.deadline || "noDeadline")}`,
    `${t("investment")}: ${t("onRequest")}`,
    t("noRates"),
  );
  return lines.join("\n");
}
