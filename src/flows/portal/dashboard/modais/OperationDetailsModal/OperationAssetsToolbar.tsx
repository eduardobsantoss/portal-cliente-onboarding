import { Banknote, Download, Link, Plus, Trash2 } from 'lucide-react';
import { OPERATION_ASSETS_TOTAL } from '@/mocks/operationDetails';

interface OperationAssetsToolbarProps {
  onLinkAssets: () => void;
  onAddXml: () => void;
}

export const OperationAssetsToolbar = ({ onLinkAssets, onAddXml }: OperationAssetsToolbarProps) => (
  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-6">
    <div className="bg-gci/5 border border-gci/10 px-8 py-6 rounded-[32px] flex items-center gap-6 shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gci shadow-md">
        <Banknote size={28} />
      </div>
      <div>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Valor Total dos Ativos</p>
        <p className="text-3xl font-black text-gci">{OPERATION_ASSETS_TOTAL}</p>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-4">
      <button 
        onClick={onLinkAssets}
        className="bg-gci text-white px-7 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gci-hover transition-all flex items-center gap-2.5 shadow-lg shadow-gci/10"
      >
        <Link size={16} />
        Vincular Ativos
      </button>
      <button 
        onClick={onAddXml}
        className="bg-gci text-white px-7 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gci-hover transition-all flex items-center gap-2.5 shadow-lg shadow-gci/10"
      >
        <Plus size={16} />
        Adicionar XMLs
      </button>
      <button className="bg-gray-100 text-gray-400 px-7 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest cursor-not-allowed flex items-center gap-2.5">
        <Trash2 size={16} />
        Remover
      </button>
      <button className="bg-white text-gci border-2 border-gray-100 px-7 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:border-gci/30 transition-all flex items-center gap-2.5 shadow-sm">
        <Download size={16} />
        Exportar
      </button>
    </div>
  </div>
);
