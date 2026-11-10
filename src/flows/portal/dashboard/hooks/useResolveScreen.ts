import React, { useState } from 'react';
import { SUCCESS_APPROVAL_TOAST_MS } from '@/constants/dashboardTimings';
import type { Titulo } from '@/types/titulo';

interface UseResolveScreenParams {
  titulosList: Titulo[];
  setTitulosList: React.Dispatch<React.SetStateAction<Titulo[]>>;
  setHasPendingConfirmations: (value: boolean) => void;
}

/** Tela "Resolução de Pendências" e os avisos globais de validação dos títulos. */
export function useResolveScreen({ titulosList, setTitulosList, setHasPendingConfirmations }: UseResolveScreenParams) {
  const [isShowingResolveScreen, setIsShowingResolveScreen] = useState(false);
  const [hasSeenResolveExplanation, setHasSeenResolveExplanation] = useState(false);
  const [isWaitingValidation, setIsWaitingValidation] = useState(false);
  const [showSuccessApprovalToast, setShowSuccessApprovalToast] = useState(false);
  // Título em resolução (compartilhado com os modais de canhoto e de link de confirmação).
  const [resolutionTitulo, setResolutionTitulo] = useState<Titulo | null>(null);

  const openResolveScreen = () => {
    setHasSeenResolveExplanation(false);
    setIsShowingResolveScreen(true);
  };

  const handleFinishResolution = () => {
    const hasPending = titulosList.some(t => t.actionStatus === 'Pendência');
    if (!hasPending) {
      setIsWaitingValidation(true);
    }
    setIsShowingResolveScreen(false);
  };

  const handleConfirmValidation = () => {
    setIsWaitingValidation(false);
    setTitulosList(prev => prev.map(t => (t.actionStatus === 'Pendente de Análise' || (t.canhotoEnviado || t.linkEnviado)) ? {
      ...t,
      actionStatus: 'Confirmado',
      status: 'Confirmado',
      statusColor: 'text-green-600 bg-green-50 border-green-100'
    } : t));
    setShowSuccessApprovalToast(true);
    setTimeout(() => setShowSuccessApprovalToast(false), SUCCESS_APPROVAL_TOAST_MS);
    setHasPendingConfirmations(titulosList.some(t => t.actionStatus === 'Pendência' && !t.canhotoEnviado && !t.linkEnviado));
  };

  return {
    isShowingResolveScreen,
    setIsShowingResolveScreen,
    hasSeenResolveExplanation,
    setHasSeenResolveExplanation,
    isWaitingValidation,
    showSuccessApprovalToast,
    setShowSuccessApprovalToast,
    resolutionTitulo,
    setResolutionTitulo,
    openResolveScreen,
    handleFinishResolution,
    handleConfirmValidation,
  };
}

export type ResolveScreenState = ReturnType<typeof useResolveScreen>;
