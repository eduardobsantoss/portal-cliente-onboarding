/** Tópicos do checklist da Análise de Crédito (liberação de limite). */

export interface ChecklistTopicText {
  title: string;
  subtitle: string;
}

export const SMS_TOPIC_TEXT: ChecklistTopicText = {
  title: '1. Confirmação do Telefone por SMS',
  subtitle: 'Validação do número de celular para segurança e notificações',
};

export const FACIAL_TOPIC_TEXT: ChecklistTopicText = {
  title: '2. Reconhecimento & Biometria Facial',
  subtitle: 'Autenticação biométrica e prova de vida realizadas no início do cadastro',
};

export const PARTNERS_TOPIC_TEXT: ChecklistTopicText = {
  title: '3. Quadro Societário (Partes Relacionadas)',
  subtitle: 'Cônjuges, sócios e avalistas Pessoa Jurídica e representantes não sócios',
};

/** Aviso nas partes sem documento pendente aqui: os pessoais seguem no Envio de Documentos. */
export const PARTNER_NO_PENDING_DOCS_NOTE =
  'Os documentos pessoais deste sócio (identidade, residência, IRPF e estado civil) são enviados na etapa "Envio de Documentos".';

/** Classes do conteúdo expansível de cada tópico (varia só o espaçamento interno). */
export const TOPIC_CONTENT_BASE_CLASS = 'border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40';
export const TOPIC_CONTENT_PARTNERS_CLASS = 'border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40 space-y-4';

export const ADD_PARTNER_PF_DOCS_NOTE =
  'Os documentos pessoais (RG ou CNH, residência, estado civil e IRPF com recibo) seguem no Envio de Documentos; aqui resta o documento do cônjuge, quando houver.';
export const ADD_PARTNER_PJ_DOCS_NOTE =
  'Contrato Social/Estatuto Social atualizado consolidado e Documentação dos beneficiários finais (identificação + CPF/CNH).';

export const PARTNER_INPUT_CLASS =
  'w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gci';
export const PARTNER_LABEL_CLASS = 'text-[11px] font-bold text-slate-600 block mb-1';
