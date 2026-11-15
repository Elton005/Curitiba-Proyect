import { useCallback, useEffect, useRef, useState } from "react";

// Anonymous workflow choices only. Never use for free text, names or contact details.
export function useSessionState(
  key,
  initial,
  sanitize = (value) => value,
  maxLength = 65536,
) {
  const [value, setValue] = useState(() => {
    try {
      const raw = sessionStorage.getItem(key);
      return raw === null || raw.length > maxLength
        ? initial
        : sanitize(JSON.parse(raw));
    } catch {
      return initial;
    }
  });
  const current = useRef(value);
  const sanitizer = useRef(sanitize);
  sanitizer.current = sanitize;
  useEffect(() => {
    function sync() {
      try {
        const raw = sessionStorage.getItem(key);
        if (raw === null || raw.length > maxLength) return;
        const next = sanitizer.current(JSON.parse(raw));
        if (JSON.stringify(next) === JSON.stringify(current.current)) return;
        current.current = next;
        setValue(next);
      } catch {}
    }
    window.addEventListener("pageshow", sync);
    return () => window.removeEventListener("pageshow", sync);
  }, [key]);
  const update = useCallback(
    (next) => {
      let latest = current.current;
      try {
        const raw = sessionStorage.getItem(key);
        if (raw !== null && raw.length <= maxLength)
          latest = sanitizer.current(JSON.parse(raw));
      } catch {}
      const result = typeof next === "function" ? next(latest) : next;
      current.current = result;
      try {
        sessionStorage.setItem(key, JSON.stringify(result));
      } catch {
        /* UI remains usable if storage is unavailable. */
      }
      setValue(result);
    },
    [key],
  );
  return [value, update];
}
