import type { OperationStep } from '@/types/operationRequest';
import { OPERATION_STEPS_CONFIG } from '@/constants/operationRequest';
import { cn } from '@/utils/cn';

interface OperationActiveStepStatusProps {
  step: OperationStep;
}

export const OperationActiveStepStatus = ({ step }: OperationActiveStepStatusProps) => {
  return (
    <div className="space-y-10">
      {OPERATION_STEPS_CONFIG.map((s, idx) => {
        const isActive = s.id === step;
        if (!isActive) return null;
        return (
          <div key={s.id} className={cn("flex items-center gap-6 transition-all duration-500", isActive ? "translate-x-4" : "opacity-40 grayscale-[0.5]")}>
            <div className={cn(
              "w-12 h-12 rounded-[20px] flex items-center justify-center transition-all duration-500 border-2",
              isActive ? "bg-agro-orange border-agro-orange text-white scale-110 shadow-2xl shadow-agro-orange/30" : "border-white/20 text-white/40"
            )}>
              <s.icon size={20} />
            </div>
            <div>
              <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-0.5", isActive ? "text-agro-orange" : "text-white/40")}>Status da Operação</p>
              <p className={cn("text-base font-black uppercase tracking-tight", isActive ? "text-white" : "text-white/60")}>{isActive ? 'Em ' + s.label : 'Aguardando'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
