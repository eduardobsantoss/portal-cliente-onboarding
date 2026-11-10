import React from 'react';
import { AlertCircle } from 'lucide-react';

interface CompanyCnaeFieldProps {
  value: string;
  onChange: (value: string) => void;
  hasDataErrors: boolean;
}

export const CompanyCnaeField: React.FC<CompanyCnaeFieldProps> = ({
  value,
  onChange,
  hasDataErrors,
}) => {
  return (
    <div className="sm:col-span-2">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-[11px] font-bold text-slate-700">CNAE Principal *</label>
        {hasDataErrors && (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <AlertCircle size={11} /> Divergência cadastral
          </span>
        )}
      </div>
      <input
        type="text"
        required
        placeholder="Ex: 01.15-6/00 - Cultivo de soja"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3.5 py-2.5 rounded-xl border font-medium focus:outline-none focus:ring-2 ${
          hasDataErrors
            ? 'border-amber-400 bg-amber-50/40 text-slate-900 focus:ring-amber-500/20'
            : 'border-slate-200 bg-white focus:ring-gci/20 focus:border-gci'
        }`}
      />
      {hasDataErrors && (
        <p className="text-[11px] text-amber-700 mt-1 font-medium">
          Por favor, confirme se o CNAE informado coincide com a atividade principal da sua empresa.
        </p>
      )}
    </div>
  );
};
