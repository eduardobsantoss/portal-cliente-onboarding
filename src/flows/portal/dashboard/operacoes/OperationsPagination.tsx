import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Rodapé de paginação das operações (somente visual). */
interface OperationsPaginationProps {
  count: number;
}

export const OperationsPagination = ({ count }: OperationsPaginationProps) => (
  <div className="mt-8 flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex items-center gap-6">
      <p className="text-xs text-slate-400 font-medium">
        Mostrando <span className="font-bold text-gci">1-{count}</span> de <span className="font-bold text-gci">{count}</span> operações
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itens por página:</span>
        <select className="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px] font-bold text-gci focus:outline-none focus:border-gci appearance-none cursor-pointer">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
        <ChevronLeft size={16} />
      </button>
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 rounded-lg text-xs font-bold bg-gci text-white shadow-lg shadow-gci/10">1</button>
      </div>
      <button className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);
