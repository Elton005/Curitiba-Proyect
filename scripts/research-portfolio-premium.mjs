import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const directory = ".local/portfolio-premium/source";
await mkdir(directory, { recursive: true });
await mkdir("docs/audit/portfolio-premium", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  for (const [id, url] of [
    ["huella", "https://lahuellaescrita.com/"],
    ["yoeldis", "https://www.yoeldiscastillo.com/"],
  ]) {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
    });
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    await page
      .waitForLoadState("networkidle", { timeout: 15000 })
      .catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `${directory}/${id}-hero.png`,
      animations: "disabled",
    });
    const data = await page.evaluate(() => ({
      title: document.title,
      links: [...document.querySelectorAll("a[href]")]
        .map((a) => ({ text: a.innerText.trim(), href: a.href }))
        .filter((a) => a.text),
      headings: [...document.querySelectorAll("h1,h2,h3")].map((h) => ({
        tag: h.tagName,
        text: h.innerText,
      })),
    }));
    results.push({
      id,
      url: page.url(),
      status: response.status(),
      capturedAt: new Date().toISOString(),
      ...data,
    });
    console.log(
      JSON.stringify({
        id,
        status: response.status(),
        title: data.title,
        headings: data.headings.slice(0, 12),
        links: data.links.slice(0, 22),
      }),
    );
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  "docs/audit/portfolio-premium/public-research.json",
  JSON.stringify(results, null, 2),
);
