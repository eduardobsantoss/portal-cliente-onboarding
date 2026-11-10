import React from 'react';
import { ListSectionHeader } from '@/components/forms/ListSectionHeader';
import { NonPartnerCard } from '@/flows/onboarding/dados-complementares/representantes/NonPartnerCard';
import type { NonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';

interface NonPartnerSectionProps {
  editor: NonPartnerEditor;
}

/** SEÇÃO PRÓPRIA: Representantes Legais Não Sócios (Item 3) */
export const NonPartnerSection: React.FC<NonPartnerSectionProps> = ({ editor }) => {
  return (
    <div className="pt-4 border-t border-slate-100 space-y-4">
      <ListSectionHeader
        title="Representantes Legais Não Sócios"
        description="Cadastre administradores não sócios ou procuradores com poderes de representação."
        actionLabel="Adicionar representante que não é sócio"
        onAction={editor.openAdd}
      />

      {editor.reps.length === 0 ? (
        <div className="p-4 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400">
          Nenhum representante não sócio cadastrado. Se houver administrador ou procurador externo, clique acima.
        </div>
      ) : (
        <div className="space-y-2.5">
          {editor.reps.map((rep) => (
            <NonPartnerCard
              key={rep.id}
              rep={rep}
              onEdit={editor.openEdit}
              onDelete={editor.remove}
            />
          ))}
        </div>
      )}
    </div>
  );
};
