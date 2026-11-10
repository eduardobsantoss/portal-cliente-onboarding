import { AlertCircle } from 'lucide-react';
import type { OperationFinalReviewData } from '@/types/operationRequest';
import { FinalReviewFigure } from './FinalReviewFigure';

interface FinalReviewFiguresProps {
  review: OperationFinalReviewData;
}

export const FinalReviewFigures = ({ review }: FinalReviewFiguresProps) => {
  return (
    <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/30 max-w-2xl mx-auto text-left relative overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <FinalReviewFigure label="Valor Nominal Enviado" value={review.nominalSent} valueClassName="text-xl font-black text-slate-400" />
        <FinalReviewFigure label="Valor Nominal Aceito" value={review.nominalAccepted} valueClassName="text-xl font-black text-gci" />
        <div className="space-y-1">
          <p className="text-[10px] font-black text-agro-orange uppercase tracking-widest leading-tight">Total Líquido a Desembolsar</p>
          <div className="space-y-0.5">
            <p className="text-xl font-black text-agro-orange">{review.netValue}</p>
            <p className="text-[9px] text-red-500 font-black uppercase tracking-widest italic leading-none">{review.deduction}</p>
          </div>
        </div>
        <FinalReviewFigure label="Taxa Operação" value={review.rate} valueClassName="text-xl font-black text-gci" />
        <FinalReviewFigure label="Prazo Médio" value={review.averageTerm} valueClassName="text-xl font-black text-gci" />
        <FinalReviewFigure label="ID Operação" value={review.operationId} valueClassName="text-xl font-black text-gci" />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50 flex items-start gap-4">
        <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
          <AlertCircle size={16} />
        </div>
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          Nota: <span className="font-bold text-red-500 italic">1 título (#NF-9921)</span> enviado nesta operação já estava registrado em outro desconto vigente. Por segurança, o valor foi retido para evitar duplicidade de crédito.
        </p>
      </div>
    </div>
  );
};
