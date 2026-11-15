import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";

await mkdir("public/promo", { recursive: true });
await mkdir("public/media", { recursive: true });
const font = (
  await readFile("public/fonts/plus-jakarta-sans-latin.woff2")
).toString("base64");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const license = await readFile("public/fonts/OFL.txt", "utf8");
const fontStyle = `<metadata>${escape(license)}</metadata><style>@font-face{font-family:Jakarta;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:400 800}text{font-family:Jakarta,Arial,sans-serif}</style>`;
const loop = (x, y, scale, color) =>
  `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M30 17C23 7 20 4 14 4a13 13 0 1 0 0 26c6 0 9-3 16-13S40 4 46 4a13 13 0 1 1 0 26c-6 0-9-3-16-13Z" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/></g>`;
const textLines = (
  lines,
  x,
  y,
  size,
  color,
  weight = 600,
  lineHeight = size * 1.17,
) =>
  lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * lineHeight}" font-size="${size}" font-weight="${weight}" fill="${color}" letter-spacing="${size > 45 ? -size * 0.045 : 0}">${escape(line)}</text>`,
    )
    .join("");
const logo = (x, y, color = "#11172d", accent = "#087d5d") =>
  `${loop(x, y - 25, 1.15, accent)}<text x="${x + 84}" y="${y + 3}" font-size="34" font-weight="500" fill="${color}" letter-spacing="-1.8">Loop <tspan font-weight="800">Avante.</tspan></text>`;
function art(x, y, width, height, dark = false) {
  const surface = dark ? "#1e2d3b" : "#ffffff";
  const ink = dark ? "#fffaf1" : "#11172d";
  return `<g transform="translate(${x} ${y})"><rect width="${width}" height="${height}" rx="24" fill="${dark ? "#173b2d" : "#e2eee3"}"/><ellipse cx="${width * 0.55}" cy="${height * 0.53}" rx="${width * 0.42}" ry="${height * 0.35}" fill="none" stroke="${dark ? "#427c61" : "#acbfae"}"/><g transform="translate(${width * 0.11} ${height * 0.16}) rotate(-5 ${width * 0.38} ${height * 0.3})"><rect width="${width * 0.76}" height="${height * 0.67}" rx="16" fill="${surface}" stroke="${dark ? "#435a51" : "#b7c7b9"}"/><path d="M0 42h${width * 0.76}" stroke="${dark ? "#435a51" : "#d9e3d9"}"/><circle cx="18" cy="21" r="4" fill="#83b89b"/><circle cx="34" cy="21" r="4" fill="#b1c8b4"/><circle cx="50" cy="21" r="4" fill="#b1c8b4"/>${textLines(["Seu negócio, conectado."], 28, 92, 25, ink, 600)}${[0, 1, 2].map((i) => `<rect x="${28 + i * width * 0.21}" y="120" width="${width * 0.18}" height="${height * 0.16}" rx="8" fill="${dark ? "#284737" : "#eef5ed"}" stroke="${dark ? "#46735b" : "#d2e3d2"}"/>`).join("")}<path d="M30 ${height * 0.57} C${width * 0.2} ${height * 0.57},${width * 0.2} ${height * 0.48},${width * 0.33} ${height * 0.5}S${width * 0.5} ${height * 0.4},${width * 0.69} ${height * 0.34}" stroke="#69b58b" stroke-width="6" fill="none"/>${loop(width * 0.6, height * 0.49, 1.05, dark ? "#a6e1b8" : "#087d5d")}</g></g>`;
}
const promos = [
  {
    id: "01-apresentacao",
    eyebrow: "TECNOLOGIA PARA AVANÇAR",
    title: ["O próximo passo", "do seu negócio", "começa aqui."],
    body: ["Sites, sistemas e aplicativos", "com estratégia e identidade."],
    cta: "Conheça a Loop Avante",
    dark: false,
  },
  {
    id: "02-solucoes",
    eyebrow: "SOLUÇÕES QUE SE CONECTAM",
    title: ["Menos processos", "soltos. Mais", "conexões."],
    body: ["Websites · Sistemas web · Apps", "Automações e integrações."],
    cta: "Explore nossas soluções",
    dark: true,
  },
  {
    id: "03-diagnostico",
    eyebrow: "LOOP DIAGNÓSTICO DIGITAL",
    title: ["Antes de construir,", "entenda o que", "vem primeiro."],
    body: ["8 perguntas. Um retrato inicial.", "Sem cadastro e no seu ritmo."],
    cta: "Faça seu diagnóstico",
    dark: false,
  },
];
const outputs = [];
for (const promo of promos) {
  for (const [format, height] of [
    ["feed", 1350],
    ["stories", 1920],
  ]) {
    const dark = promo.dark,
      bg = dark ? "#11172d" : "#fffaf1",
      ink = dark ? "#fffaf1" : "#11172d",
      accent = dark ? "#a6e1b8" : "#087d5d";
    const story = format === "stories";
    const titleY = story ? 370 : 258;
    const artY = story ? 930 : 645;
    const artHeight = story ? 530 : 380;
    const ctaY = story ? 1580 : 1145;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="${height}" viewBox="0 0 1080 ${height}">${fontStyle}<rect width="1080" height="${height}" fill="${bg}"/>${logo(76, story ? 174 : 110, ink, accent)}<path d="M76 ${story ? 245 : 163}h928" stroke="${dark ? "#344056" : "#d8dfd4"}"/>${textLines([promo.eyebrow], 80, titleY - 65, 18, accent, 700)}${textLines(promo.title, 76, titleY, 82, ink, 600, 98)}${textLines(promo.body, 80, titleY + 272, 27, dark ? "#becbda" : "#596575", 400, 44)}${art(76, artY, 928, artHeight, dark)}<rect x="76" y="${ctaY}" width="710" height="83" rx="8" fill="${accent}"/>${textLines([promo.cta], 110, ctaY + 52, 27, dark ? "#10291e" : "#ffffff", 700)}<path d="M718 ${ctaY + 41}h27m-10-10 10 10-10 10" fill="none" stroke="${dark ? "#10291e" : "#ffffff"}" stroke-width="3"/><text x="80" y="${height - (story ? 122 : 62)}" font-size="17" font-weight="500" fill="${dark ? "#becbda" : "#596575"}">Estratégia. Design. Tecnologia. No mesmo loop.</text><text x="1004" y="${height - (story ? 122 : 62)}" font-size="16" text-anchor="end" fill="${accent}">${promo.id.slice(0, 2)} / LA</text></svg>`;
    const stem = `public/promo/${promo.id}-${format}`;
    await writeFile(`${stem}.svg`, svg);
    outputs.push({ stem, width: 1080, height, svg });
  }
}
for (const lang of ["pt", "es"]) {
  const title =
    lang === "pt"
      ? ["Tecnologia para o", "próximo passo", "do seu negócio."]
      : ["Tecnología para el", "próximo paso", "de tu negocio."];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${fontStyle}<rect width="1200" height="630" fill="#fffaf1"/>${logo(60, 76)}${textLines(title, 60, 228, 65, "#11172d", 600, 82)}${textLines([lang === "pt" ? "Sites, sistemas, aplicativos e automações." : "Sitios, sistemas, aplicaciones y automatizaciones."], 64, 493, 23, "#596575", 400)}<path d="M60 550h1080" stroke="#d8dfd4"/>${textLines([lang === "pt" ? "TECNOLOGIA PARA NEGÓCIOS QUE QUEREM AVANÇAR." : "TECNOLOGÍA PARA NEGOCIOS QUE QUIEREN AVANZAR."], 64, 590, 14, "#087d5d", 700)}<circle cx="970" cy="285" r="180" fill="#e2eee3"/><circle cx="970" cy="285" r="215" fill="none" stroke="#b6c9b9"/>${loop(815, 202, 5, "#087d5d")}<text x="1140" y="590" text-anchor="end" font-size="14" font-weight="600" fill="#596575">${lang === "pt" ? "WEB / MOBILE / SISTEMAS" : "WEB / MÓVIL / SISTEMAS"}</text></svg>`;
  const stem = `public/media/og-loop-${lang}`;
  await writeFile(`${stem}.svg`, svg);
  outputs.push({ stem, width: 1200, height: 630, svg });
}
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  for (const output of outputs) {
    const page = await browser.newPage({
      viewport: { width: output.width, height: output.height },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<html><body style="margin:0">${output.svg}</body></html>`,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `${output.stem}.png`,
      animations: "disabled",
    });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 180, height: 180 } });
  const favicon = await readFile("public/favicon.svg", "utf8");
  await page.setContent(
    `<body style="margin:0">${favicon.replace("viewBox=", 'width="180" height="180" viewBox=')}</body>`,
  );
  await page.screenshot({ path: "public/media/apple-touch-icon.png" });
  await page.close();
} finally {
  await browser.close();
}
console.log(
  "6 promotional SVG/PNG pairs, 2 localized OG pairs and Apple icon generated.",
);
