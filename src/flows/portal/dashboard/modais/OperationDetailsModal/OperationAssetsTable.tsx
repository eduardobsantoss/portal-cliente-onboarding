import { Hand } from 'lucide-react';
import { OPERATION_ASSETS } from '@/mocks/operationDetails';

export const OperationAssetsTable = () => (
  <div className="overflow-x-auto custom-scrollbar">
    <table className="w-full text-left border-collapse min-w-[1200px]">
      <thead>
        <tr className="bg-gray-50/50 border-b border-gray-100">
          <th className="px-8 py-6 w-12">
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-gci focus:ring-gci transition-all cursor-pointer" />
          </th>
          <th className="px-4 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Registro</th>
          <th className="px-4 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] text-center">Status Anexos</th>
          <th className="px-4 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] text-center">Anexos</th>
          <th className="px-4 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Lastro</th>
          <th className="px-4 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] text-center">Entrega</th>
          <th className="px-4 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Número</th>
          <th className="px-4 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Valor nominal</th>
          <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Cedente</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {OPERATION_ASSETS.map((row, i) => (
          <tr key={i} className={`group hover:bg-gray-50/80 transition-colors ${i % 2 === 0 ? 'bg-blue-50/20' : 'bg-white'}`}>
            <td className="px-8 py-6">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-gci focus:ring-gci transition-all cursor-pointer" />
            </td>
            <td className="px-4 py-6">
              <span className="bg-white border border-gray-200 text-gray-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                Pendente
              </span>
            </td>
            <td className="px-4 py-6">
              <div className="text-gray-300 flex justify-center group-hover:text-agro-orange transition-colors">
                <Hand size={20} />
              </div>
            </td>
            <td className="px-4 py-6">
              <div className="flex justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/30 animate-pulse"></div>
              </div>
            </td>
            <td className="px-4 py-6 text-base font-bold text-gci">{row.lastro}</td>
            <td className="px-4 py-6">
              <div className="flex justify-center">
                <span className="bg-green-50 border border-green-200 text-green-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                  Per
                </span>
              </div>
            </td>
            <td className="px-4 py-6 text-base font-bold text-gci">{row.numero}</td>
            <td className="px-4 py-6 text-base font-black text-gci">{row.valor}</td>
            <td className="px-8 py-6 text-[11px] font-bold text-gray-500 uppercase leading-relaxed max-w-[350px]">
              {row.cedente}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
