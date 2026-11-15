import { mkdir, writeFile } from "node:fs/promises";
import { pages, pageHref } from "../src/data/pages.js";

const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
function documentHtml(language, title, description, notFound = false) {
  return `<!doctype html>
<html lang="${language === "pt" ? "pt-BR" : "es"}" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#11172d">
<script>try{document.documentElement.dataset.theme=localStorage.getItem('loop-theme')==='light'?'light':'dark'}catch{}</script>
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<meta name="robots" content="${notFound ? "noindex,follow" : "index,follow"}">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Loop Avante">
<meta property="og:locale" content="${language === "pt" ? "pt_BR" : "es_ES"}">
<meta property="og:locale:alternate" content="${language === "pt" ? "es_ES" : "pt_BR"}">
<meta property="og:image" content="/media/og-loop-${language}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}">
<meta name="twitter:image" content="/media/og-loop-${language}.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/media/apple-touch-icon.png">
<link rel="preload" href="/fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
</head><body>
<div id="root"${notFound ? ' data-page="not-found"' : ""}></div>
<noscript><h1>${escape(title)}</h1><p>${escape(description)}</p><p>${language === "pt" ? "Ative o JavaScript para explorar os projetos e ferramentas digitais." : "Activa JavaScript para explorar los proyectos y las herramientas digitales."}</p></noscript>
<script type="module" src="/src/main.jsx"></script>
</body></html>
`;
}
for (const language of ["pt", "es"]) {
  for (const [key, page] of Object.entries(pages)) {
    const directory = "." + pageHref(key, language);
    await mkdir(directory, { recursive: true });
    await writeFile(
      directory + "index.html",
      documentHtml(language, page.title[language], page.description[language]),
    );
  }
  const directory = language === "es" ? "es/" : "";
  await mkdir(directory || ".", { recursive: true });
  await writeFile(
    directory + "404.html",
    documentHtml(
      language,
      "404 — Loop Avante",
      language === "pt" ? "Página não encontrada." : "Página no encontrada.",
      true,
    ),
  );
}
console.log(
  `${Object.keys(pages).length * 2} localized independent entries and 2 error pages prepared.`,
);
