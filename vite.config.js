import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { seoPlugin } from "./scripts/seo-plugin.js";
import { pages, pageHref } from "./src/data/pages.js";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => ({
  base: "/",
  esbuild: { jsx: "automatic" },
  plugins: [seoPlugin(loadEnv(mode, root, "VITE_"))],
  server: {
    // This checkout also holds an Android SDK and Gradle caches. They are not
    // web inputs; watching them causes unnecessary crawling and reloads.
    watch: {
      ignored: [
        "**/mobile/**",
        "**/.local/**",
        "**/docs/audit/**",
        "**/test-results/**",
      ],
    },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries([
        ...["pt", "es"].flatMap((language) =>
          Object.keys(pages).map((key) => [
            `${key}-${language}`,
            fileURLToPath(
              new URL(`.${pageHref(key, language)}index.html`, import.meta.url),
            ),
          ]),
        ),
        ["notFound", fileURLToPath(new URL("./404.html", import.meta.url))],
        [
          "notFound-es",
          fileURLToPath(new URL("./es/404.html", import.meta.url)),
        ],
      ]),
    },
  },
  root,
}));
