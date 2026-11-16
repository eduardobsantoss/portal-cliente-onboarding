<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
import type { OperationFinalReviewData } from '@/types/operationRequest';
import FinalReviewFigure from './FinalReviewFigure.vue';

defineProps<{
  review: OperationFinalReviewData;
}>();
</script>

<template>
  <div class="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/30 max-w-2xl mx-auto text-left relative overflow-hidden">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
      <FinalReviewFigure label="Valor Nominal Enviado" :value="review.nominalSent" value-class-name="text-xl font-black text-slate-400" />
      <FinalReviewFigure label="Valor Nominal Aceito" :value="review.nominalAccepted" value-class-name="text-xl font-black text-gci" />
      <div class="space-y-1">
        <p class="text-[10px] font-black text-agro-orange uppercase tracking-widest leading-tight">Total Líquido a Desembolsar</p>
        <div class="space-y-0.5">
          <p class="text-xl font-black text-agro-orange">{{ review.netValue }}</p>
          <p class="text-[9px] text-red-500 font-black uppercase tracking-widest italic leading-none">{{ review.deduction }}</p>
        </div>
      </div>
      <FinalReviewFigure label="Taxa Operação" :value="review.rate" value-class-name="text-xl font-black text-gci" />
      <FinalReviewFigure label="Prazo Médio" :value="review.averageTerm" value-class-name="text-xl font-black text-gci" />
      <FinalReviewFigure label="ID Operação" :value="review.operationId" value-class-name="text-xl font-black text-gci" />
    </div>

    <div class="mt-8 pt-6 border-t border-slate-50 flex items-start gap-4">
      <div class="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
        <AlertCircle :size="16" />
      </div>
      <p class="text-[11px] text-slate-400 font-medium leading-relaxed">
        Nota: <span class="font-bold text-red-500 italic">1 título (#NF-9921)</span> enviado nesta operação já estava registrado em outro desconto vigente. Por segurança, o valor foi retido para evitar duplicidade de crédito.
      </p>
    </div>
  </div>
</template>
