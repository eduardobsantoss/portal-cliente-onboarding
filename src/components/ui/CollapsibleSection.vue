<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

defineProps<{
  isOpen: boolean;
  buttonClassName: string;
}>();

const emit = defineEmits<{ toggle: [] }>();

/*
 * Slots: header (conteúdo do botão) e o slot padrão (conteúdo exibido quando aberto).
 * Dentro do theme-client (`tc:`) segue o `TcAccordion`: superfície suave, cabeçalho de 80px e a seta
 * dentro de um círculo de 40px.
 */
const TC_WRAPPER = 'tc:rounded-[var(--radius-xl)] tc:border-0 tc:bg-[var(--surface-soft)]';
const TC_BUTTON =
  'tc:min-h-[calc(var(--space-16)+var(--space-4))] tc:gap-[var(--space-4)] tc:rounded-[var(--radius-xl)] tc:bg-transparent tc:px-[var(--space-7)] tc:py-[var(--space-3)] tc:text-[length:var(--text-md)] tc:font-[number:var(--weight-bold)] tc:text-[color:var(--text-strong)] tc:hover:bg-transparent tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]';
const TC_CHEVRON =
  'tc:size-[var(--space-10)] tc:shrink-0 tc:items-center tc:justify-center tc:rounded-[var(--radius-full)] tc:border-[1.5px] tc:border-[color:var(--border-strong)] tc:text-[color:var(--text-strong)]';
</script>

<template>
  <div :class="['border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50', TC_WRAPPER]">
    <button
      type="button"
      :class="[buttonClassName, TC_BUTTON]"
      :aria-expanded="isOpen"
      @click="emit('toggle')"
    >
      <slot name="header" />
      <span :class="['inline-flex', TC_CHEVRON]" aria-hidden="true">
        <ChevronUp v-if="isOpen" :size="16" class="text-slate-500 tc:text-[color:var(--text-strong)]" />
        <ChevronDown v-else :size="16" class="text-slate-500 tc:text-[color:var(--text-strong)]" />
      </span>
    </button>

    <div v-if="isOpen" class="tc:px-[var(--space-7)] tc:pb-[var(--space-7)]">
      <slot />
    </div>
  </div>
</template>
