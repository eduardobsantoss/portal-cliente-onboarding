import React from 'react';
import { TextField } from '@/components/ui/TextField';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { AddressField, AddressValues, FieldVariant } from '@/types/forms';

interface AddressFieldsProps {
  values: AddressValues;
  onFieldChange: (field: AddressField, value: string) => void;
  variant?: FieldVariant;
  /** obrigatoriedade dos campos (complemento nunca é obrigatório) */
  required?: boolean;
  logradouroLabel?: string;
  ufLabel?: string;
  complementoPlaceholder?: string;
  cepPlaceholder?: string;
}

export const AddressFields: React.FC<AddressFieldsProps> = ({
  values,
  onFieldChange,
  variant = 'page' as FieldVariant,
  required = true,
  logradouroLabel = 'Logradouro / Rua *',
  ufLabel = 'Estado (UF) *',
  complementoPlaceholder,
  cepPlaceholder,
}) => {
  const styles = FIELD_VARIANT_STYLES[variant];

  return (
    <div className={styles.addressGrid}>
      <TextField
        label="CEP *"
        required={required}
        placeholder={cepPlaceholder}
        value={values.cep}
        onChange={(value) => onFieldChange('cep', value)}
        inputClassName={styles.input}
      />

      <TextField
        wrapperClassName="sm:col-span-2"
        label={logradouroLabel}
        required={required}
        value={values.logradouro}
        onChange={(value) => onFieldChange('logradouro', value)}
        inputClassName={styles.input}
      />

      <TextField
        label="Número *"
        required={required}
        value={values.numero}
        onChange={(value) => onFieldChange('numero', value)}
        inputClassName={styles.input}
      />

      <TextField
        label="Complemento"
        placeholder={complementoPlaceholder}
        value={values.complemento}
        onChange={(value) => onFieldChange('complemento', value)}
        inputClassName={styles.input}
      />

      <TextField
        label="Bairro *"
        required={required}
        value={values.bairro}
        onChange={(value) => onFieldChange('bairro', value)}
        inputClassName={styles.input}
      />

      <TextField
        wrapperClassName="sm:col-span-2"
        label="Cidade *"
        required={required}
        value={values.cidade}
        onChange={(value) => onFieldChange('cidade', value)}
        inputClassName={styles.input}
      />

      <TextField
        label={ufLabel}
        maxLength={2}
        required={required}
        value={values.uf}
        onChange={(value) => onFieldChange('uf', value.toUpperCase())}
        inputClassName={styles.input}
      />
    </div>
  );
};
