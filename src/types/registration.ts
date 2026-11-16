export type RegistrationDocumentType = 'CNPJ' | 'CPF';

/** Dados coletados no formulário "Abra sua conta" da landing. */
export interface RegistrationLead {
  documentType: RegistrationDocumentType;
  /** Documento com máscara (CPF ou CNPJ). */
  document: string;
  email: string;
  /** Telefone/WhatsApp com máscara, com DDD. */
  phone: string;
}
