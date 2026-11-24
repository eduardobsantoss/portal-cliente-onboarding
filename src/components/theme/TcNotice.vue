<script setup lang="ts">
import type { Component } from 'vue';

/**
 * Aviso em faixa suave (guidelines §7.3). Substitui os banners esmeralda/âmbar/rosa:
 * só o círculo do ícone muda de cor; o texto é sempre `--text-strong`.
 */
type Tone = 'info' | 'success' | 'warning' | 'danger';

const props = defineProps<{
  tone: Tone;
  title?: string;
  /** Componente de ícone (lucide). */
  icon: Component;
}>();

const circleClass: Record<Tone, string> = {
  info: 'bg-[var(--surface-brand)] text-[color:var(--text-on-brand)]',
  success: 'bg-[var(--success-light)] text-[color:var(--success-dark)]',
  warning: 'bg-[var(--warning-light)] text-[color:var(--warning-dark)]',
  danger: 'bg-[var(--danger-light)] text-[color:var(--danger-dark)]',
};
</script>

<template>
  <div
    :role="props.tone === 'danger' ? 'alert' : undefined"
    class="flex flex-wrap items-center gap-[var(--space-5)] rounded-[var(--radius-xl)] bg-[var(--surface-soft)] px-[var(--space-7)] py-[var(--space-6)] text-[color:var(--text-strong)]"
  >
    <span
      class="inline-flex size-[var(--space-12)] shrink-0 items-center justify-center rounded-[var(--radius-full)]"
      :class="circleClass[props.tone]"
      aria-hidden="true"
    >
      <component :is="props.icon" class="size-[var(--space-6)]" aria-hidden="true" />
    </span>

    <div class="flex min-w-0 flex-[1_1_240px] flex-col gap-[var(--space-1)]">
      <p
        v-if="props.title"
        class="m-0 text-[length:var(--text-md)] font-[number:var(--weight-bold)] leading-[var(--leading-snug)]"
      >
        {{ props.title }}
      </p>
      <div class="text-[length:var(--text-sm)] leading-[var(--leading-body)]">
        <slot />
      </div>
    </div>

    <div v-if="$slots.action" class="shrink-0">
      <slot name="action" />
    </div>
  </div>
</template>
