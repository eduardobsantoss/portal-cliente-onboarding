<script setup lang="ts">
defineProps<{
  isDone: boolean;
}>();

/** Selo de contagem ("X de Y enviados" / "X de Y partes validadas") do cabeçalho de um tópico. */
</script>

<template>
  <span
    :class="`text-[11px] font-bold px-2.5 py-1 rounded-full ${
      isDone ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-100'
    }`"
  >
    <slot />
  </span>
</template>
