<script setup lang="ts">
import type { PfFormData } from '@/types/dadosComplementares';
import type { SetState } from '@/flows/onboarding/dados-complementares/stateSetter';
import SubmitDocumentsButton from '@/flows/onboarding/dados-complementares/SubmitDocumentsButton.vue';
import PfAddressSection from './PfAddressSection.vue';
import PfOptionalSection from './PfOptionalSection.vue';
import PfPersonalSection from './PfPersonalSection.vue';

defineProps<{
  pfData: PfFormData;
  setPfData: SetState<PfFormData>;
  showOptionals: boolean;
  hasDataErrors: boolean;
}>();

const emit = defineEmits<{
  toggleOptionals: [];
  submit: [event: Event];
}>();
</script>

<template>
  <form class="space-y-8" @submit="emit('submit', $event)">
    <!-- Bloco 1: Dados Pessoais -->
    <PfPersonalSection :pf-data="pfData" :set-pf-data="setPfData" :has-data-errors="hasDataErrors" />

    <!-- Bloco 2: Endereço Residencial -->
    <PfAddressSection :pf-data="pfData" :set-pf-data="setPfData" />

    <!-- Seção Opcional Colapsável -->
    <PfOptionalSection
      :pf-data="pfData"
      :set-pf-data="setPfData"
      :is-open="showOptionals"
      @toggle="emit('toggleOptionals')"
    />

    <!-- Submit Action -->
    <div class="pt-4 border-t border-slate-100 flex items-center justify-end">
      <SubmitDocumentsButton type="submit" />
    </div>
  </form>
</template>
