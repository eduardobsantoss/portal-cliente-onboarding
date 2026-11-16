<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next';
</script>

<template>
  <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
    <h4 class="text-xs font-bold text-slate-800 flex items-center gap-2">
      <ShieldCheck :size="16" class="text-gci" />
      Como funciona a verificação facial:
    </h4>
    <ol class="text-xs text-slate-600 space-y-2 pl-4 list-decimal">
      <li>
        <span class="font-medium text-slate-800">Abra a câmera do smartphone</span> e aponte para o QR Code ao lado.
      </li>
      <li>
        <span class="font-medium text-slate-800">Posicione seu rosto</span> na moldura circular em ambiente bem iluminado.
      </li>
      <li>
        <span class="font-medium text-slate-800">Faça a prova de vida</span> (piscar os olhos ou sorrir) em poucos segundos.
      </li>
    </ol>
  </div>
</template>
