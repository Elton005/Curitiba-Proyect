import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch({ channel: "msedge", headless: true }),
  results = [];
try {
  for (const [id, url] of [
    ["huella", "https://www.lahuellaescrita.com/"],
    ["yoeldis", "https://www.yoeldiscastillo.com/"],
  ]) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    try {
      const r = await p.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 25000,
      });
      await p.evaluate(() => document.fonts.ready);
      const title = await p.title();
      if (r.ok() && title.length > 3) {
        await p.screenshot({ path: `public/media/project-${id}-mobile.png` });
        results.push({
          id,
          url,
          status: r.status(),
          title,
          headings: await p.locator("h1,h2").allTextContents(),
          capturedAt: new Date().toISOString(),
        });
      } else results.push({ id, status: r.status(), title });
    } catch (e) {
      results.push({ id, error: e.message });
    }
    await p.close();
  }
} finally {
  await b.close();
}
await writeFile(
  "docs/LOOP-AVANTE-3.1-PUBLIC.json",
  JSON.stringify(results, null, 2),
);
console.log(results);
