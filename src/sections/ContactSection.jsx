import { useLocale } from "../app/LocaleContext.jsx";
import { LoopMark } from "../components/Brand.jsx";
import Icon from "../components/Icon.jsx";
import { siteConfig } from "../data/config.js";
import { contactLinks } from "../utils/contact.js";

export default function ContactSection() {
  const { t, href } = useLocale();
  const links = contactLinks(siteConfig, t("simulationBrief"));
  return (
    <section className="contact-section" id="contato">
      <div className="container">
        <div className="contact-panel">
          <div>
            <p className="eyebrow">{t("contactEyebrow")}</p>
            <h2>{t("contactTitle")}</h2>
            <p>{t("contactBody")}</p>
            <div className="button-row">
              <a href={href("quote")} className="button button-cream">
                {t("prepareBrief")}
                <Icon />
              </a>
              <a href={href("diagnostic")} className="text-link">
                {t("tryDiagnostic")}
                <Icon />
              </a>
            </div>
            {links.whatsapp && (
              <a
                href={links.whatsapp}
                className="contact-channel"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp ↗
              </a>
            )}
            {links.email && (
              <a href={links.email} className="contact-channel">
                {siteConfig.email} ↗
              </a>
            )}
            {!links.whatsapp && !links.email && (
              <p className="fine-print">{t("localContactNotice")}</p>
            )}
          </div>
          <LoopMark className="contact-mark" />
        </div>
      </div>
    </section>
  );
}
