<script setup lang="ts">
import AddressFields from '@/components/forms/AddressFields.vue';
import CorrespondenceAddressSection from '@/components/forms/CorrespondenceAddressSection.vue';
import StepBackButton from '@/flows/onboarding/dados-complementares/empresa/StepBackButton.vue';
import StepNextButton from '@/flows/onboarding/dados-complementares/empresa/StepNextButton.vue';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import type { PjCompanyFormData } from '@/types/dadosComplementares';
import { pickCorrespondenceAddress, toCorrespondenceKey } from '@/utils/address';

defineProps<{
  company: PjCompanyFormData;
  setCompany: SetState<PjCompanyFormData>;
}>();

const emit = defineEmits<{ back: []; next: [] }>();

const LOGRADOURO_LABEL = 'Logradouro / Avenida *';
const COMPLEMENTO_PLACEHOLDER = 'Bloco, Sala';
</script>

<template>
  <form class="space-y-6" @submit.prevent="emit('next')">
    <AddressFields
      :values="company"
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
