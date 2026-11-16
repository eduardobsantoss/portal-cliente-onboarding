import { ref } from 'vue';
import { INITIAL_SACADO_CONTACTS } from '@/mocks/sacadoContacts';
import type { SacadoContact } from '@/types/titulo';

/**
 * Contrato (desembrulhado) consumido pelos componentes filhos: use `reactive(useSacadoContacts())`
 * no dono do estado e repasse o objeto reativo como prop `contacts` (mesmos nomes de campos do React).
 */
export interface SacadoContactsState {
  sacadoContacts: SacadoContact[];
  isAddingContact: boolean;
  newContactEmail: string;
  newContactPhone: string;
  setNewContactEmail: (value: string) => void;
  setNewContactPhone: (value: string) => void;
  startAddingContact: () => void;
  cancelAddingContact: () => void;
  saveContact: () => void;
  makePrincipal: (contactId: string) => void;
  removeContact: (contactId: string) => void;
}

/** Contatos do sacado exibidos na aba "Sacado" dos detalhes do título (estado preservado entre aberturas). */
export function useSacadoContacts() {
  const sacadoContacts = ref<SacadoContact[]>(INITIAL_SACADO_CONTACTS);
  const isAddingContact = ref(false);
  const newContactEmail = ref('');
  const newContactPhone = ref('');

  const resetNewContact = () => {
    isAddingContact.value = false;
    newContactEmail.value = '';
    newContactPhone.value = '';
  };

  return {
    sacadoContacts,
    isAddingContact,
    newContactEmail,
    newContactPhone,
    setNewContactEmail: (value: string) => {
      newContactEmail.value = value;
    },
    setNewContactPhone: (value: string) => {
      newContactPhone.value = value;
    },
    startAddingContact: () => {
      isAddingContact.value = true;
    },
    cancelAddingContact: resetNewContact,
    saveContact: () => {
      if (newContactEmail.value && newContactPhone.value) {
        sacadoContacts.value = [
          ...sacadoContacts.value,
          { id: Date.now().toString(), email: newContactEmail.value, phone: newContactPhone.value, isPrincipal: false },
        ];
        resetNewContact();
      }
    },
    makePrincipal: (contactId: string) => {
      sacadoContacts.value = sacadoContacts.value.map((c) => ({ ...c, isPrincipal: c.id === contactId }));
    },
    removeContact: (contactId: string) => {
      sacadoContacts.value = sacadoContacts.value.filter((c) => c.id !== contactId);
    },
  };
}
