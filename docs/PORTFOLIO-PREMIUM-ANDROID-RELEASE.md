# Portafolio premium y nueva Release Android

Fecha: 15 de noviembre de 2026. Desarrollo local, sin push ni despliegue.

## Cambios

- La Huella Escrita y Yoeldis Castillo tienen **tres piezas visuales auténticas cada uno**, con descripciones PT/ES, fuentes y fecha de captura.
- Web: tarjetas con portada responsive, miniaturas y acceso a la galería. Los estudios de caso incluyen visor paginado, contador, miniaturas seleccionables, navegación por teclado y enlaces a las páginas originales. Se monta una sola imagen principal a la vez.
- Android: tarjetas 16:10 con límite de 240 dp, indicador de tres imágenes y detalle paginado con flechas de 48 dp, miniaturas y etiquetas accesibles. La imagen principal activa mide 720 × 450 px; no se decodifican todas las piezas grandes como una lista de imágenes.
- Cuentos Mágicos aparece separado de los proyectos publicados, como **producto narrativo en preparación / Em breve / Próximamente**. No se encontraron activos propios identificables en el repositorio; se utiliza una tarjeta editorial con iconografía existente, sin atribuirle un logo oficial, capturas, funciones infantiles/educativas ni enlaces de publicación no confirmados.
- Se mantiene el nombre **Yoeldis Castillo**, el dominio y las rutas/identificadores existentes.
- SQLite, migraciones, proveedores, navegación principal y calculadoras permanecen intactos. Un baseline de 57 archivos protege las fuentes que esta mejora no debe cambiar.

## Investigación y procedencia

Se revisaron las páginas públicas reales, sin iniciar sesión ni enviar formularios. Inicio, biblioteca, recursos, autor y blog de La Huella Escrita; inicio, libros, artículos, presentación profesional y contacto de Yoeldis Castillo respondieron HTTP 200.

La Huella Escrita utiliza una identidad editorial clara, tipografía serifada y acentos dorados, con biblioteca y recursos para escritores. Yoeldis Castillo utiliza tonos oscuros/cálidos y una identidad profesional orientada a escritura, psicología y desarrollo personal. Las leyendas describen lo observado; no atribuyen tecnologías internas, tráfico, conversiones ni resultados de negocio.

| Proyecto | Pieza | Página pública |
| --- | --- | --- |
| La Huella Escrita | Hero / identidad editorial | https://www.lahuellaescrita.com/ |
| La Huella Escrita | Biblioteca / libros | https://www.lahuellaescrita.com/biblioteca.html |
| La Huella Escrita | Recursos para escritores | https://www.lahuellaescrita.com/recursos.html |
| Yoeldis Castillo | Hero / marca personal | https://www.yoeldiscastillo.com/ |
| Yoeldis Castillo | Libros / contenido | https://www.yoeldiscastillo.com/libros.html |
| Yoeldis Castillo | Artículos / reflexiones | https://www.yoeldiscastillo.com/articulos.html |

Capturas originales: `.local/portfolio-premium/source/`, fuera de los paquetes. Las piezas son vistas reales de escritorio adaptadas por tamaño; sus variantes Android no se presentan como capturas de una interfaz nativa.

## Recursos y optimización

**Seis piezas, cuatro variantes web y dos Android por pieza.** Se conservan las capturas originales y los recursos anteriores; los originales grandes anteriores ya no están referenciados por el catálogo Android activo.

| Variante | Dimensiones | Uso |
| --- | --- | --- |
| Web principal grande | 1280 × 800 | Galería de escritorio |
| Web principal | 960 × 600 | Visor y tarjetas según resolución |
| Web pequeña | 480 × 300 | Pantallas pequeñas mediante srcset/sizes |
| Miniatura web / Android | 192 × 120 | Navegación y previews |
| Android principal | 720 × 450 | Portadas y pieza seleccionada |

WebP con compresión 74–82 y remuestreo Lanczos. No se estiran imágenes ni se amplían recursos inferiores; no se utiliza blur para ocultar calidad. Los visores mantienen proporciones y contain. La web carga miniaturas con lazy loading y las piezas principales no seleccionadas se solicitan cuando se navega a ellas; las pruebas de red comprueban ese comportamiento.

- **Web:** 24 archivos, **785,706 bytes** en total para todas las resoluciones de las seis piezas; no se descargan todos de golpe.
- **Android:** 12 archivos, **183,512 bytes**. Las cuatro imágenes del catálogo anterior sumaban 621,104 bytes; el conjunto de imágenes referenciadas se reduce aproximadamente **70.5%**, incorporando más vistas. Esto describe recursos, no una medición de RAM o FPS en el teléfono.
- Sin nuevas dependencias de galerías ni caché: se utilizan React, Image nativo y los recursos ya presentes.
- Inventario exacto por archivo: `audit/portfolio-premium/image-budget.json`.
- Metadatos compartidos: `src/data/projectGallery.json`, copia idéntica en `mobile/src/data/projectGallery.json`.

## Pruebas

| Comprobación | Resultado |
| --- | --- |
| Unitarias web, incluidas identidad, procedencia, presupuesto de imágenes y producto próximo | **71/71** |
| Playwright completo, suites nuevas y existentes | **81/81**, sin fallos |
| Pruebas de galería tras ajustar foco de teclado | **6/6** |
| Web build final | Correcto |
| TypeScript Android | Correcto |
| Lint Android | Correcto |
| Pruebas móviles de dominio/SQLite | **19/19** |
| Exportación Android | Correcta; bundle Hermes y recursos |
| Fuentes protegidas | 57 archivos sin cambios |

Se verificaron galerías en 360/393/430/1440 px, PT/ES, con comprobaciones de accesibilidad en oscuro/claro, proporciones, imágenes cargadas y ausencia de desbordamiento. Las suites existentes comprueban además portada, contacto, herramientas, estados e Inteligência Digital.

## Release Android

Nueva APK: **`D:\Work\Curitiba-Proyect\mobile\dist\apk\loop-avante-2.0.0-portfolio-premium-release-arm-universal.apk`**.

| Propiedad | Resultado verificado en el archivo final |
| --- | --- |
| Peso | **50,042,951 bytes**, 50.04 MB decimales |
| Variante | Release autónoma; no depurable; sin APK complementaria/splits |
| ABI | **armeabi-v7a y arm64-v8a**, comprobadas en ZIP y cabeceras ELF |
| Bibliotecas nativas | **26 por ABI**, mismos nombres, ninguna dependencia ELF no resuelta |
| Android mínimo | **API 24 / Android 7.0**; targetSdk 36; compileSdk 37 |
| Identidad | `com.loopavante.mobile`, versión 2.0.0 / versionCode 2, conservados |
| Firma | V2 válida, mismo certificado de pruebas que las APK anteriores |
| Integridad | CRC de todo el ZIP y zipalign 16 KiB correctos |
| JavaScript | Hermes integrado, **2,621,824 bytes**; no necesita Metro ni Expo Go |
| Nuevos recursos | **Las 12 imágenes optimizadas coinciden por SHA-256 con sus entradas del APK** |
| Recursos antiguos | Ninguna de las cuatro imágenes originales del catálogo anterior está empaquetada |
| Contenido nuevo | El bundle contiene `ProjectGallery`, `UpcomingProduct`, Yoeldis Castillo y Cuentos Mágicos |
| Compilación local | Correcta en **12 min 9 s** |
| Instalación real | **Pendiente: ADB no detectó ningún dispositivo** |

SHA-256 del APK: `fd296979977fce24fa9e47c37ce142f5a4210f9436fafbd40e68b6d1f5342a12`.

Certificado SHA-256: `fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c`. Es la clave existente para pruebas internas; no se cambió la identidad de firma ni se publicó en tiendas.

Bundle SHA-256: `840f7b38fcfe5cf9141261cc303e53e606ed8b4520de5d8b13bfb89584795844`. Difiere del bundle anterior y se verificó su contenido nuevo: no se entrega una copia antigua renombrada.

La universal anterior pesaba 50,444,301 bytes; la nueva es **401,350 bytes más pequeña** pese a incorporar galerías y producto próximo. No se generó una Debug ni una segunda variante de entrega.

Informes: `mobile/dist/apk/inspection/loop-avante-2.0.0-portfolio-premium-release-arm-universal.json` y archivos de manifiesto/firma contiguos; contenido por hash en `audit/portfolio-premium/apk-portfolio-content.json`. Reproducción:

```powershell
cd mobile
./scripts/build-android-local.ps1 -Variant Release -Architectures 'armeabi-v7a,arm64-v8a'
Copy-Item -LiteralPath 'android/app/build/outputs/apk/release/app-release.apk' -Destination 'dist/apk/loop-avante-2.0.0-portfolio-premium-release-arm-universal.apk'
python scripts/inspect-android-apk.py dist/apk/loop-avante-2.0.0-portfolio-premium-release-arm-universal.apk --expect-abis 'armeabi-v7a,arm64-v8a'
cd ..
python scripts/check-portfolio-apk.py mobile/dist/apk/loop-avante-2.0.0-portfolio-premium-release-arm-universal.apk
```

El archivo es actualizable sobre una instalación con la misma identidad y firma sin desinstalar. No se pudo comprobar qué versión/firma tiene el teléfono. Ante conflicto de firma, no desinstalar ni borrar almacenamiento. Los datos de Expo Go y de una app autónoma pertenecen a instalaciones distintas y no se transfieren automáticamente.

## Archivos principales

- Datos: `src/data/content.js`, `src/data/projectGallery.json`, `mobile/src/data/catalog.ts`, `mobile/src/data/projectMedia.ts`, `mobile/src/data/projectGallery.json`.
- Web: `src/components/ProjectGallery.jsx`, `src/components/UpcomingProduct.jsx`, `src/sections/PortfolioSection.jsx`, `src/sections/ProjectCasePage.jsx`, `src/styles/portfolio-premium.css`, import en `assets/css/site.css`.
- Android: `mobile/src/components/cards/ProjectGallery.tsx`, `mobile/src/components/cards/UpcomingProduct.tsx`, `mobile/src/components/cards/catalog.tsx`, `mobile/src/app/(tabs)/projetos.tsx`, `mobile/src/app/project/[id].tsx`.
- Recursos: `public/media/projects/` y `mobile/assets/projects/gallery/`, seis vistas con variantes indicadas arriba.
- Preparación y verificación: `scripts/research-portfolio-premium.mjs`, `scripts/capture-portfolio-gallery.mjs`, `scripts/prepare-portfolio-gallery.py`, `scripts/check-portfolio-apk.py`.
- QA: `tests/portfolio-gallery.test.mjs`, `tests/portfolio-gallery-e2e.spec.js`, actualización del baseline utilizado por `tests/domain.test.mjs`; registros en `docs/audit/portfolio-premium/`.

## Evidencia y pendientes

- [Portafolio web con Cuentos Mágicos, escritorio](audit/portfolio-premium/projects-desktop.png).
- [Portafolio web, móvil ES/claro](audit/portfolio-premium/projects-mobile.png).
- [Galería La Huella Escrita](audit/portfolio-premium/gallery-huella-pt-1440.png).
- [Galería Yoeldis Castillo, móvil](audit/portfolio-premium/gallery-yoeldis-es-360.png).

Las capturas muestran la web real. Para capturar el visor completo se oculta únicamente el chrome flotante del sitio durante la captura. No se fabricaron capturas Android. El usuario confirmó previamente funcionamiento en dispositivo; esta nueva interfaz y la nueva APK requieren comprobación en el Redmi si no hay ADB autorizado disponible.

Pendiente real: instalar y abrir esta APK en el Redmi, explorar las tres imágenes de ambos proyectos, revisar Cuentos Mágicos, PT/ES, fuentes grandes, las cinco pestañas y persistencia de los datos existentes. La compilación/inspección no sustituye esa prueba. No se modificaron datos del teléfono ni se desinstaló nada.

No se publica una URL de descarga ni un enlace de Google Play. La nueva APK se entrega localmente y el CTA web de descarga continúa condicionado a una URL pública de Release previamente verificada y autorizada.
