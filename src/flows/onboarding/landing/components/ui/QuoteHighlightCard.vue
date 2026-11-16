<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import BaseButton from "./BaseButton.vue";

interface QuoteHighlightCardProps {
  onOpenRegistration: () => void;
}

defineProps<QuoteHighlightCardProps>();
</script>

<template>
  <div class="text-center sm:text-left">
    <h2
      class="text-2xl md:text-[26px] font-extrabold text-gray-900 tracking-tight leading-snug mb-3"
    >
      Feito por quem entende o Agro, para quem faz o Agro acontecer.
    </h2>
    <p class="text-sm text-gray-500 leading-relaxed mb-8">
      Tradição no agronegócio brasileiro com a agilidade de uma fintech, para
      transformar a sua relação com o dinheiro.
    </p>

    <BaseButton
      variant="solid-dark"
      class="w-full h-[52px] rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 group transition-all shadow-md active:scale-95"
      @click="onOpenRegistration"
    >
      Conheça nossas soluções
      <ChevronRight
        :size="16"
        class="group-hover:translate-x-1 transition-transform"
      />
    </BaseButton>

    <p class="text-[10px] text-gray-400 mt-5 text-center leading-normal">
      O Grupo Ceres possui registro e autorizações regulatórias necessárias para
      operações de crédito e de mercado de capitais brasileiras.
    </p>
  </div>
</template>
