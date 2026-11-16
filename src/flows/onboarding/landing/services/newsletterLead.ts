import { NEWSLETTER_LEAD_API } from "../constants/newsletter";

export type SubmitNewsletterLeadInput = {
  name: string;
  phone: string;
  consent: boolean;
  website?: string;
};

export type SubmitNewsletterLeadResult = {
  ok: boolean;
  alreadyRegistered?: boolean;
  message?: string;
  welcomeSent?: boolean;
  welcomeWarning?: string | null;
  error?: string;
};

function collectUtmParams(): Record<string, string> | undefined {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ]) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

export async function submitNewsletterLead(
  input: SubmitNewsletterLeadInput
): Promise<SubmitNewsletterLeadResult> {
  const res = await fetch(NEWSLETTER_LEAD_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: input.name,
      phone: input.phone,
      consent: input.consent,
      website: input.website ?? "",
      pageUrl: window.location.href,
      utm: collectUtmParams(),
    }),
  });

  const data = (await res.json().catch(() => ({}))) as SubmitNewsletterLeadResult & {
    error?: string;
  };

  if (!res.ok) {
    return { ok: false, error: data.error ?? "Não foi possível enviar. Tente novamente." };
  }

  return {
    ok: true,
    alreadyRegistered: data.alreadyRegistered,
    message: data.message,
    welcomeSent: data.welcomeSent,
    welcomeWarning: data.welcomeWarning ?? null,
  };
}
