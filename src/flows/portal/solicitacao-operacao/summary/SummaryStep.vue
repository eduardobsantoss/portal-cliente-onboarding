<script setup lang="ts">
import { MOCK_OPERATION_SUMMARY, MOCK_REJECTED_TITLES } from '@/mocks/operationRequest';
import type { OperationValueAttends } from '@/types/operationRequest';
import OperationTimeline from '@/flows/portal/solicitacao-operacao/OperationTimeline.vue';
import SummaryAgreementNotice from './SummaryAgreementNotice.vue';
import SummaryFiguresCard from './SummaryFiguresCard.vue';
import ValueAttendsPanel from './ValueAttendsPanel.vue';

defineProps<{
  valueAttends: OperationValueAttends;
}>();

const emit = defineEmits<{
  setValueAttends: [value: OperationValueAttends];
  agree: [];
  recusar: [];
  uploadMore: [];
}>();
</script>

<template>
  <OperationTimeline step="SUMMARY" />
  <div class="text-center">
    <h2 class="text-3xl font-black text-gci tracking-tight uppercase">Resumo da Operação</h2>
  </div>

  <div class="max-w-2xl mx-auto w-full space-y-6">
    <SummaryFiguresCard :summary="MOCK_OPERATION_SUMMARY" :rejected-titles="MOCK_REJECTED_TITLES" />

    <SummaryAgreementNotice />

    <ValueAttendsPanel
      :value-attends="valueAttends"
      @set-value-attends="emit('setValueAttends', $event)"
      @agree="emit('agree')"
      @recusar="emit('recusar')"
      @upload-more="emit('uploadMore')"
    />
  </div>
</template>
