<script setup lang="ts">
import { FileText, Wallet, Landmark } from 'lucide-vue-next';
import TcSection from '@/components/theme/TcSection.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import SolutionCard from '../ui/SolutionCard.vue';

const solutions = [
  {
    category: 'PARA EMPRESAS',
    title: 'Desconto de Duplicata',
    description: 'Envie o XML, confira o resumo e acompanhe até a liberação.',
    icon: FileText,
    variant: 'dark' as const,
  },
  {
    category: 'PARA PF E PJ',
    title: 'Carteira',
    description: 'Seus títulos, sacados e pendências em um só lugar.',
    icon: Wallet,
    variant: 'light' as const,
  },
  {
    category: 'ABERTURA ONLINE',
    title: 'Conta Digital GCI',
    description: 'Aberta online, com seus dados sempre à mão.',
    icon: Landmark,
    variant: 'light' as const,
  },
];
</script>

<template>
  <TcSection id="solucoes">
    <template #aside>
      <TcEyebrow>Soluções</TcEyebrow>
    </template>

    <TcDisplayHeading size="3xl">
      O que você faz
      <template #second>no portal</template>
    </TcDisplayHeading>

    <div class="mt-[var(--space-12)] grid gap-[var(--space-3)] md:grid-cols-3">
      <SolutionCard
        v-for="(item, index) in solutions"
        :key="item.title"
        v-fade-in="index * 0.1"
        :category="item.category"
        :description="item.description"
        :icon="item.icon"
        :variant="item.variant"
      >
        <template #title>{{ item.title }}</template>
      </SolutionCard>
    </div>
  </TcSection>
</template>
