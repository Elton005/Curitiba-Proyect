import { useLocale } from "../../app/LocaleContext.jsx";
import { formatMoney, formatNumber } from "../../utils/format.js";
import { BarChart, LineChart, DataTable, Notice } from "./AnalyticsUI.jsx";
import {
  marketCatalog,
  dimensionLabel,
} from "../../data/intelligence/market.js";

import { inputLabels as fieldLabels } from "../../data/intelligence/inputLabels.js";
const scenarioLabel = (id) => `i.${id === "base" ? "baseScenario" : id}`;
export default function PrintableReport({ snapshot }) {
  const { t, language } = useLocale(),
    money = (v) => formatMoney(v, language),
    number = (v) => formatNumber(v, language);
  const assumptions = (inputs, basic = false) => (
    <dl className="int-report-assumptions">
      {Object.entries(inputs)
        .filter(
          ([key]) =>
            fieldLabels[key] &&
            (!basic ||
              !["variableCost", "acquisitionCost", "digitalCost"].includes(
                key,
              )),
        )
        .map(([key, value]) => (
          <div key={key}>
            <dt>{t(fieldLabels[key])}</dt>
            <dd>{number(Number(value))}</dd>
          </div>
        ))}
    </dl>
  );
  const moduleNames = {
    market: "i.market",
    commercial: "i.commercial",
    productivity: "i.productivity",
    investment: "i.investment",
    sector: "i.sectors",
    diagnostic: "diagnosticName",
  };
  const c = snapshot.commercial,
    p = snapshot.productivity?.result,
    inv = snapshot.investment?.result;
  return (
    <article className="int-report-document" aria-label={t("i.reportPreview")}>
      <header className="int-report-cover">
        <span className="int-report-logo">
          LOOP AVANTE <span>↗</span>
        </span>
        <p className="eyebrow">{t("i.cover")}</p>
        <h2>{t("i.report")}</h2>
        <p>
          {new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "es", {
            dateStyle: "long",
          }).format(new Date())}{" "}
          · v1
        </p>
        <p>{t("i.reportLimit")}</p>
      </header>
      <section className="int-report-section">
        <h3>01 · {t("i.summary")}</h3>
        <p>{t("i.reportSavedOnly")}</p>
        {c && (
          <p>
            <strong>
              {t("i.revenue")}: {money(c.result.currentRevenue)} →{" "}
              {money(c.result.nextRevenue)}
            </strong>{" "}
            · {t("i.illustrative")}
          </p>
        )}
        {p && (
          <p>
            <strong>
              {t("i.releasedHours")}: {number(p.releasedHours)} {t("i.hours")}
            </strong>{" "}
            · {t("i.productivityWarning")}
          </p>
        )}
        {inv && (
          <p>
            <strong>
              {t("i.accumulated")}: {money(inv.accumulated)} / {inv.horizon}{" "}
              {t("i.months")}
            </strong>{" "}
            · {t("i.illustrative")}
          </p>
        )}
        <h4>{t("i.modulesUsed")}</h4>
        <ul className="int-module-list">
          {Object.entries(moduleNames).map(([id, label]) => (
            <li key={id}>
              <span>{t(label)}</span>
              <strong>
                {snapshot.modulesUsed.includes(id) ? "✓" : t("i.notEvaluated")}
              </strong>
            </li>
          ))}
        </ul>
      </section>
      <section className="int-report-section">
        <h3>02 · {t("i.context")}</h3>
        {snapshot.sector ? (
          <>
            <h4>{t(snapshot.sector.title)}</h4>
            <p>{t(snapshot.sector.description)}</p>
            <p>{t(snapshot.sector.statisticalMapping.note)}</p>
          </>
        ) : (
          <p>
            {t("i.chooseSector")}: {t("i.notEvaluated")}
          </p>
        )}
        {snapshot.diagnostic && (
          <>
            <h4>{t("diagnosticName")}</h4>
            <ul>
              {snapshot.diagnostic.priorities.map((item) => (
                <li key={item.id}>{t(item.recommendation)}</li>
              ))}
            </ul>
          </>
        )}
      </section>
      {snapshot.marketRows.length > 0 && (
        <section className="int-report-section">
          <h3>03 · {t("i.official")}</h3>
          <p>{t(marketCatalog.population)}</p>
          <DataTable
            caption={t("i.observations")}
            rows={snapshot.marketRows}
            columns={[
              {
                id: "variable",
                label: t("i.indicator"),
                render: (row) => (
                  <>
                    <strong>{t(row.variable)}</strong>
                    <small>
                      {row.indicator} · {row.year} ·{" "}
                      {dimensionLabel("region", row.region, language)} /{" "}
                      {dimensionLabel("size", row.size, language)} /{" "}
                      {dimensionLabel("sector", row.sector, language)}
                    </small>
                  </>
                ),
              },
              {
                id: "value",
                label: t("i.value"),
                render: (row) => `${row.value}%`,
              },
              {
                id: "denominator",
                label: t("i.base"),
                render: (row) => t(row.denominatorLabel),
              },
            ]}
          />
          <p>{t(marketCatalog.limitation)}</p>
          <p>{t("i.margin")}</p>
        </section>
      )}
      {c && (
        <section className="int-report-section">
          <h3>04 · {t("i.commercial")}</h3>
          <p className="int-report-badge">
            {t("i.illustrative")} ·{" "}
            {t(c.mode === "advanced" ? "i.advanced" : "i.basic")}
            {c.sourceScenarioId
              ? ` · ${t(scenarioLabel(c.sourceScenarioId))}`
              : ""}
          </p>
          <BarChart
            title={t("i.revenue")}
            rows={[
              { label: t("current"), value: c.result.currentRevenue },
              { label: t("scenario"), value: c.result.nextRevenue },
            ]}
            format={money}
          />
          {c.mode === "advanced" && (
            <>
              <BarChart
                title={t("i.contribution")}
                rows={[
                  { label: t("current"), value: c.result.currentContribution },
                  { label: t("scenario"), value: c.result.nextContribution },
                ]}
                format={money}
              />
              <p>{t("i.contributionNote")}</p>
            </>
          )}
          <h4>{t("i.assumptions")}</h4>
          {assumptions(c.inputs, c.mode === "basic")}
          {c.scenarios.length > 0 && (
            <>
              <h4>{t("i.scenarios")}</h4>
              <DataTable
                caption={t("i.scenarios")}
                rows={c.scenarios}
                columns={[
                  {
                    id: "id",
                    label: t("scenario"),
                    render: (row) => t(scenarioLabel(row.id)),
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
                    render: (row) => money(row.result.nextRevenue),
                  },
                  {
                    id: "contribution",
                    label: t("i.contribution"),
                    render: (row) =>
                      row.mode === "advanced"
                        ? money(row.result.nextContribution)
                        : t("i.na"),
                  },
                ]}
              />
              {c.scenarios.map((row) => (
                <div key={row.id} className="int-scenario-assumptions">
                  <h4>{t(scenarioLabel(row.id))}</h4>
                  {assumptions(row.inputs, row.mode === "basic")}
                </div>
              ))}
              <p>{t("i.scenarioNote")}</p>
            </>
          )}
          <Notice>{t("i.commercialWarning")}</Notice>
        </section>
      )}
      {p && (
        <section className="int-report-section">
          <h3>05 · {t("i.productivity")}</h3>
          <p className="int-report-badge">{t("i.illustrative")}</p>
          <BarChart
            title={t("i.hours")}
            rows={[
              { label: t("i.currentHours"), value: p.currentHours },
              { label: t("i.nextHours"), value: p.nextHours },
              { label: t("i.releasedHours"), value: p.releasedHours },
            ]}
            format={(v) => `${number(v)} ${t("i.hours")}`}
          />
          <p>
            <strong>
              {t("i.capacityValue")}: {money(p.capacityValue)}
            </strong>{" "}
            · {t("i.recurringCost")}: {money(p.recurringCost)}
          </p>
          <LineChart
            title={`${t("i.capacityCurve")} · ${t("i.perYear")}`}
            points={p.monthlyProjection.map((row) => ({
              label: row.month,
              value: row.cumulativeReleasedHours,
            }))}
          />
          <h4>{t("i.assumptions")}</h4>
          {assumptions(snapshot.productivity.inputs)}
          <p>{t("i.productivityFormula")}</p>
          <Notice>{t("i.productivityWarning")}</Notice>
        </section>
      )}
      {inv && (
        <section className="int-report-section">
          <h3>06 · {t("i.investment")}</h3>
          <p className="int-report-badge">{t("i.illustrative")}</p>
          <dl className="int-report-assumptions">
            {[
              ["i.netMonthly", money(inv.netMonthly)],
              ["i.accumulated", money(inv.accumulated)],
              [
                "i.roi",
                inv.roiPercent === null
                  ? t("i.na")
                  : `${number(inv.roiPercent)}%`,
              ],
              [
                "i.payback",
                inv.paybackMonths === null
                  ? t("i.na")
                  : `${number(inv.paybackMonths)} ${t("i.months")}`,
              ],
            ].map(([key, value]) => (
              <div key={key}>
                <dt>{t(key)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <LineChart
            title={t("i.cashFlow")}
            points={inv.cashFlow.map((row) => ({
              label: row.month,
              value: row.cumulative,
            }))}
            format={money}
          />
          <h4>{t("i.assumptions")}</h4>
          {assumptions(snapshot.investment.inputs)}
          {snapshot.investment.capacityImport && (
            <p>
              {t("i.confirmedAmount")}:{" "}
              {money(snapshot.investment.capacityImport.amount)}.{" "}
              {t("i.confirmCash")}
            </p>
          )}
          <p>{t("i.investmentFormula")}</p>
          <Notice>{t("i.investmentWarning")}</Notice>
        </section>
      )}
      <section className="int-report-section">
        <h3>07 · {t("i.recommendations")}</h3>
        <ol className="int-report-recommendations">
          {snapshot.recommendations.map((item) => (
            <li key={item.solution}>
              <h4>{t(item.title)}</h4>
              <p>{t(item.reason)}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="int-report-section">
        <h3>08 · {t("i.nextSteps")}</h3>
        <p>{t("i.personalSolution")}</p>
        <p>{t("i.reportLimit")}</p>
      </section>
      <section className="int-report-section int-report-sources">
        <h3>09 · {t("i.sources")}</h3>
        {snapshot.sources.length ? (
          <ol>
            {snapshot.sources.map((source) => (
              <li key={source.id}>
                <strong>
                  {source.title} · {t(source.variable)}
                </strong>
                <p>{t(source.definition)}</p>
                <a href={source.url}>{source.url}</a>
              </li>
            ))}
          </ol>
        ) : (
          <p>
            {t("i.official")}: {t("i.notEvaluated")}
          </p>
        )}
        <p>{t("i.simulationSources")}</p>
        <p>{t("i.sessionNote")}</p>
      </section>
    </article>
  );
}
