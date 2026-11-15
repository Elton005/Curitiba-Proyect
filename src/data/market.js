import { b } from "./translations.js";

export const marketStudy = {
  name: "Cetic.br / NIC.br · TIC Empresas 2025",
  year: 2025,
  published: 2026,
  verifiedAt: "2026-11-14",
  methodology:
    "https://cetic.br/media/analises/TIC-Empresas-2025-lancamento.pdf",
  population: b(
    "Empresas formais brasileiras com 10 ou mais pessoas ocupadas, nos setores abrangidos pela pesquisa. Amostra de 4.174 empresas; coleta entre fevereiro de 2025 e janeiro de 2026.",
    "Empresas formales brasileñas con 10 o más personas ocupadas, en los sectores cubiertos por la encuesta. Muestra de 4.174 empresas; recogida entre febrero de 2025 y enero de 2026.",
  ),
};
export const marketData = [
  {
    id: "social",
    value: 90,
    year: 2025,
    indicator: "B13A",
    label: b("Perfil em redes sociais", "Perfil en redes sociales"),
    definition: b(
      "Possuíam perfil ou conta próprios em alguma rede social online.",
      "Tenían un perfil o una cuenta propios en alguna red social en línea.",
    ),
    population: b(
      "Total de empresas com acesso à Internet.",
      "Total de empresas con acceso a Internet.",
    ),
    url: "https://cetic.br/pt/tics/pesquisa/2025/empresas/B13A/expandido/",
  },
  {
    id: "messaging",
    value: 79,
    year: 2025,
    indicator: "B13B",
    label: b("WhatsApp ou Telegram", "WhatsApp o Telegram"),
    definition: b(
      "Possuíam perfil ou conta próprios em WhatsApp ou Telegram. Não mede vendas por esses canais.",
      "Tenían un perfil o una cuenta propios en WhatsApp o Telegram. No mide ventas por esos canales.",
    ),
    population: b(
      "Total de empresas com acesso à Internet.",
      "Total de empresas con acceso a Internet.",
    ),
    url: "https://cetic.br/pt/tics/pesquisa/2025/empresas/B13B/expandido/",
  },
  {
    id: "website",
    value: 56,
    year: 2025,
    indicator: "B6",
    label: b("Website próprio", "Sitio web propio"),
    definition: b(
      "Possuíam website. As demais respostas incluem não, não sabe e não respondeu.",
      "Tenían sitio web. Las demás respuestas incluyen no, no sabe y no respondió.",
    ),
    population: b(
      "Total de empresas com acesso à Internet.",
      "Total de empresas con acceso a Internet.",
    ),
    url: "https://cetic.br/pt/tics/pesquisa/2025/empresas/B6/expandido/",
  },
];
export const crmData = {
  value: 31,
  year: 2025,
  indicator: "G3",
  url: "https://cetic.br/pt/tics/pesquisa/2025/empresas/G3/expandido/",
  population: b(
    "Total de empresas da pesquisa, incluindo as sem acesso à Internet.",
    "Total de empresas de la encuesta, incluidas las que no tienen acceso a Internet.",
  ),
};
