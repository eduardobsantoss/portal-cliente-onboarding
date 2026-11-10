import { Check } from 'lucide-react';
import type { OperationStep } from '@/types/operationRequest';
import { cn } from '@/utils/cn';
import { getOperationPhaseSteps } from '@/utils/operationFlow';

interface OperationTimelineProps {
  step: OperationStep;
}

export const OperationTimeline = ({ step }: OperationTimelineProps) => {
  const phaseSteps = getOperationPhaseSteps(step);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between relative px-4">
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0" />
        {phaseSteps.map((s, idx) => {
          const isActive = s.id === step;
          const currentIndexInPhase = phaseSteps.findIndex(step_config => step_config.id === step);
          const isPast = currentIndexInPhase > idx;
          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                isActive ? "bg-agro-orange border-agro-orange text-white scale-110 shadow-lg shadow-agro-orange/20" : 
                isPast ? "bg-gci border-gci text-white" : "bg-white border-slate-100 text-slate-300"
              )}>
                 {isPast ? <Check size={18} strokeWidth={4} /> : <s.icon size={18} />}
              </div>
              <span className={cn(
                "absolute top-full mt-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
                isActive ? "text-agro-orange" : isPast ? "text-gci" : "text-slate-300"
              )}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
