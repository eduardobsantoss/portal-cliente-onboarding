import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  MOCK_FACIAL_AUDIT_STATUS,
  MOCK_FACIAL_IDENTIFIER,
  MOCK_FACIAL_LIVENESS_SCORE,
} from '@/mocks/facialVerification';

export const FacialVerifiedCard: React.FC = () => {
  return (
    <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-emerald-950">Biometria Facial Validada com Sucesso</h4>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Prova de Vida Aprovada
              </span>
            </div>
            <p className="text-xs text-emerald-800 mt-0.5">
              Reconhecimento facial do sócio administrador autenticado e auditado digitalmente.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-emerald-200/60 text-emerald-900">
        <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
          <span className="text-[10px] text-emerald-700 block uppercase font-bold">Identificador</span>
          <span className="font-mono font-semibold text-slate-800 text-[11px]">{MOCK_FACIAL_IDENTIFIER}</span>
        </div>
        <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
          <span className="text-[10px] text-emerald-700 block uppercase font-bold">Liveness Score</span>
          <span className="font-semibold text-emerald-700 text-[11px]">{MOCK_FACIAL_LIVENESS_SCORE}</span>
        </div>
        <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
          <span className="text-[10px] text-emerald-700 block uppercase font-bold">Status de Auditoria</span>
          <span className="font-semibold text-emerald-700 text-[11px]">{MOCK_FACIAL_AUDIT_STATUS}</span>
        </div>
      </div>
    </div>
  );
};
