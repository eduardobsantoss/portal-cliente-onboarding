import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  AlertCircle, 
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Info,
  LogOut
} from 'lucide-react';
import { Logo } from './Logo';

interface AnalysisPendingProps {
  onSimulateApprove: () => void;
  onSimulateReject: () => void;
  onBackToLogin: () => void;
}

export const AnalysisPending: React.FC<AnalysisPendingProps> = ({
  onSimulateApprove,
  onSimulateReject,
  onBackToLogin,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Status da Solicitação
          </span>
        </div>

        <button
          onClick={onBackToLogin}
          className="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <LogOut size={14} />
          Sair com Segurança
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8 space-y-4">
        {/* Stepper Indicator: Dados -> Documentos -> Assinatura -> Análise */}
        <div className="w-full bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-[11px] font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</span>
            <span className="hidden sm:inline">1. Dados</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</span>
            <span className="hidden sm:inline">2. Documentos</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</span>
            <span className="hidden sm:inline">3. Assinatura</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 text-gci font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
            <span className="w-5 h-5 rounded-full bg-gci text-white flex items-center justify-center text-[10px] font-bold">4</span>
            <span>4. Análise</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10">
              <Clock size={26} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-4">
              Estamos analisando suas informações
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 max-w-xl leading-relaxed">
              Recebemos seus dados com sucesso. Estamos analisando e entraremos em contato.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Company identification */}
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
                    CNPJ: 12.345.678/0001-90 • Protocolo: <span className="font-mono text-slate-700 font-bold">GCI-2026-98412</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Notification Highlight Box & Prazo */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Clock size={16} className="text-agro-orange" />
                <span>Prazo de Análise Cadastral: <strong>até 5 dias úteis</strong></span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nossa equipe de compliance e crédito está validando as informações fornecidas. Avisaremos você no e-mail <strong className="text-slate-900 font-bold">eduardo.santos@ceresinvestimentos.com</strong> assim que a análise for concluída.
              </p>
            </div>

            {/* Safe exit banner */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3.5">
              <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 space-y-1">
                <p className="font-bold">Você pode fechar esta aba com total tranquilidade</p>
                <p className="text-emerald-800 leading-relaxed">
                  Seu progresso está salvo. Quando a análise for concluída, você poderá retornar ao portal com suas credenciais.
                </p>
              </div>
            </div>

            {/* Simulation / Interactive controls for presentation */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info size={13} />
                  Ambiente de Demonstração Interativa
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onSimulateApprove}
                  className="flex-1 px-5 py-3 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/10 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles size={16} className="text-agro-orange" />
                  Simular Retorno: Aprovado
                </button>

                <button
                  onClick={onSimulateReject}
                  className="px-4 py-3 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  Simular Retorno: Recusado
                </button>
              </div>
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
