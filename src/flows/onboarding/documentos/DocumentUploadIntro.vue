<script setup lang="ts">
import { Upload } from 'lucide-vue-next';
import type { AccountType } from '@/types/dadosComplementares';

defineProps<{
  accountType: AccountType;
}>();
</script>

<template>
  <div class="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
    <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3">
      <Upload :size="26" />
    </div>

    <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
      Envio de Documentos
    </h1>
    <p class="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed max-w-2xl">
      {{
        accountType === 'pf'
          ? 'Envie o documento de identificação oficial do titular (CNH, RG, RNE ou CIN) nos formatos JPG, JPEG, PNG ou PDF até 12MB.'
          : 'Envie os documentos cadastrais e financeiros da empresa (Contrato/Estatuto, Alteração Contratual, Organograma, Balanço e Faturamento por exercício, Endividamento) e a documentação pessoal de cada sócio/representante cadastrado.'
      }}
    </p>
  </div>
</template>
