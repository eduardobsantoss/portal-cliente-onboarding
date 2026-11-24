<script setup lang="ts">
/** Estado vazio no estilo "Contratos Fiduciários" da V3.1 (guidelines §7.3): tracejado, sem ilustração. */
defineProps<{
  title: string;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center gap-[var(--space-3)] rounded-[var(--radius-xl)] border-[1.5px] border-dashed border-[color:var(--border-dashed)] p-[var(--space-12)] text-center max-sm:p-[var(--space-6)]"
  >
    <p
      class="m-0 text-[length:var(--text-lg)] font-[number:var(--weight-light)] leading-[var(--leading-snug)] text-[color:var(--text-muted)]"
    >
      {{ title }}
    </p>
    <div
      v-if="$slots.default"
      class="max-w-[48ch] text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
    >
      <slot />
    </div>
    <div v-if="$slots.action" class="mt-[var(--space-2)]">
      <slot name="action" />
    </div>
  </div>
</template>
