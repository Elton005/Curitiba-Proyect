import { useLocale } from "../app/LocaleContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { team } from "../data/content.js";

export default function TeamSection() {
  const { t } = useLocale();
  return (
    <section className="section team-section" id="equipe">
      <div className="container">
        <SectionHeading
          eyebrow="teamEyebrow"
          title="teamTitle"
          body="teamBody"
        />
        <div className="team-grid">
          {team.map((person) => (
            <article className="team-member" key={person.name}>
              <div className="team-photo">
                <img
                  src={person.image}
                  alt={person.name}
                  width="400"
                  height="440"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="team-info">
                <h3>{person.name}</h3>
                <p className="team-role">{t(person.role)}</p>
                <p>{t(person.copy)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
