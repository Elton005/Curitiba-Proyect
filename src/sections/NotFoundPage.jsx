import { useLocale } from "../app/LocaleContext.jsx";
import { LoopMark } from "../components/Brand.jsx";
import Icon from "../components/Icon.jsx";

export default function NotFoundPage() {
  const { t, href } = useLocale();
  return (
    <main id="conteudo" className="not-found">
      <div className="container">
        <LoopMark />
        <p className="eyebrow">404 / LOOP AVANTE</p>
        <h1>{t("notFoundTitle")}</h1>
        <p>{t("notFoundBody")}</p>
        <a href={href("home")} className="button">
          {t("backTop")}
          <Icon />
        </a>
      </div>
    </main>
  );
}
