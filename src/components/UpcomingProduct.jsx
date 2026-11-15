import { upcomingProduct } from "../data/content.js";
import { useLocale } from "../app/LocaleContext.jsx";
import { b } from "../data/translations.js";
import Icon from "./Icon.jsx";

export default function UpcomingProduct({ headingAs = "h3" }) {
  const { t } = useLocale();
  const Heading = headingAs;
  return (
    <aside
      className="upcoming-product"
      aria-labelledby="upcoming-product-title"
    >
      <div className="upcoming-book" aria-hidden="true">
        <Icon name="document" />
        <span>✦</span>
      </div>
      <div className="upcoming-product-copy">
        <p className="eyebrow">{t(upcomingProduct.category)}</p>
        <Heading id="upcoming-product-title">{upcomingProduct.name}</Heading>
        <p>{t(upcomingProduct.copy)}</p>
      </div>
      <div className="upcoming-product-status">
        <span>{t(b("EM BREVE", "PRÓXIMAMENTE"))}</span>
        <p>{t(b("ECOSSISTEMA LOOP AVANTE", "ECOSISTEMA LOOP AVANTE"))}</p>
      </div>
    </aside>
  );
}
