import type { OperationSignature } from '@/types/operationRequest';
import { SignatureDocumentCard } from './SignatureDocumentCard';
import { SignatureRow } from './SignatureRow';
import { SignaturesCollected } from './SignaturesCollected';
import { SignaturesWaiting } from './SignaturesWaiting';

interface SignaturePendingProps {
  signatures: OperationSignature[];
  onSignFirst: () => void;
  onContinue: () => void;
}

export const SignaturePending = ({ signatures, onSignFirst, onContinue }: SignaturePendingProps) => {
  return (
    <div className="space-y-8">
      <SignatureDocumentCard />

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assinaturas do Cliente</h5>
           <span className="text-[10px] font-black text-agro-orange uppercase tracking-widest">{signatures.filter(s => s.status === 'Assinado').length} de {signatures.length}</span>
        </div>

        <div className="space-y-3">
          {signatures.map((sig) => (
            <SignatureRow key={sig.id} sig={sig} onSign={onSignFirst} />
          ))}

          {/* Simulating "Assinando..." state change button */}
          {signatures.every(s => s.status === 'Assinado') ? (
            <SignaturesCollected onContinue={onContinue} />
          ) : (
            <SignaturesWaiting />
          )}
        </div>
      </div>
    </div>
  );
};
