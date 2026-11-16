<script setup lang="ts">
import type { OperationRejectedTitle, OperationSummaryData } from '@/types/operationRequest';
import RejectedTitlesList from './RejectedTitlesList.vue';
import SummaryNetTotal from './SummaryNetTotal.vue';
import SummaryRow from './SummaryRow.vue';

defineProps<{
  summary: OperationSummaryData;
  rejectedTitles: OperationRejectedTitle[];
}>();

const LABEL_MUTED = 'text-[11px] font-black text-slate-500 uppercase tracking-widest';
</script>

<template>
  <div class="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-100/50">
    <div class="p-10 space-y-8">
      <!-- DRE Body -->
      <div class="space-y-4">
        <SummaryRow
          row-class-name="flex items-center justify-between py-2 border-b border-slate-50"
          label-class-name="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          value-class-name="text-sm font-black text-gci"
          label="Total de Títulos Extraídos"
          :value="summary.totalTitles"
        />
        <SummaryRow
          row-class-name="flex items-center justify-between py-4 border-b border-slate-100"
          label-class-name="text-[11px] font-black text-slate-500 uppercase tracking-widest italic"
          value-class-name="text-base font-black text-slate-400"
          label="Valor total de Títulos Extraídos"
          :value="summary.totalTitlesValue"
        />
        <SummaryRow
          row-class-name="flex items-center justify-between py-2 border-b border-slate-50"
          label-class-name="text-[10px] font-black text-green-600 uppercase tracking-widest"
          value-class-name="text-sm font-black text-green-600"
          label="Total de Títulos Aceitos"
          :value="summary.acceptedTitles"
        />
        <SummaryRow
          row-class-name="flex items-center justify-between py-4 border-b border-slate-100"
          label-class-name="text-[11px] font-black text-gci uppercase tracking-widest"
          value-class-name="text-lg font-black text-gci"
          label="Valor Total de títulos validados"
          :value="summary.validatedValue"
        />
        <SummaryRow
          row-class-name="flex items-center justify-between py-4 border-b border-slate-100"
          :label-class-name="LABEL_MUTED"
          value-class-name="text-sm font-black text-slate-600"
          label="Taxa da Operação"
          :value="summary.rate"
        />
        <SummaryRow
          row-class-name="flex items-center justify-between py-4 border-b border-slate-100"
          :label-class-name="LABEL_MUTED"
          value-class-name="text-sm font-black text-slate-600"
          label="Prazo Médio de Vencimento"
          :value="summary.averageTerm"
        />
        <SummaryRow
          row-class-name="flex items-center justify-between py-4 border-b border-slate-200"
          :label-class-name="LABEL_MUTED"
          value-class-name="text-sm font-black text-slate-600"
          label="Títulos Rejeitados / Inconsistentes"
          :value="summary.rejectedValue"
        />

        <!-- Final Result -->
        <SummaryNetTotal :net-value="summary.netValue" />
      </div>

      <!-- Rejection Details if any -->
      <RejectedTitlesList :titles="rejectedTitles" />
    </div>
  </div>
</template>
