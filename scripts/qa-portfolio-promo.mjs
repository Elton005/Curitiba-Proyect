import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const phase = process.argv[2] === "before" ? "before" : "after";
const directory = "docs/audit/portfolio-promo";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  for (const width of phase === "before"
    ? [390, 1440]
    : [360, 393, 430, 768, 1440]) {
    for (const language of phase === "before" ? ["pt"] : ["pt", "es"]) {
      for (const theme of phase === "before" ? ["dark"] : ["dark", "light"]) {
        const page = await browser.newPage({
          viewport: { width, height: 1000 },
          reducedMotion: "reduce",
        });
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(
          `http://127.0.0.1:5173/${language === "es" ? "es/" : ""}`,
        );
        await page.locator("#aplicativo h2").waitFor();
        await page.evaluate(() => document.fonts.ready);
        if ((await page.locator("html").getAttribute("data-theme")) !== theme)
          await page.locator(".theme-button").click();
        const section = page.locator("#aplicativo");
        await section.screenshot({
          path: `${directory}/${phase}-${language}-${theme}-${width}.png`,
          // Capture the product section without sticky site chrome being
          // composited across a tall element screenshot. App markup is intact.
          style: ".site-header, .skip-link { visibility: hidden !important; }",
        });
        const metrics = await page.evaluate(() => ({
          viewport: innerWidth,
          document: document.documentElement.scrollWidth,
          section: document
            .querySelector("#aplicativo")
            .getBoundingClientRect()
            .toJSON(),
          downloadLinks: [
            ...document.querySelectorAll('#aplicativo a[href$=".apk"]'),
          ].map((a) => a.href),
        }));
        results.push({ width, language, theme, errors, ...metrics });
        if (errors.length || metrics.document > width + 1)
          throw new Error(`Preview failure: ${JSON.stringify(results.at(-1))}`);
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
  await writeFile(
    `${directory}/${phase}.json`,
    JSON.stringify(results, null, 2),
  );
}
console.log(
  `${phase}: ${results.length} responsive captures, no JS errors or horizontal overflow`,
);
