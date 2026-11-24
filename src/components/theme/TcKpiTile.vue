<script setup lang="ts">
/** Indicador numérico em card suave (guidelines §7.3). Use em grades de 2 a 4 com gap de 20px. */
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-[var(--space-2)] rounded-[var(--radius-xl)] bg-[var(--surface-soft)] p-[var(--space-7)] text-[color:var(--text-strong)]"
  >
    <p class="m-0 text-[length:var(--text-xs)] font-[number:var(--weight-medium)] text-[color:var(--text-muted)]">
      {{ label }}
    </p>
    <p
      class="m-0 text-[length:var(--text-2xl)] font-[number:var(--weight-bold)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)] tabular-nums"
    >
      {{ value }}
    </p>
    <p v-if="$slots.foot" class="m-0 text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
      <slot name="foot" />
    </p>
  </div>
</template>
