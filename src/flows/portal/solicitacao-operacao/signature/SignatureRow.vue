<script setup lang="ts">
import { Check, Clock } from 'lucide-vue-next';
import type { OperationSignature } from '@/types/operationRequest';
import { cn } from '@/utils/cn';

defineProps<{
  sig: OperationSignature;
}>();

const emit = defineEmits<{
  sign: [];
}>();
</script>

<template>
  <div class="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl group hover:border-agro-orange transition-all">
    <div class="flex items-center gap-4">
      <div
        :class="cn(
          'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
          sig.status === 'Assinado' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-agro-orange'
        )"
      >
        <Check v-if="sig.status === 'Assinado'" :size="20" :stroke-width="3" />
        <Clock v-else :size="20" />
      </div>
      <div class="text-left">
        <p class="text-sm font-black text-gci">{{ sig.name }}</p>
        <p class="text-[10px] font-bold text-slate-400">{{ sig.role }}</p>
      </div>
    </div>

    <button
      v-if="sig.status === 'Pendente' && sig.id === 1"
      class="bg-orange-100 text-agro-orange px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-agro-orange hover:text-white transition-all shadow-sm"
      @click="emit('sign')"
    >
      Assinatura Pendente
    </button>
    <span
      v-else
      :class="cn(
        'text-[10px] font-black uppercase tracking-widest',
        sig.status === 'Assinado' ? 'text-green-600' : 'text-slate-300'
      )"
    >{{ sig.status }}</span>
  </div>
</template>
