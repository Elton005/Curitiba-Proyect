import { useLocale } from "../app/LocaleContext.jsx";
import Icon from "../components/Icon.jsx";
import EcosystemVisual from "../components/EcosystemVisual.jsx";

export default function Hero() {
  const { t, href } = useLocale();
  return (
    <>
      <section
        className="hero section"
        id="inicio"
        aria-labelledby="hero-title"
      >
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              {t("heroEyebrow")}
            </p>
            <h1 id="hero-title">
              {t("heroTitle")}
              <br />
              <span>{t("heroAccent")}</span>
              <br />
              {t("heroEnd")}
            </h1>
            <p className="hero-description">{t("heroBody")}</p>
            <div className="button-row">
              <a className="button" href={href("quote")}>
                {t("requestQuote")}
                <Icon />
              </a>
              <a className="text-link" href={href("projects")}>
                {t("exploreProjects")}
                <Icon name="external" />
              </a>
            </div>
            <p className="hero-note">
              <span className="note-line" />
              {t("heroNote")}
            </p>
          </div>
          <EcosystemVisual />
        </div>
      </section>
      <div className="capability-strip">
        <div className="container">
          <span>{t("strip")}</span>
          <div>
            <span>Web</span>
            <i />
            <span>{t("management")}</span>
            <i />
            <span>Mobile</span>
            <i />
            <span>{t("integration")}</span>
          </div>
        </div>
      </div>
    </>
  );
}
