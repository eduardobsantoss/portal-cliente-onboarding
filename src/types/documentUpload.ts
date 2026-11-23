import type { AccountType } from '@/types/dadosComplementares';
import type { NonPartnerRepresentative } from '@/types/representante';
import type { Socio } from '@/types/socio';

/** `adjustment`: retorno simulado da análise pedindo reenvio de alguns documentos. */
export type DocumentsMode = 'initial' | 'adjustment';

export interface OnboardingDocumentUploadProps {
  accountType?: AccountType;
  socios?: Socio[];
  nonPartnerRepresentatives?: NonPartnerRepresentative[];
  companyName?: string;
  cnpj?: string;
  tipoEmpresa?: string;
  hasProcurador?: boolean;
  isSimplesNacional?: boolean;
  documentsMode?: DocumentsMode;
  initialDocuments?: DocumentUploadItem[] | null;
  adjustmentRequestId?: number;
  appliedAdjustmentRequestId?: number;
  onDocumentsChange?: (documents: DocumentUploadItem[]) => void;
  onAdjustmentApplied?: (requestId: number) => void;
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
  /** `typeId` do documento no webhook do Pipefy (integração futura). */
  pipefyTypeId?: number;
  /** Exercício do documento (campo `ano` do Pipefy) ou "corrente" para o período em andamento. */
  year?: number | 'corrente';
  /** Título de seção dentro do cartão da pessoa/empresa (agrupa os uploads por exercício). */
  section?: string;
}
