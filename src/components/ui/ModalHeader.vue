<script setup lang="ts">
defineProps<{
  title: string;
}>();

const emit = defineEmits<{ close: [] }>();

/*
 * Slots: icon (ícone ao lado do título).
 * Dentro do theme-client (`tc:`): título de 24px/800 e botão de fechar circular de 44px (`TcIconButton outline`),
 * sem faixa colorida no cabeçalho.
 */
const TC_BAR = 'tc:border-[color:var(--border-subtle)] tc:pb-[var(--space-5)]';
const TC_TITLE =
  'tc:text-[length:var(--text-lg)] tc:font-[number:var(--weight-black)] tc:leading-[var(--leading-heading)] tc:tracking-[var(--tracking-tight)] tc:text-[color:var(--text-strong)]';
const TC_CLOSE =
  'tc:inline-flex tc:size-[var(--control-arrow)] tc:shrink-0 tc:cursor-pointer tc:items-center tc:justify-center tc:rounded-[var(--radius-full)] tc:border-[1.5px] tc:border-[color:var(--border-strong)] tc:text-[length:var(--text-md)] tc:font-[number:var(--weight-regular)] tc:text-[color:var(--text-strong)] tc:transition-colors tc:hover:bg-[var(--surface-soft)] tc:hover:text-[color:var(--text-strong)] tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]';
</script>

<template>
  <div :class="['flex items-center justify-between border-b border-slate-100 pb-4', TC_BAR]">
    <div class="flex items-center gap-2.5">
      <slot name="icon" />
      <h3 :class="['text-base font-bold text-slate-900', TC_TITLE]">{{ title }}</h3>
    </div>
    <button
      type="button"
      aria-label="Fechar"
      :class="['text-slate-400 hover:text-slate-600 font-bold text-sm', TC_CLOSE]"
      @click="emit('close')"
    >
      <span aria-hidden="true">✕</span>
    </button>
  </div>
</template>
