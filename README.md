# Loop Avante

Entrega actual del portafolio: [galerías premium, Cuentos Mágicos y nueva Release Android](docs/PORTFOLIO-PREMIUM-ANDROID-RELEASE.md). Incluye seis capturas públicas optimizadas, mini previews, galerías paginadas PT/ES y APK universal ARM actualizada. Trabajo local, sin push ni despliegue.

Frontend corporativo React + Vite: sitios web, sistemas, aplicaciones y automatizaciones para negocios. Arquitectura híbrida con portada corporativa y páginas independientes. Tema oscuro predeterminado para nuevas visitas y claro como alternativa; idioma determinado por la ruta PT/ES.

| Página | Portugués | Español |
| --- | --- | --- |
| Inicio | `/` | `/es/` |
| Proyectos | `/projetos/` | `/es/projetos/` |
| Diagnóstico | `/diagnostico/` | `/es/diagnostico/` |
| Simulador | `/simulador/` | `/es/simulador/` |
| Presupuesto | `/orcamento/` | `/es/orcamento/` |
| Inteligência Digital | `/inteligencia/` | `/es/inteligencia/` |
| Mercado | `/inteligencia/mercado/` | `/es/inteligencia/mercado/` |
| Productividad | `/inteligencia/produtividade/` | `/es/inteligencia/produtividade/` |
| Inversión | `/inteligencia/investimento/` | `/es/inteligencia/investimento/` |
| Sectores | `/inteligencia/setores/` | `/es/inteligencia/setores/` |
| Informe | `/inteligencia/relatorio/` | `/es/inteligencia/relatorio/` |

El desarrollo es local, sin push ni despliegue. La aplicación Android Expo SDK 58 está en `mobile/`. Las correcciones conjuntas de identidad, portafolio nativo y promoción de Loop Ação se documentan en [el informe web y Android](docs/WEB-ANDROID-CORRECTIONS-2026-11-15.md). Se conservan los registros históricos de las misiones anteriores; el nuevo control protege navegación, almacenamiento y calculadoras actuales.

## Ejecutar la web

Entorno verificado: Node.js 24.22.0 y npm 11.19.1 en Windows. Desde la raíz:

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Abrir `http://127.0.0.1:5173/`. Español: `http://127.0.0.1:5173/es/`. Kit promocional: `http://127.0.0.1:5173/promo/`.

Si `npm ci` encuentra un bloqueo EPERM sobre `esbuild.exe`, detener el servidor Vite de este proyecto y repetir la instalación; no es necesario borrar otros proyectos ni cambiar permisos del sistema.

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

La build genera 28 entradas HTML independientes y dos páginas 404 localizadas, robots y recursos locales. `src/data/pages.js` centraliza rutas y metadatos; `npm run build` regenera las entradas antes de compilar. El dominio público todavía no está confirmado: canonical, hreflang y sitemap de las 28 páginas se activan al configurarlo. Dev y preview normalizan barras finales y responden páginas desconocidas con HTTP 404. El hosting definitivo debe servir cada carpeta con su `index.html` y configurar su propia respuesta 404; no se ha desplegado.

## Funcionalidades

- Centro Inteligência Digital con seis herramientas conectadas: datos oficiales, simulador comercial básico/avanzado, productividad, inversión, perfiles sectoriales e informe A4. El modelo comercial conserva `/simulador/` como única ruta.
- Catálogo local versionado de 119 observaciones oficiales, denominadores separados, filtros compatibles y CSV seguro. Sin scraping del visitante.
- Tres escenarios comerciales, adopción gradual, capacidad distinta de ahorro de caja, pérdidas, ROI y recuperación con estados no aplicables. Inclusión explícita de resultados en el informe y transferencia anónima al cotizador.

- Cinco soluciones conectadas al configurador de proyectos.
- Portafolio real: La Huella Escrita y Yoeldis Castillo, con capturas auténticas y enlaces.
- Investigación Cetic.br TIC Empresas 2025, con universos y enlaces originales.
- Simulador con consultas mensuales, conversión y ticket BRL; escenarios ilustrativos y límites numéricos.
- Diagnóstico digital: ocho áreas, reglas deterministas, fortalezas y tres prioridades; resultados y servicios recomendados se transfieren al presupuesto, localizados según el idioma actual.
- Briefing: selección, descripción, funcionalidades, plazo y contacto voluntario; WhatsApp al número confirmado `554197862547`, copia y descarga de texto. El usuario revisa y confirma el envío en WhatsApp. Planificación de presupuesto por servicio con totales iniciales y mensuales separados. Los importes son del visitante, no tarifas.
- Presentación de la app con vista ilustrativa explícita, sin badges ni descarga inventada.
- Equipo auténtico, proceso de seis etapas, privacidad accesible y 404 bilingüe.
- Seis promociones en PNG y SVG: tres mensajes PT-BR en feed y stories. OG PT/ES y favicon originales.

## Configuración pública

Copiar `.env.example` a `.env.local` y completar únicamente valores confirmados:

| Variable | Uso |
| --- | --- |
| `VITE_SITE_ORIGIN` | Origen HTTPS definitivo; activa canonical, hreflang, OG absoluto y sitemap al compilar. |
| `src/data/config.js` → `confirmedBusinessWhatsapp` | Destino confirmado `554197862547`, sin sustitución por entorno ni dígitos añadidos. |
| `VITE_CONTACT_EMAIL` | Correo comercial confirmado. |
| `VITE_APP_DOWNLOAD_URL` | URL HTTPS pública de una APK Release autónoma previamente verificada. Vacía por ahora. |
| `VITE_APP_DOWNLOAD_RELEASE_VERIFIED` | `false` hasta verificar esa APK pública. Solo `true` junto a una URL válida habilita la descarga. |

Reiniciar Vite y recompilar tras cambiar variables. Todas las variables `VITE_*` son públicas: no introducir contraseñas, claves privadas ni secretos. No hay backend ni envío automático. Idioma y tema usan almacenamiento local; selecciones de servicios, respuestas del diagnóstico, hipótesis del simulador y opciones de presupuesto usan la sesión de la pestaña para continuar entre documentos, recargas y atrás/adelante. Nombre, contacto y texto libre del briefing permanecen en memoria de la página y no se serializan. Sin canal confirmado, el visitante puede copiar o descargar su briefing. Abrir WhatsApp o correo prepara un borrador; el visitante decide enviarlo.

## Calidad

```sh
npm test
npm run test:e2e
npm audit --omit=dev
```

Las pruebas de navegador usan Microsoft Edge instalado mediante Playwright (`channel: msedge`). No requieren modificar preferencias del navegador habitual. En otros sistemas, instalar Edge o ajustar explícitamente el canal de pruebas. La suite inicia un servidor local propio si no encuentra otro en el puerto 5173.

La suite incluye las 28 rutas, PT/ES y claro/oscuro, flujos entre páginas, presupuestos, historial, anclas, descarga CSV/texto real, privacidad, 404 y axe WCAG. Las herramientas analíticas y el informe completo se capturan en 360/390/430/768/1024/1440/1920 px; la web corporativa conserva su barrido en 390/768/1440 px. Evidencias nuevas en `.local/intelligence/`; resultados y límites en [docs/INTELLIGENCE-QA.md](docs/INTELLIGENCE-QA.md). `npm run qa:responsive` ejecuta el barrido visual. Las pruebas automatizadas no sustituyen lector de pantalla, dispositivos físicos, Safari/iOS ni métricas de campo.

Arquitectura, privacidad, cálculos y fuentes: [arquitectura](docs/INTELLIGENCE-ARCHITECTURE.md), [modelos](docs/INTELLIGENCE-CALCULATIONS.md), [catálogo oficial](docs/INTELLIGENCE-DATA-SOURCES.md). El informe ofrece impresión del navegador y guardar como PDF; no una descarga PDF directa. `loop-intelligence-v1` conserva solo números e IDs en sesión, máximo 32 KB. Los módulos sin añadir no generan cifras en el informe.

## Organización

```text
src/app/          aplicación y contexto de idioma
src/components/  controles y composición visual compartidos
src/sections/    secciones y herramientas
src/data/        contenido, traducciones, investigación y reglas
src/hooks/       preferencias y metadatos
src/utils/       cálculos, briefing, enlaces y formato
src/styles/      tokens, base y componentes responsive
public/          imágenes WebP, fuente local, OG y kit promocional
scripts/         preparación de recursos y comprobaciones
```

No se añadieron dependencias de ejecución a React/React DOM. Playwright, axe y Prettier son herramientas de desarrollo.

## Documentación y recursos

- [Claridad visual y briefing por WhatsApp: cambios, pruebas y capturas](docs/CONTACT-CLARITY-REPORT.md).
- [Plan](IMPLEMENTATION-PLAN.md) y [estado](IMPLEMENTATION-STATUS.md).
- [Integración híbrida](REVIEW-IMPLEMENTATION.md) e [informe actual de revisión](docs/REVIEW-REPORT.md).
- [Investigación y limitaciones](docs/RESEARCH.md).
- [Informe de la transformación inicial](docs/FINAL-REPORT.md) (histórico; la revisión híbrida es posterior).
- [Promociones](public/promo/index.html), PNG/SVG en `public/promo/`.
- Fuente Plus Jakarta Sans alojada localmente con [licencia SIL](public/fonts/OFL.txt).

Regeneración opcional de recursos (requiere red solo para recapturar proyectos/fuente):

```sh
node scripts/prepare-font.mjs
node scripts/capture-projects.mjs
python scripts/prepare-assets.py
npm run assets:brand
npm run pages
```

La optimización de imágenes usa Pillow. Las composiciones originales usan SVG y se exportan con Edge. No se necesitan Python ni red para ejecutar o compilar el frontend ya preparado.

El estado Git inicial se registró en `docs/audit/initial-git-status.txt`, y el de la ampliación anterior en `docs/audit/intelligence/initial-git-status.txt`. Copias locales recuperables: `.local/web-before-transformation.zip` y `.local/intelligence/before-intelligence.zip`. No se hicieron commits para evitar mezclar cambios preexistentes. El inventario de aquella misión es histórico y anterior a la aplicación Mobile 2.0 actual.

## Probar la app en Android con Expo Go

La aplicación actual se ejecuta con Expo Go compatible con SDK 58. Desde `mobile/`, `npm start` muestra el QR en modo Expo Go; `npm run start:dev-client` conserva el desarrollo con una APK propia. Los cambios de portafolio son JavaScript y se cargan al recargar Expo Go. Una instalación autónoma necesita una nueva compilación Release para incorporar estos cambios.

1. Instala **Expo Go** desde Google Play en tu teléfono Android.
2. Desde la raíz del proyecto, entra a la app:

   ```sh
   cd mobile
   npm start
   ```

3. Conecta el teléfono y la computadora a la misma red Wi-Fi.
4. Escanea con Expo Go compatible con SDK 58 el código QR de la terminal. La app mantiene cinco pestañas nativas y tema oscuro predeterminado; Ajustes permite elegir claro o sistema.
5. Guarda cambios en `mobile/`; Expo actualizará la app automáticamente. Para detener el servidor, usa `Ctrl+C`.

Si la red no permite la conexión directa, prueba `npx expo start --tunnel` desde `mobile/`. La web existente continúa iniciándose desde la raíz con `npm run dev`.

## Loop Avante 3.1

Soluções en `/solucoes/`, casos en `/projetos/la-huella-escrita/` y `/projetos/yoel-dis-castillo/`, con equivalentes `/es/`. Interpretaciones deterministas, mini diagnóstico sectorial y consentimiento para hipótesis económicas. Informe de esa ampliación: [LOOP-AVANTE-3.1-REPORT.md](docs/LOOP-AVANTE-3.1-REPORT.md). La revisión posterior de claridad visual y WhatsApp, con 64 pruebas de dominio y 68 E2E correctas, está en [CONTACT-CLARITY-REPORT.md](docs/CONTACT-CLARITY-REPORT.md).

El barrido 3.1 recorre las catorce páginas, siete anchos y cuatro combinaciones PT/ES y oscuro/claro (392 muestras). Evidencias en `.local/loop31/captures/` y `docs/LOOP-AVANTE-3.1-VISUAL.json`.
