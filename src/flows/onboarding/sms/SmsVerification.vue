<script setup lang="ts">
import { ref } from 'vue';
import SupportFaqModal from '@/components/support/SupportFaqModal.vue';
import { SMS_DEFAULT_MASKED_PHONE, SMS_DEFAULT_VERIFIED_AT, SMS_TEST_CODE } from '@/constants/sms';
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

const LINK_BUTTON_CLASS =
  'cursor-pointer rounded-[var(--radius-sm)] border-0 bg-transparent p-0 text-[length:var(--text-xs)] font-[number:var(--weight-semibold)] text-[color:var(--text-link)] hover:text-[color:var(--text-link-hover)] hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]';

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
  <!--
    `theme-client` aqui garante os tokens também onde esta peça é reaproveitada (checklist "Compl. Cadastro" do
    portal, que ainda não foi migrado). O fundo fica transparente para não pintar a área do pai.
  -->
  <div class="theme-client w-full" style="background: transparent">
    <!-- Toast Simulated SMS -->
    <SmsSimulatedToast
      :show="showSimulatedSmsToast"
      :masked-phone="maskedPhone"
      @fill-code="fillSimulatedCode"
      @close="showSimulatedSmsToast = false"
    />

    <!-- STATE 1: VERIFIED / CONCLUÍDO (Used in Checklist or after verification) -->
    <SmsVerifiedCard
      v-if="status === 'verified' && !isModalVariant"
      :masked-phone="maskedPhone"
      :verified-at="currentVerifiedAt"
      @redo="handleRefazerValidacao"
    />
    <!-- STATE 2: INTERACTIVE SMS SEND & OTP DIGITS -->
    <div v-else class="flex flex-col gap-[var(--space-5)]">
      <!-- Celular mascarado + envio do código -->
      <SmsPhoneCard
        :masked-phone="maskedPhone"
        :status="status"
        @send="handleSendSms"
      />

      <!-- OTP 6 Digits Container -->
      <SmsOtpPanel
        v-if="status === 'sent'"
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
        @open-support="isSupportOpen = true"
      />

      <!-- Antes do envio do código, o suporte aparece sozinho (depois, fica na linha do "Reenviar") -->
      <div v-else>
        <button type="button" :class="LINK_BUTTON_CLASS" @click="isSupportOpen = true">
          Não é o seu número?
        </button>
      </div>

      <!-- Success message when verified in modal variant -->
      <SmsModalSuccess v-if="status === 'verified' && isModalVariant" />

      <p v-if="status !== 'verified'" class="m-0 text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
        Código para teste:
        <strong class="font-[number:var(--weight-bold)] tabular-nums text-[color:var(--text-strong)]">{{ SMS_TEST_CODE }}</strong>
      </p>
    </div>

    <!-- Support FAQ Modal: vai para o <body> para não ficar preso ao contexto de empilhamento do hero -->
    <Teleport to="body">
      <SupportFaqModal
        :is-open="isSupportOpen"
        @close="isSupportOpen = false"
      />
    </Teleport>
  </div>
</template>
