import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { CreatePasswordModal } from './CreatePasswordModal';

interface LoginProps {
  onLogin: () => void;
  onStartActivation?: () => void;
}

export const Login = ({ onLogin, onStartActivation }: LoginProps) => {
  const [email, setEmail] = useState('eduardo.santos@ceresinvestimentos.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatePasswordOpen, setIsCreatePasswordOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden relative">
      {/* Modal para criar senha no primeiro acesso / protótipo */}
      <CreatePasswordModal
        isOpen={isCreatePasswordOpen}
        onClose={(createdPassword) => {
          if (createdPassword) {
            setPassword(createdPassword);
          }
          setIsCreatePasswordOpen(false);
        }}
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">E-mail Corporativo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-gci transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="text"
                  placeholder="exemplo@empresa.com.br"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Senha</label>
                <a href="#" className="text-[11px] font-bold text-gci hover:underline transition-colors uppercase tracking-wider">Esqueci a Senha</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-gci transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-12 text-sm font-medium focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all placeholder:text-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-gci transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1 py-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-slate-300 text-gci focus:ring-gci cursor-pointer" 
              />
              <label htmlFor="remember" className="text-xs font-medium text-slate-600 cursor-pointer select-none">Lembrar neste dispositivo</label>
            </div>

            <button
              type="submit"
              className="w-full bg-gci hover:bg-gci-hover text-white h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group transition-all shadow-lg shadow-gci/10 mt-2 active:scale-[0.99]"
            >
              Acessar Portal
              <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400 leading-relaxed">
              Ainda não tem acesso? Entre em contato com a equipe de atendimento ou ligue para <span className="text-gci font-semibold">(34) 3311-0140</span>.
            </p>
          </div>
        </motion.div>

        <div className="mt-auto pt-8">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
            © 2025 - 2026 Grupo Ceres Investimentos.
          </p>
        </div>
      </div>

      {/* Right Side: Visual/Image */}
      <div className="hidden lg:block flex-1 relative bg-gci overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-gci/80 via-gci/40 to-transparent"></div>
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
          alt="Agro Business"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute bottom-16 left-16 right-16 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-lg"
          >
            <div className="w-12 h-1 bg-agro-orange mb-6"></div>
            <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Impulsionando o futuro do agronegócio brasileiro.
            </h2>
            <p className="text-white/70 text-lg font-medium leading-relaxed">
              Soluções financeiras sob medida para quem produz. Tecnologia e tradição unidas para o crescimento do seu negócio.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-agro-orange/10 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      </div>
    </div>
  );
};
