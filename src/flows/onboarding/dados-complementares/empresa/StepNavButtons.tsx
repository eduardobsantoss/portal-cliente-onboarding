import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StepBackButtonProps {
  label: string;
  onClick: () => void;
}

export const StepBackButton: React.FC<StepBackButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all"
    >
      {label}
    </button>
  );
};

interface StepNextButtonProps {
  label: string;
}

export const StepNextButton: React.FC<StepNextButtonProps> = ({ label }) => {
  return (
    <button
      type="submit"
      className="px-6 py-3 bg-gci hover:bg-gci-hover text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-gci/10 flex items-center gap-2 active:scale-95"
    >
      {label}
      <ArrowRight size={16} />
    </button>
  );
};
