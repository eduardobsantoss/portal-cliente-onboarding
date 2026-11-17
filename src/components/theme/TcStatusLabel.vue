<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'default' | 'onDark';
  }>(),
  { tone: 'default' },
);
</script>

<template>
  <span
    class="block text-[length:var(--text-eyebrow)] font-[number:var(--weight-bold)] uppercase tracking-[var(--tracking-label)]"
    :class="
      tone === 'onDark'
        ? 'text-[color:var(--text-on-brand-muted)]'
        : 'text-[color:var(--text-muted)]'
    "
  >
    <slot />
  </span>
</template>
