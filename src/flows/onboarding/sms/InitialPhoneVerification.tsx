import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, ShieldCheck, LogOut } from 'lucide-react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { SMS_DEFAULT_MASKED_PHONE } from '@/constants/sms';
import { SmsVerification } from './SmsVerification';

interface InitialPhoneVerificationProps {
  onConfirmed: () => void;
  onGoToLogin: () => void;
  maskedPhone?: string;
}

export const InitialPhoneVerification: React.FC<InitialPhoneVerificationProps> = ({
  onConfirmed,
  onGoToLogin,
  maskedPhone = SMS_DEFAULT_MASKED_PHONE,
}) => {
  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Ativação de Acesso"
      mainClassName="max-w-2xl md:max-w-3xl w-full mx-auto my-auto py-8"
      headerAction={
        <button
          type="button"
          onClick={onGoToLogin}
          className="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <LogOut size={14} />
          Já possuo senha
        </button>
      }
    >
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
    </OnboardingPageShell>
  );
};
