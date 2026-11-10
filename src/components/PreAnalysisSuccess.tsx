import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  BadgePercent, 
  FileText, 
  CreditCard,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface PreAnalysisSuccessProps {
  onContinueToAccount: () => void;
  onDirectToDocuments?: () => void;
}

export const PreAnalysisSuccess: React.FC<PreAnalysisSuccessProps> = ({
  onContinueToAccount,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Pré-Análise
          </span>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-emerald-600" />
          Elegibilidade Aprovada
        </span>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-400/30 mb-4">
              <Sparkles size={26} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pré-análise concluída com sucesso!
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
              Identificamos elegibilidade inicial para abertura da sua conta empresarial e liberação de limites operacionais junto ao Grupo Ceres Investimentos.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Approved Company Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
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

              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Aprovado
              </span>
            </div>

            {/* Credit Line Offer Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 via-white to-amber-50/50 border border-orange-200 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-agro-orange">
                    Limite Operacional Pré-Aprovado
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-gci tracking-tight">
                    R$ 2.000.000,00
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Disponível para antecipação de recebíveis do agronegócio.
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-agro-orange/10 flex items-center justify-center text-agro-orange shrink-0">
                  <BadgePercent size={24} />
                </div>
              </div>
            </div>

            {/* Next Steps Structure */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Próximas Etapas da Sua Jornada
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Conta Digital GCI</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Sua conta corrente empresarial já foi gerada e está ativa.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Checklist Cadastral</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Envio de documentos para ativação plena do limite operacional.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={onContinueToAccount}
                className="w-full sm:w-auto px-8 py-3.5 bg-gci hover:bg-gci-hover text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-gci/10 flex items-center justify-center gap-2 active:scale-95"
              >
                Acessar Dados da Minha Conta
                <ArrowRight size={18} />
              </button>
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
