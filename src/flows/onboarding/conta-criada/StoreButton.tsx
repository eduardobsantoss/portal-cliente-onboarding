import React from 'react';

interface StoreButtonProps {
  logo: React.ReactNode;
  availability: string;
  storeName: string;
  onClick: () => void;
}

export const StoreButton: React.FC<StoreButtonProps> = ({ logo, availability, storeName, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
    >
      {logo}
      <div className="text-left">
        <span className="text-[9px] block text-white/60 font-normal leading-tight">{availability}</span>
        <span className="text-xs font-bold leading-tight">{storeName}</span>
      </div>
    </button>
  );
};
