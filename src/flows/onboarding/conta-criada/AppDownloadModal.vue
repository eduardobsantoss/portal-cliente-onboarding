<script setup lang="ts">
import { motion } from 'motion-v';
import { Smartphone, QrCode, Check } from 'lucide-vue-next';
import AppleLogo from './AppleLogo.vue';
import GooglePlayLogo from './GooglePlayLogo.vue';
import StoreButton from './StoreButton.vue';

defineProps<{
  downloadFeedback: string | null;
}>();

const emit = defineEmits<{
  close: [];
  storeClick: [feedback: string];
}>();
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <motion.div
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.95 }"
      class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 relative text-center"
    >
      <button
        type="button"
        @click="emit('close')"
        class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold text-lg"
      >
        ✕
      </button>

      <div class="w-16 h-16 rounded-2xl bg-emerald-50 text-gci border border-emerald-200 mx-auto flex items-center justify-center shadow-inner">
        <Smartphone :size="32" class="text-agro-orange" />
      </div>

      <div class="space-y-2">
        <h3 class="text-xl font-bold text-slate-900">
          Baixar app Ceres Agrofinance
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Escaneie o QR Code abaixo com a câmera do celular ou selecione a sua loja de aplicativos:
        </p>
      </div>

      <!-- QR Code Demo Box -->
      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl inline-flex flex-col items-center justify-center mx-auto">
        <div class="w-36 h-36 bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-center shadow-sm">
          <QrCode :size="120" class="text-slate-800" />
        </div>
        <span class="text-[11px] font-bold text-slate-500 mt-2.5">
          Aponte a câmera do seu celular
        </span>
      </div>

      <!-- Feedback notification -->
      <div
        v-if="downloadFeedback"
        class="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
      >
        <Check :size="14" class="text-emerald-600" />
        <span>{{ downloadFeedback }}</span>
      </div>

      <!-- App Store / Google Play Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <StoreButton
          availability="Disponível na"
          store-name="App Store"
          @click="emit('storeClick', 'Iniciando redirecionamento para a App Store...')"
        >
          <template #logo><AppleLogo /></template>
        </StoreButton>

        <StoreButton
          availability="Disponível no"
          store-name="Google Play"
          @click="emit('storeClick', 'Iniciando redirecionamento para o Google Play...')"
        >
          <template #logo><GooglePlayLogo /></template>
        </StoreButton>
      </div>

      <button
        type="button"
        @click="emit('close')"
        class="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
      >
        Fechar
      </button>
    </motion.div>
  </div>
</template>
