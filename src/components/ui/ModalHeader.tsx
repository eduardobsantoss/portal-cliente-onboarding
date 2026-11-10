import React from 'react';

interface ModalHeaderProps {
  icon: React.ReactNode;
  title: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ icon, title, onClose }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
      <div className="flex items-center gap-2.5">
        {icon}
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 font-bold text-sm"
      >
        ✕
      </button>
    </div>
  );
};
