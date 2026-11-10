import { useState } from 'react';
import { INITIAL_EXPANDED_PARTNER_ID } from '@/constants/documentChecklist';
import { INITIAL_PARTNERS } from '@/mocks/checklistPartners';
import type { PartnerData, PartnerDocKey } from '@/types/documentChecklist';
import { applyPartnerDocUpload } from '@/utils/partnerDocs';

/** Quadro societário (seção 6): partes relacionadas, parte expandida e upload de documentos por parte. */
export function usePartnerDocs() {
  const [partners, setPartners] = useState<PartnerData[]>(INITIAL_PARTNERS);
  // Expanded partner ID inside the socios topic
  const [expandedPartnerId, setExpandedPartnerId] = useState<string | null>(INITIAL_EXPANDED_PARTNER_ID);

  // Partner file upload handler
  const handlePartnerDocUpload = (partnerId: string, docType: PartnerDocKey, file: File) => {
    setPartners((current) =>
      current.map((p) => (p.id === partnerId ? applyPartnerDocUpload(p, docType, file) : p))
    );
  };

  const addPartner = (partner: PartnerData) => {
    setPartners((prev) => [...prev, partner]);
    setExpandedPartnerId(partner.id);
  };

  return {
    partners,
    setPartners,
    expandedPartnerId,
    setExpandedPartnerId,
    handlePartnerDocUpload,
    addPartner,
  };
}
