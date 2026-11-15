# Investigación y trazabilidad editorial

Verificación pública: **14/11/2026**. Se retiraron las cifras heredadas 82%, 57%, 73% y 10% de la web; no se reutilizaron como afirmaciones publicables.

## Datos publicados

Fuente: **NIC.br / Cetic.br, TIC Empresas 2025**, publicada en 2026. Universo general: empresas formales brasileñas de los sectores estudiados con **10 o más personas ocupadas**. No representa a todos los MEI ni a todos los micronegocios. Muestra: 4.174 empresas; entrevistas telefónicas entre febrero de 2025 y enero de 2026.

| Valor | Indicador | Universo del porcentaje | Definición |
| --- | --- | --- | --- |
| 56% | [B6 — Website](https://cetic.br/pt/tics/pesquisa/2025/empresas/B6/expandido/) | Total de empresas con acceso a Internet | Tenían website. No inferir que el 44% restante no tenía: hay respuestas no sabe/no respondió y redondeos. |
| 90% | [B13A — Redes sociales](https://cetic.br/pt/tics/pesquisa/2025/empresas/B13A/expandido/) | Total de empresas con acceso a Internet | Tenían perfil o cuenta propios en alguna red social en línea. |
| 79% | [B13B — WhatsApp o Telegram](https://cetic.br/pt/tics/pesquisa/2025/empresas/B13B/expandido/) | Total de empresas con acceso a Internet | Perfil o cuenta en WhatsApp **o Telegram**; no mide solo WhatsApp ni ventas por mensajería. |
| 31% | [G3 — CRM](https://cetic.br/pt/tics/pesquisa/2025/empresas/G3/expandido/) | **Total de empresas** de la encuesta | Usaron una aplicación CRM para gestionar información de clientes durante los últimos 12 meses. |

El gráfico compara únicamente los tres indicadores con la misma base de empresas conectadas. CRM se presenta aparte y explica la diferencia de universo.

[Presentación y metodología oficiales (PDF)](https://cetic.br/media/analises/TIC-Empresas-2025-lancamento.pdf).

Estos indicadores miden adopción; no prueban mejoras de ventas, rentabilidad ni causalidad. Los datos y textos completos se centralizan en `src/data/market.js`.

## Simulador

Las hipótesis iniciales **100 consultas/mes, 10% de conversión, R$250 por venta, +25% de consultas y +2 puntos porcentuales** son ejemplos editables. No proceden de la investigación ni se presentan como resultados de Loop Avante.

Resultado inicial comprobable: 10 ventas y R$2.500 en el escenario actual; 125 consultas, conversión del 12%, 15 ventas y R$3.750 en el escenario hipotético. Diferencia: R$1.250. No incluye costes, impuestos ni beneficio. La advertencia ilustrativa permanece visible.

## Portafolio

La participación de Loop Avante en diseño y desarrollo se fundamenta en la declaración del propietario incluida en la misión. Los dominios públicos permiten verificar contenido y apariencia, no esa atribución por sí sola.

### La Huella Escrita

- [Web pública](https://www.lahuellaescrita.com/), HTTP 200.
- Sitio literario de Junior Osmany Coronel Durán. Se observaron presentación del autor, biblioteca, blog y recursos.
- Objetivo descrito: reunir presencia del autor y acceso al contenido editorial.
- Captura real de la página inicial a 1440 × 1000 px. Fuente registrada en `docs/audit/project-captures.json`; versión optimizada `public/media/project-huella.webp`.

### Yoeldis Castillo

- [Web pública](https://www.yoeldiscastillo.com/), HTTP 200.
- La página identifica a Yoeldis Castillo Quiala; se observaron presentación profesional, libros, artículos y contacto.
- Objetivo descrito: presentar su trayectoria y facilitar el acceso a libros y artículos.
- Captura real de la página inicial a 1440 × 1000 px, optimizada en `public/media/project-yoeldis.webp`.

No se atribuyen resultados económicos, tráfico, tecnologías, testimonios, ventas, autenticación o persistencia no comprobados. No se iniciaron sesiones ni se probaron compras o formularios de terceros.

## App móvil

Consulta selectiva de `mobile/README.md`, `mobile/app.json`, `mobile/App.js`, `mobile/src/content.js` y `mobile/src/sections/HeroSection.js`. Se verificaron en el código: servicios con filtros, proceso, sectores, selección/cotizador, tema oscuro y PT/ES. No se ejecutó la app ni se validó una build nativa.

La maqueta web es una **vista ilustrativa identificada**, basada en esas secciones y en el recurso existente `team-oscuro.jpg`; no se presenta como captura. No hay URL pública de descarga confirmada, APK publicada ni badges de tiendas. El CTA prepara una solicitud de información en el briefing local. El WhatsApp de ejemplo del código móvil permanece sin cambios, fuera del alcance web, y no se conecta desde la web.

## Recursos y licencias

- Fotografías/avatares originales del equipo conservados y optimizados sin sobrescribir los originales.
- Capturas de proyectos proporcionados por el propietario, solo para su portafolio.
- Plus Jakarta Sans, fuente local con licencia SIL Open Font License en `public/fonts/OFL.txt`.
- Iconos, marca vectorial, composición hero, OG y promociones originales mediante SVG/HTML/CSS; sin generación de imágenes por IA.
