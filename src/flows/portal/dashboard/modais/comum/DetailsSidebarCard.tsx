import React from 'react';

interface DetailsSidebarCardProps {
  label: string;
  children: React.ReactNode;
}

/** Cartão translúcido do painel esquerdo dos detalhes (rótulo + valor). */
export const DetailsSidebarCard = ({ label, children }: DetailsSidebarCardProps) => (
  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
    <p className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">{label}</p>
    {children}
  </div>
);
