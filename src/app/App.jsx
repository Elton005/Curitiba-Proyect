import IntelligencePreview from "../sections/IntelligencePreview.jsx";
import { useMemo, useCallback } from "react";
import { LocaleContext } from "./LocaleContext.jsx";
import { usePreferences } from "../hooks/usePreferences.js";
import { useMetadata } from "../hooks/useMetadata.js";
import { useSessionState } from "../hooks/useSessionState.js";
import { useAnchorNavigation } from "../hooks/useAnchorNavigation.js";
import { translate } from "../data/translations.js";
import { pageHref, resolvePage } from "../data/pages.js";
import {
  emptyProject,
  mergeProject,
  projectSeed,
  sanitizeProject,
} from "../utils/projectContext.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import PageNavigation from "../components/PageNavigation.jsx";
import Hero from "../sections/Hero.jsx";
import SolutionsSection from "../sections/SolutionsSection.jsx";
import ImpactSection from "../sections/ImpactSection.jsx";
import PortfolioSection from "../sections/PortfolioSection.jsx";
import MobileAppSection from "../sections/MobileAppSection.jsx";
import ToolsSection from "../sections/ToolsSection.jsx";
import ProcessSection from "../sections/ProcessSection.jsx";
import TeamSection from "../sections/TeamSection.jsx";
import ContactSection from "../sections/ContactSection.jsx";
import NotFoundPage from "../sections/NotFoundPage.jsx";
export default function App({ PageComponent = null, loadError = false }) {
  const { language, setLanguage, theme, setTheme, pathname } = usePreferences();
  const route = resolvePage(pathname);
  const page =
    document.getElementById("root")?.dataset.page === "not-found"
      ? null
      : route.page;
  const [project, setProject] = useSessionState(
    "loop-project",
    emptyProject,
    sanitizeProject,
  );
  const seed = useMemo(
    () => ({
      text: projectSeed(
        {
          ...project,
          contexts: project.contexts.filter(
            (c) => !["simulator", "diagnostic"].includes(c.kind),
          ),
        },
        language,
      ),
      economicText: projectSeed(
        {
          ...project,
          contexts: project.contexts.filter((c) => c.kind === "simulator"),
        },
        language,
      ),
      diagnosticText: projectSeed(
        {
          ...project,
          contexts: project.contexts.filter((c) => c.kind === "diagnostic"),
        },
        language,
      ),
    }),
    [project, language],
  );
  const setSelected = useCallback(
    (next) =>
      setProject((current) =>
        sanitizeProject({
          ...current,
          selected: typeof next === "function" ? next(current.selected) : next,
        }),
      ),
    [setProject],
  );
  const prepareQuote = useCallback(
    (ids, context) =>
      setProject((current) => mergeProject(current, ids, context)),
    [setProject],
  );
  useMetadata(language, page);
  useAnchorNavigation(page, language);
  const locale = useMemo(
    () => ({
      language,
      setLanguage,
      page,
      t: (value) => translate(value, language),
      href: (target = "home", hash = "") => pageHref(target, language, hash),
    }),
    [language, setLanguage, page],
  );
  return (
    <LocaleContext.Provider value={locale}>
      <a className="skip-link" href="#conteudo">
        {locale.t("skip")}
      </a>
      <Header theme={theme} setTheme={setTheme} />
      {!page ? (
        <NotFoundPage />
      ) : (
        <main
          id="conteudo"
          className={
            page === "home" ? "home-page" : `standalone-page page-${page}`
          }
        >
          {["projects", "diagnostic", "quote"].includes(page) && (
            <PageNavigation />
          )}
          {[
            "solutions",
            "huellaCase",
            "yoeldisCase",
            "intelligence",
            "market",
            "productivity",
            "investment",
            "sectors",
            "report",
          ].includes(page) &&
            PageComponent && <PageComponent onPrepare={prepareQuote} />}
          {page === "home" && (
            <>
              <Hero />
              <SolutionsSection onSelect={(id) => prepareQuote([id])} />
              <IntelligencePreview />
              <ImpactSection />
              <PortfolioSection preview />
              <MobileAppSection onPrepare={prepareQuote} />
              <ToolsSection />
              <ProcessSection />
              <TeamSection />
              <ContactSection />
            </>
          )}
          {loadError && (
            <div className="container page-loading" role="alert">
              <h1>{locale.t("loadErrorTitle")}</h1>
              <p>{locale.t("loadErrorBody")}</p>
              <button
                className="button"
                type="button"
                onClick={() => location.reload()}
              >
                {locale.t("retry")}
              </button>
            </div>
          )}
          {page === "projects" && <PortfolioSection standalone />}
          {page === "diagnostic" && PageComponent && (
            <PageComponent standalone onPrepare={prepareQuote} />
          )}
          {page === "simulator" && PageComponent && (
            <PageComponent standalone onPrepare={prepareQuote} />
          )}
          {page === "quote" && PageComponent && (
            <PageComponent
              standalone
              selected={project.selected}
              setSelected={setSelected}
              seed={seed}
              intelligenceRequested={project.contexts.some(
                (entry) => entry.kind === "intelligence",
              )}
            />
          )}
        </main>
      )}
      <Footer />
    </LocaleContext.Provider>
  );
}
