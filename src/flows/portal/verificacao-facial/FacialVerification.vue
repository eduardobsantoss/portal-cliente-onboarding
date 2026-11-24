<script setup lang="ts">
import { useFacialVerification } from './useFacialVerification';
import FacialVerifiedCard from './FacialVerifiedCard.vue';
import FacialQrCode from './FacialQrCode.vue';
import FacialInstructions from './FacialInstructions.vue';
import FacialLinkActions from './FacialLinkActions.vue';
import FacialSimulationBar from './FacialSimulationBar.vue';

withDefaults(
  defineProps<{
    isVerified: boolean;
    /**
     * `row` (padrão, usado no portal): QR code ao lado das instruções, com a barra de simulação embaixo.
     * `stack` (onboarding): tudo em coluna; o botão de simular sai daqui e quem usa o aciona por `defineExpose`.
     */
    layout?: 'row' | 'stack';
  }>(),
  { layout: 'row' },
);

const emit = defineEmits<{ verified: [] }>();

const { copied, smsSent, isSimulating, handleCopyLink, handleSendSms, handleSimulateScan } =
  useFacialVerification({ onVerified: () => emit('verified') });

defineExpose({ isSimulating, simulateScan: handleSimulateScan });
</script>

<template>
  <!--
    `theme-client` garante os tokens também onde esta peça é reaproveitada (checklist "Compl. Cadastro" do portal,
    ainda não migrado). Fundo transparente para não pintar a área do pai.
  -->
  <div class="theme-client" style="background: transparent">
    <FacialVerifiedCard v-if="isVerified" />

    <div v-else-if="layout === 'stack'" class="flex flex-col gap-[var(--space-6)]">
      <FacialQrCode />
      <FacialInstructions />
      <FacialLinkActions
        :copied="copied"
        :sms-sent="smsSent"
        @copy-link="handleCopyLink"
        @send-sms="handleSendSms"
      />
    </div>

    <div v-else class="flex flex-col gap-[var(--space-5)]">
      <div class="flex flex-col items-stretch gap-[var(--space-6)] md:flex-row">
        <!-- Left: Interactive QR Code Box -->
        <div class="shrink-0 md:w-64">
          <FacialQrCode />
        </div>

        <!-- Right: Instructions & Actions -->
        <div class="flex flex-1 flex-col justify-between gap-[var(--space-4)]">
          <div class="flex flex-col gap-[var(--space-4)]">
            <FacialInstructions />

            <FacialLinkActions
              :copied="copied"
              :sms-sent="smsSent"
              @copy-link="handleCopyLink"
              @send-sms="handleSendSms"
            />
          </div>

          <!-- Quick Simulation Button -->
          <FacialSimulationBar :is-simulating="isSimulating" @simulate-scan="handleSimulateScan" />
        </div>
      </div>
    </div>
  </div>
</template>
