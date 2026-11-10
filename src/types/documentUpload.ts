import type { AccountType } from '@/types/dadosComplementares';
import type { NonPartnerRepresentative } from '@/types/representante';
import type { Socio } from '@/types/socio';

export interface OnboardingDocumentUploadProps {
  accountType?: AccountType;
  socios?: Socio[];
  nonPartnerRepresentatives?: NonPartnerRepresentative[];
  companyName?: string;
  cnpj?: string;
  tipoEmpresa?: string;
  hasProcurador?: boolean;
  onSubmitDocs: (outcome?: 'approved' | 'rejected' | 'pending') => void;
  onBack: () => void;
  onCancelRequest?: () => void;
}

export interface DocumentUploadItem {
  id: string;
  targetPersonOrEntity: string;
  entityType: 'Correntista' | 'Sócio' | 'Representante legal' | 'Procurador' | 'Empresa' | string;
  documentType: string;
  title: string;
  description: string;
  isRequired: boolean;
  uploaded: boolean;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  base64Preview?: string;
  isRegularizationNeeded?: boolean;
  regularizationReason?: string;
  cargo?: string;
  documentNumber?: string;
  isPersonDoc?: boolean;
}
