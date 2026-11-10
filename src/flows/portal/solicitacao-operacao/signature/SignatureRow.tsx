import React from 'react';
import { Check, Clock } from 'lucide-react';
import type { OperationSignature } from '@/types/operationRequest';
import { cn } from '@/utils/cn';

interface SignatureRowProps {
  sig: OperationSignature;
  onSign: () => void;
}

export const SignatureRow: React.FC<SignatureRowProps> = ({ sig, onSign }) => {
  return (
    <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl group hover:border-agro-orange transition-all">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
          sig.status === 'Assinado' ? "bg-green-50 text-green-600" : "bg-orange-50 text-agro-orange"
        )}>
          {sig.status === 'Assinado' ? <Check size={20} strokeWidth={3} /> : <Clock size={20} />}
        </div>
        <div className="text-left">
          <p className="text-sm font-black text-gci">{sig.name}</p>
          <p className="text-[10px] font-bold text-slate-400">{sig.role}</p>
        </div>
      </div>

      {sig.status === 'Pendente' && sig.id === 1 ? (
        <button 
          onClick={onSign}
          className="bg-orange-100 text-agro-orange px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-agro-orange hover:text-white transition-all shadow-sm"
        >
          Assinatura Pendente
        </button>
      ) : (
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest",
          sig.status === 'Assinado' ? "text-green-600" : "text-slate-300"
        )}>{sig.status}</span>
      )}
    </div>
  );
};
