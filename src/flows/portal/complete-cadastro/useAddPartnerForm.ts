import { ref } from 'vue';
import { INITIAL_NEW_PARTNER_FORM } from '@/constants/documentChecklist';
import type { NewPartnerForm, PartnerData } from '@/types/documentChecklist';
import { buildPartnerFromForm } from '@/utils/partnerDocs';

/** Estado e submissão do modal "Adicionar Parte Relacionada". */
export function useAddPartnerForm(onAddPartner: (partner: PartnerData) => void) {
  const showAddPartnerModal = ref(false);
  const newPartner = ref<NewPartnerForm>(INITIAL_NEW_PARTNER_FORM);

  const setShowAddPartnerModal = (value: boolean) => {
    showAddPartnerModal.value = value;
  };

  const updateField = <K extends keyof NewPartnerForm>(field: K, value: NewPartnerForm[K]) => {
    newPartner.value = { ...newPartner.value, [field]: value };
  };

  // Add new partner
  const handleAddPartnerSubmit = (e: Event) => {
    e.preventDefault();
    if (!newPartner.value.name || !newPartner.value.cpf) return;

    const partner = buildPartnerFromForm(newPartner.value, `partner-${Date.now()}`);

    onAddPartner(partner);
    setShowAddPartnerModal(false);
    newPartner.value = INITIAL_NEW_PARTNER_FORM;
  };

  return {
    showAddPartnerModal,
    setShowAddPartnerModal,
    newPartner,
    updateField,
    handleAddPartnerSubmit,
  };
}
