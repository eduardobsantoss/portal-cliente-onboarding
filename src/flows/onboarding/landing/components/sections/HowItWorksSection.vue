<script setup lang="ts">
import { FileText, PhoneCall, Rocket } from 'lucide-vue-next';
import TcSection from '@/components/theme/TcSection.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import TcButton from '@/components/theme/TcButton.vue';
import StepCard from '../ui/StepCard.vue';

interface HowItWorksSectionProps {
  onOpenRegistration: () => void;
}

const props = defineProps<HowItWorksSectionProps>();

const steps = [
  {
    number: '01',
    title: 'Faça seu cadastro',
    description: 'Informe e-mail, CPF ou CNPJ e telefone. Confirme por SMS e crie sua senha.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Envie dados e documentos',
    description: 'Da empresa e dos sócios, com assinatura digital da abertura.',
    icon: PhoneCall,
  },
  {
    number: '03',
    title: 'Acompanhe a análise',
    description: 'Com a conta aprovada, o portal é liberado para você operar.',
    icon: Rocket,
  },
];
</script>

<template>
  <TcSection id="como-funciona">
    <template #aside>
      <TcEyebrow data-reveal>COMO FUNCIONA</TcEyebrow>
    </template>

    <TcDisplayHeading size="3xl" data-reveal>
      Três passos
      <template #second>para abrir sua conta</template>
    </TcDisplayHeading>

    <!-- Linha de progresso: se desenha conforme a rolagem (desktop) -->
    <div
      aria-hidden="true"
      class="mt-[var(--space-12)] hidden h-[2px] bg-[var(--border-subtle)] md:block"
    >
      <div data-draw-line class="h-full origin-left bg-[var(--surface-brand)]" />
    </div>

    <div class="mt-[var(--space-6)] grid grid-cols-[minmax(0,1fr)] gap-[var(--space-3)] md:grid-cols-3">
      <StepCard
        v-for="(step, index) in steps"
        :key="step.number"
        data-reveal
        :number="step.number"
        :title="step.title"
        :description="step.description"
        :icon="step.icon"
      />
    </div>

    <div data-reveal class="mt-[var(--space-12)]">
      <TcButton variant="primary" arrow @click="props.onOpenRegistration">
        Abra sua conta
      </TcButton>
    </div>
  </TcSection>
</template>
