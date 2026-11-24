<script setup lang="ts">
import { computed } from 'vue';

/** Barra de progresso (guidelines §7.3). `onDark` para uso sobre foto ou seção azul. */
const props = defineProps<{
  /** 0 a 100. */
  value: number;
  label: string;
  /** Texto do valor à direita, ex.: "3 de 5 enviados". Sem ele, mostra a porcentagem. */
  valueLabel?: string;
  onDark?: boolean;
}>();

const clamped = computed(() => Math.min(100, Math.max(0, props.value)));
const fillStyle = computed(() => ({ width: `${clamped.value}%` }));
</script>

<template>
  <div class="flex flex-col gap-[var(--space-2)]">
    <div
      class="flex items-baseline justify-between gap-[var(--space-3)] text-[length:var(--text-xs)]"
      :class="props.onDark ? 'text-[color:var(--text-on-brand)]' : 'text-[color:var(--text-strong)]'"
    >
      <span class="font-[number:var(--weight-semibold)]">{{ props.label }}</span>
      <span class="tabular-nums">{{ props.valueLabel ?? `${Math.round(clamped)}%` }}</span>
    </div>

    <div
      role="progressbar"
      :aria-label="props.label"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="Math.round(clamped)"
      class="h-[calc(var(--space-1)+var(--space-1)/2)] overflow-hidden rounded-[var(--radius-full)]"
      :class="
        props.onDark ? 'bg-[color-mix(in_srgb,var(--white)_28%,transparent)]' : 'bg-[var(--gci-subtle)]'
      "
    >
      <div
        class="h-full rounded-[var(--radius-full)] transition-[width] duration-[var(--duration-base)] ease-[var(--ease-standard)] motion-reduce:transition-none"
        :class="props.onDark ? 'bg-[var(--white)]' : 'bg-[var(--surface-brand)]'"
        :style="fillStyle"
      />
    </div>
  </div>
</template>
