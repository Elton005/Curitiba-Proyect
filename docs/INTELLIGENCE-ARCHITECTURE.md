# Inteligência Digital — arquitectura

Implementación local React/Vite sobre la identidad existente. No añade backend, scraping del visitante, registro ni dependencias de ejecución. Mantiene la portada, proyectos, diagnóstico, cotizador y app independientes.

## Rutas y composición

`src/data/pages.js` es el registro único: catorce páginas en PT y ES, **28 documentos** y dos 404. El simulador comercial conserva exclusivamente `/simulador/`; no existe `/inteligencia/comercial/`. Las seis nuevas rutas son `/inteligencia/`, `/inteligencia/mercado/`, `/inteligencia/produtividade/`, `/inteligencia/investimento/`, `/inteligencia/setores/` y `/inteligencia/relatorio/`, más sus equivalentes `/es/`.

`scripts/create-pages.mjs` genera títulos, descripciones, Open Graph, idioma, oscuro antes de React e introducción sin JavaScript. `scripts/seo-plugin.js` deriva normalización, canonical, hreflang y sitemap del mismo registro. La configuración pública real sigue pendiente: no se inventa dominio, teléfono o canal de envío.

`src/main.jsx` resuelve el módulo de la ruta antes de montar React. Las páginas analíticas se cargan por demanda desde `pageModules.js`. El catálogo, cálculos y agregación del informe quedan fuera del código inicial de la portada. `AnalyticsUI.jsx` comparte navegación, paneles, campos, KPIs, estados vacíos, tablas, barras, curvas SVG y metodología desplegable. `intelligence.css` utiliza los tokens navy/menta, superficies, Jakarta Sans y ambos temas existentes.

## Estado anónimo

`loop-intelligence-v1`, en `sessionStorage`, tiene esquema versión 1 y límite de 32.768 caracteres serializados. Conserva exclusivamente filtros e IDs oficiales, ID de perfil, números de calculadoras, marcas explícitas de inclusión y hasta tres posiciones de escenario. El saneador elimina claves desconocidas, texto libre, nombres de procesos y contactos. Los nombres de escenarios son tres etiquetas traducibles: conservador, base y optimista.

Los borradores numéricos vacíos o fuera de rango siguen editables para mostrar errores sin borrar otras hipótesis. Un borrador inválido no produce un resultado ni entra en el informe. Seleccionar un sector constituye su inclusión; las calculadoras requieren «Adicionar ao relatório». Guardar un escenario también lo hace disponible para el informe, identificado por su posición. Las selecciones de mercado son observaciones canónicas, máximo 32.

`useSessionState` conserva la escritura sincrónica antes de enlaces nativos y sincroniza `pageshow`, permitiendo atrás/adelante entre documentos sin restaurar elecciones antiguas. No añade datos a URLs. Si el almacenamiento no está disponible, la página actual funciona en memoria; la continuidad entre documentos depende de almacenamiento de sesión disponible.

La migración recupera las hipótesis del simulador anterior; un borrador antiguo no se convierte en resultado elegido. Un contexto de simulador previamente transferido al cotizador sí puede incorporarse como escenario utilizado. El diagnóstico se reconstruye solamente cuando sus ocho respuestas válidas y marca de finalización están presentes. Se mantienen las claves anteriores, las funcionalidades del cotizador y su contrato de servicios.

## Informe y cotizador

`buildIntelligenceReport` agrega únicamente módulos elegidos y válidos. No rellena módulos ausentes con ejemplos predeterminados. Las recomendaciones son reglas deterministas, acotadas y vinculadas a IDs de soluciones existentes. Los perfiles comerciales son orientación editorial y no equivalencias estadísticas exactas.

El informe HTML contiene contexto, módulos utilizados/no evaluados, observaciones con base, hipótesis, escenarios, gráficos, límites, recomendaciones y fuentes. La impresión A4 fuerza blanco y contraste alto, oculta controles, repite cabeceras y limita cortes. El botón se llama «Imprimir / Salvar como PDF»: abre impresión del navegador; no promete una descarga PDF directa.

La transferencia al cotizador guarda un marcador anónimo `{kind:'intelligence',version:1}` y los servicios elegidos. El cotizador reconstruye un resumen localizado desde los datos válidos de sesión. Su descripción, nombre y contacto permanecen en memoria; no se copian al contexto analítico. El resumen de texto se acota para respetar la descripción existente; el informe conserva el detalle completo.

## Datos y motores

El catálogo oficial versionado conserva 119 observaciones y tres denominadores distintos. Las comparaciones son marginales dentro de la misma variable/año/base. Los filtros solo ofrecen valores respaldados por las otras selecciones; un estado incompatible recuperado muestra «dados não disponíveis». El CSV exporta las filas filtradas canónicas y neutraliza fórmulas de hoja de cálculo.

Los motores puros validan unidades, finitud y límites; no redondean internamente. La capacidad de tiempo no se trata como caja. Para sustituir el beneficio de inversión por una parte de capacidad se exige importe explícito, confirmación y un máximo igual al valor teórico positivo. No se suma dos veces. Véanse [cálculos](INTELLIGENCE-CALCULATIONS.md) y [fuentes](INTELLIGENCE-DATA-SOURCES.md).

## Límites del entorno

`mobile/` ya estaba ausente en el inventario inicial de esta misión. Se conserva el baseline histórico y se añade `docs/audit/intelligence/mobile-initial.json`, sin recrear ni modificar esa aplicación. No se ha publicado ni hecho push.


Extensión 3.1: Soluções y dos estudios de caso PT/ES, ResultInsights y sectorAssessment (versión 1 aditiva, respuestas q0-q3 de tres opciones). El cotizador excluye hipótesis económicas salvo inclusión voluntaria y conserva las necesidades declaradas sin datos personales.
