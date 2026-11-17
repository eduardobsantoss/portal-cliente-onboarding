<template>
  <section
    class="grid grid-cols-1 gap-[var(--space-14)] bg-[var(--surface-page)] px-[var(--section-pad-x)] py-[var(--section-pad-y)] lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]"
  >
    <div v-if="$slots.aside">
      <slot name="aside" />
    </div>
    <div class="min-w-0">
      <slot />
    </div>
  </section>
</template>
