import { b } from "../translations.js";

// Local, versioned snapshot of official tables. No visitor-side network request.
export const marketCatalog = Object.freeze({
  version: 1,
  study: "TIC Empresas 2025",
  source: "NIC.br / Cetic.br",
  year: 2025,
  publicationYear: 2026,
  verifiedAt: "2026-11-14",
  methodologyUrl:
    "https://cetic.br/media/analises/TIC-Empresas-2025-lancamento.pdf",
  sampleSize: 4174,
  population: b(
    "Empresas brasileiras ativas com 10 ou mais pessoas ocupadas, nos setores abrangidos pela pesquisa. Não representa todos os MEI nem negócios com menos de 10 pessoas.",
    "Empresas brasileñas activas con 10 o más personas ocupadas, de los sectores cubiertos por la encuesta. No representa a todos los MEI ni a los negocios de menos de 10 personas.",
  ),
  collection: b(
    "Entrevistas telefônicas entre fevereiro de 2025 e janeiro de 2026.",
    "Entrevistas telefónicas entre febrero de 2025 y enero de 2026.",
  ),
  limitation: b(
    "São percentuais de adoção ou uso declarado, não efeitos causais sobre vendas. Os recortes são marginais; não há cruzamentos entre região, porte e setor neste catálogo. Não some respostas múltiplas nem faça médias simples para reconstruir o total nacional.",
    "Son porcentajes de adopción o uso declarado, no efectos causales sobre las ventas. Los desgloses son marginales; este catálogo no contiene cruces entre región, tamaño y sector. No sumes respuestas múltiples ni calcules medias simples para reconstruir el total nacional.",
  ),
});

export const denominators = Object.freeze({
  internet: {
    id: "internet",
    label: b(
      "Empresas com acesso à Internet",
      "Empresas con acceso a Internet",
    ),
    definition: b(
      "Total de empresas com acesso à Internet, dentro da população da TIC Empresas 2025.",
      "Total de empresas con acceso a Internet, dentro de la población de TIC Empresas 2025.",
    ),
  },
  enterprises: {
    id: "enterprises",
    label: b("Total de empresas pesquisadas", "Total de empresas investigadas"),
    definition: b(
      "Total de empresas da população da pesquisa, incluindo as sem acesso à Internet.",
      "Total de empresas de la población de la encuesta, incluidas las que no tienen acceso a Internet.",
    ),
  },
  onlineSellers: {
    id: "onlineSellers",
    label: b(
      "Empresas que venderam pela Internet",
      "Empresas que vendieron por Internet",
    ),
    definition: b(
      "Total de empresas que venderam pela Internet nos últimos 12 meses, dentro da população da pesquisa.",
      "Total de empresas que vendieron por Internet durante los últimos 12 meses, dentro de la población de la encuesta.",
    ),
  },
});

const definition = (
  id,
  code,
  label,
  denominator,
  measuredVariable,
  notes,
  multipleResponse = false,
) =>
  Object.freeze({
    id,
    code,
    label,
    denominator,
    definition: measuredVariable,
    notes,
    multipleResponse,
    url: `https://cetic.br/pt/tics/pesquisa/2025/empresas/${code}/expandido/`,
  });

export const indicatorDefinitions = Object.freeze({
  website: definition(
    "website",
    "B6",
    b("Website próprio", "Sitio web propio"),
    "internet",
    b("Possuíam website.", "Tenían sitio web."),
    b(
      "Coluna Sim. As demais respostas incluem Não, Não sabe e Não respondeu; não derive o complemento como se fosse apenas ausência de website.",
      "Columna Sí. Las demás respuestas incluyen No, No sabe y No respondió; no interpretes el complemento como si fuera solo ausencia de sitio web.",
    ),
  ),
  social: definition(
    "social",
    "B13A",
    b("Perfil em redes sociais", "Perfil en redes sociales"),
    "internet",
    b(
      "Possuíam perfil ou conta próprios em alguma rede social online.",
      "Tenían un perfil o una cuenta propios en alguna red social en línea.",
    ),
    b(
      "Presença em ao menos uma rede social. Não mede vendas nem frequência de publicação.",
      "Presencia en al menos una red social. No mide ventas ni frecuencia de publicación.",
    ),
  ),
  messagingPresence: definition(
    "messagingPresence",
    "B13B",
    b("Presença em WhatsApp ou Telegram", "Presencia en WhatsApp o Telegram"),
    "internet",
    b(
      "Possuíam perfil ou conta próprios em WhatsApp ou Telegram.",
      "Tenían un perfil o una cuenta propios en WhatsApp o Telegram.",
    ),
    b(
      "A coluna combina WhatsApp ou Telegram. Não significa WhatsApp isoladamente nem vendas por mensagens. Questão de respostas múltiplas; não some canais.",
      "La columna combina WhatsApp o Telegram. No significa WhatsApp por separado ni ventas por mensajes. Pregunta de respuestas múltiples; no sumes canales.",
    ),
    true,
  ),
  crm: definition(
    "crm",
    "G3",
    b("Uso de CRM", "Uso de CRM"),
    "enterprises",
    b(
      "Usaram um aplicativo de CRM para gerenciar informações de clientes nos últimos 12 meses.",
      "Usaron una aplicación CRM para gestionar información de clientes durante los últimos 12 meses.",
    ),
    b(
      "Coluna Sim. A base é o total de empresas, diferente dos indicadores de presença online.",
      "Columna Sí. La base es el total de empresas, distinta de los indicadores de presencia en línea.",
    ),
  ),
  salesWebsite: definition(
    "salesWebsite",
    "E2C",
    b("Venda pelo website da empresa", "Venta por el sitio web de la empresa"),
    "onlineSellers",
    b(
      "Entre as empresas que venderam pela Internet, utilizaram o website da empresa como canal de venda nos últimos 12 meses.",
      "Entre las empresas que vendieron por Internet, utilizaron el sitio web de la empresa como canal de venta durante los últimos 12 meses.",
    ),
    b(
      "Não mede a proporção de todas as empresas que vendem online nem o valor das vendas. Respostas múltiplas; não some canais.",
      "No mide la proporción de todas las empresas que venden en línea ni el valor de las ventas. Respuestas múltiples; no sumes canales.",
    ),
    true,
  ),
  salesMessaging: definition(
    "salesMessaging",
    "E2C",
    b("Venda por mensagens", "Venta por mensajes"),
    "onlineSellers",
    b(
      "Entre as empresas que venderam pela Internet, utilizaram mensagens de WhatsApp, Skype ou chat do Facebook como canal de venda nos últimos 12 meses.",
      "Entre las empresas que vendieron por Internet, utilizaron mensajes de WhatsApp, Skype o chat de Facebook como canal de venta durante los últimos 12 meses.",
    ),
    b(
      "Esta coluna inclui WhatsApp, Skype ou chat do Facebook; não é a coluna de presença em WhatsApp ou Telegram do B13B. Respostas múltiplas; não some canais.",
      "Esta columna incluye WhatsApp, Skype o chat de Facebook; no es la columna de presencia en WhatsApp o Telegram de B13B. Respuestas múltiples; no sumes canales.",
    ),
    true,
  ),
  salesSocial: definition(
    "salesSocial",
    "E2C",
    b("Venda por redes sociais", "Venta por redes sociales"),
    "onlineSellers",
    b(
      "Entre as empresas que venderam pela Internet, utilizaram redes sociais como Facebook, Instagram ou Snapchat como canal de venda nos últimos 12 meses.",
      "Entre las empresas que vendieron por Internet, utilizaron redes sociales como Facebook, Instagram o Snapchat como canal de venta durante los últimos 12 meses.",
    ),
    b(
      "Adoção de um canal entre empresas vendedoras online. Não é presença geral em redes sociais. Respostas múltiplas; não some canais.",
      "Adopción de un canal entre empresas que venden en línea. No es presencia general en redes sociales. Respuestas múltiples; no sumes canales.",
    ),
    true,
  ),
});

export const dimensions = Object.freeze({
  year: [{ id: 2025, label: b("2025", "2025") }],
  region: [
    { id: "all", label: b("Brasil — total", "Brasil — total") },
    { id: "north", label: b("Norte", "Norte") },
    { id: "northeast", label: b("Nordeste", "Nordeste") },
    { id: "southeast", label: b("Sudeste", "Sudeste") },
    { id: "south", label: b("Sul", "Sur") },
    { id: "centralWest", label: b("Centro-Oeste", "Centro-Oeste") },
  ],
  size: [
    {
      id: "all",
      label: b("Todos os portes pesquisados", "Todos los tamaños investigados"),
    },
    {
      id: "10-49",
      label: b("10 a 49 pessoas ocupadas", "10 a 49 personas ocupadas"),
    },
    {
      id: "50-249",
      label: b("50 a 249 pessoas ocupadas", "50 a 249 personas ocupadas"),
    },
    {
      id: "250+",
      label: b("250 ou mais pessoas ocupadas", "250 o más personas ocupadas"),
    },
  ],
  sector: [
    {
      id: "all",
      label: b(
        "Todos os setores pesquisados",
        "Todos los sectores investigados",
      ),
    },
    {
      id: "manufacturing",
      label: b("Indústria de transformação", "Industria manufacturera"),
    },
    { id: "construction", label: b("Construção", "Construcción") },
    {
      id: "trade",
      label: b(
        "Comércio, reparação de veículos automotores e motocicletas",
        "Comercio, reparación de vehículos automotores y motocicletas",
      ),
    },
    {
      id: "transport",
      label: b(
        "Transporte, armazenagem e correio",
        "Transporte, almacenamiento y correo",
      ),
    },
    {
      id: "hospitalityFood",
      label: b("Alojamento e alimentação", "Alojamiento y alimentación"),
    },
    {
      id: "informationCommunication",
      label: b("Informação e comunicação", "Información y comunicación"),
    },
    {
      id: "professionalAdministrative",
      label: b(
        "Atividades imobiliárias, atividades profissionais, científicas e técnicas, atividades administrativas e serviços complementares",
        "Actividades inmobiliarias, actividades profesionales, científicas y técnicas, actividades administrativas y servicios complementarios",
      ),
    },
    {
      id: "artsOtherServices",
      label: b(
        "Artes, cultura, esporte e recreação, outras atividades de serviços",
        "Artes, cultura, deporte y recreación, otras actividades de servicios",
      ),
    },
  ],
});

// Official order: national total; 3 company-size rows; 5 regional rows; 8 sector rows.
const strata = [
  ["total", "all", "all", "all"],
  ...dimensions.size
    .slice(1)
    .map((value) => [`size-${value.id}`, "all", value.id, "all"]),
  ...dimensions.region
    .slice(1)
    .map((value) => [`region-${value.id}`, value.id, "all", "all"]),
  ...dimensions.sector
    .slice(1)
    .map((value) => [`sector-${value.id}`, "all", "all", value.id]),
];
const officialValues = Object.freeze({
  website: [56, 53, 76, 87, 36, 43, 62, 59, 46, 62, 61, 44, 50, 51, 90, 72, 61],
  social: [90, 90, 92, 95, 90, 91, 90, 92, 88, 89, 83, 92, 78, 95, 98, 90, 97],
  messagingPresence: [
    79, 79, 75, 74, 78, 80, 77, 81, 78, 77, 67, 83, 64, 82, 85, 77, 90,
  ],
  crm: [31, 29, 41, 56, 31, 32, 32, 30, 26, 29, 25, 31, 22, 23, 63, 37, 41],
  salesWebsite: [
    32, 30, 49, 53, 17, 25, 33, 39, 35, 34, 30, 27, 34, 37, 60, 38, 36,
  ],
  salesMessaging: [
    79, 81, 74, 54, 81, 80, 77, 83, 82, 84, 68, 85, 64, 73, 72, 71, 85,
  ],
  salesSocial: [
    40, 42, 28, 26, 45, 49, 36, 39, 49, 32, 29, 47, 21, 44, 45, 39, 43,
  ],
});

export const observations = Object.freeze(
  Object.entries(officialValues).flatMap(([indicatorId, values]) =>
    strata.map(([stratum, region, size, sector], index) => {
      const indicator = indicatorDefinitions[indicatorId];
      return Object.freeze({
        id: `tic-2025-${indicatorId}-${stratum}`,
        study: marketCatalog.study,
        indicatorId,
        indicator: indicator.code,
        year: 2025,
        publicationYear: 2026,
        verifiedAt: "2026-11-14",
        variable: indicator.label,
        value: values[index],
        unit: "%",
        region,
        size,
        sector,
        denominator: indicator.denominator,
        denominatorLabel: denominators[indicator.denominator].label,
        definition: indicator.definition,
        source: marketCatalog.source,
        url: indicator.url,
        notes: indicator.notes,
        marginOfError: null,
        sampleSize: null,
        multipleResponse: indicator.multipleResponse,
        stratum,
      });
    }),
  ),
);

export const defaultMarketFilters = Object.freeze({
  indicatorId: "website",
  year: 2025,
  region: "all",
  size: "all",
  sector: "all",
});
const fields = ["indicatorId", "year", "region", "size", "sector"];
const wildcard = (value) =>
  value === undefined ||
  value === null ||
  value === "" ||
  value === "any" ||
  value === "*";

export function filterObservations(filters = {}, rows = observations) {
  if (!filters || typeof filters !== "object" || !Array.isArray(rows))
    return [];
  return rows.filter((row) =>
    fields.every((field) => {
      const value =
        field === "indicatorId"
          ? (filters.indicatorId ?? filters.indicator)
          : filters[field];
      if (wildcard(value) || (field === "indicatorId" && value === "all"))
        return true;
      if (field === "year") return row.year === Number(value);
      if (field === "indicatorId" && !indicatorDefinitions[value])
        return row.indicator === value;
      return row[field] === value;
    }),
  );
}

export function getAvailableFilters(filters = {}) {
  return Object.fromEntries(
    fields.map((field) => {
      const remaining = { ...filters };
      delete remaining[field];
      if (field === "indicatorId") delete remaining.indicator;
      const available = new Set(
        filterObservations(remaining).map((row) => row[field]),
      );
      const options =
        field === "indicatorId"
          ? Object.values(indicatorDefinitions).map((value) => ({
              id: value.id,
              label: value.label,
            }))
          : dimensions[field];
      return [field, options.filter((option) => available.has(option.id))];
    }),
  );
}

export function sanitizeMarketFilters(value) {
  const input =
    value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return Object.fromEntries(
    fields.map((field) => {
      const raw = input[field];
      const options =
        field === "indicatorId"
          ? Object.keys(indicatorDefinitions)
          : dimensions[field].map((option) => option.id);
      const normalized = field === "year" ? Number(raw) : raw;
      return [
        field,
        options.includes(normalized) ? normalized : defaultMarketFilters[field],
      ];
    }),
  );
}

export function getComparisonObservations(indicatorId, dimension, year = 2025) {
  if (
    !["region", "size", "sector"].includes(dimension) ||
    !indicatorDefinitions[indicatorId]
  )
    return [];
  return filterObservations({ indicatorId, year }).filter(
    (row) =>
      row[dimension] !== "all" &&
      ["region", "size", "sector"].every(
        (key) => key === dimension || row[key] === "all",
      ),
  );
}

export function comparisonStatus(rows) {
  if (!Array.isArray(rows) || !rows.length)
    return {
      valid: false,
      reason: b(
        "Dados não disponíveis para esta seleção.",
        "Datos no disponibles para esta selección.",
      ),
    };
  if (rows.some((row) => !row || !Number.isFinite(row.value)))
    return {
      valid: false,
      reason: b(
        "Há observações inválidas nesta seleção.",
        "Hay observaciones inválidas en esta selección.",
      ),
    };
  if (
    new Set(
      rows.map(
        (row) => `${row.study}|${row.year}|${row.denominator}|${row.unit}`,
      ),
    ).size !== 1
  )
    return {
      valid: false,
      reason: b(
        "As bases estatísticas, anos ou unidades são diferentes. Apresente os grupos separadamente.",
        "Las bases estadísticas, los años o las unidades son diferentes. Presenta los grupos por separado.",
      ),
    };
  const changing = ["region", "size", "sector"].filter(
    (field) => new Set(rows.map((row) => row[field])).size > 1,
  );
  if (
    changing.length > 1 ||
    (changing.length && new Set(rows.map((row) => row.indicatorId)).size > 1)
  )
    return {
      valid: false,
      reason: b(
        "A seleção mistura recortes ou variáveis. Compare uma dimensão por vez, mantendo a mesma definição.",
        "La selección mezcla desgloses o variables. Compara una dimensión cada vez, manteniendo la misma definición.",
      ),
    };
  return {
    valid: true,
    reason: b(
      "Mesma pesquisa, ano, unidade e definição de base. São comparações descritivas, sem causalidade.",
      "Misma encuesta, año, unidad y definición de base. Son comparaciones descriptivas, sin causalidad.",
    ),
  };
}
export const canCompareObservations = (rows) => comparisonStatus(rows).valid;

export function dimensionLabel(field, id, language = "pt") {
  return (
    dimensions[field]?.find((option) => option.id === id)?.label[language] ||
    String(id)
  );
}

export function safeCsvCell(value) {
  let text = String(value ?? "").replaceAll("\u0000", "");
  if (/^[\s\u0000-\u001f]*[=+\-@]/u.test(text) || /^[\t\r\n]/u.test(text))
    text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

// Canonical IDs prevent exporting fabricated observations or altered values.
export function observationsToCsv(rows, language = "pt") {
  const isSpanish = language === "es";
  const header = isSpanish
    ? [
        "ID",
        "Estudio",
        "Código oficial",
        "Indicador",
        "Año de referencia",
        "Año de publicación",
        "Fecha de verificación",
        "Valor",
        "Unidad",
        "Región",
        "Tamaño empresarial",
        "Sector oficial",
        "Base estadística",
        "Definición",
        "Fuente",
        "URL",
        "Notas metodológicas",
        "Margen de error",
        "Muestra del desglose",
      ]
    : [
        "ID",
        "Estudo",
        "Código oficial",
        "Indicador",
        "Ano de referência",
        "Ano de publicação",
        "Data de verificação",
        "Valor",
        "Unidade",
        "Região",
        "Porte empresarial",
        "Setor oficial",
        "Base estatística",
        "Definição",
        "Fonte",
        "URL",
        "Notas metodológicas",
        "Margem de erro",
        "Amostra do recorte",
      ];
  const allowed = new Map(observations.map((row) => [row.id, row]));
  const selected = [
    ...new Set(
      Array.isArray(rows)
        ? rows.map((row) => (typeof row === "string" ? row : row?.id))
        : [],
    ),
  ]
    .map((id) => allowed.get(id))
    .filter(Boolean);
  const lines = selected.map((row) => [
    row.id,
    row.study,
    row.indicator,
    row.variable[language],
    row.year,
    row.publicationYear,
    row.verifiedAt,
    row.value,
    row.unit,
    dimensionLabel("region", row.region, language),
    dimensionLabel("size", row.size, language),
    dimensionLabel("sector", row.sector, language),
    row.denominatorLabel[language],
    row.definition[language],
    row.source,
    row.url,
    row.notes[language],
    isSpanish ? "No disponible" : "Não disponível",
    isSpanish
      ? "No disponible para este desglose"
      : "Não disponível para este recorte",
  ]);
  return [header, ...lines]
    .map((line) => line.map(safeCsvCell).join(";"))
    .join("\r\n");
}
