<script setup lang="ts">
import { useId } from 'vue';

/**
 * Bloco de campos sobre superfície suave (guidelines §7.3). Os filhos que precisam ocupar a linha toda
 * usam `class="col-span-full"`. Abaixo de 640px a grade vira uma coluna.
 */
withDefaults(
  defineProps<{
    title: string;
    description?: string;
    columns?: 1 | 2;
  }>(),
  { columns: 2 },
);

const titleId = useId();
</script>

<template>
  <section
    :aria-labelledby="titleId"
    class="flex flex-col gap-[var(--space-5)] rounded-[var(--radius-xl)] bg-[var(--surface-soft)] p-[var(--space-8)] max-sm:p-[var(--space-6)]"
  >
    <div class="flex flex-col gap-[var(--space-1)]">
      <h3
        :id="titleId"
        class="m-0 text-[length:var(--space-5)] font-[number:var(--weight-bold)] leading-[var(--leading-snug)] text-[color:var(--text-strong)]"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="m-0 text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
      >
        {{ description }}
      </p>
    </div>

    <div
      class="grid grid-cols-1 gap-x-[var(--space-4)] gap-y-[var(--space-5)]"
      :class="columns === 2 ? 'sm:grid-cols-2' : ''"
    >
      <slot />
    </div>
  </section>
</template>
