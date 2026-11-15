import { useState } from "react";
import { useLocale } from "../app/LocaleContext.jsx";
import { b } from "../data/translations.js";
import Icon from "./Icon.jsx";

export default function ProjectGallery({ project }) {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const items = project.gallery;
  const selected = items[index];
  const move = (step) =>
    setIndex((current) => (current + step + items.length) % items.length);
  return (
    <section
      className="project-gallery"
      id="galeria"
      aria-label={`${t(b("Galeria de", "Galería de"))} ${project.name}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          const step = event.key === "ArrowLeft" ? -1 : 1;
          const next = (index + step + items.length) % items.length;
          setIndex(next);
          event.currentTarget
            .querySelectorAll(".gallery-thumbnails button")
            [next]?.focus();
        }
      }}
    >
      <div className="gallery-heading">
        <p className="eyebrow">
          {t(
            b("TRÊS PERSPECTIVAS DO PROJETO", "TRES PERSPECTIVAS DEL PROYECTO"),
          )}
        </p>
        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <figure className="gallery-main">
        <div className="gallery-viewport">
          <img
            key={selected.id}
            src={selected.image}
            srcSet={`${selected.small} 480w, ${selected.image} 960w, ${selected.large} 1280w`}
            sizes="(max-width: 767px) calc(100vw - 40px), min(100vw - 80px, 1280px)"
            width={selected.width}
            height={selected.height}
            alt={`${project.name} — ${t(selected.title)}`}
            decoding="async"
          />
        </div>
        <figcaption aria-live="polite">
          <div>
            <h2>{t(selected.title)}</h2>
            <p>{t(selected.description)}</p>
          </div>
          <a
            className="text-link"
            href={selected.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(b("Ver página original", "Ver página original"))}
            <Icon name="external" />
          </a>
        </figcaption>
      </figure>
      <div className="gallery-navigation">
        <div className="gallery-thumbnails">
          {items.map((piece, position) => (
            <button
              type="button"
              key={piece.id}
              aria-label={`${t(b("Ver imagem", "Ver imagen"))} ${position + 1}: ${t(piece.title)}`}
              aria-pressed={position === index}
              onClick={() => setIndex(position)}
            >
              <img
                src={piece.thumbnail}
                alt=""
                width="192"
                height="120"
                loading="lazy"
                decoding="async"
              />
              <span>
                {String(position + 1).padStart(2, "0")}
                <b>{t(piece.title)}</b>
              </span>
            </button>
          ))}
        </div>
        <div className="gallery-arrows">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={t(b("Imagem anterior", "Imagen anterior"))}
          >
            <Icon className="reverse" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={t(b("Próxima imagem", "Imagen siguiente"))}
          >
            <Icon />
          </button>
        </div>
      </div>
      <p className="gallery-provenance">
        {t(
          b(
            "Capturas autênticas das páginas públicas, observadas em 15/11/2026. Conteúdo e disponibilidade podem mudar.",
            "Capturas auténticas de las páginas públicas, observadas el 15/11/2026. El contenido y la disponibilidad pueden cambiar.",
          ),
        )}
      </p>
    </section>
  );
}
