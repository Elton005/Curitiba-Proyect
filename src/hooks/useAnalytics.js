import { useCallback } from "react";
import { useSessionState } from "./useSessionState.js";
import {
  ANALYTICS_KEY,
  ANALYTICS_LIMIT,
  legacyAnalytics,
  sanitizeAnalytics,
  updateAnalytics,
} from "../utils/analyticsContext.js";
export function useAnalytics() {
  const [state, setState] = useSessionState(
    ANALYTICS_KEY,
    legacyAnalytics(),
    sanitizeAnalytics,
    ANALYTICS_LIMIT,
  );
  const update = useCallback(
    (next) => setState((current) => updateAnalytics(current, next)),
    [setState],
  );
  return [state, update];
}
