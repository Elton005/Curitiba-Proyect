# Revisión de integración híbrida — Loop Avante

## Estado inicial

- El checkout recibido no contiene `REVIEW-IMPLEMENTATION.md`; tampoco se encontró otra copia en `D:\Work`, ramas adicionales o worktrees registrados. README y componentes todavía describían una portada única y tema claro predeterminado. La integración se realiza sobre esta base, conservando su identidad y funcionalidades.
- Git previo registrado en `docs/audit/review/initial-git-status.txt`; copia recuperable del frontend en `.local/review/before-integration.zip`. Mobile fuera del alcance.
- Primera instalación `npm ci`: EPERM por esbuild en uso por el Vite de este proyecto. Se cerraron únicamente los procesos Vite/esbuild identificados en este checkout; segunda instalación correcta, 0 vulnerabilidades reportadas.

## Criterios de aceptación

1. Diez entradas directas PT/ES para inicio, proyectos, diagnóstico, simulador y presupuesto, con títulos y metadatos propios.
2. Navegación entre páginas, fragmentos, idioma y atrás/adelante correctos; rutas desconocidas con interfaz 404.
3. Contexto anónimo de diagnóstico y selección de servicios transferido al presupuesto y conservado durante la sesión de la pestaña. No almacenar información personal ni enviar solicitudes silenciosamente.
4. Oscuro predeterminado sin destello claro y claro alternativo; conservar marca, proyectos, fuentes e indicadores ilustrativos.
5. Capturas reales 390/768/1440 px, auditoría de accesibilidad, build, pruebas de lógica y pruebas de navegador completas.

## Resultado final

**Integración y auditoría local completadas.** Se mantuvieron React/Vite, marca, tipografía, equipo, proyectos, datos y funcionalidades. No hubo push, publicación ni cambios en `mobile/`.

### Rutas verificadas directamente

| Página | Portugués | Español | Dev / preview |
| --- | --- | --- | --- |
| Inicio | `/` | `/es/` | HTTP 200 / 200 |
| Proyectos | `/projetos/` | `/es/projetos/` | HTTP 200 / 200 |
| Diagnóstico | `/diagnostico/` | `/es/diagnostico/` | HTTP 200 / 200 |
| Simulador | `/simulador/` | `/es/simulador/` | HTTP 200 / 200 |
| Presupuesto | `/orcamento/` | `/es/orcamento/` | HTTP 200 / 200 |

Cada ruta tiene su entrada HTML, un H1, título y descripción localizados. El generador `scripts/create-pages.mjs` se ejecuta antes de cada build y usa `src/data/pages.js` como fuente común. Las páginas desconocidas tienen interfaz localizada y **HTTP 404** en dev y preview; las rutas conocidas sin barra final reciben **308**.

### Problemas corregidos

1. **Navegación basada en anclas de la portada.** Enlaces centralizados por página e idioma; las anclas corporativas apuntan al documento correcto. Un hook espera al montaje y a las fuentes antes de resolver fragmentos entre documentos. Se verificaron menú, foco, Escape y atrás/adelante.
2. **Selecciones limitadas a memoria de una portada única.** Servicios, respuestas y contexto de herramientas se guardan de forma anónima en la sesión de la pestaña, con validación de datos. Las escrituras ocurren antes de navegar; las páginas restauradas sincronizan las selecciones y no sobrescriben opciones posteriores con una copia antigua.
3. **Contexto traducido como texto fijo.** Las recomendaciones se reconstruyen desde identificadores y respuestas. Cambiar PT/ES conserva el diagnóstico y muestra el contexto del briefing en el idioma actual, sin duplicar bloques.
4. **Resumen que desaparecía al cambiar idioma.** Se conserva el briefing generado y el texto del visitante; se localiza el resumen y se limpia únicamente el estado de portapapeles, que ya no representa la nueva versión.
5. **Jerarquía de títulos al reutilizar secciones.** Los títulos principales se convierten en H1 en páginas independientes y los paneles/subtítulos usan H2/H3/H4 en orden. Las clases de diseño conservan su apariencia.
6. **Hipótesis reiniciadas al corregir un campo inválido.** El estado editable conserva los demás valores; el cálculo sigue rechazando el escenario inválido hasta corregirlo. No se convierte un error en una simulación aparentemente válida.
7. **Saltos visuales durante la carga.** La primera medición de producción detectó CLS de hasta **0,198** por el reemplazo de un fallback de Suspense. La página carga su módulo específico antes del primer montaje, manteniendo la división del código. La medición final observó **CLS 0 en las diez rutas**. Si un módulo falla, aparece un error localizado con reintento, probado simulando una interrupción y su recuperación.
8. **Tema inicial y superficies.** Oscuro predeterminado sin preferencias guardadas, selección aplicada antes de React y claro alternativo persistente. Se ajustaron el hero y sus mockups, marcos del portafolio, superficies de herramientas, límites, textos y acentos al azul noche y verde menta. No se alteraron las capturas originales de los proyectos ni la identidad.
9. **SEO centrado en una sola URL.** Metadatos por página; canonical/hreflang enlazan sus equivalentes PT/ES y el sitemap contiene diez entradas cuando se configura un origen público real. Sin origen confirmado no se emiten URLs falsas.
10. **Pruebas y scripts anteriores.** La suite ya visita las páginas independientes y no presupone las tres herramientas en la portada. El smoke de producción también recorre las diez rutas y verifica los módulos efectivamente cargados.

### Funcionalidades preservadas

- Cinco soluciones; selección hacia presupuesto; funcionalidades, planificación de importes iniciales y mensuales separados, plazo y contacto voluntario validado.
- Diagnóstico de ocho áreas, categorías deterministas, tres recomendaciones, reinicio y transferencia al presupuesto.
- Simulador con consultas/mes, conversión y ticket BRL, límites, comparación y advertencia ilustrativa. No se mezcla tráfico con consultas ni se prometen resultados.
- Copia mediante portapapeles y descarga real de `.txt`, comprobadas en el navegador.
- La Huella Escrita y Yoeldis Castillo con imágenes/capturas auténticas, objetivos, detalles y enlaces externos. La portada mantiene una selección y la página de proyectos incluye el detalle completo.
- Presentación de la app basada en el código existente y claramente ilustrativa. Su solicitud de acceso se transfiere al presupuesto; no se inventaron tiendas, badges ni descargas.
- Datos Cetic.br TIC Empresas 2025 y universos originales: adopción digital, sin causalidad económica. Fuentes conservadas y siete enlaces externos comprobados, todos HTTP 200.
- Proceso, equipo, temas, idiomas, privacidad y recursos promocionales anteriores.

### Estado, privacidad e historial

`localStorage` conserva solo idioma y tema. `sessionStorage` conserva las elecciones anónimas necesarias para la navegación: respuestas del diagnóstico, hipótesis, servicios y opciones de presupuesto. No se serializan nombre, contacto ni texto libre del visitante; las pruebas inspeccionan ambos almacenamientos. Tampoco se envían formularios a un servidor.

El cambio de idioma dentro de una misma página conserva el formulario en memoria y tiene su entrada de historial. Una recarga elimina nombre/contacto/texto libre, mientras mantiene opciones anónimas; un bloque automático del diagnóstico o simulador puede reconstruirse desde su contexto. La interfaz y la privacidad explican esta diferencia. Los borradores se pueden copiar o descargar antes de salir.

### Resultados reales de las comprobaciones

| Comando o revisión | Resultado |
| --- | --- |
| `npm ci` | Correcto tras resolver EPERM del ejecutable esbuild en uso; 23 paquetes instalados, 24 auditados, 0 vulnerabilidades informadas. |
| `npm run build` | Correcto: diez entradas de páginas, dos documentos 404 y módulos separados. |
| `npm test` | **21/21**, incluidos los **6.561 escenarios** del diagnóstico, rutas, contexto, traducciones, importes, SEO y hashes móviles. |
| `npm run test:e2e` | **29/29**, sin fallos, omisiones ni reintentos/flakiness en la ejecución final. |
| Responsive | **390, 768 y 1440 px**, las cinco páginas en PT oscuro y ES claro; **30 capturas completas y 30 de viewport**. Sin desbordamiento horizontal ni imágenes rotas detectados. |
| Accesibilidad | Axe sobre cada página en cuatro combinaciones de idioma/tema/ancho (**20 análisis**), más diagnóstico completado y briefing generado: **sin infracciones detectadas**. Teclado/foco/menú y mensajes de error probados. |
| Historial y estado | Servicios → cotizador, diagnóstico → cotizador, simulador → cotizador, solicitud de app, recarga, atrás/adelante y cambio de idioma verificados. |
| Fallo de carga | Interrupción del módulo de diagnóstico en ES, aviso localizado, reintento y recuperación correctos. |
| Producción local | Diez rutas HTTP 200; títulos, idioma, oscuro inicial y un H1; sin errores observados de consola/JS, sin overflow. Rutas desconocidas PT/ES con HTTP 404. |
| `npm audit --omit=dev` | **0 vulnerabilidades** reportadas. |
| `git diff --check` | Correcto; únicamente avisos del entorno sobre LF/CRLF. |
| Integridad de mobile | **35 archivos con SHA-256 idéntico** al inventario original. Sin modificaciones. |

La build final entrega aproximadamente **95,59 KB gzip de JavaScript común y 14,27 KB gzip de CSS**. Cada herramienta añade su propio módulo (aprox. 1,56–3,05 KB gzip) y la portada no descarga esos módulos. Fuente local WOFF2 y recursos optimizados conservados.

En la muestra local de producción, sin limitar red/CPU, el LCP observado estuvo entre **140 y 756 ms**, con **CLS 0** en las diez rutas. Son mediciones de laboratorio de este equipo, **no** datos de usuarios reales ni garantías de Core Web Vitals. No se midió INP de campo.

### Evidencias

- [Resultados finales de Playwright](audit/review/playwright-results.json).
- [Smoke y mediciones de producción](audit/review/production-smoke.json).
- [Resumen de resultados](audit/review/summary.json).
- [Enlaces externos](audit/review/external-links.json).
- [Captura desktop oscuro](../.local/review/captures/home-1440-pt-dark-viewport.png).
- [Portafolio móvil oscuro](../.local/review/captures/projects-390-pt-dark.png).
- Capturas de las cinco páginas y los tres anchos en `.local/review/captures/`; resultado y briefing en `.local/review/`; vistas de build en `.local/review/production/`.

### Límites y pendientes externos

La revisión cubre Edge headless y los viewports indicados. No sustituye una validación manual con lector de pantalla, Safari/iOS, dispositivos físicos ni métricas de campo.

Siguen pendientes los datos externos ya existentes: dominio definitivo, canal comercial real y enlace real de descarga de app. El hosting futuro debe servir las carpetas independientes y configurar su respuesta 404; solo se verificaron los servidores locales. Las funciones locales no requieren credenciales ni backend.

No se hicieron commits, push, despliegue ni cambios de infraestructura. Los servidores de QA son temporales y se cierran al entregar.

### Reproducción

```powershell
npm ci
npm run build
npm test
npm run test:e2e
```

Para revisar la build:

```powershell
npm run preview -- --host 127.0.0.1 --port 4173
```

Abrir `http://127.0.0.1:4173/` y cualquiera de las rutas de la tabla. Para repetir el smoke con el preview abierto: `node scripts/check-production.mjs`. Para desarrollo: `npm run dev -- --host 127.0.0.1`.
