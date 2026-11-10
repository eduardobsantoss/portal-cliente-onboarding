import { useState } from 'react';
import { INITIAL_SACADO_CONTACTS } from '@/mocks/sacadoContacts';
import type { SacadoContact } from '@/types/titulo';

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
export function useSacadoContacts(): SacadoContactsState {
  const [sacadoContacts, setSacadoContacts] = useState<SacadoContact[]>(INITIAL_SACADO_CONTACTS);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const resetNewContact = () => {
    setIsAddingContact(false);
    setNewContactEmail('');
    setNewContactPhone('');
  };

  return {
    sacadoContacts,
    isAddingContact,
    newContactEmail,
    newContactPhone,
    setNewContactEmail,
    setNewContactPhone,
    startAddingContact: () => setIsAddingContact(true),
    cancelAddingContact: resetNewContact,
    saveContact: () => {
      if (newContactEmail && newContactPhone) {
        setSacadoContacts([...sacadoContacts, { id: Date.now().toString(), email: newContactEmail, phone: newContactPhone, isPrincipal: false }]);
        resetNewContact();
      }
    },
    makePrincipal: (contactId) => setSacadoContacts(sacadoContacts.map((c) => ({ ...c, isPrincipal: c.id === contactId }))),
    removeContact: (contactId) => setSacadoContacts(sacadoContacts.filter((c) => c.id !== contactId)),
  };
}
