<script setup lang="ts">
import SelectField from '@/components/ui/SelectField.vue';
import TextField from '@/components/ui/TextField.vue';
import { EMPRESA_TIPOS } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import CompanyCnaeField from '@/flows/onboarding/dados-complementares/empresa/CompanyCnaeField.vue';
import StepNextButton from '@/flows/onboarding/dados-complementares/empresa/StepNextButton.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { PjCompanyFormData } from '@/types/dadosComplementares';

defineProps<{
  company: PjCompanyFormData;
  setCompany: SetState<PjCompanyFormData>;
  hasDataErrors: boolean;
}>();

const emit = defineEmits<{ next: [] }>();

const READ_ONLY_INPUT_CLASS =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold';
const READ_ONLY_MONO_INPUT_CLASS =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono font-bold';
const INPUT_CLASS = FIELD_VARIANT_STYLES.page.input;
</script>

<template>
  <form class="space-y-6" @submit.prevent="emit('next')">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <TextField
        wrapper-class-name="sm:col-span-2"
        read-only
        :value="company.razaoSocial"
        :input-class-name="READ_ONLY_INPUT_CLASS"
      >
        <template #label>Razão Social / Nome Empresarial</template>
      </TextField>

      <TextField read-only :value="company.cnpj" :input-class-name="READ_ONLY_MONO_INPUT_CLASS">
        <template #label>CNPJ</template>
      </TextField>

      <TextField
        type="date"
        required
        :value="company.dataAbertura"
        :input-class-name="INPUT_CLASS"
        @change="setCompany({ ...company, dataAbertura: $event })"
      >
        <template #label>Data de Abertura da Empresa *</template>
      </TextField>

      <TextField
        required
        placeholder="Ex: 500.000,00"
        :value="company.capitalSocial"
        :input-class-name="INPUT_CLASS"
        @change="setCompany({ ...company, capitalSocial: $event })"
      >
        <template #label>Capital Social (R$) *</template>
      </TextField>

      <TextField
        required
        placeholder="Ex: 5.000.000,00"
        :value="company.faturamentoAnual"
        :input-class-name="INPUT_CLASS"
        @change="setCompany({ ...company, faturamentoAnual: $event })"
      >
        <template #label>Faturamento Anual Estimado (R$) *</template>
      </TextField>

      <SelectField
        wrapper-class-name="sm:col-span-2"
        required
        :value="company.tipoEmpresa"
        :options="EMPRESA_TIPOS"
        :input-class-name="INPUT_CLASS"
        @change="setCompany({ ...company, tipoEmpresa: $event })"
      >
        <template #label>Tipo de Empresa (Natureza Jurídica) *</template>
      </SelectField>

      <CompanyCnaeField
        :value="company.cnae"
        :has-data-errors="hasDataErrors"
        @change="setCompany({ ...company, cnae: $event })"
      />
    </div>

    <div class="pt-4 border-t border-slate-100 flex justify-end">
      <StepNextButton label="Avançar para Endereço" />
    </div>
  </form>
</template>
