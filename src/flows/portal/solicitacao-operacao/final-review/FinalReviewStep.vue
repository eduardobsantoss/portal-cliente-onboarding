<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { MOCK_OPERATION_FINAL_REVIEW } from '@/mocks/operationRequest';
import OperationTimeline from '@/flows/portal/solicitacao-operacao/OperationTimeline.vue';
import FinalReviewConfirmation from './FinalReviewConfirmation.vue';
import FinalReviewFigures from './FinalReviewFigures.vue';

defineProps<{
  termsAccepted: boolean;
}>();

const emit = defineEmits<{
  termsAcceptedChange: [accepted: boolean];
  recusar: [];
  confirm: [];
}>();
</script>

<template>
  <OperationTimeline step="FINAL_REVIEW" />
  <div class="text-center space-y-4">
    <div class="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
      <Check :size="12" :stroke-width="3" />
      Processamento Concluído
    </div>
    <h2 class="text-3xl font-black text-gci uppercase tracking-tighter">Resumo Final da Operação</h2>
    <p class="text-slate-500 text-lg font-medium max-w-md mx-auto">Confira os valores finais antes de prosseguir para a assinatura digital.</p>
  </div>

  <FinalReviewFigures :review="MOCK_OPERATION_FINAL_REVIEW" />

  <FinalReviewConfirmation
    :terms-accepted="termsAccepted"
    @terms-accepted-change="emit('termsAcceptedChange', $event)"
    @recusar="emit('recusar')"
    @confirm="emit('confirm')"
  />
</template>
