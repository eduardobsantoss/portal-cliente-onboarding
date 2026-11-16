<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next';
</script>

<template>
  <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
    <ShieldCheck :size="20" class="text-amber-600 shrink-0 mt-0.5" />
    <div class="text-xs text-amber-950 space-y-1 leading-relaxed">
      <p class="font-bold text-slate-900">
        Próximo passo: libere o seu limite de crédito
      </p>
      <p class="text-slate-600">
        Sua conta já está aberta e pronta para uso. Para liberar o limite de antecipação, conclua a análise de crédito no portal.
      </p>
    </div>
  </div>
</template>
