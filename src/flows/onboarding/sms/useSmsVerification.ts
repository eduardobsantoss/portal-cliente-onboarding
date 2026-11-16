import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import type { SmsStatus } from '@/types/sms';
import {
  SMS_INVALID_CODE_MESSAGE,
  SMS_RESEND_COOLDOWN_SECONDS,
  SMS_TEST_CODE,
} from '@/constants/sms';
import { useSmsCountdown } from './useSmsCountdown';
import { useSmsCode } from './useSmsCode';

interface UseSmsVerificationParams {
  isVerified: MaybeRefOrGetter<boolean>;
  verifiedAt: MaybeRefOrGetter<string>;
  maskedPhone: MaybeRefOrGetter<string>;
  isModalVariant: MaybeRefOrGetter<boolean>;
  onVerified?: (phone: string) => void;
  onCloseModal?: () => void;
}

export function useSmsVerification({
  isVerified,
  verifiedAt,
  maskedPhone,
  isModalVariant,
  onVerified,
  onCloseModal,
}: UseSmsVerificationParams) {
  const status = ref<SmsStatus>(toValue(isVerified) ? 'verified' : 'idle');
  const errorMsg = ref<string | null>(null);
  const { cooldown, setCooldown } = useSmsCountdown();
  const showSimulatedSmsToast = ref(false);
  const currentVerifiedAt = ref<string>(toValue(verifiedAt));

  const code = useSmsCode({ onClearError: () => { errorMsg.value = null; } });

  // Update status if prop changes
  watch(
    () => toValue(isVerified),
    (verified) => {
      if (verified) {
        status.value = 'verified';
      }
    },
    { immediate: true },
  );

  // Trigger SMS sending
  const handleSendSms = () => {
    status.value = 'sending';
    errorMsg.value = null;
    code.resetDigits();

    setTimeout(() => {
      status.value = 'sent';
      setCooldown(SMS_RESEND_COOLDOWN_SECONDS);
      showSimulatedSmsToast.value = true;

      setTimeout(() => {
        code.focusInput(0);
      }, 100);

      setTimeout(() => {
        showSimulatedSmsToast.value = false;
      }, 12000);
    }, 500);
  };

  // Validate Code: 123456 is valid
  const validateCode = (inputCode: string) => {
    if (inputCode === SMS_TEST_CODE) {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
      currentVerifiedAt.value = formattedDate;
      status.value = 'verified';
      errorMsg.value = null;
      showSimulatedSmsToast.value = false;
      onVerified?.(toValue(maskedPhone));
      if (toValue(isModalVariant) && onCloseModal) {
        setTimeout(() => {
          onCloseModal();
        }, 1200);
      }
    } else {
      errorMsg.value = SMS_INVALID_CODE_MESSAGE;
    }
  };

  const handleRefazerValidacao = () => {
    status.value = 'idle';
    code.resetDigits();
    errorMsg.value = null;
    setCooldown(0);
    handleSendSms();
  };

  const fillSimulatedCode = () => {
    code.setDigits(SMS_TEST_CODE.split(''));
    validateCode(SMS_TEST_CODE);
  };

  return {
    status,
    errorMsg,
    cooldown,
    showSimulatedSmsToast,
    currentVerifiedAt,
    digits: code.digits,
    inputRefs: code.inputRefs,
    handleSendSms,
    validateCode,
    handleRefazerValidacao,
    fillSimulatedCode,
    handleDigitChange: (index: number, value: string) =>
      code.handleDigitChange(index, value, validateCode),
    handleKeyDown: code.handleKeyDown,
    handlePaste: (e: ClipboardEvent) => code.handlePaste(e, validateCode),
  };
}
