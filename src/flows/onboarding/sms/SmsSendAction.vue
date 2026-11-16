<script setup lang="ts">
import { Send, RotateCw, CheckCircle2 } from 'lucide-vue-next';
import type { SmsStatus } from '@/types/sms';

defineProps<{
  status: SmsStatus;
}>();

const emit = defineEmits<{
  send: [];
}>();
</script>

<template>
  <div class="flex items-center gap-3 shrink-0">
    <button
      v-if="status === 'idle'"
      type="button"
      @click="emit('send')"
      class="w-full sm:w-auto px-5 py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/10 flex items-center justify-center gap-2 active:scale-95 shrink-0 whitespace-nowrap cursor-pointer"
    >
      <Send :size="14" />
      <span>Enviar código por SMS</span>
    </button>

    <button
      v-if="status === 'sending'"
      type="button"
      disabled
      class="w-full sm:w-auto px-5 py-2.5 bg-slate-200 text-slate-500 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed shrink-0 whitespace-nowrap"
    >
      <RotateCw :size="14" class="animate-spin" />
      <span>Enviando código...</span>
    </button>

    <span
      v-if="status === 'sent'"
      class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0 whitespace-nowrap"
    >
      <CheckCircle2 :size="15" class="text-emerald-600" />
      <span>Código enviado</span>
    </span>
  </div>
</template>
