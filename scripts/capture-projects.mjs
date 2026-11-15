import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir(".local/captures", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  for (const [id, url] of [
    ["huella", "https://www.lahuellaescrita.com/"],
    ["yoeldis", "https://www.yoeldiscastillo.com/"],
  ]) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    });
    try {
      const response = await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `.local/captures/project-${id}.png`,
        animations: "disabled",
      });
      results.push({
        id,
        url: page.url(),
        status: response.status(),
        title: await page.title(),
        capturedAt: new Date().toISOString(),
      });
    } catch (error) {
      results.push({ id, url, error: error.message });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  "docs/audit/project-captures.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
