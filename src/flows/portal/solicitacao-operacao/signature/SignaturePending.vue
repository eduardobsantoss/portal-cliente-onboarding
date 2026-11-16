<script setup lang="ts">
import { computed } from 'vue';
import type { OperationSignature } from '@/types/operationRequest';
import SignatureDocumentCard from './SignatureDocumentCard.vue';
import SignatureRow from './SignatureRow.vue';
import SignaturesCollected from './SignaturesCollected.vue';
import SignaturesWaiting from './SignaturesWaiting.vue';

const props = defineProps<{
  signatures: OperationSignature[];
}>();

const emit = defineEmits<{
  signFirst: [];
  continue: [];
}>();

const signedCount = computed(() => props.signatures.filter(s => s.status === 'Assinado').length);
const allSigned = computed(() => props.signatures.every(s => s.status === 'Assinado'));
</script>

<template>
  <div class="space-y-8">
    <SignatureDocumentCard />

    <div class="space-y-4">
      <div class="flex items-center justify-between mb-2">
        <h5 class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assinaturas do Cliente</h5>
        <span class="text-[10px] font-black text-agro-orange uppercase tracking-widest">{{ signedCount }} de {{ signatures.length }}</span>
      </div>

      <div class="space-y-3">
        <SignatureRow v-for="sig in signatures" :key="sig.id" :sig="sig" @sign="emit('signFirst')" />

        <!-- Simulating "Assinando..." state change button -->
        <SignaturesCollected v-if="allSigned" @continue="emit('continue')" />
        <SignaturesWaiting v-else />
      </div>
    </div>
  </div>
</template>
