<script setup lang="ts">
import { computed } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps<{
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  closeButtonClassName?: string;
}>();

const emit = defineEmits<{ close: [] }>();

/*
 * Slots: title e subtitle (conteúdo do cabeçalho).
 */

const DEFAULT_BAR_CLASS = 'p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10';
const DEFAULT_TITLE_CLASS = 'text-2xl font-black text-gci tracking-tight';
const DEFAULT_SUBTITLE_CLASS = 'text-sm text-slate-500 font-medium mt-1';
const DEFAULT_CLOSE_CLASS =
  'w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-gci hover:bg-slate-100 transition-colors';

const barClass = computed(() => props.className ?? DEFAULT_BAR_CLASS);
const titleClass = computed(() => props.titleClassName ?? DEFAULT_TITLE_CLASS);
const subtitleClass = computed(() => props.subtitleClassName ?? DEFAULT_SUBTITLE_CLASS);
const closeClass = computed(() => props.closeButtonClassName ?? DEFAULT_CLOSE_CLASS);

/** Cabeçalho (título, subtítulo e botão fechar) dos modais centralizados do portal. */
</script>

<template>
  <div :class="barClass">
    <div>
      <h2 :class="titleClass"><slot name="title" /></h2>
      <p :class="subtitleClass"><slot name="subtitle" /></p>
    </div>
    <button :class="closeClass" @click="emit('close')">
      <X :size="24" />
    </button>
  </div>
</template>
