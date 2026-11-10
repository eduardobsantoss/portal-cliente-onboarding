import { Banknote, FileCheck, Hourglass, Search } from 'lucide-react';
import type { DocumentFile } from '@/types/dashboard';
import type { OperationAsset, OperationJourneyStep } from '@/types/portalOperation';

export const OPERATION_JOURNEY: OperationJourneyStep[] = [
  { label: 'Envio', date: '05/04', time: '14:20', status: 'COMPLETO', icon: FileCheck },
  { label: 'Análise', date: '06/04', time: '09:15', status: 'COMPLETO', icon: Search },
  { label: 'Assinatura', date: '08/04', time: '16:45', status: 'ATUAL', icon: Hourglass },
  { label: 'Liberação', date: '--/--', time: '--:--', status: 'PENDENTE', icon: Banknote },
];

export const OPERATION_NOMINAL_VALUE = 'R$ 500.000,00';
export const OPERATION_VEHICLE = 'CRA CERES';
export const OPERATION_ASSETS_TOTAL = 'R$ 659.460,00';

export const OPERATION_ASSETS: OperationAsset[] = [
  { lastro: '447222', numero: '58565-1', valor: 'R$ 121.730,00', cedente: 'AGRICOLA URTIGAO COMERCIO REPRESENTACOES E TRANSPORTES LTDA' },
  { lastro: '447223', numero: '58567-1', valor: 'R$ 121.730,00', cedente: 'AGRICOLA URTIGAO COMERCIO REPRESENTACOES E TRANSPORTES LTDA' },
  { lastro: '447224', numero: '59397-1', valor: 'R$ 117.000,00', cedente: 'AGRICOLA URTIGAO COMERCIO REPRESENTACOES E TRANSPORTES LTDA' },
  { lastro: '447225', numero: '59398-1', valor: 'R$ 177.500,00', cedente: 'AGRICOLA URTIGAO COMERCIO REPRESENTACOES E TRANSPORTES LTDA' },
  { lastro: '447226', numero: '58618-1', valor: 'R$ 121.500,00', cedente: 'AGRICOLA URTIGAO COMERCIO REPRESENTACOES E TRANSPORTES LTDA' },
];

export const OPERATION_ATTACHMENTS: DocumentFile[] = [
  { name: 'TERMO_DE_CESSAO_001.pdf', size: '2.4 MB', date: '15/04/2026', type: 'PDF' },
  { name: 'TERMO_DE_CESSAO_002.pdf', size: '1.8 MB', date: '16/04/2026', type: 'PDF' },
];

export const OPERATION_REJECTION_FALLBACK_REASON =
  'Inconsistência nos dados ou rating de crédito insuficiente para o veículo no momento.';
export const OPERATION_REJECTION_FALLBACK_DATE = '06/04/2026 14:30';
