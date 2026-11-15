import ResultInsights from "../../components/intelligence/ResultInsights.jsx";
import { useState, useMemo } from "react";
import { useLocale } from "../../app/LocaleContext.jsx";
import { useAnalytics } from "../../hooks/useAnalytics.js";
import {
  IntelligenceFrame,
  Panel,
  Metric,
  BarChart,
  Method,
  Notice,
  SaveActions,
  Empty,
  DataTable,
} from "../../components/intelligence/AnalyticsUI.jsx";
import {
  indicatorDefinitions,
  dimensions,
  filterObservations,
  getAvailableFilters,
  getComparisonObservations,
  dimensionLabel,
  marketCatalog,
  observationsToCsv,
  defaultMarketFilters,
} from "../../data/intelligence/market.js";
import { downloadText } from "../../utils/format.js";

export default function MarketExplorer() {
  const { t, language } = useLocale();
  const [context, setContext] = useAnalytics();
  const [group, setGroup] = useState("region");
  const filters = context.market.filters;
  const rows = useMemo(() => filterObservations(filters), [filters]);
  const available = getAvailableFilters(filters);
  const definition = indicatorDefinitions[filters.indicatorId];
  const comparison = getComparisonObservations(
    filters.indicatorId,
    group,
    filters.year,
  );
  function change(key, value) {
    setContext((current) => {
      current.market.filters = {
        ...current.market.filters,
        [key]: key === "year" ? Number(value) : value,
      };
      return current;
    });
  }
  function toggle(id) {
    setContext((current) => {
      current.market.observationIds = current.market.observationIds.includes(id)
        ? current.market.observationIds.filter((existing) => existing !== id)
        : [...current.market.observationIds, id].slice(0, 32);
      return current;
    });
  }
  const columns = [
    {
      id: "selected",
      label: t("i.keep"),
      render: (row) => (
        <input
          type="checkbox"
          aria-label={`${t("i.keep")}: ${t(row.variable)} ${row.id}`}
          checked={context.market.observationIds.includes(row.id)}
          onChange={() => toggle(row.id)}
          disabled={
            context.market.observationIds.length >= 32 &&
            !context.market.observationIds.includes(row.id)
          }
        />
      ),
    },
    {
      id: "variable",
      label: t("i.indicator"),
      render: (row) => t(row.variable),
    },
    { id: "value", label: t("i.value"), render: (row) => `${row.value}%` },
    { id: "year", label: t("i.year") },
    {
      id: "region",
      label: t("i.region"),
      render: (row) => dimensionLabel("region", row.region, language),
    },
    {
      id: "size",
      label: t("i.size"),
      render: (row) => dimensionLabel("size", row.size, language),
    },
    {
      id: "sector",
      label: t("i.sector"),
      render: (row) => dimensionLabel("sector", row.sector, language),
    },
    {
      id: "source",
      label: t("i.sources"),
      render: (row) => (
        <a href={row.url} target="_blank" rel="noopener noreferrer">
          {row.indicator} ↗
        </a>
      ),
    },
  ];
  return (
    <IntelligenceFrame title="i.market" intro="i.marketIntro" type="official">
      <div className="int-market-layout">
        <aside className="int-panel int-filters">
          <h2>{t("i.indicator")}</h2>
          <div className="field">
            <label htmlFor="market-indicator">{t("i.indicator")}</label>
            <select
              id="market-indicator"
              value={filters.indicatorId}
              onChange={(event) => change("indicatorId", event.target.value)}
            >
              {Object.entries(indicatorDefinitions).map(([id, def]) => (
                <option key={id} value={id}>
                  {t(def.label)}
                </option>
              ))}
            </select>
          </div>
          {[
            ["year", "i.year"],
            ["region", "i.region"],
            ["size", "i.size"],
            ["sector", "i.sector"],
          ].map(([key, label]) => {
            const options = available[key] || dimensions[key];
            return (
              <div className="field" key={key}>
                <label htmlFor={`market-${key}`}>{t(label)}</label>
                <select
                  id={`market-${key}`}
                  value={filters[key]}
                  onChange={(event) => change(key, event.target.value)}
                >
                  {!options.some(
                    (option) => String(option.id) === String(filters[key]),
                  ) && (
                    <option value={filters[key]}>
                      {dimensionLabel(key, filters[key], language)}
                    </option>
                  )}
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {t(option.label)}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
          <button
            className="button button-outline"
            type="button"
            onClick={() =>
              setContext((current) => ({
                ...current,
                market: {
                  ...current.market,
                  filters: { ...defaultMarketFilters },
                },
              }))
            }
          >
            {t("i.reset")}
          </button>
          <p className="fine-print">
            {t("i.kept")}: {context.market.observationIds.length}/32
          </p>
        </aside>
        <div className="int-market-results">
          {rows.length ? (
            <>
              <div className="int-metric-grid">
                <Metric
                  label={definition.label}
                  value={`${rows[0].value}%`}
                  note={
                    <span>
                      {t(rows[0].denominatorLabel)} · {filters.year}
                    </span>
                  }
                />
                <Metric
                  label="i.observations"
                  value={String(rows.length)}
                  note={<span>{marketCatalog.study}</span>}
                />
              </div>
              <Panel
                title="i.compareBy"
                action={
                  <select
                    aria-label={t("i.compareBy")}
                    value={group}
                    onChange={(event) => setGroup(event.target.value)}
                  >
                    {[
                      ["region", "i.region"],
                      ["size", "i.size"],
                      ["sector", "i.sector"],
                    ].map(([id, key]) => (
                      <option key={id} value={id}>
                        {t(key)}
                      </option>
                    ))}
                  </select>
                }
              >
                <BarChart
                  title={t(definition.label)}
                  rows={comparison.map((row) => ({
                    id: row.id,
                    label: dimensionLabel(group, row[group], language),
                    value: row.value,
                  }))}
                  format={(value) => `${value}%`}
                  caption={t("i.comparisonNote")}
                />
              </Panel>
              <Notice>
                {t(rows[0].denominatorLabel)}. {t(marketCatalog.population)}
              </Notice>
            </>
          ) : (
            <Empty />
          )}
        </div>
      </div>
      <Panel
        title="i.observations"
        action={
          <button
            type="button"
            className="button button-small button-outline"
            disabled={!rows.length}
            onClick={() =>
              downloadText(
                `loop-avante-mercado-${language}.csv`,
                observationsToCsv(rows, language),
              )
            }
          >
            {t("i.csv")}
          </button>
        }
      >
        {rows.length ? (
          <DataTable
            caption={t("i.observations")}
            rows={rows}
            columns={columns}
            rowKey={(row) => row.id}
          />
        ) : (
          <Empty />
        )}
      </Panel>
      <ResultInsights kind="market" result={rows[0]} />
      <SaveActions
        disabled={!rows.length}
        saved={
          rows.length > 0 &&
          rows.every((row) => context.market.observationIds.includes(row.id))
        }
        onSave={() =>
          setContext((current) => {
            current.market.observationIds = [
              ...new Set([
                ...current.market.observationIds,
                ...rows.map((row) => row.id),
              ]),
            ].slice(0, 32);
            return current;
          })
        }
      />
      <Method>
        <p>{t(definition.definition)}</p>
        <p>{t(marketCatalog.population)}</p>
        <p>{t(marketCatalog.limitation)}</p>
        <p>{t("i.margin")}</p>
        <p>{t(definition.notes)}</p>
        <a href={definition.url} target="_blank" rel="noopener noreferrer">
          {marketCatalog.source} · {definition.code} ↗
        </a>
      </Method>
    </IntelligenceFrame>
  );
}
