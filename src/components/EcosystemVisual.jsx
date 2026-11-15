import { useLocale } from "../app/LocaleContext.jsx";
import { LoopMark } from "./Brand.jsx";
import Icon from "./Icon.jsx";

export default function EcosystemVisual() {
  const { t } = useLocale();
  return (
    <figure className="ecosystem-visual" aria-label={t("artLabel")}>
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="visual-coordinate coord-top" aria-hidden="true">
        LA—01 / WEB + MOBILE
      </div>
      <div className="ecosystem-browser" aria-hidden="true">
        <div className="browser-chrome">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span>Loop Avante / {t("overview")}</span>
          <Icon name="external" />
        </div>
        <div className="dashboard-shell">
          <div className="dashboard-rail">
            <LoopMark />
            <span className="rail-active">
              <Icon name="grid" />
            </span>
            <Icon name="chart" />
            <Icon name="message" />
            <Icon name="workflow" />
          </div>
          <div className="dashboard-body">
            <div className="dashboard-welcome">
              <span>AVANTE / {t("overview")}</span>
              <span className="mini-avatar">LA</span>
            </div>
            <h3>{t("ecosystem")}</h3>
            <p>{t("ecosystemSub")}</p>
            <div className="dashboard-cards">
              {[
                ["web", "presence"],
                ["grid", "management"],
                ["workflow", "connection"],
              ].map(([icon, key]) => (
                <div key={key}>
                  <Icon name={icon} />
                  <span>{t(key)}</span>
                  <i />
                </div>
              ))}
            </div>
            <div className="dashboard-chart">
              <div>
                <span>{t("connected")}</span>
                <Icon name="chart" />
              </div>
              <svg viewBox="0 0 300 95" fill="none">
                <path
                  d="M0 25h300M0 55h300M0 85h300"
                  stroke="#e1e9e3"
                  strokeDasharray="3 4"
                />
                <path
                  d="M0 80C28 80 30 65 55 64S80 77 105 55s33-2 60-17 30 3 57-13 45-3 78-20"
                  stroke="#078e69"
                  strokeWidth="3"
                />
                <path
                  d="M0 80C28 80 30 65 55 64S80 77 105 55s33-2 60-17 30 3 57-13 45-3 78-20V95H0Z"
                  fill="#078e69"
                  opacity=".08"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="visual-phone" aria-hidden="true">
        <div className="phone-island" />
        <LoopMark />
        <span>LOOP AVANTE</span>
        <h3>{t("yourNext")}</h3>
        <div className="phone-tile">
          <Icon name="web" />
          <span>Web</span>
          <Icon />
        </div>
        <div className="phone-tile">
          <Icon name="phone" />
          <span>Mobile</span>
          <Icon />
        </div>
        <div className="phone-bottom-pill" />
      </div>
      <div className="connection-chip" aria-hidden="true">
        <span className="chip-icon">
          <Icon name="check" />
        </span>
        <div>
          <strong>{t("integration")}</strong>
          <span>{t("connected")}</span>
        </div>
        <span className="status-dot" />
      </div>
      <figcaption>
        {t("artCaption")}
        <span className="visual-plus" aria-hidden="true">
          +
        </span>
      </figcaption>
    </figure>
  );
}
