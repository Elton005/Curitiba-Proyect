import { b } from "../data/translations.js";
export function resultInsights(kind, result, inputs = {}) {
  if (!result) return null;
  if (kind === "commercial")
    return {
      solution: "web",
      title: b(
        "Entenda o cenário comercial",
        "Entiende el escenario comercial",
      ),
      points: [
        b(
          "Consultas × conversão × ticket explicam o faturamento. Crescimento de consultas e melhora em pontos percentuais são hipóteses distintas.",
          "Consultas × conversión × valor de venta explican la facturación. El crecimiento de consultas y la mejora en puntos porcentuales son supuestos distintos.",
        ),
        result.currentRevenue === 0
          ? b(
              "A base atual é zero: a variação percentual não é aplicável. Compare os valores absolutos.",
              "La base actual es cero: la variación porcentual no es aplicable. Compara los importes absolutos.",
            )
          : result.difference > 0
            ? b(
                "O faturamento proposto supera o atual sob estas hipóteses; valide cada variável com registros reais.",
                "La facturación propuesta supera la actual con estos supuestos; valida cada variable con registros reales.",
              )
            : b(
                "Não há aumento de faturamento neste cenário. Revise oferta, volume e conversão antes de investir.",
                "No hay aumento de facturación en este escenario. Revisa oferta, volumen y conversión antes de invertir.",
              ),
        result.nextContribution < 0
          ? b(
              "A contribuição proposta é negativa: os custos considerados superam o faturamento. Mais vendas podem ampliar perdas se o custo por venda superar o ticket.",
              "La contribución propuesta es negativa: los costes considerados superan la facturación. Más ventas pueden ampliar pérdidas si el coste por venta supera el valor de venta.",
            )
          : b(
              "Faturamento não é lucro. Custos variáveis, captação e custo digital alteram a contribuição; despesas não informadas permanecem fora do modelo.",
              "La facturación no es beneficio. Los costes variables, la captación y el coste digital cambian la contribución; los gastos no indicados quedan fuera del modelo.",
            ),
      ],
      cta: b(
        "Explorar desenvolvimento de sites",
        "Explorar desarrollo de sitios",
      ),
    };
  if (kind === "productivity")
    return {
      solution: "automation",
      title: b("Como utilizar a capacidade", "Cómo utilizar la capacidad"),
      points: [
        Number(inputs.adoption) === 0
          ? b(
              "Sem adoção não há mudança de tempo. Planeje treinamento e adesão antes de estimar ganhos.",
              "Sin adopción no hay cambio de tiempo. Planifica formación y uso antes de estimar mejoras.",
            )
          : result.releasedHours < 0
            ? b(
                "O novo processo exige mais tempo. Revise as etapas e teste uma rotina pequena antes de ampliar o uso.",
                "El nuevo proceso exige más tiempo. Revisa los pasos y prueba una rutina pequeña antes de ampliar su uso.",
              )
            : b(
                "A diferença de minutos por tarefa, multiplicada pelo volume e pela adoção, determina o tempo liberado. Essa capacidade pode apoiar atendimento e revisão de qualidade.",
                "La diferencia de minutos por tarea, multiplicada por el volumen y la adopción, determina el tiempo liberado. Esa capacidad puede apoyar la atención y la revisión de calidad.",
              ),
        b(
          "Horas disponíveis não são economia de caixa. O valor é teórico; o custo recorrente é separado e a adoção real pode ser menor que a estimada.",
          "Las horas disponibles no son ahorro de caja. El valor es teórico; el coste recurrente se muestra separado y la adopción real puede ser menor que la estimada.",
        ),
      ],
      cta: b(
        "Conhecer soluções de automação",
        "Conocer soluciones de automatización",
      ),
    };
  if (kind === "investment")
    return {
      solution: "business",
      title: b(
        "Leia o investimento com cautela",
        "Interpreta la inversión con cautela",
      ),
      points: [
        result.roiPercent === null
          ? b(
              "O ROI não é aplicável ou não é representável com estas hipóteses. Compare custos e fluxos absolutos.",
              "El ROI no es aplicable o no es representable con estos supuestos. Compara costes y flujos absolutos.",
            )
          : result.roiPercent < 0
            ? b(
                "O resultado acumulado é negativo no horizonte escolhido. O benefício informado ainda não cobre todos os custos considerados.",
                "El resultado acumulado es negativo en el horizonte elegido. El beneficio indicado todavía no cubre todos los costes considerados.",
              )
            : b(
                "O resultado acumulado é não negativo sob estas hipóteses. Isso não comprova retorno futuro.",
                "El resultado acumulado no es negativo con estos supuestos. Esto no demuestra un retorno futuro.",
              ),
        result.netMonthly <= 0
          ? b(
              "Sem benefício líquido mensal positivo não há recuperação do investimento.",
              "Sin beneficio neto mensual positivo no hay recuperación de la inversión.",
            )
          : b(
              "A recuperação matemática depende de manter o benefício líquido mensal. Compare seu prazo com o horizonte selecionado.",
              "La recuperación matemática depende de mantener el beneficio neto mensual. Compara su plazo con el horizonte seleccionado.",
            ),
        b(
          "Custos recorrentes maiores ou benefícios menores reduzem o resultado mês a mês. O investimento inicial pesa no mês zero; não há desconto, inflação ou garantia neste modelo.",
          "Mayores costes recurrentes o menores beneficios reducen el resultado mes a mes. La inversión inicial pesa en el mes cero; este modelo no incluye descuento, inflación ni garantía.",
        ),
      ],
      cta: b(
        "Explorar ferramentas sob medida",
        "Explorar herramientas a medida",
      ),
    };
  if (kind === "market")
    return {
      solution: result.indicatorId === "crm" ? "systems" : "web",
      title: b(
        "O que este dado permite dizer",
        "Qué permite afirmar este dato",
      ),
      points: [
        result.definition,
        result.denominatorLabel,
        b(
          "Compare apenas recortes marginais da mesma variável, ano e base. Adoção declarada não explica vendas nem demonstra que uma tecnologia causou crescimento no seu negócio.",
          "Compara solo desgloses marginales de la misma variable, año y base. La adopción declarada no explica las ventas ni demuestra que una tecnología causara crecimiento en tu negocio.",
        ),
      ],
      cta: b(
        "Relacionar presença e organização",
        "Relacionar presencia y organización",
      ),
    };
  return null;
}
