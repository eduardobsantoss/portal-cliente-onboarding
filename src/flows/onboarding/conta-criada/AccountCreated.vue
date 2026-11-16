<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { ArrowRight, Landmark } from 'lucide-vue-next';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';
import { MOCK_ACCOUNT_INFO } from '@/mocks/accountCreated';
import AccountPassCard from './AccountPassCard.vue';
import AppDownloadCard from './AppDownloadCard.vue';
import NextStepNotice from './NextStepNotice.vue';
import AppDownloadModal from './AppDownloadModal.vue';

const emit = defineEmits<{
  continueToCompleteRegistration: [];
}>();

const copiedField = ref<string | null>(null);
const isAppModalOpen = ref(false);
const downloadFeedback = ref<string | null>(null);

const accountInfo = MOCK_ACCOUNT_INFO;

const handleCopy = (field: string, value: string) => {
  navigator.clipboard.writeText(value);
  copiedField.value = field;
  setTimeout(() => {
    copiedField.value = null;
  }, 2500);
};

const handleStoreClick = (feedback: string) => {
  downloadFeedback.value = feedback;
  setTimeout(() => {
    downloadFeedback.value = null;
  }, 3500);
};
</script>

<template>
  <OnboardingPageShell
    section-label="Portal do Cliente • Conta Ativa"
    main-class-name="max-w-5xl w-full mx-auto my-auto py-8"
  >
    <template #beforeFooter>
      <!-- Modal Baixar App Ceres Agrofinance -->
      <AppDownloadModal
        v-if="isAppModalOpen"
        :download-feedback="downloadFeedback"
        @close="isAppModalOpen = false"
        @store-click="handleStoreClick"
      />
    </template>

    <motion.div
      :initial="{ opacity: 0, y: 14 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4 }"
      class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >
      <!-- Header Banner - Celebratory -->
      <div class="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
        <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10">
          <Landmark :size="26" />
        </div>

        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-4">
          Sua Conta Digital GCI está aberta!
        </h1>
        <p class="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
          Parabéns! Sua conta corrente empresarial junto ao Grupo Ceres Investimentos foi criada com sucesso e já está pronta para uso.
        </p>
      </div>

      <div class="p-6 sm:p-8 space-y-6">
        <!-- Bank Card / Account Pass -->
        <AccountPassCard :account-info="accountInfo" :copied-field="copiedField" @copy="handleCopy" />

        <!-- Download App Ceres Agrofinance - Muted & Discreet -->
        <AppDownloadCard @open-modal="isAppModalOpen = true" />

        <!-- Next step notice box -->
        <NextStepNotice />

        <!-- Unique CTA Button -->
        <div class="pt-2">
          <button
            type="button"
            @click="emit('continueToCompleteRegistration')"
            class="w-full py-4 bg-gci hover:bg-gci-hover text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-gci/15 flex items-center justify-center gap-2 active:scale-95 group"
          >
            Acessar meu portal
            <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  </OnboardingPageShell>
</template>
