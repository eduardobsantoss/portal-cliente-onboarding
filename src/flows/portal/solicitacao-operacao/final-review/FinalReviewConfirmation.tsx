import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FinalReviewConfirmationProps {
  termsAccepted: boolean;
  onTermsAcceptedChange: (accepted: boolean) => void;
  onRecusar: () => void;
  onConfirm: () => void;
}

export const FinalReviewConfirmation = ({ termsAccepted, onTermsAcceptedChange, onRecusar, onConfirm }: FinalReviewConfirmationProps) => {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col items-center gap-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              id="final-terms-checkbox"
              checked={termsAccepted}
              onChange={(e) => onTermsAcceptedChange(e.target.checked)}
              className="peer sr-only" 
            />
            <div className={cn(
              "w-6 h-6 border-2 rounded-lg transition-all flex items-center justify-center",
              termsAccepted ? "bg-agro-orange border-agro-orange" : "border-slate-200 group-hover:border-agro-orange"
            )}>
              <Check size={14} className={cn("text-white transition-transform", termsAccepted ? "scale-100" : "scale-0")} />
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 group-hover:text-gci transition-colors">
            Eu concordo com o resumo acima e com os <button onClick={(e) => { e.stopPropagation(); alert('Termos da Operação: ...'); }} className="text-agro-orange hover:underline">Termos da Operação</button>
          </span>
        </label>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={onRecusar}
          className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
        >
          Recusar
        </button>
        <button 
          disabled={!termsAccepted}
          onClick={onConfirm}
          className={cn(
            "px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl",
            termsAccepted 
              ? "bg-gci text-white shadow-gci/20 hover:scale-105" 
              : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
          )}
        >
          Confirmar e Assinar
        </button>
      </div>
    </div>
  );
};
