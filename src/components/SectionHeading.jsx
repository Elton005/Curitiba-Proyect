import { useLocale } from "../app/LocaleContext.jsx";
export default function SectionHeading({
  eyebrow,
  title,
  body,
  className = "",
  children,
  as: Heading = "h2",
}) {
  const { t } = useLocale();
  return (
    <div className={`section-heading ${className}`}>
      <div>
        <p className="eyebrow">{t(eyebrow)}</p>
        <Heading>{t(title)}</Heading>
      </div>
      {body && <p className="section-intro">{t(body)}</p>}
      {children}
    </div>
  );
}
