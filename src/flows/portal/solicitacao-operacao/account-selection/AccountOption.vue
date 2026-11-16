<script setup lang="ts">
import { Banknote, Check } from 'lucide-vue-next';
import type { DisbursementAccount } from '@/types/operationRequest';

defineProps<{
  acc: DisbursementAccount;
  selectedAccount: string;
}>();

const emit = defineEmits<{
  select: [accountId: string];
}>();
</script>

<template>
  <button
    :class="`relative p-6 rounded-[24px] border-2 text-left transition-all group ${
      selectedAccount === acc.id
        ? 'border-gci bg-gci/5 shadow-xl shadow-gci/10'
        : 'border-slate-100 hover:border-slate-200 bg-white'
    }`"
    @click="emit('select', acc.id)"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div
          :class="`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            selectedAccount === acc.id ? 'bg-gci text-white' : 'bg-slate-50 text-slate-400'
          }`"
        >
          <Banknote :size="24" />
        </div>
        <div>
          <p class="font-black text-gci text-base">{{ acc.bank }}</p>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Ag {{ acc.branch }} • CC {{ acc.account }}</p>
        </div>
      </div>
      <div v-if="selectedAccount === acc.id" class="w-6 h-6 rounded-full bg-gci text-white flex items-center justify-center">
        <Check :size="14" :stroke-width="3" />
      </div>
    </div>
  </button>
</template>
