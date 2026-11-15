import { b } from "../translations.js";
const topics = {
  commerce: [
    b("Catálogo digital atualizado", "Catálogo digital actualizado"),
    b("Atualização de produtos", "Actualización de productos"),
    b("Registro de pedidos", "Registro de pedidos"),
    b("Acompanhamento de resultados", "Seguimiento de resultados"),
  ],
  food: [
    b("Cardápio digital atualizado", "Menú digital actualizado"),
    b("Registro de pedidos e reservas", "Registro de pedidos y reservas"),
    b("Comunicação de promoções", "Comunicación de promociones"),
    b(
      "Informações de localização e horários",
      "Información de ubicación y horarios",
    ),
  ],
  beauty: [
    b("Apresentação de serviços", "Presentación de servicios"),
    b("Agenda e confirmações", "Agenda y confirmaciones"),
    b("Histórico de atendimentos", "Historial de atenciones"),
    b("Retorno após o atendimento", "Seguimiento después de la atención"),
  ],
  home: [
    b(
      "Recebimento de pedidos de orçamento",
      "Recepción de solicitudes de presupuesto",
    ),
    b("Prazo de resposta", "Plazo de respuesta"),
    b("Organização de visitas", "Organización de visitas"),
    b("Seguimento de orçamentos", "Seguimiento de presupuestos"),
  ],
  construction: [
    b("Apresentação de obras e escopo", "Presentación de obras y alcance"),
    b("Registro de solicitações", "Registro de solicitudes"),
    b("Etapas e responsáveis da obra", "Etapas y responsables de la obra"),
    b("Atualização de informações", "Actualización de información"),
  ],
  professional: [
    b("Apresentação da especialidade", "Presentación de la especialidad"),
    b("Preparação de propostas", "Preparación de propuestas"),
    b("Organização de documentos", "Organización de documentos"),
    b("Acompanhamento de clientes", "Seguimiento de clientes"),
  ],
  other: [
    b("Clareza da oferta", "Claridad de la oferta"),
    b("Organização das consultas", "Organización de consultas"),
    b("Rotinas repetitivas", "Tareas repetitivas"),
    b("Acompanhamento de resultados", "Seguimiento de resultados"),
  ],
};
export const assessmentChoices = [
  b("Organizado e suficiente hoje", "Organizado y suficiente hoy"),
  b("Precisa melhorar", "Necesita mejorar"),
  b("Ainda não sei avaliar", "Todavía no sé evaluarlo"),
];
export function sectorQuestions(id) {
  return (topics[id] || []).map((topic, index) => ({
    id: `q${index}`,
    topic,
    solution: ["web", "systems", "automation", "business"][index],
    tool: ["market", "simulator", "productivity", "diagnostic"][index],
  }));
}
export function sanitizeSectorAssessment(value) {
  const sectorId = Object.hasOwn(topics, value?.sectorId)
    ? value.sectorId
    : null;
  return {
    sectorId,
    answers: Object.fromEntries(
      sectorQuestions(sectorId)
        .filter((q) => [0, 1, 2].includes(value?.answers?.[q.id]))
        .map((q) => [q.id, value.answers[q.id]]),
    ),
  };
}
export function evaluateSectorAssessment(value) {
  const safe = sanitizeSectorAssessment(value),
    questions = sectorQuestions(safe.sectorId);
  if (
    !questions.length ||
    questions.some((q) => safe.answers[q.id] === undefined)
  )
    return null;
  return {
    strengths: questions.filter((q) => safe.answers[q.id] === 0),
    opportunities: questions.filter((q) => safe.answers[q.id] === 1),
    unknown: questions.filter((q) => safe.answers[q.id] === 2),
    priorities: questions.filter((q) => safe.answers[q.id] === 1).slice(0, 3),
  };
}
