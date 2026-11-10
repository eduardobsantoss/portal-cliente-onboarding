import { cn } from '@/utils/cn';
import type { OperationValueAttends } from '@/types/operationRequest';

interface ValueAttendsChoiceProps {
  valueAttends: OperationValueAttends;
  setValueAttends: (value: OperationValueAttends) => void;
}

export const ValueAttendsChoice = ({ valueAttends, setValueAttends }: ValueAttendsChoiceProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button 
        onClick={() => setValueAttends('NAO')}
        className={cn(
          "px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
          valueAttends === 'NAO' 
            ? "bg-agro-orange text-white shadow-lg" 
            : "bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100"
        )}
      >
        Não
      </button>
      <button 
        onClick={() => setValueAttends('SIM')}
        className={cn(
          "px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
          valueAttends === 'SIM' 
            ? "bg-gci text-white shadow-lg" 
            : "bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100"
        )}
      >
        Sim
      </button>
    </div>
  );
};
