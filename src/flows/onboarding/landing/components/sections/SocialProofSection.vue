<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue';
import StatCard from '../ui/StatCard.vue';

const stats = [
  { label: 'ANOS DE MERCADO', value: '10+' },
  { label: 'EM ATIVOS SOB GESTÃO', value: 'R$ 2B+' },
  { label: 'CLIENTES ATIVOS', value: '500+' },
];
</script>

<template>
  <section class="relative py-20 md:py-32 overflow-hidden">
    <!-- Background with Dark Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
        alt="Agro landscape"
        class="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gci/80 backdrop-blur-[2px]" />
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
      <SectionHeading
        v-fade-in
        eyebrow="NOSSOS NÚMEROS"
        wrapper-class="mb-16 md:mb-20"
        eyebrow-class="text-white/60 font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block"
        title-class="text-3xl md:text-6xl font-extrabold text-white mb-8"
        description-class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
      >
        O grupo que o <span class="text-agro-orange">Agro precisa</span>
        <template #description>
          Desde 2013 construindo uma trajetória de sucesso impulsionada pela confiança de nossos parceiros.
        </template>
      </SectionHeading>

      <div class="grid md:grid-cols-3 gap-6 md:gap-8">
        <StatCard
          v-for="(stat, index) in stats"
          :key="stat.label"
          v-fade-in="index * 0.1"
          :label="stat.label"
          :value="stat.value"
        />
      </div>
    </div>
  </section>
</template>
