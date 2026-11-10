import { AlertCircle } from 'lucide-react';
import type { OperationRejectedTitle } from '@/types/operationRequest';

interface RejectedTitlesListProps {
  titles: OperationRejectedTitle[];
}

export const RejectedTitlesList = ({ titles }: RejectedTitlesListProps) => {
  return (
    <div className="pt-2">
      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
        <AlertCircle size={14} />
        Detalhes dos Títulos Rejeitados (2)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {titles.map((title) => (
          <div key={title.invoice} className="p-4 bg-red-50/50 rounded-2xl border border-red-100 flex flex-col gap-1">
            <span className="text-[10px] font-black text-red-700 uppercase tracking-tighter">{title.reason}</span>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-red-900/60">{title.invoice}</span>
              <span className="text-[11px] font-black text-red-700">{title.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
