<script setup lang="ts">
import { BadgePercent } from 'lucide-vue-next';
import { PRE_APPROVED_LIMIT_LABEL } from '@/constants/analysis';
</script>

<template>
  <div class="p-5 rounded-2xl bg-gradient-to-br from-orange-50 via-white to-amber-50/50 border border-orange-200 shadow-sm relative overflow-hidden">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1">
        <span class="text-[10px] font-extrabold uppercase tracking-widest text-agro-orange">
          Limite Operacional Pré-Aprovado
        </span>
        <div class="text-2xl sm:text-3xl font-black text-gci tracking-tight">
          {{ PRE_APPROVED_LIMIT_LABEL }}
        </div>
        <p class="text-xs text-slate-600 font-medium">
          Disponível para antecipação de recebíveis do agronegócio.
        </p>
      </div>

      <div class="w-12 h-12 rounded-2xl bg-agro-orange/10 flex items-center justify-center text-agro-orange shrink-0">
        <BadgePercent :size="24" />
      </div>
    </div>
  </div>
</template>
