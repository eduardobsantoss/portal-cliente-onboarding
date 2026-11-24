<script setup lang="ts">
/** Card branco que flutua sobre foto (guidelines §3 `FloatingCard`): código SMS, QR code, CTA de boas-vindas. */
withDefaults(
  defineProps<{
    as?: string;
  }>(),
  { as: 'div' },
);
</script>

<template>
  <component
    :is="as"
    class="flex flex-col gap-[var(--space-5)] rounded-[var(--radius-xl)] bg-[var(--surface-card)] p-[var(--space-8)] text-[color:var(--text-strong)] shadow-[var(--shadow-float)] max-sm:p-[var(--space-6)]"
  >
    <slot />
  </component>
</template>
