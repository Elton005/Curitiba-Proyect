import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const result = {
  destination: "554197862547",
  url: "https://wa.me/554197862547",
  sent: false,
};
try {
  const context = await browser.newContext(),
    page = await context.newPage();
  try {
    const response = await page.goto(result.url, {
      waitUntil: "domcontentloaded",
      timeout: 25000,
    });
    result.status = response.status();
    result.finalUrl = page.url();
    result.title = await page.title();
    result.visibleText = (await page.locator("body").innerText()).slice(
      0,
      2000,
    );
    await mkdir(".local/contact-clarity", { recursive: true });
    await page.screenshot({
      path: ".local/contact-clarity/whatsapp-destination.png",
    });
  } catch (e) {
    result.error = e.message;
  }
} finally {
  await browser.close();
}
await writeFile(
  "docs/WHATSAPP-DESTINATION-CHECK.json",
  JSON.stringify(result, null, 2),
);
console.log(result);
