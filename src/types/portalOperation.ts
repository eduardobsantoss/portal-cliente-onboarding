import type { LucideIcon } from 'lucide-react';

export type OperationDetailsTab = 'DADOS_GERAIS' | 'ATIVOS' | 'ANEXOS';

export interface PortalOperation {
  id: string;
  type: string;
  title: string;
  value: string;
  status: string;
  date: string;
  rejectionReason?: string;
  rejectedAt?: string;
  currentTab?: OperationDetailsTab;
}

export type JourneyStepStatus = 'COMPLETO' | 'ATUAL' | 'PENDENTE';

export interface OperationJourneyStep {
  label: string;
  date: string;
  time: string;
  status: JourneyStepStatus;
  icon: LucideIcon;
}

export interface OperationKpi {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface OperationAsset {
  lastro: string;
  numero: string;
  valor: string;
  cedente: string;
}

export interface LinkableAsset {
  id: string;
  numero: string;
  valor: string;
  status: string;
  sacado: string;
  color: string;
}
