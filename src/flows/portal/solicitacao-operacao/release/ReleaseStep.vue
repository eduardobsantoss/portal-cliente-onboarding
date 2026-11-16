<script setup lang="ts">
import { motion } from 'motion-v';
import { Shield, Zap } from 'lucide-vue-next';
import OperationTimeline from '@/flows/portal/solicitacao-operacao/OperationTimeline.vue';
</script>

<template>
  <OperationTimeline step="RELEASE" />
  <div class="text-center space-y-3">
    <h2 class="text-3xl font-black text-gci tracking-tight">Liberação de Recurso</h2>
    <p class="text-slate-500 text-lg font-medium">Sua assinatura foi confirmada. Estamos processando o desembolso.</p>
  </div>

  <div class="bg-white rounded-[40px] border-2 border-slate-100 p-10 text-center shadow-xl shadow-slate-100/50">
    <div class="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-8 text-agro-orange">
      <Shield :size="40" />
    </div>
    <h3 class="text-xl font-black text-gci mb-8">Liberação de Recurso</h3>

    <div class="space-y-8">
      <div class="flex flex-col items-center gap-6">
        <div class="flex flex-col items-center gap-4 text-slate-500 text-center">
          <Zap :size="40" class="text-agro-orange animate-pulse" />
          <span class="text-lg font-black uppercase tracking-widest max-w-sm">
            Aguarde, você será notificado por e-mail quando o dinheiro for creditado na sua conta.
          </span>
        </div>

        <div class="w-full max-w-xs bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <motion.div
            :initial="{ width: '0%' }"
            :animate="{ width: '100%' }"
            :transition="{ duration: 15, ease: 'linear' }"
            class="bg-agro-orange h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
