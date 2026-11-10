import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

interface PartnerCardProps {
  avatar: React.ReactNode;
  avatarClassName: string;
  detailsClassName: string;
  details: React.ReactNode;
  actionsClassName: string;
  /** conteúdo opcional antes dos botões Editar/Remover (ex.: checkbox) */
  actionsPrefix?: React.ReactNode;
  onEdit: () => void;
  /** quando ausente o botão de remover não é exibido */
  onDelete?: () => void;
  deleteTitle: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  avatar,
  avatarClassName,
  detailsClassName,
  details,
  actionsClassName,
  actionsPrefix,
  onEdit,
  onDelete,
  deleteTitle,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors">
      <div className="flex items-start gap-3">
        <div className={avatarClassName}>{avatar}</div>
        <div className={detailsClassName}>{details}</div>
      </div>

      <div className={actionsClassName}>
        {actionsPrefix}

        <button
          type="button"
          onClick={onEdit}
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-gci hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
        >
          <Edit3 size={13} />
          Editar
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title={deleteTitle}
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
};
