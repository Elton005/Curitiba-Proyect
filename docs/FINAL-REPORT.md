# Loop Avante — informe final

> Documento histórico de la transformación inicial. La arquitectura y verificación actuales se describen en [REVIEW-REPORT.md](REVIEW-REPORT.md), correspondiente a la integración híbrida posterior.

Entrega local del **14 de noviembre de 2026**. Frontend implementado y auditado; no se publicó ni se hizo push. Los cambios anteriores del propietario se preservaron con una copia recuperable. `mobile/` permanece intacto.

## 1. Resumen ejecutivo

La web pasó de una presentación centrada en comercios y redes sociales a una plataforma corporativa de soluciones tecnológicas para negocios. Conserva la identidad verde, azul noche y crema, la familia Plus Jakarta Sans y las personas del equipo.

Se construyó un sistema visual editorial con hero original, cinco soluciones, investigación con gráficos, proyectos reales, presentación de la app, herramientas comerciales, proceso y contacto. La interfaz es bilingüe PT-BR/ES y tiene temas claro y oscuro completos.

## 2. Arquitectura

Se mantuvieron React y Vite. `src/main.jsx` ahora es solo el punto de entrada. El frontend se distribuye por responsabilidad:

| Ruta | Responsabilidad |
| --- | --- |
| `src/app/` | Composición de la aplicación y contexto de idioma. |
| `src/components/` | Header, footer, marca, iconos, encabezados y composición hero. |
| `src/sections/` | Secciones corporativas, simulador, diagnóstico, cotizador y 404. |
| `src/data/` | Traducciones, soluciones, proyectos, investigación, configuración y preguntas. |
| `src/hooks/` | Preferencias y metadatos. |
| `src/utils/` | Cálculos puros, reglas, formato, contacto y resumen exportable. |
| `src/styles/` | Tokens, base y estilos de componentes con breakpoints explícitos. |
| `public/` | Imágenes optimizadas, fuente local, OG, favicon y promociones. |
| `tests/` y `scripts/` | Verificación funcional y preparación reproducible de recursos. |

No se añadieron librerías de ejecución a React/React DOM. Playwright, axe y Prettier son herramientas de desarrollo. Las entradas HTML `/` y `/es/` ya incluyen metadatos propios, además de la actualización al cambiar idioma.

## 3. Funcionalidades implementadas

- Header sticky con enlaces internos, CTA, idioma, tema y menú móvil. El menú dirige el foco al primer enlace, se cierra con Escape y devuelve el foco al botón. Incluye CTA en móvil.
- Cinco soluciones con beneficios, ejemplos y selección integrada al briefing.
- **Simulador de Potencial Digital:** consultas mensuales, tasa de conversión, ticket en BRL, crecimiento hipotético de consultas y mejora en puntos porcentuales. Muestra ambos escenarios, ventas esperadas, facturación ilustrativa y diferencia. No mezcla visitas con consultas. Rechaza valores vacíos, negativos, infinitos o fuera de límites; controla conversión total máxima del 100% y evita divisiones por cero. La advertencia ilustrativa es visible.
- **Loop Diagnóstico Digital:** ocho áreas, tres respuestas por pregunta, progreso, navegación anterior/siguiente, validación, categorías explicadas, fortalezas declaradas, oportunidades y tres prioridades por reglas. No usa IA externa, puntuaciones de precisión falsa ni datos personales obligatorios.
- **Cotizador/briefing:** categorías, descripción, funcionalidades, plazo, contacto voluntario validado y planificación de presupuesto por servicio. Conserva cálculo de importes: suma por separado la inversión inicial y la mensualidad que introduce el visitante. No presenta esos valores como precios comerciales. Genera un resumen revisable, copiable y descargable como `.txt`.
- Al configurar un canal real, permite abrir un borrador de WhatsApp o correo. Sin configuración, explica la situación y ofrece copia/descarga; nunca simula un envío.
- Proceso de seis etapas y equipo original: Ernesto, Ali y Yoisielis, con sus roles e imágenes anteriores, incluida la ilustración/avatar existente.
- Privacidad accesible: solo idioma y tema persisten localmente. Cuestionario, simulación y briefing permanecen en memoria de la pestaña. No hay backend, captación silenciosa ni analítica publicitaria.

## 4. Portafolio

**La Huella Escrita** y **Yoeldis Castillo** destacan como proyectos reales proporcionados por el propietario, por encima de los productos propios. Se inspeccionaron sus páginas públicas y se capturaron con Edge a 1440 × 1000 px; ambas respondieron HTTP 200. Las capturas se optimizaron a WebP de aproximadamente 76 KB y 93 KB.

Cada ficha incluye nombre, categoría, descripción, objetivo, aspectos observables y enlace externo seguro. La Huella Escrita presenta autor, biblioteca, blog y recursos; Yoeldis Castillo presenta trayectoria, libros, artículos y contacto. No se inventaron tecnologías, transacciones verificadas, métricas ni testimonios.

La participación de Loop Avante se atribuye a la información del propietario; las páginas públicas verifican apariencia y contenido. Se identifican Loop Avante Website y la app como productos propios. Las demos ficticias anteriores ya no ocupan el portafolio principal.

## 5. Investigación

Se sustituyeron las cifras heredadas por datos oficiales de **TIC Empresas 2025**, publicados por NIC.br/Cetic.br en 2026:

| Indicador | Valor | Base |
| --- | --- | --- |
| [Website — B6](https://cetic.br/pt/tics/pesquisa/2025/empresas/B6/expandido/) | 56% | Empresas con acceso a Internet. |
| [Perfil en redes — B13A](https://cetic.br/pt/tics/pesquisa/2025/empresas/B13A/expandido/) | 90% | Empresas con acceso a Internet. |
| [WhatsApp o Telegram — B13B](https://cetic.br/pt/tics/pesquisa/2025/empresas/B13B/expandido/) | 79% | Empresas con acceso a Internet; no mide ventas. |
| [CRM — G3](https://cetic.br/pt/tics/pesquisa/2025/empresas/G3/expandido/) | 31% | Total de empresas de la encuesta, presentado aparte. |

La población es de empresas formales brasileñas, de los sectores investigados, con **10 o más personas ocupadas**. No se extrapola a todos los MEI o micronegocios. Son indicadores de adopción, no pruebas de mejoras económicas ni causalidad. Fuentes, fecha, definición y universos están en la web, `src/data/market.js` y [RESEARCH.md](RESEARCH.md).

El simulador utiliza exclusivamente hipótesis editables. Su ejemplo inicial calcula R$2.500 actuales y R$3.750 hipotéticos; no es un resultado de Loop Avante ni una previsión.

## 6. Aplicación móvil

Se consultaron selectivamente README, configuración y secciones de `mobile/` para confirmar servicios con filtros, proceso, sectores y selección/cotizador, PT/ES y tema oscuro. La vista de smartphone está **identificada como ilustrativa y basada en el código**; no se presenta como captura nativa.

No se encontró una descarga pública confirmada. El CTA prepara una solicitud de información sobre acceso en el briefing. No se publicaron APK, builds ni badges de tiendas. No se ejecutó la app ni se modificó su código. **Los 35 archivos del inventario inicial conservan sus hashes SHA-256.**

## 7. Calidad y evidencia

| Verificación ejecutada | Resultado |
| --- | --- |
| `npm run build` | Correcta; entradas PT, ES y 404 y recursos preparados en `dist/`. |
| `npm test` | **15/15** pruebas de lógica/artefactos correctas. Incluye las **6.561 combinaciones** del diagnóstico. |
| `npm run test:e2e` | **21/21** pruebas correctas en Microsoft Edge headless. |
| Responsive | **360, 390, 430, 768, 1024, 1440 y 1920 px**, con capturas PT claro y ES oscuro; sin scroll horizontal de documento, imágenes cargadas ni errores JS observados. |
| Accesibilidad automatizada | Sin infracciones detectadas por axe en cuatro combinaciones de idioma/tema/ancho y en el resultado del diagnóstico con briefing generado. Incluye WCAG 2 A/AA, 2.1 AA y buenas prácticas. |
| Flujos comerciales | Validación, selección, importes, navegación del diagnóstico, reinicio, contexto hacia briefing, clipboard y descarga real de `.txt`. |
| Navegación/idioma | Menú, foco, Escape, enlaces, persistencia, PT/ES, temas, metadatos y 404 explícita y en ruta desconocida. |
| Contacto y privacidad | Sin enlaces a número de ejemplo o email inventado; sin envío de datos de formulario; almacenamiento local limitado a dos preferencias. |
| Fuentes y proyectos | Siete URLs externas comprobadas: todas HTTP 200. |
| `npm audit --omit=dev` | **0 vulnerabilidades** reportadas. |
| Producción local | `/`, `/es/`, `/404.html`, robots, favicon, OG, fuente y kit responden correctamente; sin errores de consola observados. |
| `git diff --check` | Sin errores de whitespace; solo avisos de conversión LF/CRLF del entorno. |

La build final tiene aproximadamente **95,86 KB de JavaScript gzip y 12,99 KB de CSS gzip**. Fuente local variable WOFF2 de 27 KB; sin fuentes o iconos CDN en ejecución ni librerías pesadas de gráficos.

La medición local sin limitación de red/CPU observó LCP por debajo de un segundo y CLS 0 en las dos páginas principales durante la muestra inicial. Es una comprobación de laboratorio en este equipo, **no** una medición de usuarios reales ni garantía de Core Web Vitals. No se midió INP de campo.

La auditoría detectó y corrigió: desbordamiento decorativo del hero, texto de apoyo pequeño, contraste insuficiente en dos elementos, entrega de una fuente estática mal identificada, foco inicial del menú y acceso por teclado al resumen con scroll.

Evidencias:

- [Resultados completos de Playwright](audit/playwright-results.json).
- [Smoke de producción local](audit/production-smoke.json).
- [Enlaces externos](audit/external-links.json) y [capturas de los proyectos](audit/project-captures.json).
- [Hashes originales de mobile](audit/mobile-baseline.json).
- Capturas de la web en `.local/qa/`, incluidas vistas de ambos temas y resultados interactivos. El host CUA no estaba disponible; se usó el Edge instalado con Playwright como alternativa autorizada de navegador automatizado.

## 8. Pendientes externos y límites

1. **Canal comercial confirmado:** completar WhatsApp y/o email en `.env.local`. Actualmente la web prepara el briefing local, sin afirmar que lo envió.
2. **Dominio definitivo:** configurar `VITE_SITE_ORIGIN` y recompilar para generar canonical, hreflang, OG absoluto y sitemap. No se publicó una URL falsa.
3. **Descarga real de app:** configurar `VITE_APP_DOWNLOAD_URL` solo después de verificar la URL. Capturas nativas pueden sustituir la vista ilustrativa cuando estén disponibles.
4. **Hosting futuro:** servir archivos estáticos y `/es/`; configurar páginas inexistentes con `404.html` y **estado HTTP 404**. Vite preview sirve el archivo `/404.html` con HTTP 200; se verificó la interfaz, no una configuración de servidor remoto.
5. **Validación complementaria:** lector de pantalla, Safari/iOS, dispositivos físicos y métricas de campo. Las pruebas actuales cubren Edge automatizado y sus siete viewports; no constituyen certificación integral de accesibilidad.

No faltan credenciales para las funciones locales implementadas. La captación persistente de solicitudes requeriría una decisión y backend propios; la web actual no simula ese almacenamiento.

Recursos adicionales: seis promociones PT-BR en PNG y SVG, tres de feed 1080 × 1350 y tres de stories 1080 × 1920; dos OG 1200 × 630. Los SVG llevan la fuente y su licencia incorporadas. [Kit completo ZIP](../public/promo/loop-avante-kit.zip), [galería](../public/promo/index.html).

## 9. Ejecución local

Desde `D:\Work\Curitiba-Proyect`:

```powershell
npm ci
npm run dev -- --host 127.0.0.1
```

Abrir `http://127.0.0.1:5173/`, `http://127.0.0.1:5173/es/` o `http://127.0.0.1:5173/promo/`.

```powershell
npm test
npm run test:e2e
npm run build
npm run preview -- --host 127.0.0.1
```

Vista de la build: `http://127.0.0.1:4173/`. Las pruebas de navegador y exportación gráfica usan Microsoft Edge instalado. Ver [README](../README.md) para configuración y regeneración de recursos.

El plan y el estado quedan en la raíz. No se hicieron commits automáticos para evitar mezclar trabajo previo. No hubo operaciones de limpieza destructiva, push ni despliegue. La copia inicial del frontend está en `.local/web-before-transformation.zip`.
