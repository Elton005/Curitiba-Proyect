import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { processSteps } from "../data/content.js";

export default function ProcessSection() {
  const { t } = useLocale();
  return (
    <section className="section process-section" id="processo">
      <div className="container">
        <SectionHeading
          eyebrow="processEyebrow"
          title="processTitle"
          body="processBody"
        />
        <ol className="process-grid">
          {processSteps.map((step, i) => (
            <li key={i}>
              <span className="process-number">
                {String(i + 1).padStart(2, "0")}
                <i />
              </span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.copy)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
