<script setup lang="ts">
defineProps<{
  submitLabel: string;
}>();

const emit = defineEmits<{ cancel: [] }>();

// Dentro do theme-client (`tc:`) segue o `TcActionBar`: secundário à esquerda, primário à direita,
// 1px `--border-subtle` no topo.
const TC_BAR =
  'tc:justify-between tc:gap-[var(--space-4)] tc:border-[color:var(--border-subtle)] tc:pt-[var(--space-8)]';
const TC_CANCEL =
  'tc:h-[var(--control-secondary)] tc:rounded-[var(--radius-full)] tc:border-[1.5px] tc:border-[color:var(--action-secondary-border)] tc:bg-transparent tc:px-[26px] tc:py-0 tc:text-[length:var(--text-sm)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--action-secondary-text)] tc:hover:bg-[var(--surface-soft)] tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]';
const TC_SUBMIT =
  'tc:h-[var(--control-primary)] tc:rounded-[var(--radius-full)] tc:bg-[var(--action-primary-bg)] tc:px-[26px] tc:py-0 tc:text-[length:var(--text-base)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--action-primary-text)] tc:shadow-none tc:hover:bg-[var(--action-primary-bg-hover)] tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]';
</script>

<template>
  <div :class="['pt-4 border-t border-slate-100 flex items-center justify-end gap-3', TC_BAR]">
    <button
      type="button"
      :class="['px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors', TC_CANCEL]"
      @click="emit('cancel')"
    >
      Cancelar
    </button>
    <button
      type="submit"
      :class="['px-6 py-2.5 rounded-xl bg-gci hover:bg-gci-hover text-white font-bold text-xs transition-colors shadow-sm', TC_SUBMIT]"
    >
      {{ submitLabel }}
    </button>
  </div>
</template>
