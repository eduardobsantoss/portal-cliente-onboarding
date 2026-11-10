import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { CreatePasswordState } from './useCreatePassword';
import { PasswordField } from './PasswordField';
import { PasswordRecommendations } from './PasswordRecommendations';

interface CreatePasswordFormProps {
  form: CreatePasswordState;
}

export const CreatePasswordForm: React.FC<CreatePasswordFormProps> = ({ form }) => {
  return (
    <form onSubmit={form.handleSubmit} className="space-y-4">
      {/* Nova Senha */}
      <PasswordField
        label="Nova Senha"
        placeholder="Crie uma senha segura"
        value={form.password}
        show={form.showPassword}
        onChange={form.setPassword}
        onToggleShow={() => form.setShowPassword(!form.showPassword)}
      />

      {/* Confirmar Senha */}
      <PasswordField
        label="Confirmar Nova Senha"
        placeholder="Repita a nova senha"
        value={form.confirmPassword}
        show={form.showConfirmPassword}
        onChange={form.setConfirmPassword}
        onToggleShow={() => form.setShowConfirmPassword(!form.showConfirmPassword)}
      />

      {/* Password Criteria Checklist */}
      <PasswordRecommendations />

      {/* Submit Action */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-gci hover:bg-gci-hover text-white h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group transition-all shadow-lg shadow-gci/10 active:scale-[0.99] cursor-pointer"
        >
          <span>Criar Senha e Prosseguir</span>
          <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </form>
  );
};
