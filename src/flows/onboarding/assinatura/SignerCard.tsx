import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import type { SignerRepresentative } from '@/types/signer';
import { maskEmail } from '@/utils/maskEmail';

interface SignerCardProps {
  rep: SignerRepresentative;
  onToggleSign: () => void;
}

export const SignerCard: React.FC<SignerCardProps> = ({ rep, onToggleSign }) => {
  const isSigned = rep.status === 'Assinado';

  return (
    <div
      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isSigned
          ? 'bg-emerald-50/40 border-emerald-200'
          : 'bg-slate-50/60 border-slate-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
            isSigned
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'bg-slate-200 text-slate-600'
          }`}
        >
          {isSigned ? <CheckCircle2 size={18} /> : <Clock size={16} />}
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              {rep.name}
            </h4>
            <span className="text-[10px] font-bold text-gci bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
              {rep.role || (rep.type === 'nao_socio' ? rep.vinculo || 'Procurador' : 'Representante Legal')}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            E-mail: {maskEmail(rep.email)} • CPF: {rep.cpf}
          </p>
          {isSigned && rep.signedAt && (
            <p className="text-[10px] text-emerald-700 font-semibold">
              Formalizado digitalmente ({rep.signedAt})
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5 ${
            isSigned
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-amber-100 text-amber-800 border-amber-200'
          }`}
        >
          {isSigned ? (
            <>
              <CheckCircle2 size={13} className="text-emerald-700" />
              Assinado
            </>
          ) : (
            <>
              <Clock size={13} className="text-amber-700" />
              Pendente
            </>
          )}
        </span>

        <button
          type="button"
          onClick={onToggleSign}
          className="text-[11px] font-semibold text-slate-500 hover:text-gci underline px-2 py-1"
        >
          {isSigned ? 'Desmarcar' : 'Assinar'}
        </button>
      </div>
    </div>
  );
};
