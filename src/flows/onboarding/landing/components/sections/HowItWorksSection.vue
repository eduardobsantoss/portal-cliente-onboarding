<script setup lang="ts">
import { FileText, PhoneCall, Rocket } from 'lucide-vue-next';
import SectionHeading from '../ui/SectionHeading.vue';
import StepCard from '../ui/StepCard.vue';
import BaseButton from '../ui/BaseButton.vue';

interface HowItWorksSectionProps {
  onOpenRegistration: () => void;
}

const props = defineProps<HowItWorksSectionProps>();

const steps = [
  {
    number: '01',
    title: 'Preencha seus dados',
    description: 'Informe seu CPF ou CNPJ no formulário. É rápido, simples e 100% digital — sem papelada.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Fale com um especialista',
    description: 'Nossa equipe especializada em agronegócio entra em contato para entender suas necessidades.',
    icon: PhoneCall,
  },
  {
    number: '03',
    title: 'Comece a crescer',
    description: 'Com a solução ideal para o seu perfil, seu negócio e patrimônio evoluem com segurança.',
    icon: Rocket,
  },
];
</script>

<template>
  <section id="como-funciona" class="py-20 md:py-32 bg-white scroll-mt-24">
    <div class="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="COMO FUNCIONA"
        wrapper-class="text-center mb-16 md:mb-24"
        eyebrow-class="text-gci font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block"
        title-class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
      >
        Simples, rápido e <span class="text-gci">sem burocracia</span>
      </SectionHeading>

      <div class="grid md:grid-cols-3 gap-12 md:gap-16 relative">
        <!-- Connector Line -->
        <div class="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gray-100 z-0" />

        <StepCard
          v-for="(step, index) in steps"
          :key="step.number"
          v-fade-in="index * 0.1"
          :number="step.number"
          :title="step.title"
          :description="step.description"
          :icon="step.icon"
        />
      </div>

      <div class="mt-16 md:mt-24 text-center">
        <BaseButton
          variant="solid-dark"
          class="w-full sm:w-auto px-12 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 mx-auto"
          @click="props.onOpenRegistration"
        >
          Abrir minha conta agora
          <span class="text-xl">→</span>
        </BaseButton>
      </div>
    </div>
  </section>
</template>
