<script setup lang="ts">
import { computed } from 'vue';
import AddressFields from '@/components/forms/AddressFields.vue';
import CorrespondenceAddressSection from '@/components/forms/CorrespondenceAddressSection.vue';
import StepBackButton from '@/flows/onboarding/dados-complementares/empresa/StepBackButton.vue';
import StepNextButton from '@/flows/onboarding/dados-complementares/empresa/StepNextButton.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { PjCompanyFormData, PjLockedField } from '@/types/dadosComplementares';
import type { AddressField } from '@/types/forms';
import { pickCorrespondenceAddress, toCorrespondenceKey } from '@/utils/address';

const props = defineProps<{
  company: PjCompanyFormData;
  setCompany: SetState<PjCompanyFormData>;
  lockedFields: readonly PjLockedField[];
}>();

const emit = defineEmits<{ back: []; next: [] }>();

const ADDRESS_FIELDS: readonly AddressField[] = [
  'cep',
  'logradouro',
  'numero',
  'complemento',
  'bairro',
  'cidade',
  'uf',
];
// Só o endereço da sede é travado; o endereço de correspondência continua livre.
const lockedAddressFields = computed(() =>
  ADDRESS_FIELDS.filter((field) => props.lockedFields.includes(field)),
);

const LOGRADOURO_LABEL = 'Logradouro / Avenida *';
const COMPLEMENTO_PLACEHOLDER = 'Bloco, Sala';
</script>

<template>
  <form class="space-y-6" @submit.prevent="emit('next')">
    <AddressFields
      :values="company"
      :read-only-fields="lockedAddressFields"
      :logradouro-label="LOGRADOURO_LABEL"
      :complemento-placeholder="COMPLEMENTO_PLACEHOLDER"
      @field-change="(field, value) => setCompany({ ...company, [field]: value })"
    />

    <!-- Item 5: Endereço de Correspondência PJ -->
    <CorrespondenceAddressSection
      :same-as-main="company.correspondenciaMesmo"
      title="Endereço de Correspondência da Empresa *"
      :address="pickCorrespondenceAddress(company)"
      :logradouro-label="LOGRADOURO_LABEL"
      :complemento-placeholder="COMPLEMENTO_PLACEHOLDER"
      @same-as-main-change="(checked) => setCompany({ ...company, correspondenciaMesmo: checked })"
      @field-change="
        (field, value) => setCompany({ ...company, [toCorrespondenceKey(field)]: value })
      "
    />

    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
      <StepBackButton label="Voltar para Dados" @click="emit('back')" />
      <StepNextButton label="Avançar para Quadro Societário" />
    </div>
  </form>
</template>
