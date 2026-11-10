import type { OperationSignature } from '@/types/operationRequest';
import { OperationTimeline } from '@/flows/portal/solicitacao-operacao/OperationTimeline';
import { SignatureCompleted } from './SignatureCompleted';
import { SignaturePending } from './SignaturePending';

interface SignatureStepProps {
  isSigned: boolean;
  signatures: OperationSignature[];
  onSignFirst: () => void;
  onContinue: () => void;
}

export const SignatureStep = ({ isSigned, signatures, onSignFirst, onContinue }: SignatureStepProps) => {
  return (
    <>
      <OperationTimeline step="SIGNATURE" />
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-gci tracking-tight">Assinatura Digital</h2>
        <p className="text-slate-500 text-lg font-medium">Finalize o seu desconto de duplicata assinando o termo de cessão.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/50">
        {!isSigned ? (
          <SignaturePending signatures={signatures} onSignFirst={onSignFirst} onContinue={onContinue} />
        ) : (
          <SignatureCompleted />
        )}
      </div>
    </>
  );
};
