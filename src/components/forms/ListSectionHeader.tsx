import React from 'react';
import { Plus } from 'lucide-react';

interface ListSectionHeaderProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export const ListSectionHeader: React.FC<ListSectionHeaderProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
      <div>
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">{title}</h3>
        <p className="text-[11px] text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={onAction}
        className="px-3.5 py-2 bg-white hover:bg-slate-100 text-gci border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
      >
        <Plus size={14} />
        {actionLabel}
      </button>
    </div>
  );
};
