<script setup lang="ts">
import { ref } from 'vue';
import SupportFaqModal from '@/components/support/SupportFaqModal.vue';
import { SMS_DEFAULT_MASKED_PHONE, SMS_DEFAULT_VERIFIED_AT } from '@/constants/sms';
import { useSmsVerification } from './useSmsVerification';
import SmsSimulatedToast from './SmsSimulatedToast.vue';
import SmsVerifiedCard from './SmsVerifiedCard.vue';
import SmsPhoneCard from './SmsPhoneCard.vue';
import SmsOtpPanel from './SmsOtpPanel.vue';
import SmsModalSuccess from './SmsModalSuccess.vue';

const props = withDefaults(
  defineProps<{
    isVerified?: boolean;
    maskedPhone?: string;
    verifiedAt?: string;
    isModalVariant?: boolean;
  }>(),
  {
    isVerified: false,
    maskedPhone: SMS_DEFAULT_MASKED_PHONE,
    verifiedAt: SMS_DEFAULT_VERIFIED_AT,
    isModalVariant: false,
  },
);

const emit = defineEmits<{
  verified: [phone: string];
  closeModal: [];
}>();

const isSupportOpen = ref(false);

const {
  status,
  errorMsg,
  cooldown,
  showSimulatedSmsToast,
  currentVerifiedAt,
  digits,
  inputRefs,
  handleSendSms,
  validateCode,
  handleRefazerValidacao,
  fillSimulatedCode,
  handleDigitChange,
  handleKeyDown,
  handlePaste,
} = useSmsVerification({
  isVerified: () => props.isVerified,
  verifiedAt: () => props.verifiedAt,
  maskedPhone: () => props.maskedPhone,
  isModalVariant: () => props.isModalVariant,
  onVerified: (phone) => emit('verified', phone),
  onCloseModal: () => emit('closeModal'),
});
</script>

<template>
  <div class="w-full">
    <!-- Toast Simulated SMS -->
    <SmsSimulatedToast
      :show="showSimulatedSmsToast"
      :masked-phone="maskedPhone"
      @fill-code="fillSimulatedCode"
    />

    <!-- STATE 1: VERIFIED / CONCLUÍDO (Used in Checklist or after verification) -->
    <SmsVerifiedCard
      v-if="status === 'verified' && !isModalVariant"
      :masked-phone="maskedPhone"
      :verified-at="currentVerifiedAt"
      @redo="handleRefazerValidacao"
    />
    <!-- STATE 2: INTERACTIVE SMS SEND & OTP DIGITS -->
    <div v-else class="space-y-4">
      <!-- Header Card with Masked Phone -->
      <SmsPhoneCard
        :masked-phone="maskedPhone"
        :status="status"
        @send="handleSendSms"
        @open-support="isSupportOpen = true"
      />

      <!-- OTP 6 Digits Container -->
      <SmsOtpPanel
        v-if="status === 'sent' || status === 'sending'"
        :masked-phone="maskedPhone"
        :digits="digits"
        :error-msg="errorMsg"
        :cooldown="cooldown"
        :input-refs="inputRefs"
        @digit-change="handleDigitChange"
        @key-down="handleKeyDown"
        @paste="handlePaste"
        @resend="handleSendSms"
        @validate="validateCode"
      />

      <!-- Success message when verified in modal variant -->
      <SmsModalSuccess v-if="status === 'verified' && isModalVariant" />
    </div>

    <!-- Support FAQ Modal -->
    <SupportFaqModal
      :is-open="isSupportOpen"
      @close="isSupportOpen = false"
    />
  </div>
</template>
