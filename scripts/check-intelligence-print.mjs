import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { fullReportState } from "../tests/intelligence-fixture.js";
import { diagnosticQuestions } from "../src/data/diagnostic.js";
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await mkdir(".local/intelligence/print", { recursive: true });
  await page.goto("http://127.0.0.1:4173/inteligencia/");
  await page.locator("h1").waitFor();
  await page.evaluate(
    ({ state, answers }) => {
      sessionStorage.setItem("loop-intelligence-v1", JSON.stringify(state));
      sessionStorage.setItem("loop-diagnostic-complete", "true");
      sessionStorage.setItem(
        "loop-diagnostic-answers",
        JSON.stringify(answers),
      );
    },
    {
      state: fullReportState(),
      answers: Object.fromEntries(diagnosticQuestions.map((q) => [q.id, 0])),
    },
  );
  await page.goto("http://127.0.0.1:4173/inteligencia/relatorio/");
  await page.locator(".int-report-document").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: ".local/intelligence/print/report-screen-1440.png",
    fullPage: true,
  });
  await page.emulateMedia({ media: "print" });
  const checks = await page.evaluate(() => ({
    title: document.title,
    modules: [...document.querySelectorAll(".int-module-list li")].map(
      (n) => n.textContent,
    ),
    headerHidden:
      getComputedStyle(document.querySelector(".site-header")).display ===
      "none",
    actionsHidden:
      getComputedStyle(document.querySelector(".int-report-actions"))
        .display === "none",
    charts: document.querySelectorAll(".int-report-document figure").length,
    sourceLinks: document.querySelectorAll(".int-report-sources a").length,
  }));
  if (
    !checks.headerHidden ||
    !checks.actionsHidden ||
    checks.modules.some((m) => m.includes("Não avaliado"))
  )
    throw new Error("Print fixture incomplete or interface visible");
  await page.pdf({
    path: ".local/intelligence/print/relatorio-a4.pdf",
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  });
  await writeFile(
    "docs/audit/intelligence/print.json",
    JSON.stringify(checks, null, 2),
  );
  console.log(checks);
} finally {
  await browser.close();
}
