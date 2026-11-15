import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { pages, pageHref } from "../src/data/pages.js";
import { fullReportState } from "../tests/intelligence-fixture.js";
const browser = await chromium.launch({ channel: "msedge", headless: true }),
  results = [],
  errors = [],
  violations = [];
await mkdir(".local/loop31/captures", { recursive: true });
const state = fullReportState();
state.sectorAssessment = {
  sectorId: "commerce",
  answers: { q0: 1, q1: 0, q2: 2, q3: 1 },
};
try {
  for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
    for (const language of ["pt", "es"])
      for (const theme of ["dark", "light"])
        for (const key of process.argv.includes("--sector-only")
          ? ["sectors"]
          : Object.keys(pages)) {
          const context = await browser.newContext({
            viewport: { width, height: 1000 },
            reducedMotion: "reduce",
          });
          const page = await context.newPage();
          await page.addInitScript(
            ({ state, theme }) => {
              sessionStorage.setItem(
                "loop-intelligence-v1",
                JSON.stringify(state),
              );
              localStorage.setItem("loop-theme", theme);
            },
            { state, theme },
          );
          page.on("pageerror", (e) => errors.push({ key, message: e.message }));
          try {
            const response = await page.goto(
              "http://127.0.0.1:4173" + pageHref(key, language),
            );
            await page.locator("h1").waitFor();
            await page.evaluate(async () => {
              await document.fonts.ready;
              await Promise.all(
                [...document.images].map((img) => {
                  img.loading = "eager";
                  return img.decode().catch(() => {});
                }),
              );
            });
            const overflow = await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth,
            );
            const failedModule = await page.locator(".page-loading").count();
            results.push({
              key,
              width,
              language,
              theme,
              status: response.status(),
              overflow,
              failedModule,
            });
            await page.screenshot({
              path: `.local/loop31/captures/${key}-${language}-${theme}-${width}.png`,
              animations: "disabled",
            });
            if (
              [390, 1440].includes(width) &&
              ["solutions", "huellaCase", "yoeldisCase", "sectors"].includes(
                key,
              )
            ) {
              await page.screenshot({
                path: `.local/loop31/captures/${key}-${language}-${theme}-${width}-full.png`,
                fullPage: true,
              });
              const a = await new AxeBuilder({ page })
                .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
                .analyze();
              if (a.violations.length)
                violations.push({
                  key,
                  width,
                  language,
                  theme,
                  items: a.violations.map((v) => ({
                    id: v.id,
                    nodes: v.nodes.map((n) => n.target),
                  })),
                });
            }
          } catch (e) {
            errors.push({ key, width, language, theme, message: e.message });
          } finally {
            await context.close();
          }
          await writeFile(
            process.argv.includes("--sector-only")
              ? "docs/LOOP-AVANTE-3.1-SECTOR-VISUAL.json"
              : "docs/LOOP-AVANTE-3.1-VISUAL.json",
            JSON.stringify({ results, errors, violations }, null, 2),
          );
        }
    console.log(
      `Completed ${width}px: ${results.length} samples, ${errors.length} errors.`,
    );
  }
} finally {
  await browser.close();
}
console.log(
  JSON.stringify({
    samples: results.length,
    overflow: results.filter((r) => r.overflow),
    errors,
    violations,
  }),
);
if (
  results.some((r) => r.overflow || r.status !== 200 || r.failedModule) ||
  errors.length ||
  violations.length
)
  process.exitCode = 1;
