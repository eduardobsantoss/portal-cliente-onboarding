<script setup lang="ts">
const emit = defineEmits<{ click: [] }>();

/** Atalho discreto de demonstração: preenche o formulário com os dados de exemplo. */
</script>

<template>
  <div class="flex justify-end">
    <button
      type="button"
      class="text-[10px] font-medium text-slate-300 hover:text-slate-500 transition-colors px-1 py-0.5"
      @click="emit('click')"
    >
      Preencher com dados de exemplo
    </button>
  </div>
</template>
