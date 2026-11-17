<template>
  <section
    class="grid grid-cols-[minmax(0,1fr)] gap-[var(--space-6)] bg-[var(--surface-page)] px-[var(--space-6)] py-[var(--space-12)] md:px-[var(--section-pad-x)] md:py-[var(--section-pad-y)] lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-[var(--space-14)]"
  >
    <div v-if="$slots.aside">
      <slot name="aside" />
    </div>
    <div class="min-w-0">
      <slot />
    </div>
  </section>
</template>
