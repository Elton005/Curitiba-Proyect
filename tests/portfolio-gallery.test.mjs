import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { projects, upcomingProduct } from "../src/data/content.js";

test("Every live portfolio project has three distinct authentic pieces and local responsive assets", async () => {
  for (const project of projects) {
    assert.equal(project.gallery.length, 3);
    assert.equal(new Set(project.gallery.map((piece) => piece.id)).size, 3);
    for (const piece of project.gallery) {
      assert.equal(
        new URL(piece.sourceUrl).hostname,
        new URL(project.url).hostname,
      );
      assert.ok(
        piece.title.pt &&
          piece.title.es &&
          piece.description.pt &&
          piece.description.es,
      );
      for (const path of [
        piece.image,
        piece.small,
        piece.large,
        piece.thumbnail,
      ]) {
        const bytes = await readFile(`public${path}`);
        assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
        assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
        assert.ok(bytes.length < 170000, path);
      }
    }
  }
});

test("Android shares gallery provenance and stays under a 250 KB image budget", async (context) => {
  if (!existsSync("mobile")) {
    context.skip("Android is excluded from the web-only repository");
    return;
  }
  const web = JSON.parse(
    await readFile("src/data/projectGallery.json", "utf8"),
  );
  const mobile = JSON.parse(
    await readFile("mobile/src/data/projectGallery.json", "utf8"),
  );
  assert.deepEqual(mobile, web);
  let total = 0;
  for (const project of projects)
    for (const piece of project.gallery)
      for (const width of [192, 720]) {
        total += (
          await stat(
            `mobile/assets/projects/gallery/${project.id}-${piece.id}-${width}.webp`,
          )
        ).size;
      }
  assert.ok(total > 0 && total < 250000, `Native image bytes: ${total}`);
});

test("Cuentos Mágicos is explicitly upcoming with no invented store URL or screenshot", () => {
  assert.equal(upcomingProduct.name, "Cuentos Mágicos");
  assert.equal(upcomingProduct.status, "upcoming");
  assert.equal(upcomingProduct.url, undefined);
  assert.equal(upcomingProduct.gallery, undefined);
  assert.ok(!projects.some((project) => project.id === upcomingProduct.id));
});
