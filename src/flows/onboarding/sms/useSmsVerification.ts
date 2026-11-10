import React, { useEffect, useState } from 'react';
import type { SmsStatus } from '@/types/sms';
import {
  SMS_INVALID_CODE_MESSAGE,
  SMS_RESEND_COOLDOWN_SECONDS,
  SMS_TEST_CODE,
} from '@/constants/sms';
import { useSmsCountdown } from './useSmsCountdown';
import { useSmsCode } from './useSmsCode';

interface UseSmsVerificationParams {
  isVerified: boolean;
  verifiedAt: string;
  maskedPhone: string;
  isModalVariant: boolean;
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
  const [status, setStatus] = useState<SmsStatus>(isVerified ? 'verified' : 'idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { cooldown, setCooldown } = useSmsCountdown();
  const [showSimulatedSmsToast, setShowSimulatedSmsToast] = useState(false);
  const [currentVerifiedAt, setCurrentVerifiedAt] = useState<string>(verifiedAt);

  const code = useSmsCode({ onClearError: () => setErrorMsg(null) });

  // Update status if prop changes
  useEffect(() => {
    if (isVerified) {
      setStatus('verified');
    }
  }, [isVerified]);

  // Trigger SMS sending
  const handleSendSms = () => {
    setStatus('sending');
    setErrorMsg(null);
    code.resetDigits();

    setTimeout(() => {
      setStatus('sent');
      setCooldown(SMS_RESEND_COOLDOWN_SECONDS);
      setShowSimulatedSmsToast(true);

      setTimeout(() => {
        code.focusInput(0);
      }, 100);

      setTimeout(() => {
        setShowSimulatedSmsToast(false);
      }, 12000);
    }, 500);
  };

  // Validate Code: 123456 is valid
  const validateCode = (inputCode: string) => {
    if (inputCode === SMS_TEST_CODE) {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
      setCurrentVerifiedAt(formattedDate);
      setStatus('verified');
      setErrorMsg(null);
      setShowSimulatedSmsToast(false);
      onVerified?.(maskedPhone);
      if (isModalVariant && onCloseModal) {
        setTimeout(() => {
          onCloseModal();
        }, 1200);
      }
    } else {
      setErrorMsg(SMS_INVALID_CODE_MESSAGE);
    }
  };

  const handleRefazerValidacao = () => {
    setStatus('idle');
    code.resetDigits();
    setErrorMsg(null);
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
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => code.handlePaste(e, validateCode),
  };
}
