import SectorAssessment from "../../components/intelligence/SectorAssessment.jsx";
import { filterObservations } from "../../data/intelligence/market.js";
import { useLocale } from "../../app/LocaleContext.jsx";
import { useAnalytics } from "../../hooks/useAnalytics.js";
import {
  sectorProfiles,
  getSectorProfile,
  sectorRecommendationMethod,
} from "../../data/intelligence/sectors.js";
import {
  IntelligenceFrame,
  Panel,
  Method,
  Notice,
  SaveActions,
} from "../../components/intelligence/AnalyticsUI.jsx";
import Icon from "../../components/Icon.jsx";

export default function SectorsPage({ onPrepare }) {
  const { t, href } = useLocale(),
    [context, setContext] = useAnalytics(),
    profile = getSectorProfile(context.sectorId);
  const referenceRow = profile?.referenceSectorId
    ? filterObservations({
        indicatorId: "website",
        year: 2025,
        region: "all",
        size: "all",
        sector: profile.referenceSectorId,
      })[0]
    : null;
  return (
    <IntelligenceFrame
      title="i.sectors"
      intro="i.sectorsIntro"
      type="editorial"
    >
      <Notice>{t("i.sectorNote")}</Notice>
      <Panel title="i.chooseSector">
        <label className="sr-only" htmlFor="sector-profile">
          {t("i.chooseSector")}
        </label>
        <select
          id="sector-profile"
          value={context.sectorId || ""}
          onChange={(e) =>
            setContext((c) => ({ ...c, sectorId: e.target.value || null }))
          }
        >
          <option value="">{t("i.choose")}</option>
          {sectorProfiles.map((p) => (
            <option key={p.id} value={p.id}>
              {t(p.title)}
            </option>
          ))}
        </select>
      </Panel>
      {profile && (
        <>
          <section className="int-sector-intro">
            <h2>{t(profile.title)}</h2>
            <p>{t(profile.description)}</p>
          </section>
          <SectorAssessment sectorId={profile.id} onPrepare={onPrepare} />
          <div className="int-three-grid">
            {["processes", "exampleProblems", "applications"].map((key) => (
              <Panel key={key} title={`i.${key}`}>
                <ul className="int-editorial-list">
                  {profile[key].map((text, index) => (
                    <li key={index}>{t(text)}</li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
          <Panel title="i.priorities">
            <ol className="int-priorities">
              {profile.priorities.map((item) => (
                <li key={item.id}>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.reason)}</p>
                  <a className="text-link" href={href(item.tool)}>
                    {t(
                      item.tool === "diagnostic"
                        ? "diagnosticName"
                        : `i.${item.tool === "simulator" ? "commercial" : item.tool}`,
                    )}
                    <Icon />
                  </a>
                </li>
              ))}
            </ol>
          </Panel>
          <Panel title="i.officialReference">
            {profile.statisticalMapping.officialLabel ? (
              <h3>{t(profile.statisticalMapping.officialLabel)}</h3>
            ) : (
              <p>{t("i.noSectorStats")}</p>
            )}
            <p>{t(profile.statisticalMapping.note)}</p>
            {referenceRow && (
              <p>
                <strong>
                  {referenceRow.value}% · {t(referenceRow.variable)}
                </strong>
                <br />
                {t(referenceRow.denominatorLabel)} · {referenceRow.year} ·{" "}
                <a
                  href={referenceRow.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cetic.br / {referenceRow.indicator}
                </a>
              </p>
            )}
            {profile.referenceSectorId && (
              <a
                href={href("market")}
                className="text-link"
                onClick={() =>
                  setContext((c) => ({
                    ...c,
                    market: {
                      ...c.market,
                      filters: {
                        indicatorId: "website",
                        year: 2025,
                        region: "all",
                        size: "all",
                        sector: profile.referenceSectorId,
                      },
                    },
                  }))
                }
              >
                {t("i.market")}
                <Icon />
              </a>
            )}
          </Panel>
          <SaveActions
            saved
            onSave={() => setContext((c) => ({ ...c, sectorId: profile.id }))}
          />
          <a
            className="button button-outline"
            href={href("quote")}
            onClick={() =>
              onPrepare(
                profile.priorities.map((p) => p.solution),
                { kind: "intelligence", version: 1 },
              )
            }
          >
            {t("i.personalSolution")}
            <Icon />
          </a>
        </>
      )}
      <Method>
        <p>{t(sectorRecommendationMethod)}</p>
      </Method>
    </IntelligenceFrame>
  );
}
