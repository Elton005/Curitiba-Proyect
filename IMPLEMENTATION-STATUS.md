# Estado de implementación — Loop Avante

**Revisión híbrida posterior completada: 14/11/2026.** Oscuro inicial, diez rutas PT/ES, transferencia anónima entre páginas y auditoría de producción. Resultados actuales: **21 pruebas de lógica + 29 de navegador**, capturas 390/768/1440 y CLS 0 en la muestra local. Consulte `REVIEW-IMPLEMENTATION.md` y `docs/REVIEW-REPORT.md`. Las fases que siguen registran la transformación inicial.

**Estado final: implementación y auditoría local completadas el 14/11/2026.** Build correcta, 15 pruebas de lógica y 21 de navegador superadas. Pendientes externos al final; sin publicación ni cambios en mobile.

## Fase 1 — auditoría completada

- React 19 + Vite 7, sin router ni librerías adicionales. `src/main.jsx` concentra toda la aplicación; CSS contiene múltiples capas que se sobrescriben.
- Conservar: identidad verde/azul/crema, Plus Jakarta Sans, PT/ES, menú responsive, selección y resumen comercial, equipo Ernesto/Ali/Yoisielis y fotos.
- Corregir: ES inicial, cifras sin evidencia, WhatsApp `5541999999999` de ejemplo, tarifas no confirmadas, dependencias visuales CDN, imágenes grandes y demos ficticias dominantes.
- No se encontró toggle claro/oscuro explícito; se implementarán ambos temas completos y preferencia persistente.
- Git inicial registrado en `docs/audit/initial-git-status.txt`. Cambios previos existentes, incluidos frontend y mobile sin seguimiento. Copia recuperable del frontend inicial: `.local/web-before-transformation.zip` (local e ignorada).
- Hashes SHA-256 del código y recursos móviles: `docs/audit/mobile-baseline.json`. Mobile solo consultado selectivamente; no modificado.
- Scripts disponibles: dev, build y preview. Dependencias ya instaladas.
- Siguiente: sistema visual, arquitectura, contenido bilingüe y herramientas. Investigación pública en curso.

## Decisiones de alcance

- Trabajo exclusivamente local; no commits automáticos por coexistir cambios previos y archivos sin seguimiento.
- Sin backend: el presupuesto genera un resumen descargable/copiable; nunca afirma que se haya enviado o guardado.
- Sin canal comercial confirmado: contacto configurable, sin número ficticio ni email inventado.
- Origen público configurable; no canonical, sitemap o URLs OG absolutas ficticias.

## Fases 2–5 y 14 — implementadas

- Posicionamiento en tecnología empresarial; PT-BR predeterminado y ES completo en contenido centralizado.
- Navegación sticky, selector PT/ES persistente, tema claro/oscuro persistente, enlaces internos y menú móvil con Escape.
- Sistema editorial crema/verde/azul; tokens de diseño en `src/styles/`; iconografía SVG propia y composición hero en HTML/CSS/SVG.
- Cinco soluciones con beneficios, ejemplos y selección conectada al briefing.
- Frontend dividido entre app, components, sections, data, hooks, utils y styles. `src/main.jsx` reducido al punto de entrada; se mantiene React/Vite.
- Tipografía variable local con licencia SIL; sin Font Awesome ni Google Fonts en tiempo de ejecución.

## Fases 6–12 — implementadas; QA pendiente

- Investigación TIC Empresas 2025 (publicación 2026): website 56%, redes 90%, WhatsApp o Telegram 79%, CRM 31%. Universos y advertencias visibles. URLs primarias en `src/data/market.js`.
- Simulador con consultas mensuales, conversión, ticket BRL y aumentos hipotéticos; límites y casos de cero sin divisiones inválidas. Cálculos puros en `src/utils/simulator.js`.
- Portafolio con capturas reales HTTP 200 de ambos dominios, tomadas con Edge automatizado; registro en `docs/audit/project-captures.json`. Capturas WebP optimizadas, sin funciones ni resultados inventados.
- App presentada con funciones observadas en código. Vista ilustrativa identificada explícitamente; sin descarga pública confirmada, CTA prepara una solicitud de acceso en el briefing. No se ejecutó ni modificó la app.
- Diagnóstico de 8 áreas, tres respuestas por pregunta, progreso, navegación, categorías explicables, fortalezas y tres recomendaciones por reglas.
- Cotizador: selección y funciones, descripción, plazo, contacto voluntario, resumen copiable/descargable. Planificación voluntaria por servicio conserva cálculos de importes iniciales/mensuales separados, definidos por el visitante y sin tratarse como tarifas.
- Equipo auténtico conservado (Ernesto, Ali, Yoisielis; imágenes originales, incluida ilustración/avatar), proceso de 6 etapas.

## Fase 15 — base técnica implementada

- Entradas HTML PT y ES (`/` y `/es/`), 404 noindex; metadatos actualizados por idioma, favicon SVG, fuente precargada.
- Canonical, hreflang y sitemap se generan solo con `VITE_SITE_ORIGIN` confirmado. Robots generado por build sin dominio ficticio.
- Configuración pública centralizada mediante `.env.example`; teléfono de ejemplo rechazado, sin secretos.
- Build inicial ejecutada y correcta: 62 módulos; CSS 12.69 KB gzip y JS 95.38 KB gzip (antes de ajustes finales).

## Fase 16–19 — en curso

- El host de navegador interactivo CUA no está disponible (sin pipe nativo ni host de acceso al navegador). Alternativa disponible: Edge instalado + Playwright en modo headless para capturas reales y pruebas automatizadas autorizadas en la misión.
- Primer barrido de siete anchos lanzado: 360, 390, 430, 768, 1024, 1440 y 1920 px. Resultados y correcciones se documentarán al completarlo.
- Siguiente: revisión visual, pruebas de flujos y accesibilidad, recursos OG y kit promocional, auditoría final.

## Fase 13 — recursos completados

- Seis promociones PT-BR: tres feed de 1080 × 1350 y tres stories de 1080 × 1920. PNG y SVG editables con fuente y licencia incorporadas.
- OG PT/ES de 1200 × 630, favicon SVG y Apple touch icon. Galería y ZIP del kit en `public/promo/`.
- Recursos originales mediante SVG/HTML/CSS, sin imágenes generadas por IA. Dimensiones verificadas con Pillow.

## Fases 16–17 — QA completada

- `npm run build`: correcto. JS 95,86 KB gzip; CSS 12,99 KB gzip. Fuente local WOFF2 variable real de 27 KB.
- `npm test`: 15/15; cálculos, cero/inválidos, las 6.561 combinaciones del diagnóstico, presupuestos separados, traducciones completas, configuración/SEO y hashes mobile.
- `npm run test:e2e`: 21/21 en Edge. Siete anchos PT claro/ES oscuro, imágenes, consola, menú/foco, 404, simulador, diagnóstico, clipboard y descarga real.
- Axe: cero infracciones detectadas en cuatro combinaciones de idioma/tema/ancho y el estado de resultados con briefing. Se corrigieron los problemas encontrados.
- Siete enlaces externos verificados: todos HTTP 200. `npm audit --omit=dev`: 0 vulnerabilidades.
- Smoke de build en preview local: entradas, robots, favicon, fuente, OG y kit correctos. LCP/CLS de laboratorio documentados sin presentarlos como resultados de campo.
- Documento sin scroll horizontal a los siete anchos. El desbordamiento de los adornos se limita al hero, sin ocultar contenido funcional.
- Mobile: 35 archivos del inventario original con SHA-256 idéntico. Sin modificaciones.

## Fases 18–20 — cierre y entrega

- Revisadas capturas reales del hero, portafolio, herramientas, móvil y variantes de idioma/tema. Corregidos contraste, legibilidad, tipografía, foco y scroll del resumen.
- CSS consolidado en tokens/base/componentes; código formateado y separado por responsabilidad.
- README actualizado conservando las instrucciones móviles anteriores. Investigación en `docs/RESEARCH.md`; informe detallado en `docs/FINAL-REPORT.md`; evidencias en `docs/audit/` y capturas en `.local/qa/`.
- Git inicial y copia del frontend previo conservados. Sin commits, push, despliegue ni infraestructura externa.
- Los servidores de QA son temporales y se cierran al terminar. Los comandos de arranque están documentados.

## Pendientes que requieren información externa

1. WhatsApp o email comercial real: configurar variables públicas para habilitar apertura de un borrador. La copia/descarga local ya funciona.
2. Dominio definitivo: activa canonical/hreflang/sitemap y OG absoluto al recompilar.
3. URL real y verificada de descarga de app; capturas nativas si se desean sustituir las vistas ilustrativas.
4. Configuración del hosting futuro para `/es/` y respuestas HTTP 404 reales. No se desplegó a un proveedor.
5. Pruebas manuales con lector de pantalla, Safari/iOS y dispositivos físicos, y métricas de campo no disponibles en este entorno.

No quedan tareas de implementación pendientes dentro del frontend autorizado.
