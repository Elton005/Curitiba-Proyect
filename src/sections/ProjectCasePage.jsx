import { useLocale } from "../app/LocaleContext.jsx";
import { projects } from "../data/content.js";
import { b } from "../data/translations.js";
import Icon from "../components/Icon.jsx";
import ProjectGallery from "../components/ProjectGallery.jsx";
export default function ProjectCasePage({ onPrepare }) {
  const { page, t, href } = useLocale(),
    project = projects.find(
      (p) => p.id === (page === "huellaCase" ? "huella" : "yoeldis"),
    ),
    other = projects.find((p) => p !== project);
  return (
    <article className="container case-page">
      <nav className="breadcrumbs" aria-label={t("breadcrumbs")}>
        <ol>
          <li>
            <a href={href("projects")}>{t("projects")}</a>
          </li>
          <li>/</li>
          <li aria-current="page">{project.name}</li>
        </ol>
      </nav>
      <header className="capabilities-heading">
        <p className="eyebrow">{t(project.category)}</p>
        <h1>{project.name}</h1>
        <p>{t(project.copy)}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          {t("visitProject")}
          <Icon name="external" />
        </a>
      </header>
      <ProjectGallery key={project.id} project={project} />
      <div className="case-editorial">
        <section>
          <p className="eyebrow">01 / {t("objective")}</p>
          <h2>
            {t(
              b(
                "Uma identidade que organiza o conteúdo",
                "Una identidad que organiza el contenido",
              ),
            )}
          </h2>
          <p>{t(project.objective)}</p>
        </section>
        <section>
          <p className="eyebrow">
            02 / {t(b("Estrutura observável", "Estructura observable"))}
          </p>
          <h2>
            {t(
              b("Um ecossistema para explorar", "Un ecosistema para explorar"),
            )}
          </h2>
          <ul>
            {project.highlights.map((item, i) => (
              <li key={i}>{t(item)}</li>
            ))}
          </ul>
          <p>
            {t(
              b(
                "O estudo se limita à apresentação pública e aos recursos autênticos disponíveis. Não atribuímos stack interna, métricas de tráfego ou resultados econômicos sem confirmação.",
                "El estudio se limita a la presentación pública y los recursos auténticos disponibles. No atribuimos tecnologías internas, métricas de tráfico ni resultados económicos sin confirmación.",
              ),
            )}
          </p>
        </section>
        <section>
          <p className="eyebrow">
            03 / {t(b("Experiência de leitura", "Experiencia de lectura"))}
          </p>
          <h2>
            {t(
              b(
                "Conteúdo primeiro, em cada tela",
                "Contenido primero, en cada pantalla",
              ),
            )}
          </h2>
          <p>
            {t(
              b(
                "Três perspectivas documentam a identidade, os livros e os conteúdos públicos. A galeria permite explorar cada peça com imagens responsivas e miniaturas leves, preservando a identidade de cada projeto.",
                "Tres perspectivas documentan la identidad, los libros y los contenidos públicos. La galería permite explorar cada pieza con imágenes adaptables y miniaturas ligeras, preservando la identidad de cada proyecto.",
              ),
            )}
          </p>
        </section>
      </div>
      <div className="int-commercial-cta">
        <a
          href={href(other.id === "huella" ? "huellaCase" : "yoeldisCase")}
          className="text-link"
        >
          {other.name} →
        </a>
        <a
          className="button"
          href={href("quote")}
          onClick={() => onPrepare(["web"])}
        >
          {t("discussSolution")}
          <Icon />
        </a>
      </div>
    </article>
  );
}
