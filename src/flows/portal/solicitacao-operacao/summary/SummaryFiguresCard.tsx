import type { OperationRejectedTitle, OperationSummaryData } from '@/types/operationRequest';
import { RejectedTitlesList } from './RejectedTitlesList';
import { SummaryNetTotal } from './SummaryNetTotal';
import { SummaryRow } from './SummaryRow';

interface SummaryFiguresCardProps {
  summary: OperationSummaryData;
  rejectedTitles: OperationRejectedTitle[];
}

const LABEL_MUTED = 'text-[11px] font-black text-slate-500 uppercase tracking-widest';

export const SummaryFiguresCard = ({ summary, rejectedTitles }: SummaryFiguresCardProps) => {
  return (
    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-100/50">
      <div className="p-10 space-y-8">
        {/* DRE Body */}
        <div className="space-y-4">
          <SummaryRow
            rowClassName="flex items-center justify-between py-2 border-b border-slate-50"
            labelClassName="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            valueClassName="text-sm font-black text-gci"
            label="Total de Títulos Extraídos"
            value={summary.totalTitles}
          />
          <SummaryRow
            rowClassName="flex items-center justify-between py-4 border-b border-slate-100"
            labelClassName="text-[11px] font-black text-slate-500 uppercase tracking-widest italic"
            valueClassName="text-base font-black text-slate-400"
            label="Valor total de Títulos Extraídos"
            value={summary.totalTitlesValue}
          />
          <SummaryRow
            rowClassName="flex items-center justify-between py-2 border-b border-slate-50"
            labelClassName="text-[10px] font-black text-green-600 uppercase tracking-widest"
            valueClassName="text-sm font-black text-green-600"
            label="Total de Títulos Aceitos"
            value={summary.acceptedTitles}
          />
          <SummaryRow
            rowClassName="flex items-center justify-between py-4 border-b border-slate-100"
            labelClassName="text-[11px] font-black text-gci uppercase tracking-widest"
            valueClassName="text-lg font-black text-gci"
            label="Valor Total de títulos validados"
            value={summary.validatedValue}
          />
          <SummaryRow
            rowClassName="flex items-center justify-between py-4 border-b border-slate-100"
            labelClassName={LABEL_MUTED}
            valueClassName="text-sm font-black text-slate-600"
            label="Taxa da Operação"
            value={summary.rate}
          />
          <SummaryRow
            rowClassName="flex items-center justify-between py-4 border-b border-slate-100"
            labelClassName={LABEL_MUTED}
            valueClassName="text-sm font-black text-slate-600"
            label="Prazo Médio de Vencimento"
            value={summary.averageTerm}
          />
          <SummaryRow
            rowClassName="flex items-center justify-between py-4 border-b border-slate-200"
            labelClassName={LABEL_MUTED}
            valueClassName="text-sm font-black text-slate-600"
            label="Títulos Rejeitados / Inconsistentes"
            value={summary.rejectedValue}
          />

          {/* Final Result */}
          <SummaryNetTotal netValue={summary.netValue} />
        </div>

        {/* Rejection Details if any */}
        <RejectedTitlesList titles={rejectedTitles} />
      </div>
    </div>
  );
};
