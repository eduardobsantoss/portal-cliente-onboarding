<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/utils/cn';
import logoNavbarWhite from '../../assets/logos/logo-branca-sem-bg.png';
import logoNavbarBlue from '../../assets/logos/logo-azul-sem-bg.png';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const props = withDefaults(defineProps<LogoProps>(), {
  variant: 'dark',
  className: '',
});

const isDark = computed(() => props.variant === 'dark');
</script>

<template>
  <img
    :src="isDark ? logoNavbarWhite : logoNavbarBlue"
    alt="Grupo Ceres Investimentos"
    :class="cn(
      'w-auto object-contain',
      isDark ? 'h-12 md:h-14' : 'h-[52px] md:h-[60px]',
      props.className
    )"
  />
</template>
