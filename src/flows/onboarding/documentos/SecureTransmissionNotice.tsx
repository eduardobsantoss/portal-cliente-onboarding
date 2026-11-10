import React from 'react';
import { ShieldCheck } from 'lucide-react';
import type { AccountType } from '@/types/dadosComplementares';

interface SecureTransmissionNoticeProps {
  accountType: AccountType;
}

export const SecureTransmissionNotice: React.FC<SecureTransmissionNoticeProps> = ({ accountType }) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
      <ShieldCheck size={18} className="text-gci shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <span className="font-bold text-slate-800">Transmissão Segura de Documentos</span>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Formatos aceitos: <strong>JPG, JPEG, PNG ou PDF (base64)</strong> até <strong>12MB</strong> por arquivo.
          {accountType === 'pf' ? (
            <span> Documento oficial de identificação aceito: <strong>CNH, RG, RNE ou CIN</strong>.</span>
          ) : (
            <span> Documentos de identificação dos sócios/titular aceitos: <strong>CNH, RG, RNE ou CIN</strong>.</span>
          )}
        </p>
      </div>
    </div>
  );
};
