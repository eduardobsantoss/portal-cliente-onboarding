import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

/** Rodapé de paginação da carteira (somente visual). */
interface CarteiraPaginationProps {
  total: number;
}

export const CarteiraPagination = ({ total }: CarteiraPaginationProps) => (
  <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between bg-white">
    <div className="flex items-center gap-6">
      <p className="text-xs text-slate-400 font-medium">
        Mostrando <span className="font-bold text-gci">{total > 0 ? `1-${total}` : '0-0'}</span> de <span className="font-bold text-gci">{total}</span> títulos
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itens por página:</span>
        <div className="relative">
          <select className="bg-slate-50 border border-slate-100 rounded-lg pl-3 pr-8 py-1.5 text-[10px] font-bold text-gci focus:outline-none focus:border-gci appearance-none cursor-pointer min-w-[60px]">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
        <ChevronLeft size={16} />
      </button>
      <div className="flex items-center gap-1">
        {[1].map((page, i) => (
          <button 
            key={i}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
              page === 1 ? 'bg-slate-200 text-slate-400' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);
