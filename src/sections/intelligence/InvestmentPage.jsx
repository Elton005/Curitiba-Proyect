import ResultInsights from "../../components/intelligence/ResultInsights.jsx";
import { investmentHelp } from "../../data/toolOrientation.js";
import { useState } from "react";
import { useLocale } from "../../app/LocaleContext.jsx";
import { useAnalytics } from "../../hooks/useAnalytics.js";
import {
  calculateInvestment,
  calculateProductivity,
  investmentLimits,
  investmentHorizons,
} from "../../utils/intelligenceCalculations.js";
import { formatMoney, formatNumber } from "../../utils/format.js";
import {
  IntelligenceFrame,
  Panel,
  NumericField,
  Metric,
  LineChart,
  Method,
  Notice,
  Invalid,
  SaveActions,
  DataTable,
} from "../../components/intelligence/AnalyticsUI.jsx";

export default function InvestmentPage() {
  const { t, language } = useLocale(),
    [context, setContext] = useAnalytics(),
    [confirmed, setConfirmed] = useState(false),
    [amount, setAmount] = useState("");
  const { inputs, saved } = context.investment,
    result = calculateInvestment(inputs),
    capacity = context.productivity.saved
      ? calculateProductivity(context.productivity.inputs)
      : null;
  const money = (v) => formatMoney(v, language),
    number = (v) => formatNumber(v, language),
    maxCapacity = Math.max(0, capacity?.capacityValue || 0);
  const importValid =
    confirmed &&
    amount !== "" &&
    Number.isFinite(Number(amount)) &&
    Number(amount) >= 0 &&
    Number(amount) <= maxCapacity;
  function update(key, value) {
    setContext((c) => ({
      ...c,
      investment: {
        ...c.investment,
        inputs: { ...c.investment.inputs, [key]: value },
        saved: false,
        capacityImport: key === "benefit" ? null : c.investment.capacityImport,
      },
    }));
  }
  return (
    <IntelligenceFrame title="i.investment" intro="i.investmentIntro">
      <Notice>{t("i.investmentWarning")}</Notice>
      <div className="int-calculator-grid">
        <Panel title="i.inputs">
          <div className="int-fields-grid">
            {["initial", "recurring", "benefit"].map((key) => (
              <NumericField
                key={key}
                id={`invest-${key}`}
                label={`i.${key}`}
                help={investmentHelp[key]}
                value={inputs[key]}
                min={investmentLimits[key][0]}
                max={investmentLimits[key][1]}
                onChange={(value) => update(key, value)}
              />
            ))}
            <div className="field">
              <label htmlFor="invest-horizon">{t("i.horizon")}</label>
              <select
                id="invest-horizon"
                value={inputs.horizon}
                onChange={(e) => update("horizon", Number(e.target.value))}
              >
                {investmentHorizons.map((n) => (
                  <option key={n} value={n}>
                    {n} {t("i.months")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Panel>
        <Panel title="i.results" className="int-result-panel">
          {result ? (
            <>
              <div className="int-metric-grid">
                <Metric
                  label="i.netMonthly"
                  value={money(result.netMonthly)}
                  negative={result.netMonthly < 0}
                />
                <Metric
                  label="i.accumulated"
                  value={money(result.accumulated)}
                  negative={result.accumulated < 0}
                />
                <Metric
                  label="i.roi"
                  note={
                    <span>
                      {t({
                        pt: "Resultado acumulado em relação ao gasto inicial, em %. Não é retorno garantido.",
                        es: "Resultado acumulado respecto al gasto inicial, en %. No es un retorno garantizado.",
                      })}
                    </span>
                  }
                  value={
                    result.roiPercent === null
                      ? t("i.na")
                      : `${number(result.roiPercent)}%`
                  }
                />
                <Metric
                  label="i.payback"
                  note={
                    <span>
                      {t({
                        pt: "Tempo matemático para cobrir o gasto inicial, se o benefício líquido mensal se mantiver.",
                        es: "Tiempo matemático para cubrir el gasto inicial si se mantiene el beneficio neto mensual.",
                      })}
                    </span>
                  }
                  value={
                    result.paybackMonths === null
                      ? t("i.na")
                      : `${number(result.paybackMonths)} ${t("i.months")}`
                  }
                />
                <Metric label="i.totalCost" value={money(result.totalCost)} />
                <Metric
                  label="i.grossBenefit"
                  value={money(result.grossBenefit)}
                />
              </div>
              {result.recoveryStatus === "no-initial-investment" && (
                <Notice>{t("i.noInitial")}</Notice>
              )}
              {result.recoveryStatus === "no-recovery" && (
                <Notice>{t("i.noRecovery")}</Notice>
              )}
              {result.recoveryStatus === "beyond-horizon" && (
                <Notice>{t("i.beyond")}</Notice>
              )}
            </>
          ) : (
            <Invalid />
          )}
        </Panel>
      </div>
      {capacity && (
        <Panel title="i.importCapacity">
          <p>{t("i.capacityImportNote")}</p>
          <p>
            <strong>
              {t("i.capacityValue")}: {money(maxCapacity)}
            </strong>
          </p>
          <NumericField
            id="capacity-amount"
            label="i.confirmedAmount"
            value={amount}
            max={maxCapacity}
            onChange={setAmount}
          />
          <label className="int-check">
            <input
              id="capacity-confirm"
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>{t("i.confirmCash")}</span>
          </label>
          <button
            type="button"
            className="button button-outline"
            disabled={!importValid}
            onClick={() =>
              setContext((c) => ({
                ...c,
                investment: {
                  ...c.investment,
                  inputs: { ...c.investment.inputs, benefit: Number(amount) },
                  saved: false,
                  capacityImport: { confirmed: true, amount: Number(amount) },
                },
              }))
            }
          >
            {t("i.applyAmount")}
          </button>
          {context.investment.capacityImport && (
            <p role="status">
              {t("i.saved")} · {money(context.investment.capacityImport.amount)}
            </p>
          )}
        </Panel>
      )}
      {result && (
        <Panel title="i.cashFlow">
          <LineChart
            title={t("i.cashFlow")}
            points={result.cashFlow.map((row) => ({
              label: `${t("i.month")} ${row.month}`,
              value: row.cumulative,
            }))}
            format={money}
          />
          <DataTable
            caption={t("i.cashFlow")}
            rows={result.cashFlow}
            columns={[
              { id: "month", label: t("i.month") },
              {
                id: "benefit",
                label: t("i.benefit"),
                render: (r) => money(r.benefit),
              },
              {
                id: "cost",
                label: t("i.costs"),
                render: (r) => money(r.initialCost + r.recurringCost),
              },
              {
                id: "cumulative",
                label: t("i.accumulated"),
                render: (r) => money(r.cumulative),
              },
            ]}
          />
        </Panel>
      )}
      <ResultInsights kind="investment" result={result} inputs={inputs} />
      <SaveActions
        disabled={!result}
        saved={saved}
        onSave={() =>
          setContext((c) => ({
            ...c,
            investment: { ...c.investment, saved: true },
          }))
        }
      />
      <Method>
        <p>{t("i.investmentFormula")}</p>
        <p>{t("i.investmentWarning")}</p>
      </Method>
    </IntelligenceFrame>
  );
}
