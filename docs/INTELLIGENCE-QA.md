# Inteligência Digital — informe de verificación

Fecha: **14/11/2026**. Entorno: Windows, Node 24.22.0, npm 11.19.1, React 19, Vite 7 y Microsoft Edge headless instalado. Implementación y verificación locales. No hubo publicación, push ni cambios en configuración de contacto, credenciales o infraestructura.

## Alcance entregado

Centro `/inteligencia/`, mercado, productividad, inversión, siete perfiles sectoriales e informe imprimible, con sus versiones ES. `/simulador/` conserva el modelo comercial básico y añade avanzado, contribución, sensibilidad y tres escenarios editables. La portada, proyectos, diagnóstico, aplicación y cotizador existentes siguen disponibles.

Sistema común de paneles navy/menta, Plus Jakarta Sans, oscuro inicial y claro alternativo. Contexto anónimo versión 1, límite 32 KB, migración del simulador anterior y transferencia al cotizador. No se serializan nombre de proceso, contacto, nombre personal ni descripción libre.

## Resultados de comandos y build

| Verificación | Resultado real |
| --- | --- |
| `npm ci` | Correcto; 0 vulnerabilidades comunicadas por npm |
| `npm run build` | Correcto; 22 entradas HTML y dos 404, módulos por demanda |
| `npm test` | **58/58 correctas**, 0 omitidas; salida en `audit/intelligence/unit-results.json` |
| `npm run test:e2e` | **61/61 correctas**, 0 omitidas, fallidas o flaky; 9 minutos. JSON completo en `audit/playwright-results.json`, resumen en `audit/intelligence/e2e-final.json` |
| Smoke de build con Edge | **22/22 HTTP 200**, idioma/metadatos/H1 correctos, sin errores de consola |
| Enlaces internos y fragmentos | **54/54 válidos** |
| Recursos, promo y 404 | Recursos locales HTTP 200; rutas desconocidas PT/ES HTTP 404 |
| `npm audit --omit=dev` | 0 vulnerabilidades |
| `git diff --check` | Sin errores de whitespace; solo avisos normales LF/CRLF de Git |

## Pruebas funcionales

- Acceso directo a las 22 páginas; portada corporativa sin calculadoras completas; barra final, 404, metadatos y variantes PT/ES. Un único documento comercial por idioma, sin duplicado bajo inteligencia.
- Selección de servicios desde distintas páginas, diagnóstico completo, recomendaciones deterministas, recarga, idioma en sitio y atrás/adelante. El cotizador conserva selecciones y traduce el contexto actual.
- Mercado: filtro real Sur/B6 = 59%, opciones compatibles, comparación marginal, CSV descargado y leído con fuente. Una combinación región/tamaño no publicada muestra ausencia de datos. Los IDs canónicos impiden exportar porcentajes alterados; pruebas de neutralización CSV con `=`, `+`, `-`, `@`, espacios y controles.
- Comercial: conserva el resultado básico de ejemplo R$2.500 → R$3.750 y diferencia R$1.250; valida fracciones y conversión máxima; muestra diferencia porcentual y no aplicable con base cero. Modo avanzado permite contribución negativa, separa coste variable, captación común y coste digital incremental, y conserva tres escenarios editables después de recarga.
- Productividad: adopción 0/100%, proceso sin mejora o más lento, entradas vacías y coste opcional. Ejemplo de recorrido: 120 tareas × (15−5) minutos × 75% / 60 = 15 horas; valor teórico R$600, separado del coste recurrente. Nombre de proceso excluido del almacenamiento e informe.
- Inversión: beneficio negativo, ausencia de recuperación, inversión inicial cero con ratios no aplicables y horizontes 6/12/24. Importar capacidad requiere importe y confirmación; sustituye el beneficio. Ejemplo del recorrido: R$200 confirmados, R$50 recurrentes, R$5.000 iniciales, 12 meses → −R$3.200 acumulados.
- Informe vacío, parcial y completo; módulos no utilizados sin cifras predeterminadas. Una selección sectorial sola no genera resultados financieros. Diagnóstico incluido solo al terminarlo. Recomendaciones ligadas a servicios existentes; resumen localizado transferido al cotizador.
- Almacenamiento corrupto, versión desconocida, exceso de tamaño, claves personales y almacenamiento denegado. Con almacenamiento denegado funciona la calculadora de la página actual; la continuidad entre documentos requiere sesión disponible.
- Descarga real de briefing y CSV, portapapeles, contacto opcional, navegación de teclado y recuperación de un módulo que falla al cargar.

## Revisión visual y accesibilidad

Barrido analítico: **98 capturas completas** = siete pantallas × siete anchos × dos combinaciones de idioma/tema. Anchos: **360, 390, 430, 768, 1024, 1440 y 1920 px**. Combinaciones de capturas: PT oscuro y ES claro. Accesibilidad automatizada verifica además PT claro y ES oscuro: cuatro combinaciones por pantalla.

Las páginas corporativas conservan 60 capturas de viewport/página completa en 390/768/1440 px, PT oscuro y ES claro, incluyendo los proyectos La Huella Escrita y Yoeldis Castillo y la presentación de la aplicación. El smoke añade 22 capturas de la build.

Se inspeccionaron visualmente muestras del centro en móvil/escritorio, mercado claro en tablet, comercial avanzado móvil, productividad a 360 px, inversión clara móvil, sectores en tablet y todas las páginas del PDF. Se revisaron jerarquía, espaciado, cortes, superficies, contraste, fuentes locales, imágenes y legibilidad de valores. Las tablas amplias desplazan su propio contenido; no provocan scroll horizontal de la página. Los datos de las gráficas también están disponibles en tablas sin depender de hover.

La suite completa pasó **50 análisis axe** WCAG A/AA/2.1 AA y best practice, sin violaciones: 28 de las siete superficies analíticas y 22 de páginas/estados anteriores. Esto no equivale a certificación WCAG ni sustituye pruebas manuales con lector de pantalla y dispositivos físicos.

Capturas: `.local/intelligence/responsive/`, `.local/intelligence/production/` y `.local/review/captures/`.

## Impresión A4 real

`scripts/check-intelligence-print.mjs` imprime desde la build con seis módulos utilizados, diagnóstico completo, tres escenarios y siete indicadores. PDF final de **nueve páginas A4**, cinco gráficas y siete referencias específicas de variables, generado por Edge y renderizado a PNG con PyMuPDF. Se revisaron todas las páginas; sin controles de navegación impresos, cortes de gráficas ni tablas fuera de margen. Las cabeceras de tablas se repiten y las advertencias son legibles en blanco/verde oscuro.

Artefacto QA: `.local/intelligence/print/relatorio-a4.pdf`. Renderizados: `page-1.png`…`page-9.png`. Medidas por página en `audit/intelligence/print-pages.json`; comprobaciones de controles, módulos y fuentes en `audit/intelligence/print.json`.

El botón del producto abre la impresión del navegador, etiquetada «Imprimir / Salvar como PDF». El PDF de QA usa datos de ejemplo de pruebas, explícitamente ilustrativos; no es un informe de un cliente.

## Datos oficiales y límites del modelo

119 observaciones locales: siete variables y 17 estratos marginales oficiales, referencia 2025, publicación 2026. Se mantienen tres universos: empresas conectadas, todas las empresas investigadas y empresas que vendieron por Internet. B13B presencia WhatsApp/Telegram y E2C ventas por mensajes son mediciones diferentes aunque sus totales coincidan en 79%. Las tres variables E2C conservan definiciones separadas incluso cuando comparten URL.

No se suman respuestas múltiples, no se promedian regiones para reconstruir Brasil, no se extrapola a todos los MEI y no se inventan cruces, muestras de estrato o márgenes de error. Hay una discrepancia entre HTML E2C y presentación de lanzamiento; el catálogo sigue la tabla HTML consultada y la documenta. Las fuentes completas están en [INTELLIGENCE-DATA-SOURCES.md](INTELLIGENCE-DATA-SOURCES.md).

Facturación, contribución, capacidad y caja mantienen significados distintos. No hay ROI publicitario ni predicción de ventas. Los perfiles sectoriales son reglas editoriales; belleza y servicios del hogar no reciben cifras tomadas de agregados amplios. Las fórmulas, unidades y validaciones están en [INTELLIGENCE-CALCULATIONS.md](INTELLIGENCE-CALCULATIONS.md).

## Rendimiento y SEO

Las herramientas mantienen carga por demanda antes de montar React. El catálogo y motores analíticos no se solicitan desde la portada corporativa. Las gráficas usan SVG/CSS y tablas; no se añadió una librería de gráficas ni dependencia de ejecución. Bundle común: **102,99 KB gzip** de JavaScript y **18,10 KB gzip** de CSS; recursos analíticos separados por demanda.

En el smoke final de build se registró **CLS 0 en las 22 muestras** y **FCP/LCP entre 260 y 1.156 ms**. Son mediciones locales de una sola pasada, sin limitación artificial de CPU/red. No son Core Web Vitals de campo ni una medición INP. Tamaños reales y gzip calculado en `audit/intelligence/bundles.json`; mediciones y scripts cargados en `audit/intelligence/production-smoke.json`.

Las 22 rutas tienen título, descripción, Open Graph, idioma e introducción sin JavaScript propios. Canonical, hreflang y sitemap se activan únicamente con un dominio público confirmado; sus 22 entradas se prueban con configuración ficticia exclusivamente dentro del test. Falta configurar dominio/hosting y probarlo tras un eventual despliegue, que no forma parte de esta entrega.

## Incidencias corregidas y limitaciones pendientes

Se ampliaron los tests antiguos para incluir todos los archivos de dominio, las nuevas rutas y el total de sitemap. Se corrigieron las guardas del cálculo básico contra coerciones no numéricas y porcentajes no representables; se hizo visible su diferencia porcentual. La revisión visual llevó a separar capacidad anual/mensual, mejorar tipografía/espaciado de gráficas y conservar las tres definiciones E2C en las fuentes impresas.

Durante la iteración hubo una espera fallida en el test de combinación no publicada; la comprobación directa, la repetición aislada y la suite final pasaron. Los barridos intermedios detenidos para incorporar correcciones no se cuentan como suites completas correctas. Después de los 61 tests se corrigió únicamente la etiqueta del coste anual de productividad, conservando el cálculo; esa pantalla y su recorrido reciben además una regresión específica, documentada en `audit/intelligence/productivity-final.json`.

La regresión posterior pasó **2/2 pruebas de navegador** (recorrido completo y cuatro combinaciones axe de productividad) y **14/14 comprobaciones/capturas específicas** de la etiqueta anual en los siete anchos y dos idiomas/temas. Salida resumida en `audit/intelligence/e2e-focused.json` y detalle en `audit/intelligence/productivity-final.json`.

No se probaron Safari/iOS, Firefox, dispositivos físicos, impresora física, lectores de pantalla, métricas de usuarios reales ni hosting público. No hay configuración real de WhatsApp/dominio y no se inventó. El resumen del cotizador es acotado; el informe conserva el detalle completo de los módulos elegidos.

`mobile/` **ya estaba ausente al inicio de esta misión**. Se conserva su baseline histórico y se verifica que siga ausente mediante el inventario nuevo; no se afirma una comparación actual de 35 archivos inexistentes. No se ha creado ni modificado ese directorio.
