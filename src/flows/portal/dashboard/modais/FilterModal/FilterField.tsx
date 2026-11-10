import React from 'react';

interface FilterFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FilterField = ({ label, children }: FilterFieldProps) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    {children}
  </div>
);
