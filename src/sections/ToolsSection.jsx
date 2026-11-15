import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";

const tools = [
  [
    "diagnostic",
    "spark",
    "diagnosticName",
    "diagnosticCard",
    "startDiagnostic",
  ],
  ["simulator", "chart", "simulatorIntro", "simulatorCard", "exploreScenario"],
  ["quote", "document", "requestQuote", "quoteCard", "prepareBrief"],
];
export default function ToolsSection() {
  const { t, href } = useLocale();
  return (
    <section className="section tools-section" id="ferramentas">
      <div className="container">
        <SectionHeading
          eyebrow="toolsEyebrow"
          title="toolsTitle"
          body="toolsBody"
        />
        <div className="tools-grid">
          {tools.map(([page, icon, title, copy, action], index) => (
            <article key={page} className="tool-card">
              <div>
                <span className="solution-icon">
                  <Icon name={icon} />
                </span>
                <span className="item-number">0{index + 1}</span>
              </div>
              <h3>{t(title)}</h3>
              <p>{t(copy)}</p>
              <a href={href(page)} className="text-link">
                {t(action)}
                <Icon />
              </a>
            </article>
          ))}
        </div>
        <a className="int-home-teaser" href={href("intelligence")}>
          <Icon name="chart" />
          <span>
            <strong>{t("i.name")}</strong>
            <small>{t("i.intro")}</small>
          </span>
          <Icon />
        </a>
      </div>
    </section>
  );
}
