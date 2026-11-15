import { chromium, expect } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  for (const language of ["pt", "es"])
    for (const theme of ["dark", "light"]) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 1000 },
        reducedMotion: "reduce",
      });
      await context.addInitScript((theme) => {
        localStorage.setItem("loop-theme", theme);
      }, theme);
      const page = await context.newPage();
      const prefix = `http://127.0.0.1:4173${language === "es" ? "/es" : ""}`;
      await page.goto(prefix + "/inteligencia/investimento/");
      const guide = page.locator(".tool-orientation-mobile");
      await guide.locator("summary").focus();
      await page.keyboard.press("Enter");
      await expect(guide).toHaveAttribute("open", "");
      await expect(guide.locator("p")).toBeVisible();
      await page.keyboard.press("Enter");
      await expect(guide).not.toHaveAttribute("open", "");
      await page.goto(prefix + "/orcamento/");
      const service = page.locator('.quote-solution input[value="web"]');
      await service.focus();
      await page.keyboard.press("Space");
      await expect(service).toBeChecked();
      await page
        .locator("#project-description")
        .fill(
          language === "pt"
            ? "Preciso organizar o atendimento e apresentar meus serviços."
            : "Necesito organizar la atención y presentar mis servicios.",
        );
      await page.locator(".quote-form button[type=submit]").focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".success-message")).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(page.locator(".generated-brief pre")).toBeFocused();
      await page.keyboard.press("Tab");
      const whatsapp = page.locator(".whatsapp-button");
      await expect(whatsapp).toBeFocused();
      const focus = await whatsapp.evaluate((el) => ({
        visible: el.matches(":focus-visible"),
        width: getComputedStyle(el).outlineWidth,
        style: getComputedStyle(el).outlineStyle,
      }));
      expect(focus.visible).toBe(true);
      expect(parseFloat(focus.width)).toBeGreaterThan(0);
      expect(focus.style).not.toBe("none");
      results.push({
        language,
        theme,
        guideKeyboard: true,
        briefingKeyboard: true,
        focus,
      });
      await context.close();
    }
} finally {
  await browser.close();
}
await writeFile(
  "docs/CONTACT-CLARITY-KEYBOARD.json",
  JSON.stringify(results, null, 2),
);
console.log(
  `${results.length} keyboard flows passed; no external link opened.`,
);
