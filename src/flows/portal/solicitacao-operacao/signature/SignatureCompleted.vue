<script setup lang="ts">
import { CheckCircle2, Zap } from 'lucide-vue-next';
</script>

<template>
  <div class="space-y-6 py-8">
    <div class="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
      <CheckCircle2 :size="40" />
    </div>
    <h3 class="text-xl font-black text-gci">Assinatura Digital Concluída</h3>
    <div class="flex items-center justify-center gap-3 text-slate-400">
      <Zap :size="16" class="text-agro-orange" />
      <span class="text-xs font-bold uppercase tracking-widest">Estamos encaminhando para liberação.</span>
    </div>
  </div>
</template>
