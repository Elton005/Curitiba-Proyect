import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

for (const [id, slug, last] of [
  ["huella", "la-huella-escrita", "resources"],
  ["yoeldis", "yoel-dis-castillo", "articles"],
]) {
  for (const [language, prefix] of [
    ["pt", ""],
    ["es", "/es"],
  ]) {
    test(`Premium gallery ${id}/${language}: pagination, keyboard, lazy media, source and responsive access`, async ({
      page,
    }) => {
      const loaded = [];
      page.on("request", (request) => loaded.push(request.url()));
      await page.goto(`${prefix}/projetos/${slug}/`);
      const gallery = page.locator(".project-gallery");
      await expect(gallery.locator(".gallery-viewport img")).toHaveCount(1);
      await expect(gallery.locator(".gallery-viewport img")).toHaveAttribute(
        "src",
        /hero-960/,
      );
      await expect(gallery.locator(".gallery-thumbnails button")).toHaveCount(
        3,
      );
      expect(
        loaded.filter((url) =>
          /(?:books|resources|articles)-(?:480|960|1280)\.webp/.test(url),
        ),
      ).toEqual([]);
      await gallery.locator(".gallery-thumbnails button").nth(2).click();
      await expect(gallery.locator(".gallery-viewport img")).toHaveAttribute(
        "src",
        new RegExp(last + "-960"),
      );
      await expect(
        gallery.locator(".gallery-thumbnails button").nth(2),
      ).toHaveAttribute("aria-pressed", "true");
      await gallery.locator(".gallery-arrows button").last().click();
      await expect(gallery.locator(".gallery-viewport img")).toHaveAttribute(
        "src",
        /hero-960/,
      );
      await gallery.locator(".gallery-thumbnails button").first().focus();
      await page.keyboard.press("ArrowRight");
      await expect(
        gallery.locator(".gallery-thumbnails button").nth(1),
      ).toBeFocused();
      await expect(gallery.locator(".gallery-viewport img")).toHaveAttribute(
        "src",
        /books-960/,
      );
      await expect(gallery.locator("figcaption a")).toHaveAttribute(
        "href",
        /(?:biblioteca|libros)\.html$/,
      );
      await expect(gallery.locator(".gallery-viewport img")).toHaveJSProperty(
        "complete",
        true,
      );
      await mkdir("docs/audit/portfolio-premium", { recursive: true });
      for (const width of [360, 393, 430, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        ).toBe(true);
        await gallery.screenshot({
          path: `docs/audit/portfolio-premium/gallery-${id}-${language}-${width}.png`,
          style: ".site-header,.skip-link{visibility:hidden!important}",
        });
      }
      for (const theme of ["dark", "light"]) {
        if ((await page.locator("html").getAttribute("data-theme")) !== theme)
          await page.locator(".theme-button").click();
        const result = await new AxeBuilder({ page })
          .include(".case-page")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
          .analyze();
        expect(result.violations.map(({ id }) => id)).toEqual([]);
      }
    });
  }
}

for (const prefix of ["", "/es"])
  test(`Upcoming narrative product ${prefix || "pt"} has honest status and no publication link`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/projetos/`);
    const product = page.locator(".upcoming-product");
    await expect(
      product.getByRole("heading", { name: "Cuentos Mágicos" }),
    ).toBeVisible();
    await expect(product).toContainText(prefix ? "PRÓXIMAMENTE" : "EM BREVE");
    await expect(product.locator("a,img")).toHaveCount(0);
    await expect(page.locator(".project-miniatures img")).toHaveCount(6);
  });
