<script setup lang="ts">
import { Calendar, Info } from 'lucide-vue-next';
import type { Titulo } from '@/types/titulo';
import { buildTituloPrazosInfo, buildTituloRegistroInfo } from '@/utils/titleDetails';
import InfoSectionCard from '@/flows/portal/dashboard/modais/comum/InfoSectionCard.vue';

defineProps<{
  titulo: Titulo;
}>();

const INFO_LABEL_CLASS = 'text-[10px] uppercase tracking-[0.15em] text-gray-400 font-black mb-1 group-hover:text-agro-orange transition-colors';
const INFO_VALUE_CLASS = 'text-base font-bold text-gci leading-tight';
const INFO_CARD_CLASS = 'bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm';
</script>

<template>
  <div class="space-y-8">
    <!-- Bloco 1: Dados do Título e Sacado -->
    <InfoSectionCard
      :icon="Info"
      title="Dados do Registro & Sacado"
      :items="buildTituloRegistroInfo(titulo)"
      :class-name="INFO_CARD_CLASS"
      header-class-name="p-6 border-b border-gray-100 bg-gray-50/30"
      :label-class-name="INFO_LABEL_CLASS"
      :value-class-name="INFO_VALUE_CLASS"
    />

    <!-- Bloco 2: Datas e Valores -->
    <InfoSectionCard
      :icon="Calendar"
      title="Prazos & Valores Financeiros"
      :items="buildTituloPrazosInfo(titulo)"
      :class-name="INFO_CARD_CLASS"
      header-class-name="p-6 border-b border-gray-100 bg-gray-50/30 font-black text-gci"
      :label-class-name="INFO_LABEL_CLASS"
      :value-class-name="INFO_VALUE_CLASS"
    />
  </div>
</template>
