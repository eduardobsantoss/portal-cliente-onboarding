<script setup lang="ts">
import MaritalStatusFields from '@/components/forms/MaritalStatusFields.vue';
import PersonFields from '@/components/forms/PersonFields.vue';
import SelectField from '@/components/ui/SelectField.vue';
import TextField from '@/components/ui/TextField.vue';
import {
  GENEROS_SOCIO,
  RESPONSABILIDADES_SOCIO,
  SOCIO_PERSON_FIELDS,
} from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { Socio } from '@/types/socio';
import { applyMaritalStatusChange, pickMaritalStatus } from '@/utils/maritalStatus';
import { pickSocioPerson } from '@/utils/socio';

defineProps<{
  form: Partial<Socio>;
  setForm: SetState<Partial<Socio>>;
}>();

const INPUT_CLASS = FIELD_VARIANT_STYLES.modal.input;
const READ_ONLY_INPUT_CLASS = FIELD_VARIANT_STYLES.modal.readOnlyInput;

/** Células do grid de "Dados Pessoais e de Contato" do modal de sócio. */
</script>

<template>
  <TextField
    wrapper-class-name="sm:col-span-2"
    required
    :read-only="form.origemReceita"
    :value="form.nome || ''"
    :input-class-name="form.origemReceita ? READ_ONLY_INPUT_CLASS : INPUT_CLASS"
    @change="setForm({ ...form, nome: $event })"
  >
    <template #label>Nome Completo *</template>
  </TextField>

  <TextField
    required
    placeholder="000.000.000-00"
    :value="form.cpfCnpj || ''"
    :input-class-name="INPUT_CLASS"
    @change="setForm({ ...form, cpfCnpj: $event })"
  >
    <template #label>CPF ou CNPJ *</template>
  </TextField>

  <SelectField
    :value="form.responsabilidade || 'Sócio'"
    :options="RESPONSABILIDADES_SOCIO"
    :input-class-name="INPUT_CLASS"
    @change="setForm({ ...form, responsabilidade: $event })"
  >
    <template #label>Responsabilidade / Cargo *</template>
  </SelectField>

  <TextField
    type="email"
    required
    placeholder="socio@email.com"
    :value="form.email || ''"
    :input-class-name="INPUT_CLASS"
    @change="setForm({ ...form, email: $event })"
  >
    <template #label>E-mail *</template>
  </TextField>

  <TextField
    required
    placeholder="(00) 00000-0000"
    :value="form.telefone || ''"
    :input-class-name="INPUT_CLASS"
    @change="setForm({ ...form, telefone: $event })"
  >
    <template #label>Telefone / Celular *</template>
  </TextField>

  <PersonFields
    variant="modal"
    :values="pickSocioPerson(form)"
    :fields="SOCIO_PERSON_FIELDS"
    :genero-options="GENEROS_SOCIO"
    :require-genero="false"
    @field-change="(field, value) => setForm({ ...form, [field]: value })"
  />

  <!-- Estado Civil e Cônjuge nos Dados Pessoais do Sócio (Item 6) -->
  <MaritalStatusFields
    variant="modal"
    :values="pickMaritalStatus(form)"
    @estado-civil-change="
      (estadoCivil) => setForm((prev) => applyMaritalStatusChange(prev, estadoCivil))
    "
    @field-change="(field, value) => setForm({ ...form, [field]: value })"
  />
</template>
