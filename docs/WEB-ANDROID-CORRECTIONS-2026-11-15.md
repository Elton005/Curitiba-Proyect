# Correcciones conjuntas web y Android — 15 de noviembre de 2026

## Resultado

Se aplicaron las tres mejoras sobre los proyectos existentes: identidad Yoeldis Castillo, tarjetas de portafolio Android compactas y una única presentación web del aplicativo centrada en Loop Ação. Sin dependencias nuevas, reconstrucción de arquitectura, push ni despliegue.

Las calculadoras, navegación Android, configuración Expo/RN y almacenamiento SQLite se conservaron. Un control de hashes protege **57 archivos** existentes de código/configuración, entre ellos navegación, proveedores, almacenamiento, acciones y cálculo de Inteligência Digital.

El usuario confirmó que la aplicación anterior funciona en un dispositivo real. Durante esta corrección `adb devices -l` no mostró dispositivos: **no se probó la nueva interfaz en el Redmi**, ni se obtuvieron capturas Android. Las comprobaciones de compilación no se presentan como validación del teléfono.

## 1. Identidad consistente

- Nombre visible: **Yoeldis Castillo** en `src/data/content.js` y `mobile/src/data/reference.json`. Inicio, portafolio, estudio de caso, tarjetas nativas, detalles y etiquetas que consumen esos datos reciben el nombre corregido.
- Títulos y descripciones PT/ES en `src/data/pages.js`; se regeneraron los documentos HTML del portafolio y caso individual. Incluyen title, description, Open Graph, Twitter y noscript. El metadato dinámico utiliza las mismas definiciones.
- Se conservan ID `yoeldis`, ruta `/projetos/yoel-dis-castillo/` y su variante `/es/`. No se necesita redirección porque no se cambió ninguna ruta pública.
- Se conserva exactamente el enlace existente `https://www.yoeldiscastillo.com/`, del dominio `yoeldiscastillo.com`. Sin URL inventada ni cambio de dominio.
- Comprobación HTTP HEAD con seguimiento de redirecciones: Yoeldis Castillo y La Huella Escrita respondieron **200**, manteniendo sus URL. Registro: `audit/portfolio-promo/external-links.json`.
- Búsqueda final: sin “Yoel Dis” / “YoelDis” incorrectos en las fuentes activas web/Android ni en los HTML públicos. Los registros JSON históricos de auditorías anteriores conservan los textos realmente observados entonces; los tests incluyen variantes incorrectas como casos negativos. Las rutas heredadas siguen siendo deliberadamente las originales.

## 2. Portafolio Android

Las portadas originales son **capturas de interfaces de 1440 × 1000 px**, no retratos que deban ampliarse para llenar la tarjeta. Se conservan todos los archivos originales.

La implementación de Image en RN 0.88 asigna dimensiones intrínsecas desde el recurso antes de aplicar el estilo. Definir solo ancho y aspectRatio no elimina una altura de recurso ya definida. Se sustituyó esa dependencia por un marco View que determina el tamaño; la imagen interior tiene posición absoluta y ancho/alto del **100% del marco**.

- Lista: proporción preferida **16:10**, máximo **240 dp** y `contain` para mostrar la interfaz completa.
- Cabecera del detalle: mismo tratamiento, máximo **320 dp**. La galería vertical existente y la navegación a detalles/sitio público se conservan.
- Sin estirar, recortar información esencial, alterar imágenes originales ni utilizar su altura en píxeles como altura de tarjeta.
- Nombre, categoría y descripción mantienen altura flexible y escalado de fuente. Sin truncado de texto por número de líneas. Acceso “Ver projeto / Ver proyecto”, flecha, ripple en primer plano, borde y opacidad al pulsar.
- Etiqueta accesible con nombre, categoría y descripción; hint para abrir detalles. Se utiliza la paleta existente, incluido el tema oscuro.

Medidas **previstas por el estilo**, considerando padding de pantalla de 20 dp a cada lado y borde de tarjeta de 1 dp; no son mediciones tomadas del Redmi:

| Pantalla | Ancho del marco | Alto previsto de portada |
| --- | ---: | ---: |
| 360 dp | 318 dp | 198.75 dp |
| 393 dp | 351 dp | 219.38 dp |
| 430 dp | 388 dp | 240 dp, limitado desde 242.5 |

Pendiente en teléfono: revisar esos anchos y fuentes grandes con PT/ES, ambos proyectos, galería, Atrás, las cinco pestañas y barra del sistema. El código de navegación y barras no se modificó.

## 3. Loop Ação en la web

Se integra en `MobileAppSection`, conservando `#aplicativo` y su posición después de capacidades/portafolio, antes del cierre comercial. No se añadió una segunda sección del aplicativo.

Presentación oscura con acento menta, composición editorial, teléfono construido con componentes de interfaz, progreso ilustrativo coherente de 3/12 = 25% y tres beneficios: planificar mejoras, seguir progreso y registrar logros. Los textos PT/ES describen funciones implementadas: diagnóstico/plan de 30 días, tareas, prioridades, fechas, historial, notas, fotos y recordatorios locales voluntarios. Sin promesas de resultados ni de entrega puntual de recordatorios.

Se contrastó el contenido con las pantallas `plano.tsx`, `task/[id].tsx`, diagnóstico, repositorio y notificaciones locales. Se comunica almacenamiento en el dispositivo y uso sin crear una cuenta, coherente con la implementación.

**La imagen del teléfono es conceptual**, señalada tanto arriba como en el pie: no se presenta como una captura auténtica del APK. No se fabricaron capturas Android. Se conservó también el enlace de información de acceso y su transferencia al briefing existente.

## 4. Descarga: pendiente de URL pública

No hay una URL pública de APK configurada o verificable en los ajustes disponibles: no existe archivo de entorno con esa configuración y las variables del proceso están vacías. Las APK locales anteriores no constituyen una URL HTTPS de distribución.

El CTA principal actual es **“Conhecer o Loop Ação / Conocer Loop Ação”**, hacia `#loop-acao`, con foco y desplazamiento al contenido. No aparece un botón de descarga ficticio, Google Play ni rutas Windows.

Configuración documentada en `.env.example`:

```dotenv
VITE_APP_DOWNLOAD_URL=
VITE_APP_DOWNLOAD_RELEASE_VERIFIED=false
```

La URL por sí sola no habilita la descarga. Cuando exista una publicación autorizada, comprobar accesibilidad HTTPS pública y analizar el APK exacto: Release no depurable, identidad/firma correctas, ABI, SDK y JavaScript integrado; después registrar esa verificación mediante el flag. El flag es una declaración de esa revisión, **no un análisis automático del binario**. El validador además rechaza archivos locales, hosts privados, credenciales, HTTP, APK Debug/desarrollo y AAB.

Con URL válida y flag `true`, aparecen “Baixar Loop Avante para Android”, el enlace secundario para conocer la función y unas instrucciones breves de instalación que identifican el host y mantienen las protecciones Android activadas. No se subió ninguna APK ni se realizó una publicación para habilitar este estado.

## 5. Pruebas y compilación

| Comprobación | Resultado |
| --- | --- |
| Unitarias web | **68/68** |
| Playwright completo, incluyendo pruebas existentes | **75/75**, 5.9 min |
| Nuevas pruebas Playwright de identidad/promoción | **7/7**, incluidas en las 75 |
| Web `npm run build` | Correcto, 28 entradas localizadas y dos páginas de error |
| Mobile `npm run typecheck` | Correcto |
| Mobile `npm run lint` | Correcto |
| Tests móviles de dominio y SQLite | **19/19** |
| Mobile `npm run export:android` | Correcto, bundle Hermes y recursos en `mobile/dist/android/` |
| Control de código protegido | **57 archivos sin cambios** |
| Sección web responsive | **20 capturas**, 360/393/430/768/1440 px × PT/ES × oscuro/claro, sin desbordamiento ni errores JS |
| Texto web al 200% | Correcto a 360/393/430 px |
| Accesibilidad | Axe sin incidencias en los casos comprobados; incluye portada/portafolio y ambas traducciones/temas |
| Instalación/arranque Android después de los cambios | No ejecutados; ADB sin dispositivo |

El bundle Android exportado mide **3,166,402 bytes** y tiene cabecera Hermes válida. Su tabla de cadenas contiene `ProjectMedia` y `Yoeldis Castillo`, y no contiene el nombre anterior separado. Se verificó el artefacto exportado, no solo el código fuente.

El test antiguo que exigía ausencia de `mobile/` fallaba **antes de esta corrección**, pues pertenecía a otra misión anterior a Mobile 2.0. Se conservó el control con un alcance actualizado: compara hashes de los 57 archivos actuales que este trabajo debe proteger. No se borraron suites ni pruebas existentes. El fallo inicial está en `audit/portfolio-unit-baseline.log`.

En las primeras pruebas se observaron lentitud de Vite por vigilar las herramientas Android y un desbordamiento de la composición a 360 px con texto al 200%. Se excluyeron de vigilancia mobile/cachés/salidas de auditoría y se corrigieron mínimos de ancho del grid. Las pruebas se repitieron tras esas correcciones; la suite completa final está correcta.

## 6. Evidencia visual

- [Antes, sección web a 1440 px](audit/portfolio-promo/before-pt-dark-1440.png).
- [Después, sección web PT oscuro a 1440 px](audit/portfolio-promo/after-pt-dark-1440.png).
- [Después, sección web ES claro a 360 px](audit/portfolio-promo/after-es-light-360.png).
- Matriz y medidas: `audit/portfolio-promo/after.json`; log completo: `audit/portfolio-promo/full-e2e.log`; informe Playwright: `audit/playwright-results.json`.

Las capturas finales muestran la sección web real, ocultando solo el header flotante y skip-link durante la captura de ese elemento alto para evitar artefactos de composición del navegador. No se ocultan elementos en el producto ni se modifican esas imágenes después. El marco de teléfono que forma parte de la sección sigue siendo una representación conceptual. No hay capturas nativas antes/después. La vista integrada del entorno no estuvo disponible; las capturas y pruebas se ejecutaron con Edge headless mediante Playwright.

## 7. Archivos editados o añadidos

| Área | Archivos |
| --- | --- |
| Identidad y SEO | `src/data/content.js`, `src/data/pages.js`, `mobile/src/data/reference.json` |
| HTML regenerados con el nombre correcto | `projetos/index.html`, `projetos/yoel-dis-castillo/index.html`, `es/projetos/index.html`, `es/projetos/yoel-dis-castillo/index.html` |
| Portafolio Android | `mobile/src/components/cards/ProjectMedia.tsx` (nuevo), `mobile/src/components/cards/catalog.tsx`, `mobile/src/app/project/[id].tsx` |
| Presentación web | `src/sections/MobileAppSection.jsx`, `src/data/translations.js`, `src/styles/loop-action.css` (nuevo), import en `assets/css/site.css` |
| Descarga | `src/data/config.js`, `src/utils/contact.js`, `.env.example` |
| Servidor local | `vite.config.js`, exclusiones de vigilancia sin cambios de despliegue |
| Pruebas | `tests/portfolio-promo.test.mjs` y `tests/portfolio-promo-e2e.spec.js` (nuevos), guard actualizado en `tests/domain.test.mjs` |
| QA | `scripts/qa-portfolio-promo.mjs` (nuevo), baseline protegido y capturas/logs bajo `docs/audit/portfolio-promo/` |
| Documentación actual | `README.md`, `mobile/README.md`, este informe |
| Corrección del nombre en documentación descriptiva existente | `docs/FINAL-REPORT.md`, `docs/INTELLIGENCE-QA.md`, `docs/LOOP-AVANTE-3.1-REPORT.md`, `docs/RESEARCH.md`, `docs/REVIEW-REPORT.md`, `mobile/docs/MOBILE-2.0-QA.md` |

Había trabajo previo sin commit en el repositorio. Se respetó y no se realizó commit, push ni despliegue. Los archivos de salida de las herramientas de QA se generaron localmente.

## 8. ¿Hace falta una APK nueva?

**Para una instalación autónoma, sí:** las APK anteriores conservadas no incorporan estos cambios de JavaScript. No se generó otra APK en esta corrección. La exportación Android comprueba el bundle, pero no es una APK ni sustituye una prueba real de instalación/arranque.

**Para Expo Go 58 basta recargar el proyecto**. No se añadieron módulos nativos ni se cambió Expo/RN; no hace falta prebuild para estas modificaciones. Los datos existentes de Loop Ação se mantienen porque no se alteraron SQLite, migraciones, identificador de app ni proveedores.

Cuando se necesite el APK actualizado, el script existente mantiene la compilación Release ARM32 + ARM64:

```powershell
cd mobile
./scripts/build-android-local.ps1 -Variant Release -Architectures 'armeabi-v7a,arm64-v8a'
```

Conservar la clave y el package ID para actualizar sin desinstalar. Tras compilar, repetir la inspección del APK final y la validación en el Redmi. No se declara que esa instalación se haya realizado aquí.
