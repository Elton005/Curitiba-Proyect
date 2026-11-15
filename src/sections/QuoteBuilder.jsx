import { useEffect, useRef, useState } from "react";
import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";
import { solutions, features } from "../data/content.js";
import { siteConfig } from "../data/config.js";
import { contactLinks, isValidOptionalContact } from "../utils/contact.js";
import {
  buildQuoteText,
  calculateQuoteBudget,
  hasBudgetValue,
} from "../utils/quote.js";
import { downloadText, formatMoney } from "../utils/format.js";
import { useSessionState } from "../hooks/useSessionState.js";
import { projectSeed, sanitizeQuoteOptions } from "../utils/projectContext.js";
import { useAnalytics } from "../hooks/useAnalytics.js";
import { analyticBrief } from "../utils/intelligenceReport.js";
import { currentDiagnostic } from "../utils/analyticsContext.js";
import { b } from "../data/translations.js";

export default function QuoteBuilder({
  selected,
  setSelected,
  seed,
  intelligenceRequested = false,
  standalone = false,
}) {
  const { t, language } = useLocale();
  const [analytics] = useAnalytics();
  const [includeEconomics, setIncludeEconomics] = useState(false);
  const [includeDiagnostic, setIncludeDiagnostic] = useState(
    Boolean(seed?.diagnosticText),
  );
  const diagnosticAnswers = currentDiagnostic();
  const diagnosticText =
    seed?.diagnosticText ||
    (diagnosticAnswers
      ? projectSeed(
          { contexts: [{ kind: "diagnostic", answers: diagnosticAnswers }] },
          language,
        )
      : "");
  const briefContext = includeEconomics
    ? analytics
    : {
        ...analytics,
        commercial: { ...analytics.commercial, saved: false, scenarios: [] },
        productivity: { ...analytics.productivity, saved: false },
        investment: { ...analytics.investment, saved: false },
      };
  const seedText = [
    seed?.text,
    includeDiagnostic ? diagnosticText : "",
    includeEconomics && !intelligenceRequested ? seed?.economicText : "",
    intelligenceRequested
      ? [
          analyticBrief(briefContext, language, null),
          !includeEconomics &&
          [
            analytics.commercial.saved ? "i.commercial" : null,
            analytics.productivity.saved ? "i.productivity" : null,
            analytics.investment.saved ? "i.investment" : null,
          ].filter(Boolean).length
            ? t(
                b(
                  "Ferramentas consultadas, sem hipóteses econômicas:",
                  "Herramientas consultadas, sin hipótesis económicas:",
                ),
              ) +
              " " +
              [
                analytics.commercial.saved ? "i.commercial" : null,
                analytics.productivity.saved ? "i.productivity" : null,
                analytics.investment.saved ? "i.investment" : null,
              ]
                .filter(Boolean)
                .map(t)
                .join(", ")
            : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  const SummaryHeading = standalone ? "h2" : "h3";
  const [options, setOptions] = useSessionState(
    "loop-quote-options",
    sanitizeQuoteOptions({}),
    sanitizeQuoteOptions,
  );
  const [data, setData] = useState({
    description: "",
    ...options,
    name: "",
    contact: "",
  });
  const [errors, setErrors] = useState([]);
  const [ready, setReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const formRef = useRef(null);
  const summaryRef = useRef(null);
  const previousSeed = useRef("");
  useEffect(() => {
    if (!seedText && previousSeed.current) {
      const old = previousSeed.current;
      setData((current) => ({
        ...current,
        description: current.description.replace(old, "").trim(),
      }));
      previousSeed.current = "";
    }
    if (seedText) {
      const oldSeed = previousSeed.current;
      setData((current) => ({
        ...current,
        description:
          oldSeed && current.description.includes(oldSeed)
            ? current.description.replace(oldSeed, seedText)
            : current.description.includes(seedText)
              ? current.description
              : [current.description.trim(), seedText]
                  .filter(Boolean)
                  .join("\n\n")
                  .slice(0, 4000),
      }));
      previousSeed.current = seedText;
    }
  }, [seedText]);
  useEffect(() => {
    setCopyStatus("");
  }, [language]);
  useEffect(() => {
    setReady(false);
    setCopyStatus("");
  }, [selected]);
  const totals = calculateQuoteBudget(selected, data.allocations);
  const summary = buildQuoteText({ ...data, selected }, language);
  const links = contactLinks(siteConfig, summary);
  function update(key, value) {
    if (["features", "allocations", "deadline"].includes(key))
      setOptions((current) => ({ ...current, [key]: value }));
    setData((current) => ({ ...current, [key]: value }));
    setReady(false);
    setErrors([]);
    setCopyStatus("");
  }
  function toggleFeature(id) {
    update(
      "features",
      data.features.includes(id)
        ? data.features.filter((item) => item !== id)
        : [...data.features, id],
    );
  }
  function updateAllocation(id, key, value) {
    update("allocations", {
      ...data.allocations,
      [id]: { ...data.allocations[id], [key]: value },
    });
  }
  function submit(event) {
    event.preventDefault();
    const nextErrors = [];
    if (!selected.length) nextErrors.push("selectRequired");
    if (data.description.trim().length < 20)
      nextErrors.push("descriptionRequired");
    if (!totals) nextErrors.push("invalidNumbers");
    if (!isValidOptionalContact(data.contact))
      nextErrors.push("invalidContact");
    setErrors(nextErrors);
    if (nextErrors.length) {
      if (!selected.length)
        formRef.current?.querySelector('input[type="checkbox"]')?.focus();
      else if (data.description.trim().length < 20)
        document.getElementById("project-description")?.focus();
      else if (!isValidOptionalContact(data.contact)) {
        const details = formRef.current?.querySelector(".voluntary-contact");
        if (details) details.open = true;
        document.getElementById("quote-contact")?.focus();
      }
      return;
    }
    setReady(true);
    requestAnimationFrame(() => {
      summaryRef.current?.focus({ preventScroll: true });
      summaryRef.current?.scrollIntoView({
        block: "start",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }
  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("copyFailed");
    }
  }
  return (
    <section className="section quote-section" id="orcamento">
      <div className="container">
        <SectionHeading
          as={standalone ? "h1" : "h2"}
          eyebrow="quoteEyebrow"
          title="quoteTitle"
          body="quoteBody"
        />
        <div className="quote-layout">
          <form
            ref={formRef}
            className="quote-form"
            onSubmit={submit}
            noValidate
          >
            {(intelligenceRequested || seed?.economicText) && (
              <label className="quote-economics">
                <input
                  type="checkbox"
                  checked={includeEconomics}
                  onChange={(e) => setIncludeEconomics(e.target.checked)}
                />
                <span>
                  {t(
                    b(
                      "Incluir minhas hipóteses econômicas no briefing",
                      "Incluir mis hipótesis económicas en el briefing",
                    ),
                  )}
                </span>
              </label>
            )}
            {diagnosticText && (
              <label className="quote-diagnostic-option">
                <input
                  type="checkbox"
                  checked={includeDiagnostic}
                  onChange={(e) => setIncludeDiagnostic(e.target.checked)}
                />
                <span>
                  {t(
                    b(
                      "Incluir o resumo do meu diagnóstico",
                      "Incluir el resumen de mi diagnóstico",
                    ),
                  )}
                </span>
              </label>
            )}{" "}
            <fieldset>
              <legend>{t("chooseSolutions")}</legend>
              <div className="quote-solutions">
                {solutions.map((s) => (
                  <label
                    className={`quote-solution ${selected.includes(s.id) ? "selected" : ""}`}
                    key={s.id}
                  >
                    <input
                      type="checkbox"
                      value={s.id}
                      checked={selected.includes(s.id)}
                      onChange={() => {
                        setSelected((current) =>
                          current.includes(s.id)
                            ? current.filter((id) => id !== s.id)
                            : [...current, s.id],
                        );
                        setErrors([]);
                      }}
                    />
                    <Icon name={s.icon} />
                    <span>{t(s.title)}</span>
                    <Icon name="check" />
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="project-description">
                {t("projectDescription")}
              </label>
              <textarea
                id="project-description"
                rows="4"
                maxLength="4000"
                minLength="20"
                value={data.description}
                placeholder={t("descriptionPlaceholder")}
                aria-invalid={errors.includes("descriptionRequired")}
                aria-describedby={
                  errors.includes("descriptionRequired")
                    ? "quote-errors"
                    : undefined
                }
                onChange={(event) => update("description", event.target.value)}
              />
            </div>
            <fieldset>
              <legend>{t("desiredFeatures")}</legend>
              <div className="feature-checkboxes">
                {features.map((f) => (
                  <label key={f.id}>
                    <input
                      type="checkbox"
                      checked={data.features.includes(f.id)}
                      onChange={() => toggleFeature(f.id)}
                    />
                    <span>{t(f.title)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {selected.length > 0 && (
              <details className="budget-planner">
                <summary>
                  {t("budget")}
                  <Icon name="chevron" />
                </summary>
                <p className="fine-print">{t("budgetHelp")}</p>
                {solutions
                  .filter((s) => selected.includes(s.id))
                  .map((s) => (
                    <fieldset key={s.id}>
                      <legend>{t(s.title)}</legend>
                      <div className="two-fields">
                        {[
                          ["initial", "budgetSingle"],
                          ["monthly", "budgetMonthly"],
                        ].map(([key, label]) => (
                          <div className="field" key={key}>
                            <label htmlFor={`budget-${s.id}-${key}`}>
                              {t(label)}
                            </label>
                            <input
                              type="number"
                              id={`budget-${s.id}-${key}`}
                              inputMode="decimal"
                              min="0"
                              max="10000000"
                              step="0.01"
                              placeholder="—"
                              value={data.allocations[s.id]?.[key] ?? ""}
                              onChange={(event) =>
                                updateAllocation(s.id, key, event.target.value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  ))}
              </details>
            )}
            <div className="field">
              <label htmlFor="project-deadline">{t("deadline")}</label>
              <select
                id="project-deadline"
                value={data.deadline}
                onChange={(event) => update("deadline", event.target.value)}
              >
                {["noDeadline", "deadline1", "deadline2", "deadline3"].map(
                  (key) => (
                    <option value={key} key={key}>
                      {t(key)}
                    </option>
                  ),
                )}
              </select>
            </div>
            <details className="voluntary-contact">
              <summary>
                {t("volunteerContact")}
                <Icon name="chevron" />
              </summary>
              <div className="two-fields">
                <div className="field">
                  <label htmlFor="quote-name">{t("yourName")}</label>
                  <input
                    id="quote-name"
                    autoComplete="name"
                    maxLength="100"
                    value={data.name}
                    onChange={(event) => update("name", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="quote-contact">{t("contactDetail")}</label>
                  <input
                    id="quote-contact"
                    aria-invalid={errors.includes("invalidContact")}
                    aria-describedby={
                      errors.includes("invalidContact")
                        ? "quote-errors"
                        : undefined
                    }
                    autoComplete="off"
                    maxLength="160"
                    placeholder={t("contactPlaceholder")}
                    value={data.contact}
                    onChange={(event) => update("contact", event.target.value)}
                  />
                </div>
              </div>
            </details>
            <p className="fine-print privacy-inline">
              <Icon name="shield" />
              {t("briefPrivacy")}
            </p>
            <div id="quote-errors" aria-live="polite">
              {errors.map((key) => (
                <p key={key} className="form-error">
                  {t(key)}
                </p>
              ))}
            </div>
            <button className="button" type="submit">
              {t("generateBrief")}
              <Icon />
            </button>
          </form>
          <aside className="quote-summary">
            <span className="data-label">LOOP AVANTE / BRIEFING</span>
            <SummaryHeading className="quote-summary-title">
              {t("quoteSummary")}
            </SummaryHeading>
            <dl className="quote-counts">
              <div>
                <dt>{t("scopeCount")}</dt>
                <dd>{String(selected.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt>{t("featureCount")}</dt>
                <dd>{String(data.features.length).padStart(2, "0")}</dd>
              </div>
            </dl>
            <div className="quote-price">
              <span>{t("investment")}</span>
              <strong>{t("onRequest")}</strong>
              <p>{t("noRates")}</p>
            </div>
            {totals?.provided && (
              <div className="quote-user-budget">
                <p>{t("budget")}</p>
                <dl>
                  <div>
                    <dt>{t("budgetSingle")}</dt>
                    <dd data-testid="budget-initial-total">
                      {hasBudgetValue(selected, data.allocations, "initial")
                        ? formatMoney(totals.initial, language)
                        : t("notSpecified")}
                    </dd>
                  </div>
                  <div>
                    <dt>{t("budgetMonthly")}</dt>
                    <dd data-testid="budget-monthly-total">
                      {hasBudgetValue(selected, data.allocations, "monthly")
                        ? formatMoney(totals.monthly, language)
                        : t("notSpecified")}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
            {ready &&
              selected.length > 0 &&
              data.description.trim().length >= 20 &&
              totals &&
              isValidOptionalContact(data.contact) && (
                <div className="generated-brief">
                  <p className="success-message" tabIndex="-1" ref={summaryRef}>
                    <Icon name="check" />
                    {t("summaryReady")}
                  </p>
                  <pre
                    tabIndex="0"
                    role="region"
                    aria-label={t("quoteSummary")}
                  >
                    {summary}
                  </pre>
                  <div className="brief-actions">
                    {links.whatsapp && (
                      <a
                        className="button whatsapp-button"
                        href={links.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="whatsapp" />
                        {t("shareWhatsapp")}
                      </a>
                    )}

                    <button
                      type="button"
                      className="button button-outline"
                      onClick={copySummary}
                    >
                      <Icon name="copy" />
                      {t("copy")}
                    </button>
                    <button
                      type="button"
                      className="button button-outline"
                      onClick={() =>
                        downloadText(
                          `loop-avante-briefing-${language}.txt`,
                          summary,
                        )
                      }
                    >
                      <Icon name="download" />
                      {t("download")}
                    </button>
                    {links.email && (
                      <a className="button" href={links.email}>
                        {t("shareEmail")}
                        <Icon name="external" />
                      </a>
                    )}
                  </div>
                  <p role="status" className="fine-print">
                    {copyStatus
                      ? t(copyStatus)
                      : links.whatsapp || links.email
                        ? t("sendNotice")
                        : ""}
                  </p>
                </div>
              )}
            {!links.whatsapp && !links.email && (
              <p className="contact-notice">
                <Icon name="info" />
                {t("localContactNotice")}
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
