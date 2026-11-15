import { useState } from "react";
import { useLocale } from "../app/LocaleContext.jsx";
import { marketData } from "../data/market.js";
import { b } from "../data/translations.js";
export default function IntelligencePreview() {
  const { t, href } = useLocale(),
    [id, setId] = useState("website"),
    row = marketData.find((r) => r.id === id);
  return (
    <section className="section intelligence-preview">
      <div className="container">
        <div>
          <p className="eyebrow">{t("i.name")}</p>
          <h2>
            {t(
              b(
                "Uma pergunta. Um dado com contexto.",
                "Una pregunta. Un dato con contexto.",
              ),
            )}
          </h2>
          <p>{t("i.sourcesIntro")}</p>
          <a className="text-link" href={href("intelligence")}>
            {t("i.explore")} →
          </a>
        </div>
        <div className="preview-observation">
          <label htmlFor="preview-indicator">{t("i.indicator")}</label>
          <select
            id="preview-indicator"
            value={id}
            onChange={(e) => setId(e.target.value)}
          >
            {marketData.map((r) => (
              <option key={r.id} value={r.id}>
                {t(r.label)}
              </option>
            ))}
          </select>
          <strong>{row.value}%</strong>
          <p>{t(row.definition)}</p>
          <small>
            {t(row.population)} · {row.year} · Cetic.br
          </small>
          <a href={row.url} target="_blank" rel="noopener noreferrer">
            {t("i.sources")} · {row.indicator}
          </a>
        </div>
      </div>
    </section>
  );
}
