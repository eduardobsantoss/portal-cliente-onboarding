<script setup lang="ts">
import {
  MonitorSmartphone,
  ListChecks,
  CircleCheck,
  Gauge,
  ShieldCheck,
  Headset,
} from 'lucide-vue-next';
import TcSection from '@/components/theme/TcSection.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import BenefitCard from '../ui/BenefitCard.vue';

const benefits = [
  {
    title: 'Tudo online',
    description: 'Do cadastro à assinatura, sem sair do portal.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Etapas visíveis',
    description: 'Envio, análise, assinatura e liberação: você vê em que ponto está cada operação.',
    icon: ListChecks,
  },
  {
    title: 'Pendências resolvidas no portal',
    description: 'Canhoto e reconhecimento do sacado são tratados ali mesmo.',
    icon: CircleCheck,
  },
  {
    title: 'Limite à vista',
    description: 'Seu limite e o quanto já foi usado, sempre na tela inicial.',
    icon: Gauge,
  },
  {
    title: 'Dados protegidos',
    description: 'Tratados de acordo com as normas da LGPD.',
    icon: ShieldCheck,
  },
  {
    title: 'Atendimento',
    description: 'Dúvidas frequentes e pedido de ligação direto no portal.',
    icon: Headset,
  },
];
</script>

<template>
  <TcSection id="beneficios">
    <template #aside>
      <TcEyebrow>POR QUE A GCI?</TcEyebrow>
    </template>

    <TcDisplayHeading size="3xl">
      Seu dia a dia
      <template #second>sem planilha nem e-mail</template>
    </TcDisplayHeading>

    <div class="mt-[var(--space-12)] grid gap-x-[var(--space-14)] md:grid-cols-2">
      <BenefitCard
        v-for="(benefit, index) in benefits"
        :key="benefit.title"
        v-fade-in="index * 0.05"
        :title="benefit.title"
        :description="benefit.description"
        :icon="benefit.icon"
      />
    </div>
  </TcSection>
</template>
