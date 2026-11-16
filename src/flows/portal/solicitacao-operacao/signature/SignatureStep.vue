<script setup lang="ts">
import type { OperationSignature } from '@/types/operationRequest';
import OperationTimeline from '@/flows/portal/solicitacao-operacao/OperationTimeline.vue';
import SignatureCompleted from './SignatureCompleted.vue';
import SignaturePending from './SignaturePending.vue';

defineProps<{
  isSigned: boolean;
  signatures: OperationSignature[];
}>();

const emit = defineEmits<{
  signFirst: [];
  continue: [];
}>();
</script>

<template>
  <OperationTimeline step="SIGNATURE" />
  <div class="text-center space-y-3">
    <h2 class="text-3xl font-black text-gci tracking-tight">Assinatura Digital</h2>
    <p class="text-slate-500 text-lg font-medium">Finalize o seu desconto de duplicata assinando o termo de cessão.</p>
  </div>

  <div class="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/50">
    <SignaturePending
      v-if="!isSigned"
      :signatures="signatures"
      @sign-first="emit('signFirst')"
      @continue="emit('continue')"
    />
    <SignatureCompleted v-else />
  </div>
</template>
