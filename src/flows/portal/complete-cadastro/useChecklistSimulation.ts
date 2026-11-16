import { ref } from 'vue';
import { OFFICIAL_DOCS } from '@/constants/checklistDocuments';
import {
  ADJUSTMENT_OPEN_TOPICS,
  BULK_FILL_DELAY_MS,
  REJECTED_PARTNER_ID,
} from '@/constants/documentChecklist';
import { INITIAL_PARTNERS } from '@/mocks/checklistPartners';
import type { ChecklistTopicKey, DocumentItem, PartnerData } from '@/types/documentChecklist';
import { fillDocForBulk, rejectCompanyContract } from '@/utils/checklistDocs';
import { fillPartnerForBulk, rejectPartnerIrpf } from '@/utils/partnerDocs';

interface ChecklistSimulationInput {
  setDocs: (next: DocumentItem[] | ((current: DocumentItem[]) => DocumentItem[])) => void;
  setPartners: (next: PartnerData[] | ((current: PartnerData[]) => PartnerData[])) => void;
  setExpandedPartnerId: (id: string | null) => void;
  openTopics: (keys: ChecklistTopicKey[]) => void;
  markAllIdentityVerified: () => void;
  resetIdentity: () => void;
  onCompleteVerification?: () => void;
  onResetVerification?: () => void;
}

/** Ações de simulação do protótipo: preencher tudo, validar, pedir ajustes e restaurar o estado inicial. */
export function useChecklistSimulation({
  setDocs,
  setPartners,
  setExpandedPartnerId,
  openTopics,
  markAllIdentityVerified,
  resetIdentity,
  onCompleteVerification,
  onResetVerification,
}: ChecklistSimulationInput) {
  // Document validation loading state
  const isValidatingDocuments = ref(false);
  const hasValidationErrors = ref(false);
  const isBulkUploading = ref(false);

  // Approve validation action
  const handleApproveValidation = () => {
    isValidatingDocuments.value = false;
    hasValidationErrors.value = false;
    onCompleteVerification?.();
  };

  // Simulate adjustments needed action (with realistic issues like no sharpness / unreadable data)
  const handleSimulateAdjustments = () => {
    isValidatingDocuments.value = false;
    hasValidationErrors.value = true;

    // Set Contrato Social as rejected due to sharpness/edges issue
    setDocs((current) => current.map(rejectCompanyContract));

    // Set Partner 3 IRPF as rejected due to unextracted data / missing RFB receipt
    setPartners((current) => current.map((p) => rejectPartnerIrpf(p, REJECTED_PARTNER_ID)));

    // Open the relevant accordions
    openTopics(ADJUSTMENT_OPEN_TOPICS);
    setExpandedPartnerId(REJECTED_PARTNER_ID);
  };

  // Quick action: Upload All (Simulação) -> Triggers real-time document validation
  const handleQuickUploadAll = () => {
    isBulkUploading.value = true;
    setTimeout(() => {
      markAllIdentityVerified();
      hasValidationErrors.value = false;

      setDocs((current) => current.map(fillDocForBulk));
      setPartners((current) => current.map(fillPartnerForBulk));

      isBulkUploading.value = false;
      isValidatingDocuments.value = true;
    }, BULK_FILL_DELAY_MS);
  };

  // Reset to initial state
  const handleResetState = () => {
    resetIdentity();
    isValidatingDocuments.value = false;
    hasValidationErrors.value = false;
    setDocs(OFFICIAL_DOCS);
    setPartners(INITIAL_PARTNERS);
    onResetVerification?.();
  };

  return {
    isValidatingDocuments,
    hasValidationErrors,
    isBulkUploading,
    handleApproveValidation,
    handleSimulateAdjustments,
    handleQuickUploadAll,
    handleResetState,
  };
}
