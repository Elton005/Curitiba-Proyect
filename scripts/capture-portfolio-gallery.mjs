import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const captures = [
  ["huella", "books", "https://www.lahuellaescrita.com/biblioteca.html"],
  ["huella", "resources", "https://www.lahuellaescrita.com/recursos.html"],
  ["yoeldis", "books", "https://www.yoeldiscastillo.com/libros.html"],
  ["yoeldis", "articles", "https://www.yoeldiscastillo.com/articulos.html"],
];
await mkdir(".local/portfolio-premium/source", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  for (const [project, id, url] of captures) {
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
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images]
          .filter((image) => image.getBoundingClientRect().top < innerHeight)
          .map((image) => image.decode().catch(() => {})),
      );
    });
    await page.screenshot({
      path: `.local/portfolio-premium/source/${project}-${id}.png`,
      animations: "disabled",
    });
    const visible = await page.evaluate(() => ({
      title: document.title,
      headings: [...document.querySelectorAll("h1,h2,h3")].map(
        (h) => h.innerText,
      ),
      images: [...document.images]
        .filter((image) => image.getBoundingClientRect().top < innerHeight)
        .map((image) => ({
          alt: image.alt,
          loaded: image.complete && image.naturalWidth > 0,
        })),
    }));
    const result = {
      project,
      id,
      sourceUrl: page.url(),
      status: response.status(),
      capturedAt: new Date().toISOString(),
      ...visible,
    };
    results.push(result);
    console.log(
      JSON.stringify({
        project,
        id,
        status: result.status,
        headings: visible.headings.slice(0, 8),
        images: visible.images,
      }),
    );
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  "docs/audit/portfolio-premium/gallery-captures.json",
  JSON.stringify(results, null, 2),
);
