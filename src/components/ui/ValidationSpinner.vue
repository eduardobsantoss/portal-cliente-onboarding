<script setup lang="ts">
import { Loader2, ShieldCheck } from 'lucide-vue-next';

/**
 * Anel giratório bicolor com escudo pulsante, usado nos retornos visuais de "validando".
 * Dentro do theme-client (`tc:`) vira só um `Loader2` de 32px em `--gci-base` (sem laranja nem brilho);
 * a animação não roda com `prefers-reduced-motion`.
 */
</script>

<template>
  <div class="relative w-28 h-28 mx-auto flex items-center justify-center tc:h-auto tc:w-auto">
    <!-- Visual do tema: spinner simples -->
    <Loader2
      class="hidden size-[var(--space-8)] animate-spin text-[color:var(--gci-base)] motion-reduce:animate-none tc:block"
      aria-hidden="true"
    />

    <!-- Visual legado: escondido dentro do tema -->
    <div class="contents tc:hidden">
      <!-- Brilho externo pulsante -->
      <div class="absolute inset-0 rounded-full bg-[#004A2F]/10 animate-ping opacity-75" />

      <!-- Anel giratório bicolor (Verde GCI e Laranja Agro) -->
      <div class="absolute inset-0 rounded-full border-4 border-gray-100 border-t-[#004A2F] border-r-[#FF7300] animate-spin" />

      <!-- Círculo central com escudo pulsante -->
      <div class="w-20 h-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#004A2F] relative z-10">
        <ShieldCheck :size="36" class="text-[#FF7300] animate-pulse" />
      </div>
    </div>
  </div>
</template>
