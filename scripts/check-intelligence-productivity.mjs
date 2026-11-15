// Focused visual regression for the final annual-unit caption correction.
import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { fullReportState } from "../tests/intelligence-fixture.js";
const browser = await chromium.launch({ channel: "msedge", headless: true }),
  results = [];
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:4173/inteligencia/");
  await page.locator("h1").waitFor();
  await page.evaluate(
    (state) =>
      sessionStorage.setItem("loop-intelligence-v1", JSON.stringify(state)),
    fullReportState(),
  );
  for (const language of ["pt", "es"])
    for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(
        `http://127.0.0.1:4173/${language === "es" ? "es/" : ""}inteligencia/produtividade/`,
      );
      await page.locator("h1").waitFor();
      const theme = language === "pt" ? "dark" : "light";
      if ((await page.locator("html").getAttribute("data-theme")) !== theme)
        await page.locator(".theme-button").click();
      await page.evaluate(() => document.fonts.ready);
      const caption = await page
        .locator(".int-line-chart>.fine-print")
        .innerText();
      assert.ok(
        caption.includes(
          language === "pt"
            ? "Custos considerados por ano"
            : "Costes considerados por año",
        ),
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
      await page.screenshot({
        path: `.local/intelligence/responsive/productivity-${language}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
      results.push({ language, width, theme, caption, overflow: false });
    }
  await writeFile(
    "docs/audit/intelligence/productivity-final.json",
    JSON.stringify(results, null, 2),
  );
  console.log(`${results.length} annual-caption and responsive checks passed.`);
} finally {
  await browser.close();
}
