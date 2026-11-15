# Prompt de referencia: migración visual de Loop Avante a React

## Cómo usar este documento

Copia el bloque **“Prompt para la migración”** y úsalo cuando se vaya a implementar la migración. La referencia que debe prevalecer es la versión actual del proyecto y sus recursos en `assets/`; este documento describe su intención visual y comportamiento visible, no autoriza a rediseñarlo.

---

## Prompt para la migración

Actúa como desarrollador/a frontend senior con experiencia en React, diseño responsive y accesibilidad. Migra la interfaz existente de **Loop Avante** a React, conservando su identidad visual, contenido, comportamiento y recursos. El objetivo es que la aplicación migrada se perciba como la misma web, no como una reinterpretación.

### 1. Antes de implementar

1. Revisa la estructura, configuración, dependencias y scripts actuales del repositorio. Confirma cuál es el punto de entrada, cómo se sirve la página y qué herramientas de build ya existen. No reemplaces ni añadas infraestructura sin necesidad.
2. Usa como fuente de verdad la página actual (`index.html`), sus estilos (`assets/css/site.css`), comportamiento (`assets/js/site.js`) y archivos existentes en `assets/img/`. Consulta esos archivos para recuperar el texto completo en español/portugués, los datos, los enlaces, las imágenes, los estados y las reglas de responsive.
3. La página ya tiene contenido bilingüe y numerosos datos de interfaz generados desde JavaScript. No descartes ni resumas esos datos al separar la UI en componentes.
4. No inventes secciones, testimonios, resultados, precios, funciones, marcas ni imágenes. No elimines textos legales o avisos que distinguen demostraciones ficticias de trabajos reales.
5. No hagas cambios de alcance ajeno a la migración visual. Si detectas referencias a recursos inexistentes, verifica primero el inventario real de `assets/img/`; conserva el fallback visual y no sustituyas esos recursos por invenciones.

### 2. Objetivo visual y personalidad

La marca presenta soluciones digitales para comercios locales de Curitiba. Su lenguaje visual debe sentirse **cercano, actual, claro, profesional, optimista y práctico**: tecnología accesible para negocios reales, sin una estética corporativa fría ni promesas exageradas.

- Prioriza una composición editorial despejada, bloques amplios, titulares contundentes y una lectura fácil de escanear.
- Usa imágenes fotográficas de comercios y dispositivos para dar contexto; el contenido y las llamadas a la acción deben seguir siendo legibles sobre ellas.
- Alterna fondos de sección con cambios suaves de tono, no con bordes o divisores pesados.
- Mantén la estética consistente entre botones, filtros, tarjetas, cifras, formularios, navegación e idioma.
- Conserva los textos y énfasis actuales. Los titulares pueden tener una parte destacada en verde, como “sin límites”.

### 3. Sistema visual

#### Tipografía

- Usa **Plus Jakarta Sans** como fuente principal; conserva una familia de reserva `system-ui, sans-serif`.
- Mantén una jerarquía marcada: titulares pesados (peso 800), texto de lectura regular y etiquetas/categorías en negrita.
- Los encabezados tienen interlineado compacto, márgenes controlados y espaciado negativo moderado entre letras.
- Las etiquetas de sección son pequeñas, en mayúsculas, con tracking amplio y peso 700.
- Evita que la tipografía, especialmente el titular del hero y los precios, desborde o produzca scroll horizontal en móviles.

#### Colores y temas

Mantén ambos esquemas y los contrastes correspondientes. La web actual sigue `prefers-color-scheme`; en tema claro emplea como referencia:

- Fondo principal cálido marfil: `#fffaf1`.
- Texto principal azul noche: `#11172d`.
- Texto secundario: `#596579`.
- Superficies blancas: `#ffffff`; alternancia verdosa muy pálida: aproximadamente `#f1f7ee`.
- Verde de acción oscuro: `#078e69`; verde/acento vivo: `#13a97c`.
- Verde claro para franjas o superficies destacadas: aproximadamente `#e4f5eb` / `#e2f3e8`.
- Amarillo cálido de apoyo en los degradados: `#ffd16a`.
- Footer oscuro: `#10172d`.

En tema oscuro, cambia coordinadamente fondos, superficies, bordes y texto (no solo el fondo general): fondo aproximado `#10172d`, superficie `#19233b`, texto `#eef2fb`, texto secundario `#aab7cd`, bordes `#2d3b56` y verde accesible `#43c99b`. Conserva las capas oscuras sobre fotografías y comprueba la legibilidad de todos los controles.

Define tokens reutilizables para fondo, texto, texto secundario, superficie, borde, acento, acento brillante y color oscuro. Evita colores divergentes entre componentes equivalentes.

#### Geometría y superficies

- Contenedor general centrado, ancho máximo aproximado de **1160 px**, con padding lateral de **20 px**.
- Las secciones principales tienen alrededor de **84 px** de espacio vertical en escritorio.
- Tarjetas de esquinas generosas (aprox. **20 px**), borde fino, padding cercano a **26 px** y separación usual de **16 px**.
- Las superficies destacadas (cotizador, cifras, equipo, llamada a contacto) pueden tener radios de alrededor de **24 px**.
- Botones principales tipo píldora, con padding amplio, texto semibold/bold y un hover sutil. El botón secundario del hero es de contorno.
- Mantén alturas, padding y ritmo vertical adaptables al texto localizado; evita alturas rígidas que recorten contenido.

### 4. Estructura visual y contenido, en orden

Implementa la página como una secuencia continua de secciones con anclas. Mantén el orden actual:

1. **Barra superior / navegación.** Header sticky, de unos **64 px**, translúcido, con blur y borde inferior sutil. A la izquierda va el símbolo de infinito y el logotipo “Loop Avante”, con “Avante” en verde. En escritorio, incluye anclas a Datos, Sectores, Servicios, Redes, Portafolio, Cotizador, Equipo y Contacto. A la derecha, selector segmentado ES/PT y, en tamaños estrechos, botón de menú hamburguesa. El panel móvil se despliega debajo del header, en columna, con superficie del tema, sombra suave y enlaces grandes. Cerrar el menú al seguir una navegación.
2. **Hero.** Bloque inicial amplio, alineado verticalmente y de aproximadamente 620–820 px en escritorio (en móviles, mínimo cercano a 640 px). Usa `team-claro.jpg` como imagen panorámica/de fondo, ocupando el área sin deformarse. Superpón un degradado que proteja el texto: transición desde una zona izquierda oscura/legible a la fotografía hacia la derecha; en tema claro la composición usa una capa marfil, y en tema oscuro capas azul noche. Añade reflejos radiales verdes y cálidos discretos. Incluye etiqueta de ubicación/servicio, gran titular (hasta aprox. 72 px en escritorio), párrafo de ancho limitado y dos CTA: primario hacia el cotizador y secundario hacia contacto. En móvil, conserva el impacto fotográfico, refuerza el overlay y apila los botones si no caben.
3. **Cinta de capacidades.** Franja horizontal de unos 58 px con fondo verde pálido, palabras en mayúsculas y separación amplia. Desplaza continuamente una lista duplicada de capacidades (WhatsApp Business, Instagram, Google Perfil de Empresa, Facebook, Catálogo, Reservas y Tienda online) para formar un loop sin salto. No agregues controles. Detén la animación si el usuario prefiere movimiento reducido.
4. **Datos.** Etiqueta, titular y composición de dos paneles. En escritorio, selector/gráfico a la izquierda y panel de indicador destacado a la derecha; al estrecharse, una columna. Muestra cuatro indicadores seleccionables (82%, 57%, 73%, 10%) con nombre, icono, barras comparativas y estado seleccionado. El panel destacado presenta indicador, posición (por ejemplo, 01 / 04), número grande verde, explicación y enlace de contacto. Cambiar la selección actualiza el panel y la barra. Mantén la nota de fuente debajo. En móvil, la lista de indicadores se convierte en filas compactas con barras horizontales y el panel destacado permanece debajo.
5. **Cómo trabajamos.** Sección con fondo alterno, titular, breve introducción y tres tarjetas en columnas: el cliente encuentra y entiende la oferta; el contenido genera confianza; cada consulta tiene un camino claro. Cada tarjeta incluye icono en caja verde suave, número 01–03, título, descripción y beneficio con check separado por una línea fina.
6. **Sectores.** Titular y cuatro tarjetas en cuadrícula adaptable (Gastronomía, Moda y regalos, Belleza y bienestar, Hogar y servicios). Cada tarjeta incorpora imagen local en proporción **4:3**, título y descripción. Las imágenes hacen zoom leve al hover con una veladura verde sutil; sin movimiento excesivo. Mantén el recorte consistente y los bordes redondeados.
7. **Servicios.** Fondo alterno, titular, texto aclaratorio, filtros tipo píldora y tarjetas en cuadrícula. Los filtros actuales son Todos, Marketing, Programación y Edición y video; el filtro activo usa fondo verde. Las tarjetas conservan nombre, precio o “A cotizar”, unidad (única vez o mensual) y alcance textual. Usa los datos y filtros existentes, no inventes precios ni alteres si un concepto es inicial, mensual o cotizable.
8. **Tecnología aplicada a redes.** Introducción en dos columnas: título y texto a la izquierda, dos mockups verticales de publicaciones a la derecha en escritorio, ligeramente inclinados y con sombra. Usa `feed-redes.jpg` y `redes-reel.jpg`. En móvil oculta esos mockups (como en el diseño actual). Debajo, presenta siete tarjetas de servicios de redes con sus iconos/imágenes cuadradas, títulos y descripciones.
9. **Portafolio.** Fondo alterno, titular, introducción y aviso visible de que los casos son ficticios. Tres tarjetas para tienda de ropa, barbería y tienda de regalos, con imagen vertical **4:5**, nombre, descripción y distintivo discontinuo “Proyecto ficticio”. Conserva la jerarquía y el aviso aunque se ajuste el texto por idioma.
10. **Cotizador.** Titular e instrucciones. En escritorio, dos columnas: lista de servicios con checkboxes a la izquierda y panel de resumen a la derecha; en móvil, una columna. El panel presenta inversión inicial única y mensualidad por separado, nota sobre dominio/alojamiento/anuncios/tarifas y botón ancho para enviar por WhatsApp. Mantén la miniatura/icono actual y el fondo verde pálido del resumen.
11. **Equipo.** Fondo alterno, titular y tres tarjetas para Ernesto, Ali y Yoisielis, cada una con retrato circular de **64 px**, nombre, rol en verde y descripción. Después, panel ancho verde pálido con título, explicación y lista de acuerdos/proceso de trabajo en dos columnas adaptables.
12. **Contacto.** Bloque CTA destacado de fondo verdoso claro (y variante correspondiente en oscuro), con título, mensaje y formulario alineado a la izquierda/ancho máximo cercano a **560 px**. Incluye nombre, nombre del comercio, dificultad actual y botón verde “Abrir WhatsApp”. Inputs de bordes finos y radios aprox. 12 px; estados de foco notorios y texto legible en ambos temas.
13. **Banner de Curitiba.** Fotografía panorámica entre el contenido y el footer. Usa `curitiba-banner.jpg` en escritorio y `curitiba-banner-mobile.jpg` en pantallas pequeñas. Altura adaptable aproximada **180–360 px**, objeto cubriendo el área y una transición/degradado inferior para integrarse con el fondo siguiente.
14. **Footer.** Franja azul noche con logotipo, copyright/año y ciudad, texto de alcance sin promesas de ventas/seguidores/posicionamiento y nota de imágenes ilustrativas. Tipografía más pequeña, pero legible.

### 5. Recursos visuales existentes

Reutiliza los archivos disponibles, con las variantes y el propósito coherentes con la página actual:

- Hero: `team-claro.jpg`.
- Sectores: `sector-gastronomia.jpg`, `sector-moda.jpg`, `sector-beleza.jpg`, `sector-casa.jpg`.
- Demostraciones: `demo-ropa.jpg`, `demo-barberia.jpg`, `demo-regalos.jpg`.
- Personas: `team-ernesto.jpg`, `team-ali.jpg`, `team-yoisielis.jpg`.
- Redes: `feed-redes.jpg`, `redes-reel.jpg`.
- Iconos de servicios: `icono-01.jpg` a `icono-07.jpg`.
- Banner: `curitiba-banner.jpg` y `curitiba-banner-mobile.jpg`.
- Marca/metadata: `favicon.jpg`, `og-image.jpg`; verifica la existencia de cualquier otro archivo antes de referenciarlo.
- Error 404: `404.jpg`.

Usa `object-fit: cover` y puntos de recorte razonables para fotos. Define dimensiones o `aspect-ratio` para evitar saltos de layout; carga con prioridad solo la imagen principal y difiere las imágenes inferiores cuando sea posible. Añade texto alternativo localizado donde la imagen sea informativa; deja vacías/ocultas las imágenes puramente decorativas. Si una imagen falla, conserva un placeholder degradado del tema y no dejes una imagen rota ni texto técnico expuesto.

### 6. Comportamientos que forman parte de la UI

Preserva el resultado visual de estas interacciones; no las sustituyas por controles decorativos:

- **Idioma:** Español por defecto, selector ES/PT visible. El cambio actualiza los textos, placeholders, etiquetas accesibles y `lang` del documento sin cambiar la estructura ni perder las selecciones del usuario. Mantén todos los textos PT existentes.
- **Navegación:** anclas con scroll suave y compensación por el header sticky. Menú móvil desplegable y cerrado al elegir un enlace.
- **Indicadores:** la tarjeta seleccionada cambia de estilo y actualiza el panel destacado, el número y la barra animada.
- **Servicios:** los filtros cambian las tarjetas mostradas y el filtro activo. En el cotizador, checkboxes mantienen la selección entre cambios de idioma/filtro.
- **Cotizador:** recalcula los totales iniciales y mensuales; muestra precios en BRL según el formato actual y distingue los elementos “a cotizar”. El CTA abre WhatsApp con el resumen localizado de servicios seleccionados, ambas cantidades y el texto apropiado para ES/PT. Respeta que el pago/publicidad/tarifas mencionados sean responsabilidad del cliente.
- **Contacto:** valida los campos requeridos y abre WhatsApp con nombre, comercio y mensaje precargados. Conserva el número configurado actualmente y centraliza su configuración en un lugar claro; no lo inventes ni lo muestres como texto decorativo.
- **Progreso de lectura:** línea verde de 3 px fijada al borde superior, cuyo avance corresponde al scroll vertical.
- **Revelado de secciones:** entrada discreta con opacidad y desplazamiento vertical al aparecer en viewport; revela las imágenes de sectores con transición de recorte.
- **Microinteracciones:** hover sutil en botones y tarjetas; parallax leve del hero/banner y reflejo del hero que sigue el puntero solo donde corresponde. Evita que esos efectos interfieran con lectura, controles táctiles o navegación por teclado.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce`, elimina cintas, parallax, animaciones de entrada, flotación, tilt y transiciones no esenciales; el contenido debe quedar visible desde el inicio.
- **Esquema de color:** respeta el tema del sistema y actualiza fondos, texto, campos, estados activos, overlays de imagen, menú, tarjetas y footer. No uses una combinación de tema fijo con texto de bajo contraste.
- **404:** conserva una página de error independiente, centrada y responsive, con ilustración `404.jpg`, número alternativo si falla la imagen, mensaje localizado y botón para volver al inicio. Verifica que la ruta de despliegue permita llegar a esa página.

### 7. Responsive

Diseña primero con los patrones actuales y añade ajustes fluidos donde hagan falta. No te limites a encoger el escritorio:

- **Escritorio ancho:** contenedor de 1160 px, navegación horizontal, hero con texto a la izquierda e imagen dominante a la derecha, cuadrículas de varias columnas, datos y cotizador en dos columnas, mockups de redes visibles.
- **Hasta ~980 px:** sustituye navegación horizontal por botón hamburguesa y menú desplegable; conserva selector de idioma y evita que header/logo/controles se compriman.
- **Hasta ~800 px:** apila los paneles de datos y el cotizador. En datos, cambia las barras verticales a filas con barras horizontales.
- **Hasta ~767 px:** hero con altura mínima cercana a 640 px y overlay móvil reforzado; sectores, servicios, redes, portafolio y equipo se redistribuyen según el ancho (normalmente una o dos columnas, sin tarjetas ilegibles); oculta los mockups de redes; usa el banner de Curitiba móvil; revisa el contenido que tenga scroll horizontal propio para que no desborde la página.
- **Hasta ~420 px:** reduce padding y tipografía donde sea necesario; el selector de métricas debe conservar etiquetas y porcentajes sin solaparse, y los CTAs deben envolver o apilarse.
- En todos los anchos: sin overflow horizontal global, controles táctiles suficientemente grandes, títulos legibles y ninguna información esencial oculta.

Los valores anteriores son referencias de la implementación actual, no sustituyen probar anchos intermedios ni textos largos en portugués.

### 8. Arquitectura React esperada

Descompón la página en componentes por responsabilidad visual/interactiva, manteniendo el orden y las anclas semánticas. Como guía (adáptala a la estructura ya existente):

- `SiteHeader` / navegación y selector de idioma.
- `Hero`, `CapabilityTicker`.
- `StatsSection` y componentes de indicador/gráfico.
- `ProcessSection`, `SectorSection`, `ServicesSection`.
- `SocialSection`, `PortfolioSection`.
- `QuoteBuilder`, `TeamSection`, `ContactSection`.
- `CuritibaBanner`, `SiteFooter`, `NotFoundPage`.

Mantén los datos repetidos (traducciones, estadísticas, sectores, servicios, imágenes y equipo) en estructuras tipadas/claras fuera del JSX cuando sea apropiado. Usa estado React para idioma, menú, filtro, indicador, selección de servicios y totales. No manipules el DOM directamente para actualizar contenido ni reconstruyas HTML con `innerHTML`. Usa claves estables, labels asociados a campos, enlaces/botones semánticos y limpieza apropiada de observers/listeners. No agregues una librería de animación o iconos si los recursos ya instalados cubren el uso; conserva el estilo de iconografía actual (Font Awesome donde ya se usa).

### 9. Accesibilidad, carga y SEO

- Usa landmarks (`header`, `nav`, `main`, `section`, `footer`), jerarquía de encabezados correcta y nombres accesibles para controles.
- Los selectores y filtros deben indicar su estado (`aria-pressed`, `aria-current` u opción equivalente); cambios de cifras anunciables de forma razonable, sin narrar continuamente animaciones.
- Mantén foco de teclado visible en enlaces, botones, filtros, checkboxes y campos. No dependas solo del color para indicar estado.
- El menú móvil debe exponer su estado y permitir activación por teclado.
- Comprueba contraste en tema claro y oscuro, `alt` de imágenes, placeholders que no sustituyan etiquetas y áreas táctiles.
- Conserva título, descripción, favicon, metadatos Open Graph e idioma del documento; no pierdas el comportamiento de enlaces externos seguros (`target`, `rel`).
- Evita CLS con proporciones/dimensiones de imágenes y respeta `prefers-reduced-motion`.

### 10. Criterios de aceptación

La migración se considera lista cuando:

1. La página React conserva el orden, la identidad visual y el contenido de todas las secciones de la página actual, además del 404.
2. Se han reutilizado las imágenes correctas, con recortes y variantes móviles razonables y fallbacks funcionales.
3. ES/PT, navegación/anclas, menú móvil, selección de estadísticas, filtros, checkboxes, cálculos, enlaces a WhatsApp y formulario operan de punta a punta.
4. El tema claro y oscuro son coherentes en toda la UI; ambos idiomas caben en móvil, sin solapamientos ni scroll horizontal accidental.
5. Las animaciones son sutiles, no impiden usar la web y respetan movimiento reducido.
6. Teclado, foco, semántica y contraste se mantienen utilizables.
7. Se han probado al menos un escritorio ancho, una tablet/ventana intermedia y un móvil estrecho, en ambos temas e idiomas. Compara capturas con la versión original en los mismos viewports; ajusta hasta que la composición y el ritmo visual coincidan.
8. Ejecuta las comprobaciones y pruebas existentes del repositorio. Informa qué comandos se ejecutaron, qué se verificó manualmente y cualquier limitación que quede.

No consideres terminada la migración solo porque “compila”: verifica la página renderizada y cada estado interactivo importante.
