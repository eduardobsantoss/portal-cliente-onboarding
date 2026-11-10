import React from 'react';
import { MaritalStatusFields } from '@/components/forms/MaritalStatusFields';
import { PersonFields } from '@/components/forms/PersonFields';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import {
  GENEROS_SOCIO,
  RESPONSABILIDADES_SOCIO,
  SOCIO_PERSON_FIELDS,
} from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { Socio } from '@/types/socio';
import { applyMaritalStatusChange, pickMaritalStatus } from '@/utils/maritalStatus';
import { pickSocioPerson } from '@/utils/socio';

interface SocioContactFieldsProps {
  form: Partial<Socio>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Socio>>>;
}

const INPUT_CLASS = FIELD_VARIANT_STYLES.modal.input;

/** Células do grid de "Dados Pessoais e de Contato" do modal de sócio. */
export const SocioContactFields: React.FC<SocioContactFieldsProps> = ({ form, setForm }) => {
  return (
    <>
      <TextField
        wrapperClassName="sm:col-span-2"
        label="Nome Completo *"
        required
        value={form.nome || ''}
        onChange={(value) => setForm({ ...form, nome: value })}
        inputClassName={INPUT_CLASS}
      />

      <TextField
        label="CPF ou CNPJ *"
        required
        placeholder="000.000.000-00"
        value={form.cpfCnpj || ''}
        onChange={(value) => setForm({ ...form, cpfCnpj: value })}
        inputClassName={INPUT_CLASS}
      />

      <SelectField
        label="Responsabilidade / Cargo *"
        value={form.responsabilidade || 'Sócio'}
        options={RESPONSABILIDADES_SOCIO}
        onChange={(value) => setForm({ ...form, responsabilidade: value })}
        inputClassName={INPUT_CLASS}
      />

      <TextField
        type="email"
        label="E-mail *"
        required
        placeholder="socio@email.com"
        value={form.email || ''}
        onChange={(value) => setForm({ ...form, email: value })}
        inputClassName={INPUT_CLASS}
      />

      <TextField
        label="Telefone / Celular *"
        required
        placeholder="(00) 00000-0000"
        value={form.telefone || ''}
        onChange={(value) => setForm({ ...form, telefone: value })}
        inputClassName={INPUT_CLASS}
      />

      <PersonFields
        variant="modal"
        values={pickSocioPerson(form)}
        fields={SOCIO_PERSON_FIELDS}
        generoOptions={GENEROS_SOCIO}
        requireGenero={false}
        onFieldChange={(field, value) => setForm({ ...form, [field]: value })}
      />

      {/* Estado Civil e Cônjuge nos Dados Pessoais do Sócio (Item 6) */}
      <MaritalStatusFields
        variant="modal"
        values={pickMaritalStatus(form)}
        onEstadoCivilChange={(estadoCivil) =>
          setForm((prev) => applyMaritalStatusChange(prev, estadoCivil))
        }
        onFieldChange={(field, value) => setForm({ ...form, [field]: value })}
      />
    </>
  );
};
