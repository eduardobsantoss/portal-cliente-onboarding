export const NEWSLETTER_CONSENT_TEXT =
  "Autorizo o Grupo Ceres Investimentos a entrar em contato pelo WhatsApp ou telefone informado para envio de notícias, comunicados e atualizações de mercado. Estou ciente de que posso cancelar o recebimento a qualquer momento.";

export const NEWSLETTER_STORAGE_SUBSCRIBED = "gci_newsletter_subscribed";
export const NEWSLETTER_STORAGE_DISMISSED = "gci_newsletter_dismissed";

// Em dev o vite faz proxy de /api/newsletter-lead para a Firebase Function.
// Em produção (ex.: GitHub Pages) defina VITE_NEWSLETTER_LEAD_URL com a URL pública da função.
export const NEWSLETTER_LEAD_API =
  import.meta.env.VITE_NEWSLETTER_LEAD_URL?.trim() || "/api/newsletter-lead";
