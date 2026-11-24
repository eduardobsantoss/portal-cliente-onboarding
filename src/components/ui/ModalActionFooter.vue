<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  cancelLabel: string;
  confirmLabel: string;
  confirmClassName: string;
  confirmDisabled?: boolean;
  className?: string;
}>();

const emit = defineEmits<{
  cancel: [];
  confirm: [];
}>();

const DEFAULT_FOOTER_CLASS = 'p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4';
const CANCEL_BUTTON_CLASS =
  'flex-1 bg-white border border-slate-200 text-slate-400 py-4 rounded-2xl font-bold text-sm hover:text-gci transition-all shadow-sm';

// Dentro do theme-client (`tc:`) o rodapé segue o `TcActionBar`: secundário à esquerda, primário à direita,
// com 1px `--border-subtle` no topo. O botão de confirmar sempre usa o primário do tema.
const TC_FOOTER =
  'tc:flex-wrap tc:justify-between tc:gap-[var(--space-4)] tc:border-[color:var(--border-subtle)] tc:bg-transparent tc:p-[var(--space-9)] tc:pt-[var(--space-8)]';
const TC_CANCEL =
  'tc:h-[var(--control-secondary)] tc:flex-none tc:cursor-pointer tc:rounded-[var(--radius-full)] tc:border-[1.5px] tc:border-[color:var(--action-secondary-border)] tc:bg-transparent tc:px-[26px] tc:py-0 tc:text-[length:var(--text-sm)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--action-secondary-text)] tc:shadow-none tc:hover:bg-[var(--surface-soft)] tc:hover:text-[color:var(--action-secondary-text)] tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]';
const TC_CONFIRM =
  'tc:ml-auto tc:h-[var(--control-primary)] tc:flex-none tc:cursor-pointer tc:rounded-[var(--radius-full)] tc:border-0 tc:bg-[var(--action-primary-bg)] tc:px-[26px] tc:py-0 tc:text-[length:var(--text-base)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--action-primary-text)] tc:shadow-none tc:hover:bg-[var(--action-primary-bg-hover)] tc:disabled:cursor-not-allowed tc:disabled:opacity-60 tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]';

const footerClass = computed(() => [props.className ?? DEFAULT_FOOTER_CLASS, TC_FOOTER]);

/** Rodapé "Cancelar" + ação principal dos modais centralizados do portal. */
</script>

<template>
  <div :class="footerClass">
    <button :class="[CANCEL_BUTTON_CLASS, TC_CANCEL]" @click="emit('cancel')">
      {{ cancelLabel }}
    </button>
    <button :disabled="confirmDisabled" :class="[confirmClassName, TC_CONFIRM]" @click="emit('confirm')">
      {{ confirmLabel }}
    </button>
  </div>
</template>
