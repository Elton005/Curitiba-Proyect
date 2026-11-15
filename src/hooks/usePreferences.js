import { useCallback, useEffect, useState } from "react";
import { pageHref, resolvePage } from "../data/pages.js";

function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
export function usePreferences() {
  const [pathname, setPathname] = useState(location.pathname);
  const [language, setLanguageState] = useState(() =>
    new URLSearchParams(location.search).get("lang") === "es"
      ? "es"
      : resolvePage(location.pathname).language,
  );
  const [theme, setTheme] = useState(() =>
    readPreference("loop-theme") === "light" ? "light" : "dark",
  );
  const setLanguage = useCallback((next) => {
    if (
      !["pt", "es"].includes(next) ||
      next === resolvePage(location.pathname).language
    )
      return;
    const route = resolvePage(location.pathname);
    const target = route.page
      ? pageHref(route.page, next, location.hash.slice(1))
      : next === "es"
        ? "/es/404.html"
        : "/404.html";
    history.pushState(null, "", target);
    setPathname(location.pathname);
    setLanguageState(next);
  }, []);
  useEffect(() => {
    function sync() {
      setPathname(location.pathname);
      setLanguageState(resolvePage(location.pathname).language);
    }
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  useEffect(() => {
    savePreference("loop-language", language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "es";
    const route = resolvePage(pathname);
    if (route.page) {
      const url = new URL(location.href);
      url.pathname = pageHref(route.page, language);
      url.searchParams.delete("lang");
      history.replaceState(null, "", url);
    }
  }, [language, pathname]);
  useEffect(() => {
    savePreference("loop-theme", theme);
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#11172d" : "#fffaf1");
  }, [theme]);
  return { language, setLanguage, theme, setTheme, pathname };
}
