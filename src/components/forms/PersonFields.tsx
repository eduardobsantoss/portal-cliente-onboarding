import React from 'react';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { GENEROS_COMPLETO } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES, getRendaInputClass } from '@/constants/formStyles';
import type { FieldVariant, PersonField, PersonValues } from '@/types/forms';

interface PersonFieldsProps {
  values: PersonValues;
  onFieldChange: (field: PersonField, value: string) => void;
  /** campos a renderizar, na ordem em que devem aparecer */
  fields: PersonField[];
  variant?: FieldVariant;
  generoOptions?: readonly string[];
  requireGenero?: boolean;
  labels?: Partial<Record<PersonField, string>>;
  placeholders?: Partial<Record<PersonField, string>>;
  /** quando definido, destaca o campo de renda e exibe o aviso abaixo dele */
  rendaNotice?: string;
}

const DEFAULT_LABELS: Record<PersonField, string> = {
  dataNascimento: 'Data de Nascimento *',
  genero: 'Gênero *',
  nacionalidade: 'Nacionalidade *',
  nomeMae: 'Nome da Mãe *',
  profissao: 'Profissão *',
  renda: 'Renda Mensal (R$) *',
};

/** Dados pessoais comuns (PF, sócio...). Renderiza células do grid do pai. */
export const PersonFields: React.FC<PersonFieldsProps> = ({
  values,
  onFieldChange,
  fields,
  variant = 'page' as FieldVariant,
  generoOptions = GENEROS_COMPLETO,
  requireGenero = true,
  labels,
  placeholders,
  rendaNotice,
}) => {
  const styles = FIELD_VARIANT_STYLES[variant];
  const labelOf = (field: PersonField) => labels?.[field] ?? DEFAULT_LABELS[field];

  const renderField = (field: PersonField) => {
    if (field === 'genero') {
      return (
        <SelectField
          key={field}
          label={labelOf(field)}
          required={requireGenero}
          value={values.genero}
          options={generoOptions}
          onChange={(value) => onFieldChange('genero', value)}
          inputClassName={styles.input}
        />
      );
    }

    if (field === 'renda') {
      return (
        <TextField
          key={field}
          label={labelOf(field)}
          required
          placeholder={placeholders?.renda}
          value={values.renda}
          onChange={(value) => onFieldChange('renda', value)}
          inputClassName={getRendaInputClass(variant, Boolean(rendaNotice))}
          footer={
            rendaNotice && (
              <span className="text-[10px] text-amber-700 font-semibold mt-1 block">{rendaNotice}</span>
            )
          }
        />
      );
    }

    return (
      <TextField
        key={field}
        type={field === 'dataNascimento' ? 'date' : 'text'}
        label={labelOf(field)}
        required
        placeholder={placeholders?.[field]}
        value={values[field]}
        onChange={(value) => onFieldChange(field, value)}
        inputClassName={styles.input}
      />
    );
  };

  return <>{fields.map(renderField)}</>;
};
