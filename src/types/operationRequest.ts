import type { LucideIcon } from 'lucide-react';

export type OperationStep =
  | 'XML_UPLOAD'
  | 'ACCOUNT_SELECTION'
  | 'VALIDATING'
  | 'SUMMARY'
  | 'PROCESSING_DOCS'
  | 'FINAL_REVIEW'
  | 'SIGNATURE'
  | 'RELEASE'
  | 'COMPLETED';

export interface OperationStepConfig {
  id: OperationStep;
  label: string;
  icon: LucideIcon;
}

export interface OperationXmlFile {
  name: string;
  size: string;
}

export interface DisbursementAccount {
  id: string;
  bank: string;
  branch: string;
  account: string;
  type: string;
}

export type OperationValueAttends = 'SIM' | 'NAO' | null;

export type OperationSignatureStatus = 'Pendente' | 'Assinado';

export interface OperationSignature {
  id: number;
  name: string;
  status: OperationSignatureStatus;
  role: string;
}

export interface OperationCompletionData {
  grupoEmpresarial: string | null;
}

export interface OperationProcessingStage {
  label: string;
  description: string;
  progress: number;
}

export interface OperationRejectedTitle {
  reason: string;
  invoice: string;
  value: string;
}

export interface OperationSummaryData {
  totalTitles: string;
  totalTitlesValue: string;
  acceptedTitles: string;
  validatedValue: string;
  rate: string;
  averageTerm: string;
  rejectedValue: string;
  netValue: string;
}

export interface OperationFinalReviewData {
  nominalSent: string;
  nominalAccepted: string;
  netValue: string;
  deduction: string;
  rate: string;
  averageTerm: string;
  operationId: string;
}
