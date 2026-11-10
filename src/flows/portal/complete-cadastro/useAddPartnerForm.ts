import React, { useState } from 'react';
import { INITIAL_NEW_PARTNER_FORM } from '@/constants/documentChecklist';
import type { NewPartnerForm, PartnerData } from '@/types/documentChecklist';
import { buildPartnerFromForm } from '@/utils/partnerDocs';

/** Estado e submissão do modal "Adicionar Parte Relacionada". */
export function useAddPartnerForm(onAddPartner: (partner: PartnerData) => void) {
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [newPartner, setNewPartner] = useState<NewPartnerForm>(INITIAL_NEW_PARTNER_FORM);

  const updateField = <K extends keyof NewPartnerForm>(field: K, value: NewPartnerForm[K]) => {
    setNewPartner({ ...newPartner, [field]: value });
  };

  // Add new partner
  const handleAddPartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.name || !newPartner.cpf) return;

    const partner = buildPartnerFromForm(newPartner, `partner-${Date.now()}`);

    onAddPartner(partner);
    setShowAddPartnerModal(false);
    setNewPartner(INITIAL_NEW_PARTNER_FORM);
  };

  return {
    showAddPartnerModal,
    setShowAddPartnerModal,
    newPartner,
    updateField,
    handleAddPartnerSubmit,
  };
}
