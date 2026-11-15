import { useState } from "react";
import { useLocale } from "../../app/LocaleContext.jsx";
import { useAnalytics } from "../../hooks/useAnalytics.js";
import { analyticsDefaults } from "../../utils/analyticsContext.js";
import { liveIntelligenceReport } from "../../utils/intelligenceReport.js";
import {
  IntelligenceFrame,
  Empty,
  Notice,
} from "../../components/intelligence/AnalyticsUI.jsx";
import PrintableReport from "../../components/intelligence/PrintableReport.jsx";
import Icon from "../../components/Icon.jsx";
export default function ReportPage({ onPrepare }) {
  const { t, href } = useLocale(),
    [context, setContext] = useAnalytics(),
    [cleared, setCleared] = useState(false),
    snapshot = liveIntelligenceReport(context),
    hasData = snapshot.modulesUsed.length > 0;
  return (
    <IntelligenceFrame title="i.report" intro="i.reportIntro" type="session">
      <section
        className="report-overview"
        aria-labelledby="report-overview-title"
      >
        <h2 id="report-overview-title">
          {t({
            pt: "O que vai entrar no seu documento",
            es: "Qué se incluirá en tu documento",
          })}
        </h2>
        <ul>
          {[
            ["market", "i.market"],
            ["commercial", "i.commercial"],
            ["productivity", "i.productivity"],
            ["investment", "i.investment"],
            ["sector", "i.sectors"],
            ["diagnostic", "diagnosticName"],
          ].map(([id, label]) => (
            <li key={id}>
              <span>{t(label)}</span>
              <strong>
                {t(
                  snapshot.modulesUsed.includes(id)
                    ? { pt: "Incluído", es: "Incluido" }
                    : {
                        pt: "Pendente de inclusão",
                        es: "Pendiente de inclusión",
                      },
                )}
              </strong>
            </li>
          ))}
        </ul>
        <p>{t("i.reportSavedOnly")}</p>
      </section>
      <div className="int-report-actions">
        <button
          type="button"
          className="button"
          disabled={!hasData}
          onClick={() => window.print()}
        >
          <Icon name="document" />
          {t("i.print")}
        </button>
        <button
          type="button"
          className="button button-outline"
          onClick={() => {
            setContext(analyticsDefaults());
            setCleared(true);
          }}
        >
          {t("i.clear")}
        </button>
        <span role="status">{cleared ? t("i.clearDone") : ""}</span>
      </div>
      <Notice>{t("i.reportSavedOnly")}</Notice>
      {hasData ? (
        <>
          <div className="int-report-host">
            <PrintableReport snapshot={snapshot} />
          </div>
          <div className="int-commercial-cta">
            <div>
              <h2>{t("i.nextSteps")}</h2>
              <p>{t("i.personalSolution")}</p>
            </div>
            <a
              className="button"
              href={href("quote")}
              onClick={() =>
                onPrepare(
                  snapshot.recommendations.map((r) => r.solution),
                  { kind: "intelligence", version: 1 },
                )
              }
            >
              {t("requestQuote")}
              <Icon />
            </a>
          </div>
        </>
      ) : (
        <Empty title="i.reportEmpty" body="i.reportEmptyBody">
          <a href={href("intelligence")} className="button">
            {t("i.explore")}
            <Icon />
          </a>
        </Empty>
      )}
    </IntelligenceFrame>
  );
}
