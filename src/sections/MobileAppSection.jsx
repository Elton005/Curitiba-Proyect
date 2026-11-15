import { useLocale } from "../app/LocaleContext.jsx";
import { LoopMark } from "../components/Brand.jsx";
import Icon from "../components/Icon.jsx";
import { siteConfig } from "../data/config.js";

const benefits = [
  ["workflow", "loopActionPlan", "loopActionPlanBody"],
  ["chart", "loopActionProgress", "loopActionProgressBody"],
  ["document", "loopActionEvidence", "loopActionEvidenceBody"],
];

export default function MobileAppSection({ onPrepare }) {
  const { t, href } = useLocale();
  return (
    <section
      className="section mobile-section loop-action-section"
      id="aplicativo"
      aria-labelledby="loop-action-title"
    >
      <div className="container">
        <div className="loop-action-layout">
          <div className="loop-action-copy">
            <p className="eyebrow">{t("mobileEyebrow")}</p>
            <p className="loop-action-brand">
              <LoopMark /> Loop Ação
            </p>
            <h2 id="loop-action-title">
              {t("mobileTitle")} <span>{t("mobileTitleAccent")}</span>
            </h2>
            <p className="section-intro">{t("mobileBody")}</p>
            <div className="button-row">
              {siteConfig.appDownload && (
                <a
                  className="button"
                  href={siteConfig.appDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("downloadApp")}
                  <Icon name="download" />
                </a>
              )}
              <a
                className={
                  siteConfig.appDownload ? "button button-secondary" : "button"
                }
                href="#loop-acao"
              >
                {t("knowLoopAction")}
                <Icon />
              </a>
            </div>
            <p className="loop-action-privacy">
              <Icon name="shield" />
              {t("loopActionLocal")}
            </p>
            <p className="loop-action-availability">
              {t(
                siteConfig.appDownload ? "mobileStatus" : "mobileAvailability",
              )}
            </p>
            {!siteConfig.appDownload && (
              <a
                href={href("quote")}
                className="text-link loop-action-access"
                onClick={() => onPrepare(["mobile"], { kind: "app" })}
              >
                {t("requestAccess")}
                <Icon />
              </a>
            )}
          </div>
          <figure className="loop-action-showcase">
            <span className="loop-action-concept-label">
              {t("loopActionConcept")}
            </span>
            <div className="loop-action-phone" aria-hidden="true">
              <div className="loop-phone-camera" />
              <div className="loop-phone-brand">
                <LoopMark />
                <span>Loop Avante</span>
                <Icon name="menu" />
              </div>
              <div className="loop-phone-content">
                <span className="loop-phone-eyebrow">
                  LOOP AÇÃO / 30 {t("loopActionDays")}
                </span>
                <h3>{t("loopActionPreviewTitle")}</h3>
                <p>{t("loopActionPreviewBody")}</p>
                <div className="loop-phone-progress">
                  <span>{t("loopActionYourProgress")}</span>
                  <strong>
                    25<small>%</small>
                  </strong>
                  <div className="loop-phone-track">
                    <span />
                  </div>
                  <p>3 / 12 {t("loopActionCompleted")}</p>
                </div>
                <div className="loop-phone-week">
                  <b>{t("loopActionWeek")}</b>
                  <span>01 — 04</span>
                </div>
                <div className="loop-phone-task is-complete">
                  <i>
                    <Icon name="check" />
                  </i>
                  <div>
                    <b>{t("loopActionTask1")}</b>
                    <span>{t("loopActionTaskDone")}</span>
                  </div>
                </div>
                <div className="loop-phone-task">
                  <i />
                  <div>
                    <b>{t("loopActionTask2")}</b>
                    <span>{t("loopActionTaskPending")}</span>
                  </div>
                </div>
                <div className="loop-phone-note">
                  <Icon name="document" />
                  <span>{t("loopActionPreviewNote")}</span>
                </div>
              </div>
              <div className="loop-phone-bottom">
                <span />
                <span />
                <span className="is-active" />
                <span />
                <span />
              </div>
              <div className="loop-phone-homebar" />
            </div>
            <figcaption>{t("mobilePreview")}</figcaption>
          </figure>
        </div>
        <div className="loop-action-details" id="loop-acao" tabIndex="-1">
          <div className="loop-action-detail-heading">
            <p className="eyebrow">{t("loopActionDetailEyebrow")}</p>
            <h3>{t("loopActionDetailTitle")}</h3>
          </div>
          <div className="loop-action-benefits">
            {benefits.map(([icon, title, body], index) => (
              <article key={title}>
                <div className="loop-benefit-heading">
                  <Icon name={icon} />
                  <span>0{index + 1}</span>
                </div>
                <h4>{t(title)}</h4>
                <p>{t(body)}</p>
              </article>
            ))}
          </div>
          {siteConfig.appDownload && (
            <details className="loop-action-install">
              <summary>{t("loopActionInstallTitle")}</summary>
              <p>
                {t("loopActionInstallOrigin")}{" "}
                <strong>{new URL(siteConfig.appDownload).hostname}</strong>.
              </p>
              <ol>
                <li>{t("loopActionInstallStep1")}</li>
                <li>{t("loopActionInstallStep2")}</li>
              </ol>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}
