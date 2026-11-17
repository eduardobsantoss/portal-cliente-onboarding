<script setup lang="ts">
import { MOCK_USER_EMAIL } from '@/mocks/onboardingUser';
</script>

<template>
  <!-- Mesma estrutura do texto de "Validando documentação": título + descrição centralizados -->
  <div class="space-y-2 text-center">
    <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
      Prazo de Análise Cadastral: até 5 dias úteis
    </h3>
    <p class="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
      Agradecemos por escolher a Ceres para abrir a sua conta. Dentro deste prazo, enviaremos a devolutiva sobre a abertura da sua conta no e-mail <strong class="text-slate-900 font-bold">{{ MOCK_USER_EMAIL }}</strong>.
    </p>
  </div>
</template>
