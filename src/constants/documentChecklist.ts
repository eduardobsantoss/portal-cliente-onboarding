import type { ChecklistTopicKey, ExpandedTopics, NewPartnerForm } from '@/types/documentChecklist';

export const TOTAL_CHECKLIST_TOPICS = 3;

export const INITIAL_PHONE_VERIFIED_AT = '10/05/2026 às 14:32';
export const CHECKLIST_MASKED_PHONE = '(34) 9 ••••-1234';

export const INITIAL_EXPANDED_TOPICS: ExpandedTopics = {
  sms: true,
  biometria: false,
  socios: false,
};

/** Tópicos abertos quando a simulação de "Ajustes Necessários" é disparada. */
export const ADJUSTMENT_OPEN_TOPICS: ChecklistTopicKey[] = ['socios'];

export const INITIAL_EXPANDED_PARTNER_ID = 'partner-3';
export const BULK_FILL_DELAY_MS = 400;

export const REJECTED_PARTNER_ID = 'partner-3';
export const REJECTED_PARTNER_SPOUSE_FILE_NAME = 'Documento_Conjuge_Roberto_Mendes.pdf';
export const REJECTED_PARTNER_SPOUSE_REASON =
  'Não foi possível validar os dados do arquivo. Certifique-se de anexar o documento completo e legível, com frente e verso.';

export const CHECKLIST_FILE_ACCEPT = '.pdf,.png,.jpg,.jpeg';

export const INITIAL_NEW_PARTNER_FORM: NewPartnerForm = {
  name: '',
  type: 'PF',
  role: 'Sócio Cotista',
  cpf: '',
  email: '',
  phone: '',
  quotaPercentage: 10,
  maritalStatus: 'Casado',
};

export const PJ_PARTNER_ROLE_OPTIONS = [
  'Sócio Pessoa Jurídica',
  'Holding / Controladora',
  'Avalista Pessoa Jurídica',
] as const;

export const PF_PARTNER_ROLE_OPTIONS = [
  'Sócio Administrador',
  'Sócia Administradora',
  'Sócio Cotista',
  'Diretor',
  'Procurador',
  'Avalista',
] as const;

export const PARTNER_MARITAL_STATUS_OPTIONS = [
  'Casado',
  'Solteiro',
  'Divorciado',
  'União Estável',
  'Viúvo',
] as const;
