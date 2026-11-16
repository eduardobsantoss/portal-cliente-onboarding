<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

defineProps<{
  type: 'submit' | 'button';
}>();

const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <button
    :type="type"
    class="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-gci hover:bg-gci-hover text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-gci/10 flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
    @click="emit('click')"
  >
    <span>Avançar pro Envio de Documentos</span>
    <ArrowRight :size="17" />
  </button>
</template>
