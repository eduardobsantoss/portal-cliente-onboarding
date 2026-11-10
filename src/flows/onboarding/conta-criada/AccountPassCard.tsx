import React from 'react';
import { Copy, Check } from 'lucide-react';
import type { AccountInfo } from '@/types/account';

interface AccountPassCardProps {
  accountInfo: AccountInfo;
  copiedField: string | null;
  onCopy: (field: string, value: string) => void;
}

export const AccountPassCard: React.FC<AccountPassCardProps> = ({ accountInfo, copiedField, onCopy }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-[#083C4A] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-slate-800">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-agro-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-agro-orange/20 text-agro-orange flex items-center justify-center font-bold text-xs">
            GCI
          </div>
          <div>
            <p className="text-xs font-bold text-white tracking-wide">
              {accountInfo.institution}
            </p>
            <p className="text-[10px] text-white/60 font-medium">
              {accountInfo.accountType}
            </p>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Agência</span>
          <p className="text-sm font-bold text-white font-mono mt-0.5">{accountInfo.agency}</p>
        </div>

        <div>
          <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Conta Corrente</span>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm font-bold text-white font-mono">{accountInfo.accountNumber}</p>
            <button
              type="button"
              onClick={() => onCopy('account', accountInfo.accountNumber)}
              className="text-white/60 hover:text-white transition-colors"
              title="Copiar conta"
            >
              {copiedField === 'account' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div className="col-span-2 pt-2 border-t border-white/10">
          <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Titular / Razão Social</span>
          <p className="text-xs font-bold text-white uppercase tracking-tight mt-0.5">{accountInfo.companyName}</p>
          <p className="text-[11px] text-white/60 font-medium mt-0.5">CNPJ: {accountInfo.cnpj}</p>
        </div>
      </div>
    </div>
  );
};
