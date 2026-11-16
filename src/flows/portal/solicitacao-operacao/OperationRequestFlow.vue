<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import type { OperationCompletionData } from '@/types/operationRequest';
import OperationContextPanel from './OperationContextPanel.vue';
import OperationFlowHeader from './OperationFlowHeader.vue';
import OperationFooterNav from './OperationFooterNav.vue';
import OperationStepContent from './OperationStepContent.vue';
import StepFrame from './StepFrame.vue';
import { useOperationRequestFlow } from './useOperationRequestFlow';

defineProps<{
  serviceName: string;
}>();

const emit = defineEmits<{
  close: [];
  complete: [operationData: OperationCompletionData];
}>();

const flow = useOperationRequestFlow({ onClose: () => emit('close') });
const step = flow.step;
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col lg:flex-row h-[100dvh]">
    <!-- Left Context Side -->
    <OperationContextPanel :step="step" />

    <!-- Right Interaction Side -->
    <div class="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
      <OperationFlowHeader @close="emit('close')" />

      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="max-w-2xl mx-auto px-6 py-12 md:py-20 lg:py-24">
          <AnimatePresence mode="wait">
            <StepFrame :step="step">
              <OperationStepContent :flow="flow" @complete="emit('complete', $event)" />
            </StepFrame>
          </AnimatePresence>
        </div>
      </div>

      <!-- Footer Navigation -->
      <OperationFooterNav
        v-if="step !== 'COMPLETED' && step !== 'SUMMARY' && step !== 'FINAL_REVIEW'"
        :step="step"
        :can-continue="flow.canContinue()"
        @prev="flow.prevStep"
        @next="flow.nextStep"
        @recusar="flow.handleRecusar"
      />
    </div>
  </div>
</template>
