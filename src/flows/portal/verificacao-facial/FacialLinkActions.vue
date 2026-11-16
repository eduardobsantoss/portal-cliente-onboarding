<script setup lang="ts">
import { Copy, Check, Send } from 'lucide-vue-next';

defineProps<{
  copied: boolean;
  smsSent: boolean;
}>();

const emit = defineEmits<{
  copyLink: [];
  sendSms: [];
}>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      type="button"
      class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
      @click="emit('copyLink')"
    >
      <Check v-if="copied" :size="14" class="text-emerald-600" />
      <Copy v-else :size="14" class="text-slate-400" />
      {{ copied ? 'Link copiado!' : 'Copiar link para celular' }}
    </button>

    <button
      type="button"
      class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
      @click="emit('sendSms')"
    >
      <Check v-if="smsSent" :size="14" class="text-emerald-600" />
      <Send v-else :size="14" class="text-slate-400" />
      {{ smsSent ? 'SMS enviado!' : 'Enviar link por SMS' }}
    </button>
  </div>
</template>
