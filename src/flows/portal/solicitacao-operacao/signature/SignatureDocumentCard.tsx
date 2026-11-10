import { FileText } from 'lucide-react';
import { MOCK_OPERATION_ID } from '@/mocks/operationRequest';

export const SignatureDocumentCard = () => {
  return (
    <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-8">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gci shadow-sm">
        <FileText size={28} />
      </div>
      <div className="text-left">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Principal</p>
        <h4 className="text-base font-black text-gci">{`Termo de Cessão ${MOCK_OPERATION_ID}`}</h4>
      </div>
    </div>
  );
};
