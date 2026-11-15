import { useEffect, useRef, useState } from "react";
import { useLocale } from "../app/LocaleContext.jsx";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";

const items = [
  ["solutions", "", "solutions"],
  ["intelligence", "", "i.name"],
  ["projects", "", "projects"],
  ["home", "aplicativo", "app"],
  ["diagnostic", "", "diagnostic"],
  ["home", "contato", "contact"],
];
export default function Header({ theme, setTheme }) {
  const { t, language, setLanguage, href, page } = useLocale();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef(null),
    buttonRef = useRef(null);
  function navigate(targetPage, hash) {
    setOpen(false);
    if (targetPage === page && hash)
      requestAnimationFrame(() => {
        const target =
          document.querySelector(`#${hash} h2`) ||
          document.getElementById(hash);
        target?.setAttribute("tabindex", "-1");
        target?.focus({ preventScroll: true });
      });
  }
  useEffect(() => {
    if (open) headerRef.current?.querySelector(".main-nav a")?.focus();
  }, [open]);
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointer(event) {
      if (open && !headerRef.current?.contains(event.target)) setOpen(false);
    }
    function onResize() {
      if (innerWidth > 1180) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  useEffect(() => {
    if (page !== "home" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    items
      .filter(([target]) => target === "home")
      .forEach(([, id]) => {
        const node = document.getElementById(id);
        if (node) observer.observe(node);
      });
    return () => observer.disconnect();
  }, [page]);
  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Brand href={href("home", "inicio")} />
        <nav
          className={`main-nav ${open ? "is-open" : ""}`}
          id="main-navigation"
          aria-label={t("navigation")}
        >
          {items.map(([target, hash, label]) => (
            <a
              key={label}
              href={href(target, hash)}
              aria-current={
                target === page && (target !== "home" || active === hash)
                  ? hash
                    ? "location"
                    : "page"
                  : undefined
              }
              onClick={() => navigate(target, hash)}
            >
              {t(label)}
            </a>
          ))}
          <a
            className="button mobile-nav-cta"
            href={href("quote")}
            onClick={() => navigate("quote", "")}
          >
            {t("requestQuote")}
            <Icon />
          </a>
        </nav>
        <div className="header-actions">
          <div
            className="language-switch"
            role="group"
            aria-label={t("language")}
          >
            {["pt", "es"].map((lang) => (
              <button
                type="button"
                key={lang}
                lang={lang === "pt" ? "pt-BR" : "es"}
                aria-pressed={language === lang}
                aria-label={lang === "pt" ? "Português brasileiro" : "Español"}
                onClick={() => {
                  setOpen(false);
                  setLanguage(lang);
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="icon-button theme-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t(theme === "dark" ? "themeLight" : "themeDark")}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <a href={href("quote")} className="button button-small header-cta">
            {t("requestQuote")}
            <Icon />
          </a>
          <button
            ref={buttonRef}
            className="icon-button menu-button"
            type="button"
            aria-label={t(open ? "closeMenu" : "openMenu")}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
