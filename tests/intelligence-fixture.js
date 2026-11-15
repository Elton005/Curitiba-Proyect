import { analyticsDefaults } from "../src/utils/analyticsContext.js";
import { observations } from "../src/data/intelligence/market.js";
export function fullReportState() {
  const state = analyticsDefaults();
  state.market.observationIds = observations
    .filter((r) => r.region === "all" && r.size === "all" && r.sector === "all")
    .map((r) => r.id);
  state.sectorId = "commerce";
  state.commercial.mode = "advanced";
  state.commercial.saved = true;
  state.productivity.saved = true;
  state.investment.saved = true;
  state.commercial.scenarios = ["conservative", "base", "optimistic"].map(
    (id, index) => ({
      id,
      mode: "advanced",
      inputs: {
        ...state.commercial.inputs,
        growth: index * 20,
        conversionGain: index * 2,
      },
    }),
  );
  return state;
}
