import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";
import { crmData, marketData, marketStudy } from "../data/market.js";

export function MarketDataCharts() {
  const { t } = useLocale();
  return (
    <figure className="market-chart">
      <figcaption>{t("marketChart")}</figcaption>
      <div className="market-bars">
        {marketData.map((d) => (
          <div className={`market-row market-${d.id}`} key={d.id}>
            <div>
              <span>{t(d.label)}</span>
              <strong>{d.value}%</strong>
            </div>
            <div className="bar-track" aria-hidden="true">
              <span style={{ width: `${d.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="fine-print">{t("marketPopulation")}</p>
    </figure>
  );
}
export default function ImpactSection() {
  const { t } = useLocale();
  return (
    <section className="section dark-section impact-section" id="impacto">
      <div className="container">
        <SectionHeading
          eyebrow="impactEyebrow"
          title="impactTitle"
          body="impactBody"
        />
        <div className="impact-layout">
          <div className="impact-feature">
            <span className="data-label">TIC EMPRESAS / 2025</span>
            <div className="impact-value">
              56<span>%</span>
            </div>
            <h3>{t("websiteHeadline")}</h3>
            <p>{t("marketPopulation")}</p>
            <a
              className="text-link"
              href={marketData[2].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cetic.br · B6
              <Icon name="external" />
            </a>
          </div>
          <MarketDataCharts />
        </div>
        <div className="crm-insight">
          <Icon name="users" />
          <div>
            <h3>{t("crmTitle")}</h3>
            <p>
              <strong>31%</strong> {t("crmCopy")}
            </p>
            <p className="fine-print">
              {t("crmBase")}{" "}
              <a href={crmData.url} target="_blank" rel="noopener noreferrer">
                G3 ↗
              </a>
            </p>
          </div>
        </div>
        <p className="research-note">
          <Icon name="info" />
          {t("marketNote")}
        </p>
        <details className="sources-details">
          <summary>
            {t("sources")}
            <Icon name="chevron" />
          </summary>
          <div className="source-content">
            <p>
              <strong>{marketStudy.name}</strong> · {t(marketStudy.population)}
            </p>
            <ul>
              {marketData.map((d) => (
                <li key={d.id}>
                  <a href={d.url} target="_blank" rel="noopener noreferrer">
                    {d.indicator} · {d.value}% · {t(d.label)} ↗
                  </a>
                  <p>
                    {t(d.definition)} {t(d.population)} {d.year}.
                  </p>
                </li>
              ))}
              <li>
                <a href={crmData.url} target="_blank" rel="noopener noreferrer">
                  G3 · 31% · CRM ↗
                </a>
                <p>
                  {t("crmCopy")} {t(crmData.population)} 2025.
                </p>
              </li>
            </ul>
            <a
              href={marketStudy.methodology}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cetic.br · TIC Empresas 2025 (PDF) ↗
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}
