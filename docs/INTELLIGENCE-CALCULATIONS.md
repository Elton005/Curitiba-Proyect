# Inteligência Digital — modelos matemáticos

Motores puros en `src/utils/intelligenceCalculations.js`. Conservan la semántica del simulador básico de `src/utils/simulator.js`; se corrigen sus guardas para rechazar tipos no numéricos y espacios y devolver `null` cuando un porcentaje desborda la representación finita. Todos los valores iniciales son **ejemplos editables**, no estadísticas de mercado, previsiones o resultados de clientes.

## Contrato y validación

Las funciones devuelven `null` cuando faltan entradas obligatorias o existen números no finitos, vacíos, espacios, tipos malformados o valores fuera de los límites. Se aceptan números y cadenas numéricas de formularios; no se convierten booleanos, objetos o arreglos en cero. No se redondea durante los cálculos: solo la interfaz debe formatear resultados.

Límites: hasta 1.000.000 consultas o tareas mensuales; dinero entre 0 y R$10.000.000, salvo el beneficio incremental de inversión que puede variar de −R$10.000.000 a R$10.000.000; minutos por tarea entre 0 y 1.440; porcentajes entre 0 y 100. La conversión actual más su mejora no puede superar 100%. Los horizontes de inversión son 6, 12 o 24 meses.

Si una base positiva extremadamente pequeña produce un ratio fuera de la representación numérica de JavaScript, el porcentaje o plazo se devuelve como `null` (no aplicable/no representable), nunca como Infinity, NaN o una recuperación ficticia de cero meses. Los importes finitos permanecen disponibles. La categoría de recuperación dentro/fuera del horizonte se compara también mediante `N × beneficio_neto >= inversión`, sin depender de una división desbordada.

El coste recurrente de Productividad es opcional: omitido o vacío se interpreta como cero. Los demás campos numéricos documentados son obligatorios. Los límites son guardas del producto, no afirmaciones económicas.

## 1. Simulador comercial

Unidades: consultas y ventas esperadas por mes; conversión y variación de consultas en porcentaje; mejora de conversión en **puntos porcentuales**; ticket y coste variable en BRL por venta; captación y coste digital incremental en BRL por mes.

- Ventas actuales = consultas × conversión ÷ 100.
- Facturación actual = ventas actuales × ticket.
- Consultas propuestas = consultas × (1 + variación ÷ 100).
- Conversión propuesta = conversión actual + mejora en puntos porcentuales.
- Ventas propuestas = consultas propuestas × conversión propuesta ÷ 100.
- Facturación propuesta = ventas propuestas × ticket.
- Diferencia = propuesta − actual; variación relativa = diferencia ÷ actual × 100, solo si la facturación actual es distinta de cero.

El modo avanzado añade:

- Contribución unitaria = ticket − coste variable por venta.
- Costes variables = ventas esperadas × coste variable por venta.
- Contribución actual = facturación actual − costes variables actuales − captación mensual.
- Contribución propuesta = facturación propuesta − costes variables propuestos − captación mensual − coste digital incremental mensual.

El campo de captación representa **el mismo importe mensual en ambos escenarios**. El coste digital es adicional y se aplica únicamente al propuesto. Un coste variable superior al ticket es válido y puede producir contribución negativa.

La contribución de este modelo no es beneficio contable: no incluye todos los costes fijos, impuestos, financiación u otras partidas. No se calcula ROI publicitario porque no existen atribución ni definición de retorno publicitario suficientes. El porcentaje de diferencia de contribución se deja en `null` si su base actual es cero o negativa; la diferencia monetaria sigue disponible. Las tasas de contribución sobre facturación solo se calculan cuando la facturación correspondiente es positiva.

`commercialSensitivity` conserva las consultas propuestas y los costes; varía únicamente la conversión propuesta. Por defecto entrega 21 puntos entre 0 y 100%. No deriva probabilidades. Los tres escenarios anónimos usan únicamente IDs `conservative`, `base`, `optimistic`; son hipótesis, no niveles de confianza. `sanitizeCommercialScenarios` permite como máximo un escenario válido por ID y elimina campos libres o personales.

Ejemplo inicial: 100 consultas, 10% de conversión, R$250 por venta, +25% de consultas y +2 p.p. producen R$2.500 actuales y R$3.750 propuestos. Con coste variable R$100, captación R$300 y coste digital R$150, las contribuciones son R$1.200 y R$1.800. Las ventas fraccionarias son medias matemáticas.

## 2. Productividad

Unidades: tareas/mes, minutos/tarea, adopción en porcentaje, coste efectivo BRL/hora y coste recurrente BRL/mes.

- Horas actuales = tareas × minutos actuales ÷ 60.
- Horas estimadas después = tareas × [minutos actuales × (1 − adopción/100) + minutos nuevos × adopción/100] ÷ 60.
- Horas liberadas = tareas × (minutos actuales − minutos nuevos) × adopción/100 ÷ 60.
- Valor teórico de capacidad = horas liberadas × coste efectivo por hora.
- Cada indicador anual = indicador mensual × 12 bajo el mismo supuesto constante.

El coste recurrente se muestra separado, sin restarlo del valor de capacidad para presentar un supuesto ahorro financiero. Si la actividad empeora y exige más tiempo, las horas liberadas y su valor pueden ser negativos. Una adopción de 0% conserva las horas actuales; una de 100% aplica el nuevo tiempo a todas las tareas.

**Capacidad liberada no equivale a ahorro efectivo de caja.** Puede ser tiempo disponible para otras tareas, sin reducción de gastos ni ingresos adicionales. La proyección mensual repite las hipótesis y muestra acumulados ilustrativos, no una previsión de adopción o demanda.

Ejemplo: 120 tareas/mes, 15 minutos actuales, 5 nuevos, adopción 75% y R$40/hora implican 30 horas actuales, 15 estimadas y 15 liberadas; valor teórico R$600/mes. Un coste recurrente de R$100 permanece separado. Equivalente anual ilustrativo: 180 horas y R$7.200 de capacidad, más R$1.200 de coste de herramienta.

## 3. Inversión digital

Unidades: inversión inicial en BRL; coste recurrente y beneficio incremental estimado en BRL/mes; horizonte y recuperación en meses. El beneficio incremental puede ser negativo.

- Beneficio neto mensual = beneficio incremental − coste recurrente.
- Coste total a N meses = inversión inicial + N × coste recurrente.
- Beneficio incremental total = N × beneficio incremental.
- Resultado acumulado a N meses = N × beneficio neto mensual − inversión inicial.
- ROI definido por este modelo = resultado acumulado ÷ inversión inicial × 100, solo si la inversión inicial es positiva.
- Recuperación matemática = inversión inicial ÷ beneficio neto mensual, solo con inversión inicial y beneficio neto positivos.

La recuperación puede superar el horizonte elegido; se informa `beyond-horizon` sin redondear a un mes ficticio. Con beneficio neto cero o negativo, no existe recuperación bajo estas hipótesis. Con inversión inicial cero, el ROI sobre inversión inicial y el plazo para recuperar ese capital no son aplicables: ambos se devuelven `null`, estado `no-initial-investment`. El resultado operativo positivo o negativo sigue mostrándose.

La tabla incluye el mes 0 con flujo igual a −inversión inicial. Del mes 1 a N, cada flujo es el beneficio neto mensual constante. El último acumulado coincide con el resultado a N meses y la suma de flujos.

No se consideran descuento temporal, inflación, impuestos, coste de capital, financiación ni incertidumbre. **No es asesoramiento financiero ni garantía de recuperación.** El ROI se define explícitamente sobre la inversión inicial, no sobre el coste total. Si se incorpora capacidad de Productividad, el usuario debe confirmar qué importe representa un beneficio económico efectivo; no se debe importar automáticamente su valor teórico ni contar dos veces la misma ventaja.

Ejemplo: inversión inicial R$5.000, recurrente R$200, beneficio R$800 y 12 meses dan neto R$600/mes, coste total R$7.400, beneficio incremental total R$9.600, acumulado R$2.200 y ROI hipotético del 44%. Recuperación matemática: 8,333… meses.

## Pruebas

`node --test tests/intelligence-calculations.test.mjs`: **18/18 pruebas correctas** en la ejecución de implementación. Comprueban resultados conocidos, conservación del simulador básico, cero, inválidos, pérdidas legítimas, separación de ingresos/costes/capacidad, sensibilidad, límites de escenarios, ratios extremos no representables y flujos a 6/12/24 meses. La auditoría general registrará también la verificación integrada de las interfaces.
