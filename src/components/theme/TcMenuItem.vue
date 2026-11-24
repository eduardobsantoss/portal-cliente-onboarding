<script setup lang="ts">
import type { Component } from 'vue';
import { Check } from 'lucide-vue-next';

/** Item do `TcMenu`. Fora do tab (o foco é movido pelas setas); `menuitemradio` mostra o marcador `checked`. */
withDefaults(
  defineProps<{
    as?: 'button' | 'a';
    href?: string;
    icon?: Component;
    role?: 'menuitem' | 'menuitemradio';
    checked?: boolean;
  }>(),
  { as: 'button', role: 'menuitem', checked: false },
);
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : undefined"
    :href="as === 'a' ? href : undefined"
    :role="role"
    :aria-checked="role === 'menuitemradio' ? checked : undefined"
    tabindex="-1"
    class="flex h-[var(--control-arrow)] w-full cursor-pointer items-center gap-[var(--space-3)] rounded-[var(--radius-md)] border-0 bg-transparent px-[var(--space-4)] text-left text-[length:var(--text-sm)] font-[number:var(--weight-semibold)] text-[color:var(--text-strong)] no-underline transition-colors duration-[var(--duration-fast)] hover:bg-[var(--surface-soft)] focus-visible:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
  >
    <component :is="icon" v-if="icon" class="size-[var(--space-5)] shrink-0" aria-hidden="true" />
    <span class="min-w-0 flex-1 truncate"><slot /></span>
    <Check
      v-if="role === 'menuitemradio' && checked"
      class="size-[var(--space-5)] shrink-0"
      aria-hidden="true"
    />
  </component>
</template>
