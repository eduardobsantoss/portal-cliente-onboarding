<script setup lang="ts">
import type { Component } from 'vue';
import TcSoftCard from '@/components/theme/TcSoftCard.vue';
import TcStatusLabel from '@/components/theme/TcStatusLabel.vue';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  // Mantido por compatibilidade com quem consome o componente; o card do theme-client não exibe ícone.
  icon: Component;
}

defineProps<StepCardProps>();
</script>

<template>
  <TcSoftCard
    radius="lg"
    class="flex min-h-[200px] flex-col justify-between gap-[var(--space-6)] p-[var(--space-6)] outline outline-1 -outline-offset-1 outline-transparent md:min-h-[240px] md:p-[var(--space-8)] transition-[translate,outline-color] duration-[var(--duration-slow)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:outline-[color:var(--border-default)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
  >
    <TcStatusLabel>{{ number }}</TcStatusLabel>
    <div>
      <h3
        class="m-0 text-[length:var(--text-lg)] font-[number:var(--weight-bold)] leading-[var(--leading-heading)] text-[color:var(--text-strong)]"
      >
        {{ title }}
      </h3>
      <p
        class="m-0 mt-[var(--space-3)] text-[length:var(--text-base)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
      >
        {{ description }}
      </p>
    </div>
  </TcSoftCard>
</template>
