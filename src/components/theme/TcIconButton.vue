<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';

/**
 * Botão circular só com ícone. `label` é obrigatório (vira o `aria-label`).
 * `outline` sobre branco; `glass` sobre foto; `solid` para o avatar sobre foto.
 */
type Variant = 'outline' | 'glass' | 'solid';

const props = withDefaults(
  defineProps<{
    label: string;
    icon: Component;
    variant?: Variant;
    size?: 40 | 44 | 48;
  }>(),
  { variant: 'outline', size: 44 },
);

// Classes completas e estáticas para o Tailwind conseguir detectá-las.
const variantClass = computed(
  () =>
    ({
      outline:
        'border-[1.5px] border-[color:var(--border-strong)] bg-transparent text-[color:var(--text-strong)] hover:bg-[var(--surface-soft)]',
      glass:
        'border border-[color:var(--glass-border)] bg-[var(--glass-bg)] text-[color:var(--text-on-brand)] hover:bg-[color-mix(in_srgb,var(--white)_28%,transparent)]',
      solid:
        'border-0 bg-[var(--surface-card)] text-[color:var(--text-strong)] hover:bg-[var(--surface-soft)]',
    })[props.variant],
);

const sizeClass = computed(
  () =>
    ({
      40: 'size-[var(--space-10)]',
      44: 'size-[var(--control-arrow)]',
      48: 'size-[var(--control-nav)]',
    })[props.size],
);
</script>

<template>
  <button
    type="button"
    :aria-label="props.label"
    class="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-full)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
    :class="[variantClass, sizeClass]"
  >
    <component :is="props.icon" class="size-[var(--space-5)]" aria-hidden="true" />
  </button>
</template>
