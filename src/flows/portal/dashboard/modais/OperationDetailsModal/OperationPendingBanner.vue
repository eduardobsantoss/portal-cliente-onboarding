<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
import DetailsAlertBanner from '@/flows/portal/dashboard/modais/comum/DetailsAlertBanner.vue';

const emit = defineEmits<{ resolve: [] }>();
</script>

<template>
  <DetailsAlertBanner tone="warning" with-bottom-margin :icon="AlertCircle">
    <template #actions>
      <button
        @click="emit('resolve')"
        class="bg-gci text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gci-hover transition-all shadow-xl shadow-gci/10 active:scale-95"
      >
        Resolver Pendência
      </button>
    </template>

    <h4 class="text-lg font-black text-gci mb-1">Ação Pendente Necessária</h4>
    <p class="text-sm text-slate-600 leading-relaxed">
      Esta operação possui pendências de assinatura e confirmação de títulos. Por favor, revise os termos para prosseguir com a liquidação.
    </p>
  </DetailsAlertBanner>
</template>
