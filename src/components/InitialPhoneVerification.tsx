import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, ShieldCheck, ArrowLeft, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { SmsVerification } from './SmsVerification';

interface InitialPhoneVerificationProps {
  onConfirmed: () => void;
  onGoToLogin: () => void;
  maskedPhone?: string;
}

export const InitialPhoneVerification: React.FC<InitialPhoneVerificationProps> = ({
  onConfirmed,
  onGoToLogin,
  maskedPhone = '(34) 9 ••••-1234',
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans text-slate-900">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Logo variant="dark" className="h-10 md:h-12 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portal do Cliente • Ativação de Acesso
          </span>
        </div>

        <button
          type="button"
          onClick={onGoToLogin}
          className="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <LogOut size={14} />
          Já possuo senha
        </button>
      </header>

      {/* Main Card */}
      <main className="max-w-2xl md:max-w-3xl w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3 shadow-inner">
              <Smartphone size={24} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Confirme seu celular
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
              Para sua segurança, enviamos um código de confirmação por SMS para o número informado no seu cadastro inicial via WhatsApp.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Reusable SmsVerification Component */}
            <SmsVerification
              maskedPhone={maskedPhone}
              onVerified={() => {
                setTimeout(() => {
                  onConfirmed();
                }, 800);
              }}
            />

            {/* Security notice */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-3 text-xs text-emerald-950">
              <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold">Ambiente Seguro GCI SCD</span>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  Após a confirmação do celular, você definirá sua senha de acesso exclusiva para formalizar o cadastro e acompanhar suas operações.
                </p>
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
