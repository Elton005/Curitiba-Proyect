import { useLocale } from "../app/LocaleContext.jsx";
import { pages } from "../data/pages.js";
import Icon from "./Icon.jsx";
export default function PageNavigation() {
  const { t, href, page } = useLocale();
  return (
    <div className="container page-navigation">
      <nav className="breadcrumbs" aria-label={t("breadcrumbs")}>
        <ol>
          <li>
            <a href={href("home")}>{t("home")}</a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{t(pages[page].label)}</li>
        </ol>
      </nav>
      <nav className="tool-navigation" aria-label={t("toolsNavigation")}>
        {["diagnostic", "simulator", "quote"].map((key) => (
          <a
            key={key}
            href={href(key)}
            aria-current={key === page ? "page" : undefined}
          >
            {t(key === "simulator" ? "simulatorNav" : pages[key].label)}
            <Icon name="external" />
          </a>
        ))}
      </nav>
    </div>
  );
}
