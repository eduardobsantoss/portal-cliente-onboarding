<script setup lang="ts">
import TcPhotoSection from '@/components/theme/TcPhotoSection.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import StatCard from '../ui/StatCard.vue';
import { publicAsset } from '@/utils/publicAsset';

const proofPhoto = publicAsset('assets/refactor/campo-soja.jpeg');

const stats = [
  { label: 'ANOS DE MERCADO', value: '7+' },
  { label: 'EM ATIVOS SOB GESTÃO', value: 'R$ 8,5B+' },
  { label: 'CLIENTES ATIVOS', value: '500+' },
];
</script>

<template>
  <TcPhotoSection
    :src="proofPhoto"
    data-clip-reveal
    class="px-[var(--section-pad-x)] py-[var(--section-pad-y)] max-md:px-[var(--space-6)]"
  >
    <div data-reveal class="max-w-[760px]">
      <TcEyebrow tone="onDark">NOSSOS NÚMEROS</TcEyebrow>
      <TcDisplayHeading size="4xl" tone="onDark" class="mt-[var(--space-6)]">
        O grupo que o
        <template #second>Agro precisa</template>
      </TcDisplayHeading>
      <p
        class="mt-[var(--space-6)] max-w-[52ch] text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--text-on-brand-muted)]"
      >
        Desde 2019 construindo uma trajetória de sucesso impulsionada pela confiança de nossos parceiros.
      </p>
    </div>

    <div class="mt-[var(--space-10)] grid grid-cols-[minmax(0,1fr)] gap-[var(--space-3)] md:mt-[var(--space-12)] md:grid-cols-3">
      <StatCard
        v-for="(stat, index) in stats"
        :key="stat.label"
        data-reveal
        :label="stat.label"
        :value="stat.value"
      />
    </div>
  </TcPhotoSection>
</template>
