# Claridad visual y briefing por WhatsApp

Revisión local del 14/11/2026. Este informe corresponde a la última misión y complementa, sin sustituir, los registros históricos.

## Implementación

Número comercial exacto confirmado: `554197862547`, centralizado en `src/data/config.js`. No se añade ningún dígito ni se sustituye desde una variable de entorno. El validador existente acepta este destino y sigue rechazando el número ficticio anterior.

El resumen validado muestra como acción principal «Enviar projeto pelo WhatsApp» / «Enviar proyecto por WhatsApp», con icono, contraste y tamaño táctil. El enlace `wa.me` utiliza `encodeURIComponent` con el mismo texto revisado. Abrirlo prepara la conversación; no envía el mensaje ni muestra un éxito de envío. Copiar y descargar permanecen disponibles.

El briefing contiene soluciones/tipo de proyecto, descripción y requisitos, todas las funcionalidades elegidas, presupuesto disponible de implantación y mensual por separado, plazo y datos voluntarios existentes. No se inventan empresa, requisitos u otros campos. Los presupuestos no informados se identifican como tales, sin convertirlos en cero ni presentarlos como precio de Loop Avante.

El diagnóstico puede incluirse o retirarse de forma explícita. El contexto elegido desde su CTA se conserva; el diagnóstico general completado no se incorpora automáticamente a un briefing analítico sin elección. Las hipótesis económicas conservan su consentimiento independiente. Los datos personales y textos libres permanecen fuera del almacenamiento de la aplicación.

Se corrigió también la entrada directa al cotizador después de completar un diagnóstico: su casilla ahora incorpora el resumen aunque no se haya utilizado el CTA del resultado. Al retirarlo se conserva la descripción manual, y el cambio de idioma utiliza los mismos datos anónimos con textos localizados.

## Claridad y orientación

`toolOrientation.js` proporciona instrucciones localizadas y reutilizadas en todas las páginas de Inteligência Digital. Se mantienen la navegación móvil compacta y el enlace al centro. Las explicaciones distinguen datos públicos, escenarios, respuestas propias y siguientes pasos.

Los paneles de resultados de productividad/inversión utilizan jerarquía numérica y superficie diferenciada; las interpretaciones y acciones se separan mediante espacio y líneas, con menos marcos. Se mantienen cifras, unidades y signos para no depender solo del color. Inversión añade ayudas sobre gasto inicial, coste mensual, beneficio, ROI y recuperación.

En móvil las instrucciones ampliadas se consultan mediante un desplegable nativo con etiqueta; los avisos esenciales sobre hipótesis y límites siguen visibles. El briefing final ocupa su altura natural, sin un panel de texto recortado ni scroll interno obligatorio. La generación sitúa el foco en la confirmación del resumen, respetando la preferencia de movimiento reducido y el encabezado fijo.

El informe presenta un resumen de módulos incluidos y pendientes antes de la impresión. El cotizador agrupa selección, configuración, presupuesto y revisión, con un briefing tipográfico y encabezados estructurados. Se corrigió también la colocación de opciones de contexto dentro del formulario, para conservar sus dos columnas cuando se llega desde otras herramientas. Inicio, diagnóstico y páginas internas reciben separadores y espaciados compartidos sin reconstrucción.

## Componentes y contratos

Configuración, iconos, traducciones, `buildQuoteText`, `hasBudgetValue`, `App`, `QuoteBuilder`, `AnalyticsUI`, `InvestmentPage`, `ProductivityPage`, `ReportPage`, `toolOrientation.js` y `clarity.css`. Sin cambios en los motores matemáticos, catálogo oficial o `mobile/`. Sin nuevas dependencias, backend, publicaciones ni push.

## Comprobación del destino

Edge abrió únicamente el enlace base, sin texto de cliente ni envío. WhatsApp respondió **HTTP 200**, redirigió al teléfono exacto y mostró «Chatea en WhatsApp con el +55 41 9786-2547». Se conservaron captura y resultado en `.local/contact-clarity/whatsapp-destination.png` y `WHATSAPP-DESTINATION-CHECK.json`. Esto acredita la pantalla pública de continuación; no prueba recepción, titularidad técnica de una cuenta ni entrega de mensajes.

## Pruebas y evidencias

`npm ci` completado: 24 paquetes auditados, cero vulnerabilidades declaradas por npm en esta ejecución. `npm run build` genera las 28 entradas independientes y dos páginas 404. JavaScript principal: 103,99 KB gzip; CSS compartido: 19,98 KB gzip, según Vite. Son tamaños de artefactos, no métricas de rendimiento de campo.

`npm test`: **64/64**. Se mantienen las comprobaciones matemáticas, reglas del diagnóstico, privacidad, rutas, traducciones, fuentes y catálogo de mercado. Las tres pruebas de dominio nuevas cubren el destino exacto, el briefing PT/ES, todas las soluciones y funcionalidades seleccionadas, los campos opcionales y la ausencia de importes o datos inventados.

Tres pruebas específicas de navegador verifican la inclusión y retirada del diagnóstico (entrada directa y CTA), campos mínimos, texto completo, presupuestos, encoding, portapapeles y apertura manual en una ventana separada en PT/ES. El destino externo se intercepta durante estas pruebas: no se transmiten mensajes de prueba.

La primera comparación de portapapeles detectó la normalización CRLF de Windows; se normalizan únicamente finales de línea en el test. No se eliminó contenido del briefing para obtener el resultado.

`npm run test:e2e`: **68/68**, cero fallos y cero pruebas omitidas (4,9 minutos). Cubre rutas directas PT/ES, servicios y diagnóstico hacia el cotizador, almacenamiento anónimo y datos corruptos, presupuestos, portapapeles/descargas reales, historial, anclas, menú móvil, recuperación ante fallo de módulo, herramientas analíticas, informe y accesibilidad en ambos temas/idiomas. Incluye capturas adicionales hasta 1920 px. [Resultado completo de Playwright](CONTACT-CLARITY-E2E.json).

Prettier verifica el código de `src`, scripts y pruebas; `git diff --check` no detecta errores de whitespace. No hay cambios en `mobile/`, ausente en el inventario inicial y comprobado por la prueba de preservación.

Comprobación final de la compilación servida con Vite preview: **28/28 páginas**, **74/74 enlaces internos y anclas**, seis recursos/páginas auxiliares HTTP 200 y las dos rutas desconocidas HTTP 404. Cero errores de consola, un único H1 por documento y ausencia de desbordamiento global. El CLS máximo observado fue 0,0215 en muestras locales sin limitación de CPU/red; no representa una medición de campo. [Resultado de producción](CONTACT-CLARITY-PRODUCTION.json).

Teclado: **4/4 recorridos** PT/ES × claro/oscuro en 390 px. Enter abre/cierra las instrucciones, Espacio selecciona el servicio, Enter genera el briefing y Tab recorre confirmación → texto → WhatsApp. El botón conserva foco visible de 3 px; no se activó el destino externo. [Resultado de teclado](CONTACT-CLARITY-KEYBOARD.json).

El barrido de producción comprende **336 combinaciones**: 14 páginas × seis anchos (360, 390, 430, 768, 1024 y 1440 px) × dos idiomas × dos temas. Todas respondieron HTTP 200, sin scroll horizontal global, error JavaScript ni fallo de carga del módulo. En 64 estados de las páginas modificadas se ejecutó axe (WCAG A/AA y buenas prácticas): cero violaciones detectadas. La ausencia de detecciones automatizadas no equivale a una certificación de accesibilidad.

Tras reducir la altura de las ayudas móviles se verificaron otras **192 combinaciones** de las ocho páginas de herramientas/cotizador. El ajuste final de etiquetas y del texto completo del briefing tiene un barrido adicional de **72 combinaciones** de inversión/productividad/cotizador, con cero errores o desbordamientos. Estos dos barridos adicionales no repiten axe. Se revisaron capturas reales de escritorio, tablet y móvil, incluido el briefing completo, las superficies claras/oscuras y la portada; no se afirma una inspección manual individual de cada captura.

Resultados: [barrido general](CONTACT-CLARITY-VISUAL.json), [ayudas móviles](CONTACT-CLARITY-GUIDES.json), [ajuste final](CONTACT-CLARITY-FINAL.json), [destino WhatsApp](WHATSAPP-DESTINATION-CHECK.json). Capturas en `.local/contact-clarity/captures/`; las evidencias históricas permanecen en sus directorios.

Capturas representativas:

- [Portada PT oscura · 390 px](../.local/contact-clarity/captures/home-pt-dark-390.png).
- [Inversión PT oscura · 1440 px](../.local/contact-clarity/captures/investment-pt-dark-1440.png).
- [Productividad ES clara · 768 px](../.local/contact-clarity/captures/productivity-es-light-768.png).
- [Briefing ES oscuro completo · 390 px](../.local/contact-clarity/captures/quote-es-dark-390-full.png).
- [Briefing PT claro completo · 1440 px](../.local/contact-clarity/captures/quote-pt-light-1440-full.png).
- [Pantalla pública del destino WhatsApp](../.local/contact-clarity/whatsapp-destination.png).

Para reproducir: `npm ci`, `npm run build`, `npm test` y `npm run test:e2e`. Para las comprobaciones de producción, iniciar `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` y ejecutar en otra terminal:

```sh
node scripts/qa-contact-clarity.mjs
node scripts/qa-contact-clarity.mjs --guides-only
node scripts/qa-contact-clarity.mjs --final-only
node scripts/check-loop31-production.mjs --contact-clarity
node scripts/check-contact-clarity-keyboard.mjs
```

El modo `--contact-clarity` guarda las comprobaciones de producción en el directorio de esta misión y conserva las evidencias de Loop Avante 3.1. Los scripts de esta misión son `qa-contact-clarity.mjs`, `verify-whatsapp.mjs` y `check-contact-clarity-keyboard.mjs`, más la opción reutilizable añadida a `check-loop31-production.mjs`. Las pruebas específicas están en `tests/contact-clarity.test.mjs` y `tests/contact-clarity-e2e.spec.js`; se actualizó la expectativa antigua de ausencia de WhatsApp en `tests/e2e.spec.js` para exigir ahora el número confirmado.

## Límites

Pruebas locales con Edge; no son una certificación WCAG ni pruebas de lectores de pantalla, dispositivos físicos o Safari. La confirmación y entrega en WhatsApp dependen del usuario y del servicio externo. El dominio público sigue pendiente; no se ha publicado esta versión.
