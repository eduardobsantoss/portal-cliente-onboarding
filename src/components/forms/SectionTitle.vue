<script setup lang="ts">
/*
 * Slots: icon (ícone antes do título) e o slot padrão (texto do título).
 */
</script>

<template>
  <div class="flex items-center gap-2 border-b border-slate-100 pb-2">
    <slot name="icon" />
    <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider"><slot /></h3>
  </div>
</template>
