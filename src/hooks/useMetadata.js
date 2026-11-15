import { useEffect } from "react";
import { translate } from "../data/translations.js";
import { pages, pageHref } from "../data/pages.js";
import { siteConfig } from "../data/config.js";

export function useMetadata(language, page) {
  useEffect(() => {
    const title = page
      ? translate(pages[page].title, language)
      : "404 — Loop Avante";
    const description = translate(
      page ? pages[page].description : "notFoundBody",
      language,
    );
    document.title = title;
    function meta(attribute, key, content) {
      let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attribute, key);
        document.head.append(node);
      }
      node.content = content;
    }
    meta("name", "robots", page ? "index,follow" : "noindex,follow");
    meta("name", "description", description);
    for (const prefix of ["og", "twitter"]) {
      meta(prefix === "og" ? "property" : "name", `${prefix}:title`, title);
      meta(
        prefix === "og" ? "property" : "name",
        `${prefix}:description`,
        description,
      );
      meta(
        prefix === "og" ? "property" : "name",
        `${prefix}:image`,
        `${siteConfig.origin}/media/og-loop-${language}.png`,
      );
    }
    meta("property", "og:locale", language === "pt" ? "pt_BR" : "es_ES");
    meta(
      "property",
      "og:locale:alternate",
      language === "pt" ? "es_ES" : "pt_BR",
    );
    document.head
      .querySelectorAll(
        'link[rel="canonical"],link[rel="alternate"][hreflang],meta[property="og:url"]',
      )
      .forEach((node) => node.remove());
    if (siteConfig.origin && page) {
      const canonical = siteConfig.origin + pageHref(page, language);
      meta("property", "og:url", canonical);
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = canonical;
      document.head.append(link);
      for (const lang of ["pt", "es", "x-default"]) {
        const alternate = document.createElement("link");
        alternate.rel = "alternate";
        alternate.hreflang = lang === "pt" ? "pt-BR" : lang;
        alternate.href =
          siteConfig.origin + pageHref(page, lang === "es" ? "es" : "pt");
        document.head.append(alternate);
      }
    }
  }, [language, page]);
}
