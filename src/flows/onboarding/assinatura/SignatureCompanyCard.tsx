import React from 'react';
import { Building2 } from 'lucide-react';

interface SignatureCompanyCardProps {
  companyName: string;
  cnpj: string;
  allSigned: boolean;
  signedCount: number;
  totalSigners: number;
}

export const SignatureCompanyCard: React.FC<SignatureCompanyCardProps> = ({
  companyName,
  cnpj,
  allSigned,
  signedCount,
  totalSigners,
}) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-gci shadow-sm">
          <Building2 size={20} />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{companyName}</h4>
          <p className="text-[11px] font-semibold text-slate-500">
            CNPJ: {cnpj} • Termo de Abertura de Conta Digital GCI SCD
          </p>
        </div>
      </div>

      <span
        className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
          allSigned
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}
      >
        {signedCount} de {totalSigners} assinados
      </span>
    </div>
  );
};
