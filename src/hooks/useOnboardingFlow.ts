import { useRef, useState } from 'react';
import type { ComplementaryFormSubmitPayload } from '@/types/dadosComplementares';
import type { DocumentUploadItem, DocumentsMode } from '@/types/documentUpload';
import type { OnboardingViewState } from '@/types/onboarding';

export function useOnboardingFlow() {
  // Requirement 1: Ao recarregar a página ou reiniciar o fluxo, a ordem passa a ser:
  // Confirmação do celular por SMS → Criação de senha → Termos → Dados complementares...
  const [currentView, setCurrentView] = useState<OnboardingViewState>('phone_verification');
  const [history, setHistory] = useState<OnboardingViewState[]>([]);
  const [formData, setFormData] = useState<ComplementaryFormSubmitPayload | null>(null);
  const [documentsSnapshot, setDocumentsSnapshot] = useState<DocumentUploadItem[] | null>(null);
  const [documentsMode, setDocumentsMode] = useState<DocumentsMode>('initial');
  const [adjustmentRequestId, setAdjustmentRequestId] = useState(0);
  const [appliedAdjustmentRequestId, setAppliedAdjustmentRequestId] = useState(0);
  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;
  const historyRef = useRef(history);
  historyRef.current = history;

  const goTo = (view: OnboardingViewState) => {
    setHistory((prev) => [...prev, currentViewRef.current]);
    setCurrentView(view);
  };

  const goBack = () => {
    const prev = historyRef.current;
    if (prev.length === 0) return;
    setCurrentView(prev[prev.length - 1]);
    setHistory(prev.slice(0, -1));
  };

  const handleComplementarySubmit = (payload?: ComplementaryFormSubmitPayload) => {
    if (payload) {
      setFormData(payload);
    }
    setDocumentsSnapshot(null);
    setDocumentsMode('initial');
    goTo('document_upload');
  };

  const openDocumentAdjustment = () => {
    setDocumentsMode('adjustment');
    setAdjustmentRequestId((current) => current + 1);
    goTo('document_upload');
  };

  return {
    currentView,
    formData,
    documentsSnapshot,
    documentsMode,
    adjustmentRequestId,
    appliedAdjustmentRequestId,
    setDocumentsSnapshot,
    setAppliedAdjustmentRequestId,
    canGoBack: history.length > 0,
    goTo,
    goBack,
    handleComplementarySubmit,
    openDocumentAdjustment,
  };
}

export type OnboardingFlow = ReturnType<typeof useOnboardingFlow>;
