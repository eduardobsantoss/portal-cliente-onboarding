<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

defineProps<{
  label: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    type="submit"
    :disabled="disabled"
    class="px-6 py-3 bg-gci hover:bg-gci-hover text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-gci/10 flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
  >
    {{ label }}
    <ArrowRight :size="16" />
  </button>
</template>
