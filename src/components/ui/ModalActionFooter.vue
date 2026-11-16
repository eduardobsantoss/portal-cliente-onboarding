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

const footerClass = computed(() => props.className ?? DEFAULT_FOOTER_CLASS);

/** Rodapé "Cancelar" + ação principal dos modais centralizados do portal. */
</script>

<template>
  <div :class="footerClass">
    <button :class="CANCEL_BUTTON_CLASS" @click="emit('cancel')">
      {{ cancelLabel }}
    </button>
    <button :disabled="confirmDisabled" :class="confirmClassName" @click="emit('confirm')">
      {{ confirmLabel }}
    </button>
  </div>
</template>
