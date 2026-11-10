import React from 'react';

interface IconInputFieldProps {
  label: string;
  icon: React.ReactNode;
  type: 'date' | 'time';
  value: string;
  onChange: (value: string) => void;
}

/** Campo de data/hora com ícone à esquerda do modal de confirmação. */
export const IconInputField = ({ label, icon, type, value, onChange }: IconInputFieldProps) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      {icon}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gci focus:outline-none focus:border-agro-orange transition-all"
      />
    </div>
  </div>
);
