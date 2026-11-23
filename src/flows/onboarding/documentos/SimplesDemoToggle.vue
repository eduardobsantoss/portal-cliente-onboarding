<script setup lang="ts">
defineProps<{ isSimples: boolean }>();
const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <button
    type="button"
    class="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-500"
    title="Alternar a empresa entre Simples Nacional (ME) e demais regimes (Demo)"
    @click="emit('toggle')"
  >
    {{ isSimples ? 'Simular empresa fora do Simples (Demo)' : 'Simular empresa ME / Simples (Demo)' }}
  </button>
</template>
