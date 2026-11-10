import type { OperationDetailsTab } from '@/types/portalOperation';

export const OPERATION_DETAILS_TABS: { id: OperationDetailsTab; label: string }[] = [
  { id: 'DADOS_GERAIS', label: 'DADOS GERAIS' },
  { id: 'ATIVOS', label: 'ATIVOS' },
  { id: 'ANEXOS', label: 'ANEXOS' },
];

export const DEFAULT_OPERATION_DETAILS_TAB: OperationDetailsTab = 'DADOS_GERAIS';
