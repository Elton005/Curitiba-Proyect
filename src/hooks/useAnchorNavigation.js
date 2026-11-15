import { useEffect } from "react";

// React mounts after the browser first resolves a cross-document fragment.
export function useAnchorNavigation(page, language) {
  useEffect(() => {
    let cancelled = false;
    function followHash() {
      if (!location.hash) return;
      let id;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      Promise.resolve(document.fonts?.ready).then(() =>
        requestAnimationFrame(() => {
          if (cancelled) return;
          const target = document.getElementById(id);
          if (!target) return;
          target.scrollIntoView({ block: "start", behavior: "instant" });
          const heading = target.querySelector("h1,h2") || target;
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }),
      );
    }
    followHash();
    window.addEventListener("hashchange", followHash);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", followHash);
    };
  }, [page, language]);
}
