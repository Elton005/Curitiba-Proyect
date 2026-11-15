import { validatePublicConfig } from "../utils/contact.js";

// Public settings only. All VITE_* values are visible in the browser bundle.
// Exact destination explicitly confirmed by the owner. Do not infer extra digits.
export const confirmedBusinessWhatsapp = "554197862547";
export const siteConfig = validatePublicConfig({
  origin: import.meta.env?.VITE_SITE_ORIGIN,
  whatsapp: confirmedBusinessWhatsapp,
  email: import.meta.env?.VITE_CONTACT_EMAIL,
  appDownload: import.meta.env?.VITE_APP_DOWNLOAD_URL,
  appDownloadReleaseVerified:
    import.meta.env?.VITE_APP_DOWNLOAD_RELEASE_VERIFIED === "true",
});
