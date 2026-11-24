<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';

/**
 * Acordeão controlado (guidelines §7.3): quem usa guarda o estado e reage ao `toggle`.
 * `surface="white"` é para acordeões aninhados dentro de um acordeão suave.
 */
withDefaults(
  defineProps<{
    id: string;
    title: string;
    open: boolean;
    surface?: 'soft' | 'white';
  }>(),
  { surface: 'soft' },
);

const emit = defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <div
    class="rounded-[var(--radius-xl)]"
    :class="
      surface === 'soft'
        ? 'bg-[var(--surface-soft)]'
        : 'border border-[color:var(--border-subtle)] bg-[var(--surface-card)]'
    "
  >
    <h3 class="m-0">
      <button
        :id="`${id}-header`"
        type="button"
        :aria-expanded="open"
        :aria-controls="`${id}-body`"
        class="flex min-h-[calc(var(--space-16)+var(--space-4))] w-full cursor-pointer items-center gap-[var(--space-4)] rounded-[var(--radius-xl)] border-0 bg-transparent px-[var(--space-7)] py-[var(--space-3)] text-left focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        @click="emit('toggle')"
      >
        <span
          v-if="$slots.leading"
          class="inline-flex size-[var(--control-arrow)] shrink-0 items-center justify-center"
        >
          <slot name="leading" />
        </span>

        <span
          class="min-w-0 flex-1 text-[length:var(--text-md)] font-[number:var(--weight-bold)] leading-[var(--leading-snug)] text-[color:var(--text-strong)]"
        >
          {{ title }}
        </span>

        <span
          v-if="$slots.meta"
          class="shrink-0 text-[length:var(--text-xs)] text-[color:var(--text-muted)]"
        >
          <slot name="meta" />
        </span>

        <span
          class="inline-flex size-[var(--space-10)] shrink-0 items-center justify-center rounded-[var(--radius-full)] border-[1.5px] border-[color:var(--border-strong)] text-[color:var(--text-strong)]"
          aria-hidden="true"
        >
          <ChevronDown
            class="size-[var(--space-5)] transition-transform duration-[var(--duration-base)] motion-reduce:transition-none"
            :class="open ? 'rotate-180' : ''"
          />
        </span>
      </button>
    </h3>

    <!-- A altura anima pela grade (0fr → 1fr); fechado, o corpo fica `inert` para o Tab não entrar nele -->
    <div
      :id="`${id}-body`"
      role="region"
      :aria-labelledby="`${id}-header`"
      class="grid transition-[grid-template-rows] duration-[var(--duration-slow)] ease-[var(--ease-standard)] motion-reduce:transition-none"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      v-bind="open ? {} : { inert: true }"
    >
      <div class="min-h-0 overflow-hidden">
        <div class="px-[var(--space-7)] pb-[var(--space-7)]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
