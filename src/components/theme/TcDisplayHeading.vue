<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    as?: 'h1' | 'h2';
    size?: 'display' | '4xl' | '3xl';
    tone?: 'default' | 'onDark';
  }>(),
  { as: 'h2', size: 'display', tone: 'default' },
);

const sizeClass = computed(
  () =>
    ({
      display: 'text-[length:var(--text-display-fluid)]',
      '4xl': 'text-[length:var(--text-4xl-fluid)]',
      '3xl': 'text-[length:var(--text-3xl-fluid)]',
    })[props.size],
);

const toneClass = computed(() =>
  props.tone === 'onDark'
    ? 'text-[color:var(--text-on-brand)]'
    : 'text-[color:var(--text-strong)]',
);

const secondToneClass = computed(() =>
  props.tone === 'onDark'
    ? 'text-[color:var(--text-on-brand-muted)]'
    : 'text-[color:var(--text-muted)]',
);
</script>

<template>
  <component
    :is="as"
    class="m-0 font-[number:var(--weight-black)] tracking-[var(--tracking-display)] leading-[var(--leading-display)]"
    :class="[sizeClass, toneClass]"
  >
    <slot />
    <span
      v-if="$slots.second"
      class="block font-[number:var(--weight-light)]"
      :class="secondToneClass"
    >
      <slot name="second" />
    </span>
  </component>
</template>
