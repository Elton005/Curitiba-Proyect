import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";
import { solutions } from "../data/content.js";

export default function SolutionsSection({ onSelect }) {
  const { t, href } = useLocale();
  return (
    <section className="section solutions-section" id="solucoes">
      <div className="container">
        <SectionHeading
          eyebrow="solutionEyebrow"
          title="solutionTitle"
          body="solutionBody"
        />
        <a className="text-link all-solutions-link" href={href("solutions")}>
          {t("solutions")} <Icon />
        </a>
        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <article
              className={`solution-card solution-${solution.id}`}
              key={solution.id}
            >
              <div className="solution-top">
                <span className="solution-icon">
                  <Icon name={solution.icon} />
                </span>
                <span className="item-number">0{index + 1}</span>
              </div>
              <h3>{t(solution.title)}</h3>
              <p>{t(solution.copy)}</p>
              <p className="solution-benefit">
                <Icon name="check" />
                {t(solution.benefit)}
              </p>
              <div className="solution-bottom">
                <span>
                  <small>{t("examples")}</small>
                  {t(solution.examples)}
                </span>
                <a
                  href={href("quote")}
                  className="round-link"
                  aria-label={`${t("discussSolution")}: ${t(solution.title)}`}
                  onClick={() => onSelect(solution.id)}
                >
                  <Icon />
                </a>
              </div>
              {index === 0 && (
                <div className="solution-web-art" aria-hidden="true">
                  <div>
                    <i />
                    <i />
                    <i />
                  </div>
                  <span />
                  <b />
                  <b />
                  <em />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
