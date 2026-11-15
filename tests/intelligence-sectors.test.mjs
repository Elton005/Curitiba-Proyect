import test from "node:test";
import assert from "node:assert/strict";
import {
  sectorProfiles,
  getSectorProfile,
  sectorRecommendations,
  sectorRecommendationMethod,
} from "../src/data/intelligence/sectors.js";
import { solutions } from "../src/data/content.js";

test("Seven stable commercial sector profiles have complete localized editorial content", () => {
  assert.deepEqual(
    sectorProfiles.map((profile) => profile.id),
    [
      "commerce",
      "food",
      "beauty",
      "home",
      "construction",
      "professional",
      "other",
    ],
  );
  for (const profile of sectorProfiles) {
    for (const key of ["title", "description"])
      for (const language of ["pt", "es"])
        assert.ok(
          profile[key][language]?.trim(),
          `${profile.id}.${key}.${language}`,
        );
    for (const key of ["processes", "exampleProblems", "applications"]) {
      assert.equal(profile[key].length, 3);
      for (const item of profile[key])
        for (const language of ["pt", "es"]) assert.ok(item[language]?.trim());
    }
    assert.ok(
      profile.exampleProblems.every(
        (item) =>
          item.pt.startsWith("Exemplo:") && item.es.startsWith("Ejemplo:"),
      ),
    );
    assert.ok(profile.tools.includes("diagnostic"));
    assert.ok(profile.tools.includes("productivity"));
    assert.ok(profile.tools.includes("investment"));
    assert.ok(profile.tools.includes("simulator"));
  }
  assert.ok(sectorRecommendationMethod.pt);
  assert.ok(sectorRecommendationMethod.es);
});

test("Recommendations are deterministic, ordered and refer to existing solutions and tool routes", () => {
  const validSolutions = new Set(solutions.map((solution) => solution.id));
  const validTools = new Set([
    "market",
    "diagnostic",
    "simulator",
    "productivity",
    "investment",
    "report",
  ]);
  const ids = [];
  for (const profile of sectorProfiles) {
    const recommendations = sectorRecommendations(profile.id);
    assert.deepEqual(
      recommendations.map((item) => item.priority),
      [1, 2, 3],
    );
    assert.deepEqual(recommendations, sectorRecommendations(profile.id));
    for (const item of recommendations) {
      assert.ok(validSolutions.has(item.solution));
      assert.ok(validTools.has(item.tool));
      for (const language of ["pt", "es"]) {
        assert.ok(item.title[language]);
        assert.ok(item.reason[language]);
      }
      ids.push(item.id);
    }
    recommendations[0].priority = 99;
    assert.equal(profile.priorities[0].priority, 1);
  }
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(getSectorProfile("not-a-sector"), null);
  assert.deepEqual(sectorRecommendations("not-a-sector"), []);
});

test("Commercial categories never claim exact equivalence with broader official sectors", () => {
  for (const profile of sectorProfiles) {
    assert.equal(profile.statisticalSectorId, null);
    assert.ok(
      ["reference-only", "unavailable"].includes(
        profile.statisticalMapping.status,
      ),
    );
    assert.ok(profile.statisticalMapping.note.pt);
    assert.ok(profile.statisticalMapping.note.es);
    if (profile.referenceSectorId) {
      assert.equal(profile.statisticalMapping.status, "reference-only");
      assert.equal(
        profile.statisticalMapping.referenceSectorId,
        profile.referenceSectorId,
      );
      assert.ok(profile.statisticalMapping.officialLabel.pt);
      assert.ok(profile.statisticalMapping.officialLabel.es);
    } else {
      assert.equal(profile.statisticalMapping.status, "unavailable");
      assert.equal(profile.statisticalMapping.officialLabel, null);
    }
  }
  assert.equal(getSectorProfile("commerce").referenceSectorId, "trade");
  assert.equal(getSectorProfile("food").referenceSectorId, "hospitalityFood");
  assert.equal(
    getSectorProfile("construction").referenceSectorId,
    "construction",
  );
  assert.equal(
    getSectorProfile("professional").referenceSectorId,
    "professionalAdministrative",
  );
  for (const id of ["beauty", "home", "other"])
    assert.equal(getSectorProfile(id).referenceSectorId, null);
});

test("Sector profiles contain examples and mappings rather than invented statistical measurements", () => {
  function inspect(value) {
    if (!value || typeof value !== "object") return;
    assert.equal(Object.hasOwn(value, "score"), false);
    assert.equal(Object.hasOwn(value, "percentage"), false);
    assert.equal(Object.hasOwn(value, "value"), false);
    assert.equal(Object.hasOwn(value, "observations"), false);
    Object.values(value).forEach((item) => {
      if (typeof item === "string") assert.equal(/\d\s*%/.test(item), false);
      else inspect(item);
    });
  }
  inspect(sectorProfiles);
  assert.match(
    getSectorProfile("beauty").statisticalMapping.note.pt,
    /Não atribuím/,
  );
  assert.match(
    getSectorProfile("other").statisticalMapping.note.pt,
    /Não equivale/,
  );
});
