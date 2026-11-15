# Inteligência Digital — seguimiento

Inicio: 14/11/2026. Alcance: frontend React/Vite local, sin publicación, push, backend ni cambios en mobile. Estado Git inicial registrado en `docs/audit/intelligence/initial-git-status.txt`; copia recuperable en `.local/intelligence/before-intelligence.zip`.

## Plan y aceptación

| Fase | Entrega verificable | Estado |
| --- | --- | --- |
| A | Rutas PT/ES, componentes analíticos comunes, contexto anónimo versionado y compatible con cotizador | Implementado |
| B | Catálogo oficial local, filtros respaldados, comparaciones válidas, fuentes y CSV seguro | Implementado, 119 observaciones |
| C | Simulador original preservado, avanzado, costes, contribución, sensibilidad y tres escenarios editables | Implementado |
| D | Productividad, adopción, tiempo negativo permitido, valor de capacidad y costes separados | Implementado |
| E | Inversión, pérdidas, ROI definido, recuperación aplicable y flujo 6/12/24 meses | Implementado |
| F | Siete perfiles comerciales con correspondencias estadísticas explícitas, sin cifras inventadas | Implementado |
| G | Informe parcial/completo con hipótesis, fuentes, recomendaciones y A4 imprimible | Implementado, PDF real revisado |
| H | Centro de producto, navegación, transferencia al cotizador sin datos personales | Implementado, recorrido probado |
| I | Build, tests, rutas, siete anchos, ambos temas/idiomas, accesibilidad, impresión, rendimiento e inventario mobile | Verificado; informe y límites documentados |

## Decisiones

- Se mantiene `/simulador/` como única ruta del modelo comercial; no se crea un duplicado indexable.
- Datos oficiales versionados y calculadoras deterministas; sin scraping del navegador ni servicios de IA.
- El estado analítico guardará identificadores y números limitados, nunca nombres, correos, teléfonos o texto libre.
- La exportación del informe será HTML con impresión/guardar como PDF, etiquetada con precisión. La producción de un PDF durante QA será solo una verificación del formato, no una promesa de descarga directa.
- El reporte no inferirá ahorro de caja a partir de horas liberadas ni importará ese valor como beneficio de inversión sin confirmación explícita del visitante.

## Auditoría inicial

Arquitectura híbrida existente, tema oscuro inicial, PT/ES, módulos por ruta resueltos antes del montaje para evitar CLS, cálculo básico y diagnóstico probados. Estado previo conservado; configuración de contacto no se alterará.

`mobile/` no estaba presente al inicio de esta misión. Su ausencia se registra en `docs/audit/intelligence/mobile-initial.json`; el baseline histórico se conserva, sin atribuirle hashes actuales inexistentes. No se recreó ni modificó ese directorio.

## Validación realizada

- `npm ci` y build correctos; 22 documentos y dos 404.
- 58 pruebas de dominio correctas, incluidos contratos de estado y definiciones E2C distintas.
- Suite completa: **61/61 pruebas de navegador**, 0 fallos, omitidas o flaky. **50 análisis axe** sin violaciones entre superficies anteriores y nuevas. Tras corregir una etiqueta anual: 2/2 regresiones adicionales y 14/14 capturas de productividad.
- Barrido nuevo: **98 capturas** en siete anchos, PT oscuro y ES claro; las páginas corporativas conservan su barrido de 390/768/1440 px.
- Informe completo real impreso en A4: nueve páginas finales, cinco gráficas y siete referencias de variables. Renderizado y revisado visualmente; ninguna interfaz de navegación impresa.
- Smoke de build: 22 rutas HTTP 200, enlaces y fragmentos internos válidos, sin errores de consola ni desbordamiento; CLS 0 en muestras de laboratorio.

Informe final y límites: [docs/INTELLIGENCE-QA.md](docs/INTELLIGENCE-QA.md). Evidencias de estado, dominio, navegador, impresión, bundles y producción en `docs/audit/intelligence/`; capturas y PDF de ejemplo en `.local/intelligence/`. No se hizo commit, push ni publicación.
