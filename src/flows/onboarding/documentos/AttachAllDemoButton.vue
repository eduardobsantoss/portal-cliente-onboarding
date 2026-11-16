<script setup lang="ts">
const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <button
    type="button"
    class="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-500"
    title="Anexar todos os documentos pendentes (Demo)"
    @click="emit('click')"
  >
    Anexar Todos (Demo)
  </button>
</template>
