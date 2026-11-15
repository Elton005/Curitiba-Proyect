import { mkdir, writeFile } from "node:fs/promises";

await mkdir("public/fonts", { recursive: true });
const response = await fetch(
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&display=swap",
  {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    },
  },
);
if (!response.ok) throw new Error(`Font CSS: ${response.status}`);
const css = await response.text();
const latin = css.split("/* latin */")[1] || css;
const url = latin.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
if (!url) throw new Error("Latin font URL missing");
const font = await fetch(url);
if (!font.ok) throw new Error(`Font download: ${font.status}`);
await writeFile(
  "public/fonts/plus-jakarta-sans-latin.woff2",
  Buffer.from(await font.arrayBuffer()),
);
const license = await fetch(
  "https://raw.githubusercontent.com/google/fonts/main/ofl/plusjakartasans/OFL.txt",
);
if (!license.ok) throw new Error(`Font license: ${license.status}`);
await writeFile("public/fonts/OFL.txt", await license.text());
console.log("Variable Latin WOFF2 and SIL Open Font License saved locally.");
