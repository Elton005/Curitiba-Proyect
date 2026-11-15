import ResultInsights from "../components/intelligence/ResultInsights.jsx";
import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics.js";
import {
  calculateCommercialAdvanced,
  commercialDefaults,
  commercialLimits,
  commercialSensitivity,
  commercialScenarioIds,
} from "../utils/intelligenceCalculations.js";
import {
  IntelligenceFrame,
  Panel,
  NumericField,
  Metric,
  BarChart,
  LineChart,
  Notice,
  SaveActions,
  DataTable,
} from "../components/intelligence/AnalyticsUI.jsx";
import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";
import { calculatePotential, simulationLimits } from "../utils/simulator.js";
import { formatMoney, formatNumber } from "../utils/format.js";

export default function PotentialSimulator({ onPrepare, standalone = false }) {
  const { t, language, href } = useLocale();
  const ToolHeading = "h2";
  const [context, setContext] = useAnalytics();
  const [slot, setSlot] = useState("base");
  const { inputs, mode, saved, scenarios } = context.commercial;
  const advanced = mode === "advanced";
  const result = advanced
    ? calculateCommercialAdvanced(inputs)
    : calculatePotential(inputs);
  const slotLabel = (id) => `i.${id === "base" ? "baseScenario" : id}`;
  const money = (value) => formatMoney(value, language);
  const number = (value) => formatNumber(value, language);
  function update(key, value) {
    setContext((state) => {
      const current = state.commercial.inputs;
      const next = { ...current, [key]: value };
      if (
        key === "conversion" &&
        value !== "" &&
        Number.isFinite(Number(value))
      )
        next.conversionGain = Math.max(
          0,
          Math.min(Number(current.conversionGain), 100 - Number(value)),
        );
      return {
        ...state,
        commercial: { ...state.commercial, inputs: next, saved: false },
      };
    });
  }
  return (
    <IntelligenceFrame title="i.commercial" intro="i.commercialIntro">
      <section className="simulator-section int-commercial" id="simulador">
        <div>
          <Notice>{t("i.commercialWarning")}</Notice>
          <div
            className="int-mode-switch"
            role="group"
            aria-label={t("overview")}
          >
            {["basic", "advanced"].map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() =>
                  setContext((c) => ({
                    ...c,
                    commercial: { ...c.commercial, mode: value, saved: false },
                  }))
                }
              >
                {t(`i.${value}`)}
              </button>
            ))}
          </div>
          <SectionHeading
            as="h2"
            eyebrow="simulatorEyebrow"
            title="simulatorTitle"
            body="simulatorBody"
          />
          <div className="simulator-panel">
            <div className="simulator-controls">
              <div className="tool-title">
                <Icon name="chart" />
                <ToolHeading className="tool-heading">
                  {t("simulatorIntro")}
                </ToolHeading>
              </div>
              <div className="simulator-fields">
                {[
                  ["inquiries", "monthlyInquiries", "inquiriesHelp", 1],
                  ["conversion", "conversion", "conversionHelp", 0.1],
                  ["ticket", "ticket", "ticketHelp", 0.01],
                ].map(([key, label, help, step]) => (
                  <div className="field" key={key}>
                    <label htmlFor={`sim-${key}`}>{t(label)}</label>
                    <input
                      id={`sim-${key}`}
                      type="number"
                      inputMode="decimal"
                      min={simulationLimits[key][0]}
                      max={simulationLimits[key][1]}
                      step={step}
                      value={inputs[key]}
                      aria-describedby={`sim-help-${key}`}
                      aria-invalid={
                        inputs[key] === "" ||
                        Number(inputs[key]) < 0 ||
                        Number(inputs[key]) > simulationLimits[key][1]
                      }
                      onChange={(event) => update(key, event.target.value)}
                    />
                    <small id={`sim-help-${key}`}>{t(help)}</small>
                  </div>
                ))}
              </div>
              <div className="range-field">
                <label htmlFor="sim-growth">
                  {t("growth")}
                  <output htmlFor="sim-growth">
                    +{number(Number(inputs.growth))}%
                  </output>
                </label>
                <input
                  id="sim-growth"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={inputs.growth}
                  onChange={(event) => update("growth", event.target.value)}
                />
                <div className="range-limits">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="range-field">
                <label htmlFor="sim-conversionGain">
                  {t("conversionGain")}
                  <output htmlFor="sim-conversionGain">
                    +{number(Number(inputs.conversionGain))}{" "}
                    {t("percentagePoints")}
                  </output>
                </label>
                <input
                  id="sim-conversionGain"
                  type="range"
                  min="0"
                  max={Math.max(0, 100 - (Number(inputs.conversion) || 0))}
                  step="any"
                  value={inputs.conversionGain}
                  onChange={(event) =>
                    update("conversionGain", event.target.value)
                  }
                />
                <div className="range-limits">
                  <span>0 {t("percentagePoints")}</span>
                  <span>
                    {number(
                      Math.max(0, 100 - (Number(inputs.conversion) || 0)),
                    )}{" "}
                    {t("percentagePoints")}
                  </span>
                </div>
              </div>
              <details className="formula-details">
                <summary>{t("formula")}</summary>
                <p>{t("formulaCopy")}</p>
              </details>
            </div>
            <div
              className="simulator-results"
              aria-live="polite"
              aria-atomic="true"
            >
              {result ? (
                <>
                  <span className="data-label">
                    {t("illustrativeRevenue")} {t("perMonth")}
                  </span>
                  <div className="scenario-revenue">
                    <span>{t("scenario")}</span>
                    <strong data-testid="scenario-revenue">
                      {money(result.nextRevenue)}
                    </strong>
                  </div>
                  <div
                    className="revenue-comparison"
                    role="img"
                    aria-label={`${t("current")}: ${money(result.currentRevenue)}. ${t("scenario")}: ${money(result.nextRevenue)}.`}
                  >
                    <div>
                      <span>{t("current")}</span>
                      <b>{money(result.currentRevenue)}</b>
                      <i
                        style={{
                          width: `${result.nextRevenue ? (result.currentRevenue / result.nextRevenue) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <div>
                      <span>{t("scenario")}</span>
                      <b>{money(result.nextRevenue)}</b>
                      <i
                        style={{ width: `${result.nextRevenue ? 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  <table className="scenario-table">
                    <caption className="sr-only">{t("simulatorIntro")}</caption>
                    <thead>
                      <tr>
                        <th scope="col">
                          <span className="sr-only">{t("overview")}</span>
                        </th>
                        <th scope="col">{t("current")}</th>
                        <th scope="col">{t("scenario")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{t("monthlyInquiries")}</th>
                        <td>{number(result.currentInquiries)}</td>
                        <td>{number(result.nextInquiries)}</td>
                      </tr>
                      <tr>
                        <th scope="row">{t("conversion")}</th>
                        <td>{number(result.currentConversion)}%</td>
                        <td>{number(result.nextConversion)}%</td>
                      </tr>
                      <tr>
                        <th scope="row">{t("estimatedSales")}</th>
                        <td>{number(result.currentSales)}</td>
                        <td>{number(result.nextSales)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="scenario-difference">
                    <span>{t("difference")}</span>
                    <strong data-testid="scenario-difference">
                      +{money(result.difference)}
                    </strong>
                  </div>
                  <p className="int-relative-difference">
                    {t("i.relativeDifference")}:{" "}
                    <strong>
                      {result.percentDifference === null
                        ? t("i.na")
                        : `${number(result.percentDifference)}%`}
                    </strong>
                  </p>
                </>
              ) : (
                <p role="alert" className="form-error">
                  {t("invalidNumbers")}
                </p>
              )}
            </div>
          </div>
          {advanced && (
            <Panel title="i.costs">
              <div className="int-fields-grid">
                {["variableCost", "acquisitionCost", "digitalCost"].map(
                  (key) => (
                    <NumericField
                      key={key}
                      id={`sim-${key}`}
                      label={`i.${key}`}
                      value={inputs[key]}
                      min={0}
                      max={commercialLimits[key][1]}
                      onChange={(value) => update(key, value)}
                    />
                  ),
                )}
              </div>
              {result && (
                <>
                  <div className="int-metric-grid">
                    <Metric
                      label="i.currentContribution"
                      value={money(result.currentContribution)}
                      negative={result.currentContribution < 0}
                    />
                    <Metric
                      label="i.nextContribution"
                      value={money(result.nextContribution)}
                      negative={result.nextContribution < 0}
                    />
                    <Metric
                      label="i.marginContribution"
                      value={
                        result.nextContributionMarginPercent === null
                          ? t("i.na")
                          : `${number(result.nextContributionMarginPercent)}%`
                      }
                    />
                  </div>
                  <BarChart
                    title={t("i.scenarioDistribution")}
                    rows={[
                      { label: t("i.revenue"), value: result.nextRevenue },
                      {
                        label: t("i.variableTotal"),
                        value: result.nextVariableCosts,
                      },
                      {
                        label: t("i.acquisitionCost"),
                        value: result.nextAcquisitionCost,
                      },
                      {
                        label: t("i.digitalCost"),
                        value: result.nextDigitalCost,
                      },
                    ]}
                    format={money}
                  />
                  <LineChart
                    title={t("i.sensitivity")}
                    points={commercialSensitivity(inputs).map((row) => ({
                      label: `${number(row.conversion)}%`,
                      value: row.contribution,
                    }))}
                    format={money}
                    caption={t("i.sensitivityNote")}
                  />
                </>
              )}
              <p className="fine-print">{t("i.contributionNote")}</p>
            </Panel>
          )}
          <Panel title="i.scenarios">
            <p>{t("i.scenarioNote")}</p>
            <div className="int-scenario-controls">
              <div className="field">
                <label htmlFor="commercial-slot">{t("i.scenarioSlot")}</label>
                <select
                  id="commercial-slot"
                  value={slot}
                  onChange={(event) => setSlot(event.target.value)}
                >
                  {commercialScenarioIds.map((id) => (
                    <option key={id} value={id}>
                      {t(slotLabel(id))}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="button button-outline"
                disabled={!result}
                onClick={() =>
                  setContext((c) => ({
                    ...c,
                    commercial: {
                      ...c.commercial,
                      scenarios: [
                        ...c.commercial.scenarios.filter((s) => s.id !== slot),
                        {
                          id: slot,
                          inputs: advanced
                            ? { ...inputs }
                            : {
                                ...inputs,
                                variableCost: commercialDefaults.variableCost,
                                acquisitionCost:
                                  commercialDefaults.acquisitionCost,
                                digitalCost: commercialDefaults.digitalCost,
                              },
                          mode,
                        },
                      ],
                    },
                  }))
                }
              >
                {t("i.saveScenario")}
              </button>
            </div>
            {scenarios.length ? (
              <DataTable
                caption={t("i.scenarios")}
                rows={scenarios}
                columns={[
                  {
                    id: "id",
                    label: t("scenario"),
                    render: (row) => t(slotLabel(row.id)),
                  },
                  {
                    id: "mode",
                    label: t("overview"),
                    render: (row) =>
                      t(row.mode === "advanced" ? "i.advanced" : "i.basic"),
                  },
                  {
                    id: "revenue",
                    label: t("i.revenue"),
                    render: (row) =>
                      money(calculatePotential(row.inputs).nextRevenue),
                  },
                  {
                    id: "contribution",
                    label: t("i.contribution"),
                    render: (row) =>
                      row.mode === "advanced"
                        ? money(
                            calculateCommercialAdvanced(row.inputs)
                              .nextContribution,
                          )
                        : t("i.na"),
                  },
                  {
                    id: "actions",
                    label: t("i.assumptions"),
                    render: (row) => (
                      <div className="int-row-actions">
                        <button
                          type="button"
                          className="text-link"
                          onClick={() => {
                            setSlot(row.id);
                            setContext((c) => ({
                              ...c,
                              commercial: {
                                ...c.commercial,
                                inputs: row.inputs,
                                mode: row.mode,
                                saved: false,
                              },
                            }));
                          }}
                        >
                          {t("i.loadScenario")}
                        </button>
                        <button
                          type="button"
                          className="text-link"
                          onClick={() =>
                            setContext((c) => ({
                              ...c,
                              commercial: {
                                ...c.commercial,
                                scenarios: c.commercial.scenarios.filter(
                                  (s) => s.id !== row.id,
                                ),
                              },
                            }))
                          }
                        >
                          {t("i.remove")}
                        </button>
                      </div>
                    ),
                  },
                ]}
                rowKey={(row) => row.id}
              />
            ) : (
              <p className="fine-print">{t("i.noScenarios")}</p>
            )}
          </Panel>
          <ResultInsights kind="commercial" result={result} inputs={inputs} />
          <SaveActions
            disabled={!result}
            saved={saved}
            onSave={() =>
              setContext((c) => ({
                ...c,
                commercial: { ...c.commercial, saved: true },
              }))
            }
          />
          <p className="simulation-warning">
            <Icon name="info" />
            {t("simulatorWarning")}
          </p>
          <a
            className="text-link"
            href={href("quote")}
            onClick={() => {
              setContext((c) => ({
                ...c,
                commercial: { ...c.commercial, saved: Boolean(result) },
              }));
              onPrepare(
                ["business"],
                advanced
                  ? { kind: "intelligence", version: 1 }
                  : { kind: "simulator", inputs },
              );
            }}
          >
            {t("prepareBrief")}
            <Icon />
          </a>
        </div>
      </section>
    </IntelligenceFrame>
  );
}
