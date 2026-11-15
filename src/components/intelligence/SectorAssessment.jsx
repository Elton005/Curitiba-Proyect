import { useLocale } from "../../app/LocaleContext.jsx";
import { useAnalytics } from "../../hooks/useAnalytics.js";
import {
  sectorQuestions,
  assessmentChoices,
  evaluateSectorAssessment,
} from "../../data/intelligence/sectorAssessment.js";
import { b } from "../../data/translations.js";
import { Panel } from "./AnalyticsUI.jsx";
export default function SectorAssessment({ sectorId, onPrepare }) {
  const { t, href } = useLocale(),
    [context, setContext] = useAnalytics(),
    value =
      context.sectorAssessment?.sectorId === sectorId
        ? context.sectorAssessment
        : { sectorId, answers: {} },
    result = evaluateSectorAssessment(value);
  return (
    <Panel
      title={
        <>
          {t(
            b(
              "Seu processo, pelas suas respostas",
              "Tu proceso, según tus respuestas",
            ),
          )}
        </>
      }
      className="sector-assessment"
    >
      <p>
        {t(
          b(
            "Para cada processo, indique como está hoje. Sem nota ou comparação com outras empresas.",
            "Para cada proceso, indica cómo está hoy. Sin puntuación ni comparación con otras empresas.",
          ),
        )}
      </p>
      {sectorQuestions(sectorId).map((q) => (
        <fieldset key={q.id}>
          <legend>{t(q.topic)}</legend>
          {assessmentChoices.map((label, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`sector-${sectorId}-${q.id}`}
                value={index}
                checked={value.answers[q.id] === index}
                onChange={() =>
                  setContext((c) => ({
                    ...c,
                    sectorAssessment: {
                      sectorId,
                      answers: { ...value.answers, [q.id]: index },
                    },
                  }))
                }
              />
              {t(label)}
            </label>
          ))}
        </fieldset>
      ))}
      {result && (
        <div className="sector-assessment-result" aria-live="polite">
          {[
            ["strengths", b("Fortalezas declaradas", "Fortalezas declaradas")],
            ["opportunities", b("Melhorias declaradas", "Mejoras declaradas")],
            ["unknown", b("Pontos a investigar", "Puntos por investigar")],
          ].map(([key, label]) => (
            <div key={key}>
              <h3>{t(label)}</h3>
              {result[key].length ? (
                <ul>
                  {result[key].map((q) => (
                    <li key={q.id}>{t(q.topic)}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  {t(
                    b(
                      "Nenhum item declarado nesta categoria.",
                      "Ningún elemento declarado en esta categoría.",
                    ),
                  )}
                </p>
              )}
            </div>
          ))}
          <h3>
            {t(b("Até três próximos passos", "Hasta tres próximos pasos"))}
          </h3>
          {result.priorities.length ? (
            result.priorities.map((q) => (
              <p key={q.id}>
                {t(q.topic)} ·{" "}
                <a href={href("solutions", q.solution)}>
                  {t(b("Explorar a solução", "Explorar la solución"))}
                </a>{" "}
                ·{" "}
                <a href={href(q.tool)}>
                  {t(
                    b(
                      "Investigar na ferramenta",
                      "Investigar en la herramienta",
                    ),
                  )}
                </a>
              </p>
            ))
          ) : (
            <p>
              {t(
                b(
                  "Não foram declaradas melhorias. Investigue os pontos desconhecidos antes de definir um projeto.",
                  "No se declararon mejoras. Investiga los puntos desconocidos antes de definir un proyecto.",
                ),
              )}
            </p>
          )}
          {result.priorities.length > 0 && (
            <a
              className="button"
              href={href("quote")}
              onClick={() =>
                onPrepare(
                  result.priorities.map((q) => q.solution),
                  { kind: "intelligence", version: 1 },
                )
              }
            >
              {t(
                b(
                  "Preparar proposta para estas prioridades",
                  "Preparar propuesta para estas prioridades",
                ),
              )}
            </a>
          )}
        </div>
      )}
    </Panel>
  );
}
