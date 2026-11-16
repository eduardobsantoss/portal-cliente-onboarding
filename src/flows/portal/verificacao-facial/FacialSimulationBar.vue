<script setup lang="ts">
import { RefreshCw, Sparkles, Info } from 'lucide-vue-next';

defineProps<{
  isSimulating: boolean;
}>();

const emit = defineEmits<{ simulateScan: [] }>();
</script>

<template>
  <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
    <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
      <Info :size="13" />
      <span>Conclusão em tempo real após captura</span>
    </div>

    <button
      type="button"
      :disabled="isSimulating"
      class="px-4 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-95 disabled:opacity-50"
      @click="emit('simulateScan')"
    >
      <template v-if="isSimulating">
        <RefreshCw :size="13" class="animate-spin" />
        Processando biometria...
      </template>
      <template v-else>
        <Sparkles :size="13" class="text-agro-orange" />
        Simular Validação Facial
      </template>
    </button>
  </div>
</template>
