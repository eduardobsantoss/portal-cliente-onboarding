<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import OperationRequestFlow from '@/flows/portal/solicitacao-operacao/OperationRequestFlow.vue';
import type { OperationCompletionData } from '@/types/operationRequest';

defineProps<{
  isOpen: boolean;
  serviceName: string;
}>();

const emit = defineEmits<{
  close: [];
  complete: [operationData: OperationCompletionData];
}>();
</script>

<template>
  <AnimatePresence>
    <OperationRequestFlow
      v-if="isOpen"
      key="operation-request-flow"
      :service-name="serviceName"
      @close="emit('close')"
      @complete="emit('complete', $event)"
    />
  </AnimatePresence>
</template>
