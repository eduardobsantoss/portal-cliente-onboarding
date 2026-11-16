<script setup lang="ts">
import { X } from 'lucide-vue-next';
import Logo from '@/components/ui/Logo.vue';

/** Casca de tela cheia dos detalhes (operação/título): painel de marca à esquerda e conteúdo à direita. */
defineProps<{
  description: string;
}>();

const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col lg:flex-row h-[100dvh]">
    <!-- Left Side: Info & Branding -->
    <div class="hidden lg:flex lg:w-[380px] bg-gci flex-col p-10 text-white relative overflow-hidden shrink-0">
      <div class="relative z-10">
        <Logo variant="dark" class-name="mb-10 scale-90 origin-left" />
        <h2 class="text-3xl font-extrabold leading-tight mb-5"><slot name="title" /></h2>
        <p class="text-white/70 text-base leading-relaxed mb-10">{{ description }}</p>

        <div class="space-y-6"><slot name="sidebar" /></div>
      </div>
      <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-agro-orange/10 rounded-full blur-3xl" />
    </div>

    <!-- Right Side: Content -->
    <div class="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
      <div class="absolute top-4 right-4 md:top-8 md:right-8 z-30">
        <button
          @click="emit('close')"
          class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gci transition-all shadow-sm"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12 md:pt-20"><slot /></div>
      </div>

      <div class="px-6 md:px-12 lg:px-16 py-8 border-t border-gray-100 bg-white">
        <div class="max-w-[1400px] mx-auto flex justify-end">
          <button
            @click="emit('close')"
            class="bg-gci text-white px-12 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-gci/20 active:scale-95 hover:bg-gci-hover"
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
