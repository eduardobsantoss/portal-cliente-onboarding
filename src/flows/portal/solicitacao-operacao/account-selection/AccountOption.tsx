import React from 'react';
import { Banknote, Check } from 'lucide-react';
import type { DisbursementAccount } from '@/types/operationRequest';

interface AccountOptionProps {
  acc: DisbursementAccount;
  selectedAccount: string;
  onSelect: (accountId: string) => void;
}

export const AccountOption: React.FC<AccountOptionProps> = ({ acc, selectedAccount, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(acc.id)}
      className={`relative p-6 rounded-[24px] border-2 text-left transition-all group ${
        selectedAccount === acc.id 
          ? 'border-gci bg-gci/5 shadow-xl shadow-gci/10' 
          : 'border-slate-100 hover:border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            selectedAccount === acc.id ? 'bg-gci text-white' : 'bg-slate-50 text-slate-400'
          }`}>
            <Banknote size={24} />
          </div>
          <div>
            <p className="font-black text-gci text-base">{acc.bank}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ag {acc.branch} • CC {acc.account}</p>
          </div>
        </div>
        {selectedAccount === acc.id && (
          <div className="w-6 h-6 rounded-full bg-gci text-white flex items-center justify-center">
            <Check size={14} strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
};
