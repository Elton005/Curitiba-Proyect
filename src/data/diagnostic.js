import { b } from "./translations.js";

const choice = (value, pt, es) => ({ value, label: b(pt, es) });
export const diagnosticQuestions = [
  {
    id: "web",
    icon: "web",
    area: b("Presença web", "Presencia web"),
    question: b(
      "Como sua empresa se apresenta na web?",
      "¿Cómo se presenta tu empresa en la web?",
    ),
    options: [
      choice(0, "Ainda não tenho um site.", "Todavía no tengo un sitio web."),
      choice(
        1,
        "Tenho um site, mas precisa de atualização.",
        "Tengo un sitio, pero necesita actualizarse.",
      ),
      choice(
        2,
        "Tenho um site atualizado, claro e adaptado ao celular.",
        "Tengo un sitio actualizado, claro y adaptado al celular.",
      ),
    ],
    priority: 0,
    recommendation: b(
      "Organize sua presença digital",
      "Organiza tu presencia digital",
    ),
    advice: b(
      "Comece por um site claro, com oferta, informações essenciais e um caminho de contato. Se já existe, revise conteúdo e navegação.",
      "Empieza por un sitio claro, con tu oferta, información esencial y una vía de contacto. Si ya existe, revisa su contenido y navegación.",
    ),
    solution: "web",
  },
  {
    id: "local",
    icon: "pin",
    area: b("Google e descoberta local", "Google y descubrimiento local"),
    question: b(
      "As pessoas encontram informações atualizadas sobre seu negócio no Google?",
      "¿Las personas encuentran información actualizada sobre tu negocio en Google?",
    ),
    options: [
      choice(
        0,
        "Não tenho perfil ou não sei como aparece.",
        "No tengo perfil o no sé cómo aparece.",
      ),
      choice(
        1,
        "Tenho perfil, mas reviso poucas vezes.",
        "Tengo perfil, pero lo reviso pocas veces.",
      ),
      choice(
        2,
        "Informações, horários e links são revisados.",
        "La información, los horarios y los enlaces se revisan.",
      ),
    ],
    priority: 6,
    recommendation: b(
      "Facilite a descoberta da sua empresa",
      "Facilita que encuentren tu empresa",
    ),
    advice: b(
      "Revise os dados públicos, os horários e os links para o seu site. Avalie a adequação do Perfil da Empresa ao seu tipo de negócio.",
      "Revisa los datos públicos, los horarios y los enlaces a tu sitio. Evalúa si el Perfil de Empresa se adapta a tu tipo de negocio.",
    ),
    solution: "web",
  },
  {
    id: "social",
    icon: "users",
    area: b("Redes sociais", "Redes sociales"),
    question: b(
      "Seus canais sociais ajudam a entender sua oferta?",
      "¿Tus canales sociales ayudan a entender tu oferta?",
    ),
    options: [
      choice(
        0,
        "Não tenho canais ativos ou a oferta não está clara.",
        "No tengo canales activos o la oferta no está clara.",
      ),
      choice(
        1,
        "Publico às vezes, com informações dispersas.",
        "Publico a veces, con información dispersa.",
      ),
      choice(
        2,
        "Tenho informações consistentes e um próximo passo claro.",
        "Tengo información coherente y un siguiente paso claro.",
      ),
    ],
    priority: 7,
    recommendation: b(
      "Conecte conteúdo e contato",
      "Conecta contenido y contacto",
    ),
    advice: b(
      "Alinhe apresentação, oferta e links dos seus canais. Use uma página própria para concentrar informações essenciais.",
      "Alinea la presentación, la oferta y los enlaces de tus canales. Usa una página propia para reunir la información esencial.",
    ),
    solution: "web",
  },
  {
    id: "whatsapp",
    icon: "message",
    area: b("Atendimento por WhatsApp", "Atención por WhatsApp"),
    question: b(
      "Como você organiza o atendimento por mensagens?",
      "¿Cómo organizas la atención por mensajes?",
    ),
    options: [
      choice(
        0,
        "Respondo quando consigo, sem uma rotina.",
        "Respondo cuando puedo, sin una rutina.",
      ),
      choice(
        1,
        "Uso algumas respostas prontas, mas falta padrão.",
        "Uso algunas respuestas preparadas, pero falta un criterio común.",
      ),
      choice(
        2,
        "Tenho rotina, informações claras e acompanhamento.",
        "Tengo una rutina, información clara y seguimiento.",
      ),
    ],
    priority: 3,
    recommendation: b(
      "Estruture o fluxo de atendimento",
      "Estructura el flujo de atención",
    ),
    advice: b(
      "Defina informações de entrada, respostas de orientação e etapas de acompanhamento. Avalie integrações apenas quando forem necessárias.",
      "Define la información inicial, las respuestas de orientación y los pasos de seguimiento. Evalúa integraciones solo cuando sean necesarias.",
    ),
    solution: "automation",
  },
  {
    id: "leads",
    icon: "grid",
    area: b("Organização de consultas", "Organización de consultas"),
    question: b(
      "Onde ficam as solicitações de possíveis clientes?",
      "¿Dónde guardas las solicitudes de posibles clientes?",
    ),
    options: [
      choice(
        0,
        "Em conversas e anotações, sem uma visão única.",
        "En conversaciones y notas, sin una visión conjunta.",
      ),
      choice(
        1,
        "Em uma planilha ou lista nem sempre atualizada.",
        "En una hoja o lista que no siempre está actualizada.",
      ),
      choice(
        2,
        "Em uma ferramenta com etapas e responsáveis.",
        "En una herramienta con etapas y responsables.",
      ),
    ],
    priority: 1,
    recommendation: b(
      "Centralize as oportunidades comerciais",
      "Centraliza las oportunidades comerciales",
    ),
    advice: b(
      "Organize contatos, etapas e próximos retornos em uma estrutura de gestão. Um painel simples pode ser um bom início.",
      "Organiza contactos, etapas y próximos seguimientos en una estructura de gestión. Un panel sencillo puede ser un buen inicio.",
    ),
    solution: "systems",
  },
  {
    id: "quotes",
    icon: "document",
    area: b(
      "Orçamentos e processos comerciais",
      "Presupuestos y procesos comerciales",
    ),
    question: b(
      "Como você prepara e acompanha orçamentos?",
      "¿Cómo preparas y sigues los presupuestos?",
    ),
    options: [
      choice(
        0,
        "Faço manualmente, do zero, a cada pedido.",
        "Los preparo manualmente desde cero en cada pedido.",
      ),
      choice(
        1,
        "Tenho um modelo, mas calculo e acompanho manualmente.",
        "Tengo una plantilla, pero calculo y sigo todo manualmente.",
      ),
      choice(
        2,
        "Uso regras, modelos e acompanhamento organizado.",
        "Uso reglas, plantillas y un seguimiento organizado.",
      ),
    ],
    priority: 2,
    recommendation: b(
      "Simplifique seus orçamentos",
      "Simplifica tus presupuestos",
    ),
    advice: b(
      "Mapeie serviços, regras de cálculo e aprovações. Um cotizador pode padronizar o escopo e reduzir retrabalho.",
      "Define servicios, reglas de cálculo y aprobaciones. Un cotizador puede estandarizar el alcance y reducir tareas repetidas.",
    ),
    solution: "business",
  },
  {
    id: "purchase",
    icon: "bag",
    area: b("Compra ou contratação", "Compra o contratación"),
    question: b(
      "O cliente sabe como comprar ou contratar?",
      "¿El cliente sabe cómo comprar o contratar?",
    ),
    options: [
      choice(
        0,
        "Precisa perguntar quase tudo para avançar.",
        "Necesita preguntar casi todo para avanzar.",
      ),
      choice(
        1,
        "Parte da informação está disponível, mas há dúvidas frequentes.",
        "Parte de la información está disponible, pero hay dudas frecuentes.",
      ),
      choice(
        2,
        "Oferta, etapas e condições estão claras.",
        "La oferta, los pasos y las condiciones están claros.",
      ),
    ],
    priority: 4,
    recommendation: b(
      "Dê clareza ao caminho de contratação",
      "Aclara el camino de contratación",
    ),
    advice: b(
      "Organize oferta, dúvidas frequentes e o próximo passo. Revise o fluxo no celular antes de adicionar novas funcionalidades.",
      "Organiza tu oferta, las preguntas frecuentes y el siguiente paso. Revisa el flujo en el celular antes de añadir funcionalidades.",
    ),
    solution: "web",
  },
  {
    id: "metrics",
    icon: "chart",
    area: b("Acompanhamento e medição", "Seguimiento y medición"),
    question: b(
      "Como você acompanha os resultados dos seus canais?",
      "¿Cómo sigues los resultados de tus canales?",
    ),
    options: [
      choice(0, "Não acompanho indicadores.", "No sigo indicadores."),
      choice(
        1,
        "Consulto números isolados de vez em quando.",
        "Consulto cifras aisladas de vez en cuando.",
      ),
      choice(
        2,
        "Reviso indicadores definidos e uso nas decisões.",
        "Reviso indicadores definidos y los uso para decidir.",
      ),
    ],
    priority: 5,
    recommendation: b(
      "Crie uma rotina de acompanhamento",
      "Crea una rutina de seguimiento",
    ),
    advice: b(
      "Defina o que medir: consultas, origem dos contatos e etapas comerciais. Avalie ferramentas e consentimento conforme a necessidade.",
      "Define qué medir: consultas, origen de los contactos y etapas comerciales. Evalúa herramientas y consentimiento según la necesidad.",
    ),
    solution: "systems",
  },
];

export const diagnosticCategories = {
  initial: b("Presença inicial", "Presencia inicial"),
  developing: b("Estrutura em desenvolvimento", "Estructura en desarrollo"),
  solid: b("Boa base digital", "Buena base digital"),
  optimize: b("Oportunidades de otimização", "Oportunidades de optimización"),
};

export const optimizationRecommendations = [
  {
    id: "review",
    recommendation: b(
      "Revise a experiência em todos os dispositivos",
      "Revisa la experiencia en todos los dispositivos",
    ),
    advice: b(
      "Teste os principais caminhos no celular e no computador. Procure atritos entre informação, formulário e contato.",
      "Prueba los principales caminos en el celular y en el ordenador. Busca dificultades entre información, formulario y contacto.",
    ),
    solution: "web",
  },
  {
    id: "connect",
    recommendation: b(
      "Avalie o que pode ser conectado",
      "Evalúa qué puede conectarse",
    ),
    advice: b(
      "Mapeie passagens manuais entre ferramentas. Priorize integrações que resolvam dificuldades observadas.",
      "Identifica los pasos manuales entre herramientas. Prioriza las integraciones que resuelvan dificultades observadas.",
    ),
    solution: "automation",
  },
  {
    id: "learn",
    recommendation: b(
      "Planeje o próximo ciclo de melhoria",
      "Planifica el próximo ciclo de mejora",
    ),
    advice: b(
      "Use as dúvidas dos clientes e os indicadores que já acompanha para escolher uma melhoria por vez.",
      "Usa las dudas de los clientes y los indicadores que ya sigues para elegir una mejora cada vez.",
    ),
    solution: "systems",
  },
];
