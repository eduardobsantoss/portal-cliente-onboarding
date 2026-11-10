import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { OperationStep } from '@/types/operationRequest';
import { cn } from '@/utils/cn';
import { getOperationStepIndex } from '@/utils/operationFlow';

interface OperationFooterNavProps {
  step: OperationStep;
  canContinue: boolean;
  onPrev: () => void;
  onNext: () => void;
  onRecusar: () => void;
}

export const OperationFooterNav = ({ step, canContinue, onPrev, onNext, onRecusar }: OperationFooterNavProps) => {
  const isFirstStep = getOperationStepIndex(step) === 0;

  return (
    <div className="px-6 md:px-12 py-8 border-t border-slate-100 bg-white shrink-0">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-6">
        <button
          disabled={isFirstStep || step === 'VALIDATING' || step === 'SUMMARY' || step === 'FINAL_REVIEW'}
          onClick={onPrev}
          className={cn(
            "px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3",
            isFirstStep || step === 'VALIDATING' || step === 'SUMMARY' || step === 'FINAL_REVIEW' ? "opacity-0 invisible" : "text-slate-400 hover:bg-slate-50 hover:text-gci"
          )}
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="flex-1 md:flex-none flex items-center gap-3">
          {step === 'SUMMARY' && (
            <button 
              onClick={onRecusar}
              className="flex-1 md:w-32 px-6 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
            >
              Recusar
            </button>
          )}
          <button
            disabled={!canContinue || step === 'VALIDATING' || step === 'PROCESSING_DOCS'}
            onClick={onNext}
            className={cn(
              "flex-1 md:min-w-[240px] px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-2xl",
              canContinue && step !== 'PROCESSING_DOCS'
                ? "bg-gci text-white shadow-gci/20 hover:scale-[1.02] active:scale-[0.98]" 
                : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
            )}
          >
            {step === 'SIGNATURE' ? 'Ver Resumo' : step === 'SUMMARY' ? 'Concordar e Avançar' : 'Próximo Passo'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
