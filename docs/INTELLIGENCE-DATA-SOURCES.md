# Inteligência Digital — fuentes y catálogo de mercado

Catálogo local versión **1**, verificado el **14/11/2026**. Implementación: `src/data/intelligence/market.js`. Contiene **119 observaciones**: siete variables y 17 filas oficiales por variable. No se realiza scraping ni una consulta a Cetic.br desde el navegador del visitante.

## Población, fechas y metodología

Fuente institucional: **NIC.br / Cetic.br, TIC Empresas 2025**. Año de referencia: **2025**. Publicación: **2026**. La presentación oficial se publicó el **15 de junio de 2026**.

La población investigada son empresas brasileñas activas con **10 o más personas ocupadas**, en los sectores cubiertos por el estudio. La muestra general fue de **4.174 empresas respondentes**, con entrevistas telefónicas entre febrero de 2025 y enero de 2026. Esa muestra general no se asigna a cada región, tamaño, sector o subpoblación de vendedores. [Metodología oficial, página 6 del PDF](https://cetic.br/media/analises/TIC-Empresas-2025-lancamento.pdf).

No se extrapola a todos los MEI, empresas informales ni negocios de menos de diez personas. Las cifras describen adopción o uso declarado; no demuestran causalidad, aumento de ventas ni resultados de clientes de Loop Avante.

## Variables y universos

Todos los valores son porcentajes (`%`). La fecha de consulta de cada registro es 14/11/2026. Los nombres comerciales de las herramientas no modifican las definiciones estadísticas.

| ID de variable | Código oficial y fuente | Medición y columna consultada | Denominador |
| --- | --- | --- | --- |
| `website` | [B6](https://cetic.br/pt/tics/pesquisa/2025/empresas/B6/expandido/) | Tenían website; columna **Sim**. | Empresas con acceso a Internet. |
| `social` | [B13A](https://cetic.br/pt/tics/pesquisa/2025/empresas/B13A/expandido/) | Perfil o cuenta propios en alguna red social; columna **Sim**. | Empresas con acceso a Internet. |
| `messagingPresence` | [B13B](https://cetic.br/pt/tics/pesquisa/2025/empresas/B13B/expandido/) | Perfil o cuenta en **WhatsApp o Telegram**. | Empresas con acceso a Internet. |
| `crm` | [G3](https://cetic.br/pt/tics/pesquisa/2025/empresas/G3/expandido/) | Usaron una aplicación CRM para gestionar información de clientes durante los últimos doce meses; columna **Sim**. | Total de empresas de la encuesta. |
| `salesWebsite` | [E2C](https://cetic.br/pt/tics/pesquisa/2025/empresas/E2C/expandido/) | Utilizaron el website de la empresa como canal de venta durante los últimos doce meses. | Empresas que vendieron por Internet. |
| `salesMessaging` | [E2C](https://cetic.br/pt/tics/pesquisa/2025/empresas/E2C/expandido/) | Venta mediante mensajes de **WhatsApp, Skype o chat de Facebook**. | Empresas que vendieron por Internet. |
| `salesSocial` | [E2C](https://cetic.br/pt/tics/pesquisa/2025/empresas/E2C/expandido/) | Venta mediante redes sociales como Facebook, Instagram o Snapchat. | Empresas que vendieron por Internet. |

El total de `messagingPresence` y el de `salesMessaging` coinciden numéricamente en **79%**, pero miden fenómenos y poblaciones distintos. No se comparan como si fueran la misma medición. B13B no mide ventas y E2C no mide presencia general en mensajería.

En B13B y E2C una empresa puede señalar más de un canal. Los porcentajes no se suman para producir un total. En B6 las demás respuestas incluyen **No**, **No sabe** y **No respondió**; el complemento de 56% no se publica como un único porcentaje de empresas sin website.

## Valores cargados

Cada celda siguiente equivale a una observación independiente con el año, unidad, fecha, fuente y denominador de su columna descritos arriba. Los registros individuales también conservan esos metadatos en el recurso local. Las filas son **marginales**: no existen cruces región × tamaño × sector en este catálogo.

| Recorte oficial | B6 website | B13A redes | B13B presencia mensajería | G3 CRM | E2C venta website | E2C venta mensajes | E2C venta redes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Brasil — total | 56 | 90 | 79 | 31 | 32 | 79 | 40 |
| 10–49 personas ocupadas | 53 | 90 | 79 | 29 | 30 | 81 | 42 |
| 50–249 personas ocupadas | 76 | 92 | 75 | 41 | 49 | 74 | 28 |
| 250 o más personas ocupadas | 87 | 95 | 74 | 56 | 53 | 54 | 26 |
| Norte | 36 | 90 | 78 | 31 | 17 | 81 | 45 |
| Nordeste | 43 | 91 | 80 | 32 | 25 | 80 | 49 |
| Sudeste | 62 | 90 | 77 | 32 | 33 | 77 | 36 |
| Sur | 59 | 92 | 81 | 30 | 39 | 83 | 39 |
| Centro-Oeste | 46 | 88 | 78 | 26 | 35 | 82 | 49 |
| Industria manufacturera | 62 | 89 | 77 | 29 | 34 | 84 | 32 |
| Construcción | 61 | 83 | 67 | 25 | 30 | 68 | 29 |
| Comercio y reparación de vehículos | 44 | 92 | 83 | 31 | 27 | 85 | 47 |
| Transporte, almacenamiento y correo | 50 | 78 | 64 | 22 | 34 | 64 | 21 |
| Alojamiento y alimentación | 51 | 95 | 82 | 23 | 37 | 73 | 44 |
| Información y comunicación | 90 | 98 | 85 | 63 | 60 | 72 | 45 |
| Actividades inmobiliarias, profesionales, científicas, técnicas, administrativas y servicios complementarios | 72 | 90 | 77 | 37 | 38 | 71 | 39 |
| Artes, cultura, deporte, recreación y otras actividades de servicios | 61 | 97 | 90 | 41 | 36 | 85 | 43 |

El catálogo conserva los nombres oficiales completos en portugués y su traducción española. Las abreviaciones de esta tabla no crean nuevas categorías.

## Márgenes, muestra y comparabilidad

- `marginOfError` y `sampleSize` son `null` en cada observación: no se extrajeron estimaciones de error o tamaños de muestra por celda de las tablas consultadas. No se inventa un margen general ni se reparte 4.174 entre los recortes.
- Solo se habilita **2025**, porque es el año verificado en esta carga. La documentación de Cetic.br contiene otras ediciones; no se presentan como si estuvieran cargadas o verificadas aquí.
- No se calculan totales nacionales mediante medias regionales o sectoriales. Se usa siempre la fila **TOTAL** oficial.
- Las comparaciones de regiones o tamaños mantienen la misma variable, año, unidad y definición de base. No se mezclan dos dimensiones en una misma comparación ni se mezclan variables y recortes a la vez.
- B6, B13A y B13B pueden compartir un gráfico cuando el recorte es idéntico, porque comparten la definición de base de empresas con Internet. G3 y E2C pertenecen a bases separadas y se mantienen separados.
- Una combinación como **Norte + Comercio** no tiene observación en estas tablas marginales y devuelve una lista vacía. La interfaz debe mostrar “Dados não disponíveis” / “Datos no disponibles”, sin estimar el valor.
- Los sectores comerciales de Loop Avante no equivalen automáticamente a la clasificación oficial. En particular, alimentación incluye alojamiento y otras actividades de servicios no es una medición exclusiva de salones de belleza.

## Diferencia entre versiones de una fuente

La presentación de lanzamiento muestra 80% en el gráfico nacional E2C de venta por mensajes, mientras la tabla HTML E2C consultada muestra **79%**. También hay diferencias menores en otros valores del gráfico. Este catálogo usa **la tabla HTML oficial consultada**, sin promediar cifras, mezclar versiones ni atribuir una causa no confirmada a la diferencia. El PDF se utiliza para la metodología y la población, no como origen de las celdas cargadas.

B13A en portugués no abrió mediante una representación del buscador, pero la URL PT respondió HTTP 200 mediante solicitud directa y su tabla se contrastó con la [página oficial en español](https://cetic.br/es/tics/pesquisa/2025/empresas/B13A/). No hay datos pendientes inventados a partir de ese fallo de una herramienta.

## Documentación Sebrae consultada

Se consultaron fuentes institucionales adicionales, sin añadir sus valores al catálogo de porcentajes de adopción de Cetic.br:

- [Perspectivas digitales de pequeños negocios, ASN Sebrae, 24/06/2026](https://agenciasebrae.com.br/dados/pequenos-negocios-focam-em-vendas-com-ferramentas-digitais-e-contrastam-com-medias-e-grandes-empresas/).
- [Pesquisa de Maturidade Digital dos Pequenos Negócios 2026, ASN Sebrae](https://agenciasebrae.com.br/dados/maturidade-digital-dos-pequenos-negocios-brasileiros-cresce-10-em-dois-anos/).

Son estudios o constructos distintos —prioridades declaradas o madurez digital— y no se convierten en porcentajes equivalentes de adopción ni se fusionan con los universos de TIC Empresas. Se conserva esta distinción en lugar de completar filtros con datos heterogéneos.

## Contrato del recurso local

Exportaciones de `src/data/intelligence/market.js`:

- `marketCatalog`: versión, estudio, fecha, población, metodología y límites.
- `indicatorDefinitions`: siete variables con código oficial, etiqueta PT/ES, base, definición, notas y URL.
- `denominators`: `internet`, `enterprises`, `onlineSellers`, con etiquetas y definiciones PT/ES.
- `dimensions`: arrays `year`, `region`, `size`, `sector`; cada opción tiene `{id,label:{pt,es}}`.
- `observations`: los 119 registros locales, con todos los campos de procedencia.
- `defaultMarketFilters`: `{indicatorId:'website',year:2025,region:'all',size:'all',sector:'all'}`.
- `filterObservations(filters)`: los filtros omitidos, `any` o `*` son comodines; `all` en región/tamaño/sector significa la fila agregada oficial. `indicatorId:'all'` reúne variables; `indicator:'B6'` permite filtrar por código oficial.
- `getAvailableFilters(filters)`: opciones que tienen observaciones compatibles, variando una dimensión cada vez.
- `sanitizeMarketFilters(value)`: conserva solo campos y opciones reconocidos, sin copiar datos privados.
- `getComparisonObservations(indicatorId, dimension, year)`: marginales verificadas de `region`, `size` o `sector`.
- `comparisonStatus(rows)` / `canCompareObservations(rows)`: guardas explícitas de comparabilidad, sin promediar ni sumar porcentajes.
- `dimensionLabel(field,id,language)`: etiqueta del recorte.
- `safeCsvCell(value)` y `observationsToCsv(rows,language)`: CSV con columnas legibles, fuente y universo; neutraliza inicios de fórmula y exporta solamente IDs canónicos, ignorando registros inexistentes o alterados. El llamante puede añadir BOM UTF-8 al descargar.

Los datos no contienen nombres, teléfonos, correos, textos privados ni resultados comerciales de clientes. Las hipótesis de calculadoras no pertenecen a este catálogo y deben mostrarse como **Simulação ilustrativa**, separadas de **Dados de mercado**.

## Pruebas ejecutadas

`node --test tests/intelligence-market.test.mjs`: **7/7** correctas. Cubre procedencia y valores, totales nacionales, marginales, filtros sin datos, opciones válidas, bases separadas, CSV canónico y prevención de fórmulas ejecutables.
