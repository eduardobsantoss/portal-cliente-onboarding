import React from 'react';

interface SectionTitleProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ icon, children }) => {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
      {icon}
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{children}</h3>
    </div>
  );
};
