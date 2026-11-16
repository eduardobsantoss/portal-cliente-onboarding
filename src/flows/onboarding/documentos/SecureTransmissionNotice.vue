<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next';
import type { AccountType } from '@/types/dadosComplementares';

defineProps<{
  accountType: AccountType;
}>();
</script>

<template>
  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
    <ShieldCheck :size="18" class="text-gci shrink-0 mt-0.5" />
    <div class="space-y-0.5">
      <span class="font-bold text-slate-800">Transmissão Segura de Documentos</span>
      <p class="text-[11px] text-slate-500 leading-relaxed">
        Formatos aceitos: <strong>JPG, JPEG, PNG ou PDF (base64)</strong> até <strong>12MB</strong> por arquivo.
        <span v-if="accountType === 'pf'"> Documento oficial de identificação aceito: <strong>CNH, RG, RNE ou CIN</strong>.</span>
        <span v-else> Documentos de identificação dos sócios/titular aceitos: <strong>CNH, RG, RNE ou CIN</strong>.</span>
      </p>
    </div>
  </div>
</template>
