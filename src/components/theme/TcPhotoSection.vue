<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    src: string;
    position?: string;
    minHeight?: string;
    topScrim?: boolean;
  }>(),
  { position: 'center', topScrim: false },
);

const photoStyle = computed(() => {
  const url = `url("${props.src.replace(/"/g, '%22')}")`;
  const layers = props.topScrim
    ? ['var(--scrim-photo-top)', 'var(--scrim-photo)', url]
    : ['var(--scrim-photo)', url];
  return {
    backgroundImage: layers.join(', '),
    backgroundPosition: props.position,
    ...(props.minHeight ? { minHeight: props.minHeight } : {}),
  };
});
</script>

<template>
  <section
    class="relative overflow-hidden rounded-[var(--radius-xl)] bg-cover bg-no-repeat text-[color:var(--text-on-brand)]"
    :style="photoStyle"
  >
    <slot />
  </section>
</template>
