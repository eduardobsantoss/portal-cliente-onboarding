import { ChevronRight, FileText } from 'lucide-react';
import type { PortalOperation } from '@/types/portalOperation';
import { RecentOperationCard } from './RecentOperationCard';

interface RecentOperationsProps {
  operations: PortalOperation[];
  onViewAll: () => void;
  onOpenOperation: (op: PortalOperation) => void;
}

export const RecentOperations = ({ operations, onViewAll, onOpenOperation }: RecentOperationsProps) => (
  <div>
    <div className="flex items-center justify-between mb-6 ml-1">
      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Operações Recentes</h4>
      <button 
        onClick={onViewAll}
        className="text-[10px] font-black text-gci hover:text-agro-orange uppercase tracking-widest transition-colors flex items-center gap-1"
      >
        Ver Tudo
        <ChevronRight size={14} />
      </button>
    </div>
    {operations.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {operations.slice(0, 3).map((op) => (
          <RecentOperationCard key={op.id} op={op} onOpen={onOpenOperation} />
        ))}
      </div>
    ) : (
      <div className="bg-white rounded-[24px] border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-3">
          <FileText size={24} />
        </div>
        <p className="text-sm font-bold text-slate-700">Nenhuma operação realizada</p>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Suas solicitações de antecipação e desconto de duplicata aparecerão aqui.</p>
      </div>
    )}
  </div>
);
