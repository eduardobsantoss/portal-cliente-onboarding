import React from 'react';

interface DocumentNumberFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const DocumentNumberField: React.FC<DocumentNumberFieldProps> = ({ value, onChange }) => {
  return (
    <div className="mt-2.5 pt-2 border-t border-slate-200/60 max-w-md">
      <label className="block text-[11px] font-bold text-slate-700 mb-1">
        Número do Documento (CPF / RG / CNH) *
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite o CPF ou RG..."
        className="w-full px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci transition-all shadow-sm"
      />
    </div>
  );
};
