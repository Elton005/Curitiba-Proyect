import { useLocale } from "../app/LocaleContext.jsx";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";

export default function Footer({ notFound = false }) {
  const { t, href } = useLocale();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand href={href("home", "inicio")} />
            <p>{t("footerLine")}</p>
          </div>
          <div className="footer-links">
            <a href={href("intelligence")}>{t("i.name")}</a>
            <a href={href("solutions")}>{t("solutions")}</a>
            <a href={href("projects")}>{t("projects")}</a>
            <a href={href("diagnostic")}>{t("diagnostic")}</a>
            <a href={href("simulator")}>{t("simulatorNav")}</a>
            <a href={href("home", "contato")}>{t("contact")}</a>
          </div>
          <a
            href={href("home", "inicio")}
            className="footer-up"
            aria-label={t("backTop")}
          >
            <Icon className="up" />
          </a>
        </div>
        <details className="privacy-details">
          <summary>{t("privacy")}</summary>
          <p>{t("privacyText")}</p>
        </details>
        <div className="footer-bottom">
          <p>© 2026 Loop Avante. {t("rights")}</p>
          <span>Curitiba · Brasil</span>
          <span>{t("footerCraft")}</span>
        </div>
      </div>
    </footer>
  );
}
