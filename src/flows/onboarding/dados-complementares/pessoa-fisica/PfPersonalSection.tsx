import React from 'react';
import { User } from 'lucide-react';
import { MaritalStatusFields } from '@/components/forms/MaritalStatusFields';
import { PersonFields } from '@/components/forms/PersonFields';
import { SectionTitle } from '@/components/forms/SectionTitle';
import {
  PF_PERSON_FIELDS,
  PF_PERSON_LABELS,
  PF_PERSON_PLACEHOLDERS,
  PF_RENDA_NOTICE,
} from '@/constants/complementaryForm';
import type { PfFormData } from '@/types/dadosComplementares';
import { applyMaritalStatusChange } from '@/utils/maritalStatus';

interface PfPersonalSectionProps {
  pfData: PfFormData;
  setPfData: React.Dispatch<React.SetStateAction<PfFormData>>;
  hasDataErrors: boolean;
}

export const PfPersonalSection: React.FC<PfPersonalSectionProps> = ({
  pfData,
  setPfData,
  hasDataErrors,
}) => {
  return (
    <div className="space-y-4">
      <SectionTitle icon={<User size={18} className="text-gci" />}>
        1. Dados Pessoais (Obrigatórios)
      </SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <PersonFields
          values={pfData}
          fields={PF_PERSON_FIELDS}
          labels={PF_PERSON_LABELS}
          placeholders={PF_PERSON_PLACEHOLDERS}
          rendaNotice={hasDataErrors ? PF_RENDA_NOTICE : undefined}
          onFieldChange={(field, value) => setPfData({ ...pfData, [field]: value })}
        />

        <MaritalStatusFields
          values={pfData}
          onEstadoCivilChange={(estadoCivil) =>
            setPfData((prev) => applyMaritalStatusChange(prev, estadoCivil))
          }
          onFieldChange={(field, value) => setPfData({ ...pfData, [field]: value })}
        />
      </div>
    </div>
  );
};
