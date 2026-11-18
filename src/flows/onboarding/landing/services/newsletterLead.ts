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

/** Duração da resposta simulada, só para o botão mostrar o estado "Enviando...". */
const MOCK_SUBMIT_DELAY_MS = 700;

/**
 * PROTÓTIPO: o envio do lead de newsletter está MOCKADO de propósito.
 * Nenhuma requisição é feita e nenhum dado (nome, telefone) sai do navegador,
 * para evitar disparos acidentais de mensagens para números reais.
 */
export async function submitNewsletterLead(
  _input: SubmitNewsletterLeadInput
): Promise<SubmitNewsletterLeadResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));

  return {
    ok: true,
    alreadyRegistered: false,
    welcomeSent: false,
    welcomeWarning: null,
  };
}
