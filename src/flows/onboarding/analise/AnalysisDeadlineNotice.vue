<script setup lang="ts">
import { Clock } from 'lucide-vue-next';
import { MOCK_USER_EMAIL } from '@/mocks/onboardingUser';
</script>

<template>
  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
    <div class="flex items-center gap-2 text-xs font-bold text-slate-800">
      <Clock :size="16" class="text-agro-orange" />
      <span>Prazo de Análise Cadastral: <strong>até 5 dias úteis</strong></span>
    </div>
    <p class="text-xs text-slate-600 leading-relaxed">
      Agradecemos por escolher a Ceres para abrir a sua conta. Dentro deste prazo, enviaremos a devolutiva sobre a abertura da sua conta no e-mail <strong class="text-slate-900 font-bold">{{ MOCK_USER_EMAIL }}</strong>.
    </p>
  </div>
</template>
