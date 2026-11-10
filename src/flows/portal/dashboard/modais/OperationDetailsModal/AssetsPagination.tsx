import { ChevronLeft, ChevronRight } from 'lucide-react';

export const AssetsPagination = () => (
  <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between bg-white">
    <div className="flex items-center gap-6">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
        Mostrando <span className="font-bold text-gci">1-5</span> de <span className="font-bold text-gci">12</span> ativos
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
      <button className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50" disabled>
        <ChevronLeft size={18} />
      </button>
      <div className="flex items-center gap-1.5">
        <button className="w-9 h-9 rounded-xl text-xs font-black bg-gci text-white shadow-lg shadow-gci/10">1</button>
        <button className="w-9 h-9 rounded-xl text-xs font-black text-gray-400 hover:bg-gray-50">2</button>
        <button className="w-9 h-9 rounded-xl text-xs font-black text-gray-400 hover:bg-gray-50">3</button>
      </div>
      <button className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all">
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
);
