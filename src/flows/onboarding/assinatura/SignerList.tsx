import React from 'react';
import { Users } from 'lucide-react';
import type { SignerRepresentative } from '@/types/signer';
import { SignerCard } from './SignerCard';

interface SignerListProps {
  reps: SignerRepresentative[];
  allSigned: boolean;
  onToggleSign: (id: string) => void;
}

export const SignerList: React.FC<SignerListProps> = ({ reps, allSigned, onToggleSign }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Users size={15} className="text-gci" />
          Signatários
        </h3>
        <span className="text-[11px] text-slate-400">
          {allSigned ? 'Todas as assinaturas coletadas' : 'Aguardando formalização'}
        </span>
      </div>

      <div className="space-y-2.5">
        {reps.map((rep) => (
          <SignerCard key={rep.id} rep={rep} onToggleSign={() => onToggleSign(rep.id)} />
        ))}
      </div>
    </div>
  );
};
