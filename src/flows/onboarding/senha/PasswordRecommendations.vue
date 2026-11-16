<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next';
import { PASSWORD_RECOMMENDATIONS } from '@/constants/password';
</script>

<template>
  <div class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-[11px] text-slate-600">
    <div class="font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
      <ShieldCheck :size="14" class="text-gci" />
      Recomendações de Segurança
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-500">
      <span
        v-for="recommendation in PASSWORD_RECOMMENDATIONS"
        :key="recommendation"
        class="flex items-center gap-1.5"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-gci/60" />
        {{ recommendation }}
      </span>
    </div>
  </div>
</template>
