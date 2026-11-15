# Loop Avante 3.1 — informe

## Entrega

Evolución local de React/Vite, conservando la identidad navy/menta, PT/ES, oscuro inicial y claro opcional. Se conservan las seis herramientas, diagnóstico general, cotizador, datos oficiales y motores matemáticos. No se publicaron cambios ni se hizo push. No se modificó `mobile/`, ausente al inicio de esta misión, ni la configuración comercial.

## Experiencia y capacidades

- Navegación de herramientas mediante selector accesible en móvil; menos altura de cabecera y superficies comunes refinadas, con advertencias esenciales visibles.
- `ResultInsights` interpreta mercado, comercial, productividad e inversión. Reglas puras, sin IA remota, causalidad o promesas. Diferencia capacidad, caja, facturación y contribución.
- Cuatro preguntas específicas por cada uno de los siete sectores. Respuestas organizadas/mejorar/desconocido, fortalezas y mejoras declaradas, hasta tres prioridades y enlaces contextuales. Sin puntuación arbitraria ni sustitución del diagnóstico general.
- Soluções desarrolla las cinco áreas, muestra una demo funcional de solicitudes ficticias, conecta las herramientas existentes y reutiliza la presentación de la app.
- Estudios de caso de La Huella Escrita y Yoeldis Castillo con objetivos, recursos y capturas auténticas de escritorio/móvil. Navegación entre proyectos y CTA contextual. No se atribuyen tecnologías internas ni resultados económicos desconocidos.
- Inicio incorpora una demostración estadística pequeña con selector, base y fuente; las calculadoras completas permanecen en sus páginas.
- El briefing conserva sector y necesidades declaradas. Las hipótesis económicas requieren una opción explícita y se retiran al desmarcarla. Nombre, contacto y texto personal no se serializan.

## Rutas nuevas

`/solucoes/`, `/projetos/la-huella-escrita/` y `/projetos/yoel-dis-castillo/`, con sus equivalentes españoles. Total: 28 documentos localizados y dos 404. Registro, generación HTML, metadatos y navegación actualizados. Las pruebas de sitemap esperan las 28 entradas.

## Implementación

Componentes: `AnalyticsUI`, `ResultInsights`, `SectorAssessment`, `SolutionsPage`, `ProjectCasePage`, `IntelligencePreview`, `QuoteBuilder`, `Header`, `Footer`, `SolutionsSection`, `PortfolioSection` y las cuatro herramientas con interpretación.

Reglas: `resultInsights.js`, `sectorAssessment.js`, extensión acotada de `analyticsContext.js` y agregación en `intelligenceReport.js`. El esquema anónimo v1 admite respuestas sectoriales conocidas, elimina campos extra y conserva compatibilidad. Estilos en `loop31.css` sobre tokens existentes. Sin nuevas dependencias de ejecución.

## Verificaciones

Build correcta, 28 documentos y dos 404; JavaScript común aproximadamente 103,68 KB gzip, CSS aproximadamente 19,1 KB gzip. **61/61 pruebas Node** correctas, incluyendo cero, negativos, ratios no aplicables/no representables, PT/ES y los 567 patrones de respuesta sectorial.

Tras corregir la regresión del reconocimiento del contexto analítico, **6/6 regresiones de navegador** pasan: menú e historial, recorrido completo CSV→productividad→inversión→informe→cotizador, inclusión/exclusión económica, evaluación sectorial persistente, demo de solicitudes y selector móvil.

Auditoría visual de producción: **392/392 combinaciones** (14 páginas × 7 anchos × PT/ES × oscuro/claro), sin errores de carga, desbordamientos ni violaciones axe en los 32 análisis específicos de nuevas rutas/sectores. Se generaron capturas de viewport para las 392 combinaciones y 32 capturas completas de las experiencias nuevas. La inspección humana detectó un tamaño excesivo en los radios sectoriales; se corrigió y se repitió esa pantalla.

**Suite completa final: 65/65 E2E correctas**, 0 omitidas, inesperadas o flaky; duración 7,1 minutos. Incluye los 50 análisis axe del sitio y sus herramientas anteriores. Resumen en `LOOP-AVANTE-3.1-E2E.json`, salida completa en `audit/playwright-results.json`. Tras precisar el texto del ROI no representable, pasó además la regresión de inversión en cuatro combinaciones de idioma/tema.

## Investigación y evidencias

El lector web no abrió los sitios públicos; Edge sí respondió HTTP 200 para ambos y permitió capturas reales a 390 px. Registro y encabezados observados en `LOOP-AVANTE-3.1-PUBLIC.json`. Capturas en `public/media/project-huella-mobile.png` y `project-yoeldis-mobile.png`. Se conservan las imágenes y documentación anteriores.

Capturas de esta misión en `.local/loop31/captures/`; auditoría automatizada en `LOOP-AVANTE-3.1-VISUAL.json`. Estado inicial de Git en `.local/loop31/git-initial.txt`.

El barrido final específico de sectores pasó **28/28 muestras** y ocho análisis axe sin violaciones, incluyendo los datos oficiales relacionados y los radios corregidos: `LOOP-AVANTE-3.1-SECTOR-VISUAL.json`. Se inspeccionaron visualmente soluciones, casos de estudio, controles móviles, sectores y el documento impreso. Las tablas grandes conservan desplazamiento propio y no producen scroll horizontal de página.

Impresión real desde la build: PDF A4 de **nueve páginas**, seis módulos, cinco gráficas y siete fuentes, renderizado a PNG e inspeccionado página por página. Interfaz y controles ocultos en impresión; cabeceras de tabla repetidas y gráficas dentro de márgenes. Artefactos en `.local/loop31/print/`; comprobaciones en `LOOP-AVANTE-3.1-PRINT.json` y `LOOP-AVANTE-3.1-PRINT-PAGES.json`. Se utiliza una sesión de ejemplo de QA, no resultados de un cliente.

Smoke final de producción: **28/28 rutas HTTP 200**, un H1 y metadatos localizados por documento, sin errores de consola ni desbordamientos. **74 enlaces/fragmentos internos válidos**. Recursos locales HTTP 200 y páginas desconocidas PT/ES HTTP 404. Muestras de laboratorio: CLS 0 y FCP/LCP entre 176 y 724 ms, sin limitación artificial de CPU/red; no son métricas de campo. Registro completo: `LOOP-AVANTE-3.1-PRODUCTION.json`.

Prettier y `git diff --check` correctos (solo avisos habituales LF/CRLF de Git).

## Correcciones detectadas durante QA

Se actualizó la expectativa antigua del menú Soluções, manteniendo navegación e historial. Se corrigió una sustitución accidental en el filtro `intelligenceRequested` que dejaba vacío el briefing; las regresiones específicas pasan. Se corrigió la exclusión de hipótesis al desmarcar la opción, sin borrar texto manual ajeno al resumen generado. La primera herramienta de capturas necesitó contextos explícitos para axe y aislamiento respecto de recargas de desarrollo.

## Límites y lanzamiento

WhatsApp y dominio público siguen pendientes de confirmación; no se inventaron datos ni se activó un canal inválido. Copiar/descargar briefing sigue disponible. La presentación de la app conserva su aviso ilustrativo y no anuncia descarga pública. Las funcionalidades internas de los proyectos no se auditaron mediante acceso privado.

Validación local con Edge; no equivale a certificación WCAG, lectura con tecnología asistiva, prueba de dispositivos físicos o métricas de campo. Hosting, canales reales y validación posterior al despliegue quedan fuera de esta entrega local.
