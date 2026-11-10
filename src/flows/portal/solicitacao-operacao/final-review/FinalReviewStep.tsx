import { Check } from 'lucide-react';
import { MOCK_OPERATION_FINAL_REVIEW } from '@/mocks/operationRequest';
import { OperationTimeline } from '@/flows/portal/solicitacao-operacao/OperationTimeline';
import { FinalReviewConfirmation } from './FinalReviewConfirmation';
import { FinalReviewFigures } from './FinalReviewFigures';

interface FinalReviewStepProps {
  termsAccepted: boolean;
  onTermsAcceptedChange: (accepted: boolean) => void;
  onRecusar: () => void;
  onConfirm: () => void;
}

export const FinalReviewStep = ({ termsAccepted, onTermsAcceptedChange, onRecusar, onConfirm }: FinalReviewStepProps) => {
  return (
    <>
      <OperationTimeline step="FINAL_REVIEW" />
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
          <Check size={12} strokeWidth={3} />
          Processamento Concluído
        </div>
        <h2 className="text-3xl font-black text-gci uppercase tracking-tighter">Resumo Final da Operação</h2>
        <p className="text-slate-500 text-lg font-medium max-w-md mx-auto">Confira os valores finais antes de prosseguir para a assinatura digital.</p>
      </div>

      <FinalReviewFigures review={MOCK_OPERATION_FINAL_REVIEW} />

      <FinalReviewConfirmation
        termsAccepted={termsAccepted}
        onTermsAcceptedChange={onTermsAcceptedChange}
        onRecusar={onRecusar}
        onConfirm={onConfirm}
      />
    </>
  );
};
