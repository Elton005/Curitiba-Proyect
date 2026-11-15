import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const [language, prefix] of [
  ["pt", ""],
  ["es", "/es"],
]) {
  test(`Portfolio identity and case SEO stay consistent in ${language}`, async ({
    page,
  }) => {
    for (const path of ["/", "/projetos/", "/projetos/yoel-dis-castillo/"]) {
      await page.goto(`${prefix}${path}`);
      await expect(
        page.getByRole("heading", { name: "Yoeldis Castillo", exact: true }),
      ).toBeVisible();
      await expect(page.locator("body")).not.toContainText(
        /Yoel Dis Castillo|YoelDis Castillo/,
      );
      const projectLink = page
        .locator('a[href="https://www.yoeldiscastillo.com/"]')
        .first();
      await expect(projectLink).toHaveAttribute("rel", "noopener noreferrer");
      if (path !== "/") {
        await expect(page).toHaveTitle(/Yoeldis Castillo/);
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
          "content",
          /Yoeldis Castillo/,
        );
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
          "content",
          /Yoeldis Castillo/,
        );
      }
    }
  });

  test(`Loop Ação fallback, concept label, benefits and accessibility in ${language}`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/`);
    const section = page.locator("#aplicativo");
    await expect(section).toHaveCount(1);
    await expect(section.locator(".loop-action-benefits article")).toHaveCount(
      3,
    );
    await expect(section.locator("figcaption")).toContainText(
      language === "pt" ? "não é uma captura" : "no es una captura",
    );
    await expect(
      section.locator(
        'a[href$=".apk"],a[href*="play.google.com"],a[href^="D:"]',
      ),
    ).toHaveCount(0);
    const discover = section.getByRole("link", {
      name: language === "pt" ? "Conhecer o Loop Ação" : "Conocer Loop Ação",
      exact: true,
    });
    await discover.click();
    await expect(page).toHaveURL(/#loop-acao$/);
    await expect(section.locator("#loop-acao")).toBeFocused();
    for (const theme of ["dark", "light"]) {
      if ((await page.locator("html").getAttribute("data-theme")) !== theme)
        await page.locator(".theme-button").click();
      const result = await new AxeBuilder({ page })
        .include("#aplicativo")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
        .analyze();
      expect(
        result.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map(({ target }) => target),
        })),
      ).toEqual([]);
    }
  });
}

for (const width of [360, 393, 430]) {
  test(`Loop Ação at ${width}px and 200% text stays within the viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/es/");
    await page.locator("#aplicativo h2").waitFor();
    await page.locator("html").evaluate((element) => {
      element.style.fontSize = "200%";
    });
    const metrics = await page.locator("#aplicativo").evaluate((section) => {
      const bounds = section.getBoundingClientRect();
      return [...section.querySelectorAll("h2,h3,h4,p,a")]
        .filter((element) => !element.closest('[aria-hidden="true"]'))
        .map((element) => ({
          text: element.textContent,
          width: element.scrollWidth,
          box: element.clientWidth,
          right: element.getBoundingClientRect().right,
          sectionRight: bounds.right,
        }));
    });
    expect(
      metrics.filter(
        (item) =>
          item.width > item.box + 1 || item.right > item.sectionRight + 1,
      ),
    ).toEqual([]);
  });
}
