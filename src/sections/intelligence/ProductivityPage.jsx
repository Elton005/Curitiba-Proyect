import ResultInsights from "../../components/intelligence/ResultInsights.jsx";
import { useState } from "react";
import { useLocale } from "../../app/LocaleContext.jsx";
import { useAnalytics } from "../../hooks/useAnalytics.js";
import {
  calculateProductivity,
  productivityDefaults,
  productivityLimits,
} from "../../utils/intelligenceCalculations.js";
import { formatMoney, formatNumber } from "../../utils/format.js";
import {
  IntelligenceFrame,
  Panel,
  NumericField,
  Metric,
  BarChart,
  LineChart,
  Method,
  Notice,
  Invalid,
  SaveActions,
} from "../../components/intelligence/AnalyticsUI.jsx";

const presets = [
  ["presetRequests", 180, 12, 4],
  ["presetQuotes", 60, 35, 15],
  ["presetAppointments", 100, 8, 3],
  ["presetCatalogs", 80, 10, 4],
  ["presetReports", 12, 90, 35],
];
export default function ProductivityPage() {
  const { t, language } = useLocale();
  const [context, setContext] = useAnalytics();
  const [name, setName] = useState("");
  const { inputs, saved } = context.productivity;
  const result = calculateProductivity(inputs),
    money = (v) => formatMoney(v, language),
    number = (v) => formatNumber(v, language);
  function update(key, value) {
    setContext((c) => ({
      ...c,
      productivity: {
        inputs: { ...c.productivity.inputs, [key]: value },
        saved: false,
      },
    }));
  }
  const hours = (v) => `${number(v)} ${t("i.hours")}`;
  return (
    <IntelligenceFrame title="i.productivity" intro="i.productivityIntro">
      <Notice>{t("i.productivityWarning")}</Notice>
      <div className="int-calculator-grid">
        <Panel title="i.inputs">
          <div className="field">
            <label htmlFor="process-name">{t("i.processName")}</label>
            <input
              id="process-name"
              type="text"
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="int-fields-grid">
            {Object.keys(productivityDefaults).map((key) => (
              <NumericField
                key={key}
                id={`prod-${key}`}
                label={`i.${key}`}
                value={inputs[key]}
                min={productivityLimits[key][0]}
                max={productivityLimits[key][1]}
                optional={key === "recurringCost"}
                onChange={(value) => update(key, value)}
              />
            ))}
          </div>
        </Panel>
        <Panel title="i.results" className="int-result-panel">
          {result ? (
            <>
              <div className="int-metric-grid">
                <Metric
                  label="i.releasedHours"
                  value={hours(result.releasedHours)}
                  negative={result.releasedHours < 0}
                />
                <Metric
                  label="i.capacityValue"
                  value={money(result.capacityValue)}
                  negative={result.capacityValue < 0}
                />
                <Metric
                  label="i.recurringCost"
                  value={money(result.recurringCost)}
                />
                <Metric
                  label="i.annualReleasedHours"
                  value={hours(result.annualReleasedHours)}
                  note="i.perYear"
                />
              </div>
              <BarChart
                title={t("i.hours")}
                rows={[
                  { label: t("i.currentHours"), value: result.currentHours },
                  { label: t("i.nextHours"), value: result.nextHours },
                ]}
                format={hours}
              />
              {result.releasedHours < 0 && (
                <Notice danger>{t("i.worseProcess")}</Notice>
              )}
            </>
          ) : (
            <Invalid />
          )}
        </Panel>
      </div>
      {result && (
        <Panel title="i.annualSummary">
          <LineChart
            title={t("i.capacityCurve")}
            points={result.monthlyProjection.map((row) => ({
              label: `${t("i.month")} ${row.month}`,
              value: row.cumulativeReleasedHours,
            }))}
            format={hours}
            caption={`${t("i.capacityValue")}: ${money(result.annualCapacityValue)} · ${t("i.costs")} ${t("i.perYear")}: ${money(result.annualRecurringCost)}`}
          />
        </Panel>
      )}
      <ResultInsights kind="productivity" result={result} inputs={inputs} />
      <SaveActions
        disabled={!result}
        saved={saved}
        onSave={() =>
          setContext((c) => ({
            ...c,
            productivity: { ...c.productivity, saved: true },
          }))
        }
      />
      <Panel title="i.examples">
        <p>{t("i.presetsNote")}</p>
        <div className="int-preset-list">
          {presets.map(([label, tasks, currentMinutes, newMinutes]) => (
            <button
              type="button"
              className="button button-outline button-small"
              key={label}
              onClick={() =>
                setContext((c) => ({
                  ...c,
                  productivity: {
                    inputs: {
                      ...productivityDefaults,
                      tasks,
                      currentMinutes,
                      newMinutes,
                    },
                    saved: false,
                  },
                }))
              }
            >
              {t(`i.${label}`)}
            </button>
          ))}
        </div>
      </Panel>
      <Method>
        <p>{t("i.productivityFormula")}</p>
        <p>{t("i.productivityWarning")}</p>
      </Method>
    </IntelligenceFrame>
  );
}
