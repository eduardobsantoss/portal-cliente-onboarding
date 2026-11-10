import React from 'react';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { ESTADOS_CIVIS, REGIMES_DE_BENS } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { FieldVariant, MaritalStatusField, MaritalStatusValues } from '@/types/forms';
import { hasSpouse } from '@/utils/maritalStatus';

interface MaritalStatusFieldsProps {
  values: MaritalStatusValues;
  onEstadoCivilChange: (estadoCivil: string) => void;
  onFieldChange: (field: MaritalStatusField, value: string) => void;
  variant?: FieldVariant;
}

/** Estado civil + (se casado/união estável) cônjuge, CPF e regime de bens. Renderiza células do grid do pai. */
export const MaritalStatusFields: React.FC<MaritalStatusFieldsProps> = ({
  values,
  onEstadoCivilChange,
  onFieldChange,
  variant = 'page' as FieldVariant,
}) => {
  const styles = FIELD_VARIANT_STYLES[variant];

  return (
    <>
      <SelectField
        label="Estado Civil *"
        required
        value={values.estadoCivil}
        options={ESTADOS_CIVIS}
        onChange={onEstadoCivilChange}
        inputClassName={styles.input}
      />

      {hasSpouse(values.estadoCivil) && (
        <>
          <TextField
            label="Nome do Cônjuge *"
            required
            placeholder="Nome completo do cônjuge"
            value={values.nomeConjuge}
            onChange={(value) => onFieldChange('nomeConjuge', value)}
            inputClassName={styles.filledInput}
          />

          <TextField
            label="CPF do Cônjuge *"
            required
            placeholder="000.000.000-00"
            value={values.cpfConjuge}
            onChange={(value) => onFieldChange('cpfConjuge', value)}
            inputClassName={styles.filledInput}
          />

          <SelectField
            wrapperClassName="sm:col-span-2"
            label="Regime de Bens *"
            required
            value={values.regimeBens || REGIMES_DE_BENS[0]}
            options={REGIMES_DE_BENS}
            onChange={(value) => onFieldChange('regimeBens', value)}
            inputClassName={styles.filledInput}
          />
        </>
      )}
    </>
  );
};
