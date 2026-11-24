<script setup lang="ts">
/**
 * Etiqueta de status em tabelas, cards e linhas de documento (guidelines §7.3).
 * Sempre com texto (nunca só cor). Ícone opcional de 14px no slot `icon`.
 */
type Tone = 'neutral' | 'success' | 'warning' | 'danger';

const props = defineProps<{
  tone: Tone;
}>();

const toneClass: Record<Tone, string> = {
  neutral: 'bg-[var(--surface-soft)] text-[color:var(--text-strong)]',
  success: 'bg-[var(--success-light)] text-[color:var(--success-dark)]',
  warning: 'bg-[var(--warning-light)] text-[color:var(--warning-dark)]',
  danger: 'bg-[var(--danger-light)] text-[color:var(--danger-dark)]',
};
</script>

<template>
  <span
    class="inline-flex h-[var(--space-7)] items-center gap-[var(--space-1)] whitespace-nowrap rounded-[var(--radius-full)] px-[var(--space-3)] text-[length:var(--text-eyebrow)] font-[number:var(--weight-semibold)]"
    :class="toneClass[props.tone]"
  >
    <span
      v-if="$slots.icon"
      class="inline-flex shrink-0 items-center [&_svg]:size-[var(--text-sm)]"
      aria-hidden="true"
    >
      <slot name="icon" />
    </span>
    <slot />
  </span>
</template>
