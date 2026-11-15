import { validatePublicConfig } from "../src/utils/contact.js";
import { pages, pageHref } from "../src/data/pages.js";
import { readFile } from "node:fs/promises";

export function seoPlugin(env) {
  const { origin } = validatePublicConfig({ origin: env.VITE_SITE_ORIGIN });
  return {
    name: "loop-avante-seo",
    transformIndexHtml(html, context) {
      if (!origin || context.filename.endsWith("404.html")) return html;
      const filename = context.filename.replaceAll("\\", "/");
      const page =
        Object.keys(pages).find(
          (key) =>
            pages[key].slug &&
            filename.endsWith(`/${pages[key].slug}/index.html`),
        ) || "home";
      const language = new RegExp(
        `/es/(?:${pages[page].slug ? pages[page].slug + "/" : ""})index\\.html$`,
      ).test(filename)
        ? "es"
        : "pt";
      const canonical = origin + pageHref(page, language);
      return html
        .replace(
          "</head>",
          `<link rel="canonical" href="${canonical}">\n<link rel="alternate" hreflang="pt-BR" href="${origin + pageHref(page, "pt")}">\n<link rel="alternate" hreflang="es" href="${origin + pageHref(page, "es")}">\n<link rel="alternate" hreflang="x-default" href="${origin + pageHref(page, "pt")}">\n<meta property="og:url" content="${canonical}">\n</head>`,
        )
        .replaceAll(
          'content="/media/og-loop-',
          `content="${origin}/media/og-loop-`,
        );
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\nDisallow: /404.html\nDisallow: /es/404.html\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : "# Sitemap omitted until a confirmed public origin is configured.\n"}`,
      });
      if (origin)
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${Object.keys(
            pages,
          )
            .flatMap((page) =>
              ["pt", "es"].map(
                (language) =>
                  `<url><loc>${origin + pageHref(page, language)}</loc><xhtml:link rel="alternate" hreflang="pt-BR" href="${origin + pageHref(page, "pt")}"/><xhtml:link rel="alternate" hreflang="es" href="${origin + pageHref(page, "es")}"/></url>`,
              ),
            )
            .join("")}</urlset>\n`,
        });
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.headers.accept?.includes("text/html")) return next();
        const url = new URL(req.url, "http://localhost");
        const known = Object.keys(pages).flatMap((page) =>
          ["pt", "es"].map((language) => pageHref(page, language)),
        );
        if (
          known.some(
            (path) => path !== "/" && url.pathname === path.slice(0, -1),
          )
        ) {
          res.writeHead(308, { Location: url.pathname + "/" + url.search });
          res.end();
          return;
        }
        if (
          known.includes(url.pathname) ||
          url.pathname.includes(".") ||
          url.pathname.startsWith("/@") ||
          url.pathname === "/promo/"
        )
          return next();
        const errorPath = url.pathname.startsWith("/es/")
          ? "/es/404.html"
          : "/404.html";
        const html = await server.transformIndexHtml(
          errorPath,
          await readFile(server.config.root + errorPath, "utf8"),
        );
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end(html);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.headers.accept?.includes("text/html")) return next();
        const url = new URL(req.url, "http://localhost");
        const known = Object.keys(pages).flatMap((page) =>
          ["pt", "es"].map((language) => pageHref(page, language)),
        );
        if (
          known.some(
            (path) => path !== "/" && url.pathname === path.slice(0, -1),
          )
        ) {
          res.writeHead(308, { Location: url.pathname + "/" + url.search });
          res.end();
          return;
        }
        if (
          known.includes(url.pathname) ||
          url.pathname.includes(".") ||
          url.pathname === "/promo/"
        )
          return next();
        const errorPath = url.pathname.startsWith("/es/")
          ? "/es/404.html"
          : "/404.html";
        const html = await readFile(
          `${server.config.root}/${server.config.build.outDir}${errorPath}`,
          "utf8",
        );
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end(html);
      });
    },
  };
}
