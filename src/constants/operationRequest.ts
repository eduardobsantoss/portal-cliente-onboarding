import {
  Upload,
  Banknote,
  Search,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import type { OperationProcessingStage, OperationStep, OperationStepConfig } from '@/types/operationRequest';

export const OPERATION_STEPS_CONFIG: OperationStepConfig[] = [
  { id: 'XML_UPLOAD', label: 'Envio de XML', icon: Upload },
  { id: 'ACCOUNT_SELECTION', label: 'Conta Desembolso', icon: Banknote },
  { id: 'VALIDATING', label: 'Validação', icon: Search },
  { id: 'SUMMARY', label: 'Resumo', icon: FileText },
  { id: 'PROCESSING_DOCS', label: 'Processamento', icon: Clock },
  { id: 'FINAL_REVIEW', label: 'Revisão', icon: ShieldCheck },
  { id: 'SIGNATURE', label: 'Assinatura', icon: CheckCircle2 },
  { id: 'RELEASE', label: 'Liberação', icon: Zap },
  { id: 'COMPLETED', label: 'Concluído', icon: ShieldCheck },
];

export const OPERATION_PHASE_1: OperationStep[] = ['XML_UPLOAD', 'ACCOUNT_SELECTION', 'VALIDATING'];
export const OPERATION_PHASE_2: OperationStep[] = ['SUMMARY', 'PROCESSING_DOCS', 'FINAL_REVIEW'];
export const OPERATION_PHASE_3: OperationStep[] = ['SIGNATURE', 'RELEASE', 'COMPLETED'];

export const OPERATION_PROCESSING_ITEMS = [
  'Registrando títulos',
  'Validando valores',
  'Gerando termo de cessão',
  'Enviando para assinatura',
];

export const OPERATION_PROCESSING_STAGES: OperationProcessingStage[] = [
  { label: 'Registrando títulos na CERC', description: 'Estamos registrando seus títulos na CERC. Não se preocupe, você será avisado quando estiver finalizado.', progress: 70 },
  { label: 'Validando valores', description: 'Estamos conferindo os cálculos finais da operação.', progress: 15 },
  { label: 'Gerando termo de cessão e enviando pra assinatura', description: 'Estamos preparando os documentos digitais para sua assinatura.', progress: 15 },
];
