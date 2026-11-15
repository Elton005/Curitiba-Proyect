import { useLocale } from "../../app/LocaleContext.jsx";
import Icon from "../Icon.jsx";
import { intelligenceTools } from "../../data/intelligence/tools.js";
import { formatNumber } from "../../utils/format.js";
import { toolOrientation } from "../../data/toolOrientation.js";

export function IntelligenceFrame({
  title,
  intro,
  type = "illustrative",
  children,
  home = false,
}) {
  const { t, href, page } = useLocale();
  return (
    <div className="int-workspace">
      <div className="container">
        <nav
          className="breadcrumbs int-breadcrumbs"
          aria-label={t("breadcrumbs")}
        >
          <ol>
            <li>
              <a href={href("home")}>{t("home")}</a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              {home ? (
                <span aria-current="page">{t("i.name")}</span>
              ) : (
                <a href={href("intelligence")}>{t("i.name")}</a>
              )}
            </li>
            {!home && (
              <>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{t(title)}</li>
              </>
            )}
          </ol>
        </nav>
        <div className="int-product-line">
          <span>
            <Icon name="spark" />
            {t("i.name")} <small>LOOP AVANTE</small>
          </span>
          <span className="int-session-label">
            <Icon name="shield" />
            {t("i.local")}
          </span>
        </div>
        <div className="int-tool-select">
          <label htmlFor="int-tool-selector">{t("toolsNavigation")}</label>
          <select
            id="int-tool-selector"
            value={page}
            onChange={(e) => location.assign(href(e.target.value))}
          >
            <option value="intelligence">{t("i.name")}</option>
            {intelligenceTools.map((tool) => (
              <option key={tool.page} value={tool.page}>
                {t(tool.name)}
              </option>
            ))}
          </select>
        </div>
        <nav className="int-tool-nav" aria-label={t("toolsNavigation")}>
          {intelligenceTools.map((tool) => (
            <a
              key={tool.page}
              href={href(tool.page)}
              aria-current={page === tool.page ? "page" : undefined}
            >
              <Icon name={tool.icon} />
              {t(tool.short)}
            </a>
          ))}
        </nav>
        <header className="int-page-heading">
          <p className="eyebrow">
            {t(
              home
                ? "i.productLabel"
                : type === "official"
                  ? "i.official"
                  : type === "editorial"
                    ? "i.editorial"
                    : type === "session"
                      ? "i.sessionReport"
                      : "i.illustrative",
            )}
          </p>
          <h1>{t(title)}</h1>
          <p>{t(intro)}</p>
          {toolOrientation[page] && (
            <div className="tool-orientation">
              <p className="tool-orientation-desktop">
                <strong>{t({ pt: "Como usar", es: "Cómo usar" })} · </strong>
                {t(toolOrientation[page])}
              </p>
              <details className="tool-orientation-mobile">
                <summary>
                  {t({
                    pt: "Como usar esta ferramenta",
                    es: "Cómo usar esta herramienta",
                  })}
                  <Icon name="chevron" />
                </summary>
                <p>{t(toolOrientation[page])}</p>
              </details>
            </div>
          )}
        </header>
        {children}
        <p className="int-session-note">
          <Icon name="shield" />
          {t("i.sessionNote")}
        </p>
      </div>
    </div>
  );
}
export function Panel({ title, children, action, className = "" }) {
  const { t } = useLocale();
  return (
    <section className={`int-panel ${className}`}>
      <div className="int-panel-heading">
        <h2>{typeof title === "string" ? t(title) : title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
export function NumericField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 10000000,
  step = "any",
  help,
  optional = false,
}) {
  const { t } = useLocale();
  const invalid =
    !(optional && value === "") &&
    (value === "" ||
      !Number.isFinite(Number(value)) ||
      Number(value) < min ||
      Number(value) > max);
  return (
    <div className="field int-field">
      <label htmlFor={id}>{t(label)}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-invalid={invalid}
        aria-describedby={help ? `${id}-help` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {help && <small id={`${id}-help`}>{t(help)}</small>}
    </div>
  );
}
export function Metric({ label, value, note, negative = false }) {
  const { t } = useLocale();
  return (
    <div className={`int-metric ${negative ? "is-negative" : ""}`}>
      <span>{t(label)}</span>
      <strong>{value}</strong>
      {note && <small>{typeof note === "string" ? t(note) : note}</small>}
    </div>
  );
}
export function Method({ children, title = "i.method" }) {
  const { t } = useLocale();
  return (
    <details className="int-method">
      <summary>
        {t(title)}
        <Icon name="chevron" />
      </summary>
      <div>{children}</div>
    </details>
  );
}
export function Notice({ children, danger = false }) {
  return (
    <p className={`int-notice ${danger ? "is-danger" : ""}`}>
      <Icon name="info" />
      {children}
    </p>
  );
}
export function Invalid() {
  const { t } = useLocale();
  return (
    <p role="alert" className="int-error">
      {t("i.invalid")}
    </p>
  );
}
export function SaveActions({ onSave, disabled, saved }) {
  const { t, href } = useLocale();
  return (
    <div className="int-save-actions">
      <button
        type="button"
        className="button"
        disabled={disabled}
        onClick={onSave}
      >
        {t("i.addReport")}
        <Icon name="check" />
      </button>
      <a href={href("report")} className="button button-outline">
        {t("i.viewReport")}
        <Icon />
      </a>
      <span role="status">{saved ? t("i.saved") : ""}</span>
    </div>
  );
}
export function Empty({ title = "i.noData", body = "i.noDataHelp", children }) {
  const { t } = useLocale();
  return (
    <div className="int-empty">
      <Icon name="chart" />
      <h2>{t(title)}</h2>
      <p>{t(body)}</p>
      {children}
    </div>
  );
}
export function DataTable({ caption, columns, rows, rowKey }) {
  return (
    <div
      className="int-table-scroll"
      tabIndex="0"
      role="region"
      aria-label={caption}
    >
      <table className="int-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={rowKey ? rowKey(row) : index}>
              {columns.map((column) => (
                <td key={column.id}>
                  {column.render ? column.render(row) : row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function BarChart({ title, rows, format, caption }) {
  const { t, language } = useLocale();
  const max = Math.max(1, ...rows.map((row) => Math.abs(row.value)));
  const fmt = format || ((v) => formatNumber(v, language));
  return (
    <figure className="int-bar-chart">
      <figcaption>{title}</figcaption>
      {rows.map((row, index) => (
        <div
          className={`int-bar-row ${row.value < 0 ? "negative" : ""}`}
          key={row.id || index}
        >
          <div>
            <span>{row.label}</span>
            <strong>{fmt(row.value)}</strong>
          </div>
          <div className="int-bar-track" aria-hidden="true">
            <i style={{ width: `${(Math.abs(row.value) / max) * 100}%` }} />
          </div>
        </div>
      ))}
      {caption && <p className="fine-print">{caption}</p>}
      <details className="int-chart-data">
        <summary>{t("i.tableData")}</summary>
        <table>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <th scope="row">{row.label}</th>
                <td>{fmt(row.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
export function LineChart({ title, points, format, caption }) {
  const { t, language } = useLocale();
  if (!points.length) return null;
  const fmt = format || ((v) => formatNumber(v, language));
  const min = Math.min(0, ...points.map((p) => p.value)),
    max = Math.max(1, ...points.map((p) => p.value)),
    range = max - min || 1;
  const x = (i) => 40 + (i / Math.max(1, points.length - 1)) * 420,
    y = (v) => 185 - ((v - min) / range) * 155;
  const path = points
    .map((p, i) => `${i ? "L" : "M"}${x(i)} ${y(p.value)}`)
    .join(" ");
  return (
    <figure className="int-line-chart">
      <figcaption>{title}</figcaption>
      <svg
        viewBox="0 0 490 225"
        role="img"
        aria-label={`${title}: ${fmt(min)} — ${fmt(max)}`}
      >
        <path d={`M40 ${y(0)}H460`} className="int-zero-line" />
        <path d={path} className="int-line-path" />
        <text x="40" y="18">
          {fmt(max)}
        </text>
        <text x="40" y="215">
          {String(points[0].label)}
        </text>
        <text x="460" y="215" textAnchor="end">
          {String(points.at(-1).label)}
        </text>
        {min < 0 && (
          <text x="40" y="200">
            {fmt(min)}
          </text>
        )}
      </svg>
      {caption && <p className="fine-print">{caption}</p>}
      <details className="int-chart-data">
        <summary>{t("i.tableData")}</summary>
        <table>
          <tbody>
            {points.map((point, index) => (
              <tr key={index}>
                <th scope="row">{point.label}</th>
                <td>{fmt(point.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
