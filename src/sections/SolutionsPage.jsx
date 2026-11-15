import { useState } from "react";
import { useLocale } from "../app/LocaleContext.jsx";
import { solutions } from "../data/content.js";
import { b } from "../data/translations.js";
import Icon from "../components/Icon.jsx";
import MobileAppSection from "./MobileAppSection.jsx";
const details = {
  web: [
    b(
      "Uma oferta clara, um caminho até o contato",
      "Una oferta clara, un camino hasta el contacto",
    ),
    b(
      "Sites institucionais, campanhas e catálogos com hierarquia editorial, navegação acessível e conteúdo adaptado a telas pequenas. Uma presença própria pode reunir informações dispersas; resultados comerciais dependem da oferta e da operação.",
      "Sitios corporativos, campañas y catálogos con jerarquía editorial, navegación accesible y contenido adaptado a pantallas pequeñas. Una presencia propia puede reunir información dispersa; los resultados comerciales dependen de la oferta y de la operación.",
    ),
  ],
  systems: [
    b(
      "Uma visão compartilhada da operação",
      "Una visión compartida de la operación",
    ),
    b(
      "Painéis administrativos, etapas de solicitações e informação organizada por contexto. Filtros, formulários e tabelas tornam o acompanhamento explícito. A demonstração abaixo usa três solicitações fictícias, sem dados de clientes.",
      "Paneles administrativos, etapas de solicitudes e información organizada por contexto. Filtros, formularios y tablas hacen explícito el seguimiento. La demostración siguiente utiliza tres solicitudes ficticias, sin datos de clientes.",
    ),
  ],
  mobile: [
    b("Serviços que acompanham a rotina", "Servicios que acompañan la rutina"),
    b(
      "Navegação pensada para toque, catálogo e acesso a serviços. Integrações e disponibilidade são definidas conforme o escopo. A apresentação da Loop Avante App é ilustrativa e não anuncia uma loja pública.",
      "Navegación pensada para el tacto, catálogo y acceso a servicios. Las integraciones y la disponibilidad se definen según el alcance. La presentación de Loop Avante App es ilustrativa y no anuncia una tienda pública.",
    ),
  ],
  automation: [
    b(
      "Da repetição a um fluxo acompanhado",
      "De la repetición a un flujo con seguimiento",
    ),
    b(
      "Antes: receber, copiar informações e lembrar o retorno manualmente. Depois, como hipótese de projeto: formulário conectado, registro estruturado e próxima etapa explícita. Confirme volume, adoção e exceções antes de automatizar.",
      "Antes: recibir, copiar información y recordar el seguimiento manualmente. Después, como hipótesis de proyecto: formulario conectado, registro estructurado y siguiente paso explícito. Confirma volumen, adopción y excepciones antes de automatizar.",
    ),
  ],
  business: [
    b(
      "Uma ferramenta para uma decisão concreta",
      "Una herramienta para una decisión concreta",
    ),
    b(
      "Cotizadores, diagnósticos e sistemas internos podem transformar regras do negócio em interfaces compreensíveis. As ferramentas gratuitas deste site demonstram validação, cenários, exportação e continuidade entre páginas.",
      "Cotizadores, diagnósticos y sistemas internos pueden transformar reglas del negocio en interfaces comprensibles. Las herramientas gratuitas de este sitio demuestran validación, escenarios, exportación y continuidad entre páginas.",
    ),
  ],
};
export default function SolutionsPage({ onPrepare }) {
  const { t, href } = useLocale(),
    [filter, setFilter] = useState("all"),
    [done, setDone] = useState(false),
    rows = [
      {
        id: "01",
        title: b("Revisão de catálogo", "Revisión de catálogo"),
        done: false,
      },
      { id: "02", title: b("Organizar agenda", "Organizar agenda"), done },
      {
        id: "03",
        title: b("Preparar proposta", "Preparar propuesta"),
        done: true,
      },
    ];
  return (
    <div className="container capabilities-page">
      <nav className="breadcrumbs" aria-label={t("breadcrumbs")}>
        <ol>
          <li>
            <a href={href("home")}>{t("home")}</a>
          </li>
          <li>/</li>
          <li aria-current="page">{t("solutions")}</li>
        </ol>
      </nav>
      <header className="capabilities-heading">
        <p className="eyebrow">LOOP AVANTE / {t("solutions")}</p>
        <h1>
          {t(
            b(
              "Software com propósito. Experiências com clareza.",
              "Software con propósito. Experiencias con claridad.",
            ),
          )}
        </h1>
        <p>
          {t(
            b(
              "Explore como conectamos presença digital, operação e decisões. Cada projeto começa pelas necessidades do negócio.",
              "Explora cómo conectamos presencia digital, operación y decisiones. Cada proyecto empieza por las necesidades del negocio.",
            ),
          )}
        </p>
      </header>
      <nav className="capabilities-index" aria-label={t("solutions")}>
        {solutions.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {t(s.title)}
          </a>
        ))}
      </nav>
      {solutions.map((s, index) => (
        <section className="capability" id={s.id} key={s.id}>
          <div>
            <p className="eyebrow">
              0{index + 1} / {t(s.title)}
            </p>
            <h2>{t(details[s.id][0])}</h2>
            <p>{t(details[s.id][1])}</p>
            <ul>
              <li>{t(s.examples)}</li>
              <li>{t(s.benefit)}</li>
            </ul>
            <div className="button-row">
              <a
                className="button"
                href={href("quote")}
                onClick={() => onPrepare([s.id])}
              >
                {t("discussSolution")}
                <Icon />
              </a>
              <a
                className="text-link"
                href={href(
                  s.id === "automation"
                    ? "productivity"
                    : s.id === "web"
                      ? "projects"
                      : s.id === "mobile"
                        ? "home"
                        : s.id === "systems"
                          ? "market"
                          : "quote",
                  s.id === "mobile" ? "aplicativo" : "",
                )}
              >
                {t(b("Explorar exemplo", "Explorar ejemplo"))} →
              </a>
            </div>
          </div>
          <div className="capability-demo">
            {s.id === "systems" ? (
              <>
                <p className="eyebrow">
                  {t(
                    b(
                      "DEMONSTRAÇÃO FICTÍCIA · NÃO É UM CLIENTE",
                      "DEMOSTRACIÓN FICTICIA · NO ES UN CLIENTE",
                    ),
                  )}
                </p>
                <h3>
                  {t(b("Solicitações da equipe", "Solicitudes del equipo"))}
                </h3>
                <label htmlFor="demo-filter">
                  {t(b("Filtrar etapas", "Filtrar etapas"))}
                </label>
                <select
                  id="demo-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">{t(b("Todas", "Todas"))}</option>
                  <option value="open">
                    {t(b("Pendentes", "Pendientes"))}
                  </option>
                  <option value="done">
                    {t(b("Concluídas", "Completadas"))}
                  </option>
                </select>
                <ul>
                  {rows
                    .filter(
                      (r) => filter === "all" || r.done === (filter === "done"),
                    )
                    .map((r) => (
                      <li key={r.id}>
                        <span>
                          {r.id} · {t(r.title)}
                        </span>
                        <strong>
                          {t(
                            r.done
                              ? b("Concluída", "Completada")
                              : b("Pendente", "Pendiente"),
                          )}
                        </strong>
                      </li>
                    ))}
                </ul>
                <button
                  className="button button-outline"
                  onClick={() => setDone((v) => !v)}
                >
                  {t(
                    done
                      ? b("Reabrir agenda", "Reabrir agenda")
                      : b("Concluir agenda", "Completar agenda"),
                  )}
                </button>
              </>
            ) : (
              <>
                <Icon name={s.icon} />
                <h3>{t(s.title)}</h3>
                <p>{t(s.copy)}</p>
                <p className="fine-print">
                  {t(
                    b(
                      "Exemplo de aplicação, sujeito ao escopo e à validação do projeto.",
                      "Ejemplo de aplicación, sujeto al alcance y a la validación del proyecto.",
                    ),
                  )}
                </p>
              </>
            )}
          </div>
        </section>
      ))}
      <MobileAppSection onPrepare={onPrepare} />
    </div>
  );
}
