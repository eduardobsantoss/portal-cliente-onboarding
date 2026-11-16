<script setup lang="ts">
import { Clock } from 'lucide-vue-next';
import OperationTimeline from '@/flows/portal/solicitacao-operacao/OperationTimeline.vue';
import LongWaitWarning from './LongWaitWarning.vue';
import ValidationProgressBar from './ValidationProgressBar.vue';

defineProps<{
  validationProgress: number;
  showLongWaitWarning: boolean;
}>();
</script>

<template>
  <OperationTimeline step="VALIDATING" />

  <div class="space-y-4 max-w-sm mx-auto">
    <h2 class="text-3xl font-black text-gci tracking-tight">Validando Operação</h2>
  </div>

  <div class="max-w-md mx-auto space-y-6">
    <p class="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed max-w-md mx-auto">
      Estamos extraindo e validando seus XMLs. Lembrando que você subiu 12 títulos e este processo pode demorar 24 minutos. Não se preocupe, pode tomar seu cafezinho. Você será avisado ao término das validações.
    </p>

    <ValidationProgressBar :validation-progress="validationProgress" />
  </div>

  <div class="space-y-3 pt-6">
    <div class="flex items-center gap-3 justify-center text-[10px] font-black text-agro-orange uppercase tracking-[0.2em] animate-pulse">
      <Clock :size="14" />
      Tempo estimado: 00:24
    </div>

    <div class="bg-slate-50 p-4 rounded-2xl flex flex-col gap-2 text-center max-w-xs mx-auto border border-slate-100">
      <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest">Aviso Importante</p>
      <p class="text-[10px] text-slate-500 font-bold leading-relaxed">
        Em caso de dúvidas ou demora excessiva, entre em contato com nossa equipe de suporte.
      </p>
    </div>

    <LongWaitWarning v-if="showLongWaitWarning" />
  </div>
</template>
