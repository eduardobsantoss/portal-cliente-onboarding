import { useState } from 'react';
import { SUCCESS_OPERATION_TOAST_MS } from '@/constants/dashboardTimings';
import { INITIAL_OPERATIONS } from '@/mocks/portalCollections';
import type { DashboardTab } from '@/types/dashboard';
import type { OperationCompletionData } from '@/types/operationRequest';
import type { PortalOperation } from '@/types/portalOperation';
import { createPortalOperation } from '@/utils/createPortalOperation';

interface UseOperationsParams {
  selectedGroup: string;
  setActiveTab: (tab: DashboardTab) => void;
}

/** Operações do portal: lista, detalhes, busca, solicitação de nova operação e aviso de sucesso. */
export function useOperations({ selectedGroup, setActiveTab }: UseOperationsParams) {
  const [showOperationRequest, setShowOperationRequest] = useState(false);
  // O original nunca altera o serviço selecionado (permanece vazio).
  const [selectedService] = useState('');
  const [operations, setOperations] = useState<PortalOperation[]>(INITIAL_OPERATIONS);
  const [selectedOpDetails, setSelectedOpDetails] = useState<PortalOperation | null>(null);
  const [searchOperationId, setSearchOperationId] = useState('');
  const [showSuccessOperationToast, setShowSuccessOperationToast] = useState(false);

  const handleCompleteOperation = (data: OperationCompletionData) => {
    const newOperation = createPortalOperation(data, selectedService, selectedGroup);
    setOperations([newOperation, ...operations]);
    setActiveTab('home');
    setShowOperationRequest(false);
    setShowSuccessOperationToast(true);
    setTimeout(() => setShowSuccessOperationToast(false), SUCCESS_OPERATION_TOAST_MS);
  };

  return {
    operations,
    selectedService,
    selectedOpDetails,
    setSelectedOpDetails,
    searchOperationId,
    setSearchOperationId,
    showOperationRequest,
    setShowOperationRequest,
    showSuccessOperationToast,
    setShowSuccessOperationToast,
    handleCompleteOperation,
  };
}

export type OperationsState = ReturnType<typeof useOperations>;
