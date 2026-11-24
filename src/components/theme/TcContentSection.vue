<script setup lang="ts">
/**
 * Seção branca de conteúdo (guidelines §7.1): coluna de rótulo estreita + coluna de conteúdo larga.
 * Abaixo de 1024px vira uma coluna só.
 */
</script>

<template>
  <section
    class="flex flex-col gap-[var(--space-14)] bg-[var(--surface-page)] px-[var(--section-pad-x)] py-[var(--section-pad-y)] max-sm:px-[var(--space-5)] lg:flex-row"
  >
    <div
      v-if="$slots.label"
      class="flex min-w-0 flex-col gap-[var(--space-3)] text-[length:var(--text-sm)] text-[color:var(--text-muted)] lg:sticky lg:top-[var(--space-6)] lg:flex-[1_1_280px] lg:self-start"
    >
      <slot name="label" />
    </div>
    <div class="min-w-0 lg:max-w-[880px] lg:flex-[2.3_1_560px]">
      <slot />
    </div>
  </section>
</template>
