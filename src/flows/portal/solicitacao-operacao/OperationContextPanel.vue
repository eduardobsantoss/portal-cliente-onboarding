<script setup lang="ts">
import { ShieldCheck, Lock } from 'lucide-vue-next';
import Logo from '@/components/ui/Logo.vue';
import type { OperationStep } from '@/types/operationRequest';
import OperationActiveStepStatus from './OperationActiveStepStatus.vue';

defineProps<{
  step: OperationStep;
}>();
</script>

<template>
  <div class="hidden lg:flex lg:w-[420px] bg-gci flex-col p-12 text-white relative overflow-hidden shrink-0">
    <div class="relative z-10 h-full flex flex-col">
      <Logo variant="light" class-name="mb-16 h-8 origin-left" />

      <div class="flex-1">
        <h2 class="text-4xl font-black leading-tight mb-8">
          Nova Solicitação de <span class="text-agro-orange">Antecipação</span>
        </h2>
        <p class="text-white/60 text-lg leading-relaxed mb-12 font-medium">
          Siga os passos ao lado para antecipar seus recebíveis de forma 100% digital e segura.
        </p>

        <OperationActiveStepStatus :step="step" />
      </div>

      <div class="mt-12 space-y-6 border-t border-white/5 pt-10">
        <div class="flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-widest">
          <ShieldCheck :size="16" />
          Criptografia de Ponta a Ponta GCI
        </div>
        <div class="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-widest">
          <Lock :size="14" />
          Sua transação está segura.
        </div>
      </div>
    </div>

    <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-agro-orange/10 rounded-full blur-[100px]" />
    <div class="absolute top-40 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
  </div>
</template>
