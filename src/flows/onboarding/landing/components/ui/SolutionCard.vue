<script setup lang="ts">
import type { Component } from 'vue';
import TcSoftCard from '@/components/theme/TcSoftCard.vue';
import IconBadge from './IconBadge.vue';

interface SolutionCardProps {
  category: string;
  description: string;
  icon: Component;
  // Mantido por compatibilidade com quem consome o componente; no theme-client todos os cards são iguais.
  variant: 'dark' | 'light';
}

defineProps<SolutionCardProps>();
</script>

<template>
  <TcSoftCard class="flex flex-col p-[var(--space-8)]">
    <IconBadge
      :icon="icon"
      :size="24"
      aria-hidden="true"
      class="size-[var(--control-nav)] shrink-0 rounded-[var(--radius-full)] bg-[var(--surface-brand)] text-[color:var(--text-on-brand)]"
    />

    <span
      class="mt-[var(--space-8)] block text-[length:var(--text-xs)] font-[number:var(--weight-semibold)] text-[color:var(--text-muted)]"
    >
      {{ category }}
    </span>

    <h3
      class="m-0 mt-[var(--space-2)] text-[length:var(--text-lg)] font-[number:var(--weight-bold)] leading-[var(--leading-heading)] text-[color:var(--text-strong)]"
    >
      <slot name="title" />
    </h3>

    <p
      class="m-0 mt-[var(--space-3)] text-[length:var(--text-base)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
    >
      {{ description }}
    </p>
  </TcSoftCard>
</template>
