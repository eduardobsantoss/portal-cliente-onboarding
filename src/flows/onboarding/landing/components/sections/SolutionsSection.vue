<script setup lang="ts">
import { TrendingUp, Landmark, ShieldCheck } from 'lucide-vue-next';
import SectionHeading from '../ui/SectionHeading.vue';
import SolutionCard from '../ui/SolutionCard.vue';

const solutions = [
  {
    category: 'PARA EMPRESAS',
    title: 'Funding para o Agro',
    isAgroTitle: true,
    description: 'Soluções de crédito customizadas para transformar necessidades financeiras em oportunidades reais de crescimento no campo.',
    icon: TrendingUp,
    variant: 'dark' as const,
  },
  {
    category: 'PARA PF E PJ',
    title: 'Conta e Investimentos',
    description: 'Gestão e rentabilização de caixa com serviços que organizam suas finanças e fazem seu dinheiro trabalhar por você.',
    icon: Landmark,
    variant: 'light' as const,
  },
  {
    category: 'PROTEÇÃO',
    title: 'Proteção Patrimonial',
    description: 'Estratégias inteligentes que minimizam riscos no patrimônio pessoal e empresarial com seguros sob medida.',
    icon: ShieldCheck,
    variant: 'light' as const,
  },
];
</script>

<template>
  <section id="solucoes" class="py-20 md:py-32 bg-white scroll-mt-24">
    <div class="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Nossas Soluções"
        wrapper-class="mb-16 md:mb-20 text-center lg:text-left"
        eyebrow-class="text-gci font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block"
        title-class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 max-w-2xl mx-auto lg:mx-0 leading-tight"
        description-class="text-base md:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed"
      >
        Para cada necessidade, uma solução
        <template #description>
          Conhecemos o agro por dentro. Portfólio completo and integrado para impulsionar seu negócio.
        </template>
      </SectionHeading>

      <div class="grid md:grid-cols-3 gap-8">
        <SolutionCard
          v-for="(item, index) in solutions"
          :key="item.title"
          v-fade-in="index * 0.1"
          :category="item.category"
          :description="item.description"
          :icon="item.icon"
          :variant="item.variant"
        >
          <template #title>
            <template v-if="item.isAgroTitle">
              Funding para o <span class="text-agro-orange">Agro</span>
            </template>
            <template v-else>
              {{ item.title }}
            </template>
          </template>
        </SolutionCard>
      </div>
    </div>
  </section>
</template>
