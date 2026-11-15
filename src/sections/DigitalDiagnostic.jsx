import { useRef, useState } from "react";
import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";
import {
  diagnosticCategories,
  diagnosticQuestions,
} from "../data/diagnostic.js";
import { solutions } from "../data/content.js";
import { evaluateDiagnostic } from "../utils/diagnostic.js";
import { useSessionState } from "../hooks/useSessionState.js";
import { sanitizeAnswers } from "../utils/projectContext.js";

export default function DigitalDiagnostic({ onPrepare, standalone = false }) {
  const { t, href } = useLocale();
  const PanelHeading = standalone ? "h2" : "h3";
  const ResultHeading = standalone ? "h3" : "h4";
  const [answers, setAnswers] = useSessionState(
    "loop-diagnostic-answers",
    {},
    sanitizeAnswers,
  );
  const [step, setStep] = useSessionState("loop-diagnostic-step", 0, (value) =>
    Number.isInteger(value) && value >= 0 && value < 8 ? value : 0,
  );
  const [complete, setComplete] = useSessionState(
    "loop-diagnostic-complete",
    false,
    (value) => value === true,
  );
  const [error, setError] = useState(false);
  const headingRef = useRef(null);
  const resultRef = useRef(null);
  const question = diagnosticQuestions[step];
  const result = complete ? evaluateDiagnostic(answers) : null;
  function focusHeading() {
    requestAnimationFrame(() =>
      headingRef.current?.focus({ preventScroll: true }),
    );
  }
  function advance() {
    if (answers[question.id] === undefined) {
      setError(true);
      return;
    }
    setError(false);
    if (step === diagnosticQuestions.length - 1) {
      setComplete(true);
      requestAnimationFrame(() =>
        resultRef.current?.focus({ preventScroll: true }),
      );
    } else {
      setStep(step + 1);
      focusHeading();
    }
  }
  function prepareResult() {
    onPrepare([...new Set(result.priorities.map((p) => p.solution))], {
      kind: "diagnostic",
      answers,
    });
  }
  return (
    <section className="section diagnostic-section" id="diagnostico">
      <div className="container">
        <SectionHeading
          as={standalone ? "h1" : "h2"}
          eyebrow="diagnosticEyebrow"
          title="diagnosticTitle"
          body="diagnosticBody"
        />
        <div
          className={`diagnostic-panel ${result ? "diagnostic-complete" : ""}`}
        >
          <aside className="diagnostic-aside">
            <span className="diagnostic-symbol">
              <Icon name="spark" />
            </span>
            <PanelHeading className="diagnostic-aside-title">
              {t("diagnosticName")}
            </PanelHeading>
            <p>{t("diagnosticPrivacy")}</p>
            <ol className="diagnostic-areas">
              {diagnosticQuestions.map((q, i) => (
                <li
                  key={q.id}
                  className={`${!complete && step === i ? "current-area" : ""} ${answers[q.id] !== undefined ? "answered-area" : ""}`}
                >
                  <span>
                    {answers[q.id] !== undefined ? (
                      <Icon name="check" />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  {t(q.area)}
                </li>
              ))}
            </ol>
          </aside>
          {result ? (
            <div className="diagnostic-result">
              <p className="eyebrow">{t("diagnosticResult")}</p>
              <PanelHeading
                className="diagnostic-result-title"
                tabIndex="-1"
                ref={resultRef}
              >
                {t(diagnosticCategories[result.category])}
              </PanelHeading>
              <div className="diagnostic-findings">
                <div>
                  <ResultHeading>
                    <Icon name="check" />
                    {t("declaredStrengths")}
                  </ResultHeading>
                  {result.strengths.length ? (
                    <ul>
                      {result.strengths.map((q) => (
                        <li key={q.id}>{t(q.area)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{t("noStrengths")}</p>
                  )}
                </div>
                <div>
                  <ResultHeading>
                    <Icon name="spark" />
                    {t("opportunities")}
                  </ResultHeading>
                  {result.opportunities.length ? (
                    <ul>
                      {result.opportunities.map((q) => (
                        <li key={q.id}>{t(q.area)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{t("noGaps")}</p>
                  )}
                </div>
              </div>
              <ResultHeading className="priorities-title">
                {t("priorities")}
              </ResultHeading>
              <ol className="recommendation-list">
                {result.priorities.map((p, i) => (
                  <li key={p.id}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{t(p.recommendation)}</h4>
                      <p>{t(p.advice)}</p>
                      <a
                        href={href("quote")}
                        className="service-recommendation"
                        onClick={() =>
                          onPrepare([p.solution], {
                            kind: "recommendation",
                            id: p.id,
                          })
                        }
                      >
                        {t(solutions.find((s) => s.id === p.solution).title)}
                        <Icon />
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
              <details className="formula-details">
                <summary>{t("diagnosticMethod")}</summary>
                <p>{t("diagnosticMethodCopy")}</p>
              </details>
              <div className="button-row">
                <a
                  className="button"
                  href={href("quote")}
                  onClick={prepareResult}
                >
                  {t("talkDiagnostic")}
                  <Icon />
                </a>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setAnswers({});
                    setStep(0);
                    setComplete(false);
                    setError(false);
                    focusHeading();
                  }}
                >
                  {t("restart")}
                </button>
              </div>
            </div>
          ) : (
            <div className="diagnostic-question">
              <div className="diagnostic-progress">
                <span>
                  {t("question")} {step + 1} {t("of")}{" "}
                  {diagnosticQuestions.length}
                </span>
                <span>{t(question.area)}</span>
              </div>
              <progress
                value={step}
                max={diagnosticQuestions.length}
                aria-label={`${t("question")} ${step + 1} ${t("of")} ${diagnosticQuestions.length}`}
              />
              <fieldset>
                <legend tabIndex="-1" ref={headingRef}>
                  {t(question.question)}
                </legend>
                <div className="diagnostic-options">
                  {question.options.map((option) => (
                    <label
                      className={`diagnostic-option ${answers[question.id] === option.value ? "selected" : ""}`}
                      key={`${question.id}-${option.value}`}
                    >
                      <input
                        type="radio"
                        name={`diagnostic-${question.id}`}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={() => {
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: option.value,
                          }));
                          setError(false);
                        }}
                      />
                      <span>{t(option.label)}</span>
                      <span className="radio-indicator" aria-hidden="true">
                        <Icon name="check" />
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="error-slot" aria-live="polite">
                {error && <p className="form-error">{t("answerRequired")}</p>}
              </div>
              <div className="diagnostic-buttons">
                <button
                  type="button"
                  className="button button-outline"
                  disabled={step === 0}
                  onClick={() => {
                    setStep(step - 1);
                    setError(false);
                    focusHeading();
                  }}
                >
                  <Icon className="reverse" />
                  {t("previous")}
                </button>
                <button type="button" className="button" onClick={advance}>
                  {t(
                    step === diagnosticQuestions.length - 1
                      ? "seeResults"
                      : "next",
                  )}
                  <Icon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
