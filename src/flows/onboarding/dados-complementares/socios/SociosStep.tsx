import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ListSectionHeader } from '@/components/forms/ListSectionHeader';
import { StepBackButton } from '@/flows/onboarding/dados-complementares/empresa/StepNavButtons';
import { NonPartnerSection } from '@/flows/onboarding/dados-complementares/representantes/NonPartnerSection';
import type { NonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';
import { SocioCard } from '@/flows/onboarding/dados-complementares/socios/SocioCard';
import type { SociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import { SubmitDocumentsButton } from '@/flows/onboarding/dados-complementares/SubmitDocumentsButton';

interface SociosStepProps {
  sociosEditor: SociosEditor;
  nonPartnerEditor: NonPartnerEditor;
  validationErrorNotice: string | null;
  onBack: () => void;
  onSubmit: () => void;
}

/** PASSO 3: SÓCIOS */
export const SociosStep: React.FC<SociosStepProps> = ({
  sociosEditor,
  nonPartnerEditor,
  validationErrorNotice,
  onBack,
  onSubmit,
}) => {
  const { socios } = sociosEditor;

  return (
    <div className="space-y-6">
      <ListSectionHeader
        title="Sócios e Administradores Cadastrados"
        description="Mantenha as informações conforme o Contrato Social da empresa."
        actionLabel="Adicionar Outro Sócio"
        onAction={sociosEditor.openAdd}
      />

      {/* Validation error notice if no representative is selected */}
      {validationErrorNotice && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-2xl flex items-center gap-2">
          <AlertCircle size={16} className="text-rose-600 shrink-0" />
          <span>{validationErrorNotice}</span>
        </div>
      )}

      {/* Lista de Sócios */}
      <div className="space-y-3">
        {socios.map((socio, idx) => (
          <SocioCard
            key={socio.id}
            socio={socio}
            index={idx}
            onToggleRepresentante={sociosEditor.toggleRepresentante}
            onEdit={sociosEditor.openEdit}
            onDelete={socios.length > 1 ? sociosEditor.remove : undefined}
          />
        ))}
      </div>

      <NonPartnerSection editor={nonPartnerEditor} />

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <StepBackButton label="Voltar para Endereço" onClick={onBack} />
        <SubmitDocumentsButton type="button" onClick={onSubmit} />
      </div>
    </div>
  );
};
