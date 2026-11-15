import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { projects } from "../src/data/content.js";
import { pages, pageHref, resolvePage } from "../src/data/pages.js";
import { validatePublicConfig } from "../src/utils/contact.js";

test("Yoeldis Castillo has one identity on web and Android, with existing IDs and domain", async () => {
  const catalogs = [projects];
  if (existsSync("mobile")) {
    const mobile = JSON.parse(
      await readFile("mobile/src/data/reference.json", "utf8"),
    );
    catalogs.push(mobile.projects);
  }
  for (const catalog of catalogs) {
    const project = catalog.find((item) => item.id === "yoeldis");
    assert.equal(project.name, "Yoeldis Castillo");
    assert.equal(
      new URL(project.url).hostname.replace(/^www\./, ""),
      "yoeldiscastillo.com",
    );
    assert.equal(project.url, "https://www.yoeldiscastillo.com/");
  }
});

test("Corrected PT/ES metadata preserves all published case-study paths", () => {
  for (const language of ["pt", "es"]) {
    for (const key of ["projects", "yoeldisCase"]) {
      assert.match(pages[key].title[language], /Yoeldis Castillo/);
      assert.match(pages[key].description[language], /Yoeldis Castillo/);
      assert.doesNotMatch(pages[key].title[language], /Yoel Dis|YoelDis/);
    }
    const path = `${language === "es" ? "/es" : ""}/projetos/yoel-dis-castillo/`;
    assert.equal(pageHref("yoeldisCase", language), path);
    assert.equal(resolvePage(path).page, "yoeldisCase");
  }
});

test("Download stays unavailable until an exact Release URL is explicitly verified", () => {
  const url = "https://downloads.example.org/loop-avante-release.apk?fixture=1";
  assert.equal(validatePublicConfig({ appDownload: url }).appDownload, "");
  assert.equal(
    validatePublicConfig({
      appDownload: url,
      appDownloadReleaseVerified: false,
    }).appDownload,
    "",
  );
  assert.equal(
    validatePublicConfig({ appDownload: url, appDownloadReleaseVerified: true })
      .appDownload,
    url,
  );
});

test("Download rejects local paths, private hosts, Debug builds, AABs and credentials", () => {
  for (const url of [
    "D:/Work/Curitiba-Proyect/mobile/dist/apk/app-release.apk",
    "file:///D:/app-release.apk",
    "http://downloads.example.org/app-release.apk",
    "https://localhost/app-release.apk",
    "https://192.168.15.5/app-release.apk",
    "https://downloads.invalid/app-release.apk",
    "https://downloads.example.org/app-debug.apk",
    "https://downloads.example.org/development/app.apk",
    "https://downloads.example.org/app.aab",
    "https://user:password@downloads.example.org/app-release.apk",
  ]) {
    assert.equal(
      validatePublicConfig({
        appDownload: url,
        appDownloadReleaseVerified: true,
      }).appDownload,
      "",
      url,
    );
  }
});
