import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Titulo } from '@/types/titulo';

/** Linha da tabela da carteira (seleção, situação do título e dados). */
interface CarteiraTitleRowProps {
  row: Titulo;
  selectedTitulos: number[];
  onSelect: (id: number) => void;
  onOpenDetails: (titulo: Titulo) => void;
  onOpenResolve: () => void;
}

export const CarteiraTitleRow: React.FC<CarteiraTitleRowProps> = ({ row, selectedTitulos, onSelect, onOpenDetails, onOpenResolve }) => (
  <tr 
    className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${selectedTitulos.includes(row.id) ? 'bg-orange-50/30' : ''}`}
  >
    <td className="pl-6 py-4" onClick={(e) => e.stopPropagation()}>
      <input 
        type="checkbox" 
        className="w-4 h-4 rounded border-slate-300 text-agro-orange focus:ring-agro-orange cursor-pointer"
        checked={selectedTitulos.includes(row.id)}
        onChange={() => onSelect(row.id)}
      />
    </td>
    <td className="px-6 py-4 text-center">
      {row.actionStatus === 'Pendência' ? (
        <div className="flex flex-col items-center gap-1.5">
          <span className="flex items-center justify-center gap-1.5 bg-orange-100 text-agro-orange px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm shadow-agro-orange/10 whitespace-nowrap">
            <AlertCircle size={10} />
            PENDENTE DE CONFIRMAÇÃO
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenResolve();
            }}
            className="text-[9px] font-black text-gci uppercase tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-agro-orange hover:text-agro-orange transition-all active:scale-95 shadow-sm"
          >
            RESOLVA AQUI
          </button>
        </div>
      ) : (row.actionStatus === 'Pendente de Análise' || row.actionStatus === 'Confirmado') ? (
        <div className="flex items-center justify-center">
          <span className={`flex items-center gap-1.5 ${row.actionStatus === 'Confirmado' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'} px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm ${row.actionStatus === 'Confirmado' ? 'shadow-green-600/20' : 'shadow-green-600/10'}`}>
            <CheckCircle2 size={10} />
            {row.actionStatus}
          </span>
        </div>
      ) : (
        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">-</span>
      )}
    </td>
    <td className="px-6 py-4 min-w-[180px]" onClick={() => onOpenDetails(row)}>
      <p className="font-bold text-xs text-gci">{row.titulo}</p>
      <p className="text-[10px] text-slate-400 font-medium">Grupo AgroTech</p>
    </td>
    <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.lastro}</td>
    <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.numero}</td>
    <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.cessao}</td>
    <td className="px-6 py-4 text-center" onClick={() => onOpenDetails(row)}>
      <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border whitespace-nowrap block w-fit mx-auto ${row.statusColor}`}>
        {row.status}
      </span>
    </td>
    <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.criacao}</td>
    <td className="px-6 py-4 font-bold text-xs text-gci whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.valorNominal}</td>
    <td className="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.valorAquisicao}</td>
    <td className="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.valorPresente}</td>
    <td className="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.vencimento}</td>
    <td className="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" onClick={() => onOpenDetails(row)}>{row.sacado}</td>
  </tr>
);
