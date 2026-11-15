export function validatePublicConfig(config = {}) {
  let origin = "";
  try {
    const url = new URL(config.origin);
    if (url.protocol === "https:" && !url.username && !url.password)
      origin = url.origin;
  } catch {
    /* No confirmed origin. */
  }
  const rawNumber = String(config.whatsapp || "").trim();
  const whatsapp =
    /^\d{10,15}$/.test(rawNumber) &&
    rawNumber !== "5541999999999" &&
    !/^(\d)\1+$/.test(rawNumber)
      ? rawNumber
      : "";
  const rawEmail = String(config.email || "").trim();
  const email =
    /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(rawEmail) &&
    !/@(example\.(com|org)|exemplo\.com)$/i.test(rawEmail)
      ? rawEmail
      : "";
  let appDownload = "";
  try {
    const url = new URL(config.appDownload);
    if (
      config.appDownloadReleaseVerified === true &&
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(url.hostname) &&
      !/(?:^|\.)(?:localhost|local|internal|test|invalid)$/i.test(
        url.hostname,
      ) &&
      /\.apk$/i.test(url.pathname) &&
      !/(?:^|[\/_.-])(?:debug|development|dev-client)(?:[\/_.-]|$)/i.test(
        url.pathname,
      )
    )
      appDownload = url.href;
  } catch {
    /* Unpublished app. */
  }
  return { origin, whatsapp, email, appDownload };
}

export function contactLinks(config, message) {
  return {
    whatsapp: config.whatsapp
      ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`
      : "",
    email: config.email
      ? `mailto:${config.email}?subject=${encodeURIComponent("Loop Avante — briefing")}&body=${encodeURIComponent(message)}`
      : "",
  };
}

export function isValidOptionalContact(value) {
  const text = value.trim();
  if (!text) return true;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return true;
  const digits = text.replace(/\D/g, "");
  return (
    /^[+\d\s().-]+$/.test(text) && digits.length >= 8 && digits.length <= 15
  );
}
