import { ShieldCheck, Lock } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import type { OperationStep } from '@/types/operationRequest';
import { OperationActiveStepStatus } from './OperationActiveStepStatus';

interface OperationContextPanelProps {
  step: OperationStep;
}

export const OperationContextPanel = ({ step }: OperationContextPanelProps) => {
  return (
    <div className="hidden lg:flex lg:w-[420px] bg-gci flex-col p-12 text-white relative overflow-hidden shrink-0">
      <div className="relative z-10 h-full flex flex-col">
        <Logo variant="light" className="mb-16 h-8 origin-left" />

        <div className="flex-1">
          <h2 className="text-4xl font-black leading-tight mb-8">
            Nova Solicitação de <span className="text-agro-orange">Antecipação</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-12 font-medium">
            Siga os passos ao lado para antecipar seus recebíveis de forma 100% digital e segura.
          </p>

          <OperationActiveStepStatus step={step} />
        </div>

        <div className="mt-12 space-y-6 border-t border-white/5 pt-10">
          <div className="flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={16} />
            Criptografia de Ponta a Ponta GCI
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-widest">
            <Lock size={14} />
            Sua transação está segura.
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-agro-orange/10 rounded-full blur-[100px]" />
      <div className="absolute top-40 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
    </div>
  );
};
