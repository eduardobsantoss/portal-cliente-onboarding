<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/utils/cn';
import logoNavbarWhite from '@/assets/logos/logo-branca-sem-bg.png';
import logoNavbarBlue from '@/assets/logos/logo-azul-sem-bg.png';
import logoHorizontal from '@/assets/logos/logo-horizontal-gci.png';

const props = withDefaults(
  defineProps<{
    variant?: 'light' | 'dark' | 'horizontal';
    className?: string;
  }>(),
  { variant: 'dark' },
);

const src = computed(() =>
  props.variant === 'light' ? logoNavbarWhite : props.variant === 'horizontal' ? logoHorizontal : logoNavbarBlue,
);
const size = computed(() =>
  props.variant === 'light' ? 'h-12 md:h-14' : props.variant === 'horizontal' ? 'h-24 md:h-28' : 'h-[52px] md:h-[60px]',
);
</script>

<template>
  <img
    :src="src"
    alt="Grupo Ceres Investimentos"
    :class="cn('w-auto object-contain', size, className)"
  />
</template>
