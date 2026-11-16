<script setup lang="ts">
import { Zap, Users, BarChart3, Lock, Headphones, Globe } from 'lucide-vue-next';
import SectionHeading from '../ui/SectionHeading.vue';
import BenefitCard from '../ui/BenefitCard.vue';

const benefits = [
  {
    title: 'Inovação Fintech',
    description: 'Tecnologia de ponta a serviço do agronegócio, com plataformas digitais modernas e ágeis.',
    icon: Zap,
  },
  {
    title: 'Atendimento Personalizado',
    description: 'Cada cliente é único. Soluções customizadas de acordo com a sua realidade e necessidades.',
    icon: Users,
  },
  {
    title: 'Resultados Comprovados',
    description: 'Mais de 10 anos de mercado com crescimento consistente e parceiros satisfeitos em todo o Brasil.',
    icon: BarChart3,
  },
  {
    title: 'Segurança e Transparência',
    description: 'Proteção completa com regulamentação sólida e transparência em todas as operações.',
    icon: Lock,
  },
  {
    title: 'Suporte Especializado',
    description: 'Time especialista no agro disponível para te atender quando e onde você precisar.',
    icon: Headphones,
  },
  {
    title: 'Presença Nacional',
    description: 'Atuação nas principais regiões produtoras do agronegócio brasileiro. Do campo ao mercado.',
    icon: Globe,
  },
];
</script>

<template>
  <section id="beneficios" class="py-20 md:py-32 bg-gray-50 scroll-mt-24">
    <div class="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="POR QUE A GCI?"
        wrapper-class="mb-16 md:mb-20 text-center lg:text-left"
        eyebrow-class="text-gci font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block"
        title-class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 max-w-2xl mx-auto lg:mx-0 leading-tight"
      >
        Tradição do <span class="text-agro-orange">Agro</span> com inovação de <span class="text-agro-orange">Fintech</span>
      </SectionHeading>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BenefitCard
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          v-fade-in="index * 0.05"
          :title="benefit.title"
          :description="benefit.description"
          :icon="benefit.icon"
        />
      </div>
    </div>
  </section>
</template>
