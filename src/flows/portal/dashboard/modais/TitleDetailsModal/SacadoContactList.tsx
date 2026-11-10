import { Shield, X } from 'lucide-react';
import type { SacadoContact } from '@/types/titulo';

interface SacadoContactListProps {
  contacts: SacadoContact[];
  onMakePrincipal: (contactId: string) => void;
  onRemove: (contactId: string) => void;
}

export const SacadoContactList = ({ contacts, onMakePrincipal, onRemove }: SacadoContactListProps) => (
  <div className="space-y-8 pt-4">
    {contacts.map((contact) => (
      <div key={contact.id} className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 relative group">
        {contact.isPrincipal && (
          <div className="absolute -top-3 left-6 bg-agro-orange text-white text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg shadow-agro-orange/20 flex items-center gap-1">
            <Shield size={10} fill="currentColor" />
            Principal
          </div>
        )}

        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">E-mail</p>
            <p className="text-sm font-bold text-gci">{contact.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Telefone</p>
            <p className="text-sm font-bold text-gci">{contact.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!contact.isPrincipal && (
            <button 
              onClick={() => onMakePrincipal(contact.id)}
              className="text-[9px] font-black text-slate-400 hover:text-agro-orange uppercase tracking-widest transition-colors"
            >
              Tornar Principal
            </button>
          )}
          <button 
            onClick={() => onRemove(contact.id)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-slate-100 opacity-0 group-hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    ))}
  </div>
);
