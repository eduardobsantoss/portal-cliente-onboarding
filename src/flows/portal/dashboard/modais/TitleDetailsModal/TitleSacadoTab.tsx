import { CheckCircle2, User } from 'lucide-react';
import type { SacadoContactsState } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import { TITLE_SACADO_DOCUMENT } from '@/mocks/titleDetails';
import type { Titulo } from '@/types/titulo';
import { SacadoContactChannels } from './SacadoContactChannels';

interface TitleSacadoTabProps {
  titulo: Titulo;
  contacts: SacadoContactsState;
}

export const TitleSacadoTab = ({ titulo, contacts }: TitleSacadoTabProps) => (
  <div className="space-y-8">
    <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-gci/5 flex items-center justify-center text-gci">
          <User size={24} />
        </div>
        <div>
          <h4 className="text-lg font-black text-gci">Dados do Sacado</h4>
          <p className="text-sm text-slate-400 font-medium">Informações básicas e contatos cadastrados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
          <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-400 cursor-not-allowed">
            {titulo.sacado}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Documento (CPF/CNPJ)</label>
          <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-400 cursor-not-allowed">
            {TITLE_SACADO_DOCUMENT}
          </div>
        </div>
      </div>

      <SacadoContactChannels contacts={contacts} />

      <button className="mt-12 bg-gci text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gci-hover transition-all shadow-xl shadow-gci/20 active:scale-95 flex items-center gap-3">
        Salvar Alterações
        <CheckCircle2 size={18} />
      </button>
    </div>
  </div>
);
