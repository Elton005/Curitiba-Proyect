import { b } from "./translations.js";
import gallery from "./projectGallery.json" with { type: "json" };

export const upcomingProduct = gallery.upcoming;

export const solutions = [
  {
    id: "web",
    icon: "web",
    title: b("Websites & Landing Pages", "Sitios web y landing pages"),
    copy: b(
      "Sua empresa bem apresentada, com uma experiência que orienta o visitante até o próximo passo.",
      "Tu empresa bien presentada, con una experiencia que guía al visitante hasta el próximo paso.",
    ),
    benefit: b(
      "Clareza, identidade e navegação fácil.",
      "Claridad, identidad y navegación fácil.",
    ),
    examples: b(
      "Sites institucionais · Páginas de campanhas",
      "Sitios corporativos · Páginas de campañas",
    ),
  },
  {
    id: "systems",
    icon: "grid",
    title: b("Sistemas Web", "Sistemas web"),
    copy: b(
      "Informações e rotinas em um só lugar, para simplificar a operação do seu negócio.",
      "Información y tareas en un solo lugar para simplificar la operación de tu negocio.",
    ),
    benefit: b(
      "Menos dispersão. Mais organização.",
      "Menos dispersión. Más organización.",
    ),
    examples: b(
      "Painéis de gestão · Plataformas internas",
      "Paneles de gestión · Plataformas internas",
    ),
  },
  {
    id: "mobile",
    icon: "phone",
    title: b("Aplicativos Mobile", "Aplicaciones móviles"),
    copy: b(
      "Experiências pensadas para o celular e para as pessoas que vão usá-las.",
      "Experiencias pensadas para el celular y para las personas que las usarán.",
    ),
    benefit: b(
      "Acesso prático aos seus serviços.",
      "Acceso práctico a tus servicios.",
    ),
    examples: b(
      "Catálogos · Aplicativos de serviços",
      "Catálogos · Aplicaciones de servicios",
    ),
  },
  {
    id: "automation",
    icon: "workflow",
    title: b("Automação & Integrações", "Automatización e integraciones"),
    copy: b(
      "Conecte ferramentas e reduza etapas repetitivas nos seus processos.",
      "Conecta herramientas y reduce pasos repetitivos en tus procesos.",
    ),
    benefit: b(
      "Fluxos mais simples e conectados.",
      "Flujos más simples y conectados.",
    ),
    examples: b(
      "Formulários conectados · Rotinas internas",
      "Formularios conectados · Tareas internas",
    ),
  },
  {
    id: "business",
    icon: "spark",
    title: b("Soluções para Negócios", "Soluciones para negocios"),
    copy: b(
      "Ferramentas sob medida para transformar uma necessidade específica em uma solução útil.",
      "Herramientas a medida para transformar una necesidad específica en una solución útil.",
    ),
    benefit: b(
      "Tecnologia adaptada ao seu contexto.",
      "Tecnología adaptada a tu contexto.",
    ),
    examples: b(
      "Cotizadores · Formulários inteligentes",
      "Cotizadores · Formularios inteligentes",
    ),
  },
];

export const features = [
  {
    id: "forms",
    title: b("Formulários e solicitações", "Formularios y solicitudes"),
  },
  {
    id: "catalog",
    title: b(
      "Catálogo de produtos ou serviços",
      "Catálogo de productos o servicios",
    ),
  },
  { id: "dashboard", title: b("Painel de gestão", "Panel de gestión") },
  {
    id: "integrations",
    title: b(
      "Integrações entre ferramentas",
      "Integraciones entre herramientas",
    ),
  },
  {
    id: "quotes",
    title: b("Orçamentos e fluxo comercial", "Presupuestos y flujo comercial"),
  },
  {
    id: "metrics",
    title: b("Medição e acompanhamento", "Medición y seguimiento"),
  },
];

export const projects = [
  {
    id: "huella",
    name: "La Huella Escrita",
    url: "https://www.lahuellaescrita.com/",
    image: gallery.projects.huella[0].image,
    gallery: gallery.projects.huella,
    category: b("ECOSSISTEMA EDITORIAL", "ECOSISTEMA EDITORIAL"),
    copy: b(
      "Um universo de histórias, reunido em uma experiência com identidade própria.",
      "Un universo de historias reunido en una experiencia con identidad propia.",
    ),
    objective: b(
      "Conectar a apresentação do autor, a biblioteca, o blog e os recursos em uma presença editorial coesa.",
      "Conectar la presentación del autor, la biblioteca, el blog y los recursos en una presencia editorial coherente.",
    ),
    highlights: [
      b("Biblioteca", "Biblioteca"),
      b("Blog & recursos", "Blog y recursos"),
      b("Identidade editorial", "Identidad editorial"),
    ],
  },
  {
    id: "yoeldis",
    name: "Yoeldis Castillo",
    url: "https://www.yoeldiscastillo.com/",
    image: gallery.projects.yoeldis[0].image,
    gallery: gallery.projects.yoeldis,
    category: b("MARCA PESSOAL & CONTEÚDO", "MARCA PERSONAL Y CONTENIDO"),
    copy: b(
      "Uma presença digital para ideias que conectam mente, escrita e leitores.",
      "Una presencia digital para ideas que conectan mente, escritura y lectores.",
    ),
    objective: b(
      "Apresentar a trajetória de Yoeldis Castillo Quiala e facilitar o acesso a seus livros e artigos.",
      "Presentar la trayectoria de Yoeldis Castillo Quiala y facilitar el acceso a sus libros y artículos.",
    ),
    highlights: [
      b("Apresentação profissional", "Presentación profesional"),
      b("Livros & artigos", "Libros y artículos"),
      b("Contato", "Contacto"),
    ],
  },
];

export const processSteps = [
  {
    title: b("Diagnóstico", "Diagnóstico"),
    copy: b(
      "Entendemos o momento, as pessoas e o problema que precisa ser resolvido.",
      "Entendemos el momento, las personas y el problema que debe resolverse.",
    ),
  },
  {
    title: b("Estratégia", "Estrategia"),
    copy: b(
      "Definimos prioridades, escopo e um caminho viável para o projeto.",
      "Definimos prioridades, alcance y un camino viable para el proyecto.",
    ),
  },
  {
    title: b("Design", "Diseño"),
    copy: b(
      "Organizamos conteúdo e interfaces para uma experiência clara.",
      "Organizamos contenido e interfaces para una experiencia clara.",
    ),
  },
  {
    title: b("Desenvolvimento", "Desarrollo"),
    copy: b(
      "Transformamos as decisões em uma solução funcional e responsiva.",
      "Transformamos las decisiones en una solución funcional y adaptable.",
    ),
  },
  {
    title: b("Testes", "Pruebas"),
    copy: b(
      "Revisamos fluxos, telas, acessibilidade e comportamento.",
      "Revisamos flujos, pantallas, accesibilidad y comportamiento.",
    ),
  },
  {
    title: b("Lançamento & evolução", "Lanzamiento y evolución"),
    copy: b(
      "Preparamos a entrega e combinamos os próximos ciclos de melhoria.",
      "Preparamos la entrega y acordamos los siguientes ciclos de mejora.",
    ),
  },
];

export const team = [
  {
    name: "Ernesto",
    image: "/media/team-ernesto.webp",
    role: b(
      "Estratégia comercial e administração",
      "Estrategia comercial y administración",
    ),
    copy: b(
      "Diagnóstico, propostas, preços e finanças. Seu contato principal.",
      "Diagnóstico, propuestas, precios y finanzas. Tu contacto principal.",
    ),
  },
  {
    name: "Ali",
    image: "/media/team-ali.webp",
    role: b("Tecnologia e operações", "Tecnología y operaciones"),
    copy: b(
      "Sites, lojas, integrações, testes e backups.",
      "Sitios, tiendas, integraciones, pruebas y copias de seguridad.",
    ),
  },
  {
    name: "Yoisielis",
    image: "/media/team-yoisielis.webp",
    role: b("Design e comunicação", "Diseño y comunicación"),
    copy: b(
      "Identidade visual, vídeos, conteúdo e calendário.",
      "Identidad visual, vídeos, contenido y calendario.",
    ),
  },
];
