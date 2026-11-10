import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  FileSearch, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface AnalysisLoadingProps {
  onComplete: () => void;
  onFastForwardPending?: () => void;
  onReject?: () => void;
}

interface StepItem {
  id: number;
  label: string;
  detail: string;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    label: 'Autenticação e integridade do documento',
    detail: 'Verificação criptográfica e conferência do cartão CNPJ',
  },
  {
    id: 2,
    label: 'Conectando às bases de crédito e birôs regulamentados',
    detail: 'Consulta a bases de dados públicos e cadastros oficiais',
  },
  {
    id: 3,
    label: 'Consultando score e regularidade cadastral',
    detail: 'Checagem de adimplência, pendências financeiras e protestos',
  },
  {
    id: 4,
    label: 'Checagem de conformidade e compliance anticorrupção/PLD',
    detail: 'Auditoria de pessoas politicamente expostas (PEP) e sanções',
  },
  {
    id: 5,
    label: 'Processamento das regras de elegibilidade da conta GCI',
    detail: 'Definição de perfil operacional e limite de pré-aprovação',
  },
];

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({
  onComplete,
  onFastForwardPending,
  onReject,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Background timer (sem exibir o timer de 30s no topo conforme solicitado)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (elapsedSeconds < 4) {
      setCurrentStepIndex(0);
      setProgress(15);
    } else if (elapsedSeconds < 10) {
      setCurrentStepIndex(1);
      setProgress(35);
    } else if (elapsedSeconds < 17) {
      setCurrentStepIndex(2);
      setProgress(58);
    } else if (elapsedSeconds < 24) {
      setCurrentStepIndex(3);
      setProgress(82);
    } else if (elapsedSeconds < 30) {
      setCurrentStepIndex(4);
      setProgress(95);
    } else {
      setProgress(100);
      if (onFastForwardPending) {
        onFastForwardPending();
      } else {
        onComplete();
      }
    }
  }, [elapsedSeconds, onFastForwardPending, onComplete]);

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Abertura de Conta
          </span>
        </div>

        {/* Demo Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onComplete}
            className="text-[11px] font-bold text-gci bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            title="Acelerar para aprovação imediata (Demo)"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span>Aprovar</span>
          </button>

          {onReject && (
            <button
              onClick={onReject}
              className="text-[11px] font-bold text-slate-500 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-all"
              title="Simular fluxo de recusa"
            >
              Recusa
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-2">
              <FileSearch size={26} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-3">
              Analisando suas informações
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 max-w-xl leading-relaxed">
              Cruzamos os dados do seu documento com birôs de crédito e bases regulatórias para viabilizar sua conta com total segurança.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Target Company summary card */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-gci shadow-sm">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    AGRO INDUSTRIAL SOJA & MILHO LTDA
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500">
                    CNPJ: 12.345.678/0001-90 • Eduardo Santos
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex text-[11px] font-bold text-gci bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                Em Análise
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Progresso da verificação</span>
                <span className="text-gci">{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-gci to-agro-orange h-full rounded-full"
                  initial={{ width: '5%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Dynamic Step Checklist */}
            <div className="space-y-3 pt-2">
              {STEPS.map((step, idx) => {
                const isDone = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isDone
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                        : isCurrent
                        ? 'bg-white border-gci/60 shadow-md ring-2 ring-gci/10'
                        : 'bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 size={18} className="text-emerald-600" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 rounded-full border-2 border-gci border-t-transparent animate-spin mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 bg-slate-100" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs font-bold ${isCurrent ? 'text-gci' : isDone ? 'text-slate-800' : 'text-slate-500'}`}>
                          {step.label}
                        </p>
                        {isDone && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            Concluído
                          </span>
                        )}
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-gci bg-sky-50 px-2 py-0.5 rounded-full animate-pulse">
                            Processando
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {step.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Subtle disclaimer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-gci" />
                Segurança bancária com criptografia de ponta a ponta
              </span>

              {onFastForwardPending && (
                <button
                  type="button"
                  onClick={onFastForwardPending}
                  className="text-xs font-bold text-slate-600 hover:text-gci flex items-center gap-1 hover:underline"
                >
                  Ver status da análise
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto pt-6 text-center text-xs text-slate-400">
        © 2026 Grupo Ceres Investimentos. Todos os direitos reservados.
      </footer>
    </div>
  );
};
