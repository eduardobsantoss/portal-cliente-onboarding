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
    class="inline-flex items-center gap-[var(--space-3)] text-[length:var(--text-eyebrow)] font-[number:var(--weight-bold)] uppercase tracking-[var(--tracking-eyebrow)]"
    :class="
      tone === 'onDark'
        ? 'text-[color:var(--text-on-brand)]'
        : 'text-[color:var(--text-strong)]'
    "
  >
    <span
      class="block h-[2px] w-[22px] shrink-0 bg-[var(--accent)]"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>
