export const localeCode = (language) => (language === "pt" ? "pt-BR" : "es");
export const formatNumber = (value, language, digits = 1) =>
  new Intl.NumberFormat(localeCode(language), {
    maximumFractionDigits: digits,
  }).format(value);
export const formatMoney = (value, language) =>
  new Intl.NumberFormat(localeCode(language), {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);

export function downloadText(filename, text) {
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
