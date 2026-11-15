import { b } from "../translations.js";

const tools = [
  "market",
  "diagnostic",
  "simulator",
  "productivity",
  "investment",
  "report",
];
const priority = (id, rank, title, reason, solution, tool) => ({
  id,
  priority: rank,
  title,
  reason,
  solution,
  tool,
});
const noMatch = (note) => ({
  status: "unavailable",
  referenceSectorId: null,
  officialLabel: null,
  note,
});
const reference = (id, label, note) => ({
  status: "reference-only",
  referenceSectorId: id,
  officialLabel: label,
  note,
});

export const sectorRecommendationMethod = b(
  "As prioridades são sugestões editoriais deterministas para o perfil selecionado: primeiro clareza da oferta ou do escopo, depois organização do atendimento e, por fim, redução de etapas repetitivas. Os exemplos não comprovam problemas da sua empresa. Use o diagnóstico para conferir quais necessidades realmente se aplicam.",
  "Las prioridades son sugerencias editoriales deterministas para el perfil seleccionado: primero claridad de la oferta o del alcance, después organización de la atención y, por último, reducción de pasos repetitivos. Los ejemplos no demuestran problemas de tu empresa. Usa el diagnóstico para comprobar qué necesidades se aplican realmente.",
);

export const sectorProfiles = [
  {
    id: "commerce",
    title: b("Comércio", "Comercio"),
    description: b(
      "Explore exemplos de rotinas de uma loja: apresentar produtos, responder dúvidas e acompanhar solicitações. A relevância de cada processo depende do seu modelo de venda.",
      "Explora ejemplos de tareas de una tienda: presentar productos, responder dudas y seguir solicitudes. La relevancia de cada proceso depende de tu modelo de venta.",
    ),
    processes: [
      b(
        "Apresentação de produtos e condições de compra",
        "Presentación de productos y condiciones de compra",
      ),
      b("Registro de consultas e pedidos", "Registro de consultas y pedidos"),
      b(
        "Atualização de informações do catálogo",
        "Actualización de la información del catálogo",
      ),
    ],
    exampleProblems: [
      b(
        "Exemplo: preços, características e disponibilidade espalhados em vários canais.",
        "Ejemplo: precios, características y disponibilidad dispersos en varios canales.",
      ),
      b(
        "Exemplo: solicitações sem responsável ou próximo retorno registrado.",
        "Ejemplo: solicitudes sin responsable ni próximo seguimiento registrado.",
      ),
      b(
        "Exemplo: a mesma informação digitada novamente em ferramentas diferentes.",
        "Ejemplo: la misma información introducida de nuevo en herramientas diferentes.",
      ),
    ],
    applications: [
      b(
        "Catálogo com categorias, informações e um caminho claro para consultar.",
        "Catálogo con categorías, información y una vía clara para consultar.",
      ),
      b(
        "Painel com etapas de atendimento e histórico das solicitações.",
        "Panel con etapas de atención e historial de solicitudes.",
      ),
      b(
        "Integração de formulários com uma lista de acompanhamento.",
        "Integración de formularios con una lista de seguimiento.",
      ),
    ],
    priorities: [
      priority(
        "commerce-offer",
        1,
        b(
          "Organize a oferta antes de ampliar os canais",
          "Organiza la oferta antes de ampliar los canales",
        ),
        b(
          "Se o cliente precisa perguntar informações básicas, uma apresentação própria pode reunir produtos, condições e contato.",
          "Si el cliente necesita preguntar información básica, una presentación propia puede reunir productos, condiciones y contacto.",
        ),
        "web",
        "diagnostic",
      ),
      priority(
        "commerce-requests",
        2,
        b(
          "Dê uma etapa a cada solicitação",
          "Asigna una etapa a cada solicitud",
        ),
        b(
          "Se consultas ficam dispersas, avalie um registro de etapas e próximos retornos antes de automatizar o atendimento.",
          "Si las consultas quedan dispersas, evalúa un registro de etapas y próximos seguimientos antes de automatizar la atención.",
        ),
        "systems",
        "simulator",
      ),
      priority(
        "commerce-routine",
        3,
        b(
          "Mapeie as atualizações repetidas",
          "Identifica las actualizaciones repetidas",
        ),
        b(
          "Se a equipe repete cadastros ou atualizações, estime tempo, adoção e custo para avaliar uma integração.",
          "Si el equipo repite registros o actualizaciones, estima tiempo, adopción y coste para evaluar una integración.",
        ),
        "automation",
        "productivity",
      ),
    ],
    statisticalSectorId: null,
    referenceSectorId: "trade",
    statisticalMapping: reference(
      "trade",
      b(
        "Comércio, reparação de veículos automotores e motocicletas",
        "Comercio y reparación de vehículos automotores y motocicletas",
      ),
      b(
        "Referência oficial mais ampla: a categoria do Cetic.br inclui reparação de veículos e motocicletas. Os indicadores desse conjunto não são uma medição exclusiva de lojas ou do seu tipo de comércio.",
        "Referencia oficial más amplia: la categoría de Cetic.br incluye la reparación de vehículos y motocicletas. Los indicadores de ese conjunto no son una medición exclusiva de tiendas o de tu tipo de comercio.",
      ),
    ),
    tools: [...tools],
  },
  {
    id: "food",
    title: b("Gastronomia", "Gastronomía"),
    description: b(
      "Explore exemplos de rotinas de alimentação: apresentar o cardápio, receber consultas e organizar pedidos ou reservas, quando fizerem parte da operação.",
      "Explora ejemplos de tareas de alimentación: presentar el menú, recibir consultas y organizar pedidos o reservas, cuando formen parte de la operación.",
    ),
    processes: [
      b(
        "Apresentação do cardápio e de informações de atendimento",
        "Presentación del menú y de la información de atención",
      ),
      b(
        "Registro de pedidos, consultas ou reservas",
        "Registro de pedidos, consultas o reservas",
      ),
      b(
        "Atualização de itens, horários e condições",
        "Actualización de productos, horarios y condiciones",
      ),
    ],
    exampleProblems: [
      b(
        "Exemplo: clientes encontram versões diferentes do cardápio.",
        "Ejemplo: los clientes encuentran versiones diferentes del menú.",
      ),
      b(
        "Exemplo: pedidos ou reservas precisam ser conferidos em conversas separadas.",
        "Ejemplo: los pedidos o las reservas deben comprobarse en conversaciones separadas.",
      ),
      b(
        "Exemplo: horários e condições são atualizados manualmente em cada canal.",
        "Ejemplo: los horarios y las condiciones se actualizan manualmente en cada canal.",
      ),
    ],
    applications: [
      b(
        "Página de cardápio com informações essenciais e contato.",
        "Página de menú con información esencial y contacto.",
      ),
      b(
        "Formulário de solicitação com campos adequados ao atendimento.",
        "Formulario de solicitud con campos adecuados a la atención.",
      ),
      b(
        "Painel interno para acompanhar solicitações e confirmar etapas.",
        "Panel interno para seguir solicitudes y confirmar etapas.",
      ),
    ],
    priorities: [
      priority(
        "food-menu",
        1,
        b(
          "Torne cardápio e condições fáceis de encontrar",
          "Facilita encontrar el menú y las condiciones",
        ),
        b(
          "Se informações básicas geram dúvidas recorrentes, revise uma página própria antes de adicionar novos canais.",
          "Si la información básica genera dudas frecuentes, revisa una página propia antes de añadir canales nuevos.",
        ),
        "web",
        "diagnostic",
      ),
      priority(
        "food-input",
        2,
        b(
          "Padronize as informações de entrada",
          "Estandariza la información inicial",
        ),
        b(
          "Se faltam dados para atender um pedido ou reserva, um formulário pode orientar a coleta do que é necessário.",
          "Si faltan datos para atender un pedido o una reserva, un formulario puede orientar la recogida de lo necesario.",
        ),
        "business",
        "productivity",
      ),
      priority(
        "food-followup",
        3,
        b(
          "Organize o acompanhamento da equipe",
          "Organiza el seguimiento del equipo",
        ),
        b(
          "Se há várias pessoas atendendo, avalie etapas, responsáveis e confirmações em uma visão compartilhada.",
          "Si varias personas atienden, evalúa etapas, responsables y confirmaciones en una vista compartida.",
        ),
        "systems",
        "investment",
      ),
    ],
    statisticalSectorId: null,
    referenceSectorId: "hospitalityFood",
    statisticalMapping: reference(
      "hospitalityFood",
      b("Alojamento e alimentação", "Alojamiento y alimentación"),
      b(
        "Referência oficial mais ampla: alojamento e alimentação também abrange atividades de hospedagem. Seus indicadores não medem exclusivamente restaurantes, cafeterias ou negócios de gastronomia.",
        "Referencia oficial más amplia: alojamiento y alimentación también abarca actividades de hospedaje. Sus indicadores no miden exclusivamente restaurantes, cafeterías o negocios gastronómicos.",
      ),
    ),
    tools: [...tools],
  },
  {
    id: "beauty",
    title: b("Beleza e bem-estar", "Belleza y bienestar"),
    description: b(
      "Explore exemplos de rotinas de serviços: explicar opções, receber solicitações de horário e acompanhar retornos. Esses processos variam conforme a atividade.",
      "Explora ejemplos de tareas de servicios: explicar opciones, recibir solicitudes de horario y seguir contactos. Estos procesos varían según la actividad.",
    ),
    processes: [
      b(
        "Apresentação de serviços e condições de atendimento",
        "Presentación de servicios y condiciones de atención",
      ),
      b(
        "Organização de solicitações de agendamento",
        "Organización de solicitudes de cita",
      ),
      b(
        "Acompanhamento de confirmações e retornos",
        "Seguimiento de confirmaciones y contactos posteriores",
      ),
    ],
    exampleProblems: [
      b(
        "Exemplo: serviços e formas de contratar não ficam claros nos canais.",
        "Ejemplo: los servicios y las formas de contratar no quedan claros en los canales.",
      ),
      b(
        "Exemplo: pedidos de horário ficam misturados a outras mensagens.",
        "Ejemplo: las solicitudes de horario se mezclan con otros mensajes.",
      ),
      b(
        "Exemplo: informações de atendimento precisam ser repetidas em cada conversa.",
        "Ejemplo: la información de atención debe repetirse en cada conversación.",
      ),
    ],
    applications: [
      b(
        "Página de serviços, dúvidas frequentes e caminho de contato.",
        "Página de servicios, preguntas frecuentes y vía de contacto.",
      ),
      b(
        "Formulário de preferência de horário, sem prometer confirmação automática.",
        "Formulario de preferencia de horario, sin prometer una confirmación automática.",
      ),
      b(
        "Fluxo interno com etapas e informações de orientação.",
        "Flujo interno con etapas e información de orientación.",
      ),
    ],
    priorities: [
      priority(
        "beauty-offer",
        1,
        b(
          "Explique os serviços e o próximo passo",
          "Explica los servicios y el siguiente paso",
        ),
        b(
          "Se o cliente não encontra informações essenciais, organize a apresentação antes de ampliar o atendimento digital.",
          "Si el cliente no encuentra información esencial, organiza la presentación antes de ampliar la atención digital.",
        ),
        "web",
        "diagnostic",
      ),
      priority(
        "beauty-agenda",
        2,
        b(
          "Organize as solicitações de horário",
          "Organiza las solicitudes de horario",
        ),
        b(
          "Se agendamentos ficam dispersos, avalie uma visão de solicitações, disponibilidade e responsáveis.",
          "Si las citas quedan dispersas, evalúa una vista de solicitudes, disponibilidad y responsables.",
        ),
        "systems",
        "productivity",
      ),
      priority(
        "beauty-guidance",
        3,
        b(
          "Padronize a orientação ao cliente",
          "Estandariza la orientación al cliente",
        ),
        b(
          "Se a equipe repete as mesmas orientações, mapeie o fluxo e verifique o que pode ser conectado sem perder acompanhamento.",
          "Si el equipo repite las mismas orientaciones, define el flujo y comprueba qué puede conectarse sin perder seguimiento.",
        ),
        "automation",
        "investment",
      ),
    ],
    statisticalSectorId: null,
    referenceSectorId: null,
    statisticalMapping: noMatch(
      b(
        "Não há uma categoria isolada de beleza e bem-estar nas observações carregadas. Não atribuímos os valores de “outras atividades de serviços” a salões, clínicas ou profissionais desse perfil.",
        "No hay una categoría aislada de belleza y bienestar en las observaciones cargadas. No atribuimos los valores de «otras actividades de servicios» a salones, clínicas o profesionales de este perfil.",
      ),
    ),
    tools: [...tools],
  },
  {
    id: "home",
    title: b("Serviços residenciais", "Servicios residenciales"),
    description: b(
      "Explore exemplos de rotinas de prestação de serviços: apresentar trabalhos, entender uma solicitação e organizar visitas e propostas. O escopo deve ser ajustado à sua atividade.",
      "Explora ejemplos de tareas de prestación de servicios: presentar trabajos, entender una solicitud y organizar visitas y propuestas. El alcance debe ajustarse a tu actividad.",
    ),
    processes: [
      b(
        "Apresentação de serviços e trabalhos demonstráveis",
        "Presentación de servicios y trabajos demostrables",
      ),
      b(
        "Coleta de informações para avaliar uma solicitação",
        "Recogida de información para evaluar una solicitud",
      ),
      b(
        "Acompanhamento de visitas, propostas e retornos",
        "Seguimiento de visitas, propuestas y contactos posteriores",
      ),
    ],
    exampleProblems: [
      b(
        "Exemplo: o cliente não sabe quais serviços podem ser solicitados.",
        "Ejemplo: el cliente no sabe qué servicios puede solicitar.",
      ),
      b(
        "Exemplo: a preparação de uma proposta exige várias mensagens para esclarecer o escopo.",
        "Ejemplo: preparar una propuesta requiere varios mensajes para aclarar el alcance.",
      ),
      b(
        "Exemplo: próximos retornos dependem de anotações isoladas.",
        "Ejemplo: los próximos seguimientos dependen de notas aisladas.",
      ),
    ],
    applications: [
      b(
        "Portfólio de trabalhos reais e página de serviços.",
        "Portafolio de trabajos reales y página de servicios.",
      ),
      b(
        "Formulário de levantamento inicial para uma proposta.",
        "Formulario de recogida inicial de información para una propuesta.",
      ),
      b(
        "Painel de solicitações com etapas e próximos retornos.",
        "Panel de solicitudes con etapas y próximos seguimientos.",
      ),
    ],
    priorities: [
      priority(
        "home-portfolio",
        1,
        b(
          "Apresente o que você realmente oferece",
          "Presenta lo que realmente ofreces",
        ),
        b(
          "Se o visitante não entende o escopo dos serviços, reúna informações e trabalhos autorizados em uma página própria.",
          "Si el visitante no entiende el alcance de los servicios, reúne información y trabajos autorizados en una página propia.",
        ),
        "web",
        "diagnostic",
      ),
      priority(
        "home-scope",
        2,
        b(
          "Organize os dados para o orçamento",
          "Organiza los datos para el presupuesto",
        ),
        b(
          "Se a proposta começa com informações incompletas, defina perguntas e regras de escopo antes de automatizar cálculos.",
          "Si la propuesta empieza con información incompleta, define preguntas y reglas de alcance antes de automatizar cálculos.",
        ),
        "business",
        "productivity",
      ),
      priority(
        "home-followup",
        3,
        b("Registre o próximo retorno", "Registra el próximo seguimiento"),
        b(
          "Se o acompanhamento depende da memória, avalie etapas, prazos e responsáveis em um registro comum.",
          "Si el seguimiento depende de la memoria, evalúa etapas, plazos y responsables en un registro común.",
        ),
        "systems",
        "investment",
      ),
    ],
    statisticalSectorId: null,
    referenceSectorId: null,
    statisticalMapping: noMatch(
      b(
        "Serviços residenciais podem envolver diferentes atividades econômicas. As observações carregadas não isolam esta categoria comercial; por isso não exibimos uma taxa específica para ela.",
        "Los servicios residenciales pueden incluir diferentes actividades económicas. Las observaciones cargadas no aíslan esta categoría comercial; por eso no mostramos una tasa específica para ella.",
      ),
    ),
    tools: [...tools],
  },
  {
    id: "construction",
    title: b("Construção e manutenção", "Construcción y mantenimiento"),
    description: b(
      "Explore exemplos de rotinas de projetos e serviços: qualificar solicitações, registrar escopo e acompanhar etapas. Diferentes atividades de manutenção podem ter classificações próprias.",
      "Explora ejemplos de tareas de proyectos y servicios: clasificar solicitudes, registrar el alcance y seguir etapas. Las distintas actividades de mantenimiento pueden tener clasificaciones propias.",
    ),
    processes: [
      b(
        "Levantamento de necessidades e escopo",
        "Recogida de necesidades y alcance",
      ),
      b(
        "Preparação e revisão de propostas",
        "Preparación y revisión de propuestas",
      ),
      b(
        "Acompanhamento de solicitações e etapas",
        "Seguimiento de solicitudes y etapas",
      ),
    ],
    exampleProblems: [
      b(
        "Exemplo: uma alteração de escopo não fica registrada junto à proposta.",
        "Ejemplo: un cambio de alcance no queda registrado junto a la propuesta.",
      ),
      b(
        "Exemplo: informações do projeto ficam distribuídas entre conversas e arquivos.",
        "Ejemplo: la información del proyecto queda distribuida entre conversaciones y archivos.",
      ),
      b(
        "Exemplo: a equipe copia dados de uma solicitação para vários controles.",
        "Ejemplo: el equipo copia datos de una solicitud en varios controles.",
      ),
    ],
    applications: [
      b(
        "Formulário de levantamento e estrutura de propostas por etapas.",
        "Formulario de recogida de información y estructura de propuestas por etapas.",
      ),
      b(
        "Painel de solicitações com versões de escopo e responsáveis.",
        "Panel de solicitudes con versiones del alcance y responsables.",
      ),
      b(
        "Integrações de registros e documentos conforme as ferramentas usadas.",
        "Integraciones de registros y documentos según las herramientas utilizadas.",
      ),
    ],
    priorities: [
      priority(
        "construction-scope",
        1,
        b(
          "Defina o escopo antes do cálculo",
          "Define el alcance antes del cálculo",
        ),
        b(
          "Se as propostas variam a cada solicitação, organize critérios e informações obrigatórias antes de criar um cotizador.",
          "Si las propuestas cambian en cada solicitud, organiza criterios e información obligatoria antes de crear un cotizador.",
        ),
        "business",
        "diagnostic",
      ),
      priority(
        "construction-record",
        2,
        b("Centralize o acompanhamento", "Centraliza el seguimiento"),
        b(
          "Se versões e decisões ficam dispersas, avalie uma estrutura de gestão que mantenha o contexto de cada solicitação.",
          "Si las versiones y las decisiones quedan dispersas, evalúa una estructura de gestión que mantenga el contexto de cada solicitud.",
        ),
        "systems",
        "productivity",
      ),
      priority(
        "construction-connect",
        3,
        b("Avalie as passagens manuais", "Evalúa los pasos manuales"),
        b(
          "Se há cópias repetidas entre ferramentas, estime o esforço e confirme quais integrações são tecnicamente viáveis.",
          "Si hay copias repetidas entre herramientas, estima el esfuerzo y confirma qué integraciones son técnicamente viables.",
        ),
        "automation",
        "investment",
      ),
    ],
    statisticalSectorId: null,
    referenceSectorId: "construction",
    statisticalMapping: reference(
      "construction",
      b("Construção", "Construcción"),
      b(
        "A categoria oficial de referência é Construção. A categoria comercial também cita manutenção, que pode pertencer a outras atividades; os valores não devem ser tratados como uma medição de toda empresa de manutenção.",
        "La categoría oficial de referencia es Construcción. La categoría comercial también menciona mantenimiento, que puede pertenecer a otras actividades; los valores no deben tratarse como una medición de toda empresa de mantenimiento.",
      ),
    ),
    tools: [...tools],
  },
  {
    id: "professional",
    title: b("Serviços profissionais", "Servicios profesionales"),
    description: b(
      "Explore exemplos de rotinas de serviços especializados: apresentar competências verificáveis, receber solicitações e organizar propostas e acompanhamento.",
      "Explora ejemplos de tareas de servicios especializados: presentar competencias verificables, recibir solicitudes y organizar propuestas y seguimiento.",
    ),
    processes: [
      b(
        "Apresentação de serviços e informações profissionais verificáveis",
        "Presentación de servicios e información profesional verificable",
      ),
      b(
        "Qualificação inicial de solicitações",
        "Clasificación inicial de solicitudes",
      ),
      b(
        "Organização de propostas e acompanhamento",
        "Organización de propuestas y seguimiento",
      ),
    ],
    exampleProblems: [
      b(
        "Exemplo: o visitante não entende a oferta ou como iniciar uma conversa.",
        "Ejemplo: el visitante no entiende la oferta o cómo iniciar una conversación.",
      ),
      b(
        "Exemplo: faltam informações essenciais para avaliar uma demanda.",
        "Ejemplo: falta información esencial para evaluar una necesidad.",
      ),
      b(
        "Exemplo: cada proposta e retorno é acompanhado de uma forma diferente.",
        "Ejemplo: cada propuesta y seguimiento se gestiona de una forma diferente.",
      ),
    ],
    applications: [
      b(
        "Site institucional com oferta e conteúdos autorizados.",
        "Sitio corporativo con oferta y contenidos autorizados.",
      ),
      b(
        "Formulário inteligente para entender o contexto da solicitação.",
        "Formulario inteligente para entender el contexto de la solicitud.",
      ),
      b(
        "Painel comercial com etapas, próximos retornos e indicadores definidos.",
        "Panel comercial con etapas, próximos seguimientos e indicadores definidos.",
      ),
    ],
    priorities: [
      priority(
        "professional-offer",
        1,
        b(
          "Dê clareza à apresentação profissional",
          "Aclara la presentación profesional",
        ),
        b(
          "Se a oferta não fica evidente, organize serviços, condições e apenas competências que você possa demonstrar.",
          "Si la oferta no queda clara, organiza servicios, condiciones y solo las competencias que puedas demostrar.",
        ),
        "web",
        "diagnostic",
      ),
      priority(
        "professional-intake",
        2,
        b(
          "Melhore a entrada de informações",
          "Mejora la recogida inicial de información",
        ),
        b(
          "Se a avaliação exige repetidas perguntas, defina um formulário adequado sem coletar dados pessoais desnecessários.",
          "Si la evaluación requiere preguntas repetidas, define un formulario adecuado sin recoger datos personales innecesarios.",
        ),
        "business",
        "productivity",
      ),
      priority(
        "professional-followup",
        3,
        b(
          "Organize propostas e próximos passos",
          "Organiza propuestas y próximos pasos",
        ),
        b(
          "Se o histórico comercial fica fragmentado, avalie um painel de etapas e acompanhamento antes de ampliar integrações.",
          "Si el historial comercial queda fragmentado, evalúa un panel de etapas y seguimiento antes de ampliar integraciones.",
        ),
        "systems",
        "investment",
      ),
    ],
    statisticalSectorId: null,
    referenceSectorId: "professionalAdministrative",
    statisticalMapping: reference(
      "professionalAdministrative",
      b(
        "Atividades imobiliárias, atividades profissionais, científicas e técnicas, atividades administrativas e serviços complementares",
        "Actividades inmobiliarias, actividades profesionales, científicas y técnicas, actividades administrativas y servicios complementarios",
      ),
      b(
        "O agrupamento oficial reúne atividades imobiliárias, profissionais, científicas, técnicas, administrativas e complementares. Não representa uma profissão ou especialidade isolada.",
        "La agrupación oficial reúne actividades inmobiliarias, profesionales, científicas, técnicas, administrativas y complementarias. No representa una profesión o especialidad aislada.",
      ),
    ),
    tools: [...tools],
  },
  {
    id: "other",
    title: b("Outros", "Otros"),
    description: b(
      "Use um roteiro inicial para descrever o seu negócio antes de escolher uma solução. Os exemplos são pontos de investigação, não uma classificação estatística ou avaliação da empresa.",
      "Usa un recorrido inicial para describir tu negocio antes de elegir una solución. Los ejemplos son puntos de investigación, no una clasificación estadística ni una evaluación de la empresa.",
    ),
    processes: [
      b(
        "Explicação da oferta e do público atendido",
        "Explicación de la oferta y del público atendido",
      ),
      b(
        "Registro de consultas e próximos passos",
        "Registro de consultas y próximos pasos",
      ),
      b(
        "Identificação de tarefas repetitivas",
        "Identificación de tareas repetitivas",
      ),
    ],
    exampleProblems: [
      b(
        "Exemplo: a oferta e a forma de contratação precisam ser explicadas em cada contato.",
        "Ejemplo: la oferta y la forma de contratar deben explicarse en cada contacto.",
      ),
      b(
        "Exemplo: consultas ficam sem um próximo passo definido.",
        "Ejemplo: las consultas quedan sin un siguiente paso definido.",
      ),
      b(
        "Exemplo: não está claro quanto tempo uma rotina consome.",
        "Ejemplo: no está claro cuánto tiempo consume una tarea habitual.",
      ),
    ],
    applications: [
      b(
        "Página de apresentação adaptada ao negócio.",
        "Página de presentación adaptada al negocio.",
      ),
      b(
        "Registro simples de solicitações com etapas definidas.",
        "Registro sencillo de solicitudes con etapas definidas.",
      ),
      b(
        "Mapeamento de processos antes de desenvolver automações.",
        "Definición de procesos antes de desarrollar automatizaciones.",
      ),
    ],
    priorities: [
      priority(
        "other-clarity",
        1,
        b("Mapeie a presença e a oferta", "Revisa la presencia y la oferta"),
        b(
          "Comece pelo diagnóstico para identificar quais informações e caminhos de contato precisam de atenção.",
          "Empieza por el diagnóstico para identificar qué información y vías de contacto necesitan atención.",
        ),
        "web",
        "diagnostic",
      ),
      priority(
        "other-organization",
        2,
        b(
          "Escolha um processo para organizar",
          "Elige un proceso para organizar",
        ),
        b(
          "Se houver consultas dispersas, descreva etapas e responsabilidades antes de escolher um sistema.",
          "Si hay consultas dispersas, describe etapas y responsabilidades antes de elegir un sistema.",
        ),
        "systems",
        "productivity",
      ),
      priority(
        "other-test",
        3,
        b(
          "Teste hipóteses antes de investir",
          "Prueba supuestos antes de invertir",
        ),
        b(
          "Use tempo, custos e benefícios esperados como hipóteses editáveis; confirme um escopo antes de contratar.",
          "Usa tiempo, costes y beneficios esperados como supuestos editables; confirma un alcance antes de contratar.",
        ),
        "automation",
        "investment",
      ),
    ],
    statisticalSectorId: null,
    referenceSectorId: null,
    statisticalMapping: noMatch(
      b(
        "“Outros” é uma opção comercial para negócios ainda não classificados neste centro. Não equivale ao agrupamento estatístico “outras atividades de serviços” e não possui uma taxa setorial própria.",
        "«Otros» es una opción comercial para negocios todavía no clasificados en este centro. No equivale a la agrupación estadística «otras actividades de servicios» y no tiene una tasa sectorial propia.",
      ),
    ),
    tools: [...tools],
  },
];

export function getSectorProfile(id) {
  return sectorProfiles.find((profile) => profile.id === id) || null;
}

export function sectorRecommendations(id) {
  return getSectorProfile(id)?.priorities.map((item) => ({ ...item })) || [];
}
