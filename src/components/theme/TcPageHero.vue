<script setup lang="ts">
import { computed } from 'vue';
import Logo from '@/components/ui/Logo.vue';
import TcPhotoSection from '@/components/theme/TcPhotoSection.vue';

/**
 * Hero das telas do onboarding e do portal (guidelines §7.1).
 * `full`: cabeçalho + corpo (texto à esquerda, `aside` à direita) + rodapé, ocupando a viewport.
 * `compact`: cabeçalho + título/descrição + rodapé, com altura mínima menor.
 */
const props = withDefaults(
  defineProps<{
    variant: 'full' | 'compact';
    src: string;
    position?: string;
    /** Véu extra (valor de `background-image`); a faixa superior da navegação é mantida por baixo dele. */
    scrim?: string;
    minHeight?: string;
    /** Largura base do `aside` no variant `full` a partir de 1024px (padrão 440px). Ex.: `520px` na biometria. */
    asideBasis?: string;
  }>(),
  { position: 'center' },
);

const resolvedMinHeight = computed(
  () => props.minHeight ?? (props.variant === 'full' ? 'calc(100dvh - 2 * var(--page-gutter))' : '360px'),
);

// O `scrim` do TcPhotoSection substitui o véu padrão (inclusive o superior); aqui os dois são compostos.
const resolvedScrim = computed(() =>
  props.scrim ? `var(--scrim-photo-top), ${props.scrim}` : undefined,
);

const frameStyle = computed(() => ({ minHeight: resolvedMinHeight.value }));
</script>

<template>
  <TcPhotoSection
    :src="src"
    :position="position"
    :min-height="resolvedMinHeight"
    :scrim="resolvedScrim"
    top-scrim
  >
    <div
      class="flex flex-col px-[var(--space-9)] pt-[var(--space-6)] max-sm:px-[var(--space-5)] max-sm:pt-[var(--space-5)]"
      :class="
        variant === 'full'
          ? 'pb-[var(--space-9)] max-sm:pb-[var(--space-5)]'
          : 'pb-[var(--space-8)] max-sm:pb-[var(--space-5)]'
      "
      :style="frameStyle"
    >
      <!-- Cabeçalho: logo, navegação (portal) e ações -->
      <header class="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
        <Logo variant="light" class-name="h-[68px] md:h-[68px]" />

        <nav
          v-if="$slots['header-nav']"
          class="max-lg:order-3 max-lg:w-full max-lg:overflow-x-auto lg:flex lg:flex-1 lg:justify-center"
        >
          <slot name="header-nav" />
        </nav>

        <div
          v-if="$slots['header-actions']"
          class="flex flex-wrap items-center gap-[var(--space-3)]"
        >
          <slot name="header-actions" />
        </div>
      </header>

      <!-- Corpo -->
      <div
        v-if="variant === 'full'"
        class="flex flex-1 flex-col items-stretch gap-[var(--space-12)] py-[var(--space-10)] lg:flex-row lg:items-center"
      >
        <div class="min-w-0 lg:flex-[1_1_520px]">
          <slot />
        </div>
        <div
          v-if="$slots.aside"
          class="min-w-0 lg:flex-[0_1_var(--tc-aside-basis,440px)]"
          :style="asideBasis ? { '--tc-aside-basis': asideBasis } : undefined"
        >
          <slot name="aside" />
        </div>
      </div>
      <div
        v-else
        class="flex flex-1 flex-col gap-[var(--space-4)] pb-[var(--space-8)] pt-[var(--space-10)]"
      >
        <slot />
      </div>

      <!-- Rodapé -->
      <div v-if="$slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </TcPhotoSection>
</template>
