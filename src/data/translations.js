import { intelligenceMessages } from "./intelligence/copy.js";
export const b = (pt, es) => ({ pt, es });

export const messages = {
  ...intelligenceMessages,
  loadErrorTitle: b(
    "Não foi possível abrir esta ferramenta.",
    "No se pudo abrir esta herramienta.",
  ),
  loadErrorBody: b(
    "Verifique sua conexão e tente carregar a página novamente. Suas escolhas anônimas continuam nesta sessão.",
    "Revisa tu conexión e intenta cargar la página de nuevo. Tus selecciones anónimas continúan en esta sesión.",
  ),
  retry: b("Tentar novamente", "Intentar de nuevo"),
  loading: b("Preparando sua próxima etapa…", "Preparando tu próximo paso…"),
  allProjects: b(
    "Explorar o portfólio completo",
    "Explorar el portafolio completo",
  ),
  breadcrumbs: b("Caminho da página", "Ruta de la página"),
  toolsNavigation: b("Ferramentas digitais", "Herramientas digitales"),
  simulatorNav: b("Simulador", "Simulador"),
  toolsEyebrow: b("CLAREZA PARA DECIDIR", "CLARIDAD PARA DECIDIR"),
  toolsTitle: b(
    "Encontre o seu ponto de partida.",
    "Encuentra tu punto de partida.",
  ),
  toolsBody: b(
    "Três ferramentas, cada uma com seu espaço. Entenda prioridades, explore cenários e organize a conversa sobre seu projeto.",
    "Tres herramientas, cada una con su espacio. Entiende tus prioridades, explora escenarios y organiza la conversación sobre tu proyecto.",
  ),
  diagnosticCard: b(
    "Responda oito perguntas e conheça prioridades para a estrutura digital do seu negócio.",
    "Responde ocho preguntas y conoce las prioridades para la estructura digital de tu negocio.",
  ),
  simulatorCard: b(
    "Ajuste consultas, conversão e ticket médio para comparar hipóteses ilustrativas.",
    "Ajusta consultas, conversión y valor medio de venta para comparar supuestos ilustrativos.",
  ),
  quoteCard: b(
    "Reúna soluções e funcionalidades em um briefing que você pode revisar, copiar ou baixar.",
    "Reúne soluciones y funcionalidades en un briefing que puedes revisar, copiar o descargar.",
  ),
  startDiagnostic: b("Começar diagnóstico", "Empezar diagnóstico"),
  exploreScenario: b("Explorar cenários", "Explorar escenarios"),
  skip: b("Pular para o conteúdo", "Saltar al contenido"),
  invalidContact: b(
    "Informe um e-mail ou telefone válido, ou deixe o contato em branco.",
    "Introduce un correo o teléfono válido, o deja el contacto en blanco.",
  ),
  footerCraft: b(
    "Estratégia. Design. Tecnologia.",
    "Estrategia. Diseño. Tecnología.",
  ),
  downloadApp: b(
    "Baixar Loop Avante para Android",
    "Descargar Loop Avante para Android",
  ),
  navigation: b("Navegação principal", "Navegación principal"),
  home: b("Início", "Inicio"),
  solutions: b("Soluções", "Soluciones"),
  impact: b("Impacto", "Impacto"),
  projects: b("Projetos", "Proyectos"),
  app: b("Aplicativo", "Aplicación"),
  diagnostic: b("Diagnóstico", "Diagnóstico"),
  contact: b("Contato", "Contacto"),
  openMenu: b("Abrir menu", "Abrir menú"),
  closeMenu: b("Fechar menu", "Cerrar menú"),
  language: b("Selecionar idioma", "Seleccionar idioma"),
  themeLight: b("Ativar tema claro", "Activar tema claro"),
  themeDark: b("Ativar tema escuro", "Activar tema oscuro"),
  requestQuote: b("Solicitar orçamento", "Solicitar presupuesto"),
  exploreProjects: b("Explorar projetos", "Explorar proyectos"),
  heroEyebrow: b(
    "ESTÚDIO DE TECNOLOGIA · CURITIBA, BRASIL",
    "ESTUDIO DE TECNOLOGÍA · CURITIBA, BRASIL",
  ),
  heroTitle: b("Tecnologia para o", "Tecnología para el"),
  heroAccent: b("próximo passo", "próximo paso"),
  heroEnd: b("do seu negócio.", "de tu negocio."),
  heroBody: b(
    "Sites, sistemas e aplicativos que conectam sua presença digital aos desafios reais da sua empresa. Da primeira ideia à próxima evolução.",
    "Sitios, sistemas y aplicaciones que conectan tu presencia digital con los desafíos reales de tu empresa. De la primera idea a la próxima evolución.",
  ),
  heroNote: b(
    "Estratégia, design e desenvolvimento. No mesmo loop.",
    "Estrategia, diseño y desarrollo. En el mismo loop.",
  ),
  artLabel: b(
    "Composição conceitual de um ecossistema digital",
    "Composición conceptual de un ecosistema digital",
  ),
  artCaption: b(
    "UMA IDEIA. POSSIBILIDADES CONECTADAS.",
    "UNA IDEA. POSIBILIDADES CONECTADAS.",
  ),
  overview: b("Visão geral", "Vista general"),
  ecosystem: b("Seu negócio, conectado.", "Tu negocio, conectado."),
  ecosystemSub: b(
    "Uma estrutura digital que trabalha em conjunto.",
    "Una estructura digital que trabaja en conjunto.",
  ),
  presence: b("Presença", "Presencia"),
  management: b("Gestão", "Gestión"),
  connection: b("Conexão", "Conexión"),
  inquiries: b("Consultas", "Consultas"),
  integration: b("Integração", "Integración"),
  yourNext: b("Qual é o seu próximo passo?", "¿Cuál es tu próximo paso?"),
  newProject: b("Novo projeto", "Nuevo proyecto"),
  connected: b("Tudo se conecta.", "Todo se conecta."),
  strip: b(
    "Da presença à operação. Tecnologia com propósito.",
    "De la presencia a la operación. Tecnología con propósito.",
  ),
  solutionEyebrow: b("01 / O QUE CONSTRUÍMOS", "01 / LO QUE CONSTRUIMOS"),
  solutionTitle: b(
    "Seu desafio é o nosso ponto de partida.",
    "Tu desafío es nuestro punto de partida.",
  ),
  solutionBody: b(
    "Cada negócio tem um próximo passo diferente. Desenhamos a solução que faz sentido para o seu.",
    "Cada negocio tiene un próximo paso diferente. Diseñamos la solución que tiene sentido para el tuyo.",
  ),
  discussSolution: b("Incluir no meu projeto", "Incluir en mi proyecto"),
  examples: b("Na prática", "En la práctica"),
  impactEyebrow: b("02 / O CENÁRIO DIGITAL", "02 / EL PANORAMA DIGITAL"),
  impactTitle: b(
    "O digital não é apenas presença. É oportunidade.",
    "Lo digital no es solo presencia. Es oportunidad.",
  ),
  impactBody: b(
    "Canais, conteúdo e atendimento podem funcionar melhor quando fazem parte da mesma estrutura. Os dados ajudam a entender o cenário.",
    "Los canales, el contenido y la atención pueden funcionar mejor cuando forman parte de una misma estructura. Los datos ayudan a entender el panorama.",
  ),
  marketChart: b(
    "Adoção de canais digitais · 2025",
    "Adopción de canales digitales · 2025",
  ),
  websiteHeadline: b(
    "das empresas com Internet possuíam website.",
    "de las empresas con Internet tenían sitio web.",
  ),
  marketPopulation: b(
    "Base: empresas com acesso à Internet, com 10 ou mais pessoas ocupadas, nos setores pesquisados no Brasil.",
    "Base: empresas con acceso a Internet, con 10 o más personas ocupadas, de los sectores investigados en Brasil.",
  ),
  marketNote: b(
    "Indicadores de adoção. Não demonstram aumento de vendas nem relação de causa e efeito. Não representam todos os MEI ou negócios com menos de 10 pessoas.",
    "Indicadores de adopción. No demuestran aumentos de ventas ni una relación de causa y efecto. No representan a todos los MEI o negocios de menos de 10 personas.",
  ),
  sources: b(
    "Fontes, universos e metodologia",
    "Fuentes, universos y metodología",
  ),
  viewSource: b("Consultar indicador", "Consultar indicador"),
  crmTitle: b(
    "Relacionamentos também precisam de estrutura.",
    "Las relaciones también necesitan estructura.",
  ),
  crmCopy: b(
    "usaram CRM para gerenciar informações de clientes nos últimos 12 meses.",
    "usaron CRM para gestionar información de clientes durante los últimos 12 meses.",
  ),
  crmBase: b(
    "Base distinta: total de empresas da pesquisa, com 10 ou mais pessoas. Cetic.br · G3 · 2025.",
    "Base distinta: total de empresas de la encuesta, con 10 o más personas. Cetic.br · G3 · 2025.",
  ),
  simulatorEyebrow: b("EXPLORE AS VARIÁVEIS", "EXPLORA LAS VARIABLES"),
  simulatorTitle: b(
    "E se o próximo passo fosse mais claro?",
    "¿Y si el próximo paso fuera más claro?",
  ),
  simulatorIntro: b(
    "Simulador de Potencial Digital",
    "Simulador de Potencial Digital",
  ),
  simulatorBody: b(
    "Mude as hipóteses e entenda como consultas, conversão e ticket médio se relacionam. Os valores iniciais são apenas exemplos editáveis.",
    "Cambia los supuestos y entiende cómo se relacionan las consultas, la conversión y el valor medio de venta. Los valores iniciales son ejemplos editables.",
  ),
  monthlyInquiries: b("Consultas por mês", "Consultas por mes"),
  inquiriesHelp: b(
    "Contatos comerciais recebidos, não visitantes do site.",
    "Contactos comerciales recibidos, no visitantes del sitio.",
  ),
  conversion: b("Conversão atual (%)", "Conversión actual (%)"),
  conversionHelp: b(
    "Parcela das consultas que se tornam vendas.",
    "Proporción de consultas que se convierten en ventas.",
  ),
  ticket: b("Ticket médio por venda (R$)", "Valor medio por venta (R$)"),
  ticketHelp: b(
    "Valor médio de uma venda, em reais brasileiros.",
    "Valor medio de una venta, en reales brasileños.",
  ),
  growth: b(
    "Aumento hipotético de consultas",
    "Aumento hipotético de consultas",
  ),
  conversionGain: b(
    "Melhora hipotética de conversão",
    "Mejora hipotética de conversión",
  ),
  percentagePoints: b("p.p.", "p.p."),
  current: b("Cenário atual", "Escenario actual"),
  scenario: b("Novo cenário", "Nuevo escenario"),
  perMonth: b("/ mês", "/ mes"),
  estimatedSales: b("Vendas estimadas", "Ventas estimadas"),
  illustrativeRevenue: b("Faturamento ilustrativo", "Facturación ilustrativa"),
  difference: b("Diferença entre cenários", "Diferencia entre escenarios"),
  simulatorWarning: b(
    "Simulação ilustrativa baseada nas informações e hipóteses fornecidas. Não representa previsão nem garantia de resultados.",
    "Simulación ilustrativa basada en la información y las hipótesis proporcionadas. No representa una previsión ni una garantía de resultados.",
  ),
  formula: b("Como calculamos", "Cómo calculamos"),
  formulaCopy: b(
    "Vendas = consultas/mês × conversão ÷ 100. Faturamento = vendas × ticket médio. No novo cenário, aplicamos o aumento de consultas e somamos a melhora de conversão em pontos percentuais. Vendas fracionárias representam uma média matemática. Custos, impostos e lucro não estão incluídos.",
    "Ventas = consultas/mes × conversión ÷ 100. Facturación = ventas × valor medio. En el nuevo escenario aplicamos el aumento de consultas y sumamos la mejora de conversión en puntos porcentuales. Las ventas fraccionarias representan una media matemática. No se incluyen costes, impuestos ni beneficios.",
  ),
  invalidNumbers: b(
    "Informe números válidos nos limites indicados para calcular o cenário.",
    "Introduce números válidos dentro de los límites indicados para calcular el escenario.",
  ),
  portfolioEyebrow: b(
    "03 / IDEIAS QUE GANHARAM FORMA",
    "03 / IDEAS QUE TOMARON FORMA",
  ),
  portfolioTitle: b(
    "Projetos reais. Identidades únicas.",
    "Proyectos reales. Identidades únicas.",
  ),
  portfolioBody: b(
    "Do universo literário à marca pessoal: dois ecossistemas digitais com participação da Loop Avante no design e desenvolvimento.",
    "Del universo literario a la marca personal: dos ecosistemas digitales con participación de Loop Avante en el diseño y desarrollo.",
  ),
  visitProject: b("Visitar projeto", "Visitar proyecto"),
  objective: b("O objetivo", "El objetivo"),
  projectImage: b(
    "Captura real da página inicial de",
    "Captura real de la página de inicio de",
  ),
  projectResource: b(
    "Imagem original do projeto",
    "Imagen original del proyecto",
  ),
  ownProduct: b("PRODUTO PRÓPRIO", "PRODUCTO PROPIO"),
  websiteProduct: b("Loop Avante Website", "Loop Avante Website"),
  websiteProductCopy: b(
    "Este ecossistema: presença institucional, diagnóstico e ferramentas comerciais em uma experiência integrada.",
    "Este ecosistema: presencia institucional, diagnóstico y herramientas comerciales en una experiencia integrada.",
  ),
  mobileEyebrow: b("EXCLUSIVO NO APLICATIVO", "EXCLUSIVO EN LA APLICACIÓN"),
  mobileTitle: b("Seu negócio evolui.", "Tu negocio evoluciona."),
  mobileTitleAccent: b("Você acompanha cada passo.", "Tú acompañas cada paso."),
  mobileBody: b(
    "Transforme oportunidades de melhoria em ações concretas com o Loop Ação, uma experiência exclusiva do aplicativo Loop Avante.",
    "Transforma oportunidades de mejora en acciones concretas con Loop Ação, una experiencia exclusiva de la aplicación Loop Avante.",
  ),
  mobileFeature1: b(
    "Explore soluções e filtre serviços.",
    "Explora soluciones y filtra servicios.",
  ),
  mobileFeature2: b(
    "Conheça processos e setores de atuação.",
    "Conoce los procesos y sectores de actividad.",
  ),
  mobileFeature3: b(
    "Monte uma seleção no cotizador.",
    "Prepara una selección en el cotizador.",
  ),
  mobilePreview: b(
    "Representação conceitual baseada nos recursos do aplicativo. Dados de exemplo; não é uma captura de tela.",
    "Representación conceptual basada en las funciones de la aplicación. Datos de ejemplo; no es una captura de pantalla.",
  ),
  mobileStatus: b(
    "APK da Loop Avante para instalação direta no Android.",
    "APK de Loop Avante para instalación directa en Android.",
  ),
  mobileAvailability: b(
    "Versão Android. Download público em preparação.",
    "Versión Android. Descarga pública en preparación.",
  ),
  knowLoopAction: b("Conhecer o Loop Ação", "Conocer Loop Ação"),
  loopActionLocal: b(
    "Seu plano no dispositivo. Sem precisar criar uma conta.",
    "Tu plan en el dispositivo. Sin necesidad de crear una cuenta.",
  ),
  loopActionConcept: b("PRÉVIA CONCEITUAL", "VISTA CONCEPTUAL"),
  loopActionDays: b("DIAS", "DÍAS"),
  loopActionPreviewTitle: b("Um passo de cada vez.", "Un paso a la vez."),
  loopActionPreviewBody: b(
    "Seu plano de evolução digital.",
    "Tu plan de evolución digital.",
  ),
  loopActionYourProgress: b("Seu progresso", "Tu progreso"),
  loopActionCompleted: b("ações concluídas", "acciones completadas"),
  loopActionWeek: b("Suas ações", "Tus acciones"),
  loopActionTask1: b(
    "Organizar os pontos de contato",
    "Organizar los puntos de contacto",
  ),
  loopActionTask2: b(
    "Revisar sua presença digital",
    "Revisar tu presencia digital",
  ),
  loopActionTaskDone: b("Concluída · Semana 1", "Completada · Semana 1"),
  loopActionTaskPending: b(
    "Próximo passo · Semana 2",
    "Próximo paso · Semana 2",
  ),
  loopActionPreviewNote: b(
    "Uma nota. Uma foto. Uma conquista.",
    "Una nota. Una foto. Un logro.",
  ),
  loopActionDetailEyebrow: b(
    "DA INTENÇÃO À AÇÃO",
    "DE LA INTENCIÓN A LA ACCIÓN",
  ),
  loopActionDetailTitle: b(
    "Pequenas ações. Uma evolução que você vê.",
    "Pequeñas acciones. Una evolución que puedes ver.",
  ),
  loopActionPlan: b("Planeje suas melhorias.", "Planifica tus mejoras."),
  loopActionPlanBody: b(
    "Responda ao diagnóstico e crie um plano de 30 dias. Organize ações, prioridades e datas no seu ritmo.",
    "Responde al diagnóstico y crea un plan de 30 días. Organiza acciones, prioridades y fechas a tu ritmo.",
  ),
  loopActionProgress: b("Acompanhe seu progresso.", "Sigue tu progreso."),
  loopActionProgressBody: b(
    "Conclua tarefas, veja o avanço do plano e consulte o histórico. Ative lembretes locais quando quiser.",
    "Completa tareas, consulta el avance del plan y revisa el historial. Activa recordatorios locales cuando quieras.",
  ),
  loopActionEvidence: b("Registre cada conquista.", "Registra cada logro."),
  loopActionEvidenceBody: b(
    "Guarde notas e fotos junto às ações. Seu plano e suas evidências ficam no armazenamento local do aplicativo.",
    "Guarda notas y fotos junto a las acciones. Tu plan y tus evidencias permanecen en el almacenamiento local de la aplicación.",
  ),
  loopActionInstallTitle: b(
    "Como instalar a versão Android",
    "Cómo instalar la versión Android",
  ),
  loopActionInstallOrigin: b(
    "APK disponibilizada pela Loop Avante em",
    "APK proporcionada por Loop Avante en",
  ),
  loopActionInstallStep1: b(
    "Baixe o arquivo APK pelo botão desta seção e confira a origem do arquivo.",
    "Descarga el archivo APK con el botón de esta sección y comprueba su origen.",
  ),
  loopActionInstallStep2: b(
    "Abra o arquivo e siga as instruções do instalador Android. Mantenha as proteções de segurança do dispositivo ativadas.",
    "Abre el archivo y sigue las instrucciones del instalador Android. Mantén activadas las protecciones de seguridad del dispositivo.",
  ),
  requestAccess: b(
    "Solicitar informações de acesso",
    "Solicitar información de acceso",
  ),
  mobilePreviewTitle: b(
    "Seu negócio local, com possibilidades sem limites.",
    "Tu negocio local, con posibilidades sin límites.",
  ),
  viewServices: b("Conheça os serviços", "Conoce los servicios"),
  mobileDark: b("Tema escuro · PT / ES", "Tema oscuro · PT / ES"),
  diagnosticEyebrow: b("05 / UM PONTO DE PARTIDA", "05 / UN PUNTO DE PARTIDA"),
  diagnosticTitle: b(
    "Antes de construir, entenda o que vem primeiro.",
    "Antes de construir, entiende qué viene primero.",
  ),
  diagnosticName: b("Loop Diagnóstico Digital", "Loop Diagnóstico Digital"),
  diagnosticBody: b(
    "Oito perguntas sobre a sua estrutura digital. Um retrato inicial e recomendações para orientar a próxima conversa.",
    "Ocho preguntas sobre tu estructura digital. Una visión inicial y recomendaciones para orientar la próxima conversación.",
  ),
  diagnosticPrivacy: b(
    "Sem cadastro. As respostas ficam na sessão desta aba para continuar entre páginas. Nada é enviado a um servidor.",
    "Sin registro. Las respuestas permanecen en la sesión de esta pestaña para continuar entre páginas. No se envían a un servidor.",
  ),
  question: b("Pergunta", "Pregunta"),
  of: b("de", "de"),
  previous: b("Anterior", "Anterior"),
  next: b("Próxima", "Siguiente"),
  seeResults: b("Ver meu diagnóstico", "Ver mi diagnóstico"),
  answerRequired: b(
    "Selecione uma resposta para continuar.",
    "Selecciona una respuesta para continuar.",
  ),
  diagnosticResult: b("Seu ponto de partida", "Tu punto de partida"),
  declaredStrengths: b("Fortalezas declaradas", "Fortalezas declaradas"),
  opportunities: b(
    "Oportunidades identificadas",
    "Oportunidades identificadas",
  ),
  priorities: b(
    "Três próximos passos prioritários",
    "Tres próximos pasos prioritarios",
  ),
  noStrengths: b(
    "Você já deu o primeiro passo ao mapear a situação. Vamos começar por uma base organizada.",
    "Ya diste el primer paso al revisar tu situación. Empecemos por una base organizada.",
  ),
  noGaps: b(
    "Sua base declarada está estruturada. Vale revisar usabilidade, integrações e mensuração.",
    "La base que declaras está estructurada. Conviene revisar usabilidad, integraciones y medición.",
  ),
  diagnosticMethod: b(
    "Como chegamos a este resultado",
    "Cómo llegamos a este resultado",
  ),
  diagnosticMethodCopy: b(
    "Cada resposta é classificada como inicial, parcial ou estruturada. Com 4 ou mais áreas iniciais: Presença inicial; com pelo menos 5 estruturadas: Boa base digital; sem áreas iniciais e com menos de 5 estruturadas: Oportunidades de otimização; nos demais casos: Estrutura em desenvolvimento. As três prioridades seguem a necessidade declarada e a ordem: presença, organização de consultas, orçamentos, atendimento, compra, medição, descoberta local e redes sociais. Não é auditoria técnica nem pontuação de desempenho.",
    "Cada respuesta se clasifica como inicial, parcial o estructurada. Con 4 o más áreas iniciales: Presencia inicial; con al menos 5 estructuradas: Buena base digital; sin áreas iniciales y con menos de 5 estructuradas: Oportunidades de optimización; en los demás casos: Estructura en desarrollo. Las tres prioridades siguen la necesidad declarada y el orden: presencia, organización de consultas, presupuestos, atención, compra, medición, descubrimiento local y redes sociales. No es una auditoría técnica ni una puntuación de rendimiento.",
  ),
  talkDiagnostic: b(
    "Preparar uma conversa sobre o resultado",
    "Preparar una conversación sobre el resultado",
  ),
  restart: b("Refazer diagnóstico", "Repetir diagnóstico"),
  quoteEyebrow: b("06 / VAMOS TIRAR DO PAPEL", "06 / HAGÁMOSLO REALIDAD"),
  quoteTitle: b(
    "Um bom projeto começa com uma boa conversa.",
    "Un buen proyecto empieza con una buena conversación.",
  ),
  quoteBody: b(
    "Escolha as soluções, descreva sua necessidade e indique o orçamento disponível, se desejar. Revise o briefing e abra o WhatsApp para confirmar o envio.",
    "Elige las soluciones, describe tu necesidad e indica el presupuesto disponible, si lo deseas. Revisa el briefing y abre WhatsApp para confirmar el envío.",
  ),
  chooseSolutions: b(
    "1. O que você precisa construir?",
    "1. ¿Qué necesitas construir?",
  ),
  projectDescription: b(
    "2. Conte um pouco sobre a ideia",
    "2. Cuéntanos un poco sobre la idea",
  ),
  descriptionPlaceholder: b(
    "Qual problema sua empresa precisa resolver? Para quem será a solução?",
    "¿Qué problema necesita resolver tu empresa? ¿Para quién será la solución?",
  ),
  desiredFeatures: b(
    "3. Funcionalidades desejadas",
    "3. Funcionalidades deseadas",
  ),
  budget: b(
    "Orçamento disponível (opcional)",
    "Presupuesto disponible (opcional)",
  ),
  deadline: b("Prazo esperado", "Plazo esperado"),
  noDeadline: b("A definir em conjunto", "Por definir juntos"),
  deadline1: b("Até 1 mês", "Hasta 1 mes"),
  deadline2: b("1 a 3 meses", "De 1 a 3 meses"),
  deadline3: b("Mais de 3 meses", "Más de 3 meses"),
  volunteerContact: b(
    "Contato para a proposta (opcional)",
    "Contacto para la propuesta (opcional)",
  ),
  yourName: b("Seu nome", "Tu nombre"),
  contactDetail: b("E-mail ou telefone", "Correo o teléfono"),
  contactPlaceholder: b(
    "Como você prefere ser contatado?",
    "¿Cómo prefieres que te contacten?",
  ),
  quoteSummary: b("Briefing do seu projeto", "Briefing de tu proyecto"),
  scopeCount: b("Soluções selecionadas", "Soluciones seleccionadas"),
  featureCount: b(
    "Funcionalidades selecionadas",
    "Funcionalidades seleccionadas",
  ),
  investment: b("Investimento", "Inversión"),
  onRequest: b("Sob consulta", "Bajo consulta"),
  noRates: b(
    "Proposta personalizada após definição do escopo. Não publicamos tarifas sem validação.",
    "Propuesta personalizada tras definir el alcance. No publicamos tarifas sin validación.",
  ),
  briefPrivacy: b(
    "Seleções e valores de planejamento ficam na sessão desta aba. Nome, contato e texto livre ficam nesta página, sem salvar nem enviar automaticamente. O resumo usa os campos preenchidos; revise antes de copiar, baixar ou abrir no WhatsApp.",
    "Las selecciones y los valores de planificación permanecen en la sesión de esta pestaña. El nombre, el contacto y el texto libre quedan en esta página, sin guardarse ni enviarse automáticamente. El resumen usa los campos completados; revísalo antes de copiarlo, descargarlo o abrirlo en WhatsApp.",
  ),
  generateBrief: b("Gerar resumo do projeto", "Generar resumen del proyecto"),
  selectRequired: b(
    "Selecione ao menos uma solução.",
    "Selecciona al menos una solución.",
  ),
  descriptionRequired: b(
    "Descreva sua ideia com pelo menos 20 caracteres.",
    "Describe tu idea con al menos 20 caracteres.",
  ),
  summaryReady: b(
    "Resumo pronto para revisar e compartilhar.",
    "Resumen listo para revisar y compartir.",
  ),
  copy: b("Copiar resumo", "Copiar resumen"),
  download: b("Baixar resumo (.txt)", "Descargar resumen (.txt)"),
  copied: b("Resumo copiado.", "Resumen copiado."),
  copyFailed: b(
    "Não foi possível copiar. Use o download do resumo.",
    "No se pudo copiar. Descarga el resumen.",
  ),
  editBrief: b("Editar projeto", "Editar proyecto"),
  shareWhatsapp: b(
    "Enviar projeto pelo WhatsApp",
    "Enviar proyecto por WhatsApp",
  ),
  shareEmail: b("Abrir e-mail com o resumo", "Abrir correo con el resumen"),
  sendNotice: b(
    "O envio acontece somente se você confirmar no aplicativo de destino.",
    "El envío ocurre solo si lo confirmas en la aplicación de destino.",
  ),
  localContactNotice: b(
    "Canal de atendimento em configuração. Seu briefing fica pronto para você guardar e compartilhar.",
    "Canal de atención en configuración. Tu briefing queda listo para guardar y compartir.",
  ),
  budgetTotal: b(
    "Soma do orçamento que você informou",
    "Suma del presupuesto que indicaste",
  ),
  budgetSingle: b(
    "Disponível para implantação (R$)",
    "Disponible para implementación (R$)",
  ),
  budgetMonthly: b("Disponível por mês (R$)", "Disponible por mes (R$)"),
  budgetHelp: b(
    "Valores informados por você. Não são preços dos serviços; não somamos investimento único com mensalidade.",
    "Valores indicados por ti. No son precios de los servicios; no sumamos inversión única y mensualidad.",
  ),
  notSpecified: b("Não informado", "No indicado"),
  processEyebrow: b(
    "07 / DO PRIMEIRO LOOP AO PRÓXIMO",
    "07 / DEL PRIMER LOOP AL SIGUIENTE",
  ),
  processTitle: b(
    "Clareza em cada etapa. Cuidado em cada entrega.",
    "Claridad en cada etapa. Cuidado en cada entrega.",
  ),
  processBody: b(
    "Um processo próximo e organizado, com decisões compartilhadas e escopo definido antes do desenvolvimento.",
    "Un proceso cercano y organizado, con decisiones compartidas y alcance definido antes del desarrollo.",
  ),
  teamEyebrow: b("QUEM FAZ ACONTECER", "QUIÉNES LO HACEN POSIBLE"),
  teamTitle: b(
    "Pessoas por trás de cada solução.",
    "Personas detrás de cada solución.",
  ),
  teamBody: b(
    "Estratégia, tecnologia e design conectados em uma equipe próxima do seu projeto.",
    "Estrategia, tecnología y diseño conectados en un equipo cercano a tu proyecto.",
  ),
  contactEyebrow: b(
    "O SEU PRÓXIMO PASSO COMEÇA AQUI",
    "TU PRÓXIMO PASO EMPIEZA AQUÍ",
  ),
  contactTitle: b(
    "Vamos colocar sua ideia em movimento?",
    "¿Ponemos tu idea en movimiento?",
  ),
  contactBody: b(
    "Conte o que você quer construir. O briefing ajuda a transformar sua necessidade em uma conversa objetiva.",
    "Cuéntanos qué quieres construir. El briefing ayuda a transformar tu necesidad en una conversación concreta.",
  ),
  prepareBrief: b("Preparar meu projeto", "Preparar mi proyecto"),
  tryDiagnostic: b("Começar pelo diagnóstico", "Empezar por el diagnóstico"),
  footerLine: b(
    "Tecnologia para negócios que querem avançar.",
    "Tecnología para negocios que quieren avanzar.",
  ),
  rights: b("Todos os direitos reservados.", "Todos los derechos reservados."),
  backTop: b("Voltar ao início", "Volver al inicio"),
  privacy: b("Privacidade e uso", "Privacidad y uso"),
  privacyText: b(
    "Este site não exige cadastro nem usa cookies de publicidade ou análise. Idioma e tema são guardados no armazenamento local. Respostas do diagnóstico, hipóteses do simulador, serviços e opções de orçamento usam o armazenamento de sessão desta aba para continuar entre páginas. Nome, contato e texto livre do briefing não são salvos. Não há envio automático a servidores. Copiar ou baixar é uma ação local; canais externos dependem da sua escolha e têm políticas próprias.",
    "Este sitio no exige registro ni usa cookies publicitarias o de analítica. El idioma y el tema se guardan en el almacenamiento local. Las respuestas del diagnóstico, las hipótesis del simulador, los servicios y las opciones de presupuesto usan el almacenamiento de sesión de esta pestaña para continuar entre páginas. El nombre, el contacto y el texto libre del briefing no se guardan. No hay envío automático a servidores. Copiar o descargar es una acción local; los canales externos dependen de tu elección y tienen sus propias políticas.",
  ),
  notFoundTitle: b(
    "Esse caminho ainda não existe.",
    "Este camino todavía no existe.",
  ),
  notFoundBody: b(
    "Mas o próximo passo pode começar na página inicial.",
    "Pero el próximo paso puede empezar en la página de inicio.",
  ),
  seoTitle: b(
    "Loop Avante — Sites, sistemas e aplicativos para negócios",
    "Loop Avante — Sitios, sistemas y aplicaciones para negocios",
  ),
  seoDescription: b(
    "Tecnologia para negócios que querem avançar. Desenvolvimento de sites, sistemas web, aplicativos e automações. Explore projetos e faça seu diagnóstico digital.",
    "Tecnología para negocios que quieren avanzar. Desarrollo de sitios, sistemas web, aplicaciones y automatizaciones. Explora proyectos y realiza tu diagnóstico digital.",
  ),
  simulationBrief: b(
    "Quero conversar sobre o potencial digital do meu negócio.",
    "Quiero conversar sobre el potencial digital de mi negocio.",
  ),
  appBrief: b(
    "Gostaria de conhecer o aplicativo Loop Avante e receber informações sobre disponibilidade de acesso.",
    "Me gustaría conocer la aplicación Loop Avante y recibir información sobre la disponibilidad de acceso.",
  ),
};

export function translate(value, language) {
  const entry = typeof value === "string" ? messages[value] : value;
  if (!entry?.[language])
    throw new Error(`Missing translation: ${String(value)} (${language})`);
  return entry[language];
}
