export const pageModules = {
  solutions: () => import("../sections/SolutionsPage.jsx"),
  huellaCase: () => import("../sections/ProjectCasePage.jsx"),
  yoeldisCase: () => import("../sections/ProjectCasePage.jsx"),
  intelligence: () => import("../sections/intelligence/IntelligenceHome.jsx"),
  market: () => import("../sections/intelligence/MarketExplorer.jsx"),
  productivity: () => import("../sections/intelligence/ProductivityPage.jsx"),
  investment: () => import("../sections/intelligence/InvestmentPage.jsx"),
  sectors: () => import("../sections/intelligence/SectorsPage.jsx"),
  report: () => import("../sections/intelligence/ReportPage.jsx"),
  diagnostic: () => import("../sections/DigitalDiagnostic.jsx"),
  simulator: () => import("../sections/PotentialSimulator.jsx"),
  quote: () => import("../sections/QuoteBuilder.jsx"),
};
