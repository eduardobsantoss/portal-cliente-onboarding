<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Check, ChevronRight, LogIn } from "lucide-vue-next";
import BaseButton from "../ui/BaseButton.vue";
import QuoteHighlightCard from "../ui/QuoteHighlightCard.vue";

interface HeroSectionProps {
  onOpenRegistration: () => void;
  onOpenLogin: () => void;
}

const props = defineProps<HeroSectionProps>();

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <section
    class="relative min-h-screen flex items-center pt-28 pb-16 lg:py-0 overflow-hidden"
  >
    <!-- Background Image with Agro Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=2200"
        alt="Agro field"
        class="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-0 agro-overlay" />
    </div>

    <div
      class="max-w-7xl mx-auto px-5 md:px-6 w-full relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      <!-- Left Column: Copy & Actions -->
      <div
        :class="[
          'lg:col-span-6 text-center lg:text-left transition-all duration-800 ease-out transform',
          isMounted
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-[30px]',
        ]"
      >
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase mb-1 backdrop-blur-sm"
        >
          Grupo Ceres Investimentos
        </div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] max-w-[640px] mb-4"
        >
          PORTAL DO CLIENTE <span class="text-[#F27D26]">GCI</span>
        </h1>
        <p
          class="text-base md:text-lg text-white/90 max-w-[560px] mx-auto lg:mx-0 mb-5 leading-relaxed"
        >
          Capital de giro disponível em poucas horas, por meio de uma plataforma
          100% digital, desenvolvida para oferecer mais agilidade, autonomia e
          segurança às suas operações.
        </p>
        <ul
          class="list-none p-0 m-0 max-w-[560px] mx-auto lg:mx-0 mb-7 space-y-2 text-base md:text-lg text-white/90"
        >
          <li class="flex items-center gap-2.5">
            <Check :size="18" class="shrink-0 text-green-400" />
            Upload das duplicatas em segundos
          </li>
          <li class="flex items-center gap-2.5">
            <Check :size="18" class="shrink-0 text-green-400" />
            Acompanhamento online da operação
          </li>
          <li class="flex items-center gap-2.5">
            <Check :size="18" class="shrink-0 text-green-400" />
            Aprovação automatizada
          </li>
        </ul>
        <div
          class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-5"
        >
          <BaseButton
            variant="solid-light"
            class="w-full sm:w-auto px-9 py-3.5 rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2.5"
            @click="props.onOpenRegistration"
          >
            Conheça o Portal
            <ChevronRight :size="18" />
          </BaseButton>

          <BaseButton
            variant="outline-light"
            class="w-full sm:w-auto border-2 border-white/30 hover:border-white px-9 py-3.5 rounded-full font-bold text-base transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            @click="props.onOpenLogin"
          >
            Acesse sua conta
            <LogIn :size="16" />
          </BaseButton>
        </div>
      </div>

      <!-- Right Column: Institutional Highlight Card -->
      <div
        :class="[
          'lg:col-span-6 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[28px] md:rounded-[34px] shadow-2xl w-full lg:max-w-[490px] lg:ml-auto border border-white/20 transition-all duration-800 delay-200 ease-out transform relative overflow-hidden',
          isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        ]"
      >
        <QuoteHighlightCard :onOpenRegistration="props.onOpenRegistration" />
      </div>
    </div>
  </section>
</template>
