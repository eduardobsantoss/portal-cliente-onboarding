<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    src: string;
    position?: string;
    minHeight?: string;
    topScrim?: boolean;
    /** Substitui o scrim padrão (valor de `background-image`), ex.: um véu mais fechado. */
    scrim?: string;
  }>(),
  { position: 'center', topScrim: false },
);

// A foto fica numa camada própria (maior que a seção) para poder se mover e dar zoom sem deixar
// folgas; o scrim fica numa camada fixa por cima dela, para o contraste não "andar" com a foto.
const photoStyle = computed(() => ({
  backgroundImage: `url("${props.src.replace(/"/g, '%22')}")`,
  backgroundPosition: props.position,
}));

const scrimStyle = computed(() => ({
  backgroundImage:
    props.scrim ??
    (props.topScrim ? 'var(--scrim-photo-top), var(--scrim-photo)' : 'var(--scrim-photo)'),
}));

const sectionStyle = computed(() =>
  props.minHeight ? { minHeight: props.minHeight } : undefined,
);
</script>

<template>
  <section
    data-photo-section
    class="relative isolate overflow-hidden rounded-[var(--radius-xl)] text-[color:var(--text-on-brand)]"
    :style="sectionStyle"
  >
    <div
      data-photo-parallax
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 -top-[12%] -z-20 h-[124%] will-change-transform"
    >
      <div
        data-photo-zoom
        class="size-full bg-cover bg-no-repeat"
        :style="photoStyle"
      />
    </div>
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10 bg-cover"
      :style="scrimStyle"
    />
    <slot />
  </section>
</template>
