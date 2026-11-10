import { Check } from 'lucide-react';
import type { SacadoContact } from '@/types/titulo';

interface SacadoContactPickerProps {
  sacado: string | undefined;
  contacts: SacadoContact[];
  selectedSacados: string[];
  onToggleSacado: (contactId: string) => void;
  onToggleAll: () => void;
}

export const SacadoContactPicker = ({
  sacado,
  contacts,
  selectedSacados,
  onToggleSacado,
  onToggleAll,
}: SacadoContactPickerProps) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between ml-1">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contatos do Sacado ({sacado})</label>
      <button 
        onClick={onToggleAll}
        className="text-[10px] font-black text-agro-orange uppercase tracking-widest hover:underline"
      >
        {selectedSacados.length === contacts.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
      </button>
    </div>

    <div className="space-y-3">
      {contacts.map(contact => (
        <div 
          key={contact.id}
          onClick={() => onToggleSacado(contact.id)}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
            selectedSacados.includes(contact.id) 
              ? 'border-gci bg-gci/5' 
              : 'border-slate-50 bg-slate-50 hover:border-slate-200'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedSacados.includes(contact.id) ? 'bg-gci text-white' : 'bg-white text-slate-300 border border-slate-100'}`}>
              {selectedSacados.includes(contact.id) ? <Check size={20} strokeWidth={3} /> : <div className="w-5 h-5 rounded border-2 border-slate-200" />}
            </div>
            <div>
              <p className="font-black text-sm text-gci uppercase tracking-tight">{contact.email}</p>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest">{contact.phone} {contact.isPrincipal && '• PRINCIPAL'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
