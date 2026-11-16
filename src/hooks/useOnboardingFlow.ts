import { computed, ref, type UnwrapNestedRefs } from 'vue';
import type { ComplementaryFormSubmitPayload } from '@/types/dadosComplementares';
import type { DocumentUploadItem, DocumentsMode } from '@/types/documentUpload';
import type { OnboardingViewState } from '@/types/onboarding';

export function useOnboardingFlow() {
  // A jornada começa na landing page do GCI e segue:
  // Landing → Confirmação do celular por SMS → Criação de senha → Termos → Dados complementares...
  const currentView = ref<OnboardingViewState>('landing');
  const history = ref<OnboardingViewState[]>([]);
  const formData = ref<ComplementaryFormSubmitPayload | null>(null);
  const documentsSnapshot = ref<DocumentUploadItem[] | null>(null);
  const documentsMode = ref<DocumentsMode>('initial');
  const adjustmentRequestId = ref(0);
  const appliedAdjustmentRequestId = ref(0);

  const goTo = (view: OnboardingViewState) => {
    history.value = [...history.value, currentView.value];
    currentView.value = view;
  };

  const goBack = () => {
    const prev = history.value;
    if (prev.length === 0) return;
    currentView.value = prev[prev.length - 1];
    history.value = prev.slice(0, -1);
  };

  const setDocumentsSnapshot = (items: DocumentUploadItem[] | null) => {
    documentsSnapshot.value = items;
  };

  const setAppliedAdjustmentRequestId = (id: number) => {
    appliedAdjustmentRequestId.value = id;
  };

  const handleComplementarySubmit = (payload?: ComplementaryFormSubmitPayload) => {
    if (payload) {
      formData.value = payload;
    }
    documentsSnapshot.value = null;
    documentsMode.value = 'initial';
    goTo('document_upload');
  };

  const openDocumentAdjustment = () => {
    documentsMode.value = 'adjustment';
    adjustmentRequestId.value += 1;
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
    canGoBack: computed(() => history.value.length > 0),
    goTo,
    goBack,
    handleComplementarySubmit,
    openDocumentAdjustment,
  };
}

/** Fluxo já "desembrulhado" (via `reactive`), como é consumido nos templates. */
export type OnboardingFlow = UnwrapNestedRefs<ReturnType<typeof useOnboardingFlow>>;
