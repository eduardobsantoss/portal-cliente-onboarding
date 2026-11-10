import type { CompanyTier } from '@/types/documentChecklist';

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
  subtitle: 'Autenticação biométrica e prova de vida via QR Code no celular',
};

export const COMPANY_DOCS_TOPIC_TEXT: ChecklistTopicText = {
  title: '3. Documentos Cadastrais da Empresa',
  subtitle: 'Contrato Social, Alterações Contratuais, Atas e Organograma Societário',
};

export const FINANCIAL_TOPIC_TITLE = '4. Demonstrativos Financeiros & Contábeis';

/** Subtítulo da seção 4 varia conforme a regra do segmento (Simples Nacional: balanço não obrigatório). */
export function getFinancialTopicSubtitle(tier: CompanyTier): string {
  return tier === 'middle_corporate'
    ? 'Balanço 4 exercícios, Faturamento e Endividamento'
    : 'Faturamento, Endividamento e Balanço (não obrigatório)';
}

export const CREDIT_TOPIC_TEXT: ChecklistTopicText = {
  title: '5. Crédito & Relacionamento Bancário',
  subtitle: 'Declaração de relacionamento bancário de crédito em papel timbrado',
};

export const PARTNERS_TOPIC_TEXT: ChecklistTopicText = {
  title: '6. Quadro Societário (Partes Relacionadas)',
  subtitle: 'Sócios, representantes, avalistas e cônjuges (Pessoa Física e Jurídica)',
};

/** Classes do conteúdo expansível de cada tópico (varia só o espaçamento interno). */
export const TOPIC_CONTENT_BASE_CLASS = 'border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40';
export const TOPIC_CONTENT_DOCS_CLASS = 'border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40 space-y-3';
export const TOPIC_CONTENT_PARTNERS_CLASS = 'border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40 space-y-4';

export const TIER_OPTIONS: { tier: CompanyTier; label: string }[] = [
  { tier: 'middle_corporate', label: 'Middle Corporate' },
  { tier: 'simples_pme', label: 'Simples / PME' },
];

export const ADD_PARTNER_PF_DOCS_NOTE =
  'RG ou CNH, Comprovante de Residência (90 dias), Certidão de Casamento/União Estável/Divórcio e IRPF com recibo de entrega RFB.';
export const ADD_PARTNER_PJ_DOCS_NOTE =
  'Contrato Social/Estatuto Social atualizado consolidado e Documentação dos beneficiários finais (identificação + CPF/CNH).';

export const PARTNER_INPUT_CLASS =
  'w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gci';
export const PARTNER_LABEL_CLASS = 'text-[11px] font-bold text-slate-600 block mb-1';
