import React, { useState } from 'react';
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
  setDocs: React.Dispatch<React.SetStateAction<DocumentItem[]>>;
  setPartners: React.Dispatch<React.SetStateAction<PartnerData[]>>;
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
  const [isValidatingDocuments, setIsValidatingDocuments] = useState(false);
  const [hasValidationErrors, setHasValidationErrors] = useState(false);
  const [isBulkUploading, setIsBulkUploading] = useState(false);

  // Approve validation action
  const handleApproveValidation = () => {
    setIsValidatingDocuments(false);
    setHasValidationErrors(false);
    onCompleteVerification?.();
  };

  // Simulate adjustments needed action (with realistic issues like no sharpness / unreadable data)
  const handleSimulateAdjustments = () => {
    setIsValidatingDocuments(false);
    setHasValidationErrors(true);

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
    setIsBulkUploading(true);
    setTimeout(() => {
      markAllIdentityVerified();
      setHasValidationErrors(false);

      setDocs((current) => current.map(fillDocForBulk));
      setPartners((current) => current.map(fillPartnerForBulk));

      setIsBulkUploading(false);
      setIsValidatingDocuments(true);
    }, BULK_FILL_DELAY_MS);
  };

  // Reset to initial state
  const handleResetState = () => {
    resetIdentity();
    setIsValidatingDocuments(false);
    setHasValidationErrors(false);
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
