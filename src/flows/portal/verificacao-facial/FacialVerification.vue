<script setup lang="ts">
import { useFacialVerification } from './useFacialVerification';
import FacialVerifiedCard from './FacialVerifiedCard.vue';
import FacialQrCode from './FacialQrCode.vue';
import FacialInstructions from './FacialInstructions.vue';
import FacialLinkActions from './FacialLinkActions.vue';
import FacialSimulationBar from './FacialSimulationBar.vue';

defineProps<{
  isVerified: boolean;
}>();

const emit = defineEmits<{ verified: [] }>();

const { copied, smsSent, isSimulating, handleCopyLink, handleSendSms, handleSimulateScan } =
  useFacialVerification({ onVerified: () => emit('verified') });
</script>

<template>
  <FacialVerifiedCard v-if="isVerified" />

  <div v-else class="space-y-5">
    <div class="flex flex-col md:flex-row items-stretch gap-6">
      <!-- Left: Interactive QR Code Box -->
      <FacialQrCode />

      <!-- Right: Instructions & Actions -->
      <div class="flex-1 space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
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
</template>
