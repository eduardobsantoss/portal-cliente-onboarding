export type RegistrationDocumentType = 'CNPJ' | 'CPF';

/** Dados coletados no formulário "Abra sua conta" da landing. */
export interface RegistrationLead {
  /** Fixo em 'CNPJ' enquanto o toggle PJ/PF do formulário estiver desativado. */
  documentType: RegistrationDocumentType;
  /** CNPJ da empresa, com máscara. É levado ao Portal do Cliente para a consulta na Receita Federal. */
  document: string;
  /** CPF do responsável pelo cadastro, com máscara. */
  cpf: string;
  /** Nome completo do responsável pelo cadastro. */
  name: string;
  email: string;
  /** Telefone/WhatsApp com máscara, com DDD. */
  phone: string;
}
