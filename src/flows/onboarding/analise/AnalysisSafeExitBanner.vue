<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next';
</script>

<template>
  <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3.5">
    <ShieldCheck :size="20" class="text-emerald-600 shrink-0 mt-0.5" />
    <div class="text-xs text-emerald-950 space-y-1">
      <p class="font-bold">Você pode fechar esta aba com total tranquilidade</p>
      <p class="text-emerald-800 leading-relaxed">
        Seu progresso está salvo. Quando a análise for concluída, você poderá retornar ao portal com suas credenciais.
      </p>
    </div>
  </div>
</template>
