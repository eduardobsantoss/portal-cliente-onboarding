import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface SmsVerifiedCardProps {
  maskedPhone: string;
  verifiedAt: string;
  onRedo: () => void;
}

export const SmsVerifiedCard: React.FC<SmsVerifiedCardProps> = ({ maskedPhone, verifiedAt, onRedo }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
          <CheckCircle2 size={20} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-slate-900">Telefone validado com sucesso</h4>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full shrink-0">
              Concluído
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 flex items-center gap-2 flex-wrap">
            <span>Número: <strong className="text-slate-800 font-mono">{maskedPhone}</strong></span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span>Confirmado em: <strong className="font-semibold text-slate-700">{verifiedAt}</strong></span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRedo}
        className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 self-start sm:self-center shrink-0 whitespace-nowrap active:scale-95"
      >
        <RotateCcw size={14} className="text-slate-500" />
        <span>Refazer validação</span>
      </button>
    </div>
  );
};
