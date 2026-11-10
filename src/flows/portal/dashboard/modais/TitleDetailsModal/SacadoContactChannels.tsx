import { Plus } from 'lucide-react';
import type { SacadoContactsState } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import { SacadoContactForm } from './SacadoContactForm';
import { SacadoContactList } from './SacadoContactList';

interface SacadoContactChannelsProps {
  contacts: SacadoContactsState;
}

export const SacadoContactChannels = ({ contacts }: SacadoContactChannelsProps) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-8">
      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Canais de Contato</h5>
      <button 
        onClick={contacts.startAddingContact}
        className="flex items-center gap-2 text-agro-orange font-black text-[10px] uppercase tracking-widest hover:underline"
      >
        <Plus size={14} />
        Adicionar Contato
      </button>
    </div>

    {contacts.isAddingContact && (
      <SacadoContactForm
        email={contacts.newContactEmail}
        phone={contacts.newContactPhone}
        onEmailChange={contacts.setNewContactEmail}
        onPhoneChange={contacts.setNewContactPhone}
        onCancel={contacts.cancelAddingContact}
        onSave={contacts.saveContact}
      />
    )}

    <SacadoContactList
      contacts={contacts.sacadoContacts}
      onMakePrincipal={contacts.makePrincipal}
      onRemove={contacts.removeContact}
    />
  </div>
);
