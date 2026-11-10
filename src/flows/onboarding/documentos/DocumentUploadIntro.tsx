import React from 'react';
import { Upload } from 'lucide-react';
import type { AccountType } from '@/types/dadosComplementares';

interface DocumentUploadIntroProps {
  accountType: AccountType;
}

export const DocumentUploadIntro: React.FC<DocumentUploadIntroProps> = ({ accountType }) => {
  return (
    <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3">
        <Upload size={26} />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
        Envio de Documentos
      </h1>
      <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed max-w-2xl">
        {accountType === 'pf' 
          ? 'Envie o documento de identificação oficial do titular (CNH, RG, RNE ou CIN) nos formatos JPG, JPEG, PNG ou PDF até 12MB.' 
          : 'Envie os documentos da empresa (Contrato/Estatuto Social, Ata de Eleição se aplicável e Procuração se houver) e o documento de identificação (CNH, RG, RNE ou CIN) de cada sócio/representante cadastrado.'}
      </p>
    </div>
  );
};
