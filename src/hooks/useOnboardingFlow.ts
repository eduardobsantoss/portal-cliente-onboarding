import { useState } from 'react';
import type { ComplementaryFormSubmitPayload } from '@/components/ComplementaryDataForm';
import type { OnboardingViewState } from '@/types/onboarding';

export function useOnboardingFlow() {
  // Requirement 1: Ao recarregar a página ou reiniciar o fluxo, a ordem passa a ser:
  // Confirmação do celular por SMS → Criação de senha → Termos → Dados complementares...
  const [currentView, setCurrentView] = useState<OnboardingViewState>('phone_verification');
  const [formData, setFormData] = useState<ComplementaryFormSubmitPayload | null>(null);

  const handleComplementarySubmit = (payload?: ComplementaryFormSubmitPayload) => {
    if (payload) {
      setFormData(payload);
    }
    setCurrentView('document_upload');
  };

  return {
    currentView,
    formData,
    goTo: setCurrentView,
    handleComplementarySubmit,
  };
}

export type OnboardingFlow = ReturnType<typeof useOnboardingFlow>;
