import { useLocale } from "../../app/LocaleContext.jsx";
import { resultInsights } from "../../utils/resultInsights.js";
import { Panel } from "./AnalyticsUI.jsx";
export default function ResultInsights({ kind, result, inputs }) {
  const { t, href } = useLocale(),
    insight = resultInsights(kind, result, inputs);
  if (!insight) return null;
  return (
    <Panel title={<>{t(insight.title)}</>} className="result-insights">
      <ul>
        {insight.points.map((point, index) => (
          <li key={index}>{t(point)}</li>
        ))}
      </ul>
      <a className="text-link" href={href("solutions", insight.solution)}>
        {t(insight.cta)} →
      </a>
    </Panel>
  );
}
