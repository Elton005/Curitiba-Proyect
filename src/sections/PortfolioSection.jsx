import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";
import { projects } from "../data/content.js";
import UpcomingProduct from "../components/UpcomingProduct.jsx";
import { b } from "../data/translations.js";

export default function PortfolioSection({
  standalone = false,
  preview = false,
}) {
  const { t, href } = useLocale();
  const ProjectHeading = standalone ? "h2" : "h3";
  return (
    <section className="section portfolio-section" id="projetos">
      <div className="container">
        <SectionHeading
          as={standalone ? "h1" : "h2"}
          eyebrow="portfolioEyebrow"
          title="portfolioTitle"
          body="portfolioBody"
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card project-${project.id} has-gallery`}
            >
              <a
                className="project-visual"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("visitProject")}: ${project.name}`}
              >
                <span className="project-index">
                  0{index + 1} / LOOP AVANTE
                </span>
                <div className="project-browser">
                  <div className="browser-chrome">
                    <span className="browser-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      {new URL(project.url).hostname.replace("www.", "")}
                    </span>
                    <Icon name="external" />
                  </div>
                  <img
                    src={project.image}
                    srcSet={`${project.gallery[0].small} 480w, ${project.image} 960w, ${project.gallery[0].large} 1280w`}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 46vw, 600px"
                    alt={`${t("projectImage")} ${project.name}`}
                    width="1280"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="project-hover">
                  <Icon name="external" />
                </span>
              </a>
              <div className="project-info">
                <p className="eyebrow">{t(project.category)}</p>
                <ProjectHeading className="project-title">
                  <a
                    className="case-study-link"
                    href={href(
                      project.id === "huella" ? "huellaCase" : "yoeldisCase",
                    )}
                  >
                    {project.name}
                    <Icon />
                  </a>
                </ProjectHeading>
                <p className="project-description">{t(project.copy)}</p>
                {!preview && (
                  <div className="project-objective">
                    <strong>{t("objective")}</strong>
                    <p>{t(project.objective)}</p>
                  </div>
                )}
                <ul className="tag-list">
                  {project.highlights.map((tag, i) => (
                    <li key={i}>{t(tag)}</li>
                  ))}
                </ul>
                <a
                  className="project-gallery-teaser"
                  href={href(
                    project.id === "huella" ? "huellaCase" : "yoeldisCase",
                    "galeria",
                  )}
                  aria-label={`${project.name}: ${t(b("explorar as três imagens da galeria", "explorar las tres imágenes de la galería"))}`}
                >
                  <span className="project-miniatures" aria-hidden="true">
                    {project.gallery.map((piece) => (
                      <img
                        key={piece.id}
                        src={piece.thumbnail}
                        alt=""
                        width="192"
                        height="120"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </span>
                  <span>
                    {project.gallery.length} {t(b("imagens", "imágenes"))}
                    <Icon />
                  </span>
                </a>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {t("visitProject")}
                  <Icon name="external" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <UpcomingProduct headingAs={standalone ? "h2" : "h3"} />
        {preview && (
          <a href={href("projects")} className="text-link all-projects-link">
            {t("allProjects")}
            <Icon />
          </a>
        )}
        {!preview && (
          <div className="own-project">
            <span className="own-project-icon">
              <Icon name="web" />
            </span>
            <div>
              <span className="eyebrow">{t("ownProduct")}</span>
              <ProjectHeading className="own-project-title">
                {t("websiteProduct")}
              </ProjectHeading>
              <p>{t("websiteProductCopy")}</p>
            </div>
            <a
              href={href("home", "inicio")}
              className="round-link"
              aria-label={t("backTop")}
            >
              <Icon />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
