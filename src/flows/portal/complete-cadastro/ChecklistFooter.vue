<script setup lang="ts">
defineProps<{
  isBulkUploading: boolean;
}>();

const emit = defineEmits<{
  fillAll: [];
  reset: [];
}>();

/** Rodapé discreto com os controles de simulação (preencher todos / restaurar estado inicial). */
</script>

<template>
  <div class="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
    <span class="text-[11px]">Ambiente seguro e criptografado GCI</span>
    <div class="flex items-center gap-3">
      <button
        :disabled="isBulkUploading"
        class="text-slate-500 hover:text-gci font-semibold underline text-xs transition-colors disabled:opacity-50"
        @click="emit('fillAll')"
      >
        {{ isBulkUploading ? 'Preenchendo...' : 'Preencher todos os documentos (Simulação)' }}
      </button>
      <span>•</span>
      <button class="text-slate-400 hover:text-red-500 transition-colors" @click="emit('reset')">
        Restaurar estado inicial
      </button>
    </div>
  </div>
</template>
