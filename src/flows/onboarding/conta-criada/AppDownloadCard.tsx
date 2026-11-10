import React from 'react';
import { Smartphone, Download } from 'lucide-react';

interface AppDownloadCardProps {
  onOpenModal: () => void;
}

export const AppDownloadCard: React.FC<AppDownloadCardProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 shadow-sm">
            <Smartphone size={20} className="text-slate-600" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">
              App Ceres Agrofinance
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
              Acompanhe saldos, aprove transações e antecipe duplicatas pelo smartphone.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenModal}
          className="w-full sm:w-auto px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
        >
          <Download size={14} className="text-slate-500" />
          <span>Baixar app Ceres Agrofinance</span>
        </button>
      </div>
    </div>
  );
};
