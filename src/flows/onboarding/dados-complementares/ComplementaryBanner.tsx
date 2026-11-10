import React from 'react';
import { FileText } from 'lucide-react';

export const ComplementaryBanner: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3">
        <FileText size={26} />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
        Dados complementares para abertura de conta
      </h1>
      <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed max-w-2xl">
        Preencha as informações cadastrais necessárias para formalizar a abertura da sua conta junto ao Grupo Ceres Investimentos.
      </p>
    </div>
  );
};
