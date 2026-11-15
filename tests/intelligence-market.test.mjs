import test from "node:test";
import assert from "node:assert/strict";
import {
  observations,
  marketCatalog,
  indicatorDefinitions,
  dimensions,
  denominators,
  defaultMarketFilters,
  filterObservations,
  getAvailableFilters,
  sanitizeMarketFilters,
  getComparisonObservations,
  canCompareObservations,
  comparisonStatus,
  safeCsvCell,
  observationsToCsv,
} from "../src/data/intelligence/market.js";

test("Verified market catalog contains only finite percentages, unique IDs and complete provenance", () => {
  assert.equal(observations.length, 119);
  assert.equal(new Set(observations.map((row) => row.id)).size, 119);
  for (const row of observations) {
    assert.ok(Number.isFinite(row.value) && row.value >= 0 && row.value <= 100);
    assert.equal(row.unit, "%");
    assert.equal(row.year, 2025);
    assert.equal(row.publicationYear, 2026);
    assert.equal(row.verifiedAt, "2026-11-14");
    assert.ok(indicatorDefinitions[row.indicatorId]);
    assert.equal(row.indicator, indicatorDefinitions[row.indicatorId].code);
    assert.ok(denominators[row.denominator]);
    assert.ok(row.study && row.source);
    assert.ok(/^https:\/\/cetic\.br\/.+\/expandido\/$/.test(row.url));
    assert.ok(
      row.variable.pt &&
        row.variable.es &&
        row.definition.pt &&
        row.definition.es &&
        row.notes.pt &&
        row.notes.es &&
        row.denominatorLabel.pt &&
        row.denominatorLabel.es,
    );
    for (const field of ["region", "size", "sector"])
      assert.ok(dimensions[field].some((option) => option.id === row[field]));
    assert.equal(row.marginOfError, null);
    assert.equal(row.sampleSize, null);
  }
  assert.equal(marketCatalog.sampleSize, 4174);
});

test("All national totals match their specific official columns, including the two different 79% indicators", () => {
  const totals = Object.fromEntries(
    observations
      .filter((row) => row.stratum === "total")
      .map((row) => [row.indicatorId, row.value]),
  );
  assert.deepEqual(totals, {
    website: 56,
    social: 90,
    messagingPresence: 79,
    crm: 31,
    salesWebsite: 32,
    salesMessaging: 79,
    salesSocial: 40,
  });
  const presence = filterObservations({
    indicatorId: "messagingPresence",
    region: "all",
    size: "all",
    sector: "all",
  })[0];
  const sales = filterObservations({
    indicatorId: "salesMessaging",
    region: "all",
    size: "all",
    sector: "all",
  })[0];
  assert.equal(presence.denominator, "internet");
  assert.equal(sales.denominator, "onlineSellers");
  assert.ok(presence.definition.pt.includes("Telegram"));
  assert.ok(sales.definition.pt.includes("Skype"));
  assert.ok(!sales.definition.pt.includes("Telegram"));
});

test("Regional, size and sector observations remain official marginals, not fabricated cross tabs", () => {
  assert.equal(filterObservations(defaultMarketFilters).length, 1);
  assert.equal(
    filterObservations({ ...defaultMarketFilters, region: "north" })[0].value,
    36,
  );
  assert.equal(
    filterObservations({ ...defaultMarketFilters, size: "10-49" })[0].value,
    53,
  );
  assert.equal(
    filterObservations({ ...defaultMarketFilters, sector: "trade" })[0].value,
    44,
  );
  assert.equal(
    filterObservations({
      ...defaultMarketFilters,
      region: "north",
      sector: "trade",
    }).length,
    0,
  );
  assert.equal(
    filterObservations({ ...defaultMarketFilters, year: 2024 }).length,
    0,
  );
  assert.equal(
    filterObservations({ ...defaultMarketFilters, region: "unknown" }).length,
    0,
  );
  assert.equal(filterObservations({ indicator: "B6" }).length, 17);
  assert.equal(
    filterObservations({ indicatorId: "website", region: "any" }).length,
    17,
  );
  assert.ok(
    observations.every(
      (row) =>
        ["region", "size", "sector"].filter((field) => row[field] !== "all")
          .length <= 1,
    ),
  );
});

test("Filter options expose only values supported by compatible observations", () => {
  const available = getAvailableFilters(defaultMarketFilters);
  assert.deepEqual(
    available.year.map((option) => option.id),
    [2025],
  );
  assert.equal(available.region.length, 6);
  assert.equal(available.size.length, 4);
  assert.equal(available.sector.length, 9);
  const north = getAvailableFilters({
    ...defaultMarketFilters,
    region: "north",
  });
  assert.deepEqual(
    north.size.map((option) => option.id),
    ["all"],
  );
  assert.deepEqual(
    north.sector.map((option) => option.id),
    ["all"],
  );
  assert.deepEqual(
    sanitizeMarketFilters({
      indicatorId: "madeUp",
      year: 1900,
      region: "invalid",
      contact: "private",
    }),
    { ...defaultMarketFilters },
  );
});

test("Comparison groups keep the same population definition and do not average or sum percentages", () => {
  const regions = getComparisonObservations("website", "region");
  assert.equal(regions.length, 5);
  assert.deepEqual(
    regions.map((row) => row.value),
    [36, 43, 62, 59, 46],
  );
  assert.ok(canCompareObservations(regions));
  const sizes = getComparisonObservations("crm", "size");
  assert.deepEqual(
    sizes.map((row) => row.value),
    [29, 41, 56],
  );
  assert.ok(canCompareObservations(sizes));
  const total = (id) =>
    filterObservations({
      indicatorId: id,
      region: "all",
      size: "all",
      sector: "all",
    })[0];
  assert.ok(canCompareObservations([total("website"), total("social")]));
  assert.ok(!canCompareObservations([total("website"), total("crm")]));
  assert.ok(
    !canCompareObservations([
      total("messagingPresence"),
      total("salesMessaging"),
    ]),
  );
  assert.ok(
    canCompareObservations([total("salesWebsite"), total("salesMessaging")]),
  );
  assert.ok(
    !canCompareObservations([
      regions[0],
      getComparisonObservations("website", "sector")[0],
    ]),
  );
  assert.ok(
    !canCompareObservations([
      regions[0],
      getComparisonObservations("social", "region")[1],
    ]),
  );
  assert.equal(getComparisonObservations("website", "year").length, 0);
  assert.equal(getComparisonObservations("unknown", "region").length, 0);
  assert.equal(comparisonStatus([]).valid, false);
  assert.ok(comparisonStatus([]).reason.pt.includes("não disponíveis"));
});

test("CSV exports only canonical selected observations with localized source and denominator", () => {
  const row = filterObservations(defaultMarketFilters)[0];
  const csv = observationsToCsv(
    [row, { id: "invented" }, { ...row, value: 999 }, row],
    "es",
  );
  assert.equal(csv.split("\r\n").length, 2);
  assert.ok(csv.includes('"Base estadística"'));
  assert.ok(csv.includes('"56"'));
  assert.ok(!csv.includes("999"));
  assert.ok(csv.includes(row.url));
  assert.ok(csv.includes("Empresas con acceso a Internet"));
  assert.ok(csv.includes("No disponible"));
  assert.equal(observationsToCsv([]).split("\r\n").length, 1);
});

test("CSV cell encoding neutralizes spreadsheet formula starts and escapes quotes and newlines", () => {
  for (const input of [
    "=1+2",
    "+SUM(A1:A2)",
    "-1+2",
    "@SUM(A1:A2)",
    "   =cmd",
    '\t=HYPERLINK("x")',
    "\rplain",
  ])
    assert.ok(safeCsvCell(input).startsWith("\"'"));
  assert.equal(safeCsvCell('A "quote"'), '"A ""quote"""');
  assert.equal(safeCsvCell(56), '"56"');
  assert.equal(safeCsvCell(null), '""');
});
