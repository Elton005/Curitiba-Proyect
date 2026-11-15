import { useState } from "react";
import { useLocale } from "../../app/LocaleContext.jsx";
import Icon from "../../components/Icon.jsx";
import {
  IntelligenceFrame,
  Panel,
  Metric,
  BarChart,
  Method,
} from "../../components/intelligence/AnalyticsUI.jsx";
import { intelligenceTools } from "../../data/intelligence/tools.js";
import {
  indicatorDefinitions,
  filterObservations,
  getComparisonObservations,
  dimensionLabel,
  marketCatalog,
} from "../../data/intelligence/market.js";

export default function IntelligenceHome() {
  const { t, href, language } = useLocale();
  const [indicator, setIndicator] = useState("website");
  const comparison = getComparisonObservations(indicator, "region");
  return (
    <IntelligenceFrame home title="i.promise" intro="i.intro">
      <div className="int-home-actions">
        <a className="button" href="#int-tools">
          {t("i.explore")}
          <Icon />
        </a>
        <a href={href("report")} className="text-link">
          {t("i.viewReport")}
          <Icon name="document" />
        </a>
      </div>
      <div className="int-metric-grid int-home-kpis">
        {["website", "messagingPresence", "crm"].map((id) => {
          const row = filterObservations({
            indicatorId: id,
            year: 2025,
            region: "all",
            size: "all",
            sector: "all",
          })[0];
          return (
            <Metric
              key={id}
              label={indicatorDefinitions[id].label}
              value={`${row.value}%`}
              note={
                <span>
                  {t(row.denominatorLabel)} · 2025 · {row.indicator}
                </span>
              }
            />
          );
        })}
      </div>
      <div className="int-home-feature">
        <Panel
          title="i.demonstration"
          action={
            <select
              aria-label={t("i.indicator")}
              value={indicator}
              onChange={(event) => setIndicator(event.target.value)}
            >
              {["website", "messagingPresence", "crm"].map((id) => (
                <option key={id} value={id}>
                  {t(indicatorDefinitions[id].label)}
                </option>
              ))}
            </select>
          }
        >
          <BarChart
            title={t(indicatorDefinitions[indicator].label)}
            rows={comparison.map((row) => ({
              id: row.id,
              label: dimensionLabel("region", row.region, language),
              value: row.value,
            }))}
            format={(value) => `${value}%`}
            caption={t(
              indicatorDefinitions[indicator].denominatorLabel ||
                comparison[0].denominatorLabel,
            )}
          />
        </Panel>
        <div className="int-editorial-note">
          <span className="eyebrow">{t("i.official")}</span>
          <h2>{t("i.sources")}</h2>
          <p>{t("i.sourcesIntro")}</p>
          <p className="fine-print">{t(marketCatalog.population)}</p>
          <a href={href("market")} className="text-link">
            {t("i.market")}
            <Icon />
          </a>
        </div>
      </div>
      <section id="int-tools" className="int-tools-section">
        <h2>{t("i.toolsHeading")}</h2>
        <div className="int-catalog-grid">
          {intelligenceTools.map((tool, index) => (
            <article key={tool.page} className="int-tool-card">
              <div>
                <Icon name={tool.icon} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <span className="int-data-badge">
                {t(
                  tool.type === "official"
                    ? "i.official"
                    : tool.type === "editorial"
                      ? "i.editorial"
                      : tool.type === "session"
                        ? "i.sessionReport"
                        : "i.illustrative",
                )}
              </span>
              <h3>{t(tool.name)}</h3>
              <p>{t(tool.intro)}</p>
              <a href={href(tool.page)} className="text-link">
                {t("i.explore")}
                <Icon />
              </a>
            </article>
          ))}
        </div>
      </section>
      <Method title="i.sources">
        <p>{t(marketCatalog.population)}</p>
        <p>{t(marketCatalog.collection)}</p>
        <p>{t(marketCatalog.limitation)}</p>
        <a
          href={marketCatalog.methodologyUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {marketCatalog.source} · {marketCatalog.study} ↗
        </a>
      </Method>
      <div className="int-commercial-cta">
        <div>
          <h2>{t("i.personalSolution")}</h2>
          <p>{t("quoteBody")}</p>
        </div>
        <a className="button" href={href("quote")}>
          {t("requestQuote")}
          <Icon />
        </a>
      </div>
    </IntelligenceFrame>
  );
}
