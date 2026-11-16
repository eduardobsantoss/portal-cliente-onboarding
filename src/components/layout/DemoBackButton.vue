<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';

defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{ back: [] }>();

/** Atalho de apresentação: desfaz a última troca de tela sem recarregar a página. */
</script>

<template>
  <button
    v-if="visible"
    type="button"
    class="fixed bottom-4 left-4 z-[60] inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-500 shadow-md backdrop-blur-sm hover:border-slate-300 hover:text-gci"
    @click="emit('back')"
  >
    <ArrowLeft :size="14" />
    Voltar (demo)
  </button>
</template>
