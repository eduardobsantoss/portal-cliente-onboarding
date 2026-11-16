<script setup lang="ts">
import { ArrowUpRight, CheckCircle2 } from 'lucide-vue-next';
import CarteiraStatCard from './CarteiraStatCard.vue';
import PortfolioDistributionCard from './PortfolioDistributionCard.vue';
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CarteiraStatCard
        label="Valor Total"
        value="R$ 0,00"
        value-class-name="text-2xl font-bold text-gci"
      >
        <template #footer><ArrowUpRight :size="12" /> 0% este mês</template>
      </CarteiraStatCard>
      <CarteiraStatCard
        label="Valor Vencido"
        value="R$ 0,00"
        value-class-name="text-2xl font-bold text-slate-400"
        :delay="0.1"
      >
        <template #footer><CheckCircle2 :size="12" /> 0 títulos pendentes</template>
      </CarteiraStatCard>
      <CarteiraStatCard label="A Vencer (30d)" value="R$ 0,00" value-class-name="text-2xl font-bold text-gci" :delay="0.2" />
      <CarteiraStatCard label="Títulos Ativos" value="0" value-class-name="text-2xl font-bold text-gci" :delay="0.3" />
    </div>

    <PortfolioDistributionCard />
  </div>
</template>
