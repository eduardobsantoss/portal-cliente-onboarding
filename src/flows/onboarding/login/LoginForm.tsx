import React from 'react';
import { ChevronRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onToggleShowPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onToggleShowPassword,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
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
            onChange={(e) => onEmailChange(e.target.value)}
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
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          <button
            type="button"
            onClick={onToggleShowPassword}
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
  );
};
