export type CompanyTier = 'middle_corporate' | 'simples_pme';
export type PartnerPersonType = 'PF' | 'PJ';

export type DocumentStatus = 'aprovado' | 'em_analise' | 'pendente' | 'rejeitado';

export interface PartnerDocState {
  uploaded: boolean;
  fileName?: string;
  status: DocumentStatus;
  note?: string;
  rejectionReason?: string;
}

export type PartnerDocKey =
  | 'cnhRg'
  | 'residencia'
  | 'certidaoCasamento'
  | 'documentoConjuge'
  | 'irpf'
  | 'contratoEstatutoSocialPj'
  | 'beneficiariosFinaisPj';

export type PartnerStatus = 'validado' | 'em_analise' | 'pendente_documentos';

export type PartnerDocs = {
  // Documentos para Pessoa Física (PF)
  cnhRg?: PartnerDocState;
  residencia?: PartnerDocState;
  certidaoCasamento?: PartnerDocState; // "Certidão de Casamento / Contrato de União Estável / Averbação de Divórcio"
  documentoConjuge?: PartnerDocState; // "Documento de Identidade do Cônjuge (RG ou CNH)"
  irpf?: PartnerDocState; // "Declaração de IRPF + recibo de entrega"

  // Documentos para sócio(s) e/ou avalista(s) Pessoa Jurídica (PJ)
  contratoEstatutoSocialPj?: PartnerDocState; // "Contrato Social ou Estatuto Social atualizado"
  beneficiariosFinaisPj?: PartnerDocState; // "Documentação dos beneficiários finais (documento de identificação + CPF/CNH)"
};

export interface PartnerData {
  id: string;
  name: string;
  role: string;
  type: PartnerPersonType;
  isNonPartner?: boolean;
  vinculo?: 'Administrador não sócio' | 'Procurador';
  cpf: string; // CPF (PF) ou CNPJ (PJ)
  email: string;
  phone: string;
  quotaPercentage: number;
  maritalStatus?: string;
  status: PartnerStatus;
  docs: PartnerDocs;
}

export type DocumentCategory = 'pj' | 'financeiro' | 'credito';

export interface DocumentItem {
  id: string;
  category: DocumentCategory;
  title: string;
  description: string;
  requiredFor: CompanyTier[];
  optionalFor?: CompanyTier[];
  optionalNote?: string;
  status: DocumentStatus;
  rejectionReason?: string;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
}

export interface NewPartnerForm {
  name: string;
  type: PartnerPersonType;
  role: string;
  cpf: string;
  email: string;
  phone: string;
  quotaPercentage: number;
  maritalStatus: string;
}

export interface PreviewDoc {
  title: string;
  fileName: string;
}

export type ChecklistTopicKey = 'sms' | 'biometria' | 'pj' | 'financeiro' | 'credito' | 'socios';

export type ExpandedTopics = Record<ChecklistTopicKey, boolean>;
