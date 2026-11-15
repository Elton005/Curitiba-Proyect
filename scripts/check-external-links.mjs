import { projects } from "../src/data/content.js";
import { marketData, marketStudy, crmData } from "../src/data/market.js";
import { writeFile } from "node:fs/promises";

const urls = [
  ...new Set([
    ...projects.map((p) => p.url),
    ...marketData.map((d) => d.url),
    crmData.url,
    marketStudy.methodology,
  ]),
];
const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(25000),
      });
      await response.body?.cancel();
      return {
        url,
        status: response.status,
        finalUrl: response.url,
        ok: response.ok,
      };
    } catch (error) {
      return { url, ok: false, error: error.message };
    }
  }),
);
await writeFile(
  "docs/audit/external-links.json",
  JSON.stringify({ verifiedAt: "2026-11-14", results }, null, 2),
);
console.log(JSON.stringify(results, null, 2));
if (results.some((r) => !r.ok)) process.exitCode = 1;
