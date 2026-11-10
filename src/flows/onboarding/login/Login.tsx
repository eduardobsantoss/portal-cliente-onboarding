import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '@/components/ui/Logo';
import { LOGIN_SUPPORT_PHONE } from '@/constants/login';
import { CreatePasswordModal } from '@/flows/onboarding/senha/CreatePasswordModal';
import { useLoginForm } from './useLoginForm';
import { LoginForm } from './LoginForm';
import { LoginHeroPanel } from './LoginHeroPanel';

interface LoginProps {
  onLogin: () => void;
  onStartActivation?: () => void;
}

export const Login = ({ onLogin, onStartActivation }: LoginProps) => {
  const form = useLoginForm({ onLogin });

  return (
    <div className="min-h-screen bg-white flex overflow-hidden relative">
      {/* Modal para criar senha no primeiro acesso / protótipo */}
      <CreatePasswordModal
        isOpen={form.isCreatePasswordOpen}
        onClose={form.handleCreatePasswordClose}
      />

      {/* Left Side: Form */}
      <div className="w-full lg:w-[480px] flex flex-col p-8 md:p-12 lg:p-16 relative z-10 bg-white">
        <div className="mb-auto">
          <Logo variant="dark" className="h-[100px] md:h-[120px] -m-[10px] block" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-sm w-full mx-auto lg:mx-0"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Portal do Cliente</h1>
            <p className="text-slate-500 text-sm leading-relaxed">Bem-vindo de volta. Acesse sua conta para gerenciar suas operações com segurança.</p>
          </div>

          <LoginForm
            email={form.email}
            password={form.password}
            showPassword={form.showPassword}
            onEmailChange={form.setEmail}
            onPasswordChange={form.setPassword}
            onToggleShowPassword={() => form.setShowPassword(!form.showPassword)}
            onSubmit={form.handleSubmit}
          />

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400 leading-relaxed">
              Ainda não tem acesso? Entre em contato com a equipe de atendimento ou ligue para <span className="text-gci font-semibold">{LOGIN_SUPPORT_PHONE}</span>.
            </p>
          </div>
        </motion.div>

        <div className="mt-auto pt-8">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
            © 2025 - 2026 Grupo Ceres Investimentos.
          </p>
        </div>
      </div>

      <LoginHeroPanel />
    </div>
  );
};
