import { FileText } from 'lucide-react';
import { CARTEIRA_TABLE_COLUMNS } from '@/constants/carteiraColumns';
import type { Titulo } from '@/types/titulo';
import { comparePendingFirst } from '@/utils/titulos';
import { CarteiraTitleRow } from './CarteiraTitleRow';

interface CarteiraTitlesTableProps {
  titulosList: Titulo[];
  selectedTitulos: number[];
  onSelect: (id: number) => void;
  onSelectAll: (ids: number[]) => void;
  onOpenDetails: (titulo: Titulo) => void;
  onOpenResolve: () => void;
}

const COLUMN_CLASS = 'px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap';

export const CarteiraTitlesTable = ({
  titulosList,
  selectedTitulos,
  onSelect,
  onSelectAll,
  onOpenDetails,
  onOpenResolve,
}: CarteiraTitlesTableProps) => (
  <div className="overflow-x-auto custom-scrollbar">
    <table className="w-full text-left border-collapse min-w-[1200px]">
      <thead>
        <tr className="bg-slate-50/50">
          <th className="pl-6 py-4 w-10">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-agro-orange focus:ring-agro-orange cursor-pointer"
              checked={selectedTitulos.length === titulosList.length}
              onChange={() => onSelectAll(titulosList.map(t => t.id))}
            />
          </th>
          {CARTEIRA_TABLE_COLUMNS.map((column) => (
            <th key={column.label} className={`${COLUMN_CLASS}${column.center ? ' text-center' : ''}`}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {titulosList.length > 0 ? (
          [...titulosList].sort(comparePendingFirst).map((row) => (
            <CarteiraTitleRow
              key={row.id}
              row={row}
              selectedTitulos={selectedTitulos}
              onSelect={onSelect}
              onOpenDetails={onOpenDetails}
              onOpenResolve={onOpenResolve}
            />
          ))
        ) : (
          <tr>
            <td colSpan={13} className="py-12 text-center text-slate-400">
              <FileText size={28} className="mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">Nenhum título cadastrado</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Seus títulos aparecerão aqui quando forem originados.</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
