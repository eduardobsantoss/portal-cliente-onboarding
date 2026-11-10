import React from 'react';
import { MapPin } from 'lucide-react';
import { AddressFields } from '@/components/forms/AddressFields';
import { CorrespondenceAddressSection } from '@/components/forms/CorrespondenceAddressSection';
import { SectionTitle } from '@/components/forms/SectionTitle';
import type { PfFormData } from '@/types/dadosComplementares';
import { pickCorrespondenceAddress, toCorrespondenceKey } from '@/utils/address';

interface PfAddressSectionProps {
  pfData: PfFormData;
  setPfData: React.Dispatch<React.SetStateAction<PfFormData>>;
}

const COMPLEMENTO_PLACEHOLDER = 'Apto, Sala, Bloco';

export const PfAddressSection: React.FC<PfAddressSectionProps> = ({ pfData, setPfData }) => {
  return (
    <div className="space-y-4">
      <SectionTitle icon={<MapPin size={18} className="text-gci" />}>
        2. Endereço Residencial (Obrigatório)
      </SectionTitle>

      <AddressFields
        values={pfData}
        complementoPlaceholder={COMPLEMENTO_PLACEHOLDER}
        onFieldChange={(field, value) => setPfData({ ...pfData, [field]: value })}
      />

      {/* Item 5: Endereço de Correspondência PF */}
      <CorrespondenceAddressSection
        sameAsMain={pfData.correspondenciaMesmo}
        onSameAsMainChange={(checked) => setPfData({ ...pfData, correspondenciaMesmo: checked })}
        title="Endereço de Correspondência *"
        address={pickCorrespondenceAddress(pfData)}
        logradouroLabel="Logradouro / Rua *"
        complementoPlaceholder={COMPLEMENTO_PLACEHOLDER}
        onFieldChange={(field, value) =>
          setPfData({ ...pfData, [toCorrespondenceKey(field)]: value })
        }
      />
    </div>
  );
};
