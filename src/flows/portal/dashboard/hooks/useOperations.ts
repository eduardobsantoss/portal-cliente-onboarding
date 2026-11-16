import { ref, toValue, type MaybeRefOrGetter, type UnwrapNestedRefs } from 'vue';
import { SUCCESS_OPERATION_TOAST_MS } from '@/constants/dashboardTimings';
import { INITIAL_OPERATIONS } from '@/mocks/portalCollections';
import type { DashboardTab } from '@/types/dashboard';
import type { OperationCompletionData } from '@/types/operationRequest';
import type { PortalOperation } from '@/types/portalOperation';
import { createPortalOperation } from '@/utils/createPortalOperation';

interface UseOperationsParams {
  selectedGroup: MaybeRefOrGetter<string>;
  setActiveTab: (tab: DashboardTab) => void;
}

/** Operações do portal: lista, detalhes, busca, solicitação de nova operação e aviso de sucesso. */
export function useOperations({ selectedGroup, setActiveTab }: UseOperationsParams) {
  const showOperationRequest = ref(false);
  // O original nunca altera o serviço selecionado (permanece vazio).
  const selectedService = ref('');
  const operations = ref<PortalOperation[]>(INITIAL_OPERATIONS);
  const selectedOpDetails = ref<PortalOperation | null>(null);
  const searchOperationId = ref('');
  const showSuccessOperationToast = ref(false);

  const handleCompleteOperation = (data: OperationCompletionData) => {
    const newOperation = createPortalOperation(data, selectedService.value, toValue(selectedGroup));
    operations.value = [newOperation, ...operations.value];
    setActiveTab('home');
    showOperationRequest.value = false;
    showSuccessOperationToast.value = true;
    setTimeout(() => (showSuccessOperationToast.value = false), SUCCESS_OPERATION_TOAST_MS);
  };

  return {
    operations,
    selectedService,
    selectedOpDetails,
    searchOperationId,
    showOperationRequest,
    showSuccessOperationToast,
    handleCompleteOperation,
  };
}

/** Estado desembrulhado (use `reactive(useOperations(...))` para repassar aos componentes filhos). */
export type OperationsState = UnwrapNestedRefs<ReturnType<typeof useOperations>>;
