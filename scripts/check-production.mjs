import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { pages, pageHref } from "../src/data/pages.js";

const origin = "http://127.0.0.1:4173";
await mkdir(".local/review/production", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const report = {
  date: "2026-11-14",
  environment:
    "Local Microsoft Edge headless, without network/CPU throttling. Lab samples, not field Core Web Vitals; no field INP measurement.",
  pages: [],
  assets: [],
};
try {
  for (const pageKey of Object.keys(pages))
    for (const language of ["pt", "es"]) {
      const path = pageHref(pageKey, language),
        width = language === "pt" ? 1440 : 390;
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.addInitScript(() => {
        window.labVitals = { lcp: null, cls: 0 };
        try {
          new PerformanceObserver((list) => {
            for (const e of list.getEntries())
              window.labVitals.lcp = e.startTime;
          }).observe({ type: "largest-contentful-paint", buffered: true });
          new PerformanceObserver((list) => {
            for (const e of list.getEntries())
              if (!e.hadRecentInput) window.labVitals.cls += e.value;
          }).observe({ type: "layout-shift", buffered: true });
        } catch {}
      });
      const response = await page.goto(origin + path, {
        waitUntil: "networkidle",
      });
      const metrics = await page.evaluate(() => ({
        title: document.title,
        lang: document.documentElement.lang,
        theme: document.documentElement.dataset.theme,
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1Count: document.querySelectorAll("h1").length,
        fcp: performance.getEntriesByName("first-contentful-paint")[0]
          ?.startTime,
        ...window.labVitals,
        loadedScripts: performance
          .getEntriesByType("resource")
          .filter(
            (entry) =>
              entry.name.includes("/assets/") && entry.name.endsWith(".js"),
          )
          .map((entry) => new URL(entry.name).pathname),
      }));
      report.pages.push({
        path,
        status: response.status(),
        errors,
        ...metrics,
      });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((img) => {
            img.loading = "eager";
            return img.decode().catch(() => {});
          }),
        );
      });
      await page.screenshot({
        path: `.local/review/production/${pageKey}-${language}-${width}.png`,
        animations: "disabled",
      });
      await page.close();
    }
  for (const path of [
    "/robots.txt",
    "/favicon.svg",
    "/media/og-loop-pt.png",
    "/media/og-loop-es.png",
    "/fonts/plus-jakarta-sans-latin.woff2",
    "/promo/",
    "/caminho-inexistente",
    "/es/ruta-inexistente",
  ]) {
    const response = await fetch(origin + path, {
      headers: { Accept: "text/html" },
    });
    await response.body?.cancel();
    report.assets.push({ path, status: response.status });
  }
} finally {
  await browser.close();
}
await writeFile(
  "docs/audit/review/production-smoke.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (
  report.pages.some(
    (page) =>
      page.errors.length ||
      page.status !== 200 ||
      page.scrollWidth !== page.width ||
      page.h1Count !== 1 ||
      page.cls > 0.1,
  ) ||
  report.assets.some(
    (asset) =>
      asset.status !== (asset.path.includes("inexistente") ? 404 : 200),
  )
)
  process.exitCode = 1;
