import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir(".local/qa", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const report = [];
try {
  for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
    const page = await browser.newPage({
      viewport: { width, height: width < 768 ? 844 : 1000 },
      deviceScaleFactor: 1,
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("http://127.0.0.1:5173/", {
      waitUntil: "networkidle",
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
      path: `.local/qa/hero-${width}.png`,
      animations: "disabled",
    });
    await page.screenshot({
      path: `.local/qa/initial-${width}.png`,
      fullPage: true,
      animations: "disabled",
    });
    const layout = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      viewport: innerWidth,
      overflow: [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
        })
        .map((el) => ({
          tag: el.tagName,
          className: typeof el.className === "string" ? el.className : "",
          left: Math.round(el.getBoundingClientRect().left),
          right: Math.round(el.getBoundingClientRect().right),
        }))
        .slice(0, 20),
      missing: [...document.images]
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src),
    }));
    report.push({ width, status: response.status(), errors, ...layout });
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  "docs/audit/initial-responsive.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
