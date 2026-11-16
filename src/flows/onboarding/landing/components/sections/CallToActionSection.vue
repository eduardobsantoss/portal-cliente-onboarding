<script setup lang="ts">
import { ArrowRight, LogIn } from 'lucide-vue-next';
import BaseButton from '../ui/BaseButton.vue';

interface CallToActionSectionProps {
  onOpenRegistration: () => void;
  onOpenLogin: () => void;
}

const props = defineProps<CallToActionSectionProps>();
</script>

<template>
  <section class="py-20 md:py-32 bg-gci relative overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
        alt="Agro field sunset"
        class="w-full h-full object-cover opacity-30"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-gci via-gci/90 to-gci/80" />
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl z-10" />
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl z-10" />

    <div class="max-w-4xl mx-auto px-6 text-center relative z-20">
      <div v-fade-in>
        <h2 class="text-3xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
          Pronto para <span class="text-agro-orange">transformar</span> seus resultados?
        </h2>
        <p class="text-lg md:text-xl text-white/70 mb-12 leading-relaxed">
          Junte-se a centenas de empresas e produtores que já confiam no Grupo GCI para potencializar seus investimentos e proteger seu patrimônio.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-md mx-auto sm:max-w-none">
          <BaseButton
            variant="solid-light"
            class="w-full sm:w-auto px-8 py-4.5 rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2.5 group"
            @click="props.onOpenRegistration"
          >
            Registre-se agora
            <ArrowRight class="group-hover:translate-x-1 transition-transform" />
          </BaseButton>

          <BaseButton
            variant="outline-light"
            class="w-full sm:w-auto border-2 border-white/40 hover:border-white px-8 py-4 rounded-full font-bold text-base transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            @click="props.onOpenLogin"
          >
            Acesse o Portal do Cliente
            <LogIn :size="16" />
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
