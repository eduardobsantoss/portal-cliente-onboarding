import { CheckCircle2, FileText } from 'lucide-react';
import type { OperationCompletionData } from '@/types/operationRequest';

interface CompletedStepProps {
  onComplete: (operationData: OperationCompletionData) => void;
}

export const CompletedStep = ({ onComplete }: CompletedStepProps) => {
  return (
    <>
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner mb-6">
        <CheckCircle2 size={48} />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-gci uppercase tracking-tighter">Operação Realizada!</h2>
        <p className="text-slate-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
          Sua antecipação foi processada com sucesso. O recurso estará disponível em sua conta em instantes.
        </p>
      </div>

      <div className="space-y-6 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            className="text-gci font-black text-[10px] uppercase tracking-widest hover:text-agro-orange transition-colors flex items-center gap-2 px-8 py-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md"
          >
            <FileText size={16} />
            Termo de Cessão Assinado
          </button>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => onComplete({ grupoEmpresarial: null })}
            className="w-full sm:w-auto bg-gci text-white px-16 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-gci-hover transition-all shadow-xl shadow-gci/20"
          >
            Voltar para a Home
          </button>
        </div>
      </div>
    </>
  );
};
