import type { OperationCompletionData } from '@/types/operationRequest';
import type { PortalOperation } from '@/types/portalOperation';

const NEW_OPERATION_VALUE = 'R$ 498.750,00';

export function createPortalOperation(
  data: OperationCompletionData | undefined,
  selectedService: string,
  selectedGroup: string,
): PortalOperation {
  return {
    id: Math.floor(Math.random() * 10000).toString(),
    type: selectedService,
    title: data?.grupoEmpresarial || selectedGroup || 'Operação',
    value: NEW_OPERATION_VALUE,
    status: 'Em análise',
    date: new Date().toLocaleDateString('pt-BR'),
  };
}
