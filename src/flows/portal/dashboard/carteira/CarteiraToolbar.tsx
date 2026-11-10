import { motion } from 'motion/react';
import { Download, Filter, Zap } from 'lucide-react';
import { StatusFilterTabs } from '@/components/ui/StatusFilterTabs';
import { CARTEIRA_STATUS_TABS } from '@/constants/dashboardTabs';

interface CarteiraToolbarProps {
  selectedCount: number;
  onOpenConfirmacao: () => void;
  onOpenFilter: () => void;
}

export const CarteiraToolbar = ({ selectedCount, onOpenConfirmacao, onOpenFilter }: CarteiraToolbarProps) => (
  <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <StatusFilterTabs
      labels={CARTEIRA_STATUS_TABS}
      containerClassName="flex gap-1.5 p-1 bg-slate-50 rounded-xl w-fit"
      activeClassName="bg-white text-gci px-4 py-2 rounded-lg text-xs font-bold shadow-sm"
      inactiveClassName="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors"
    />
    <div className="flex gap-2">
      {selectedCount > 0 && (
        <motion.button 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onOpenConfirmacao}
          className="flex items-center justify-center gap-2 bg-agro-orange text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-agro-orange/90 transition-all shadow-lg shadow-agro-orange/20"
        >
          <Zap size={14} fill="currentColor" />
          Atualizar Confirmação ({selectedCount})
        </motion.button>
      )}
      <button 
        onClick={onOpenFilter}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-50 text-gci px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all border border-slate-100"
      >
        <Filter size={14} />
        Filtros
      </button>
      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gci text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gci-hover transition-all">
        <Download size={14} />
        Exportar
      </button>
    </div>
  </div>
);
