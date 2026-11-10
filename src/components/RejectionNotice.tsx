import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { Logo } from './Logo';

interface RejectionNoticeProps {
  onBackToLogin: () => void;
  onRetryDemo: () => void;
}

export const RejectionNotice: React.FC<RejectionNoticeProps> = ({
  onBackToLogin,
  onRetryDemo,
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
          <ArrowLeft size={14} />
          Voltar ao Login
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-lg w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto border border-slate-200">
            <AlertCircle size={28} />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Solicitação não aprovada
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Não foi possível abrir a sua conta neste momento junto ao Grupo Ceres Investimentos.
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onBackToLogin}
              className="w-full py-3 bg-gci hover:bg-gci-hover text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shadow-gci/10"
            >
              Voltar ao Início
            </button>

            <button
              type="button"
              onClick={onRetryDemo}
              className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={14} />
              Reiniciar Simulação (Demo)
            </button>
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
